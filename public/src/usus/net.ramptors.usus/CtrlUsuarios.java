package net.ramptors.usus;

import java.io.Serializable;
import javax.inject.Named;
import javax.enterprise.context.RequestScoped;
import javax.faces.view.ViewScoped;
import net.ramptors.web.CtrlFiltro;

@Named
@ViewScoped
public class CtrlUsuarios extends CtrlFiltro<Usuario> {
  public CtrlUsuarios() {
    super(Usuario.class, Usuario.FILTRO);
  }
}
