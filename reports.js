/* Rapportagepakketten: de standaardrapporten uit de blueprint, met draaien,
   opslaan, exporteren, delen en inplannen. Hangt onder de bestaande
   rapportagepagina. */
(function () {
  var U = window.EKUI, T = U.T;
  var groep = "exploitatie", tab = "pakketten", gedraaid = {};

  function pad() { return window.__EK_PATH ? window.__EK_PATH() : (window.__EK_PATH?window.__EK_PATH():location.pathname); }

  var GROEPEN = [
    { id: "exploitatie", nl: "Exploitatie", en: "Operations" },
    { id: "financieel", nl: "Financieel", en: "Financial" },
    { id: "vastgoed", nl: "Vastgoed", en: "Property" },
    { id: "kapitaal", nl: "Kapitaal", en: "Capital" }
  ];

  function pakketten() {
    return [
      { id: "rentroll", groep: "exploitatie", nl: "Huurlijst", en: "Rent roll", bron: ["Contracten en eenheden", "Leases and units"], regels: 604, dim: ["object, unit, huurder", "property, unit, tenant"] },
      { id: "vacancy", groep: "exploitatie", nl: "Leegstand", en: "Vacancy", bron: ["Eenheden en publicaties", "Units and listings"], regels: 41, dim: ["object, type, duur", "property, type, duration"] },
      { id: "expiry", groep: "exploitatie", nl: "Huurexpiraties", en: "Lease expiry", bron: ["Contracten", "Leases"], regels: 118, dim: ["jaar, object, huurder", "year, property, tenant"] },
      { id: "index", groep: "exploitatie", nl: "Indexatieoverzicht", en: "Contract indexation", bron: ["Contracten", "Leases"], regels: 95, dim: ["grondslag, ingangsdatum", "basis, effective date"] },
      { id: "arrears", groep: "exploitatie", nl: "Achterstanden", en: "Arrears", bron: ["Facturatie en bank", "Invoicing and bank"], regels: 22, dim: ["ouderdom, huurder, object", "ageing, tenant, property"] },
      { id: "tenantledger", groep: "exploitatie", nl: "Huurderskaart", en: "Tenant ledger", bron: ["Facturen en betalingen", "Invoices and payments"], regels: 541, dim: ["huurder, periode", "tenant, period"] },
      { id: "sla", groep: "exploitatie", nl: "Onderhoud en SLA", en: "Maintenance SLA", bron: ["Meldingen en werkorders", "Issues and work orders"], regels: 477, dim: ["leverancier, prioriteit", "supplier, priority"] },
      { id: "occupancy", groep: "exploitatie", nl: "Bezetting", en: "Occupancy", bron: ["Eenheden", "Units"], regels: 604, dim: ["object, maand", "property, month"] },

      { id: "pl", groep: "financieel", nl: "Winst- en verliesrekening", en: "Income statement", bron: ["Grootboek", "General ledger"], regels: 42, dim: ["entiteit, periode", "entity, period"] },
      { id: "balance", groep: "financieel", nl: "Balans", en: "Balance sheet", bron: ["Grootboek", "General ledger"], regels: 38, dim: ["entiteit, peildatum", "entity, date"] },
      { id: "trial", groep: "financieel", nl: "Proefbalans", en: "Trial balance", bron: ["Grootboek", "General ledger"], regels: 96, dim: ["entiteit, periode", "entity, period"] },
      { id: "gl", groep: "financieel", nl: "Grootboekkaart", en: "General ledger detail", bron: ["Journaalposten", "Journal entries"], regels: 4318, dim: ["rekening, dimensie", "account, dimension"] },
      { id: "cash", groep: "financieel", nl: "Kasstroom", en: "Cash flow", bron: ["Bank en grootboek", "Bank and ledger"], regels: 24, dim: ["entiteit, maand", "entity, month"] },
      { id: "budget", groep: "financieel", nl: "Budget tegen werkelijk", en: "Budget versus actual", bron: ["Budgetten en grootboek", "Budgets and ledger"], regels: 86, dim: ["object, kostensoort", "property, cost type"] },
      { id: "propertypl", groep: "financieel", nl: "Objectresultaat", en: "Property P&L", bron: ["Grootboek met objectdimensie", "Ledger with the property dimension"], regels: 118, dim: ["object, periode", "property, period"] },
      { id: "noi", groep: "financieel", nl: "NOI-brug", en: "NOI bridge", bron: ["Grootboek en contracten", "Ledger and leases"], regels: 118, dim: ["object, oorzaak", "property, driver"] },
      { id: "servicecharge", groep: "financieel", nl: "Servicekostenafrekening", en: "Service charge settlement", bron: ["Servicekosten", "Service charges"], regels: 70, dim: ["complex, huurder", "complex, tenant"] },
      { id: "owner", groep: "financieel", nl: "Eigenaarsafrekening", en: "Owner statement", bron: ["Grootboek en eigendom", "Ledger and ownership"], regels: 12, dim: ["eigenaar, object, maand", "owner, property, month"] },
      { id: "vat", groep: "financieel", nl: "Btw en ICP", en: "VAT and ICP", bron: ["Grootboek", "General ledger"], regels: 12, dim: ["entiteit, tijdvak", "entity, period"] },

      { id: "valuation", groep: "vastgoed", nl: "Waarderingsoverzicht", en: "Valuation summary", bron: ["Taxaties", "Valuations"], regels: 118, dim: ["object, methodiek, datum", "property, method, date"] },
      { id: "capex", groep: "vastgoed", nl: "Capex en meerjarenplan", en: "Capex and long-term plan", bron: ["Projecten en MJOP", "Projects and the long-term plan"], regels: 80, dim: ["object, element, jaar", "property, element, year"] },
      { id: "energy", groep: "vastgoed", nl: "Energie en ESG", en: "Energy and ESG", bron: ["Labels en verbruik", "Labels and consumption"], regels: 118, dim: ["object, label, verbruik", "property, label, consumption"] },
      { id: "portfolio", groep: "vastgoed", nl: "Portefeuilleoverzicht", en: "Portfolio summary", bron: ["Alle bronnen", "All sources"], regels: 118, dim: ["portefeuille, regio, type", "portfolio, region, type"] },
      { id: "wws", groep: "vastgoed", nl: "Woningwaardering", en: "Housing points", bron: ["Eenheden", "Units"], regels: 388, dim: ["unit, punten, huur", "unit, points, rent"] },

      { id: "debt", groep: "kapitaal", nl: "Schuldoverzicht", en: "Debt schedule", bron: ["Faciliteiten", "Facilities"], regels: 6, dim: ["verstrekker, entiteit", "lender, entity"] },
      { id: "ltv", groep: "kapitaal", nl: "LTV en convenanten", en: "LTV and covenants", bron: ["Faciliteiten en taxaties", "Facilities and valuations"], regels: 11, dim: ["faciliteit, convenant", "facility, covenant"] },
      { id: "maturity", groep: "kapitaal", nl: "Vervalkalender", en: "Debt maturity", bron: ["Faciliteiten", "Facilities"], regels: 10, dim: ["jaar, verstrekker", "year, lender"] },
      { id: "interest", groep: "kapitaal", nl: "Rentegevoeligheid", en: "Interest exposure", bron: ["Faciliteiten", "Facilities"], regels: 6, dim: ["type, looptijd", "type, term"] },
      { id: "consolidation", groep: "kapitaal", nl: "Consolidatie", en: "Portfolio consolidation", bron: ["Alle entiteiten", "All entities"], regels: 3, dim: ["entiteit, eliminatie", "entity, elimination"] },
      { id: "bankpack", groep: "kapitaal", nl: "Bankpakket", en: "Bank pack", bron: ["Vrijgegeven objecten", "Released assets"], regels: 13, dim: ["object, document", "property, document"] }
    ];
  }

  var PLANNING = [
    { rapport: ["Portefeuilleoverzicht", "Portfolio summary"], wie: "Eric Kooistra", wanneer: ["Elke maandag 07:00", "Every Monday 07:00"], vorm: "PDF" },
    { rapport: ["Achterstanden", "Arrears"], wie: "Amarens", wanneer: ["Elke werkdag 08:00", "Every working day 08:00"], vorm: "XLSX" },
    { rapport: ["Eigenaarsafrekening", "Owner statement"], wie: T("Eigenaren, via portaal", "Owners, through the portal"), wanneer: ["Vijfde werkdag van de maand", "Fifth working day of the month"], vorm: "PDF" },
    { rapport: ["LTV en convenanten", "LTV and covenants"], wie: T("Rabobank en ING", "Rabobank and ING"), wanneer: ["Per kwartaal, tien werkdagen na afsluiting", "Quarterly, ten working days after close"], vorm: "PDF" },
    { rapport: ["Onderhoud en SLA", "Maintenance SLA"], wie: "Sietse Talsma", wanneer: ["Eerste van de maand", "First of the month"], vorm: "XLSX" },
    { rapport: ["Proefbalans", "Trial balance"], wie: T("Accountantskantoor Noord", "Accountantskantoor Noord"), wanneer: ["Per kwartaal", "Quarterly"], vorm: "CSV" }
  ];

  var WEERGAVEN = [
    { naam: ["Alleen Dokkum, dit jaar", "Dokkum only, this year"], rapport: ["Objectresultaat", "Property P&L"], door: "Amarens" },
    { naam: ["Bedrijfsruimte boven 500 m²", "Commercial above 500 m²"], rapport: ["Huurlijst", "Rent roll"], door: "Eric Kooistra" },
    { naam: ["Contracten die binnen 18 maanden aflopen", "Leases expiring within 18 months"], rapport: ["Huurexpiraties", "Lease expiry"], door: "Eric Kooistra" },
    { naam: ["Label C en lager", "Label C and below"], rapport: ["Energie en ESG", "Energy and ESG"], door: T("beheer", "management") }
  ];

  var API = {
    stamp: function () { return groep + "|" + tab + "|" + Object.keys(gedraaid).join(","); },
    click: function (e) {
      var g = U.hit(e, "data-ek-rap-groep"); if (g) { groep = g; return true; }
      var t = U.hit(e, "data-ek-rap-tab"); if (t) { tab = t; return true; }
      var r = U.hit(e, "data-ek-rap-run"); if (r) { gedraaid[r] = 1; return true; }
      return false;
    },
    html: function () {
      var P = pakketten();
      var lijst = P.filter(function (p) { return p.groep === groep; });
      var body;
      if (tab === "planning") body = planningTab();
      else if (tab === "weergaven") body = weergavenTab();
      else body = pakkettenTab(lijst);

      return '<div style="height:1px;background:#d9ddd6;margin:32px 0 26px"></div>' + U.head({
        eyebrow: T("Kapitaal · rapportage", "Capital · reporting"),
        title: T("Rapportagepakketten", "Report packs"),
        intro: T("Dertig standaardrapporten die uit dezelfde administratie komen als de schermen, zodat een huurlijst, een objectresultaat en een convenantrapportage niet drie verschillende waarheden zijn. Elk rapport is te filteren, op te slaan als eigen weergave, te exporteren en in te plannen naar wie het moet ontvangen.",
                 "Thirty standard reports drawn from the same administration as the screens, so a rent roll, a property result and a covenant report are not three different truths. Every report can be filtered, saved as a personal view, exported and scheduled to whoever needs to receive it."),
        chip: T(P.length + " rapporten · 6 ingeplande verzendingen", P.length + " reports · 6 scheduled deliveries")
      }) +
      U.kpis([
        [T("Rapporten", "Reports"), String(P.length), T("in vier groepen", "in four groups")],
        [T("Ingepland", "Scheduled"), String(PLANNING.length), T("naar directie, bank, accountant en eigenaren", "to the board, bank, accountant and owners")],
        [T("Eigen weergaven", "Saved views"), String(WEERGAVEN.length), T("filters die bewaard blijven", "filters that stay saved")],
        [T("Uitvoerformaten", "Export formats"), "PDF · XLSX · CSV", T("plus de API voor Power BI", "plus the API for Power BI")],
        [T("Laatste run", "Last run"), U.DATE("2026-08-25"), T("portefeuilleoverzicht, automatisch", "portfolio summary, automatic")]
      ], 5) +
      '<div class="ek-mt">' + U.tabs([
        { id: "pakketten", label: T("Rapporten", "Reports"), count: P.length },
        { id: "planning", label: T("Verzendschema", "Delivery schedule"), count: PLANNING.length },
        { id: "weergaven", label: T("Eigen weergaven", "Saved views"), count: WEERGAVEN.length }
      ], tab, "data-ek-rap-tab") + '</div>' + body;
    }
  };

  function pakkettenTab(lijst) {
    var rijen = lijst.map(function (p) {
      return [T(p.nl, p.en), T(p.bron[0], p.bron[1]), T(p.dim[0], p.dim[1]),
        '<span class="ek-num">' + U.NUM(p.regels) + '</span>',
        gedraaid[p.id] ? U.chip(T("Gedraaid zojuist", "Just run"), "ok") : U.chip(T("Klaar om te draaien", "Ready to run"), ""),
        U.btns([{ label: T("Draaien", "Run"), primary: !gedraaid[p.id], attr: 'data-ek-rap-run="' + p.id + '"' },
          { label: "PDF" }, { label: "Excel" }, { label: T("Inplannen", "Schedule") }])];
    });
    return '<div class="ek-mt">' + U.tabs(GROEPEN.map(function (g) {
      return { id: g.id, label: T(g.nl, g.en), count: pakketten().filter(function (p) { return p.groep === g.id; }).length };
    }), groep, "data-ek-rap-groep") + '</div>' +
    '<div class="ek-mt">' + U.panel(T("Rapporten", "Reports"),
      U.table([{ label: T("Rapport", "Report") }, { label: T("Bron", "Source") }, { label: T("Dimensies", "Dimensions") },
        { label: T("Regels", "Rows"), num: true }, { label: T("Status", "Status") }, { label: T("Actie", "Action") }], rijen),
      U.btns([{ label: T("Eigen rapport maken", "Build a report"), primary: true }, { label: T("Filter opslaan", "Save filter") },
        { label: T("Als sjabloon opslaan", "Save as template") }, { label: T("Delen", "Share") }, { label: T("Aan dashboard toevoegen", "Add to dashboard") }])) +
      U.note(T("Een rapport is een weergave op de administratie, geen los bestand dat naast de werkelijkheid gaat leven. Wie een cijfer aanklikt komt uit bij de onderliggende boekingen, en een rapport dat gisteren is verstuurd blijft bewaard zoals het toen was, met de peildatum erbij.",
               "A report is a view onto the administration, not a separate file that starts living alongside reality. Clicking a figure leads to the underlying postings, and a report sent yesterday is kept exactly as it was, with its reporting date attached.")) + '</div>';
  }

  function planningTab() {
    var rijen = PLANNING.map(function (p) {
      return [T(p.rapport[0], p.rapport[1]), U.esc(p.wie), T(p.wanneer[0], p.wanneer[1]), U.chip(p.vorm, "info"),
        U.btns([{ label: T("Bewerken", "Edit") }, { label: T("Nu sturen", "Send now") }, { label: T("Pauzeren", "Pause") }])];
    });
    return '<div class="ek-mt ek-g ek-split">' +
      U.panel(T("Verzendschema", "Delivery schedule"),
        U.table([{ label: T("Rapport", "Report") }, { label: T("Ontvanger", "Recipient") }, { label: T("Wanneer", "When") },
          { label: T("Vorm", "Format") }, { label: T("Actie", "Action") }], rijen),
        U.btns([{ label: T("Verzending toevoegen", "Add a delivery"), primary: true }, { label: T("Historie bekijken", "View history") }])) +
      U.ai(T("Wat een verzendschema oplevert", "What a schedule delivers"),
        T("De bank krijgt zijn convenantrapportage tien werkdagen na de kwartaalafsluiting zonder dat iemand eraan hoeft te denken, en met precies de definities die in de kredietovereenkomst staan. Dat scheelt niet alleen werk: het voorkomt ook het gesprek waarin een verstrekker een ander getal op tafel legt dan het pand zelf laat zien.",
          "The bank receives its covenant report ten working days after the quarter closes without anyone having to remember, and with exactly the definitions set out in the loan agreement. That does not just save work: it also avoids the conversation where a lender puts a different figure on the table than the property itself shows.")) +
      '</div>';
  }

  function weergavenTab() {
    var rijen = WEERGAVEN.map(function (w) {
      return [T(w.naam[0], w.naam[1]), T(w.rapport[0], w.rapport[1]), U.esc(w.door),
        U.btns([{ label: T("Openen", "Open"), primary: true }, { label: T("Delen", "Share") }, { label: T("Verwijderen", "Delete"), danger: true }])];
    });
    return '<div class="ek-mt">' + U.panel(T("Opgeslagen weergaven", "Saved views"),
      U.table([{ label: T("Weergave", "View") }, { label: T("Rapport", "Report") }, { label: T("Door", "By") }, { label: T("Actie", "Action") }], rijen),
      U.btns([{ label: T("Weergave opslaan", "Save a view"), primary: true }, { label: T("Met team delen", "Share with the team") }])) +
      U.note(T("Een opgeslagen weergave onthoudt het filter, de kolommen en de sortering, niet de gegevens. Bij het openen staat er dus altijd de actuele stand, ook als de weergave een half jaar geleden is gemaakt.",
               "A saved view remembers the filter, the columns and the sorting, not the data. Opening it therefore always shows the current position, even if the view was created six months ago.")) + '</div>';
  }

  function haak() {
    if (pad().replace(/\/$/, "") !== "/reports") return;
    var main = document.querySelector("main");
    if (!main || document.getElementById("ek-reports-root")) return;
    var d = document.createElement("div");
    d.id = "ek-reports-root";
    d.className = "px-5 pb-12 lg:px-8";
    main.appendChild(d);
  }
  var wacht = false;
  function start() {
    if (!document.body) return setTimeout(start, 20);
    haak();
    new MutationObserver(function () {
      if (wacht) return;
      wacht = true;
      requestAnimationFrame(function () { wacht = false; haak(); });
    }).observe(document.body, { childList: true, subtree: true });
  }
  start();
  U.mount("ek-reports-root", API);
})();
