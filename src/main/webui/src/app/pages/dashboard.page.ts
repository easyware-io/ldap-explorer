import { httpResource } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { API } from '@const/api';
import { LdapServer } from '@interfaces/ldap-server';
import { MaterialModule } from '@modules/material.module';
import { LdapServerCard } from '../cards/ldap-server/ldap-server.card';
import { LdapServerNewComponent } from '../components/ldap-server-new/ldap-server-new.component';

@Component({
  selector: 'dashboard',
  imports: [LdapServerCard, LdapServerNewComponent, MaterialModule],
  templateUrl: './dashboard.page.html',
  styles: ``,
})
export class DashboardPage {
  private readonly router = inject(Router);

  ldapServers = httpResource<LdapServer[]>(() => API.LDAP.SERVER.GET(), {
    defaultValue: [], // Ensures an empty array if no data is returned
  });

  create() {
    this.router.navigate(['/ldap-server']);
  }
}
