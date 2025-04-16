import { Component, input } from '@angular/core';
import { DesignModule } from '@directives/design/design.module';
import { LdapServer } from '@interfaces/ldap-server';
import { MaterialModule } from '@modules/material.module';
import { LdapQueryMenuItemComponent } from '../ldap-query-menu-item/ldap-query-menu-item.component';

@Component({
  selector: 'sidebar',
  imports: [MaterialModule, DesignModule, LdapQueryMenuItemComponent],
  templateUrl: './sidebar.component.html',
  styles: ``,
})
export class SidebarComponent {
  ldapServer = input<LdapServer>();
  currentLdapServerId = input.required<string>();
  currentQueryId = input.required<string | undefined>();
}
