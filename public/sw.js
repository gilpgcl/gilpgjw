const CACHE = "gilpgjw-121";
const CACHE_EXTRA = "gilpgjwExtra";
// Archivos requeridos para que la aplicación funcione fuera de línea.
const ARCHIVOS = [
  "cmp/header-titulo.js",
  "cmp/mi-diapo.js",
  "cmp/mi-footer.js",
  "cmp/mi-nav.js",
  "cmp/mi-proyecto.js",
  "css/codepoints",
  "css/colores.css",
  "css/estilos.css",
  "css/material-icons.css",
  "css/MaterialIcons-Regular.eot",
  "css/MaterialIcons-Regular.ijmap",
  "css/MaterialIcons-Regular.svg",
  "css/MaterialIcons-Regular.ttf",
  "css/MaterialIcons-Regular.woff",
  "css/MaterialIcons-Regular.woff2",
  "img/icono.png",
  "lib/clipboard.min.js",
  "lib/polycustom.js",
  "lib/prism.css",
  "lib/prism.js",
  "lib/registraServiceWorker.js",
  "lib/util.js",
  "src/forma/Source Packages/net.ramptors.forma/CtrlSaludo.java",
  "src/forma/Web Pages/WEB-INF/beans.xml",
  "src/forma/Web Pages/WEB-INF/payara-web.xml",
  "src/forma/Web Pages/WEB-INF/web.xml",
  "src/forma/Web Pages/index.xhtml",
  "src/intro/Web Pages/WEB-INF/web.xml",
  "src/intro/Web Pages/index.xhtml",
  "src/intro/generado.html",
  "src/pasa/Other Sources/META-INF/persistence.xml",
  "src/pasa/Source Packages/net.ramptors.pasa/Config.java",
  "src/pasa/Source Packages/net.ramptors.pasa/CtrlPasatiempo.java",
  "src/pasa/Source Packages/net.ramptors.pasa/CtrlPasatiempoNuevo.java",
  "src/pasa/Source Packages/net.ramptors.pasa/CtrlPasatiempos.java",
  "src/pasa/Source Packages/net.ramptors.pasa/DaoPasatiempo.java",
  "src/pasa/Source Packages/net.ramptors.pasa/Pasatiempo.java",
  "src/pasa/Source Packages/net.ramptors.web/Mensajes.java",
  "src/pasa/Web Pages/resources/css/estilos.css",
  "src/pasa/Web Pages/resources/ezcomp/mi-footer.xhtml",
  "src/pasa/Web Pages/WEB-INF/beans.xml",
  "src/pasa/Web Pages/WEB-INF/payara-web.xml",
  "src/pasa/Web Pages/WEB-INF/web.xml",
  "src/pasa/Web Pages/index.xhtml",
  "src/pasa/Web Pages/pasatiempo.xhtml",
  "src/pasa/Web Pages/pasatiempoNuevo.xhtml",
  "src/pasa/bd.sql",
  "src/usus/Other Sources/META-INF/persistence.xml",
  "src/usus/Other Sources/ValidationMessages.properties",
  "src/usus/Source Packages/net.ramptors.usus/Config.java",
  "src/usus/Source Packages/net.ramptors.usus/ConvertidorDePasatiempo.java",
  "src/usus/Source Packages/net.ramptors.usus/ConvertidorDeRol.java",
  "src/usus/Source Packages/net.ramptors.usus/CtrlPasatiempos.java",
  "src/usus/Source Packages/net.ramptors.usus/CtrlRoles.java",
  "src/usus/Source Packages/net.ramptors.usus/CtrlSesion.java",
  "src/usus/Source Packages/net.ramptors.usus/CtrlUsuario.java",
  "src/usus/Source Packages/net.ramptors.usus/CtrlUsuarios.java",
  "src/usus/Source Packages/net.ramptors.usus/Pasatiempo.java",
  "src/usus/Source Packages/net.ramptors.usus/Rol.java",
  "src/usus/Source Packages/net.ramptors.usus/Usuario.java",
  "src/usus/Source Packages/net.ramptors.web/ConvertidorDeEntidad.java",
  "src/usus/Source Packages/net.ramptors.web/CtrlEdicion.java",
  "src/usus/Source Packages/net.ramptors.web/CtrlFiltro.java",
  "src/usus/Source Packages/net.ramptors.web/CtrlListado.java",
  "src/usus/Source Packages/net.ramptors.web/CtrlListadoBase.java",
  "src/usus/Source Packages/net.ramptors.web/CtrlSalir.java",
  "src/usus/Source Packages/net.ramptors.web/Dao.java",
  "src/usus/Source Packages/net.ramptors.web/Encriptador.java",
  "src/usus/Source Packages/net.ramptors.web/Entidad.java",
  "src/usus/Source Packages/net.ramptors.web/Error.java",
  "src/usus/Source Packages/net.ramptors.web/Imagen.java",
  "src/usus/Source Packages/net.ramptors.web/Mensajes.java",
  "src/usus/Source Packages/net.ramptors.web/Parts.java",
  "src/usus/Source Packages/net.ramptors.web/ReemplazoDeMensajes.java",
  "src/usus/Source Packages/net.ramptors.web/SpImagen.java",
  "src/usus/Web Pages/resources/css/colores.css",
  "src/usus/Web Pages/resources/css/estilos.css",
  "src/usus/Web Pages/resources/css/mi-footer.css",
  "src/usus/Web Pages/resources/css/mi-navegacion.css",
  "src/usus/Web Pages/resources/ezcomp/campo.xhtml",
  "src/usus/Web Pages/resources/ezcomp/herramientas-detalle.xhtml",
  "src/usus/Web Pages/resources/ezcomp/herramientas-maestras.xhtml",
  "src/usus/Web Pages/resources/ezcomp/mensajes.xhtml",
  "src/usus/Web Pages/resources/ezcomp/mi-footer.xhtml",
  "src/usus/Web Pages/resources/ezcomp/mi-navegacion.xhtml",
  "src/usus/Web Pages/usuarios/edicion.xhtml",
  "src/usus/Web Pages/usuarios/index.xhtml",
  "src/usus/Web Pages/WEB-INF/plantillas/plantilla.xhtml",
  "src/usus/Web Pages/WEB-INF/beans.xml",
  "src/usus/Web Pages/WEB-INF/payara-web.xml",
  "src/usus/Web Pages/WEB-INF/web.xml",
  "src/usus/Web Pages/errorIniciandoSesion.xhtml",
  "src/usus/Web Pages/index.xhtml",
  "src/usus/Web Pages/iniciaSesion.xhtml",
  "src/usus/Web Pages/invitados.xhtml",
  "src/usus/Web Pages/sesion.xhtml",
  "src/usus/bd.sql",
  "favicon.ico",
  "forma_depura.html",
  "forma_evaluacion.html",
  "forma_proyecto.html",
  "forma_proyecto.json",
  "forma.html",
  "index.html",
  "intro_archivos_xml.html",
  "intro_crea.html",
  "intro_deploy_jelastic.html",
  "intro_evaluacion.html",
  "intro_generado.html",
  "intro_proyecto.html",
  "intro_proyecto.json",
  "intro.html",
  "manifest.json",
  "menu.html",
  "pasa_bd_sql.html",
  "pasa_beanvalidation.html",
  "pasa_evaluacion.html",
  "pasa_payara.html",
  "pasa_proyecto.html",
  "pasa_proyecto.json",
  "pasa.html",
  "software.html",
  "usus_bd_sql.html",
  "usus_evaluacion.html",
  "usus_payara.html",
  "usus_proyecto.html",
  "usus_proyecto.json",
  "usus.html",
  '/'
];

self.addEventListener("install",
  /** @param {InstallEvent} evt */
  evt => {
    console.log("Service Worker instalado.");
    // Realiza la instalación: carga los archivos requeridos en la caché.
    evt.waitUntil(cargaCache());
  });
// Toma de la caché archivos solicitados. Los otros son descargados.
self.addEventListener("fetch",
  /** @param {FetchEvent} evt */
  evt => {
    if (evt.request.method === "GET") {
      evt.respondWith(cargaRequest(evt));
    }
  });
self.addEventListener("activate", () => console.log("Service Worker activo."));

async function cargaCache() {
  console.log("Intentando cargar cache: " + CACHE);
  const cache = await caches.open(CACHE);
  await cache.addAll(ARCHIVOS);
  console.log("Cache cargado: " + CACHE);
}
/**
* @param {FetchEvent} evt
* @returns {Promise<Response>} */
async function cargaRequest(evt) {
  const cache = await caches.open(CACHE);
  const respCache =
    await cache.match(evt.request, { ignoreSearch: true });
  if (respCache) {
    // Si lo encuentra en la caché pequeña devuelve esta.
    return respCache;
  } else {
    // Como no está en la caché pequeña, lo busca en la grande.
    const cacheImg = await caches.open(CACHE_EXTRA);
    const respCacheImg =
      await cacheImg.match(evt.request, { ignoreSearch: true });
    // Actualiza en la grande esté o no y recupera el Promise<Response>.
    const respFetch = actualizaResponse(cacheImg, evt.request);
    // Si está en la caché lo devuelve y si no, devuelve el fetch.
    return respCacheImg ? respCacheImg : respFetch;
  }
}
/**
 * @param {Cache} cache
 * @param {Request} request
 * @returns {Promise<Response>} */
function actualizaResponse(cache, request) {
  const respFetch = fetch(request);
  respFetch.then(async response => {
    try {
      await cache.put(request, response.clone());
    } catch (e) {
      console.log(e);
      // Cuando la caché se llena, la vacía.
      const keys = await cache.keys();
      Promise.all(keys.map(key => cache.delete(key)));
    }
  });
  return respFetch;
}