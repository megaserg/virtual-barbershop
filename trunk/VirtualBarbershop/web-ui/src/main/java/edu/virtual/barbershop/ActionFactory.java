package edu.virtual.barbershop;

public class ActionFactory {
    public Action create(String actionName) {
        if (actionName.equalsIgnoreCase("mergeImages")) {
            ImageAction ia = new ImageAction();
            return ia;
        } else {
            throw new RuntimeException(actionName + " cannot be found.");
        }
    }
}
