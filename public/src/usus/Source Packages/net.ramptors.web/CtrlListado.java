package net.ramptors.web;

import java.util.List;
import javax.inject.Inject;

/** Muestra todas las instancias de una entidad.
 * @param <T> tipo de la entidad. */
public abstract class CtrlListado<T> extends CtrlListadoBase<T> {
  @Inject
  protected Dao ejb;
  public CtrlListado(Class<T> tipo, String consulta) {
    super(tipo, consulta);
  }
  @Override
  protected List<T> buscaInstancias() {
    return ejb.buscaInstancias(consulta, tipo);
  }
}
