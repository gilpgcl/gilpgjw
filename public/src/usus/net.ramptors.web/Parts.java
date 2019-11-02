package net.ramptors.web;

import java.io.DataInputStream;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.Part;

/** Utilerías par el manejo de solicitudes multiparte. */
public class Parts {
  private static final String CONTENT_DISPOSITION = "content-disposition";
  private static final String CONTENT_DISPOSITION_FILENAME = "filename";
  /** Construye una instancia de <code>Imagen</code> con el contenido de una
   * parte.
   * @param part parte que representa a un archivo
   * @return un archivo con el contenido de la parte o null si el el nombre de
   * archivo es vacío o nulo.
   * @throws IOException si hay un error de entrada o salida.
   * @throws ServletException Si algo sale mal. */
  public static Imagen leeArchivo(final Part part)
      throws IOException, ServletException {
    if (part == null) {
      return null;
    } else {
      final String filename = getFilename(part);
      if (filename == null || filename.isEmpty()) {
        return null;
      } else {
        final byte[] bytes = new byte[(int) part.getSize()];
        try (DataInputStream dis = new DataInputStream(part.getInputStream())) {
          dis.readFully(bytes);
        }
        return new Imagen(bytes);
      }
    }
  }
  /** Devuelve el nombre de archivo de una parte.
   * @param part parte que se analiza.
   * @return el nombre de archivo de la parte o null si la parte corresponde a
   * un campo del formulario. */
  public static String getFilename(Part part) {
    for (String cd : part.getHeader(CONTENT_DISPOSITION).split(";")) {
      if (cd.trim().startsWith(CONTENT_DISPOSITION_FILENAME)) {
        return cd.substring(cd.indexOf('=') + 1).trim().replace("\"", "");
      }
    }
    return null;
  }
}
