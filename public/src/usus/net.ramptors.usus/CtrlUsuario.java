package net.ramptors.usus;

import java.util.Objects;
import javax.faces.view.ViewScoped;
import javax.inject.Inject;
import javax.inject.Named;
import javax.validation.constraints.Size;
import net.ramptors.web.CtrlEdicion;
import net.ramptors.web.Encriptador;
import net.ramptors.web.Mensajes;

@Named
@ViewScoped
public class CtrlUsuario extends CtrlEdicion<Usuario, String> {
  private static final long serialVersionUID = 1L;
  @Inject
  private Mensajes mensajes;
  @Inject
  private Encriptador encriptador;
  @Size(min = 5, max = 25)
  private String contraseña;
  private String confirmaContraseña;
  public CtrlUsuario() {
    super(Usuario.class, String.class);
  }
  public String getContraseña() {
    return contraseña;
  }
  public void setContraseña(String contraseña) {
    this.contraseña = contraseña;
  }
  public String getConfirmaContraseña() {
    return confirmaContraseña;
  }
  public void setConfirmaContraseña(String confirmaContraseña) {
    this.confirmaContraseña = confirmaContraseña;
  }
  @Override
  public String guarda() {
    if (isNuevo() && (getContraseña() == null || getContraseña().isEmpty())) {
      mensajes.error("contrasenha:v", "Falta la Contraseña.");
    } else if (!Objects.equals(getContraseña(), getConfirmaContraseña())) {
      mensajes.error("confirma:v", "Las Contraseñas no coinciden.");
    } else {
      if (getContraseña() == null || getContraseña().isEmpty()) {
        // Si no se captura contraseña, se usa la que se tenía.
        modelo.setMatch(dao.busca(Usuario.class, id).getMatch());
      } else {
        modelo.setMatch(encriptador.encripta(getContraseña()));
      }
      return super.guarda();
    }
    return null;
  }
}
