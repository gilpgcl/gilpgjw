package net.ramptors.web;

import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import javax.enterprise.context.ApplicationScoped;

/** Se usa para encriptar datos con el algoritmo SHA-256. */
@ApplicationScoped
public class Encriptador {
  public String encripta(final String texto) {
    try {
      final MessageDigest md = MessageDigest.getInstance("SHA-256");
      // Crea una instancia que aparta 64 caracteres.
      final StringBuilder sb = new StringBuilder(64);
      for (final byte b : md.digest(texto.getBytes("UTF-8"))) {
        sb.append(String.format("%02x", b & 0xff));
      }
      return sb.toString();
    } catch (final NoSuchAlgorithmException | UnsupportedEncodingException ex) {
      throw new IllegalArgumentException(ex);
    }
  }
}
