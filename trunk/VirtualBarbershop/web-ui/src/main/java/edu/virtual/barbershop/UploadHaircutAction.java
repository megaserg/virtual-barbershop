package edu.virtual.barbershop;

import com.oreilly.servlet.MultipartRequest;
import com.oreilly.servlet.multipart.FileRenamePolicy;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;

public class UploadHaircutAction extends Action {
    public void perform(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        String shape = req.getParameter("shape");
        String price = req.getParameter("price");
        int barbershopId = Integer.parseInt(req.getParameter("barbershop_id"));

        final String haircutId = String.valueOf(System.currentTimeMillis());
        ServletOutputStream out = resp.getOutputStream();

        try {
            MultipartRequest multipartRequest = new MultipartRequest(req,
                    storage.getBaseFolder() + storage.getHaircutsFolder(),
                    5000000, req.getCharacterEncoding(), new FileRenamePolicy() {
                @Override
                public File rename(File file) {
                    return new File(storage.getBaseFolder() + storage.getHaircutsFolder()
                            + haircutId + ".png");
                }
            });
        } catch (IOException e) {
            logger.error(e.getMessage());

            out.print("false");
            out.flush();

            return;
        }

        boolean res = storage.saveHaircut(haircutId, shape, price, barbershopId);

        out.print(res);
        out.flush();
    }
}