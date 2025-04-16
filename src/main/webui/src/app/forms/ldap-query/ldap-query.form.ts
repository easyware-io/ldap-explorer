import { Component, inject, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DesignModule } from '@directives/design/design.module';
import { LdapQuery } from '@interfaces/ldap-query';
import { MaterialModule } from '@modules/material.module';

@Component({
  selector: 'ldap-query-form',
  imports: [MaterialModule, DesignModule, FormsModule],
  templateUrl: './ldap-query.form.html',
  styles: ``,
})
export class LdapQueryForm {
  readonly data = inject<{ ldapQuery: LdapQuery; title: string }>(MAT_DIALOG_DATA);
  readonly ldapQuery = model<LdapQuery>(this.data.ldapQuery);

  readonly dialogRef = inject(MatDialogRef<LdapQueryForm>);

  cancel() {
    this.dialogRef.close();
  }

  save() {}
}
