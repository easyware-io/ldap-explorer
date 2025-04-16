package io.easyware.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.json.bind.annotation.JsonbTransient;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import java.util.UUID;
@Entity
@Table(name = "ldap_query")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LdapQuery {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "ldap_server_id", referencedColumnName = "id")
    @JsonbTransient
    private LdapServer ldapServer;

    @Transient
    private UUID ldapServerId;

    @Column(name = "name", nullable = false, length = 64)
    private String name;

    @Column(name = "description", length = 256)
    private String description;

    @Column(name = "query", nullable = false, length = Integer.MAX_VALUE)
    private String query;

    public UUID getLdapServerId() {
        if (ldapServer != null) return ldapServer.getId();
        return ldapServerId;
    }
}
