package edu.virtual.barbershop;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Map;

public class InfoAction extends Action {
    public void perform(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        Map<String, String[]> infos = storage.getInfos();

        StringBuilder output = new StringBuilder();
        output.append("{info:{");

        int count = 0;
        for (String id : infos.keySet()) {
            count++;
            output.append(id);
            output.append(":[");

            String[] collageInfos = infos.get(id);
            int count2 = 0;
            for (String info : collageInfos) {
                count2++;
                output.append("'");
                output.append(info);
                output.append("'");
                if (count2 < collageInfos.length) {
                    output.append(",");
                }
            }

            output.append("]");
            if (count < infos.keySet().size()) {
                output.append(",");
            }
        }

        output.append("}}");

        ServletOutputStream out = resp.getOutputStream();
        out.print(escape(output.toString()));
        out.flush();
    }
}
