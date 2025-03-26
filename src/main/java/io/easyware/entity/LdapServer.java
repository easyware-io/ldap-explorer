package io.easyware.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.apache.directory.ldap.client.api.LdapConnectionConfig;
import org.hibernate.annotations.GenericGenerator;

import java.util.UUID;

@Entity
@Table(name = "ldap_server")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LdapServer {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @Column(name = "name", nullable = false, length = 64)
    private String name;

    @Column(name = "use_ssl", nullable = false)
    @Builder.Default
    private Boolean useSsl = true;

    @Column(name = "timeout", nullable = false)
    @Builder.Default
    private Long timeout = 30000L;

    @Column(name = "connection_timeout")
    @Builder.Default
    private Long connectionTimeout = Long.MAX_VALUE;

    @Column(name = "write_timeout")
    @Builder.Default
    private Long writeTimeout = Long.MAX_VALUE;

    @Column(name = "read_timeout")
    @Builder.Default
    private Long readTimeout = Long.MAX_VALUE;

    @Column(name = "close_timeout")
    @Builder.Default
    private Long closeTimeout = Long.MAX_VALUE;

    @Column(name = "send_timeout")
    @Builder.Default
    private Long sendTimeout = Long.MAX_VALUE;

    @Column(name = "use_tls", nullable = false)
    @Builder.Default
    private Boolean useTls = false;

    @Column(name = "port", nullable = false)
    @Builder.Default
    private Integer port = 636;

    @Column(name = "host", nullable = false, length = 1024)
    private String host;

    @Column(name = "security_principal", nullable = false, length = 255)
    private String securityPrincipal;

    @Column(name = "security_credentials", nullable = false, length = 1024)
    private String securityCredentials;

    @Column(name = "ssl_protocol", nullable = false, length = 255)
    @Builder.Default
    private String sslProtocol = "TLS";



    @Column(name = "search_base", nullable = false, length = 255)
    private String searchBase;

    @Column(name = "max_page_size", nullable = false)
    @Builder.Default
    private Integer maxPageSize = 1000;

    @Column(name = "trust_store")
    private byte[] trustStore;

    @Column(name = "trust_store_password", length = 255)
    private String trustStorePassword;

    @Column(name = "active", nullable = false)
    @Builder.Default
    private Boolean active = true;

    public LdapConnectionConfig toLdapConnectionConfig() {
        LdapConnectionConfig config = new LdapConnectionConfig();
        config.setUseSsl(useSsl);
        config.setTimeout(timeout);
        config.setConnectTimeout(connectionTimeout);
        config.setWriteOperationTimeout(writeTimeout);
        config.setReadOperationTimeout(readTimeout);
        config.setCloseTimeout(closeTimeout);
        config.setSendTimeout(sendTimeout);
        config.setUseTls(useTls);
        config.setLdapPort(port);
        config.setLdapHost(host);
        config.setName(securityPrincipal);
        config.setCredentials(securityCredentials);
        config.setSslProtocol(sslProtocol);
        return config;
    }
}
