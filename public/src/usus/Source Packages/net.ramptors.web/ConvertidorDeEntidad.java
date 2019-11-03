package net.ramptors.web;

import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import javax.faces.convert.Converter;
import javax.inject.Inject;

/** Permite manejar entidades dentro de combos.
 * @param <T> Tipo de la clase que se convierte.
 * @param <I> Tipo del identificador de la clase. */
public abstract class ConvertidorDeEntidad<T extends Entidad<I>, I>
    implements Converter {
  protected final Class<T> tipoEntidad;
  protected final Class<I> tipoId;
  public ConvertidorDeEntidad(Class<T> tipoEntidad, Class<I> tipoId) {
    this.tipoEntidad = tipoEntidad;
    this.tipoId = tipoId;
  }
  @Inject
  private Dao abcEjb;
  @Override
  public Object getAsObject(final FacesContext context,
      final UIComponent component, final String value) {
    if (value == null || value.isEmpty()) {
      return null;
    } else {
      try {
        final Object id =
            tipoId.getDeclaredConstructor(String.class).newInstance(value);
        return abcEjb.busca(tipoEntidad, id);
      } catch (final Exception ex) {
        return null;
      }
    }
  }
  @Override
  public String getAsString(final FacesContext context,
      final UIComponent component, final Object value) {
    if (value != null && tipoEntidad.isAssignableFrom(value.getClass())) {
      final Entidad instancia = (Entidad) value;
      return instancia.getId().toString();
    } else {
      return null;
    }
  }
}
