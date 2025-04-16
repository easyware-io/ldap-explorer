import { Routes } from '@angular/router';
import { DashboardPage } from '@pages/dashboard.page';
import { LdapServerSettingsPage } from '@pages/ldap-server-settings.page';
import { LdapServerPage } from '@pages/ldap-server.page';

export const routes: Routes = [
  // {
  //   path: 'ldap-servers',
  //   children: [
  //     {
  //       path: 'id/:id',
  //       pathMatch: 'full',
  //       component: LdapServersTabComponent,
  //       children: [
  //         {
  //           path: 'settings',
  //           pathMatch: 'full',
  //           component: LdapServerEditComponent,
  //         },
  //         {
  //           path: '',
  //           pathMatch: 'full',
  //           component: LdapServerResultsComponent,
  //         },
  //       ],
  //     },
  //     {
  //       path: 'new',
  //       pathMatch: 'full',
  //       component: LdapServerSettingsPage,
  //     },
  //     {
  //       path: '**',
  //       pathMatch: 'full',
  //       component: LdapServersTabComponent,
  //     },
  //   ],
  // },
  // {
  //   path: 'dashboard',
  //   component: DashboardPage,
  //   children: [
  //     {
  //       path: 'id/:id',
  //       component: LdapServerCard,
  //       children: [
  //         {
  //           path: 'queries/:queryId',
  //           pathMatch: 'full',
  //           component: LdapQueryResultsComponent,
  //         },
  //       ],
  //     },
  //     // {
  //     //   path: '',
  //     //   pathMatch: 'full',
  //     //   component: DashboardPage,
  //     // },
  //   ],
  // },
  {
    path: 'dashboard',
    pathMatch: 'full',
    component: DashboardPage,
  },
  {
    path: 'ldap-servers',
    children: [
      {
        path: 'id',
        children: [
          {
            path: ':id',
            children: [
              {
                path: 'settings',
                pathMatch: 'full',
                component: LdapServerSettingsPage,
              },
              {
                path: 'queries',
                children: [
                  {
                    path: ':queryId',
                    pathMatch: 'full',
                    component: LdapServerPage,
                  },
                ],
              },
              {
                path: '',
                pathMatch: 'full',
                component: LdapServerPage,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/dashboard',
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '/dashboard',
  },
];
