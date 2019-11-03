package net.ramptors.web;

/** Contiene la descripción de un error asociado a una propiedad. */
public class Error {
  private final String propiedad;
  private final String descripción;
  public Error() {
    this.propiedad = null;
    this.descripción = null;
  }
  public Error(String propiedad, String descripción) {
    this.propiedad = propiedad;
    this.descripción = descripción;
  }
  public String getPropiedad() {
    return propiedad;
  }
  public String getDescripción() {
    return descripción;
  }
}