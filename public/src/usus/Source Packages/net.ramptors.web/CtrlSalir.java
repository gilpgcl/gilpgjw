package net.ramptors.web;

import javax.enterprise.context.ApplicationScoped;
import javax.faces.context.ExternalContext;
import javax.inject.Inject;
import javax.inject.Named;

/** Termina la sesión y la conversación en curso. */
@Named
@ApplicationScoped
public class CtrlSalir {
  @Inject
  private ExternalContext externalContext;
  /** Termina la sesión y la conversación en curso. Posteriormente muestra una
   * vista.
   * @param reinicio vista que se muestra después de terminar la sesión.
   * @return la vista que se debe mostrar. */
  public String salir(final String reinicio) {
    externalContext.invalidateSession();
    return reinicio + "?faces-redirect=true";
  }
}
