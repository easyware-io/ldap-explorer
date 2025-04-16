CREATE TABLE IF NOT EXISTS ldap_query (
    id UUID NOT NULL DEFAULT (gen_random_uuid()),
    ldap_server_id UUID NOT NULL,
    name VARCHAR(64) NOT NULL,
    description VARCHAR(256),
    query TEXT NOT NULL,
    search_base VARCHAR(256),
    key VARCHAR(64) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (ldap_server_id) REFERENCES ldap_server(id)
);
