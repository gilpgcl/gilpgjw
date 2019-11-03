package net.ramptors.web;

import java.util.List;
import javax.annotation.PostConstruct;
import javax.ejb.EJBException;
import javax.inject.Inject;

/** Muestra un listado de objetos. Se crean clases hijas que se encargan de
 * buscar los datos, pero otras tareas necesarias, como el manejo de errores y
 * almacenamiento de datos, se realizan aquí. */
public abstract class CtrlListadoBase<T> {
  protected final Class<T> tipo;
  protected final String consulta;
  public CtrlListadoBase(Class<T> tipo, String consulta) {
    this.tipo = tipo;
    this.consulta = consulta;
  }
  @Inject
  protected Mensajes mensajes;
  protected List<T> instancias;
  /** Las clases hijas deben buscar los datos que se muestran.
   * @return los datos que se mustran. */
  protected abstract List<T> buscaInstancias();
  @PostConstruct
  public void cargaInstancias() {
    try {
      instancias = buscaInstancias();
    } catch (EJBException ex) {
      procesaErrores(ex);
    }
  }
  public List<T> getInstancias() {
    return instancias;
  }
  protected void procesaErrores(Exception ex) {
    mensajes.procesa(ex);
  }
}
