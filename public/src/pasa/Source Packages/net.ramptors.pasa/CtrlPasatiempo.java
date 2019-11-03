package net.ramptors.pasa;

import java.io.Serializable;
import javax.faces.context.ExternalContext;
import javax.faces.context.FacesContext;
import javax.faces.view.ViewScoped;
import javax.inject.Inject;
import javax.inject.Named;
import net.ramptors.web.Mensajes;

/** Controlador que se utiliza en varias vistas. La anotación
 * <code>@ViewScoped</code> indica que los objetos se mantienen almacenados en
 * el archivo de sesión mientras se muestre la vista que está usando este bean.
 * Al cambiar de vista, los datos se pierden. La url debe recibir un parámetro
 * con el id del Conocido. En caso de que no haya id, se marca un error. */
@Named
@ViewScoped
public class CtrlPasatiempo implements Serializable {
  private static final long serialVersionUID = 1L;
  @Inject
  private Mensajes mensajes;
  @Inject
  private ExternalContext externalContext;
  @Inject
  private DaoPasatiempo dao;
  private Integer id;
  private Pasatiempo modelo;
  public Integer getId() {
    return id;
  }
  public void setId(Integer id) {
    this.id = id;
  }
  public Pasatiempo getModelo() {
    return modelo;
  }
  public void init() {
    try {
      leeLlavePrimaria();
      this.modelo = dao.busca(id);
    } catch (NumberFormatException e) {
      mensajes.error(null, "Id no encontrado.");
    } catch (Exception e) {
      mensajes.procesa(e);
    }
  }
  private void leeLlavePrimaria() throws NumberFormatException {
    final String parámetroId =
        externalContext.getRequestParameterMap().get("id");
    id = new Integer(parámetroId);
  }
  public String guarda() {
    try {
      dao.modifica(modelo);
      return "index?faces-redirect=true";
    } catch (Exception ex) {
      mensajes.procesa(ex);
      return null;
    }
  }
  public String elimina() {
    try {
      if (modelo != null) {
        dao.elimina(modelo);
        return "index?faces-redirect=true";
      }
    } catch (Exception ex) {
      mensajes.procesa(ex);
    }
    return null;
  }
}
