import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { MaterialModule } from '@modules/material.module';
import { LdapServerTopBarComponent } from 'src/app/components/ldap-server-top-bar/ldap-server-top-bar.component';
import { LdapServer } from '../../interfaces/ldap-server';

@Component({
  selector: 'ldap-server-card',
  imports: [MaterialModule, LdapServerTopBarComponent],
  templateUrl: './ldap-server.card.html',
  styles: ``,
})
export class LdapServerCard {
  ldapServer = input.required<LdapServer>();

  private readonly router = inject(Router);

  edit() {
    this.router.navigate(['/ldap-servers', 'id', this.ldapServer().id]);
  }

  delete() {
    console.log('Delete LDAP server');
  }

  connect() {
    console.log('Connect to LDAP server');
  }
}
