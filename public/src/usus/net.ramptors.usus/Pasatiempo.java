package net.ramptors.usus;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import net.ramptors.web.Entidad;

@Entity
@NamedQuery(name = Pasatiempo.TODOS,
    query = "SELECT p FROM Pasatiempo p ORDER BY p.nombre")
@Table(name = "PASATIEMPO")
public class Pasatiempo extends Entidad<Integer> {
  public static final String TODOS = "Pasatiempo.TODOS";
  private static final long serialVersionUID = 1L;
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "PAS_ID")
  private Integer id;
  @NotNull
  @Size(min = 1, max = 255)
  @Column(name = "PAS_NOMBRE")
  private String nombre;
  @Override
  public Integer getId() {
    return id;
  }
  public void setId(Integer id) {
    this.id = id;
  }
  public String getNombre() {
    return nombre;
  }
  public void setNombre(String nombre) {
    this.nombre = nombre;
  }
  @Override
  public String toString() {
    return getNombre();
  }
}
