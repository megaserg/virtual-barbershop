package edu.virtual.barbershop;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Map;

public class HaircutsAction extends Action {
    public void perform(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        Map<String, String> haircuts = storage.getHaircuts();

        StringBuilder output = new StringBuilder();
        output.append("{\"paths\":{");

        int count = 0;
        for (String id : haircuts.keySet()) {
            count++;
            output.append("\"").append(id).append("\"");
            output.append(":\"").append(haircuts.get(id)).append("\"");
            if (count < haircuts.keySet().size()) {
                output.append(",");
            }
        }

        output.append("}}");

        ServletOutputStream out = resp.getOutputStream();
        out.print(output.toString());
        out.flush();
    }
}
