import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { MaterialModule } from '@modules/material.module';

@Component({
  selector: 'ldap-server-edit',
  imports: [MaterialModule],
  templateUrl: './ldap-server-edit.component.html',
  styles: ``,
})
export class LdapServerEditComponent {
  id = input<string>();
  private readonly router = inject(Router);

  edit() {
    this.router.navigate(['ldap-servers', 'id', this.id(), 'settings']);
  }
}
