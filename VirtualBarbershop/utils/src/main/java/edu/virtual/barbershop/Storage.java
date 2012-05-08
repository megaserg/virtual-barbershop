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

    public boolean init(String baseFolder) {
        this.baseFolder = baseFolder;

        try {
            String driverName = "com.mysql.jdbc.Driver";
            Class.forName(driverName).newInstance();
            connection = DriverManager.getConnection(dbUrl + dbName, user, password);
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            return false;
        }

        if (!createTables()) {
            return true;
        }

        insertHaircutsInfo();
        insertBarbershopsInfo();
        insertOffersInfo();
        insertCollageInfo();

        return true;
    }

    private boolean createTables() {
        try {
            Statement statement = connection.createStatement();

            String barbershop =
                    "create table Barbershop ( "
                            + "id int primary key auto_increment not null, "
                            + "name varchar(50), "
                            + "address varchar(100), "
                            + "phone varchar(50))";
            String haircut =
                    "create table Haircut ( "
                            + "id varchar(50), "
                            + "shape varchar(50))";
            String collage =
                    "create table Collage ( "
                            + "id varchar(50), "
                            + "haircut_id varchar(50))";
            String offer =
                    "create table Offer ( "
                            + "haircut_id varchar(50), "
                            + "barbershop_id varchar(50), "
                            + "price varchar(50))";

            statement.executeUpdate(barbershop);
            statement.executeUpdate(haircut);
            statement.executeUpdate(collage);
            statement.executeUpdate(offer);

            statement.close();

            return true;
        } catch (SQLException e) {
            logger.info("DB already created.");
            return false;
        }
    }

    private void insertHaircutsInfo() {
        try {
            Statement statement = connection.createStatement();

            statement.executeUpdate("insert into Haircut (id, shape) values ('ht1', 'massive')");
            statement.executeUpdate("insert into Haircut (id, shape) values ('ht2', 'progressive')");
            statement.executeUpdate("insert into Haircut (id, shape) values ('ht3', 'mixed')");
            statement.executeUpdate("insert into Haircut (id, shape) values ('ht4', 'massive')");
            statement.executeUpdate("insert into Haircut (id, shape) values ('ht5', 'progressive')");
            statement.executeUpdate("insert into Haircut (id, shape) values ('ht6', 'uniform')");
            statement.executeUpdate("insert into Haircut (id, shape) values ('ht7', 'mixed')");
            statement.executeUpdate("insert into Haircut (id, shape) values ('ht8', 'graded')");

            statement.close();
        } catch (SQLException e) {
            logger.error(e.getMessage(), e);
        }
    }

    private void insertBarbershopsInfo() {
        try {
            Statement statement = connection.createStatement();

            statement.executeUpdate("insert into Barbershop (name, address, phone) values " +
                    "('Barbershop \"Svetlana\"', '325 Wall St. New York', '952-234-2351')");

            statement.executeUpdate("insert into Barbershop (name, address, phone) values " +
                    "('Barbershop \"Mimoza\"', '36 Round Sq. San Francisco', '352-216-1616')");

            statement.executeUpdate("insert into Barbershop (name, address, phone) values " +
                    "('Barbershop \"Rusalka\"', '156 Circle Av. Denwer', '261-645-9784')");

            statement.close();
        } catch (SQLException e) {
            logger.error(e.getMessage(), e);
        }
    }

    private void insertOffersInfo() {
        try {
            Statement statement = connection.createStatement();

            statement.executeUpdate("insert into Offer (haircut_id, barbershop_id, price) values ('ht1', 1, '100$')");
            statement.executeUpdate("insert into Offer (haircut_id, barbershop_id, price) values ('ht2', 2, '50$')");
            statement.executeUpdate("insert into Offer (haircut_id, barbershop_id, price) values ('ht3', 3, '40$')");
            statement.executeUpdate("insert into Offer (haircut_id, barbershop_id, price) values ('ht4', 1, '150$')");
            statement.executeUpdate("insert into Offer (haircut_id, barbershop_id, price) values ('ht5', 2, '200$')");
            statement.executeUpdate("insert into Offer (haircut_id, barbershop_id, price) values ('ht6', 3, '130$')");
            statement.executeUpdate("insert into Offer (haircut_id, barbershop_id, price) values ('ht7', 1, '75$')");
            statement.executeUpdate("insert into Offer (haircut_id, barbershop_id, price) values ('ht8', 2, '36$')");
            statement.executeUpdate("insert into Offer (haircut_id, barbershop_id, price) values ('ht1', 3, '40$')");
            statement.executeUpdate("insert into Offer (haircut_id, barbershop_id, price) values ('ht2', 1, '125$')");
            statement.executeUpdate("insert into Offer (haircut_id, barbershop_id, price) values ('ht3', 2, '123$')");
            statement.executeUpdate("insert into Offer (haircut_id, barbershop_id, price) values ('ht4', 3, '256$')");
            statement.executeUpdate("insert into Offer (haircut_id, barbershop_id, price) values ('ht5', 1, '234$')");
            statement.executeUpdate("insert into Offer (haircut_id, barbershop_id, price) values ('ht6', 2, '14$')");
            statement.executeUpdate("insert into Offer (haircut_id, barbershop_id, price) values ('ht7', 3, '63$')");
            statement.executeUpdate("insert into Offer (haircut_id, barbershop_id, price) values ('ht8', 1, '10$')");
            statement.executeUpdate("insert into Offer (haircut_id, barbershop_id, price) values ('ht1', 2, '15$')");
            statement.executeUpdate("insert into Offer (haircut_id, barbershop_id, price) values ('ht8', 3, '212$')");

            statement.close();
        } catch (SQLException e) {
            logger.error(e.getMessage(), e);
        }
    }

    private void insertCollageInfo() {
        try {
            Statement statement = connection.createStatement();

            statement.executeUpdate("insert into Collage (id, haircut_id) values ('collage', 'ht5')");

            statement.close();
        } catch (SQLException e) {
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
            ResultSet resultSet = statement.executeQuery("select * from Collage order by id");

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

    public boolean addBarbershop(String name, String address, String phone) {
        try {
            Statement statement = connection.createStatement();
            statement.executeUpdate("insert into Barbershop (name, address, phone) values ('"
                    + name + "', '" + address + "', '" + phone + "')");
            statement.close();

            return true;
        } catch (SQLException e) {
            logger.error(e.getMessage(), e);

            return false;
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

    public boolean saveHaircut(String haircutId, String shape, String price, int barbershopId) {
        try {
            Statement statement = connection.createStatement();
            statement.executeUpdate("insert into Haircut (id, shape) values ('"
                    + haircutId + "', '" + shape + "')");
            statement.executeUpdate("insert into Offer (haircut_id, barbershop_id, price) values ('"
                    + haircutId + "', " + String.valueOf(barbershopId) + ", '" + price + "')");
            statement.close();

            return true;
        } catch (SQLException e) {
            logger.error(e.getMessage(), e);

            return false;
        }
    }

    private List<String> getHaircutIds() {
        List<String> result = new ArrayList<String>();
        try {
            Statement statement = connection.createStatement();
            ResultSet resultSet = statement.executeQuery("select id from Haircut order by id");

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
