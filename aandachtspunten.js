/* Maakt de teller '52 aandachtspunten' klikbaar en toont het onderliggende overzicht.
   Aandachtspunt = object met een openstaande achterstand of een openstaande technische melding. */
(function () {
  var T = function (nl, en) { return (window.__EK_T ? window.__EK_T(nl, en) : nl); };
  var EUR = { format: function (n) {
    return new Intl.NumberFormat(window.__EK_LANG && window.__EK_LANG() === "en" ? "en-GB" : "nl-NL",
      { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);
  } };
  var filter = "alle";

  function punten() {
    var A = window.__EK_ASSETS__ || [];
    return A.filter(function (a) { return a.arrears > 0 || a.openIssues > 0; });
  }
  function rij(a) {
    var redenen = [];
    if (a.arrears > 0) redenen.push('<span class="border border-[#ead4d5] bg-[#fff7f7] px-2 py-1 text-[9px] font-bold uppercase tracking-[0.1em] text-[#b8343a]">' + T("Achterstand ", "Arrears ") + EUR.format(a.arrears) + '</span>');
    if (a.openIssues > 0) redenen.push('<span class="border border-[#e6dfc9] bg-[#fbf7ea] px-2 py-1 text-[9px] font-bold uppercase tracking-[0.1em] text-[#8a6d1f]">' + a.openIssues + T(' open melding' + (a.openIssues === 1 ? '' : 'en'), ' open item' + (a.openIssues === 1 ? '' : 's')) + '</span>');
    return '<a href="/properties/' + a.id + '" data-ek-nav="1" ' +
      'class="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-3.5 text-[12px] hover:bg-slate-50 last:border-0">' +
      '<span class="min-w-[220px]"><span class="block font-semibold text-[#13263a]">' + a.name + '</span>' +
      '<span class="block text-[11px] text-slate-500">' + a.city + ' · ' + a.kind + T(' · bezetting ', ' · occupancy ') + a.occupancy + '%</span></span>' +
      '<span class="flex flex-wrap items-center gap-2">' + redenen.join("") + '</span></a>';
  }
  function render() {
    var lijst = punten();
    var metAchterstand = lijst.filter(function (a) { return a.arrears > 0; });
    var metMelding = lijst.filter(function (a) { return a.openIssues > 0; });
    var zicht = filter === "achterstand" ? metAchterstand : filter === "melding" ? metMelding : lijst;
    var totaalAchterstand = metAchterstand.reduce(function (s, a) { return s + a.arrears; }, 0);
    var totaalMeldingen = lijst.reduce(function (s, a) { return s + a.openIssues; }, 0);
    var knop = function (k, tekst, n) {
      var actief = filter === k;
      return '<button type="button" data-ek-filter="' + k + '" class="border px-3 py-2 text-[10px] font-bold uppercase tracking-[0.12em] ' +
        (actief ? 'border-[#010b22] bg-[#010b22] text-white' : 'border-slate-300 bg-white text-[#13263a]') + '">' + tekst + ' ' + n + '</button>';
    };
    return '<div class="border border-[#d9ddd6] bg-white">' +
      '<div class="flex flex-wrap items-start justify-between gap-4 border-b border-slate-200 p-5">' +
        '<div><p class="text-[9px] font-bold uppercase tracking-[0.14em] text-slate-500">' + T("Portefeuille · aandachtspunten", "Portfolio · exceptions") + '</p>' +
        '<h2 class="mt-1 text-[22px] font-semibold tracking-[-0.04em] text-[#13263a]">' + lijst.length + T(' objecten vragen aandacht', ' assets need attention') + '</h2>' +
        '<p class="mt-2 text-[12px] text-[#010b22]/65">' +
        T("Objecten met een openstaande achterstand of een openstaande technische melding. Samen ",
          "Assets with an open arrears balance or an open technical item. Together ") + EUR.format(totaalAchterstand) +
        T(" aan achterstanden en ", " in arrears and ") + totaalMeldingen + T(" openstaande meldingen.", " open items.") + '</p></div>' +
        '<button type="button" data-ek-sluit="1" aria-label="' + T("Sluiten", "Close") + '" class="border border-slate-300 px-3 py-2 text-[11px] font-bold text-[#13263a]">' + T("Sluiten", "Close") + '</button>' +
      '</div>' +
      '<div class="flex flex-wrap gap-2 border-b border-slate-200 p-4">' +
        knop("alle", T("Alle", "All"), lijst.length) + knop("achterstand", T("Achterstand", "Arrears"), metAchterstand.length) + knop("melding", T("Meldingen", "Items"), metMelding.length) +
      '</div>' +
      '<div class="max-h-[62vh] overflow-auto">' + zicht.map(rij).join("") + '</div></div>';
  }
  function open() {
    sluit();
    var wrap = document.createElement("div");
    wrap.id = "ek-aandacht";
    wrap.className = "fixed inset-0 z-[9999] overflow-y-auto bg-[#050505]/40 p-4";
    wrap.innerHTML = '<div class="mx-auto my-[4vh] w-full max-w-3xl" data-ek-paneel="1">' + render() + '</div>';
    document.body.appendChild(wrap);
    wrap.addEventListener("click", function (e) {
      var f = e.target.closest("[data-ek-filter]");
      if (f) { filter = f.getAttribute("data-ek-filter"); wrap.querySelector("[data-ek-paneel]").innerHTML = render(); return; }
      if (e.target.closest("[data-ek-sluit]")) return sluit();
      var link = e.target.closest("a[data-ek-nav]");
      if (link) { e.preventDefault(); sluit(); history.pushState({}, "", (window.__EK_BASE__||"") + link.getAttribute("href")); window.dispatchEvent(new PopStateEvent("popstate")); return; }
      if (!e.target.closest("[data-ek-paneel]")) sluit();
    });
    document.addEventListener("keydown", esc);
  }
  function esc(e) { if (e.key === "Escape") sluit(); }
  function sluit() {
    var el = document.getElementById("ek-aandacht");
    if (el) el.remove();
    document.removeEventListener("keydown", esc);
  }

  function activeer() {
    var kandidaten = [].slice.call(document.querySelectorAll("span,div,button"));
    kandidaten.forEach(function (el) {
      if (el.dataset.ekAandachtKlik) return;
      var t = (el.textContent || "").trim();
      var BADGE = /^\d+\s+(aandachtspunten|exceptions)$/i;
      var isBadge = BADGE.test(t) && (el.children.length === 0 || el.tagName === "SPAN");
      var isSidebar = /^(aandacht|exceptions)\s*\d+$/i.test(t.replace(/\s+/g, " "));
      if (!isBadge && !isSidebar) return;
      el.dataset.ekAandachtKlik = "1";
      el.style.cursor = "pointer";
      el.setAttribute("role", "button");
      el.setAttribute("tabindex", "0");
      el.setAttribute("title", T("Bekijk de aandachtspunten", "View the exceptions"));
      el.addEventListener("click", function (e) { e.preventDefault(); e.stopPropagation(); open(); });
      el.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); } });
    });
  }
  function start() {
    if (!document.body) return setTimeout(start, 20);
    activeer();
    var wacht = false;
    new MutationObserver(function () {
      if (wacht) return;
      wacht = true;
      requestAnimationFrame(function () { wacht = false; activeer(); });
    }).observe(document.body, { childList: true, subtree: true });
  }
  start();
})();
