package edu.virtual.barbershop;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Required;

public class Storage {
    private static final Logger logger = LoggerFactory.getLogger(Storage.class);

    public String haircutFolder;
    private String collageFolder;
    private String tempFolder;

    @Required
    public void setHaircutFolder(String haircutFolder) {
        this.haircutFolder = haircutFolder;
    }

    @Required
    public void setCollageFolder(String collageFolder) {
        this.collageFolder = collageFolder;
    }

    @Required
    public void setTempFolder(String tempFolder) {
        this.tempFolder = tempFolder;
    }

    public void initBaseFolder(String baseFolder) {
        haircutFolder = baseFolder + haircutFolder;
        collageFolder = baseFolder + collageFolder;
        tempFolder = baseFolder + tempFolder;
    }
}
