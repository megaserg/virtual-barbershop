package edu.virtual.barbershop;

import com.oreilly.servlet.MultipartRequest;
import com.oreilly.servlet.multipart.FileRenamePolicy;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;

public class UploadImageAction extends Action {
    public void perform(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        try {
            final String imageId = String.valueOf(System.currentTimeMillis());

            MultipartRequest multipartRequest = new MultipartRequest(req, storage.getImagesFolder(),
                    5000000, req.getCharacterEncoding(), new FileRenamePolicy() {
                @Override
                public File rename(File file) {
                    return new File(storage.getImagesFolder() + imageId + ".jpg");
                }
            });

            ServletOutputStream out = resp.getOutputStream();
            String output = "{\"" + imageId + "\":\"" + storage.getImagesFolder() + imageId +
                    ".jpg\"}";

            out.print(output);
            out.flush();
        } catch (IOException e) {
            logger.error(e.getMessage());
        }
    }
}
