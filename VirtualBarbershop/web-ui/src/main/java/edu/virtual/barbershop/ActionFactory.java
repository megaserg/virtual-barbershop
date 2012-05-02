package edu.virtual.barbershop;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ActionFactory {
    private static final Logger logger = LoggerFactory.getLogger(ActionFactory.class);

    public Action create(String actionName, Storage storage) {
        if (actionName.equalsIgnoreCase("upload")) {
            UploadImageAction uia = new UploadImageAction();
            uia.setStorage(storage);
            return uia;
        } else if (actionName.equalsIgnoreCase("getHaircuts")) {
            HaircutsAction ha = new HaircutsAction();
            ha.setStorage(storage);
            return ha;
        } if (actionName.equalsIgnoreCase("getCollages")) {
            CollagesAction ca = new CollagesAction();
            ca.setStorage(storage);
            return ca;
        } if (actionName.equalsIgnoreCase("getInfo")) {
            InfoAction ia = new InfoAction();
            ia.setStorage(storage);
            return ia;
        } if (actionName.equalsIgnoreCase("saveCollage")) {
            SaveCollageAction sca = new SaveCollageAction();
            sca.setStorage(storage);
            return sca;
        } else if (actionName.equalsIgnoreCase("getBarbershops")) {
            GetBarbershopsAction gba = new GetBarbershopsAction();
            gba.setStorage(storage);
            return gba;
        } else if (actionName.equalsIgnoreCase("addBarbershop")) {
            AddBarbershopAction aba = new AddBarbershopAction();
            aba.setStorage(storage);
            return aba;
        } else if (actionName.equalsIgnoreCase("uploadHaircut")) {
            UploadHaircutAction uha = new UploadHaircutAction();
            uha.setStorage(storage);
            return uha;
        } else {
            throw new RuntimeException(actionName + " cannot be found.");
        }
    }
}
