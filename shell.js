/* Globale kop: organisatie- en entiteitswisselaar, universeel zoeken en een
   Nieuw-menu. Alles wat op elk scherm hoort zodra er meerdere entiteiten zijn. */
(function () {
  var T = function (nl, en) { return (window.__EK_T ? window.__EK_T(nl, en) : nl); };
  function lang() { return window.__EK_LANG ? window.__EK_LANG() : "nl"; }
  function esc(s) { return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }

  var ENTITEITEN = [
    { id: "alle", nl: "Alle entiteiten", en: "All entities", sub: ["3 vennootschappen · 118 objecten", "3 companies · 118 properties"] },
    { id: "eye", nl: "EYE Vastgoed B.V.", en: "EYE Vastgoed B.V.", sub: ["Hoofdvennootschap · 96 objecten", "Main company · 96 properties"] },
    { id: "erko", nl: "ERKO Dokkum Beheer B.V.", en: "ERKO Dokkum Beheer B.V.", sub: ["Dokkum · 14 objecten", "Dokkum · 14 properties"] },
    { id: "beheer", nl: "Kooistra Beheer B.V.", en: "Kooistra Beheer B.V.", sub: ["Privé en deelnemingen · 8 objecten", "Private and participations · 8 properties"] }
  ];
  var PORTEFEUILLES = [
    { id: "alles", nl: "Hele portefeuille", en: "Whole portfolio" },
    { id: "friesland", nl: "Friesland", en: "Friesland" },
    { id: "groningen", nl: "Groningen", en: "Groningen" },
    { id: "randstad", nl: "Randstad", en: "Randstad" },
    { id: "vakantie", nl: "Vakantie & verblijf", en: "Holiday & stays" }
  ];
  var NIEUW = [
    ["Object", "Property", "/properties"], ["Gebouw", "Building", "/properties"], ["Unit", "Unit", "/properties"],
    ["Relatie", "Relation", "/relations"], ["Huurder", "Tenant", "/relations"], ["Leverancier", "Supplier", "/relations"],
    ["Contract", "Contract", "/contracts"], ["Advertentie", "Listing", "/leasing"], ["Kandidaat", "Candidate", "/leasing"],
    ["Verkoopfactuur", "Sales invoice", "/invoices"], ["Inkoopfactuur", "Purchase invoice", "/invoices"],
    ["Journaalpost", "Journal entry", "/ledger"], ["Melding", "Issue", "/operations"], ["Werkorder", "Work order", "/operations"],
    ["Project", "Project", "/projects"], ["Taxatie", "Valuation", "/properties"], ["Document", "Document", "/documents"],
    ["Taak", "Task", "/alerts"], ["Faciliteit", "Facility", "/financing"], ["Deal", "Deal", "/investors"]
  ];
  var PAGINAS = [
    ["Commandocentrum", "Command centre", "/"], ["Objectregister", "Asset register", "/properties"], ["Portefeuillekaart", "Portfolio map", "/map"],
    ["Verhuur & kandidaten", "Leasing & candidates", "/leasing"], ["Relaties", "Relations", "/relations"], ["Contracten", "Contracts", "/contracts"],
    ["Huurcontracten & huurders", "Leases & tenants", "/leases"], ["Incasso", "Collections", "/finance"], ["Werkorders", "Work orders", "/operations"],
    ["Servicekosten", "Service charges", "/servicecharges"], ["Projecten & CAPEX", "Projects & CAPEX", "/projects"],
    ["Grootboek", "General ledger", "/ledger"], ["Facturatie & AR/AP", "Invoicing & AR/AP", "/invoices"], ["Bankreconciliatie", "Bank reconciliation", "/reconciliation"],
    ["Schuld & convenanten", "Debt & covenants", "/debt"], ["Fiscaliteit & structuur", "Tax & structure", "/tax"], ["Transacties", "Transactions", "/transactions"],
    ["Bankrekeningen", "Bank accounts", "/bank"], ["Rapportages", "Reports", "/reports"], ["Financiering & kapitaal", "Financing & capital", "/financing"],
    ["Investeerders", "Investors", "/investors"], ["Scenariostudio", "Scenario studio", "/planning"], ["Energie & ESG", "Energy & ESG", "/energy"],
    ["Compliance", "Compliance", "/compliance"], ["Eigendom", "Ownership", "/ownership"], ["Dataroom", "Data room", "/dataroom"],
    ["Analyse", "Analytics", "/analytics"], ["Portefeuille-intelligence", "Portfolio intelligence", "/advisor"], ["Meldingen", "Alerts", "/alerts"],
    ["Inkomende e-mail", "Incoming email", "/mail"], ["Netwerk", "Network", "/network"], ["Inkoop & dealradar", "Trading & deal radar", "/kooistra"],
    ["Car Collection", "Car Collection", "/cars"], ["Deelnemersportalen", "Participant portals", "/portals"], ["Documenten", "Documents", "/documents"],
    ["Migratiestudio", "Migration studio", "/migration"], ["Koppelingen", "Integrations", "/integrations"], ["Beheer & toegang", "Admin & access", "/admin"]
  ];

  var open = null, zoek = false, term = "";
  var keuze = { ent: "alle", port: "alles" };

  function naar(pad) {
    var b = window.__EK_BASE__ || "";
    history.pushState({}, "", b + pad);
    window.dispatchEvent(new PopStateEvent("popstate"));
  }

  function entNaam() {
    var e = ENTITEITEN.filter(function (x) { return x.id === keuze.ent; })[0];
    return T(e.nl, e.en);
  }
  function portNaam() {
    var p = PORTEFEUILLES.filter(function (x) { return x.id === keuze.port; })[0];
    return T(p.nl, p.en);
  }

  function menuHtml() {
    if (open === "ent") {
      return '<div class="ek-menu"><p class="ek-menu-lbl ek-lbl">' + T("Entiteit", "Legal entity") + '</p>' +
        ENTITEITEN.map(function (e) {
          return '<button type="button" data-ek-sh-ent="' + e.id + '" class="' + (keuze.ent === e.id ? "ek-on" : "") + '">' +
            esc(T(e.nl, e.en)) + '<small>' + esc(T(e.sub[0], e.sub[1])) + '</small></button>';
        }).join("") +
        '<p class="ek-menu-lbl ek-lbl">' + T("Portefeuille", "Portfolio") + '</p>' +
        PORTEFEUILLES.map(function (p) {
          return '<button type="button" data-ek-sh-port="' + p.id + '" class="' + (keuze.port === p.id ? "ek-on" : "") + '">' + esc(T(p.nl, p.en)) + '</button>';
        }).join("") + '</div>';
    }
    if (open === "nieuw") {
      return '<div class="ek-menu"><p class="ek-menu-lbl ek-lbl">' + T("Nieuw aanmaken", "Create new") + '</p><div class="ek-menu-cols">' +
        NIEUW.map(function (n) {
          return '<button type="button" data-ek-sh-naar="' + n[2] + '">' + esc(T(n[0], n[1])) + '</button>';
        }).join("") + '</div></div>';
    }
    return "";
  }

  var SOORTEN = { Residential: ["Woningen", "Residential"], Commercial: ["Bedrijfsmatig", "Commercial"], Mixed: ["Gemengd", "Mixed"],
    Retail: ["Winkel", "Retail"], Office: ["Kantoor", "Office"], Industrial: ["Bedrijfsruimte", "Industrial"],
    Hospitality: ["Horeca", "Hospitality"], Holiday: ["Vakantie", "Holiday"], Monument: ["Monument", "Monument"],
    Land: ["Grond", "Land"], Parking: ["Parkeren", "Parking"] };
  function soortNaam(k) { var s = SOORTEN[k]; return s ? T(s[0], s[1]) : k; }

  function resultaten() {
    var q = term.trim().toLowerCase();
    if (!q) return [];
    var uit = [];
    PAGINAS.forEach(function (p) {
      var naam = T(p[0], p[1]);
      if (naam.toLowerCase().indexOf(q) !== -1) uit.push({ naam: naam, sub: T("Werkruimte", "Workspace") + " · " + p[2], pad: p[2] });
    });
    var A = window.__EK_ASSETS__ || [];
    A.forEach(function (a) {
      if (uit.length > 40) return;
      var n = (a.name || "") + " " + (a.city || "") + " " + (a.address || "");
      if (n.toLowerCase().indexOf(q) !== -1) {
        uit.push({ naam: a.name, sub: T("Object", "Property") + (a.city ? " · " + a.city : "") + (a.kind ? " · " + soortNaam(a.kind) : ""), pad: "/properties/" + a.id });
      }
    });
    NIEUW.forEach(function (n) {
      var naam = T(n[0], n[1]);
      if (naam.toLowerCase().indexOf(q) !== -1) uit.push({ naam: T("Nieuw: ", "New: ") + naam, sub: T("Aanmaken", "Create") + " · " + n[2], pad: n[2] });
    });
    return uit.slice(0, 24);
  }

  function zoekHtml() {
    if (!zoek) return "";
    var R = resultaten();
    return '<div class="ek-zoek-laag" data-ek-sh-laag="1"><div class="ek-zoek">' +
      '<input type="text" data-ek-sh-invoer="1" placeholder="' +
      T("Zoek een object, unit, relatie, contract, factuur of werkruimte", "Search a property, unit, relation, contract, invoice or workspace") + '" value="' + esc(term) + '">' +
      (term.trim() ? (R.length
        ? '<div class="ek-zoek-uit">' + R.map(function (r) {
            return '<button type="button" data-ek-sh-naar="' + esc(r.pad) + '">' + esc(r.naam) + '<small>' + esc(r.sub) + '</small></button>';
          }).join("") + '</div>'
        : '<p class="ek-zoek-leeg">' + T("Niets gevonden. Zoek op objectnaam, plaats, contractnummer of de naam van een werkruimte.",
            "Nothing found. Try a property name, town, contract number or the name of a workspace.") + '</p>')
        : '<p class="ek-zoek-leeg">' + T("Typ om te zoeken. Objecten, werkruimtes en aanmaakacties staan in dezelfde lijst.",
            "Start typing. Properties, workspaces and create actions appear in the same list.") + '</p>') +
      '</div></div>';
  }

  function bouw() {
    var knop = [].slice.call(document.querySelectorAll("button")).filter(function (b) {
      var t = (b.textContent || "").trim();
      return t === "NL" || t === "EN";
    })[0];
    if (!knop) return;
    var groep = knop.parentElement && knop.parentElement.parentElement;
    if (!groep) return;

    var host = groep.querySelector("[data-ek-shell]");
    if (!host) {
      host = document.createElement("div");
      host.className = "ek-shell";
      host.setAttribute("data-ek-shell", "1");
      groep.insertBefore(host, groep.firstChild);
    }
    var stempel = lang() + "|" + keuze.ent + "|" + keuze.port + "|" + open;
    if (host.dataset.stempel !== stempel) {
      host.dataset.stempel = stempel;
      host.innerHTML =
        '<div class="ek-shell-wrap"><button type="button" class="ek-shell-btn' + (open === "ent" ? " ek-on" : "") + '" data-ek-sh-open="ent">' +
        esc(entNaam()) + ' · ' + esc(portNaam()) + '</button>' + (open === "ent" ? menuHtml() : "") + '</div>' +
        '<button type="button" class="ek-shell-btn" data-ek-sh-zoek="1">' + T("Zoeken", "Search") + '</button>' +
        '<div class="ek-shell-wrap"><button type="button" class="ek-shell-btn' + (open === "nieuw" ? " ek-on" : "") + '" data-ek-sh-open="nieuw">+ ' +
        T("Nieuw", "New") + '</button>' + (open === "nieuw" ? menuHtml() : "") + '</div>';
    }

    var laag = document.querySelector("[data-ek-sh-laag]");
    if (zoek && !laag) {
      var d = document.createElement("div");
      d.innerHTML = zoekHtml();
      document.body.appendChild(d.firstChild);
      var inp = document.querySelector("[data-ek-sh-invoer]");
      if (inp) inp.focus();
    } else if (zoek && laag) {
      var uit = laag.querySelector(".ek-zoek-uit, .ek-zoek-leeg");
      var nieuw = document.createElement("div");
      nieuw.innerHTML = zoekHtml();
      var vers = nieuw.querySelector(".ek-zoek-uit, .ek-zoek-leeg");
      if (uit && vers && uit.outerHTML !== vers.outerHTML) uit.replaceWith(vers);
    } else if (!zoek && laag) {
      laag.remove();
    }
  }

  function attr(e, naam) {
    var el = e.target.closest("[" + naam + "]");
    return el ? el.getAttribute(naam) : null;
  }

  document.addEventListener("click", function (e) {
    var o = attr(e, "data-ek-sh-open");
    if (o) { open = open === o ? null : o; bouw(); return; }
    var ent = attr(e, "data-ek-sh-ent");
    if (ent) { keuze.ent = ent; open = null; bouw(); return; }
    var port = attr(e, "data-ek-sh-port");
    if (port) { keuze.port = port; open = null; bouw(); return; }
    if (attr(e, "data-ek-sh-zoek")) { zoek = true; term = ""; bouw(); return; }
    var pad = attr(e, "data-ek-sh-naar");
    if (pad) { zoek = false; open = null; naar(pad); bouw(); return; }
    if (e.target.closest(".ek-zoek")) return;
    if (e.target.closest("[data-ek-sh-laag]")) { zoek = false; bouw(); return; }
    if (!e.target.closest(".ek-shell-wrap")) { if (open) { open = null; bouw(); } }
  }, true);

  document.addEventListener("input", function (e) {
    if (e.target && e.target.hasAttribute && e.target.hasAttribute("data-ek-sh-invoer")) { term = e.target.value; bouw(); }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && (zoek || open)) { zoek = false; open = null; bouw(); }
    if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) { e.preventDefault(); zoek = true; term = ""; bouw(); }
  });

  function start() {
    if (!document.body) return setTimeout(start, 20);
    bouw();
    if (window.__EK_ONLANG) window.__EK_ONLANG(bouw);
    var wacht = false;
    new MutationObserver(function () {
      if (wacht) return;
      wacht = true;
      requestAnimationFrame(function () { wacht = false; bouw(); });
    }).observe(document.body, { childList: true, subtree: true });
  }
  start();
})();
