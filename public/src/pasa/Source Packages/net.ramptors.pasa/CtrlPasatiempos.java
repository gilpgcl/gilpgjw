package net.ramptors.pasa;

import java.util.List;
import javax.annotation.PostConstruct;
import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.inject.Named;
import net.ramptors.web.Mensajes;

@Named
@RequestScoped
public class CtrlPasatiempos {
  @Inject
  private Mensajes mensajes;
  @Inject
  private DaoPasatiempo dao;
  private List<Pasatiempo> instancias;
  /* @PostConstruct indica que el método se ejecuta después de crear el objeto y
   * realizar todos los inject. Funciona casi como un constructor. */
  @PostConstruct
  void init() {
    try {
      instancias = dao.consulta();
    } catch (Exception ex) {
      mensajes.procesa(ex);
    }
  }
  public List<Pasatiempo> getInstancias() {
    return instancias;
  }
}
