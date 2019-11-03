package net.ramptors.web;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Set;
import javax.enterprise.context.ApplicationScoped;
import javax.faces.application.FacesMessage;
import javax.faces.context.FacesContext;
import javax.inject.Inject;
import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;

/** Simplifica el manejo de mensajes. */
@ApplicationScoped
public class Mensajes {
  /** si encuentra uno de las campos llave en un mensaje, lo reemplaza por su valor
   * asociado. */
  @Inject @ReemplazoDeMensajes
  private Map<String, String> reemplazoDeMensajes;
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
  public void procesa(final Throwable ex) {
    final List<Error> lista = analiza(ex);
    for (Error error : lista) {
      final String propiedad = error.getPropiedad();
      final String descripción = error.getDescripción();
      error(propiedad == null ? null : propiedad + ":v", descripción);
    }
  }
  /** Analiza una excepción ara poder mostrar el mensaje de error que lleva.
   * @param ex excepción que describe un error.
   * @return una instancia de <code>Error</code> que contiene la propiedad y
   * descripción. */
  public List<Error> analiza(final Throwable ex) {
    try {
      throw ex;
    } catch (final ConstraintViolationException ex2) {
      return preparaError(ex2.getConstraintViolations());
    } catch (Throwable ex2) {
      Throwable causa = ex2.getCause();
      while (causa != null && causa != ex2) {
        ex2 = causa;
        causa = ex2.getCause();
      }
      try {
        throw ex2;
      } catch (final ConstraintViolationException ex3) {
        return preparaError(ex3.getConstraintViolations());
      } catch (Throwable ex3) {
        return preparaError(ex3, reemplazoDeMensajes);
      }
    }
  }
  /** Toma la primera violación y la muestra como error.
   * @param violaciones conjunto de violaciones a restricciones de Bean Validation. */
  private List<Error> preparaError(final Set<ConstraintViolation<?>> violaciones) {
    final List<Error> resultado = new ArrayList<>(violaciones.size());
    for (final ConstraintViolation<?> violacion : violaciones) {
      final String propiedad = violacion.getPropertyPath().toString();
      final String mensaje = violacion.getMessage();
      if (propiedad == null || propiedad.isEmpty()) {
        resultado.add(new Error(null, mensaje));
      } else {
        resultado.add(new Error(propiedad, mensaje));
      }
    }
    return resultado;
  }
  private List<Error> preparaError(final Throwable ex2,
          final Map<String, String> reemplazoDeMensajes) {
    String mensaje = ex2.getLocalizedMessage();
    if (mensaje == null) {
      return Collections.
              singletonList(new Error(null, "Error al realizar operación."));
    } else if (reemplazoDeMensajes == null) {
      return Collections.singletonList(new Error(null, mensaje));
    } else {
      for (Map.Entry<String, String> entry : reemplazoDeMensajes.entrySet()) {
        final String llave = entry.getKey();
        final String valor = entry.getValue();
        if (llave != null && valor != null && mensaje.contains(llave)) {
          mensaje = valor;
        }
      }
      return Collections.singletonList(new Error(null, mensaje));
    }
  }
}
