export interface LdapServer {
  active: boolean;
  closeTimeout: number;
  connectionTimeout: number;
  host: string;
  id: string;
  maxPageSize: number;
  name: string;
  port: number;
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
