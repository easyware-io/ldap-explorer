export interface LdapQuery {
  id: string;
  ldapServerId: string;
  name: string;
  query: string;
  description: string;
  createdAt: string;
  updatedAt?: string;
  searchBase?: string;
  key: string;
}
