package net.ramptors.web;

import java.io.Serializable;
import java.util.Objects;

/** Operaciones comunes para una entidad y permite identificar su llave
 * primaria. Está diseñada para crear subclases de esta clase que implementen el
 * método que devuelve la llave primaria. */
public abstract class Entidad<I> implements Serializable {
  private static final long serialVersionUID = 1L;
  public abstract I getId();
  /** Compara el objeto con otro y devuelve true si son de la misma clase y
   * tienen el mismo id; en otro caso devuelve false.
   * @param objeto referencia al segundo objeto que se compara.
   * @return true si los 2 objetos tienen el mismo id. En otro caso devuelve
   * false. */
  @Override
  public boolean equals(final Object objeto) {
    if (objeto != null && getClass().isAssignableFrom(objeto.getClass())) {
      final Entidad<?> otro = (Entidad<?>) objeto;
      return Objects.equals(getId(), otro.getId());
    } else {
      return false;
    }
  }
  /** Calcula el hash code.
   * @return un hash code calculado en base a su id. */
  @Override
  public int hashCode() {
    return Objects.hashCode(getId());
  }
  @Override
  public String toString() {
    return getClass().getName() + '[' + getId() + ']';
  }
}
