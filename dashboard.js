/* Dashboard samenstellen: welke kentallen wie op zijn startscherm ziet,
   opgeslagen weergaven per rol, en het doorklikken van een cijfer naar de
   boekingen eronder. Hangt onder het commandocentrum. */
(function () {
  var U = window.EKUI, T = U.T;
  var weergave = "directie", tab = "samenstellen", aan = {}, drill = null;

  function pad() { return window.__EK_PATH ? window.__EK_PATH() : (window.__EK_PATH?window.__EK_PATH():location.pathname); }

  var WIDGETS = [
    { id: "waarde", nl: "Portefeuillewaarde", en: "Portfolio value", groep: "vastgoed", bron: ["Taxaties", "Valuations"], waarde: "€ 555,9 mln", sub: ["WOZ- en taxatiegrondslag", "WOZ and valuation basis"] },
    { id: "huurstroom", nl: "Maandelijkse huurstroom", en: "Monthly rent", groep: "exploitatie", bron: ["Contracten", "Leases"], waarde: "€ 3,10 mln", sub: ["lopende contracten", "current leases"] },
    { id: "bezetting", nl: "Bezetting", en: "Occupancy", groep: "exploitatie", bron: ["Eenheden", "Units"], waarde: "70,7%", sub: ["naar verhuurbaar oppervlak", "by lettable area"] },
    { id: "leegstand", nl: "Leegstand", en: "Vacancy", groep: "exploitatie", bron: ["Eenheden", "Units"], waarde: "41", sub: ["units beschikbaar", "units available"] },
    { id: "contractueel", nl: "Contractuele huur", en: "Contracted rent", groep: "exploitatie", bron: ["Contracten", "Leases"], waarde: "€ 9,18 mln", sub: ["per jaar", "per year"] },
    { id: "incasso", nl: "Incassograad", en: "Collection rate", groep: "financieel", bron: ["Facturatie", "Invoicing"], waarde: "88,7%", sub: ["norm 95%", "target 95%"] },
    { id: "achterstand", nl: "Achterstanden", en: "Arrears", groep: "financieel", bron: ["Debiteuren", "Receivables"], waarde: "€ 351.660", sub: ["43 objecten", "43 properties"] },
    { id: "noi", nl: "NOI", en: "NOI", groep: "financieel", bron: ["Grootboek", "Ledger"], waarde: "€ 8,42 mln", sub: ["twaalf maanden", "twelve months"] },
    { id: "kas", nl: "Kaspositie", en: "Cash position", groep: "financieel", bron: ["Bank", "Bank"], waarde: "€ 4,19 mln", sub: ["42 rekeningen", "42 accounts"] },
    { id: "crediteuren", nl: "Openstaand crediteuren", en: "Payables outstanding", groep: "financieel", bron: ["Inkoop", "Purchases"], waarde: "€ 486.900", sub: ["5 in fiattering", "5 in approval"] },
    { id: "debiteuren", nl: "Openstaand debiteuren", en: "Receivables outstanding", groep: "financieel", bron: ["Verkoop", "Sales"], waarde: "€ 742.400", sub: ["waarvan 41 dagen ouder", "41 days or older"] },
    { id: "expiraties", nl: "Huurexpiraties", en: "Lease expiries", groep: "exploitatie", bron: ["Contracten", "Leases"], waarde: "29", sub: ["aflopend vóór 2027", "expiring before 2027"] },
    { id: "werkorders", nl: "Open werkorders", en: "Open work orders", groep: "techniek", bron: ["Onderhoud", "Maintenance"], waarde: "83", sub: ["over de portefeuille", "across the portfolio"] },
    { id: "telaat", nl: "Werkorders over tijd", en: "Overdue work orders", groep: "techniek", bron: ["Onderhoud", "Maintenance"], waarde: "6", sub: ["buiten de SLA", "outside the SLA"] },
    { id: "keuringen", nl: "Keuringen binnenkort", en: "Inspections due", groep: "techniek", bron: ["Installaties", "Installations"], waarde: "3", sub: ["binnen tien weken", "within ten weeks"] },
    { id: "capex", nl: "Capex tegen budget", en: "Capex against budget", groep: "techniek", bron: ["Projecten", "Projects"], waarde: "€ 30,5 mln", sub: ["goedgekeurde planomvang", "approved programme"] },
    { id: "taxaties", nl: "Laatste taxaties", en: "Latest valuations", groep: "vastgoed", bron: ["Taxaties", "Valuations"], waarde: "12", sub: ["laatste twaalf maanden", "last twelve months"] },
    { id: "schuld", nl: "Uitstaande schuld", en: "Debt outstanding", groep: "kapitaal", bron: ["Faciliteiten", "Facilities"], waarde: "€ 235,3 mln", sub: ["over alle entiteiten", "across all entities"] },
    { id: "ltv", nl: "Gewogen LTV", en: "Weighted LTV", groep: "kapitaal", bron: ["Faciliteiten", "Facilities"], waarde: "42,3%", sub: ["convenantgrens 60%", "covenant limit 60%"] },
    { id: "vervalkalender", nl: "Vervalkalender schuld", en: "Debt maturity", groep: "kapitaal", bron: ["Faciliteiten", "Facilities"], waarde: "2028", sub: ["eerstvolgende piek", "next peak"] },
    { id: "rente", nl: "Rentegevoeligheid", en: "Interest exposure", groep: "kapitaal", bron: ["Faciliteiten", "Facilities"], waarde: "3,84%", sub: ["gewogen gemiddelde", "weighted average"] },
    { id: "kaart", nl: "Portefeuillekaart", en: "Portfolio map", groep: "vastgoed", bron: ["Objecten", "Properties"], waarde: "118", sub: ["objecten op de kaart", "properties on the map"] },
    { id: "energie", nl: "Energieprofiel", en: "Energy profile", groep: "vastgoed", bron: ["Labels", "Labels"], waarde: "41%", sub: ["label A of hoger", "label A or above"] },
    { id: "aandacht", nl: "Aandachtspunten", en: "Exceptions", groep: "exploitatie", bron: ["Meldingen", "Alerts"], waarde: "77", sub: ["open over de portefeuille", "open across the portfolio"] }
  ];

  var WEERGAVEN = {
    directie: { nl: "Directie", en: "Board", widgets: ["waarde", "huurstroom", "bezetting", "ltv", "achterstand", "noi", "kaart", "aandacht"] },
    beheer: { nl: "Beheer", en: "Management", widgets: ["bezetting", "leegstand", "expiraties", "werkorders", "telaat", "keuringen", "achterstand", "aandacht"] },
    financien: { nl: "Financiën", en: "Finance", widgets: ["incasso", "achterstand", "debiteuren", "crediteuren", "kas", "noi", "capex", "contractueel"] },
    bank: { nl: "Bank & financier", en: "Bank & lender", widgets: ["waarde", "noi", "ltv", "schuld", "vervalkalender", "rente", "bezetting", "energie"] }
  };

  function actief() {
    var basis = WEERGAVEN[weergave].widgets.slice();
    Object.keys(aan).forEach(function (k) {
      var i = basis.indexOf(k);
      if (aan[k] && i === -1) basis.push(k);
      if (!aan[k] && i !== -1) basis.splice(i, 1);
    });
    return basis;
  }
  function widget(id) { return WIDGETS.filter(function (w) { return w.id === id; })[0]; }

  var DRILL = {
    achterstand: { titel: ["Achterstanden", "Arrears"], kop: [["Debiteur", "Debtor"], ["Object", "Property"], ["Bedrag", "Amount"], ["Dagen", "Days"]],
      rijen: [[["Exploitatie Grand Café Wald", "Grand Café Wald operations"], ["Grand Café Wald", "Grand Café Wald"], "€ 10.648", "41"],
              [["Advocatenkantoor Terpstra", "Terpstra Advocaten"], ["Achmeatoren / IQON", "Achmeatoren / IQON"], "€ 11.180", "26"],
              [["Huurder Dokkum Hoogstraat", "Tenant Dokkum Hoogstraat"], ["Winkelpand Hoogstraat", "Hoogstraat retail unit"], "€ 7.420", "94"],
              [["Overige huurders (19)", "Other tenants (19)"], ["Diverse", "Various"], "€ 322.412", "< 30"]] },
    incasso: { titel: ["Incassograad", "Collection rate"], kop: [["Periode", "Period"], ["Gefactureerd", "Invoiced"], ["Ontvangen", "Received"], ["Graad", "Rate"]],
      rijen: [[["Juli 2026", "July 2026"], "€ 764.100", "€ 677.760", "88,7%"],
              [["Juni 2026", "June 2026"], "€ 761.400", "€ 689.180", "90,5%"],
              [["Mei 2026", "May 2026"], "€ 758.900", "€ 702.640", "92,6%"],
              [["Twaalfmaands", "Twelve months"], "€ 9.104.000", "€ 8.376.000", "92,0%"]] },
    ltv: { titel: ["Gewogen LTV", "Weighted LTV"], kop: [["Faciliteit", "Facility"], ["Uitstaand", "Outstanding"], ["Onderpand", "Collateral"], ["LTV", "LTV"]],
      rijen: [[["Rabobank FIN-2022-0003", "Rabobank FIN-2022-0003"], "€ 21,8 mln", "€ 52,4 mln", "41,7%"],
              [["ING FIN-2018-0007", "ING FIN-2018-0007"], "€ 13,3 mln", "€ 31,2 mln", "42,6%"],
              [["ABN AMRO FIN-2023-0002", "ABN AMRO FIN-2023-0002"], "€ 17,2 mln", "€ 38,6 mln", "44,7%"],
              [["Overige drie", "Other three"], "€ 13,0 mln", "€ 30,0 mln", "43,3%"]] }
  };

  var API = {
    stamp: function () { return weergave + "|" + tab + "|" + JSON.stringify(aan) + "|" + drill; },
    click: function (e) {
      var w = U.hit(e, "data-ek-dash-weergave"); if (w) { weergave = w; aan = {}; drill = null; return true; }
      var t = U.hit(e, "data-ek-dash-tab"); if (t) { tab = t; return true; }
      var k = U.hit(e, "data-ek-dash-toggle");
      if (k) { aan[k] = actief().indexOf(k) === -1; return true; }
      var d = U.hit(e, "data-ek-dash-drill"); if (d) { drill = drill === d ? null : d; return true; }
      return false;
    },
    html: function () {
      var lijst = actief();
      return '<div style="height:1px;background:#d9ddd6;margin:32px 0 26px"></div>' + U.head({
        eyebrow: T("Portefeuille · startscherm", "Portfolio · home"),
        title: T("Dashboard samenstellen", "Configure the dashboard"),
        intro: T("Wat iemand op zijn startscherm ziet, hangt af van wat hij moet beslissen. De directie wil waarde, schuld en aandachtspunten; beheer wil leegstand, werkorders en keuringen; de bank wil convenanten. Elk kental is een weergave op dezelfde administratie en klikt door naar de boekingen eronder.",
                 "What someone sees on their home screen depends on what they have to decide. The board wants value, debt and exceptions; management wants vacancy, work orders and inspections; the lender wants covenants. Every figure is a view onto the same administration and drills down to the postings beneath it."),
        chip: T(lijst.length + " tegels · " + WIDGETS.length + " beschikbaar", lijst.length + " tiles · " + WIDGETS.length + " available")
      }) +
      '<div class="ek-mt ek-flow">' + Object.keys(WEERGAVEN).map(function (k) {
        return '<button type="button" class="ek-tab' + (k === weergave ? " ek-on" : "") + '" data-ek-dash-weergave="' + k + '">' +
          T(WEERGAVEN[k].nl, WEERGAVEN[k].en) + " · " + WEERGAVEN[k].widgets.length + '</button>';
      }).join("") + '</div>' +
      '<div class="ek-mt">' + U.tabs([
        { id: "samenstellen", label: T("Voorbeeld & samenstellen", "Preview & configure"), count: lijst.length },
        { id: "bibliotheek", label: T("Tegelbibliotheek", "Tile library"), count: WIDGETS.length },
        { id: "drill", label: T("Doorklikken", "Drill down") }
      ], tab, "data-ek-dash-tab") + '</div>' +
      (tab === "bibliotheek" ? bibliotheek(lijst) : tab === "drill" ? drillTab() : voorbeeld(lijst));
    }
  };

  function voorbeeld(lijst) {
    return '<div class="ek-mt">' + U.panel(T("Startscherm ", "Home screen ") + T(WEERGAVEN[weergave].nl, WEERGAVEN[weergave].en),
      '<div class="ek-panel-body"><section class="ek-g ek-g4">' + lijst.map(function (id) {
        var w = widget(id);
        if (!w) return "";
        return '<article class="ek-card ek-card-tight"><div class="ek-flow" style="justify-content:space-between"><p class="ek-lbl">' + T(w.nl, w.en) + '</p>' +
          '<button type="button" class="ek-btn" style="padding:1px 7px;font-size:9px" data-ek-dash-toggle="' + w.id + '">−</button></div>' +
          '<p class="ek-val" style="font-size:20px">' + U.esc(w.waarde) + '</p>' +
          '<p class="ek-sub">' + T(w.sub[0], w.sub[1]) + '</p>' +
          (DRILL[w.id] ? '<div class="ek-mt-s">' + U.btns([{ label: T("Doorklikken", "Drill down"), attr: 'data-ek-dash-drill="' + w.id + '"' }]) + '</div>' : "") +
          '</article>';
      }).join("") + '</section>' +
      '<div class="ek-mt-s">' + U.btns([
        { label: T("Tegel toevoegen", "Add a tile"), primary: true, attr: 'data-ek-dash-tab="bibliotheek"' },
        { label: T("Weergave opslaan", "Save the view") }, { label: T("Delen met een rol", "Share with a role") },
        { label: T("Exporteren (PDF)", "Export (PDF)") }, { label: T("Naar Excel", "To Excel") },
        { label: T("Rapport inplannen", "Schedule a report") }, { label: T("Terugzetten", "Reset"), attr: 'data-ek-dash-weergave="' + weergave + '"' }
      ]) + '</div></div>') +
      (drill ? drillPaneel() : "") +
      U.note(T("Een tegel is geen los cijfer maar een filter op de administratie. Wie de achterstanden aanklikt, ziet dezelfde vier dossiers die in het debiteurenbeheer staan, en niet een getal dat vannacht ergens is uitgerekend en sindsdien op zichzelf leeft.",
               "A tile is not a loose figure but a filter on the administration. Clicking the arrears shows the same four cases that sit in debtor management, not a number computed somewhere overnight that has lived on its own ever since.")) + '</div>';
  }

  function bibliotheek(lijst) {
    var groepen = { exploitatie: ["Exploitatie", "Operations"], financieel: ["Financieel", "Financial"],
      vastgoed: ["Vastgoed", "Property"], techniek: ["Techniek", "Technical"], kapitaal: ["Kapitaal", "Capital"] };
    return '<div class="ek-mt">' + Object.keys(groepen).map(function (g) {
      var w = WIDGETS.filter(function (x) { return x.groep === g; });
      return U.panel(T(groepen[g][0], groepen[g][1]),
        U.table([{ label: T("Tegel", "Tile") }, { label: T("Bron", "Source") }, { label: T("Waarde nu", "Current value"), num: true },
          { label: T("Op het scherm", "On the screen") }],
          w.map(function (x) {
            var op = lijst.indexOf(x.id) !== -1;
            return [T(x.nl, x.en) + '<br><span class="ek-sub">' + T(x.sub[0], x.sub[1]) + '</span>',
              T(x.bron[0], x.bron[1]), '<span class="ek-num">' + U.esc(x.waarde) + '</span>',
              U.btns([{ label: op ? T("Verwijderen", "Remove") : T("Toevoegen", "Add"), primary: !op, danger: op, attr: 'data-ek-dash-toggle="' + x.id + '"' }])];
          })) ) + '<div style="height:12px"></div>';
    }).join("") + '</div>';
  }

  function drillTab() {
    return '<div class="ek-mt">' + U.panel(T("Doorklikken", "Drill down"),
      '<div class="ek-panel-body"><p class="ek-p">' +
      T("Drie tegels zijn hieronder volledig uitgewerkt om te laten zien wat doorklikken betekent: van het cijfer op het startscherm naar de dossiers eronder, en van daaruit naar de boeking, het contract of de werkorder.",
        "Three tiles are worked out below to show what drilling down means: from the figure on the home screen to the underlying cases, and from there to the posting, the lease or the work order.") + '</p>' +
      '<div class="ek-mt-s">' + U.btns(Object.keys(DRILL).map(function (k) {
        var w = widget(k);
        return { label: T(w.nl, w.en), primary: drill === k, attr: 'data-ek-dash-drill="' + k + '"' };
      })) + '</div></div>') +
      (drill ? drillPaneel() : '') + '</div>';
  }

  function drillPaneel() {
    var d = DRILL[drill];
    if (!d) return "";
    return '<div class="ek-mt">' + U.panel(T(d.titel[0], d.titel[1]) + " · " + T("onderliggende posten", "underlying items"),
      U.table(d.kop.map(function (k, i) { return { label: T(k[0], k[1]), num: i > 1 }; }),
        d.rijen.map(function (r) {
          return r.map(function (c, i) {
            var v = Array.isArray(c) ? T(c[0], c[1]) : c;
            return i > 1 ? '<span class="ek-num">' + U.esc(v) + '</span>' : U.esc(v);
          });
        })),
      U.btns([{ label: T("Naar de werkruimte", "Open the workspace"), primary: true }, { label: T("Exporteren", "Export") },
        { label: T("Sluiten", "Close"), attr: 'data-ek-dash-drill="' + drill + '"' }])) + '</div>';
  }

  function haak() {
    var p = pad().replace(/\/$/, "");
    if (p !== "" && p !== "/") return;
    var main = document.querySelector("main");
    if (!main || document.getElementById("ek-dashboard-root")) return;
    var d = document.createElement("div");
    d.id = "ek-dashboard-root";
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
  U.mount("ek-dashboard-root", API);
})();
