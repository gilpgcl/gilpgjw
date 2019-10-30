/* Copyright 2014 Gilberto Pacheco Gallegos
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use
 * this file except in compliance with the License. You may obtain a copy of the
 * License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed
 * under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the specific
 * language governing permissions and limitations under the License. */
package net.ramptors.pasa;

import java.util.List;
import javax.annotation.PostConstruct;
import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.inject.Named;
import net.ramptors.web.Mensajes;

/** @author Gilberto Pacheco Gallegos */
@Named @RequestScoped
public class CtrlPasatiempos {
  @Inject
  private Mensajes mensajes;
  @Inject
  private DaoPasatiempo dao;
  private List<Pasatiempo> instancias;
  @PostConstruct
  /* @PostConstruct indica que el método se ejecuta después de crear el objeto y
   * realizar todos los inject. Funciona casi como un constructor. */
  void init() {
    try {
      instancias = dao.consulta();
    } catch (Exception ex) {
      mensajes.procesa(ex);
    }
  }
  public List<Pasatiempo> getInstancias() {
    return instancias;
  }
}
