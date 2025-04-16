import { HttpClient } from '@angular/common/http';
import { Component, inject, model } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { API } from '@const/api';
import { LdapQueryForm } from '@forms/ldap-query/ldap-query.form';
import { LdapQuery } from '@interfaces/ldap-query';
import { LdapServer } from '@interfaces/ldap-server';
import { MaterialModule } from '@modules/material.module';
import { ToastService } from '@services/toast.service';

@Component({
  selector: 'ldap-query-new',
  imports: [MaterialModule],
  templateUrl: './ldap-query-new.component.html',
  styles: ``,
})
export class LdapQueryNewComponent {
  ldapServer = model.required<LdapServer>();

  private readonly http = inject(HttpClient);
  private readonly dialog = inject(MatDialog);
  private readonly toast = inject(ToastService);

  openDialog(): void {
    console.log(this.ldapServer());

    const dialogRef = this.dialog.open(LdapQueryForm, {
      data: { ldapQuery: { name: '', ldapServerId: this.ldapServer().id } as LdapQuery, title: 'New LDAP Query' },
      width: '90%',
    });

    dialogRef.afterClosed().subscribe((ldapQuery: LdapQuery) => {
      console.log('The dialog was closed');
      console.log(ldapQuery);

      this.http.post<LdapQuery>(API.LDAP.SERVER.QUERIES.CREATE(ldapQuery), ldapQuery).subscribe({
        next: (response: LdapQuery) => {
          this.toast.show('LDAP query ' + response.name + ' created successfully');
          this.ldapServer().queries.push(response);
        },
        error: (err) => this.toast.show('LDAP query creation failed: ' + err.error.message),
      });
    });
  }
}
