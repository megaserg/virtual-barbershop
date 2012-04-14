package edu.virtual.barbershop;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public abstract class Action {
    protected static final Logger logger = LoggerFactory.getLogger(Action.class);

    protected Storage storage;

    public void setStorage(Storage storage) {
        this.storage = storage;
    }

    public abstract void perform(HttpServletRequest request, HttpServletResponse response) throws IOException;
}
