import { httpResource } from '@angular/common/http';
import { Component, computed, effect, inject, input, linkedSignal } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router, RouterModule } from '@angular/router';
import { API } from '@const/api';
import { DesignModule } from '@directives/design/design.module';
import { LdapServer } from '@interfaces/ldap-server';
import { MaterialModule } from '@modules/material.module';
import { LdapServerCard } from '../cards/ldap-server/ldap-server.card';
import { LdapQueryNewComponent } from '../components/ldap-query-new/ldap-query-new.component';
import { LdapServerEditComponent } from '../components/ldap-server-edit/ldap-server-edit.component';
import { LdapServerNewComponent } from '../components/ldap-server-new/ldap-server-new.component';

@Component({
  selector: 'dashboard',
  imports: [
    LdapServerCard,
    LdapServerNewComponent,
    LdapServerEditComponent,
    LdapQueryNewComponent,
    MaterialModule,
    DesignModule,
    RouterModule,
  ],
  templateUrl: './dashboard.page.html',
  styles: ``,
})
export class DashboardPage {
  id = input<string>();
  queryId = input<string>();
  private readonly router = inject(Router);

  ldapServers = httpResource<LdapServer[]>(() => API.LDAP.SERVER.GET(), {
    defaultValue: [], // Ensures an empty array if no data is returned
  });
  ldapServer = linkedSignal(() => this.ldapServers.value().find((ldapServer) => ldapServer.id === this.id()));

  idEffect = effect(() => {
    this.id();
    this.ldapServers.value();

    if (this.queryId()) {
      this.router.navigate(['/dashboard', 'id', this.id(), 'queries', this.queryId()]);
    } else if (this.id()) {
      this.router.navigate(['/dashboard', 'id', this.id()]);
    } else if (this.ldapServers.value().length > 0) {
      this.router.navigate(['/dashboard', 'id', this.ldapServers.value()[0].id]);
    } else {
      this.router.navigate(['/dashboard']);
    }
  });

  selectedTabIndex = computed(() => {
    const id = this.id();
    const ldapServers = this.ldapServers.value();

    if (id) {
      return ldapServers.findIndex((ldapServer) => ldapServer.id === id);
    }

    return 0;
  });

  create() {
    this.router.navigate(['/ldap-server']);
  }

  onTabChange(event: MatTabChangeEvent) {
    const ldapServer = this.ldapServers.value()[event.index];

    // change route to /dashboard/id/:id
    this.router.navigate(['/dashboard', 'id', ldapServer.id]);

    console.log(ldapServer);
    console.log(event);
  }
}
