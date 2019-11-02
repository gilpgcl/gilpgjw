package net.ramptors.usus;

import javax.enterprise.context.Dependent;
import javax.enterprise.inject.Produces;
import javax.faces.annotation.FacesConfig;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

/** Indica como crear una instancia de Entity Manager. Se usa porque en la clase
 * <code>InfoConocido</code> se tiene la anotación <code>@Inject<br />
 * private EntityManager em;<br />
 * </code> donde solicita un <code>EntityManager</code> que se enlaza con la
 * variable <var>em</var>. Como CDI encuentra la anotación
 * <code>@Produces</code>, decide usar la declaración de esta clase.
 * <p>
 * La anotación <code>@Dependent</code> permite que esta clase sea analizada por
 * CDI.
 * </p>
 * TODO Poner como se crea. */
@Dependent
@FacesConfig
public class Config {
  /* @Produces indica que se puede usar en @Inject. @PersistenceContext indica
   * que usa transacciones y el archivo persistence.xml */
  @Produces
  @PersistenceContext
  EntityManager em;
}
