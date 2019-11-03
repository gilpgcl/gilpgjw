package net.ramptors.usus;

import java.util.HashMap;
import java.util.Map;
import javax.enterprise.context.Dependent;
import javax.enterprise.inject.Produces;
import javax.faces.annotation.FacesConfig;
import javax.inject.Singleton;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import net.ramptors.web.ReemplazoDeMensajes;

@Dependent
@FacesConfig
public class Config {
  /* @Produces indica que se puede usar en @Inject. @PersistenceContext indica
   * que usa transacciones y el archivo persistence.xml */
  @Produces
  @PersistenceContext
  EntityManager em;
  private static final Map<String, String> reemplazoDeMensajes =
      new HashMap<String, String>() {
    {
      put("PRIMARY", "Cue duplicado.");
      put("USU_UNK_NOMBRE", "Nombre duplicado.");
    }
  };
  @Produces
  @Singleton
  @ReemplazoDeMensajes
  public Map<String, String> getReemplazoDeMensajes() {
    return reemplazoDeMensajes;
  }
}
