package edu.virtual.barbershop;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Required;

public class Storage {
    private static final Logger logger = LoggerFactory.getLogger(Storage.class);

    private String imagesFolder;

    @Required
    public void setImagesFolder(String imagesFolder) {
        this.imagesFolder = imagesFolder;
    }
}
