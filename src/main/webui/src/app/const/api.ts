import { LdapQuery } from '@interfaces/ldap-query';

export const API = {
  LDAP: {
    SERVER: {
      GET: () => `/api/v1/ldap/servers`,
      CREATE: () => `/api/v1/ldap/servers`,
      READ: (id: string) => `/api/v1/ldap/servers/id/${id}`,
      UPDATE: (id: string) => `/api/v1/ldap/servers/id/${id}`,
      DELETE: (id: string) => `/api/v1/ldap/servers/id/${id}`,
      QUERIES: {
        GET: (id: string, queryId: string) => `/api/v1/ldap/servers/id/${id}/queries/id/${queryId}`,
        CREATE: (ldapQuery: LdapQuery) => `/api/v1/ldap/servers/id/${ldapQuery.ldapServerId}/queries`,
      },
    },
    QUERY: {
      GET: (id: string) => `/api/v1/query/id/${id}`,
      POST: () => `/api/v1/query`,
    },
  },
};
