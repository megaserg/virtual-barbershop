package edu.virtual.barbershop;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.awt.image.BufferedImage;
import java.io.*;

public class ImageAction extends Action {
    public void perform(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        String image1 = req.getParameter("image1");
        String image2 = req.getParameter("image2");
        int x = Integer.parseInt(req.getParameter("x"));
        int y = Integer.parseInt(req.getParameter("y"));
        double angle = Double.parseDouble(req.getParameter("angle"));
        double sx = Double.parseDouble(req.getParameter("sx"));
        double sy = Double.parseDouble(req.getParameter("sy"));

        BufferedImage res =
                ImageDealer.mergeImages(
                        ImageIO.read(new File(image1)),
                        ImageIO.read(new File(image2)),
                        x, y, angle, sx, sy
                );

        ImageIO.write(res, "PNG", new File("combined.png"));

        //resp.setContentType("image/png");

        File file = new File("combined.png");
        resp.setContentLength((int) file.length());

        FileInputStream in = new FileInputStream(file);
        OutputStream out = resp.getOutputStream();

        byte[] buf = new byte[1024];
        int count = 0;
        while ((count = in.read(buf)) >= 0) {
            out.write(buf, 0, count);
        }

        in.close();
        out.flush();
        out.close();
    }
}
