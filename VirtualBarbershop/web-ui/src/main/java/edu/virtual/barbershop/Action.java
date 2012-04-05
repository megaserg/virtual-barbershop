package edu.virtual.barbershop;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public abstract class Action {
    public abstract void perform(HttpServletRequest request, HttpServletResponse response) throws IOException;
}
