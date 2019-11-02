package net.ramptors.web;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Version;
import javax.validation.constraints.NotNull;

@Entity
public class Imagen extends Entidad<Integer> {
  private static final long serialVersionUID = 1L;
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "IMG_ID")
  private Integer id;
  @Version
  @Column(name="IMG_VERSION")
  private int version;
  /** Archivo almacenado. */
  @NotNull
  @Lob
  @Column(name = "IMG_BYTES")
  private byte[] bytes;
  public Imagen() {
  }
  public Imagen(byte[] bytes) {
    this.bytes = bytes;
  }
  @Override
  public Integer getId() {
    return id;
  }
  public void setId(Integer id) {
    this.id = id;
  }
  public int getVersion() {
    return version;
  }
  public void setVersion(int version) {
    this.version = version;
  }
  public byte[] getBytes() {
    return bytes;
  }
  public void setBytes(byte[] bytes) {
    this.bytes = bytes;
  }
}
