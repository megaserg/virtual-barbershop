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

    public String getBaseFolder() {
        return baseFolder;
    }

    public String getHaircutsFolder() {
        return haircutsFolder;
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

    public Map<String, ArrayList<HashMap<String, String>>> getInfos() {
        Map<String, ArrayList<HashMap<String, String>>> result =
                new HashMap<String, ArrayList<HashMap<String, String>>>();
        try {
            Statement statement = connection.createStatement();
            ResultSet resultSet = statement.executeQuery(
                    "select Haircut.id as haircut_id, Haircut.shape as haircut_shape, " +
                            "Offer.price, Barbershop.name as barbershop_name, " +
                            "Barbershop.phone, Barbershop.address " +
                    "from Haircut " +
                    "join Offer on Haircut.id = Offer.haircut_id " +
                    "join Barbershop on Offer.barbershop_id = Barbershop.id");

            while (resultSet.next()) {
                String haircutId = resultSet.getString("haircut_id");

                HashMap<String, String> info = new HashMap<String, String>();
                info.put("barbershop_name", resultSet.getString("barbershop_name"));
                info.put("address", resultSet.getString("address"));
                info.put("phone", resultSet.getString("phone"));
                info.put("price", resultSet.getString("price"));
                info.put("haircut_shape", resultSet.getString("haircut_shape"));

                if (!result.containsKey(haircutId)) {
                    result.put(haircutId, new ArrayList<HashMap<String, String>>());
                }
                result.get(haircutId).add(info);
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
        String faceImagePath = baseFolder + imagesFolder + faceId + ".jpg";
        String haircutImagePath = baseFolder + haircutsFolder + haircutId + ".png";
        String collageId = String.valueOf(System.currentTimeMillis());
        String collageImagePath = baseFolder + collagesFolder + collageId + ".png";

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

    public void addBarbershop(String name, String address, String phone) {
        try {
            Statement statement = connection.createStatement();
            statement.executeUpdate("insert into Barbershop (name, address, phone) values ('"
                    + name + "', '" + address + "', '" + phone + "')");
            statement.close();
        } catch (SQLException e) {
            logger.error(e.getMessage(), e);
        }
    }

    public Map<Integer, String> getBarbershops() {
        Map<Integer, String> result = new HashMap<Integer, String>();
        try {
            Statement statement = connection.createStatement();
            ResultSet resultSet = statement.executeQuery("select id, name from Barbershop");

            while (resultSet.next()) {
                Integer id = resultSet.getInt("id");
                String name = resultSet.getString("name");

                result.put(id, name);
            }
            resultSet.close();
            statement.close();
        } catch (SQLException e) {
            logger.error(e.getMessage(), e);
        }
        return result;
    }

    public void saveHaircut(String haircutId, String shape, String price, int barbershopId) {
        try {
            Statement statement = connection.createStatement();
            statement.executeUpdate("insert into Haircut (id, shape) values ('"
                    + haircutId + "', '" + shape + "')");
            statement.executeUpdate("insert into Offer (haircut_id, barbershop_id, price) values ('"
                    + haircutId + "', " + String.valueOf(barbershopId) + ", '" + price + "')");
            statement.close();
        } catch (SQLException e) {
            logger.error(e.getMessage(), e);
        }
    }

    private List<String> getHaircutIds() {
        List<String> result = new ArrayList<String>();
        try {
            Statement statement = connection.createStatement();
            ResultSet resultSet = statement.executeQuery("select id from Haircut");

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
