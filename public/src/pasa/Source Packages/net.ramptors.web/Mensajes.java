package net.ramptors.web;

import javax.enterprise.context.ApplicationScoped;
import javax.faces.application.FacesMessage;
import javax.faces.context.FacesContext;
import javax.inject.Inject;

/** Simplifica el manejo de mensajes. */
@ApplicationScoped
public class Mensajes {
  @Inject
  private FacesContext facesContext;
  /** Muestra un mensaje informativo.
   * @param idDeComponente id del componente de la página al que se asocia el
   * mensaje, o <code>null</code> si el mensaje es para toda la página.
   * @param texto contenido del mensaje. */
  public void información(String idDeComponente, final String texto) {
    mensaje(idDeComponente, FacesMessage.SEVERITY_INFO, texto, null);
  }
  /** Muestra un mensaje de error.
   * @param idDeComponente id del componente de la página al que se asocia el
   * mensaje, o <code>null</code> si el mensaje es para toda la página.
   * @param texto contenido del mensaje. */
  public void error(String idDeComponente, final String texto) {
    mensaje(idDeComponente, FacesMessage.SEVERITY_ERROR, texto, null);
  }
  /** Muestra un mensaje con el tipo, resumen y detalles indicados.
   * @param idDeComponente id del componente de la página al que se asocia el
   * mensaje, o <code>null</code> si el mensaje es para toda la página.
   * @param tipo tipo del mensaje. Puede ser FacesMessage.SEVERITY_ERROR,
   * FacesMessage.SEVERITY_FATAL, FacesMessage.SEVERITY_INFO ó
   * FacesMessage.SEVERITY_WARN.
   * @param resumen versión corta del mensaje.
   * @param detalle versión larga del mensaje. */
  public void mensaje(String idDeComponente, FacesMessage.Severity tipo,
      String resumen, String detalle) {
    facesContext
        .addMessage(idDeComponente, new FacesMessage(tipo, resumen, detalle));
  }
  /** Analiza una excepción para poder mostrar el mensaje de error que lleva.
   * Normalmente cuendo un EJB detecta un error, lanza otras excepciones y
   * guarda la causa original. Esta última es necesaria para mostrar el mensaje
   * que manda el manejador de base de datos.
   * @param e excepción que describe un error. */
  public void procesa(Throwable e) {
    Throwable causa = e.getCause();
    while (causa != null && causa != e) {
      e = causa;
      causa = e.getCause();
    }
    final String mensaje = e.getLocalizedMessage();
    if (mensaje == null || mensaje.isEmpty()) {
      error(null, e.toString());
    } else {
      error(null, e.getLocalizedMessage());
    }
  }
}
