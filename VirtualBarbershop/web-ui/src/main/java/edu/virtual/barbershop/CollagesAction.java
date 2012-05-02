package edu.virtual.barbershop;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Map;

public class CollagesAction extends Action {
    public void perform(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        Map<String, String[]> collages = storage.getCollages();

        StringBuilder output = new StringBuilder();

        output.append("{\"paths\":{");
        int count = 0;
        for (String id : collages.keySet()) {
            count++;
            output.append("\"").append(id).append("\"");
            output.append(":\"").append(collages.get(id)[0]).append("\"");
            if (count < collages.keySet().size()) {
                output.append(",");
            }
        }

        output.append("},\"haircuts\":{");
        count = 0;
        for (String id : collages.keySet()) {
            count++;
            output.append("\"").append(id).append("\"");
            output.append(":\"").append(collages.get(id)[1]).append("\"");
            if (count < collages.keySet().size()) {
                output.append(",");
            }
        }

        output.append("}}");

        ServletOutputStream out = resp.getOutputStream();
        out.print(output.toString());
        out.flush();
    }
}