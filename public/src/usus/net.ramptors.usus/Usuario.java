package net.ramptors.usus;

import java.io.IOException;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQuery;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Version;
import javax.servlet.ServletException;
import javax.servlet.http.Part;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import net.ramptors.web.Entidad;
import net.ramptors.web.Imagen;
import net.ramptors.web.Parts;

@Entity
@NamedQuery(name = Usuario.FILTRO, query =
    "SELECT u "
    + "FROM Usuario u JOIN u.pasatiempo p "
    + "WHERE "
    + " UPPER(u.id) LIKE UPPER(:filtro)"
    + " OR UPPER(u.nombre) LIKE (:filtro) "
    + " OR UPPER(p.nombre) LIKE (:filtro) "
    + "ORDER BY u.nombre")
@Table(name = "USUARIO")
public class Usuario extends Entidad<String> {
  public static final String FILTRO = "Usuario.FILTRO";
  private static final long serialVersionUID = 1L;
  @Id
  @NotNull
  @Pattern(regexp = "\\w{4,16}", message = "{valida.cue}")
  @Column(name = "USU_CUE", nullable = false, length = 16)
  private String id;
  @Version
  @Column(name = "USU_VERSION")
  private int version;
  @NotNull
  @Column(name = "USU_MATCH")
  private String match;
  @NotNull
  @Size(min = 1, max = 255)
  @Column(name = "USU_NOMBRE")
  private String nombre;
  @NotNull
  /* cascade = CascadeType.ALL. Realiza en imagen la misma operación que se
   * realice en el objeto de esta clase. Por ejemplo, si la celebridad se
   * elimina, también se elimina su imagen asociada. orphanRemoval = true.
   * Cuando una imagen queda sin que le apunte una celebridad, se elimina. */
  @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval =
      true)
  @JoinColumn(name = "IMG_ID", unique = true)
  private Imagen imagen;
  /** Relación muchos a uno. */
  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "PAS_ID", unique = true)
  private Pasatiempo pasatiempo;
  @NotNull
  @ManyToMany(fetch = FetchType.EAGER)
  @JoinTable(name = "USUARIO_ROL",
      joinColumns =
      @JoinColumn(name = "USU_CUE", nullable = false),
      inverseJoinColumns =
      @JoinColumn(name = "ROL_ID", nullable = false))
  private Set<Rol> roles = new HashSet<>();
  public Usuario() {
  }
  public Usuario(String id, String match, String nombre, Rol... grupos) {
    this.id = id;
    this.match = match;
    this.nombre = nombre;
    this.roles.addAll(Arrays.asList(grupos));
  }
  @Override
  public String getId() {
    return id;
  }
  public void setId(String id) {
    this.id = id;
  }
  public int getVersion() {
    return version;
  }
  public void setVersion(int version) {
    this.version = version;
  }
  public void setMatch(String match) {
    this.match = match;
  }
  public String getMatch() {
    return match;
  }
  public String getNombre() {
    return nombre;
  }
  public void setNombre(String nombre) {
    this.nombre = nombre;
  }
  public Imagen getImagen() {
    return imagen;
  }
  public void setImagen(Imagen imagen) {
    this.imagen = imagen;
  }
  public Pasatiempo getPasatiempo() {
    return pasatiempo;
  }
  public void setPasatiempo(Pasatiempo pasatiempo) {
    this.pasatiempo = pasatiempo;
  }
  public Set<Rol> getRoles() {
    return roles;
  }
  public void setRoles(Set<Rol> roles) {
    this.roles = roles;
  }
  public List<String> getIdDeRoles() {
    return roles == null
        ? Collections.emptyList()
        : roles.stream().map(rol -> rol.getId()).collect(Collectors.toList());
  }
  public Object[] getArregloDeRoles() {
    return roles.toArray();
  }
  public void setArregloDeRoles(Object[] arreglo) {
    final HashSet<Rol> set = new HashSet<>();
    for (final Object obj : arreglo) {
      set.add((Rol) obj);
    }
    this.roles = set;
  }
  public Part getPart() {
    return null;
  }
  public void setPart(Part part) throws IOException, ServletException {
    final Imagen archivo = Parts.leeArchivo(part);
    if (archivo != null) {
      imagen = archivo;
    }
  }
}
