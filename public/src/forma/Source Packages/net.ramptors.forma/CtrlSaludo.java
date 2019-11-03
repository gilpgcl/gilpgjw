package net.ramptors.forma;

import javax.inject.Named;
import javax.enterprise.context.RequestScoped;
import javax.faces.annotation.FacesConfig;
import javax.faces.application.FacesMessage;
import javax.faces.context.FacesContext;
import javax.inject.Inject;

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
 * </p>
 * Este se archivo se crea con
 * <ol>
 * <li>Selecciona un paquete en <q>Source Packages</q></li>
 * <li>Menú: File > New File…</li>
 * <li>
 * <dl>
 * <dt>Categories:</dt>
 * <dd>JavaServer Faces</dd>
 * <dt>File Types:</dt>
 * <dd>JSF CDI Bean</dd>
 * </dl>
 * Clic en <q>Next ></q>
 * </li>
 * <li>
 * <dl>
 * <dt>Class Name:</dt>
 * <dd>CtrlSaludo</dd>
 * <dt>Package:</dt>
 * <dd>net.ramptors.forma</dd>
 * <dt>Name:</dt>
 * <dd>referencia</dd>
 * <dt>Scope:</dt>
 * <dd>request</dd>
 * </dl>
 * Clic en <q>Finish</q>
 * </li>
 * </ol> */
@Named(value = "referencia")
@RequestScoped
@FacesConfig
public class CtrlSaludo {
  @Inject
  FacesContext facesContext;
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
    facesContext.addMessage(null, new FacesMessage(saludo));
  }
}
