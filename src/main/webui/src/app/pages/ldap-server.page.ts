import { Location } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { Component, inject, input, linkedSignal } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router, RouterModule } from '@angular/router';
import { API } from '@const/api';
import { DesignModule } from '@directives/design/design.module';
import { LdapQuery } from '@interfaces/ldap-query';
import { LdapServer } from '@interfaces/ldap-server';
import { MaterialModule } from '@modules/material.module';
import { LdapQueryNewComponent } from '../components/ldap-query-new/ldap-query-new.component';
import { LdapQueryResultsComponent } from '../components/ldap-query-results/ldap-query-results.component';
import { LdapServerEditComponent } from '../components/ldap-server-edit/ldap-server-edit.component';
import { SidebarComponent } from '../components/sidebar/sidebar.component';

@Component({
  selector: 'ldap-server-page',
  imports: [
    RouterModule,
    DesignModule,
    MaterialModule,
    LdapQueryNewComponent,
    LdapServerEditComponent,
    LdapQueryResultsComponent,
    SidebarComponent,
  ],
  templateUrl: './ldap-server.page.html',
  styles: ``,
  host: { class: 'bg-gray-100 w-screen h-screen overflow-y-auto flex flex-row' },
})
export class LdapServerPage {
  id = input<string>();
  queryId = input<string>();

  private readonly router = inject(Router);
  private readonly location = inject(Location);

  ldapServers = httpResource<LdapServer[]>(() => API.LDAP.SERVER.GET(), {
    defaultValue: [], // Ensures an empty array if no data is returned
  });
  ldapServer = linkedSignal(() => {
    const id = this.id();
    const ldapServer = this.ldapServers.value().find((ldapServer) => ldapServer.id.toLowerCase() == id?.toLowerCase());
    return ldapServer ?? ({} as LdapServer);
  });
  ldapQuery = linkedSignal(() => {
    const queryId = this.queryId();
    const ldapServer = this.ldapServer();
    const ldapQuery = ldapServer.queries?.find((ldapQuery) => ldapQuery.id.toLowerCase() == queryId?.toLowerCase());
    return ldapQuery ?? ({} as LdapQuery);
  });
  lastUpdate = linkedSignal(() => {
    this.ldapServer();
    console.log('lastUpdate');

    return new Date();
  });

  selectedTabIndex = linkedSignal(() => {
    const id = this.id();
    const ldapServers = this.ldapServers.value();

    if (id) {
      return ldapServers.findIndex((ldapServer) => ldapServer.id === id);
    }

    return 0;
  });

  onTabChange(event: MatTabChangeEvent) {
    const ldapServer = this.ldapServers.value()[event.index];

    let settingsSuffix = '';

    if (this.location.path().toLowerCase().includes('settings')) settingsSuffix = '/settings';

    this.location.go(`ldap-servers/id/${ldapServer.id}${settingsSuffix}`);
  }
}
