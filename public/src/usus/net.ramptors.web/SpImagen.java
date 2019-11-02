package net.ramptors.web;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.net.URLConnection;
import java.util.Objects;
import javax.inject.Inject;
import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/** Servlet que permite descargar archivos. */
@WebServlet(name = "SpImagen", urlPatterns = {"/SpImagen"})
public class SpImagen extends HttpServlet {
  private static final long serialVersionUID = 1L;
  @Inject
  private Dao dao;
  /** Realiza el método <code>GET</code> de HTTP.
   * @param request solicitud al servlet
   * @param response respuesta del servlet
   * @throws ServletException si ocurre un error específico del servlet
   * @throws IOException si ocurre un error de entrada/salida */
  @Override
  protected void doGet(HttpServletRequest request, HttpServletResponse response)
      throws ServletException, IOException {
    final String id = request.getParameter("id");
    if (id != null) {
      final Imagen modelo = Objects.requireNonNull(
          dao.busca(Imagen.class, new Integer(id)),
          "Id de imagen inválido.");
      final byte[] bytes = modelo.getBytes();
      // Como el archivo devuelto puede cambiar, no se debe guardar en cache.
      response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
      response.setHeader("Pragma", "no-cache");
      response.setHeader("Expires", "0");
      // Obtiene el tipo de los datos del archivo.
      final String contentType = URLConnection.guessContentTypeFromStream(
          new ByteArrayInputStream(bytes));
      response.setContentType(contentType);
      final ServletOutputStream out = response.getOutputStream();
      out.write(bytes);
    }
  }
  /** Breve descripción del servlet.
   * @return un texto que contiene la descripción del servlet. */
  @Override
  public String getServletInfo() {
    return "Descarga un archivo.";
  }
}
