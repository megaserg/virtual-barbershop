package edu.virtual.barbershop;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ActionFactory {
    private static final Logger logger = LoggerFactory.getLogger(ActionFactory.class);

    public Action create(String actionName, Storage storage) {
        if (actionName.equalsIgnoreCase("mergeImages")) {
            ImageAction ia = new ImageAction();
            ia.setStorage(storage);
            return ia;
        } else {
            throw new RuntimeException(actionName + " cannot be found.");
        }
    }
}
