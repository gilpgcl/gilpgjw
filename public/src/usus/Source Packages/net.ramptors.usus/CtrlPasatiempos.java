package net.ramptors.usus;

import javax.inject.Named;
import javax.enterprise.context.RequestScoped;
import net.ramptors.web.CtrlListado;

@Named
@RequestScoped
public class CtrlPasatiempos extends CtrlListado<Pasatiempo> {
  public CtrlPasatiempos() {
    super(Pasatiempo.class, Pasatiempo.TODOS);
  }
}
