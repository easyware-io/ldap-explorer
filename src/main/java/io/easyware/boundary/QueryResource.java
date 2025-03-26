package io.easyware.boundary;

import io.easyware.control.LdapServerService;
import io.easyware.entity.LdapQuerySettings;
import io.easyware.entity.LdapServer;
import io.easyware.utils.EncryptionUtil;
import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;
import jakarta.inject.Inject;
import jakarta.ws.rs.BadRequestException;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import lombok.extern.java.Log;
import org.apache.directory.api.ldap.model.cursor.EntryCursor;
import org.apache.directory.api.ldap.model.entry.Attribute;
import org.apache.directory.api.ldap.model.entry.Entry;
import org.apache.directory.api.ldap.model.exception.LdapException;
import org.apache.directory.api.ldap.model.message.SearchScope;
import org.apache.directory.ldap.client.api.LdapConnection;
import org.apache.directory.ldap.client.api.LdapConnectionConfig;
import org.apache.directory.ldap.client.api.LdapNetworkConnection;
import org.apache.directory.ldap.client.api.NoVerificationTrustManager;
import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.media.Content;
import org.eclipse.microprofile.openapi.annotations.media.Schema;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponse;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponses;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Comparator;
import java.util.stream.Collectors;

@Log(topic = "QueryResource")
@Path("/query")
@Tag(name = "Query")
public class QueryResource {

    @Inject
    LdapServerService ldapServerService;

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(summary = "Makes a pure LDAP query and return results as JSON")
    @APIResponses(value = {
            @APIResponse(responseCode = "200", description = "Data retrieved successfully",
                    content = @Content(mediaType = MediaType.APPLICATION_JSON, schema = @Schema(implementation = JsonObject.class))),
            @APIResponse(responseCode = "400", description = "A bad request was made",
                    content = @Content(mediaType = MediaType.APPLICATION_JSON, schema = @Schema(implementation = JsonObject.class))),
            @APIResponse(responseCode = "500", description = "Internal server error",
                    content = @Content(mediaType = MediaType.APPLICATION_JSON))
    })
    public Response query(LdapQuerySettings settings) throws Exception {
        if (settings == null ||
                settings.ldapServerId == null ||
                settings.ldapServerId.toString().length() != 36 ||
                settings.query == null ||
                settings.query.isEmpty()
        ) throw new BadRequestException("Query settings are invalid");

        LdapServer ldapServer = ldapServerService.getLdapServer(settings.ldapServerId);
        if (ldapServer == null) throw new BadRequestException("LDAP server not found");

        LdapConnection connection = getLdapConnection(ldapServer);

        // Example LDAP query: (cn=John*)
        EntryCursor cursor = connection.search(
                ldapServer.getSearchBase(),
                settings.query,
                SearchScope.SUBTREE
        );

        JsonArray results = new JsonArray();
        for (Entry entry : cursor) {
            // Transform Entry into a JsonObject
            Collection<Attribute> attributes = entry.getAttributes()
                    .stream()
                    .sorted(Comparator.comparing(Attribute::getId))
                    .collect(Collectors.toCollection(ArrayList::new));

            JsonObject ldapEntry = new JsonObject();
            for (Attribute attribute : attributes) {
                ldapEntry.put(attribute.getId(), attribute.getString());
            }
            results.add(ldapEntry);
        }

        try {
            connection.unBind();
            connection.close();
        } catch (Exception e) {
            log.severe(e.getMessage());
        }

        return Response.ok().entity(results).build();
    }

    private static LdapConnection getLdapConnection(LdapServer ldapServer) throws Exception {

        LdapConnectionConfig config = new LdapConnectionConfig();
        config.setUseSsl(ldapServer.getUseSsl());
        config.setLdapHost(ldapServer.getHost());
        config.setLdapPort(ldapServer.getPort());
        config.setName(ldapServer.getSecurityPrincipal());
        config.setCredentials(EncryptionUtil.decrypt(ldapServer.getSecurityCredentials(), ldapServer.getId()));
        config.setTrustManagers( new NoVerificationTrustManager() );

        LdapConnection connection = new LdapNetworkConnection(config);
        connection.bind(config.getName(), config.getCredentials());
        return connection;
    }
}
