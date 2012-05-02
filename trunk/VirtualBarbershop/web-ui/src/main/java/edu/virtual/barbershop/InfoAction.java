package edu.virtual.barbershop;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class InfoAction extends Action {
    public void perform(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        Map<String, ArrayList<HashMap<String, String>>> infos = storage.getInfos();

        StringBuilder output = new StringBuilder();
        output.append("{\"info\":{");

        int count = 0;
        for (String id : infos.keySet()) {
            count++;
            output.append("\"").append(id).append("\"");
            output.append(":[");

            ArrayList<HashMap<String, String>> haircutInfos = infos.get(id);
            int count2 = 0;
            for (HashMap<String, String> info : haircutInfos) {
                count2++;
                output.append("{");

                int count3 = 0;
                for (String attr : info.keySet()) {
                    count3++;

                    output.append("\"").append(attr).append("\"");
                    output.append(":\"").append(info.get(attr)).append("\"");

                    if (count3 < info.keySet().size()) {
                        output.append(",");
                    }
                }

                output.append("}");

                if (count2 < haircutInfos.size()) {
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
        out.print(output.toString());
        out.flush();
    }
}
