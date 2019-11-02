package net.ramptors.usus;

import java.util.HashMap;
import java.util.Map;
import javax.enterprise.context.ApplicationScoped;
import javax.enterprise.inject.Produces;
import javax.inject.Singleton;
import net.ramptors.web.ReemplazoDeMensajes;

/** Proporciona el map para el reemplazo de mensajes. */
@ApplicationScoped
public class ProveedorDeReemplazoDeMensajes {
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
