import { HttpClient, httpResource } from '@angular/common/http';
import { Component, effect, inject, input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { API } from '@const/api';
import { DesignModule } from '@directives/design/design.module';
import { LdapServer } from '@interfaces/ldap-server';
import { MaterialModule } from '@modules/material.module';
import { ToastService } from '@services/toast.service';

@Component({
  selector: 'ldap-server-form',
  imports: [ReactiveFormsModule, DesignModule, MaterialModule],
  templateUrl: './ldap-server.form.html',
  host: { class: 'w-full py-8' },
})
export class LdapServerForm {
  id = input<string>('undefined');

  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly toast = inject(ToastService);

  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    host: new FormControl('', [Validators.required]),
    port: new FormControl(636, [Validators.required]),
    securityPrincipal: new FormControl('', [Validators.required]),
    securityCredentials: new FormControl('', [Validators.required]),
    searchBase: new FormControl('DC=domain,DC=com', [Validators.required]),
    maxPageSize: new FormControl(1000, [Validators.required]),
    active: new FormControl(true),
    useSsl: new FormControl(true),
    useTls: new FormControl(false),
    sslProtocol: new FormControl('TLS'),
    connectionTimeout: new FormControl(0),
    sendTimeout: new FormControl(0),
    readTimeout: new FormControl(0),
    writeTimeout: new FormControl(0),
    closeTimeout: new FormControl(0),
  });

  ldapServer = httpResource<LdapServer>(() => API.LDAP.SERVER.READ(this.id()), {
    defaultValue: {} as LdapServer, // Ensures an empty value if no data is returned
  });

  loadForm = effect(() => {
    this.ldapServer.value();
    this.form.patchValue(this.ldapServer.value());
    this.form.get('securityCredentials')?.setValue('');
    if (this.form.get('connectionTimeout')?.value == 9223372036854776000)
      this.form.get('connectionTimeout')?.setValue(0);
    if (this.form.get('sendTimeout')?.value == 9223372036854776000) this.form.get('sendTimeout')?.setValue(0);
    if (this.form.get('readTimeout')?.value == 9223372036854776000) this.form.get('readTimeout')?.setValue(0);
    if (this.form.get('writeTimeout')?.value == 9223372036854776000) this.form.get('writeTimeout')?.setValue(0);
    if (this.form.get('closeTimeout')?.value == 9223372036854776000) this.form.get('closeTimeout')?.setValue(0);
    this.form.markAllAsTouched();
  });

  cancel() {
    this.router.navigate(['/dashboard']);
  }

  save() {
    if (this.id() == 'undefined') this.create();
    else this.update();
  }

  create() {
    this.http.post<LdapServer>(API.LDAP.SERVER.CREATE(), this.form.value).subscribe({
      next: (response: LdapServer) => {
        this.toast.show('LDAP server ' + response.name + ' created successfully');
        this.router.navigate(['/ldap-servers', 'id', response.id]);
      },
      error: (err) => console.error('Error:', err),
    });
  }

  update() {
    this.http.put<LdapServer>(API.LDAP.SERVER.UPDATE(this.id()), this.form.value).subscribe({
      next: (response) => this.toast.show('LDAP server ' + response.name + ' updated successfully'),
      error: (err) => console.error('Error:', err),
    });
  }

  delete() {
    this.http.delete(API.LDAP.SERVER.DELETE(this.id())).subscribe({
      next: (response) => {
        this.toast.show('LDAP server ' + this.ldapServer.value().name + ' deleted successfully');
        this.router.navigate(['/ldap-servers']);
      },
      error: (err) => console.error('Error:', err),
    });
  }
}
