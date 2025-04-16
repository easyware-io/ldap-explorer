import { Component, inject, input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '@modules/material.module';
import { LdapServer } from '../../interfaces/ldap-server';

@Component({
  selector: 'ldap-server-card',
  imports: [MaterialModule, RouterModule],
  templateUrl: './ldap-server.card.html',
  styles: ``,
})
export class LdapServerCard {
  ldapServer = input.required<LdapServer>();

  private readonly router = inject(Router);

  settings() {
    this.router.navigate(['ldap-servers', 'id', this.ldapServer().id, 'settings']);
  }

  connect() {
    this.router.navigate(['ldap-servers', 'id', this.ldapServer().id]);
  }
}
