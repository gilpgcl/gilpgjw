package net.ramptors.usus;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import net.ramptors.web.Entidad;

@Entity
@NamedQuery(name = Rol.TODOS, query = "SELECT r FROM Rol r ORDER BY r.id")
@Table(name = "ROL")
public class Rol extends Entidad<String> {
  public static final String TODOS = "Rol.TODOS";
  private static final long serialVersionUID = 1L;
  @Id @NotNull @Pattern(regexp = "\\w{4,16}")
  @Column(name = "ROL_ID", nullable = false, length = 16)
  private String id;
  @NotNull @Size(min = 1, max = 255)
  @Column(name = "ROL_DESCRIPCION", nullable = false)
  private String descripción;
  public Rol() {
  }
  public Rol(String id, String descripción) {
    this.id = id;
    this.descripción = descripción;
  }
  @Override
  public String getId() {
    return id;
  }
  public void setId(String id) {
    this.id = id;
  }
  public String getDescripción() {
    return descripción;
  }
  public void setDescripción(String descripción) {
    this.descripción = descripción;
  }
  @Override
  public String toString() {
    return getId() + ": " + getDescripción();
  }
}
