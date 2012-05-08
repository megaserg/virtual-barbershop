package edu.virtual.barbershop;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Map;

public class GetBarbershopsAction extends Action {
    public void perform(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        Map<Integer, String> barbershops = storage.getBarbershops();

        StringBuilder output = new StringBuilder();
        output.append("{\"barbershops\":{");

        int count = 0;
        for (int id : barbershops.keySet()) {
            count++;
            output.append("\"").append(id).append("\"");
            output.append(":\"").append(barbershops.get(id).replace("\"", "\\\"")).append("\"");
            if (count < barbershops.keySet().size()) {
                output.append(",");
            }
        }

        output.append("}}");

        ServletOutputStream out = resp.getOutputStream();
        out.print(output.toString());
        out.flush();
    }
}

