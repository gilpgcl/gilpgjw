const CACHE = "gilpgjw-90";
const CACHE_EXTRA = "gilpgjwExtra";
// Archivos requeridos para que la aplicación funcione fuera de línea.
const ARCHIVOS = [
  "cmp/header-titulo.js",
  "cmp/mi-diapo.js",
  "cmp/mi-footer.js",
  "cmp/diapo-nav.js",
  "cmp/mi-nav.js",
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
  "src/forma/control/CtrlSaludo.java",
  "src/forma/web/WEB-INF/payara-web.xml",
  "src/forma/web/WEB-INF/web.xml",
  "src/forma/web/index.html",
  "src/intro/web/WEB-INF/web.xml",
  "src/intro/web/index.html",
  "src/intro/generado.html",
  "src/pasa/META-INF/persistence.xml",
  "src/pasa/net.ramptors.pasa/Config.java",
  "src/pasa/net.ramptors.pasa/CtrlPasatiempo.java",
  "src/pasa/net.ramptors.pasa/CtrlPasatiempoNuevo.java",
  "src/pasa/net.ramptors.pasa/CtrlPasatiempos.java",
  "src/pasa/net.ramptors.pasa/DaoPasatiempo.java",
  "src/pasa/net.ramptors.pasa/Pasatiempo.java",
  "src/pasa/net.ramptors.web/Mensajes.java",
  "src/pasa/web/resources/css/estilos.css",
  "src/pasa/web/resources/ezcomp/mi-footer.html",
  "src/pasa/web/WEB-INF/beans.xml",
  "src/pasa/web/WEB-INF/payara-web.xml",
  "src/pasa/web/WEB-INF/web.xml",
  "src/pasa/web/index.html",
  "src/pasa/web/pasatiempo.html",
  "src/pasa/web/pasatiempoNuevo.html",
  "src/pasa/bd.sql",
  "favicon.ico",
  "forma_CtrlSaludo_java.html",
  "forma_depura.html",
  "forma_index_xhtml.html",
  "forma_payara-web_xml.html",
  "forma_web_xml.html",
  "forma.html",
  "index.html",
  "intro_archivos_xml.html",
  "intro_crea.html",
  "intro_deploy_jelastic.html",
  "intro_evaluacion.html",
  "intro_generado.html",
  "intro_index_xhtml.html",
  "intro_proyecto.html",
  "intro_web_xml.html",
  "intro.html",
  "manifest.json",
  "menu.html",
  "pasa_bd_sql.html",
  "pasa_beans_xml.html",
  "pasa_beanvalidation.html",
  "pasa_Config_java.html",
  "pasa_CtrlPasatiempo_java.html",
  "pasa_CtrlPasatiempoNuevo_java.html",
  "pasa_CtrlPasatiempos_java.html",
  "pasa_DaoPasatiempo_java.html",
  "pasa_estilos_css.html",
  "pasa_evaluacion.html",
  "pasa_index_xhtml.html",
  "pasa_Mensajes_java.html",
  "pasa_mi-footer_xhtml.html",
  "pasa_Pasatiempo_java.html",
  "pasa_pasatiempo_xhtml.html",
  "pasa_pasatiempoNuevo_xhtml.html",
  "pasa_payara.html",
  "pasa_persistence_xml.html",
  "pasa_web_xml.html",
  "pasa.html",
  "software.html",
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