import { Routes } from '@angular/router';
import { DashboardPage } from '@pages/dashboard.page';
import { LdapServerSettingsPage } from './pages/ldap-server-settings.page';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'ldap-servers',
        children: [
          {
            path: 'id/:id',
            pathMatch: 'full',
            component: LdapServerSettingsPage,
          },
          {
            path: 'new',
            pathMatch: 'full',
            component: LdapServerSettingsPage,
          },
          {
            path: '**',
            pathMatch: 'full',
            redirectTo: '/dashboard',
          },
        ],
      },
      {
        path: 'dashboard',
        pathMatch: 'full',
        component: DashboardPage,
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: '/dashboard',
      },
    ],
  },
];
