package edu.virtual.barbershop;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class AddBarbershopAction extends Action {
    public void perform(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        String name = req.getParameter("name");
        String address = req.getParameter("address");
        String phone = req.getParameter("phone");

        boolean res = storage.addBarbershop(name, address, phone);

        ServletOutputStream out = resp.getOutputStream();

        if (res) {
            out.print("true");
        } else {
            out.print("false");
        }
        out.flush();
    }
}