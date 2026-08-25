/* Markeert monumentale panden met een klein rond icoontje (klassieke gevel).
   Puur visueel: raakt geen data en geen filters. */
(function () {
  var T = function (nl, en) { return (window.__EK_T ? window.__EK_T(nl, en) : nl); };

  /* Panden in oude binnensteden met monumentale status of een monumentaal casco.
     Nieuwbouw (Dockumer Sluys, Noarderstek) en Blockhouse staan hier bewust niet in. */
  var IDS = ["restaurant-ode", "hotel-abdij", "fonteinkerk", "kb-food",
             "haagens-dokkum", "club33", "hbs-harlingen", "grand-cafe-wald",
             "eye-vastgoed", "amsterdam-jordaan", "boumanschool", "trije-hus", "happy-wok"];

  var ICON =
    '<svg viewBox="0 0 24 24" width="11" height="11" aria-hidden="true" fill="none" ' +
    'stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">' +
    '<path d="M3 9.2 12 4l9 5.2"/><path d="M4.6 9.2v8.4M9.5 9.2v8.4M14.5 9.2v8.4M19.4 9.2v8.4"/>' +
    '<path d="M2.6 20h18.8"/></svg>';

  function namen() {
    var A = window.__EK_ASSETS__ || [];
    var set = Object.create(null);
    A.forEach(function (a) {
      if (IDS.indexOf(a.id) !== -1 || a.kind === "Monument") set[a.name] = true;
    });
    return set;
  }

  function badge() {
    var s = document.createElement("span");
    s.className = "ek-monument";
    s.setAttribute("data-ek-monument", "1");
    s.setAttribute("title", T("Monumentaal pand", "Listed heritage building"));
    s.setAttribute("aria-label", T("Monumentaal pand", "Listed heritage building"));
    s.innerHTML = ICON;
    return s;
  }

  function loop() {
    var set = namen();
    var lijst = document.querySelectorAll("h1,h2,h3,h4,td,th,span,p,a,div,dt,dd");
    for (var i = 0; i < lijst.length; i++) {
      var el = lijst[i];
      if (el.dataset.ekMon || el.querySelector("[data-ek-monument]")) continue;
      /* de nieuwe werkruimtes noemen objectnamen in tabellen en kaarten; daar hoort geen monumentmarkering */
      if (el.closest(".ek-card, .ek-panel, .ek-kv, .ek-tbl, .ek-chip")) continue;
      if (el.children.length) continue;
      var t = (el.textContent || "").trim();
      if (!t || t.length > 70 || !set[t]) continue;
      el.dataset.ekMon = "1";
      el.appendChild(document.createTextNode(" "));
      el.appendChild(badge());
    }
  }

  function start() {
    if (!document.body) return setTimeout(start, 20);
    loop();
    if (window.__EK_ONLANG) window.__EK_ONLANG(function () {
      var b = document.querySelectorAll("[data-ek-monument]");
      for (var i = 0; i < b.length; i++) {
        b[i].setAttribute("title", T("Monumentaal pand", "Listed heritage building"));
        b[i].setAttribute("aria-label", T("Monumentaal pand", "Listed heritage building"));
      }
    });
    var wacht = false;
    new MutationObserver(function () {
      if (wacht) return;
      wacht = true;
      requestAnimationFrame(function () { wacht = false; loop(); });
    }).observe(document.body, { childList: true, subtree: true });
  }
  start();
})();
