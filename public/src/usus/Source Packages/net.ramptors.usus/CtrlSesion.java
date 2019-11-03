package net.ramptors.usus;

import java.util.Objects;
import javax.annotation.PostConstruct;
import javax.ejb.EJBException;
import javax.enterprise.context.RequestScoped;
import javax.faces.context.ExternalContext;
import javax.inject.Inject;
import javax.inject.Named;
import javax.validation.constraints.Size;
import net.ramptors.web.CtrlEdicion;
import net.ramptors.web.Dao;
import net.ramptors.web.Encriptador;
import net.ramptors.web.Mensajes;

@Named
@RequestScoped
public class CtrlSesion {
  @Inject
  protected Mensajes mensajes;
  @Inject
  protected Dao dao;
  @Inject
  private ExternalContext externalContext;
  private Usuario modelo;
  @PostConstruct
  public void init() {
    try {
      modelo = dao.busca(Usuario.class,
          externalContext.getUserPrincipal().getName());
    } catch (Exception ex) {
      procesaErrores(ex);
    }
  }
  public Usuario getModelo() {
    return modelo;
  }
  public String regresa() {
    return "index?faces-redirect=true";
  }
  protected void procesaErrores(Exception ex) {
    mensajes.procesa(ex);
  }
}
