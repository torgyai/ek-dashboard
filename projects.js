/* Projecten & CAPEX: fasen, budget, verplichtingen, inkooporders, facturen,
   prognose en mijlpalen, gekoppeld aan hetzelfde object als de exploitatie. */
(function () {
  var U = window.EKUI, T = U.T;
  var open = "sense", tab = "budget";

  function projecten() {
    return [
      { id: "sense", naam: T("Sense Dokkum met Brouwerij Dockum", "Sense Dokkum with Brouwerij Dockum"), object: "Sense Dokkum", plaats: "Dokkum",
        soort: T("Transformatie", "Transformation"), start: "2026-03-01", eind: "2027-06-30", fase: 2, budget: 3840000, verplicht: 2960000, gefactureerd: 1284000,
        prognose: 3985000, leider: "Sietse Talsma", aannemer: "Dijkstra Draisma",
        doel: T("Theater, horeca en een eigen brouwerij onder één dak, met de bestaande kap in het zicht. De brouwerij levert straks aan het café en aan de zaalverhuur.",
                "Theatre, hospitality and an in-house brewery under one roof, with the existing roof structure left exposed. The brewery will supply the café and the event hire."),
        regels: [
          { post: T("Sloop en asbestsanering", "Demolition and asbestos removal"), budget: 284000, verplicht: 284000, gefactureerd: 284000 },
          { post: T("Casco en constructie", "Shell and structure"), budget: 1240000, verplicht: 1240000, gefactureerd: 684000 },
          { post: T("Installaties werktuigbouw", "Mechanical services"), budget: 486000, verplicht: 452000, gefactureerd: 148000 },
          { post: T("Elektra en podiumtechniek", "Electrical and stage technology"), budget: 398000, verplicht: 372000, gefactureerd: 96000 },
          { post: T("Brouwinstallatie", "Brewing installation"), budget: 620000, verplicht: 410000, gefactureerd: 0 },
          { post: T("Afbouw en inrichting", "Fit-out and interior"), budget: 512000, verplicht: 202000, gefactureerd: 72000 },
          { post: T("Advies, vergunning en toezicht", "Consultancy, permits and supervision"), budget: 186000, verplicht: 0, gefactureerd: 0 },
          { post: T("Onvoorzien", "Contingency"), budget: 114000, verplicht: 0, gefactureerd: 0 }
        ],
        mijlpalen: [
          { naam: T("Omgevingsvergunning onherroepelijk", "Planning permission final"), datum: "2026-05-14", staat: "gereed" },
          { naam: T("Casco gereed", "Shell complete"), datum: "2026-11-30", staat: "loopt" },
          { naam: T("Brouwinstallatie geplaatst", "Brewing installation placed"), datum: "2027-02-28", staat: "gepland" },
          { naam: T("Oplevering en opening", "Handover and opening"), datum: "2027-06-30", staat: "gepland" }
        ] },
      { id: "rabo-ame", naam: T("Oude Rabobank Ameland", "Former Rabobank Ameland"), object: T("Oude Rabobank Ameland", "Former Rabobank Ameland"), plaats: "Ameland",
        soort: T("Herbestemming naar verblijf", "Conversion to holiday accommodation"), start: "2026-06-01", eind: "2027-03-31", fase: 1, budget: 1180000, verplicht: 640000, gefactureerd: 184000,
        prognose: 1210000, leider: "Amarens", aannemer: "Postma Bouw",
        doel: T("Zes verblijfseenheden in het oude bankgebouw, met de kluisdeur bewust in het zicht. Bestemmingswijziging is aangevraagd en staat op ontvankelijk.",
                "Six holiday units in the old bank building, with the vault door deliberately left on show. The change of use has been applied for and is marked as admissible."),
        regels: [
          { post: T("Sloopwerk binnen", "Internal strip-out"), budget: 92000, verplicht: 92000, gefactureerd: 92000 },
          { post: T("Casco en gevel", "Shell and facade"), budget: 386000, verplicht: 348000, gefactureerd: 92000 },
          { post: T("Installaties", "Building services"), budget: 264000, verplicht: 200000, gefactureerd: 0 },
          { post: T("Afbouw en inrichting", "Fit-out and interior"), budget: 328000, verplicht: 0, gefactureerd: 0 },
          { post: T("Advies en vergunning", "Consultancy and permits"), budget: 74000, verplicht: 0, gefactureerd: 0 },
          { post: T("Onvoorzien", "Contingency"), budget: 36000, verplicht: 0, gefactureerd: 0 }
        ],
        mijlpalen: [
          { naam: T("Bestemmingswijziging ingediend", "Change of use submitted"), datum: "2026-04-22", staat: "gereed" },
          { naam: T("Vergunning verwacht", "Permit expected"), datum: "2026-10-01", staat: "loopt" },
          { naam: T("Start afbouw", "Start of fit-out"), datum: "2026-12-01", staat: "gepland" },
          { naam: T("Eerste verhuur", "First bookings"), datum: "2027-04-01", staat: "gepland" }
        ] },
      { id: "iqon-esg", naam: T("Verduurzaming IQON, label A naar A++", "IQON sustainability upgrade, label A to A++"), object: "Achmeatoren / IQON", plaats: "Leeuwarden",
        soort: T("Verduurzaming", "Sustainability"), start: "2026-09-01", eind: "2027-05-31", fase: 0, budget: 2140000, verplicht: 0, gefactureerd: 0,
        prognose: 2140000, leider: "Sietse Talsma", aannemer: T("Nog te selecteren", "To be selected"),
        doel: T("Warmtepompen, drievoudig glas op de zuidgevel en slimme regeling. Verlaagt de energiekosten in de servicekosten en houdt het gebouw ruim boven de kantorennorm.",
                "Heat pumps, triple glazing on the south facade and smart controls. Lowers the energy costs inside the service charges and keeps the building well above the office standard."),
        regels: [
          { post: T("Warmtepompen en distributie", "Heat pumps and distribution"), budget: 980000, verplicht: 0, gefactureerd: 0 },
          { post: T("Gevel en beglazing", "Facade and glazing"), budget: 620000, verplicht: 0, gefactureerd: 0 },
          { post: T("Gebouwbeheersysteem", "Building management system"), budget: 264000, verplicht: 0, gefactureerd: 0 },
          { post: T("Advies en metingen", "Consultancy and measurements"), budget: 148000, verplicht: 0, gefactureerd: 0 },
          { post: T("Onvoorzien", "Contingency"), budget: 128000, verplicht: 0, gefactureerd: 0 }
        ],
        mijlpalen: [
          { naam: T("Subsidieaanvraag ingediend", "Grant application submitted"), datum: "2026-08-15", staat: "gereed" },
          { naam: T("Aanbesteding", "Tender"), datum: "2026-10-15", staat: "gepland" },
          { naam: T("Uitvoering", "Execution"), datum: "2027-01-15", staat: "gepland" },
          { naam: T("Nieuw label vastgesteld", "New label certified"), datum: "2027-05-31", staat: "gepland" }
        ] }
    ];
  }

  var FASEN = [
    { nl: "Voorbereiding", en: "Preparation" }, { nl: "Aanbesteding", en: "Tender" },
    { nl: "Uitvoering", en: "Execution" }, { nl: "Oplevering", en: "Handover" }, { nl: "Nazorg", en: "Aftercare" }
  ];

  var API = {
    stamp: function () { return open + "|" + tab; },
    click: function (e) {
      var o = U.hit(e, "data-ek-pr-open"); if (o) { open = o; return true; }
      var t = U.hit(e, "data-ek-pr-tab"); if (t) { tab = t; return true; }
      return false;
    },
    html: function () {
      var P = projecten();
      var gek = P.filter(function (p) { return p.id === open; })[0] || P[0];
      var budget = P.reduce(function (s, p) { return s + p.budget; }, 0);
      var verplicht = P.reduce(function (s, p) { return s + p.verplicht; }, 0);
      var gefactureerd = P.reduce(function (s, p) { return s + p.gefactureerd; }, 0);
      var prognose = P.reduce(function (s, p) { return s + p.prognose; }, 0);

      var rijen = P.map(function (p) {
        var afwijking = p.prognose - p.budget;
        return {
          attr: 'data-ek-pr-open="' + p.id + '"', on: gek.id === p.id,
          cells: ['<strong>' + U.esc(p.naam) + '</strong><br><span class="ek-sub">' + U.esc(p.object) + " · " + U.esc(p.plaats) + '</span>',
            U.esc(p.soort), U.chip(T(FASEN[p.fase].nl, FASEN[p.fase].en), p.fase >= 2 ? "info" : ""),
            U.DATE(p.start) + " → " + U.DATE(p.eind),
            '<span class="ek-num">' + U.EURK(p.budget) + '</span>',
            '<span class="ek-num">' + U.EURK(p.verplicht) + '</span>',
            '<span class="ek-num">' + U.EURK(p.gefactureerd) + '</span>',
            '<span class="ek-num">' + (afwijking === 0 ? "-" : (afwijking > 0 ? "+ " : "- ") + U.EURK(Math.abs(afwijking))) + '</span>',
            afwijking > p.budget * 0.03 ? U.chip(T("Boven budget", "Over budget"), "bad") : afwijking > 0 ? U.chip(T("Krap", "Tight"), "warn") : U.chip(T("Op koers", "On track"), "ok")]
        };
      });

      return U.head({
        eyebrow: T("Exploitatie · projecten", "Operations · projects"),
        title: T("Projecten & CAPEX", "Projects & CAPEX"),
        intro: T("Verbouwing, transformatie en verduurzaming met budget, verplichtingen en prognose op hetzelfde object als de huur en het onderhoud. Een verplichting telt mee zodra de opdracht is verstrekt, niet pas als de factuur binnen is; anders lijkt een project tot het laatste kwartaal netjes binnen budget.",
                 "Refurbishment, conversion and sustainability work with budget, commitments and forecast on the same property as the rent and the maintenance. A commitment counts from the moment the order is placed, not when the invoice arrives; otherwise a project looks comfortably within budget until the final quarter."),
        chip: T(P.length + " lopende projecten", P.length + " active projects")
      }) +
      U.kpis([
        [T("Totaal budget", "Total budget"), U.EURK(budget), T("drie projecten", "three projects")],
        [T("Verplicht", "Committed"), U.EURK(verplicht), Math.round(verplicht / budget * 100) + "% " + T("van het budget", "of budget"), Math.round(verplicht / budget * 100)],
        [T("Gefactureerd", "Invoiced"), U.EURK(gefactureerd), Math.round(gefactureerd / budget * 100) + "% " + T("van het budget", "of budget"), Math.round(gefactureerd / budget * 100)],
        [T("Prognose eindstand", "Forecast at completion"), U.EURK(prognose), (prognose > budget ? "+ " : "- ") + U.EURK(Math.abs(prognose - budget)) + T(" ten opzichte van budget", " against budget")],
        [T("Nog te betalen", "Still to pay"), U.EURK(verplicht - gefactureerd), T("aangegane verplichtingen", "commitments entered into")]
      ], 5) +
      '<div class="ek-mt">' + U.panel(T("Projecten", "Projects"),
        U.table([{ label: T("Project", "Project") }, { label: T("Soort", "Type") }, { label: T("Fase", "Phase") },
          { label: T("Looptijd", "Period") }, { label: T("Budget", "Budget"), num: true }, { label: T("Verplicht", "Committed"), num: true },
          { label: T("Gefactureerd", "Invoiced"), num: true }, { label: T("Afwijking", "Variance"), num: true }, { label: T("Status", "Status") }], rijen),
        U.btns([{ label: T("Nieuw project", "New project"), primary: true }, { label: T("Aanbesteden", "Tender") }, { label: T("Exporteren", "Export") }])) + '</div>' +
      '<div class="ek-mt">' + detail(gek) + '</div>';
    }
  };

  function detail(p) {
    var tabs = [
      { id: "budget", label: T("Budget & verplichtingen", "Budget & commitments") },
      { id: "mijlpalen", label: T("Fasen & mijlpalen", "Phases & milestones") },
      { id: "prognose", label: T("Prognose", "Forecast") }
    ];
    var body;
    if (tab === "mijlpalen") {
      body = U.flow(FASEN.map(function (f) { return T(f.nl, f.en); }), p.fase) +
        '<div class="ek-mt-s">' + U.table([{ label: T("Mijlpaal", "Milestone") }, { label: T("Datum", "Date") }, { label: T("Status", "Status") }],
          p.mijlpalen.map(function (m) {
            return [U.esc(m.naam), U.DATE(m.datum),
              m.staat === "gereed" ? U.chip(T("Gereed", "Complete"), "ok") : m.staat === "loopt" ? U.chip(T("Loopt", "In progress"), "info") : U.chip(T("Gepland", "Planned"), "")];
          })) + '</div>' +
        '<div class="ek-mt-s">' + U.btns([{ label: T("Fase toevoegen", "Add phase") }, { label: T("Mijlpaal verzetten", "Move milestone") },
          { label: T("Project afsluiten", "Close project") }]) + '</div>';
    } else if (tab === "prognose") {
      var rest = p.budget - p.verplicht;
      body = '<div class="ek-g ek-split">' + U.kv([
        [T("Budget", "Budget"), U.EUR(p.budget)],
        [T("Verplicht", "Committed"), U.EUR(p.verplicht)],
        [T("Gefactureerd", "Invoiced"), U.EUR(p.gefactureerd)],
        [T("Nog niet verplicht", "Not yet committed"), U.EUR(rest)],
        [T("Prognose eindstand", "Forecast at completion"), U.EUR(p.prognose)],
        [T("Afwijking", "Variance"), (p.prognose - p.budget >= 0 ? "+ " : "- ") + U.EUR(Math.abs(p.prognose - p.budget))],
        [T("Projectleider", "Project manager"), U.esc(p.leider)],
        [T("Hoofdaannemer", "Main contractor"), U.esc(p.aannemer)]
      ]) + U.ai(T("Wat de prognose stuurt", "What drives the forecast"),
        p.id === "sense" ? T("De overschrijding van 145.000 zit vrijwel volledig in de brouwinstallatie: de gekozen leverancier levert pas in het eerste kwartaal en rekent staffelprijzen die sinds de offerte zijn gestegen. De post onvoorzien dekt dit, maar dan is die post ook op; meerwerk in de afbouw moet vanaf nu apart worden goedgekeurd.",
                                "The overrun of 145,000 sits almost entirely in the brewing installation: the chosen supplier only delivers in the first quarter and charges tiered prices that have risen since the quote. The contingency covers it, but then that contingency is gone; from now on any extra work in the fit-out has to be approved separately.")
          : p.id === "rabo-ame" ? T("De prognose loopt 30.000 boven budget door de gevel: het voegwerk bleek slechter dan de opname liet zien. Zolang de vergunning nog niet binnen is blijft de afbouw onverplicht, dus er is nog ruimte om te sturen.",
                                    "The forecast runs 30,000 over budget because of the facade: the pointing turned out worse than the survey showed. As long as the permit is outstanding the fit-out stays uncommitted, so there is still room to steer.")
          : T("Nog niets verplicht. De subsidieaanvraag is ingediend; valt die toe, dan daalt de netto-investering en verschuift de terugverdientijd van elf naar ruim acht jaar.",
              "Nothing committed yet. The grant application has been submitted; if it comes through, the net investment falls and the payback shifts from eleven years to a little over eight.")) + '</div>';
    } else {
      var rijen = p.regels.map(function (r) {
        return [U.esc(r.post), '<span class="ek-num">' + U.EUR(r.budget) + '</span>',
          '<span class="ek-num">' + U.EUR(r.verplicht) + '</span>',
          '<span class="ek-num">' + U.EUR(r.gefactureerd) + '</span>',
          '<div class="ek-bar"><span style="width:' + Math.round(r.gefactureerd / r.budget * 100) + '%"></span></div>',
          r.verplicht > r.budget ? U.chip(T("Overschreden", "Exceeded"), "bad") : r.verplicht === 0 ? U.chip(T("Open", "Open"), "") : U.chip(T("Loopt", "Running"), "info")];
      });
      rijen.push({ total: true, cells: [T("Totaal", "Total"), '<span class="ek-num">' + U.EUR(p.budget) + '</span>',
        '<span class="ek-num">' + U.EUR(p.verplicht) + '</span>', '<span class="ek-num">' + U.EUR(p.gefactureerd) + '</span>', "", ""] });
      body = '<p class="ek-p">' + U.esc(p.doel) + '</p><div class="ek-mt-s">' +
        U.table([{ label: T("Budgetregel", "Budget line") }, { label: T("Budget", "Budget"), num: true },
          { label: T("Verplicht", "Committed"), num: true }, { label: T("Gefactureerd", "Invoiced"), num: true },
          { label: T("Voortgang", "Progress") }, { label: T("Status", "Status") }], rijen) + '</div>' +
        '<div class="ek-mt-s">' + U.btns([{ label: T("Budget instellen", "Set budget") }, { label: T("Inkooporder", "Purchase order"), primary: true },
          { label: T("Verplichting vastleggen", "Record commitment") }, { label: T("Meerwerk goedkeuren", "Approve variation") },
          { label: T("Factuur toevoegen", "Add invoice") }, { label: T("Prognose bijwerken", "Update forecast") }]) + '</div>';
    }
    return U.panel(p.naam, '<div class="ek-panel-body">' + U.tabs(tabs, tab, "data-ek-pr-tab") + '<div class="ek-mt-s">' + body + '</div></div>');
  }

  U.mount("ek-projects-root", API);
})();
