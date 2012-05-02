package edu.virtual.barbershop;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class SaveCollageAction extends Action {
    public void perform(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        String faceId = req.getParameter("face_id");
        String haircutId = req.getParameter("haircut_id");
        int x = Integer.parseInt(req.getParameter("x"));
        int y = Integer.parseInt(req.getParameter("y"));
        double angle = Double.parseDouble(req.getParameter("angle"));
        double sx = Double.parseDouble(req.getParameter("sx"));
        double sy = Double.parseDouble(req.getParameter("sy"));

        String collageId = storage.saveCollage(faceId, haircutId, x, y, angle, sx, sy);

        ServletOutputStream out = resp.getOutputStream();
        String output = "{\"collage_id\":\"" + collageId + "\"}";

        out.print(output);
        out.flush();
    }
}
