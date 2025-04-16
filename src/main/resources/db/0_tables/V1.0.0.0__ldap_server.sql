CREATE TABLE IF NOT EXISTS ldap_server (
    id UUID NOT NULL DEFAULT (gen_random_uuid()),
    name VARCHAR(64) NOT NULL,

    use_ssl BOOLEAN NOT NULL DEFAULT TRUE,
    timeout BIGINT NOT NULL DEFAULT 30000,
    connection_timeout BIGINT,
    write_timeout BIGINT,
    read_timeout BIGINT,
    close_timeout BIGINT,
    send_timeout BIGINT,
    use_tls BOOLEAN NOT NULL DEFAULT FALSE,
    port INT NOT NULL DEFAULT 636,
    host VARCHAR(1024) NOT NULL,
    security_principal VARCHAR(255) NOT NULL,
    security_credentials VARCHAR(1024) NOT NULL,
    ssl_protocol VARCHAR(255) NOT NULL DEFAULT 'TLS',

    search_base VARCHAR(255) NOT NULL,
    max_page_size INT NOT NULL DEFAULT 1000,
    trust_store BYTEA,
    trust_store_password VARCHAR(255),
    active BOOLEAN NOT NULL DEFAULT true,

    key VARCHAR(64) NOT NULL,

    PRIMARY KEY (id)
);
