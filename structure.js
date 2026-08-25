/* Objectstructuur: organisatie, entiteit, portefeuille, complex, gebouw,
   sectie, eenheid en ruimte in één boom, met de status van een eenheid in
   het verleden, nu en in de toekomst. */
(function () {
  var U = window.EKUI, T = U.T;
  var open = { c1: 1, b1: 1, s1: 1 }, gekozen = "u3", tab = "kenmerken";

  function boom() {
    return [
      { id: "c1", niveau: 1, soort: T("Complex", "Complex"), naam: "Achmeatoren / IQON", plaats: "Leeuwarden",
        entiteit: "EYE Vastgoed B.V. · Harns Invest B.V.", bouwjaar: 1973, m2: 9840, units: 34, waarde: 38600000, kinderen: ["b1", "b2"] },
      { id: "b1", ouder: "c1", niveau: 2, soort: T("Gebouw", "Building"), naam: T("Toren, vleugel A tot D", "Tower, wings A to D"), plaats: "Leeuwarden",
        entiteit: "EYE Vastgoed B.V.", bouwjaar: 1973, m2: 8420, units: 28, waarde: 32800000, bag: "0080100000123456", kinderen: ["s1", "s2"] },
      { id: "s1", ouder: "b1", niveau: 3, soort: T("Sectie", "Section"), naam: T("Verdieping 5, vleugel B", "Floor 5, wing B"), plaats: "Leeuwarden",
        entiteit: "EYE Vastgoed B.V.", bouwjaar: 1973, m2: 640, units: 3, waarde: 2480000, kinderen: ["u1", "u2", "u3"] },
      { id: "u1", ouder: "s1", niveau: 4, soort: T("Eenheid", "Unit"), naam: "5.01", plaats: "Leeuwarden", entiteit: "EYE Vastgoed B.V.",
        bouwjaar: 1973, m2: 214, units: 0, waarde: 830000, status: "verhuurd", huurder: "Kadaster", huur: 3550, ruimtes: 6, label: "A" },
      { id: "u2", ouder: "s1", niveau: 4, soort: T("Eenheid", "Unit"), naam: "5.02", plaats: "Leeuwarden", entiteit: "EYE Vastgoed B.V.",
        bouwjaar: 1973, m2: 186, units: 0, waarde: 720000, status: "verhuurd", huurder: T("Advocatenkantoor Terpstra", "Terpstra Advocaten"), huur: 3080, ruimtes: 5, label: "A" },
      { id: "u3", ouder: "s1", niveau: 4, soort: T("Eenheid", "Unit"), naam: "5.03", plaats: "Leeuwarden", entiteit: "EYE Vastgoed B.V.",
        bouwjaar: 1973, m2: 240, units: 0, waarde: 930000, status: "leeg", huurder: null, huur: 0, ruimtes: 7, label: "A" },
      { id: "s2", ouder: "b1", niveau: 3, soort: T("Sectie", "Section"), naam: T("Verdiepingen 1 tot 4", "Floors 1 to 4"), plaats: "Leeuwarden",
        entiteit: "EYE Vastgoed B.V.", bouwjaar: 1973, m2: 4980, units: 18, waarde: 19400000, kinderen: [] },
      { id: "b2", ouder: "c1", niveau: 2, soort: T("Gebouw", "Building"), naam: T("Parkeerdek en fietsenstalling", "Parking deck and bicycle store"), plaats: "Leeuwarden",
        entiteit: "EYE Vastgoed B.V.", bouwjaar: 1998, m2: 1420, units: 6, waarde: 5800000, bag: "0080100000123457", kinderen: [] },
      { id: "c2", niveau: 1, soort: T("Complex", "Complex"), naam: "Dockumer Sluys appartementen", plaats: "Dokkum",
        entiteit: "EYE Vastgoed B.V.", bouwjaar: 2021, m2: 1740, units: 24, waarde: 8900000, kinderen: ["b3"] },
      { id: "b3", ouder: "c2", niveau: 2, soort: T("Gebouw", "Building"), naam: T("Hoofdgebouw", "Main building"), plaats: "Dokkum",
        entiteit: "EYE Vastgoed B.V.", bouwjaar: 2021, m2: 1740, units: 24, waarde: 8900000, bag: "0058100000098765", kinderen: [] },
      { id: "c3", niveau: 1, soort: T("Complex", "Complex"), naam: T("Portefeuille Groningen, negen panden", "Groningen portfolio, nine properties"), plaats: "Groningen",
        entiteit: "EYE Vastgoed B.V.", bouwjaar: 1962, m2: 4210, units: 41, waarde: 18200000, kinderen: [] }
    ];
  }

  var RUIMTES = [
    { naam: T("Entree en receptie", "Entrance and reception"), m2: 28, functie: T("Verkeersruimte", "Circulation") },
    { naam: T("Kantoortuin", "Open plan office"), m2: 118, functie: T("Werkruimte", "Work space") },
    { naam: T("Vergaderruimte groot", "Large meeting room"), m2: 34, functie: T("Overleg", "Meeting") },
    { naam: T("Vergaderruimte klein", "Small meeting room"), m2: 18, functie: T("Overleg", "Meeting") },
    { naam: T("Pantry", "Pantry"), m2: 14, functie: T("Voorziening", "Facility") },
    { naam: T("Serverruimte", "Server room"), m2: 8, functie: T("Techniek", "Technical") },
    { naam: T("Archief", "Archive"), m2: 20, functie: T("Opslag", "Storage") }
  ];

  var METERS = [
    { soort: T("Elektra hoofdmeter", "Electricity main meter"), nr: "EAN 871685920001284", stand: "184.216 kWh", datum: "2026-08-01", tussenmeter: false },
    { soort: T("Elektra tussenmeter unit", "Electricity submeter, unit"), nr: "TM-5-03", stand: "21.480 kWh", datum: "2026-08-01", tussenmeter: true },
    { soort: T("Warmte", "Heat"), nr: "WM-5-03", stand: "412 GJ", datum: "2026-08-01", tussenmeter: true },
    { soort: T("Water", "Water"), nr: "WA-5-03", stand: "184 m³", datum: "2026-08-01", tussenmeter: true }
  ];

  function historie(id) {
    return [
      { van: "2016-01-01", tot: "2021-12-31", status: "verhuurd", partij: "Achmea Interne Diensten", huur: 74400, note: T("Vertrokken na reorganisatie", "Left after a reorganisation") },
      { van: "2022-01-01", tot: "2022-08-31", status: "leeg", partij: null, huur: 0, note: T("Casco opgeleverd en opnieuw ingedeeld", "Stripped back and re-partitioned") },
      { van: "2022-09-01", tot: "2026-06-30", status: "verhuurd", partij: T("Bureau Noord Advies", "Bureau Noord Advies"), huur: 88800, note: T("Contract niet verlengd", "Lease not renewed") },
      { van: "2026-07-01", tot: null, status: "leeg", partij: null, huur: 0, note: T("In de verhuur, vier kandidaten", "On the market, four candidates") },
      { van: "2027-01-01", tot: "2032-12-31", status: "gepland", partij: T("Stichting Zorggroep Noard (in onderhandeling)", "Stichting Zorggroep Noard (under negotiation)"), huur: 106800, note: T("Voorwaardelijk, drie maanden huurvrij gevraagd", "Conditional, three months rent-free requested") }
    ];
  }

  function vind(id) {
    var B = boom();
    for (var i = 0; i < B.length; i++) if (B[i].id === id) return B[i];
    return B[0];
  }

  var API = {
    stamp: function () { return JSON.stringify(open) + "|" + gekozen + "|" + tab; },
    click: function (e) {
      var v = U.hit(e, "data-ek-str-vouw"); if (v) { if (open[v]) delete open[v]; else open[v] = 1; return true; }
      var k = U.hit(e, "data-ek-str-kies"); if (k) { gekozen = k; return true; }
      var t = U.hit(e, "data-ek-str-tab"); if (t) { tab = t; return true; }
      return false;
    },
    html: function () {
      var B = boom();
      var g = vind(gekozen);
      var units = B.filter(function (x) { return x.niveau === 4; });

      return U.head({
        eyebrow: T("Portefeuille · structuur", "Portfolio · structure"),
        title: T("Objectstructuur", "Property structure"),
        intro: T("Organisatie, vennootschap, portefeuille, complex, gebouw, sectie, eenheid en ruimte in één boom. Alles wat later gebeurt hangt hieraan: een huurcontract aan een eenheid, een werkorder aan een gebouw, een boeking aan een object, een verdeelsleutel aan een complex. Wie deze laag scheef zet, corrigeert dat drie jaar later in elk rapport.",
                 "Organisation, company, portfolio, complex, building, section, unit and room in one tree. Everything that follows hangs off it: a lease on a unit, a work order on a building, a posting on a property, an allocation key on a complex. Get this layer wrong and you are correcting it in every report three years later."),
        chip: T("Acht niveaus · 604 eenheden", "Eight levels · 604 units")
      }) +
      U.kpis([
        [T("Complexen", "Complexes"), "26", T("boven 118 objecten", "above 118 properties")],
        [T("Gebouwen", "Buildings"), "141", T("met BAG-verwijzing", "with a land registry reference")],
        [T("Eenheden", "Units"), "604", T("waarvan 41 leeg", "41 of them vacant")],
        [T("Ruimtes vastgelegd", "Rooms recorded"), "2.184", T("alleen waar het nut heeft", "only where it serves a purpose")],
        [T("Meters", "Meters"), "812", T("hoofd- en tussenmeters", "main and submeters")]
      ], 5) +
      '<div class="ek-mt ek-g ek-split-wide">' +
      U.panel(T("Boom", "Tree"), '<div class="ek-panel-body">' + boomHtml(B) + '</div>',
        U.chip(T("Klik om open te vouwen", "Click to expand"))) +
      detail(g) + '</div>' +
      U.note(T("Een eenheid mag gesplitst of samengevoegd worden, maar het oude nummer verdwijnt nooit. Bij migraties uit oude pakketten is dat precies waar het misgaat: een hergebruikt unitnummer koppelt een huurcontract aan de verkeerde ruimte, en dat valt pas op bij de eerste servicekostenafrekening.",
               "A unit may be split or merged, but the old number never disappears. In migrations out of legacy packages that is exactly where things go wrong: a reused unit number attaches a lease to the wrong space, and it only shows up at the first service charge settlement."));
    }
  };

  function boomHtml(B) {
    var uit = "";
    B.filter(function (x) { return x.niveau === 1; }).forEach(function (c) {
      uit += tak(c, B, 0);
    });
    return '<div style="font-size:12px">' + uit + '</div>';
  }
  function tak(n, B, diepte) {
    var kinderen = (n.kinderen || []).map(function (id) { return vind(id); });
    var isOpen = open[n.id];
    var iconen = { 1: "▣", 2: "▢", 3: "▤", 4: "▪" };
    var uit = '<div style="padding:4px 0 4px ' + (diepte * 16) + 'px;display:flex;align-items:center;gap:8px">' +
      (kinderen.length
        ? '<button type="button" class="ek-btn" style="padding:1px 7px;font-size:10px" data-ek-str-vouw="' + n.id + '">' + (isOpen ? "−" : "+") + '</button>'
        : '<span style="display:inline-block;width:26px"></span>') +
      '<button type="button" class="ek-btn' + (gekozen === n.id ? " ek-btn-primary" : "") + '" style="text-transform:none;letter-spacing:0;font-size:11.5px;font-weight:500" data-ek-str-kies="' + n.id + '">' +
      iconen[n.niveau] + " " + U.esc(n.naam) + '</button>' +
      '<span class="ek-sub">' + U.esc(n.soort) + (n.units ? " · " + n.units + " " + T("eenheden", "units") : "") +
      (n.status ? " · " + (n.status === "leeg" ? T("leeg", "vacant") : T("verhuurd", "let")) : "") + '</span></div>';
    if (isOpen) kinderen.forEach(function (k) { uit += tak(k, B, diepte + 1); });
    return uit;
  }

  function detail(g) {
    var tabs = [
      { id: "kenmerken", label: T("Kenmerken", "Attributes") },
      { id: "ruimtes", label: T("Ruimtes & meters", "Rooms & meters") },
      { id: "status", label: T("Status door de tijd", "Status over time") },
      { id: "acties", label: T("Bewerken", "Editing") }
    ];
    var body;
    if (tab === "ruimtes") {
      body = U.table([{ label: T("Ruimte", "Room") }, { label: T("Oppervlak", "Area"), num: true }, { label: T("Functie", "Function") }],
        RUIMTES.map(function (r) { return [U.esc(r.naam), '<span class="ek-num">' + r.m2 + ' m²</span>', U.esc(r.functie)]; })) +
        '<div class="ek-mt-s">' + U.table([{ label: T("Meter", "Meter") }, { label: T("Nummer", "Number") }, { label: T("Stand", "Reading") },
          { label: T("Opgenomen", "Read on") }, { label: T("Soort", "Type") }],
          METERS.map(function (m) {
            return [U.esc(m.soort), '<code style="font-size:11px">' + U.esc(m.nr) + '</code>', U.esc(m.stand), U.DATE(m.datum),
              m.tussenmeter ? U.chip(T("Tussenmeter", "Submeter"), "info") : U.chip(T("Hoofdmeter", "Main meter"), "")];
          })) + '</div>' +
        '<div class="ek-mt-s">' + U.btns([{ label: T("Ruimte toevoegen", "Add room") }, { label: T("Meter toevoegen", "Add meter"), primary: true },
          { label: T("Standen inlezen", "Import readings") }]) + '</div>';
    } else if (tab === "status") {
      var H = historie(g.id);
      body = U.table([{ label: T("Van", "From") }, { label: T("Tot", "To") }, { label: T("Status", "Status") },
        { label: T("Partij", "Party") }, { label: T("Huur per jaar", "Rent per year"), num: true }, { label: T("Toelichting", "Note") }],
        H.map(function (h) {
          return [U.DATE(h.van), h.tot ? U.DATE(h.tot) : T("heden", "present"),
            h.status === "verhuurd" ? U.chip(T("Verhuurd", "Let"), "ok") : h.status === "leeg" ? U.chip(T("Leeg", "Vacant"), "warn") : U.chip(T("Gepland", "Planned"), "info"),
            h.partij ? U.esc(h.partij) : '<span class="ek-dim">-</span>',
            '<span class="ek-num">' + (h.huur ? U.EUR(h.huur) : "-") + '</span>', U.esc(h.note)];
        })) +
        '<p class="ek-mt-s ek-note">' + T("Een eenheid heeft niet één status maar een reeks: wat gold, wat nu geldt en wat is afgesproken voor later. Daardoor klopt een bezettingscijfer op een peildatum in het verleden ook nog, en is een prognose geen apart bestand.",
          "A unit does not have one status but a series: what applied, what applies now and what has been agreed for later. That keeps an occupancy figure at a past reporting date correct, and means a forecast is not a separate file.") + '</p>';
    } else if (tab === "acties") {
      body = '<div class="ek-g ek-split">' + U.kv([
        [T("Splitsen", "Split"), T("maakt twee eenheden, beide met een verwijzing naar het oude nummer", "creates two units, both referring to the old number")],
        [T("Samenvoegen", "Merge"), T("één nieuwe eenheid, de historie van beide blijft opvraagbaar", "one new unit, the history of both remains retrievable")],
        [T("Dupliceren", "Duplicate"), T("kopieert kenmerken, niet de contracten of de historie", "copies attributes, not the leases or the history")],
        [T("Archiveren", "Archive"), T("uit de lijsten, niet uit de rapportage over het verleden", "out of the lists, not out of reporting on the past")],
        [T("Verplaatsen", "Move"), T("naar een andere sectie of een ander gebouw, met datum", "to another section or building, with a date")]
      ]) + U.ai(T("Wat er gebeurt bij splitsen", "What happens on a split"),
        T("Eenheid 5.03 splitsen in 5.03a en 5.03b betekent: twee nieuwe eenheden met eigen oppervlakte en eigen verdeelsleutel, het oude nummer blijft als bron bewaard, het lopende contract moet expliciet aan één van beide worden gekoppeld, en de servicekostenverdeling van het complex komt opnieuw op 100% uit. Dat laatste blokkeert de afrekening als het niet klopt.",
          "Splitting unit 5.03 into 5.03a and 5.03b means: two new units with their own floor area and allocation share, the old number kept as the source, the running lease explicitly attached to one of the two, and the complex's service charge allocation totalling 100% again. That last check blocks the settlement if it does not add up.")) + '</div>' +
      '<div class="ek-mt-s">' + U.btns([{ label: T("Opslaan", "Save"), primary: true }, { label: T("Dupliceren", "Duplicate") },
        { label: T("Splitsen", "Split") }, { label: T("Samenvoegen", "Merge") }, { label: T("Verplaatsen", "Move") },
        { label: T("Ruimte toevoegen", "Add room") }, { label: T("Meter toevoegen", "Add meter") },
        { label: T("Archiveren", "Archive"), danger: true }]) + '</div>';
    } else {
      body = U.kv([
        [T("Soort", "Type"), U.esc(g.soort)],
        [T("Naam", "Name"), U.esc(g.naam)],
        [T("Plaats", "Location"), U.esc(g.plaats)],
        [T("Entiteit", "Legal entity"), U.esc(g.entiteit)],
        [T("Bouwjaar", "Construction year"), String(g.bouwjaar)],
        [T("Oppervlak", "Floor area"), U.NUM(g.m2) + " m²"],
        [T("Waarde", "Value"), U.EURK(g.waarde)],
        [T("BAG-verwijzing", "Land registry reference"), g.bag ? '<code style="font-size:11px">' + g.bag + '</code>' : T("op gebouwniveau", "at building level")],
        [T("Energielabel", "Energy label"), g.label || T("per gebouw", "per building")],
        [T("Status", "Status"), g.status ? (g.status === "leeg" ? U.chip(T("Leeg", "Vacant"), "warn") : U.chip(T("Verhuurd", "Let"), "ok")) : T("samengesteld", "aggregate")],
        [T("Huurder", "Tenant"), g.huurder ? U.esc(g.huurder) : (g.niveau === 4 ? T("geen", "none") : T("meerdere", "several"))],
        [T("Huur per maand", "Rent per month"), g.huur ? U.EUR(g.huur) : (g.niveau === 4 ? "-" : T("zie huurlijst", "see the rent roll"))]
      ]) + '<div class="ek-mt-s">' + U.btns([{ label: T("Naar objectdossier", "Open property file"), primary: true },
        { label: T("Contract bekijken", "View lease") }, { label: T("Werkorders", "Work orders") }, { label: T("Documenten", "Documents") }]) + '</div>';
    }
    return U.panel(g.naam + " · " + g.soort, '<div class="ek-panel-body">' + U.tabs(tabs, tab, "data-ek-str-tab") + '<div class="ek-mt-s">' + body + '</div></div>');
  }

  U.mount("ek-structure-root", API);
})();
