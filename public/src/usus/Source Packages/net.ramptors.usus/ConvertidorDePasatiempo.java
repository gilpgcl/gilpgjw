package net.ramptors.usus;

import javax.enterprise.context.Dependent;
import javax.inject.Named;
import net.ramptors.web.ConvertidorDeEntidad;

/** Permite manejar roles dentro de combos. */
@Named
@Dependent
public class ConvertidorDePasatiempo
    extends ConvertidorDeEntidad<Pasatiempo, Integer> {
  public ConvertidorDePasatiempo() {
    super(Pasatiempo.class, Integer.class);
  }
}
