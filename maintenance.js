/* Onderhoud & installaties: meldingen met een echte statusgang, werkorders met
   planning, het installatieregister met keuringen, het meerjarenonderhoudsplan
   en een SLA-overzicht per leverancier. */
(function () {
  var U = window.EKUI, T = U.T;
  var tab = "meldingen", open = "m1", stap = {};

  var STATUS = [
    { nl: "Nieuw", en: "New" }, { nl: "Getrieerd", en: "Triaged" }, { nl: "Wacht op huurder", en: "Waiting for tenant" },
    { nl: "Offerte", en: "Quoted" }, { nl: "Goedgekeurd", en: "Approved" }, { nl: "Ingepland", en: "Scheduled" },
    { nl: "In uitvoering", en: "In progress" }, { nl: "Afgerond", en: "Completed" }, { nl: "Geverifieerd", en: "Verified" },
    { nl: "Gesloten", en: "Closed" }
  ];

  function meldingen() {
    return [
      { id: "m1", nr: "ME 2026-0431", object: "Dockumer Sluys 12", plaats: "Dokkum", melder: T("Huurder, via portaal", "Tenant, through the portal"),
        soort: T("Loodgieterswerk", "Plumbing"), prioriteit: "normaal", datum: "2026-08-22", status: 5, sla: "3 " + T("werkdagen", "working days"),
        lev: "Synergy Installatietechniek", kosten: 0, raming: 240,
        tekst: T("Kraan in de keuken lekt langs de basis. Huurder heeft de hoofdkraan onder het aanrecht dichtgedraaid, geen wateroverlast.",
                 "The kitchen tap is leaking around the base. The tenant has closed the stopcock under the sink, no water damage.") },
      { id: "m2", nr: "ME 2026-0428", object: "Achmeatoren / IQON", plaats: "Leeuwarden", melder: T("Huurder, per telefoon", "Tenant, by phone"),
        soort: T("Klimaatinstallatie", "Climate installation"), prioriteit: "hoog", datum: "2026-08-20", status: 3, sla: "8 " + T("uur", "hours"),
        lev: "Synergy Installatietechniek", kosten: 0, raming: 4800,
        tekst: T("Luchtbehandelingskast verdieping 4 slaat af bij warm weer. Vermoedelijk de condensor; er is een offerte gevraagd voor vervanging van het regelblok.",
                 "The air handling unit on floor 4 shuts down in warm weather. Most likely the condenser; a quote has been requested to replace the control block.") },
      { id: "m3", nr: "ME 2026-0426", object: "Grand Café Wald", plaats: "Wâlterswâld", melder: T("Beheer, na inspectie", "Management, after inspection"),
        soort: T("Bouwkundig", "Building fabric"), prioriteit: "laag", datum: "2026-08-18", status: 1, sla: "20 " + T("werkdagen", "working days"),
        lev: "Bouwteam EYE", kosten: 0, raming: 1250,
        tekst: T("Voegwerk aan de zuidgevel laat op twee plaatsen los. Geen lekkage, maar bij vorst wordt het groter. Meenemen in de najaarsronde.",
                 "Pointing on the south facade is coming loose in two places. No leaks, but frost will make it worse. Include in the autumn round.") },
      { id: "m4", nr: "ME 2026-0419", object: "Basic-Fit Dokkum", plaats: "Dokkum", melder: T("Huurder, via portaal", "Tenant, through the portal"),
        soort: T("Verwarming", "Heating"), prioriteit: "normaal", datum: "2026-08-11", status: 8, sla: "3 " + T("werkdagen", "working days"),
        lev: "Synergy Installatietechniek", kosten: 386, raming: 400,
        tekst: T("Radiatoren in de kleedruimte werden niet warm. Systeem ontlucht en drukvat bijgevuld; huurder heeft afgetekend.",
                 "Radiators in the changing room stayed cold. System bled and the expansion vessel topped up; the tenant has signed off.") },
      { id: "m5", nr: "ME 2026-0412", object: "Casa Velha 7", plaats: "Leeuwarden", melder: T("Huurder, via portaal", "Tenant, through the portal"),
        soort: T("Elektra", "Electrical"), prioriteit: "spoed", datum: "2026-08-24", status: 6, sla: "4 " + T("uur", "hours"),
        lev: "Synergy Installatietechniek", kosten: 0, raming: 320,
        tekst: T("Groep valt er steeds uit in de meterkast. Monteur is ter plaatse, vermoedelijk een defecte wasmachine van de huurder zelf.",
                 "A circuit keeps tripping in the meter cupboard. The engineer is on site; most likely the tenant's own washing machine is at fault.") },
      { id: "m6", nr: "ME 2026-0402", object: "Sense Dokkum", plaats: "Dokkum", melder: T("Aannemer", "Contractor"),
        soort: T("Brandveiligheid", "Fire safety"), prioriteit: "hoog", datum: "2026-08-05", status: 9, sla: "1 " + T("werkdag", "working day"),
        lev: "Dijkstra Draisma", kosten: 2140, raming: 2000,
        tekst: T("Tijdens de verbouwing was een brandscheiding doorbroken voor kabelgoten. Hersteld en opnieuw beoordeeld door de brandveiligheidsadviseur.",
                 "A fire compartment wall was breached for cable trays during the works. Repaired and reassessed by the fire safety consultant.") }
    ];
  }

  function installaties() {
    return [
      { soort: T("Personenlift", "Passenger lift"), object: "Achmeatoren / IQON", merk: "Kone MonoSpace", bouwjaar: 2014, serie: "KM-84120-3",
        lev: "Kone", interval: T("Per kwartaal", "Quarterly"), keuring: "2027-02-14", wettelijk: true, staat: "goed" },
      { soort: T("Personenlift", "Passenger lift"), object: "Dockumer Sluys", merk: "Schindler 3300", bouwjaar: 2021, serie: "SCH-44219-1",
        lev: "Kone", interval: T("Per kwartaal", "Quarterly"), keuring: "2027-05-02", wettelijk: true, staat: "goed" },
      { soort: T("Cv-ketel, cascade", "Boiler, cascade"), object: "Achmeatoren / IQON", merk: "Remeha Gas 610", bouwjaar: 2016, serie: "RM-610-2244",
        lev: "Synergy Installatietechniek", interval: T("Per jaar", "Annually"), keuring: "2026-11-12", wettelijk: false, staat: "aandacht" },
      { soort: T("Luchtbehandeling", "Air handling"), object: "Achmeatoren / IQON", merk: "Systemair DV 60", bouwjaar: 2014, serie: "SA-60-1188",
        lev: "Synergy Installatietechniek", interval: T("Twee keer per jaar", "Twice a year"), keuring: "2026-09-30", wettelijk: false, staat: "storing" },
      { soort: T("Brandmeldinstallatie", "Fire alarm system"), object: "Achmeatoren / IQON", merk: "Siemens Cerberus", bouwjaar: 2018, serie: "SI-CB-7741",
        lev: "Trigion", interval: T("Per jaar", "Annually"), keuring: "2026-10-08", wettelijk: true, staat: "goed" },
      { soort: T("Noodverlichting", "Emergency lighting"), object: "Sense Dokkum", merk: "Van Lien Bardic", bouwjaar: 2026, serie: "VL-2026-014",
        lev: "Synergy Installatietechniek", interval: T("Per jaar", "Annually"), keuring: "2027-06-30", wettelijk: true, staat: "nieuw" },
      { soort: T("Warmtepomp", "Heat pump"), object: "Trije Hûs", merk: "Daikin Altherma", bouwjaar: 2023, serie: "DK-AL-9902",
        lev: "Synergy Installatietechniek", interval: T("Per jaar", "Annually"), keuring: "2027-03-18", wettelijk: false, staat: "goed" },
      { soort: T("Sprinklerinstallatie", "Sprinkler system"), object: "Magazijn Apolloweg", merk: "Tyco", bouwjaar: 2012, serie: "TY-SP-3320",
        lev: "Trigion", interval: T("Per kwartaal", "Quarterly"), keuring: "2026-09-15", wettelijk: true, staat: "aandacht" },
      { soort: T("Ventilatie woningen", "Residential ventilation"), object: "Casa Velha", merk: "Itho DemandFlow", bouwjaar: 2019, serie: "IT-DF-5510",
        lev: "Synergy Installatietechniek", interval: T("Twee keer per jaar", "Twice a year"), keuring: "2026-12-01", wettelijk: false, staat: "goed" },
      { soort: T("Brouwinstallatie", "Brewing installation"), object: "Brouwerij Dockum", merk: "Kaspar Schulz 20 hl", bouwjaar: 2027, serie: "KS-20-0041",
        lev: T("Nog te selecteren", "To be selected"), interval: T("Per jaar", "Annually"), keuring: "2028-03-01", wettelijk: false, staat: "besteld" }
    ];
  }

  var MJOP = [
    { element: T("Daken en dakbedekking", "Roofs and roof covering"), cyclus: "20 " + T("jaar", "years"), jaren: [0, 0, 184000, 0, 0, 0, 0, 96000, 0, 0] },
    { element: T("Gevels en voegwerk", "Facades and pointing"), cyclus: "25 " + T("jaar", "years"), jaren: [42000, 0, 0, 128000, 0, 0, 74000, 0, 0, 0] },
    { element: T("Kozijnen en schilderwerk", "Frames and painting"), cyclus: "6 " + T("jaar", "years"), jaren: [86000, 0, 0, 0, 0, 92000, 0, 0, 0, 0] },
    { element: T("Cv en warmteopwekking", "Heating and generation"), cyclus: "18 " + T("jaar", "years"), jaren: [0, 0, 0, 0, 246000, 0, 0, 0, 0, 0] },
    { element: T("Luchtbehandeling", "Air handling"), cyclus: "15 " + T("jaar", "years"), jaren: [0, 168000, 0, 0, 0, 0, 0, 0, 0, 0] },
    { element: T("Liften", "Lifts"), cyclus: "25 " + T("jaar", "years"), jaren: [0, 0, 0, 0, 0, 0, 0, 0, 214000, 0] },
    { element: T("Elektra en verlichting", "Electrical and lighting"), cyclus: "20 " + T("jaar", "years"), jaren: [0, 0, 62000, 0, 0, 0, 0, 0, 0, 88000] },
    { element: T("Terrein en bestrating", "Grounds and paving"), cyclus: "15 " + T("jaar", "years"), jaren: [0, 34000, 0, 0, 0, 0, 0, 41000, 0, 0] }
  ];

  var SLA = [
    { lev: "Synergy Installatietechniek", orders: 214, reactie: 0.8, opgelost: 2.4, eerste: 84, kosten: 412, oordeel: "goed" },
    { lev: "Bouwteam EYE", orders: 168, reactie: 1.4, opgelost: 5.1, eerste: 91, kosten: 286, oordeel: "goed" },
    { lev: "Dijkstra Draisma", orders: 24, reactie: 2.1, opgelost: 14.2, eerste: 96, kosten: 4180, oordeel: "goed" },
    { lev: "Postma Bouw", orders: 31, reactie: 2.8, opgelost: 11.4, eerste: 74, kosten: 1240, oordeel: "aandacht" },
    { lev: "Kone", orders: 18, reactie: 0.4, opgelost: 1.1, eerste: 89, kosten: 640, oordeel: "goed" },
    { lev: "Trigion", orders: 22, reactie: 1.9, opgelost: 6.8, eerste: 68, kosten: 520, oordeel: "aandacht" }
  ];

  function prioChip(p) {
    var m = { spoed: [T("Spoed", "Urgent"), "bad"], hoog: [T("Hoog", "High"), "warn"], normaal: [T("Normaal", "Normal"), ""], laag: [T("Laag", "Low"), ""] }[p];
    return U.chip(m[0], m[1]);
  }
  function statusNaam(i) { var s = STATUS[Math.min(i, STATUS.length - 1)]; return T(s.nl, s.en); }

  var API = {
    stamp: function () { return tab + "|" + open + "|" + JSON.stringify(stap); },
    click: function (e) {
      var t = U.hit(e, "data-ek-onh-tab"); if (t) { tab = t; open = null; return true; }
      var o = U.hit(e, "data-ek-onh-open"); if (o) { open = open === o ? null : o; return true; }
      var s = U.hit(e, "data-ek-onh-stap");
      if (s) { var d = s.split(":"); stap[d[1]] = Math.max(0, Math.min(9, (stap[d[1]] != null ? stap[d[1]] : +d[2]) + (+d[0]))); return true; }
      return false;
    },
    html: function () {
      var M = meldingen(), I = installaties();
      var openM = M.filter(function (m) { return (stap[m.id] != null ? stap[m.id] : m.status) < 8; }).length;
      var spoed = M.filter(function (m) { return m.prioriteit === "spoed" || m.prioriteit === "hoog"; }).length;
      var keuringen = I.filter(function (i) { return i.keuring < "2026-11-01"; }).length;
      var jaarKosten = MJOP.reduce(function (s, r) { return s + r.jaren[0]; }, 0);

      var body;
      if (tab === "installaties") body = installatiesTab(I);
      else if (tab === "mjop") body = mjopTab();
      else if (tab === "sla") body = slaTab();
      else body = meldingenTab(M);

      return U.head({
        eyebrow: T("Exploitatie · techniek", "Operations · technical"),
        title: T("Onderhoud & installaties", "Maintenance & assets"),
        intro: T("Een melding van een huurder, een werkorder bij een leverancier, een installatie met een keuringsdatum en een regel in het meerjarenplan zijn vier verschijningsvormen van hetzelfde ding. Ze staan hier op één object en met één kostenlijn, zodat achteraf te zien is wat een gebouw werkelijk aan onderhoud kost en welke leverancier dat waarmaakt.",
                 "A tenant's issue, a work order with a supplier, an installation with an inspection date and a line in the long-term plan are four appearances of the same thing. They sit here on one property with one cost line, so it can be seen afterwards what a building really costs to maintain and which supplier delivers on it."),
        chip: T(openM + " open meldingen · " + keuringen + " keuringen binnen 10 weken", openM + " open issues · " + keuringen + " inspections within 10 weeks")
      }) +
      U.kpis([
        [T("Open meldingen", "Open issues"), String(openM), T(spoed + " met hoge prioriteit of spoed", spoed + " high priority or urgent")],
        [T("Gemiddelde reactietijd", "Average response time"), "1,2 " + T("dag", "days"), T("afspraak: 1 werkdag", "agreed: 1 working day")],
        [T("Eerste keer opgelost", "First-time fix"), "84%", T("norm 80%", "target 80%"), 84],
        [T("Installaties in beheer", "Installations managed"), String(I.length), T(I.filter(function (i) { return i.wettelijk; }).length + " met wettelijke keuring", I.filter(function (i) { return i.wettelijk; }).length + " with a statutory inspection")],
        [T("Onderhoudsbudget 2026", "Maintenance budget 2026"), U.EURK(jaarKosten), T("uit het meerjarenplan", "from the long-term plan")]
      ], 5) +
      '<div class="ek-mt">' + U.tabs([
        { id: "meldingen", label: T("Meldingen & werkorders", "Issues & work orders"), count: M.length },
        { id: "installaties", label: T("Installaties", "Installations"), count: I.length },
        { id: "mjop", label: T("Meerjarenplan", "Long-term plan") },
        { id: "sla", label: T("SLA & leveranciers", "SLA & suppliers"), count: SLA.length }
      ], tab, "data-ek-onh-tab") + '</div>' + body;
    }
  };

  function meldingenTab(M) {
    var rijen = M.map(function (m) {
      var s = stap[m.id] != null ? stap[m.id] : m.status;
      return {
        attr: 'data-ek-onh-open="' + m.id + '"', on: open === m.id,
        cells: ['<strong>' + U.esc(m.nr) + '</strong><br><span class="ek-sub">' + U.esc(m.melder) + '</span>',
          U.esc(m.object) + '<br><span class="ek-sub">' + U.esc(m.plaats) + '</span>',
          U.esc(m.soort), prioChip(m.prioriteit), U.DATE(m.datum), U.esc(m.sla), U.esc(m.lev),
          '<span class="ek-num">' + (m.kosten ? U.EUR(m.kosten) : U.EUR(m.raming) + " *") + '</span>',
          U.chip(statusNaam(s), s >= 8 ? "ok" : s <= 1 ? "warn" : "info")]
      };
    });
    var gek = M.filter(function (m) { return m.id === open; })[0];
    var detail = "";
    if (gek) {
      var s = stap[gek.id] != null ? stap[gek.id] : gek.status;
      detail = '<div class="ek-mt">' + U.panel(gek.nr + " · " + gek.object,
        '<div class="ek-panel-body">' + U.flow(STATUS.map(function (x) { return T(x.nl, x.en); }), s) +
        '<p class="ek-mt-s ek-p">' + U.esc(gek.tekst) + '</p>' +
        '<div class="ek-mt-s ek-g ek-split">' + U.kv([
          [T("Object", "Property"), U.esc(gek.object) + " · " + U.esc(gek.plaats)],
          [T("Gemeld door", "Reported by"), U.esc(gek.melder)],
          [T("Categorie", "Category"), U.esc(gek.soort)],
          [T("Prioriteit", "Priority"), prioChip(gek.prioriteit) + " · " + T("reactie binnen ", "response within ") + gek.sla],
          [T("Uitbesteed aan", "Assigned to"), U.esc(gek.lev)],
          [T("Raming", "Estimate"), U.EUR(gek.raming)],
          [T("Werkelijke kosten", "Actual cost"), gek.kosten ? U.EUR(gek.kosten) : T("nog niet gefactureerd", "not yet invoiced")],
          [T("Doorbelasting", "Recharge"), gek.soort === T("Elektra", "Electrical") ? T("mogelijk aan huurder, apparaat van huurder zelf", "possibly to the tenant, the tenant's own appliance") : T("voor rekening eigenaar", "at the owner's expense")]
        ]) +
        U.ai(T("Wat het systeem hierbij weet", "What the system knows here"),
          T("Dit object heeft in twaalf maanden vier meldingen in dezelfde categorie gehad, allemaal bij dezelfde installatie. Dat patroon verschuift de vraag van repareren naar vervangen: de installatie staat in het meerjarenplan pas over vijf jaar, en dat is met deze storingsfrequentie te laat.",
            "This property has had four issues in the same category over twelve months, all on the same installation. That pattern shifts the question from repair to replacement: the long-term plan has it scheduled five years out, and at this failure rate that is too late.")) +
        '</div><div class="ek-mt-s">' + U.btns([
          { label: T("Toewijzen", "Assign") }, { label: T("Prioriteit wijzigen", "Change priority") },
          { label: T("Offerte vragen", "Request quote") }, { label: T("Offerte goedkeuren", "Approve quote") },
          { label: T("Werkorder maken", "Create work order") }, { label: T("Inplannen", "Schedule") },
          { label: T("Foto toevoegen", "Add photo") }, { label: T("Huurder berichten", "Message tenant") },
          { label: T("Volgende status", "Next status"), primary: true, attr: 'data-ek-onh-stap="1:' + gek.id + ':' + gek.status + '"' },
          { label: T("Heropenen", "Reopen"), attr: 'data-ek-onh-stap="-1:' + gek.id + ':' + gek.status + '"' },
          { label: T("Sluiten", "Close"), danger: true }
        ]) + '</div></div>') + '</div>';
    }
    return '<div class="ek-mt">' + U.panel(T("Meldingen", "Issues"),
      U.table([{ label: T("Nummer", "Number") }, { label: T("Object", "Property") }, { label: T("Categorie", "Category") },
        { label: T("Prioriteit", "Priority") }, { label: T("Gemeld", "Reported") }, { label: "SLA" }, { label: T("Leverancier", "Supplier") },
        { label: T("Kosten", "Cost"), num: true }, { label: T("Status", "Status") }], rijen),
      U.btns([{ label: T("Nieuwe melding", "New issue"), primary: true }, { label: T("Planbord openen", "Open planning board") },
        { label: T("Bulk toewijzen", "Bulk assign") }, { label: T("Exporteren", "Export") }])) +
      '<p class="ek-mt-s ek-sub">' + T("* geraamd bedrag, nog geen factuur ontvangen.", "* estimated amount, no invoice received yet.") + '</p>' + detail + '</div>';
  }

  function installatiesTab(I) {
    var rijen = I.map(function (i) {
      var laat = i.keuring < "2026-10-01";
      return [U.esc(i.soort) + '<br><span class="ek-sub">' + U.esc(i.merk) + '</span>',
        U.esc(i.object), String(i.bouwjaar), U.esc(i.serie), U.esc(i.lev), U.esc(i.interval),
        (laat ? '<strong>' : "") + U.DATE(i.keuring) + (laat ? '</strong>' : ""),
        i.wettelijk ? U.chip(T("Wettelijk", "Statutory"), "info") : '<span class="ek-dim">-</span>',
        i.staat === "storing" ? U.chip(T("Storing", "Fault"), "bad") : i.staat === "aandacht" ? U.chip(T("Aandacht", "Attention"), "warn")
          : i.staat === "besteld" ? U.chip(T("Besteld", "On order"), "") : U.chip(T("Goed", "Good"), "ok")];
    });
    return '<div class="ek-mt">' + U.panel(T("Installatieregister", "Installation register"),
      U.table([{ label: T("Installatie", "Installation") }, { label: T("Object", "Property") }, { label: T("Bouwjaar", "Year") },
        { label: T("Serienummer", "Serial number") }, { label: T("Onderhoudspartij", "Service provider") }, { label: T("Interval", "Interval") },
        { label: T("Volgende keuring", "Next inspection") }, { label: T("Verplichting", "Obligation") }, { label: T("Staat", "Condition") }], rijen),
      U.btns([{ label: T("Installatie toevoegen", "Add installation"), primary: true }, { label: T("Keuring inplannen", "Schedule inspection") },
        { label: T("Contract koppelen", "Link contract") }, { label: T("Uit bedrijf nemen", "Retire") }, { label: T("Exporteren", "Export") }])) +
      U.ai(T("Waarom dit register geen bijzaak is", "Why this register is not a side issue"),
        T("Drie installaties hebben een wettelijke keuring binnen tien weken: de sprinkler op de Apolloweg, de brandmeldinstallatie in de Achmeatoren en de luchtbehandeling die nu al storing geeft. Een gemiste keuring is geen administratieve fout maar een verzekeringsprobleem, en bij brand het eerste waar naar gevraagd wordt. Daarom hangt elke keuring aan een datum, een leverancier en een document, en niet aan iemands geheugen.",
          "Three installations have a statutory inspection within ten weeks: the sprinkler at Apolloweg, the fire alarm in the Achmeatoren and the air handling unit that is already faulting. A missed inspection is not an administrative slip but an insurance problem, and after a fire it is the first thing asked about. That is why every inspection hangs off a date, a supplier and a document, and not off someone's memory.")) + '</div>';
  }

  function mjopTab() {
    var jaren = [];
    for (var j = 0; j < 10; j++) jaren.push(2026 + j);
    var totalen = jaren.map(function (x, i) { return MJOP.reduce(function (s, r) { return s + r.jaren[i]; }, 0); });
    var maxT = Math.max.apply(null, totalen);
    var rijen = MJOP.map(function (r) {
      return [U.esc(r.element), U.esc(r.cyclus)].concat(r.jaren.map(function (v) {
        return '<span class="ek-num">' + (v ? U.K(v) : '<span class="ek-dim">-</span>') + '</span>';
      }));
    });
    rijen.push({ total: true, cells: [T("Totaal", "Total"), ""].concat(totalen.map(function (v) {
      return '<span class="ek-num">' + (v ? U.K(v) : "-") + '</span>';
    })) });
    return '<div class="ek-mt">' + U.panel(T("Meerjarenonderhoudsplan 2026 tot 2035", "Long-term maintenance plan 2026 to 2035"),
      U.table([{ label: T("Element", "Element") }, { label: T("Cyclus", "Cycle") }].concat(jaren.map(function (j) { return { label: String(j), num: true }; })), rijen),
      U.btns([{ label: T("Regel toevoegen", "Add line"), primary: true }, { label: T("Conditiemeting inlezen", "Import condition survey") },
        { label: T("Naar budget", "To budget") }, { label: T("Naar project", "To project") }, { label: T("Exporteren", "Export") }])) +
      '<div class="ek-mt ek-g ek-split">' +
      U.panel(T("Verloop per jaar", "Spend per year"), '<div class="ek-panel-body">' + jaren.map(function (j, i) {
        return '<div style="padding:5px 0"><div class="ek-flow" style="justify-content:space-between"><span class="ek-p">' + j + '</span>' +
          '<strong style="font-size:12px">' + (totalen[i] ? U.EURK(totalen[i]) : "-") + '</strong></div>' +
          '<div class="ek-bar' + (totalen[i] > 250000 ? " ek-bar-red" : "") + '"><span style="width:' + Math.round(totalen[i] / maxT * 100) + '%"></span></div></div>';
      }).join("") + '</div>') +
      U.ai(T("Wat het plan zegt over de komende jaren", "What the plan says about the coming years"),
        T("Het zwaartepunt ligt in 2030, wanneer de warmteopwekking van de Achmeatoren aan vervanging toe is. Dat valt samen met het aflopen van de renteswap in 2029, dus het is verstandig die twee gesprekken bij de bank in één keer te voeren. In 2026 en 2027 is de last laag genoeg om vooruit te werken: het schilderwerk naar voren halen kost nu minder dan de gevelschade die anders in 2029 op tafel komt.",
          "The peak falls in 2030, when the Achmeatoren's heat generation is due for replacement. That coincides with the swap expiring in 2029, so it is sensible to hold both conversations with the bank at once. In 2026 and 2027 the load is light enough to work ahead: bringing the painting forward costs less now than the facade damage that would otherwise land in 2029.")) +
      '</div></div>';
  }

  function slaTab() {
    var rijen = SLA.map(function (s) {
      return [U.esc(s.lev), '<span class="ek-num">' + s.orders + '</span>',
        '<span class="ek-num">' + U.NUM(s.reactie, 1) + ' ' + T("dag", "d") + '</span>',
        '<span class="ek-num">' + U.NUM(s.opgelost, 1) + ' ' + T("dag", "d") + '</span>',
        '<div class="ek-bar' + (s.eerste >= 80 ? " ek-bar-ok" : " ek-bar-red") + '"><span style="width:' + s.eerste + '%"></span></div><span class="ek-sub">' + s.eerste + '%</span>',
        '<span class="ek-num">' + U.EUR(s.kosten) + '</span>',
        s.oordeel === "goed" ? U.chip(T("Binnen afspraak", "Within agreement"), "ok") : U.chip(T("Gesprek voeren", "Worth a conversation"), "warn")];
    });
    var totOrders = SLA.reduce(function (s, x) { return s + x.orders; }, 0);
    rijen.push({ total: true, cells: [T("Totaal", "Total"), '<span class="ek-num">' + totOrders + '</span>', "", "", "",
      '<span class="ek-num">' + U.EUR(Math.round(SLA.reduce(function (s, x) { return s + x.kosten * x.orders; }, 0) / totOrders)) + '</span>', ""] });
    return '<div class="ek-mt">' + U.panel(T("Prestaties per leverancier, laatste twaalf maanden", "Supplier performance, last twelve months"),
      U.table([{ label: T("Leverancier", "Supplier") }, { label: T("Werkorders", "Work orders"), num: true },
        { label: T("Reactietijd", "Response"), num: true }, { label: T("Doorlooptijd", "Time to resolve"), num: true },
        { label: T("Eerste keer opgelost", "First-time fix") }, { label: T("Gemiddelde kosten", "Average cost"), num: true },
        { label: T("Oordeel", "Assessment") }], rijen),
      U.btns([{ label: T("Contract bekijken", "View contract") }, { label: T("Tarieven vergelijken", "Compare rates") },
        { label: T("Gesprek plannen", "Schedule a review"), primary: true }, { label: T("Exporteren", "Export") }])) +
      U.ai(T("Wat dit overzicht laat zien", "What this overview shows"),
        T("Trigion reageert traag en lost 68% in één keer op, terwijl het om brandveiligheid en beveiliging gaat; dat is de combinatie waar je het minst mee wilt schuiven. Postma zit boven de afgesproken reactietijd maar doet vooral groter werk, waar twee dagen minder zwaar wegen. Synergy en het eigen bouwteam doen samen driekwart van alle werkorders; dat is efficiënt, maar het maakt de portefeuille ook afhankelijk van twee partijen.",
          "Trigion responds slowly and fixes 68% first time, while the work concerns fire safety and security; that is the combination you least want to let slide. Postma sits above the agreed response time but mainly handles larger jobs, where two days weigh less heavily. Synergy and the in-house building team together do three quarters of all work orders; that is efficient, but it also makes the portfolio dependent on two parties.")) + '</div>';
  }

  U.mount("ek-maintenance-root", API);
})();
