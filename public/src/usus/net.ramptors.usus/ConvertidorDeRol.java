package net.ramptors.usus;

import javax.enterprise.context.Dependent;
import javax.inject.Named;
import net.ramptors.web.ConvertidorDeEntidad;

/** Permite manejar roles dentro de combos. */
@Named
@Dependent
public class ConvertidorDeRol extends ConvertidorDeEntidad<Rol, String> {
  public ConvertidorDeRol() {
    super(Rol.class, String.class);
  }
}
