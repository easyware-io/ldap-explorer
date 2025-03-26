import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { DesignModule } from '@directives/design/design.module';
import { LdapServer } from '@interfaces/ldap-server';
import { MaterialModule } from '@modules/material.module';

@Component({
  selector: 'ldap-server-top-bar',
  imports: [MaterialModule, DesignModule],
  templateUrl: './ldap-server-top-bar.component.html',
  styles: ``,
})
export class LdapServerTopBarComponent {
  ldapServer = input.required<LdapServer>();

  private readonly router = inject(Router);

  edit() {
    this.router.navigate(['/ldap-servers', 'id', this.ldapServer().id]);
  }
}
