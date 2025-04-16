import { LdapQuery } from './ldap-query';

export interface LdapServer {
  active: boolean;
  closeTimeout: number;
  connectionTimeout: number;
  host: string;
  id: string;
  key: string;
  maxPageSize: number;
  name: string;
  port: number;
  queries: LdapQuery[];
  readTimeout: number;
  searchBase: string;
  securityCredentials: string;
  securityPrincipal: string;
  sendTimeout: number;
  sslProtocol: string;
  timeout: number;
  useSsl: boolean;
  useTls: boolean;
  writeTimeout: number;
}
