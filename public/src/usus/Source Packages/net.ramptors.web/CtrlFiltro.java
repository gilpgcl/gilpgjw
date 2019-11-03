package net.ramptors.web;

import java.io.Serializable;
import java.util.List;
import java.util.Objects;
import javax.faces.event.ValueChangeEvent;
import javax.inject.Inject;

/** Muestra un listado de objetos que contienen un texto en alguno de sus
 * campos. */
public abstract class CtrlFiltro<T> extends CtrlListadoBase<T>
    implements Serializable {
  private String filtro = "";
  private boolean filtrando;
  @Inject
  protected Dao dao;
  public CtrlFiltro(Class<T> tipo, String consulta) {
    super(tipo, consulta);
  }
  @Override
  protected List<T> buscaInstancias() {
    return dao.buscaInstancias(consulta, getFiltro(), tipo);
  }
  public String getFiltro() {
    return filtro;
  }
  public void setFiltro(String filtro) {
    this.filtro = Objects.toString(filtro, "");
    cargaInstancias();
  }
  public boolean isFiltrando() {
    return filtrando;
  }
  public void activaFiltrado() {
    this.filtrando = true;
    setFiltro("");
  }
  public void cancelaFiltrado() {
    this.filtrando = false;
    setFiltro("");
  }
}
