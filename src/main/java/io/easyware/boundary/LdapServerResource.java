package io.easyware.boundary;

import io.easyware.control.LdapServerService;
import io.easyware.entity.LdapServer;
import jakarta.inject.Inject;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.core.Response;
import lombok.extern.java.Log;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;

import java.util.ArrayList;
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

    @POST
    public Response addLdapServer(LdapServer ldapServer) throws Exception {
        return Response.ok(ldapServerService.createLdapServer(ldapServer)).build();
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
