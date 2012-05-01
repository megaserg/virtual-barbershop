package edu.virtual.barbershop;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Required;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.sql.*;
import java.util.*;

public class Storage {
    private static final Logger logger = LoggerFactory.getLogger(Storage.class);

    private String haircutsFolder;
    private String collagesFolder;
    private String imagesFolder;
    private String baseFolder;

    private String dbUrl;
    private String dbName;
    private String user;
    private String password;

    private Connection connection = null;

    @Required
    public void setHaircutsFolder(String haircutsFolder) {
        this.haircutsFolder = haircutsFolder;
    }

    @Required
    public void setCollagesFolder(String collagesFolder) {
        this.collagesFolder = collagesFolder;
    }

    @Required
    public void setImagesFolder(String imagesFolder) {
        this.imagesFolder = imagesFolder;
    }

    @Required
    public void setPassword(String password) {
        this.password = password;
    }

    @Required
    public void setDbName(String dbName) {
        this.dbName = dbName;
    }

    @Required
    public void setUser(String user) {
        this.user = user;
    }

    @Required
    public void setDbUrl(String dbUrl) {
        this.dbUrl = dbUrl;
    }

    public void init(String baseFolder) {
        this.baseFolder = baseFolder;
        haircutsFolder = baseFolder + haircutsFolder;
        collagesFolder = baseFolder + collagesFolder;
        imagesFolder = baseFolder + imagesFolder;

        try {
            String driverName = "com.mysql.jdbc.Driver";
            Class.forName(driverName).newInstance();
            connection = DriverManager.getConnection(dbUrl + dbName, user, password);
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
        }
    }

    public String getImagesFolder() {
        return imagesFolder;
    }

    public Map<String, String> getHaircuts() {
        Map<String, String> result = new HashMap<String, String>();

        List<String> haircutIds = getHaircutIds();
        for (String id : haircutIds) {
            result.put(id, haircutsFolder + id + ".png");
        }

        return result;
    }

    public Map<String, String[]> getCollages() {
        Map<String, String[]> result = new HashMap<String, String[]>();
        try {
            Statement statement = connection.createStatement();
            ResultSet resultSet = statement.executeQuery("select * from Collage");
            if (!resultSet.first()) {
                return result;
            }

            while (resultSet.next()) {
                String collageId = resultSet.getString("id");
                String path = collagesFolder + collageId + ".png";
                String haircutId = resultSet.getString("haircut_id");

                String[] info = new String[2];
                info[0] = path;
                info[1] = haircutId;

                result.put(collageId, info);
            }
            resultSet.close();
            statement.close();
        } catch (SQLException e) {
            logger.error(e.getMessage(), e);
        }
        return result;
    }

    public Map<String, String[]> getInfos() {
        Map<String, String[]> result = new HashMap<String, String[]>();
        try {
            Statement statement = connection.createStatement();
            ResultSet resultSet = statement.executeQuery(
                    "select Collage.id as collage_id, Haircut.name as haircut_name," +
                            "Offer.price, Barbershop.name as barbershop_name, Barbershop.phone" +
                    "from Collage" +
                    "join Haircut on Collage.haircut_id = Haircut.id" +
                    "join Offer on Haicut.id = Offer.haircut_id" +
                    "join Barbershop on Offer.barbershop_id = Barbershop.id");
            if (!resultSet.first()) {
                return result;
            }

            while (resultSet.next()) {
                String collageId = resultSet.getString("collage_id");
                String haircutName = resultSet.getString("haircut_name");
                String price = resultSet.getString("price");
                String barbershopName = resultSet.getString("barbershop_name");
                String phone = resultSet.getString("phone");

                String[] info = new String[4];
                info[0] = haircutName;
                info[1] = price;
                info[2] = barbershopName;
                info[3] = phone;

                result.put(collageId, info);
            }
            resultSet.close();
            statement.close();
        } catch (SQLException e) {
            logger.error(e.getMessage(), e);
        }
        return result;
    }

    public String saveCollage(String faceId, String haircutId,
            int x, int y, double angle, double sx, double sy) throws IOException
    {
        String faceImagePath = imagesFolder + faceId + ".jpg";
        String haircutImagePath = haircutsFolder + haircutId + ".png";
        String collageId = String.valueOf(System.currentTimeMillis());
        String collageImagePath = collagesFolder + collageId + ".png";

        BufferedImage res =
            ImageDealer.mergeImages(
                    ImageIO.read(new File(faceImagePath)),
                    ImageIO.read(new File(haircutImagePath)),
                    x, y, angle, sx, sy
            );

        ImageIO.write(res, "PNG", new File(collageImagePath));

        try {
            Statement statement = connection.createStatement();
            statement.executeUpdate("insert into Collage (id, haircut_id) values ('"
                    + collageId + "', '" + haircutId + "')");
            statement.close();
        } catch (SQLException e) {
            logger.error(e.getMessage(), e);
        }

        return collageId;
    }

    private List<String> getHaircutIds() {
        List<String> result = new ArrayList<String>();
        try {
            Statement statement = connection.createStatement();
            ResultSet resultSet = statement.executeQuery("select id from Haircut");
            if (!resultSet.first()) {
                return result;
            }

            while (resultSet.next()) {
                result.add(resultSet.getString("id"));
            }
            resultSet.close();
            statement.close();
        } catch (SQLException e) {
            logger.error(e.getMessage(), e);
        }
        return result;
    }

}
