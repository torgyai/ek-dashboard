/* Kleine taalhulp voor de zelf toegevoegde onderdelen (Kooistra, objectnotities,
   aandachtspunten, bankrekeningen, monumentmarkering).
   De app zelf is Engels en wordt door nl.js naar het Nederlands vertaald; deze
   modules bouwen hun eigen HTML en kiezen daarom zelf de taal. */
(function () {
  var KEY = "ek-dashboard-language";
  function lang() {
    try { return localStorage.getItem(KEY) === "en" ? "en" : "nl"; } catch (e) { return "nl"; }
  }
  window.__EK_LANG = lang;
  window.__EK_T = function (nl, en) { return lang() === "en" ? en : nl; };

  /* roept cb aan zodra de taal wisselt (de app zet <html lang> om) */
  var subs = [];
  window.__EK_ONLANG = function (cb) { subs.push(cb); };
  function start() {
    if (!document.documentElement) return setTimeout(start, 20);
    var last = lang();
    function check() {
      var now = lang();
      if (now === last) return;
      last = now;
      for (var i = 0; i < subs.length; i++) { try { subs[i](now); } catch (e) {} }
    }
    new MutationObserver(check).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
    window.addEventListener("storage", check);
    setInterval(check, 400);
  }
  start();
})();
