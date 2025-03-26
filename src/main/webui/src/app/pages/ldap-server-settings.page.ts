import { Component, input } from '@angular/core';
import { DesignModule } from '@directives/design/design.module';
import { LdapServerForm } from '../forms/ldap-server/ldap-server.form';

@Component({
  selector: 'ldap-server-settings-page',
  imports: [DesignModule, LdapServerForm],
  templateUrl: './ldap-server-settings.page.html',
  styles: ``,
  host: { class: 'my-auto' },
})
export class LdapServerSettingsPage {
  id = input<string>();
}
