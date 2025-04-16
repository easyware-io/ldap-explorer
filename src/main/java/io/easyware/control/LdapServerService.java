package io.easyware.control;

import io.easyware.entity.LdapQuery;
import io.easyware.entity.LdapServer;
import io.easyware.utils.EncryptionUtil;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.NotFoundException;
import lombok.extern.java.Log;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Log
@ApplicationScoped
public class LdapServerService {

    @Inject
    EntityManager entityManager;

    @Transactional
    public LdapServer createLdapServer(LdapServer ldapServer) throws Exception {
        entityManager.persist(ldapServer);

        String encryptedPassword = EncryptionUtil.encrypt(ldapServer.getSecurityCredentials(), ldapServer.getId());
        ldapServer.setSecurityCredentials(encryptedPassword);

        entityManager.merge(ldapServer);

        return ldapServer;
    }

    @Transactional
    public LdapServer updateLdapServer(LdapServer ldapServer) throws Exception {

        LdapServer existingLdapServer = entityManager.find(LdapServer.class, ldapServer.getId());
        if (existingLdapServer == null) throw new NotFoundException();

        if (ldapServer.getName() != null) existingLdapServer.setName(ldapServer.getName());
        if (ldapServer.getUseSsl() != null) existingLdapServer.setUseSsl(ldapServer.getUseSsl());
        if (ldapServer.getTimeout() != null) existingLdapServer.setTimeout(ldapServer.getTimeout());
        if (ldapServer.getConnectionTimeout() != null) existingLdapServer.setConnectionTimeout(ldapServer.getConnectionTimeout());
        if (ldapServer.getWriteTimeout() != null) existingLdapServer.setWriteTimeout(ldapServer.getWriteTimeout());
        if (ldapServer.getReadTimeout() != null) existingLdapServer.setReadTimeout(ldapServer.getReadTimeout());
        if (ldapServer.getCloseTimeout() != null) existingLdapServer.setCloseTimeout(ldapServer.getCloseTimeout());
        if (ldapServer.getSendTimeout() != null) existingLdapServer.setSendTimeout(ldapServer.getSendTimeout());
        if (ldapServer.getUseTls() != null) existingLdapServer.setUseTls(ldapServer.getUseTls());
        if (ldapServer.getPort() != null) existingLdapServer.setPort(ldapServer.getPort());
        if (ldapServer.getHost() != null) existingLdapServer.setHost(ldapServer.getHost());
        if (ldapServer.getSecurityPrincipal() != null) existingLdapServer.setSecurityPrincipal(ldapServer.getSecurityPrincipal());
        if (ldapServer.getSecurityCredentials() != null) {
            String encryptedPassword = EncryptionUtil.encrypt(ldapServer.getSecurityCredentials(), ldapServer.getId());
            existingLdapServer.setSecurityCredentials(encryptedPassword);
        }
        if (ldapServer.getSslProtocol() != null) existingLdapServer.setSslProtocol(ldapServer.getSslProtocol());
        if (ldapServer.getSearchBase() != null) existingLdapServer.setSearchBase(ldapServer.getSearchBase());
        if (ldapServer.getMaxPageSize() != null) existingLdapServer.setMaxPageSize(ldapServer.getMaxPageSize());
        if (ldapServer.getTrustStore() != null) existingLdapServer.setTrustStore(ldapServer.getTrustStore());
        if (ldapServer.getTrustStorePassword() != null) existingLdapServer.setTrustStorePassword(ldapServer.getTrustStorePassword());
        if (ldapServer.getActive() != null) existingLdapServer.setActive(ldapServer.getActive());

        entityManager.merge(existingLdapServer);
        return ldapServer;
    }

    @Transactional
    public void deleteLdapServer(LdapServer ldapServer) {
        ldapServer = entityManager.merge(ldapServer); // Attaching the entity to the context
        entityManager.remove(ldapServer);
    }

    public void deleteLdapServer(UUID id) {
        LdapServer ldapServer = entityManager.find(LdapServer.class, id);
        if (ldapServer != null) {
            deleteLdapServer(ldapServer);
        }
    }

    public LdapServer getLdapServer(UUID id) {
        return entityManager.find(LdapServer.class, id);
    }

    public List<LdapServer> getLdapServers() {
        return entityManager.createQuery("SELECT l FROM LdapServer l", LdapServer.class).getResultList();
    }

    public List<LdapServer> getLdapServers(String name) {
        return entityManager.createQuery("SELECT l FROM LdapServer l WHERE l.name LIKE :name", LdapServer.class)
                .setParameter("name", "%" + name + "%")
                .getResultList();
    }

    public List<LdapServer> getLdapServers(int start, int limit) {
        return entityManager.createQuery("SELECT l FROM LdapServer l", LdapServer.class)
                .setFirstResult(start)
                .setMaxResults(limit)
                .getResultList();
    }

    public List<LdapServer> getLdapServers(String name, int start, int limit) {
        return entityManager.createQuery("SELECT l FROM LdapServer l WHERE l.name LIKE :name ORDER BY l.name", LdapServer.class)
                .setParameter("name", "%" + name + "%")
                .setFirstResult(start)
                .setMaxResults(limit)
                .getResultList();
    }

    public long countLdapServers() {
        return entityManager.createQuery("SELECT COUNT(l) FROM LdapServer l", Long.class).getSingleResult();
    }

    public long countLdapServers(String name) {
        return entityManager.createQuery("SELECT COUNT(l) FROM LdapServer l WHERE l.name LIKE :name", Long.class)
                .setParameter("name", "%" + name + "%")
                .getSingleResult();
    }


    public List<LdapQuery> getLdapQueries(UUID id) {
        LdapServer ldapServer = entityManager.find(LdapServer.class, id);
        if (ldapServer == null) throw new NotFoundException();
        return ldapServer.getQueries();
    }

    public Optional<LdapQuery> getLdapQuery(UUID id) {
        LdapQuery ldapQuery = entityManager.find(LdapQuery.class, id);
        if (ldapQuery == null) return Optional.empty();
        return Optional.of(ldapQuery);
    }

    @Transactional
    public LdapQuery createLdapQuery(LdapQuery ldapQuery) throws Exception {
        LdapServer ldapServer = entityManager.find(LdapServer.class, ldapQuery.getLdapServerId());
        if (ldapServer == null) throw new NotFoundException();

        ldapQuery.setLdapServer(ldapServer);
        ldapServer.getQueries().add(ldapQuery);
        entityManager.merge(ldapServer);
        return ldapQuery;
    }
}
