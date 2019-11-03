package net.ramptors.web;

import java.util.List;
import javax.ejb.Stateless;
import javax.enterprise.context.Dependent;
import javax.inject.Inject;
import javax.persistence.EntityManager;

/** Operaciones básicas sobre una entidad. */
@Stateless
@Dependent
public class Dao {
  @Inject
  protected EntityManager em;
  public <T> List<T> buscaInstancias(String consulta, Class<T> tipo) {
    return em.createNamedQuery(consulta, tipo).getResultList();
  }
  public <T> List<T> buscaInstancias(String consulta, String filtro,
      Class<T> tipo) {
    return em.createNamedQuery(consulta, tipo).
        setParameter("filtro", "%" + filtro + "%").getResultList();
  }
  public <T> List<T> buscaInstancias(String consulta, Entidad<?> objeto,
      Class<T> tipo) {
    return em.createNamedQuery(consulta, tipo).
        setParameter("id", objeto.getId()).getResultList();
  }
  public <T> T busca(Class<T> tipo, final Object id) {
    return em.find(tipo, id);
  }
  public void agrega(final Object modelo) {
    em.persist(modelo);
  }
  public void modifica(final Object modelo) {
    em.merge(modelo);
  }
  public void elimina(Class<?> tipo, final Object id) {
    final Object objeto = em.find(tipo, id);
    if (objeto != null) {
      em.remove(objeto);
    }
  }
}
