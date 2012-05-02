package edu.virtual.barbershop;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.awt.*;
import java.awt.geom.AffineTransform;
import java.awt.image.BufferedImage;
import java.io.IOException;

public class ImageDealer {
    private static final Logger logger = LoggerFactory.getLogger(ImageDealer.class);

    public static BufferedImage mergeImages(BufferedImage first, BufferedImage second, int x, int y, double angle, double sx, double sy) throws IOException {
        BufferedImage res;
        if (first.getHeight() > 400) {
            double scale = 400 / (double) first.getHeight();
            res = scaleImage(first, scale, scale);
        } else {
            res = new BufferedImage(first.getWidth(), first.getHeight(), first.getType());
        }

        Graphics2D resGraphics = (Graphics2D) res.getGraphics();
        resGraphics.drawImage(first, 0 , 0, null);

        BufferedImage rotatedSecond = rotateImage(scaleImage(second, sx, sy), angle);

        int offset = rotatedSecond.getWidth()/2;
        resGraphics.drawImage(rotatedSecond, x - offset, y - offset, null);

        return res;
    }

    public static BufferedImage rotateImage(BufferedImage image, double angle) throws IOException {
        int size = (int) Math.sqrt(image.getWidth()*image.getWidth() + image.getHeight()*image.getHeight()) + 1;
        BufferedImage res = new BufferedImage(size, size, BufferedImage.TYPE_4BYTE_ABGR);

        Graphics2D resGraphics = (Graphics2D) res.getGraphics();
        AffineTransform at = new AffineTransform();

        int x = (size - image.getWidth())/2;
        int y = (size - image.getHeight())/2;
        at.translate(x, y);
        at.rotate(angle, image.getWidth() / 2, image.getHeight() / 2);

        resGraphics.drawImage(image, at, null);

//        ImageIO.write(res, "PNG", new File("rotated.png"));

        return res;
    }

    public static BufferedImage scaleImage(BufferedImage image, double sx, double sy) throws IOException {
        BufferedImage res = new BufferedImage((int) (image.getWidth() * sx), (int) (image.getHeight() * sy), BufferedImage.TYPE_4BYTE_ABGR);
        Graphics2D resGraphics = (Graphics2D) res.getGraphics();

        AffineTransform at = new AffineTransform();
        at.scale(sx, sy);

        resGraphics.drawImage(image, at, null);

//        ImageIO.write(res, "PNG", new File("scaled.png"));

        return res;
    }
}
