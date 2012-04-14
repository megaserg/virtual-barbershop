package edu.virtual.barbershop;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public final class VirtualBarbershopServlet extends HttpServlet {
    private static final Logger logger = LoggerFactory.getLogger(VirtualBarbershopServlet.class);

    private boolean started = false;
    private ActionFactory factory = new ActionFactory();


    public void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        WebApplicationContext ctx = WebApplicationContextUtils.getWebApplicationContext(getServletContext());
        Storage storage = (Storage)ctx.getBean("storage");
        if (!started) {
            storage.initBaseFolder(getServletContext().getRealPath("/"));
            started = true;
        }

        Action action = factory.create(req.getParameter("action"), storage);
        action.perform(req, resp);
    }
}
