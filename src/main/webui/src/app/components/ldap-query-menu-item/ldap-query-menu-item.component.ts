import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { DesignModule } from '@directives/design/design.module';
import { LdapQuery } from '@interfaces/ldap-query';
import { MaterialModule } from '@modules/material.module';

@Component({
  selector: 'ldap-query-menu-item',
  imports: [DesignModule, MaterialModule],
  templateUrl: './ldap-query-menu-item.component.html',
  styles: ``,
})
export class LdapQueryMenuItemComponent {
  ldapQuery = input.required<LdapQuery>();

  currentLdapServerId = input.required<string>();
  currentQueryId = input<string>();
  // isSelected = input.required<boolean>();
  private readonly router = inject(Router);

  get isSelected(): boolean {
    const queryId = this.currentQueryId()?.toLowerCase() ?? '';
    const ldapQueryId = this.ldapQuery()?.id?.toLowerCase() ?? '';
    const id = this.currentLdapServerId()?.toLowerCase() ?? '';
    const ldapServerId = this.ldapQuery()?.ldapServerId?.toLowerCase() ?? '';

    return !!queryId && !!ldapQueryId && !!id && queryId === ldapQueryId && id === ldapServerId;
  }

  open() {
    this.router.navigate(['ldap-servers', 'id', this.ldapQuery().ldapServerId, 'queries', this.ldapQuery().id]);
  }

  edit() {}

  refresh() {
    console.log('refresh');
  }
}
