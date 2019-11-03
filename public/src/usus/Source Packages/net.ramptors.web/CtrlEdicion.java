package net.ramptors.web;

import java.io.Serializable;
import javax.annotation.PostConstruct;
import javax.ejb.EJBException;
import javax.faces.context.ExternalContext;
import javax.inject.Inject;

/** Controlador que permite editar las propiedades de un objeto.
 * @param <T> Tipo que edita
 * @param <I> Tipo de la llave primaria del tipo que edita. */
public abstract class CtrlEdicion<T extends Entidad<I>, I>
    implements Serializable {
  private static final long serialVersionUID = 1L;
  protected final Class<T> tipoEntidad;
  protected final Class<I> tipoId;
  public CtrlEdicion(Class<T> tipoEntidad, Class<I> tipoId) {
    this.tipoEntidad = tipoEntidad;
    this.tipoId = tipoId;
  }
  @Inject
  protected Mensajes mensajes;
  @Inject
  protected Dao dao;
  @Inject
  private ExternalContext externalContext;
  protected I id;
  protected T modelo;
  @PostConstruct
  public void init() {
    try {
      leeLlavePrimaria();
    } catch (Exception ex) {
      // Si no se puede recuperar la llave primaria, se considera que es una alta.
      id = null;
    }
    try {
      // Se recupera el objeto a insertar.
      if (isNuevo()) {
        modelo = tipoEntidad.newInstance();
      } else {
        modelo = dao.busca(tipoEntidad, id);
      }
    } catch (IllegalAccessException | InstantiationException | EJBException ex) {
      procesaErrores(ex);
    }
  }
  public T getModelo() {
    return modelo;
  }
  public boolean isNuevo() {
    return id == null;
  }
  public String regresa() {
    return "index?faces-redirect=true";
  }
  public String guarda() {
    try {
      if (isNuevo()) {
        dao.agrega(modelo);
      } else {
        dao.modifica(modelo);
      }
      return regresa();
    } catch (EJBException ex) {
      procesaErrores(ex);
      return null;
    }
  }
  public String elimina() {
    try {
      if (modelo != null) {
        dao.elimina(modelo.getClass(), modelo.getId());
        return "index?faces-redirect=true";
      }
    } catch (Exception ex) {
      mensajes.procesa(ex);
    }
    return null;
  }
  protected void leeLlavePrimaria() throws Exception {
    final String parámetroId =
        externalContext.getRequestParameterMap().get("id");
    id = tipoId.getDeclaredConstructor(String.class).newInstance(parámetroId);
  }
  protected void procesaErrores(Exception ex) {
    mensajes.procesa(ex);
  }
}
