export const API = {
  LDAP: {
    SERVER: {
      GET: () => `/api/v1/ldap/servers`,
      CREATE: () => `/api/v1/ldap/servers`,
      READ: (id: string) => `/api/v1/ldap/servers/id/${id}`,
      UPDATE: (id: string) => `/api/v1/ldap/servers/id/${id}`,
      DELETE: (id: string) => `/api/v1/ldap/servers/id/${id}`,
    },
  },
};
