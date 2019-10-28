package control;

import javax.inject.Named;
import javax.enterprise.context.RequestScoped;
import javax.faces.application.FacesMessage;
import javax.faces.context.FacesContext;

/** Controla las acciones de la forma.
 * <dl>
 * <dt><code>@Named(value = "referencia")</code></dt>
 * <dd>
 * las vistas pueden crear objetos de esta clase, pero el nombre de la
 * referencia que los manipula siempre debe ser <var>referencia</var>
 * </dd>
 * <dt><code>@RequestScoped</code></dt>
 * <dd>
 * las instancias se crean cuando el servidor recibe una solicitud http y se
 * dejan de usar una vez que se ha enviado la correspondiente respuesta http. Si
 * hay más solicitudes, se crea otro objeto.
 * </dd>
 * </dl>
 * <p>
 * Los objetos de esta clase tienen una estructura de Java Bean; es decir que
 * tienen constructor en blanco y los datos accesibles usan los métodos set y
 * get.
 * </p> */
@Named(value = "referencia")
@RequestScoped
public class CtrlSaludo {
  private String nombre;
  /** Devuelve el valor de nombre.
   * @return el valor de nombre */
  public String getNombre() {
    return nombre;
  }
  /** Asigna el valor de nombre.
   * @param nombre el valor de nombre. */
  public void setNombre(String nombre) {
    this.nombre = nombre;
  }
  /** Genera un saludo usano del valor de nombre. Antes de invocarlo hay que
   * asignarle valor a las propiedades. */
  public void saluda() {
    final String saludo = "Hola " + getNombre() + ".";
    FacesContext.getCurrentInstance()
        .addMessage(null, new FacesMessage(saludo));
  }
}
