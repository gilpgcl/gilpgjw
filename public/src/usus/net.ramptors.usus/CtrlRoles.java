package net.ramptors.usus;

import javax.inject.Named;
import javax.enterprise.context.RequestScoped;
import net.ramptors.web.CtrlListado;

@Named
@RequestScoped
public class CtrlRoles extends CtrlListado<Rol> {
  public CtrlRoles() {
    super(Rol.class, Rol.TODOS);
  }
}
