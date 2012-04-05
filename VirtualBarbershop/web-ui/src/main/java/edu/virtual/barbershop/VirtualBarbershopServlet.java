package edu.virtual.barbershop;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public final class VirtualBarbershopServlet extends HttpServlet {

    private ActionFactory factory = new ActionFactory();

    public void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        Action action = factory.create(req.getParameter("action"));
        action.perform(req, resp);
    }
}
