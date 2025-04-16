import { httpResource } from '@angular/common/http';
import { Component, computed, effect, inject, input, linkedSignal, Signal } from '@angular/core';
import { API } from '@const/api';
import { DesignModule } from '@directives/design/design.module';
import { LdapQuery } from '@interfaces/ldap-query';
import { MaterialModule } from '@modules/material.module';
import { ToastService } from '@services/toast.service';

@Component({
  selector: 'ldap-query-results',
  imports: [MaterialModule, DesignModule],
  templateUrl: './ldap-query-results.component.html',
  styleUrls: ['./ldap-query-results.component.scss'],
})
export class LdapQueryResultsComponent {
  id = input.required<string>();
  queryId = input.required<string>();
  lastUpdate = input.required<Date>();

  private readonly toast = inject(ToastService);

  getResults = () => API.LDAP.QUERY.GET(this.queryId());
  ldapQuery = httpResource<LdapQuery>(() => API.LDAP.SERVER.QUERIES.GET(this.id(), this.queryId()));
  ldapQueryResults = httpResource(this.getResults);
  data: Signal<Record<string, string | string[] | number | Date>[]> = computed(() =>
    JSON.parse(JSON.stringify(this.ldapQueryResults.value() ?? []))
  );
  selectedIndex: Signal<number> = linkedSignal(() => (this.data().length > 0 ? 0 : -1));
  update = effect(() => {
    this.lastUpdate();
    this.ldapQueryResults.update(this.getResults);
  });

  // Helper to get object keys
  objectKeys(): string[] {
    // Go through all items inside this.data() and get the keys and create an array of string with all the keys
    const keys = new Set<string>();
    for (const item of Object.values(this.data())) {
      if (typeof item === 'object' && item !== null) {
        for (const key of Object.keys(item)) {
          keys.add(key);
        }
      }
    }

    return Array.from(keys);
  }

  // Helper to check if value is an array
  isArray(obj: Record<string, string | string[] | number | Date>, key: string): boolean {
    return Array.isArray(obj[key]);
  }

  value(obj: Record<string, string | string[] | number | Date>, key: string): string | string[] | number | Date {
    return obj[key];
  }

  valueFromArray(obj: Record<string, string | string[] | number | Date>, key: string): string[] {
    return obj[key].toString().split(',');
  }

  clickCount = 0;
  clickTimeout: any;

  onTripleClick(value: string | string[] | number | Date) {
    this.clickCount++;

    if (this.clickCount === 1) {
      // Start a timeout to reset the counter if no more clicks occur
      this.clickTimeout = setTimeout(() => {
        this.clickCount = 0;
      }, 300); // Adjust the timeout (ms) as needed
    }

    if (this.clickCount === 3) {
      this.copyToClipboard(value);
      // Your triple-click logic here
      clearTimeout(this.clickTimeout);
      this.clickCount = 0; // Reset the counter
    }
  }

  copyToClipboard(value: string | string[] | number | Date): void {
    navigator.clipboard.writeText(value.toString()).then(
      () => this.toast.show('Value copied to clipboard: ' + value.toString()),
      (err) => this.toast.show('Could not copy to clipboard.')
    );
  }
}
