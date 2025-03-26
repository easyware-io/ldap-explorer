package com.bmwgroup.ldap.boundary;

import com.bmwgroup.ldap.config.ILdapConfig;
import com.bmwgroup.ldap.entity.LdapQueryEntity;
import com.bmwgroup.ldap.enums.LdapSystem;
import com.bmwgroup.ldap.shared.LdapUtils;
import com.bmwgroup.ldap.utils.exceptions.httpExceptions.BadRequestException;
import io.vertx.core.json.JsonObject;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import lombok.extern.java.Log;
import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.media.Content;
import org.eclipse.microprofile.openapi.annotations.media.Schema;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponse;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponses;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;

import javax.naming.directory.SearchControls;
import javax.naming.ldap.LdapContext;
import java.util.List;
import java.util.Properties;
import java.util.Set;

@Log
@Path("/v1/query")
@Tag(name = "Query")
public class QueryResource extends BaseResource {

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(summary = "Makes a pure LDAP query and return results as JSON")
    @APIResponses(value = {
            @APIResponse(responseCode = "200", description = "User data retrieved successfully",
                    content = @Content(mediaType = MediaType.APPLICATION_JSON, schema = @Schema(implementation = JsonObject.class))),
            @APIResponse(responseCode = "400", description = "A bad request was made",
                    content = @Content(mediaType = MediaType.APPLICATION_JSON, schema = @Schema(implementation = JsonObject.class))),
            @APIResponse(responseCode = "500", description = "Internal server error",
                    content = @Content(mediaType = MediaType.APPLICATION_JSON))
    })
    public Response query(LdapQueryEntity queryEntity) {
        ILdapConfig config = queryEntity.source == LdapSystem.AD ? adConfig : gdConfig;

        if (queryEntity.query == null || queryEntity.query.isEmpty()) {
            throw new BadRequestException("Query string is missing.");
        }
        if (queryEntity.forceToArray == null) {
            queryEntity.forceToArray = Set.of();
        }
        if (queryEntity.responseAttributes == null) {
            queryEntity.responseAttributes = config.responseAttributes();
        }

        Properties contextProperties = LdapUtils.createLdapProperties(config);
        log.fine("contextProperties created. Creating searchControls...");

        SearchControls searchControls = LdapUtils.setSearchControls(queryEntity.responseAttributes);
        log.fine("searchControls created. Creating ldapContext...");

        LdapContext ldapContext = LdapUtils.createLdapContext(contextProperties, config.maxPageSize());
        log.fine("ldapContext created. Fetching data...");

        List<JsonObject> res = LdapUtils.fetchData(queryEntity.query, searchControls, ldapContext, config.searchBase(), 1000, queryEntity.responseAttributes, queryEntity.forceToArray);
        return Response.ok(res).build();
    }
}
