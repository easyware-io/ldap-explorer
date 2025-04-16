package io.easyware.boundary;

import io.easyware.control.LdapServerService;
import io.easyware.entity.LdapQuery;
import io.easyware.entity.LdapServer;
import jakarta.inject.Inject;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import lombok.extern.java.Log;
import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;

import java.util.ArrayList;
import java.util.Optional;
import java.util.UUID;

@Log(topic = "LdapServerResource")
@Path("/ldap/servers")
@Tag(name = "LDAP Server")
public class LdapServerResource {

    @Inject
    LdapServerService ldapServerService;

    @GET
    public Response getLdapServers() {
//        return Response.ok(new ArrayList<>()).build();
        return Response.ok(ldapServerService.getLdapServers()).build();
    }

    @GET
    @Path("id/{id}")
    public Response getLdapServer(@PathParam("id") String id) {
        if (id == null || id.equalsIgnoreCase("undefined")) return Response.noContent().build();
        return Response.ok(ldapServerService.getLdapServer(UUID.fromString(id))).build();
    }

    @GET
    @Path("id/{id}/queries")
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(summary = "Get all stores LDAP for a given server")
    public Response getLdapQueries(@PathParam("id") String id) {
        if (id == null || id.equalsIgnoreCase("undefined")) return Response.noContent().build();
        return Response.ok(ldapServerService.getLdapQueries(UUID.fromString(id))).build();
    }

    @GET
    @Path("id/{id}/queries/id/{queryId}")
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(summary = "Gets a gived LdapQuery from a given LdapServer")
    public Response getLdapQueryFromLdapServer(@PathParam("id") String id, @PathParam("queryId") String queryId) {
        if (id == null || id.equalsIgnoreCase("undefined") || queryId == null || queryId.equalsIgnoreCase("undefined"))
            return Response.noContent().build();

        LdapServer ldapServer = ldapServerService.getLdapServer(UUID.fromString(id));
        if (ldapServer == null) return Response.noContent().build();

        ArrayList<LdapQuery> ldapQueries = new ArrayList<>(ldapServer.getQueries());
        Optional<LdapQuery> found =  ldapQueries.stream().filter(item -> item.getId().equals(UUID.fromString(queryId))).findFirst();

        if (found.isEmpty()) return Response.noContent().build();

        return Response.ok(found.get()).build();
    }

    @POST
    public Response addLdapServer(LdapServer ldapServer) throws Exception {
        return Response.ok(ldapServerService.createLdapServer(ldapServer)).build();
    }

    @POST
    @Path("id/{id}/queries")
    public Response addLdapQuery(LdapQuery ldapQuery) throws Exception {
        LdapQuery newQuery = ldapServerService.createLdapQuery(ldapQuery);
        return Response.ok(newQuery).build();
    }

    @PUT
    @Path("id/{id}")
    public Response updateLdapServer(@PathParam("id") String id, LdapServer ldapServer) throws Exception {
        ldapServer.setId(UUID.fromString(id));
        return Response.ok(ldapServerService.updateLdapServer(ldapServer)).build();
    }

    @DELETE
    @Path("id/{id}")
    public Response deleteLdapServer(@PathParam("id") String id) {
        ldapServerService.deleteLdapServer(UUID.fromString(id));
        return Response.ok().build();
    }
}
