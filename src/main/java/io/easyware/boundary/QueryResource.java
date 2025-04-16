package io.easyware.boundary;

import io.easyware.control.LdapServerService;
import io.easyware.entity.LdapQuery;
import io.easyware.entity.LdapServer;
import io.easyware.utils.EncryptionUtil;
import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;
import jakarta.inject.Inject;
import jakarta.ws.rs.BadRequestException;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.NotFoundException;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import lombok.extern.java.Log;
import org.apache.directory.api.ldap.model.cursor.EntryCursor;
import org.apache.directory.api.ldap.model.entry.Attribute;
import org.apache.directory.api.ldap.model.entry.Entry;
import org.apache.directory.api.ldap.model.message.SearchScope;
import org.apache.directory.api.ldap.model.schema.AttributeType;
import org.apache.directory.ldap.client.api.LdapConnection;
import org.apache.directory.ldap.client.api.LdapConnectionConfig;
import org.apache.directory.ldap.client.api.LdapNetworkConnection;
import org.apache.directory.ldap.client.api.NoVerificationTrustManager;
import org.apache.mina.core.write.WriteToClosedSessionException;
import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.media.Content;
import org.eclipse.microprofile.openapi.annotations.media.Schema;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponse;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponses;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Log(topic = "QueryResource")
@Path("/query")
@Tag(name = "Query")
public class QueryResource {

    @Inject
    LdapServerService ldapServerService;

    @GET
    @Path("id/{queryId}")
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
    public Response getQuery(@PathParam("queryId") String queryId) throws Exception {
        Optional<LdapQuery> ldapQuery = ldapServerService.getLdapQuery(UUID.fromString(queryId));
        if (ldapQuery.isEmpty()) throw new NotFoundException("Query not found");
        return query(ldapQuery.get());
    }

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
    public Response query(LdapQuery ldapQuery) throws Exception {
        if (ldapQuery == null ||
                ldapQuery.getLdapServerId() == null ||
                ldapQuery.getLdapServerId().toString().length() != 36 ||
                ldapQuery.getQuery() == null ||
                ldapQuery.getQuery().trim().isEmpty()
        ) throw new BadRequestException("Query is invalid");

        LdapServer ldapServer = ldapServerService.getLdapServer(ldapQuery.getLdapServerId());
        if (ldapServer == null) throw new BadRequestException("LDAP server not found");

        LdapConnection connection = getLdapConnection(ldapServer);

        // Example LDAP query: (cn=John*)
        EntryCursor cursor = connection.search(
                ldapServer.getSearchBase(),
                ldapQuery.getQuery(),
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
                String attrId = attribute.getId();

                if (attribute.size() > 1) {
                    // If attribute has multiple values, convert to JsonArray
                    JsonArray valuesArray = new JsonArray();
                    attribute.iterator().forEachRemaining(value -> valuesArray.add(value.getString()));
                    ldapEntry.put(attrId, valuesArray);
                } else {
                    // If attribute has a single value, add it directly
                    ldapEntry.put(attrId, attribute.getString());
                }
            }
            results.add(ldapEntry);
        }

        // Sort JsonArray
        List<JsonObject> sortedList = results.stream()
                .sorted(Comparator.comparing(o -> ((JsonObject) o).getString(ldapQuery.getKey())))
                .map(o -> (JsonObject) o)
                .toList();

        JsonArray toReturn = new JsonArray();
        sortedList.forEach(toReturn::add);

        try {
            connection.unBind();
            connection.close();
        } catch (Exception e) {
            log.severe(e.getMessage());
        }

        return Response.ok().entity(toReturn).build();
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
