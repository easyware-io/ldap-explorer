import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MaterialModule } from '@modules/material.module';

@Component({
  selector: 'ldap-server-new',
  imports: [MaterialModule],
  templateUrl: './ldap-server-new.component.html',
  styles: ``,
})
export class LdapServerNewComponent {
  private readonly router = inject(Router);

  create() {
    this.router.navigate(['/ldap-servers/new']);
  }
}
