/* Eigenaarsafrekening: van huurinkomsten en kosten naar het bedrag dat een
   mede-eigenaar of belegger daadwerkelijk krijgt, met beheervergoeding,
   reservering en het moment van uitbetalen. */
(function () {
  var U = window.EKUI, T = U.T;
  var eigenaar = "harns", periode = "2026-07", stap = 3, tab = "afrekening";

  var EIGENAREN = [
    { id: "harns", naam: "Harns Invest B.V.", object: "Achmeatoren / IQON", aandeel: 45, vehikel: T("Rechtstreeks eigendom", "Direct ownership"),
      iban: "NL·· RABO ···· ···· 44", fee: 3.0, reserve: 5.0 },
    { id: "epie-bf", naam: T("Epie Kooistra, via Kooistra Beheer B.V.", "Epie Kooistra, through Kooistra Beheer B.V."), object: "Basic-Fit Dokkum", aandeel: 40,
      vehikel: "Kooistra Beheer B.V.", iban: "NL·· INGB ···· ···· 08", fee: 2.5, reserve: 7.5 },
    { id: "epie-br", naam: T("Epie Kooistra, via Kooistra Beheer B.V.", "Epie Kooistra, through Kooistra Beheer B.V."), object: "Brouwerij Dockum", aandeel: 25,
      vehikel: "Kooistra Beheer B.V.", iban: "NL·· INGB ···· ···· 08", fee: 2.5, reserve: 10.0 },
    { id: "ameland", naam: "Ameland Verblijf B.V.", object: T("Oude Rabobank Ameland", "Former Rabobank Ameland"), aandeel: 100,
      vehikel: T("Vier deelnemers in het vehikel", "Four participants in the vehicle"), iban: "NL·· ABNA ···· ···· 87", fee: 4.0, reserve: 12.0 }
  ];

  var PERIODES = ["2026-07", "2026-06", "2026-05", "2026-04"];

  function regels(id, per) {
    var basis = {
      harns: { huur: 268400, service: 46800, servicekosten: -46800, exploitatie: -32100, onderhoud: -18400, verzekering: -6200,
        belasting: -7500, rente: -68900, aflossing: -28900 },
      "epie-bf": { huur: 17833, service: 1533, servicekosten: -1533, exploitatie: -1840, onderhoud: -960, verzekering: -420,
        belasting: -510, rente: -2634, aflossing: -1120 },
      "epie-br": { huur: 8400, service: 0, servicekosten: 0, exploitatie: -1120, onderhoud: -2480, verzekering: -310,
        belasting: -280, rente: -1000, aflossing: 0 },
      ameland: { huur: 0, service: 0, servicekosten: 0, exploitatie: -2400, onderhoud: -1200, verzekering: -540,
        belasting: -380, rente: -3200, aflossing: 0 }
    }[id];
    var f = { "2026-07": 1, "2026-06": 0.985, "2026-05": 1.02, "2026-04": 0.97 }[per] || 1;
    var uit = {};
    Object.keys(basis).forEach(function (k) { uit[k] = Math.round(basis[k] * f); });
    return uit;
  }

  function bereken(e, per) {
    var r = regels(e.id, per);
    var bruto = r.huur + r.service;
    var kosten = r.servicekosten + r.exploitatie + r.onderhoud + r.verzekering + r.belasting;
    var noi = bruto + kosten;
    var fee = -Math.round(r.huur * e.fee / 100);
    var naFee = noi + fee;
    var financiering = r.rente + r.aflossing;
    var beschikbaar = naFee + financiering;
    var reserve = -Math.round(beschikbaar * e.reserve / 100);
    var uitkering = beschikbaar + reserve;
    var deel = Math.round(uitkering * e.aandeel / 100);
    return { r: r, bruto: bruto, kosten: kosten, noi: noi, fee: fee, naFee: naFee, financiering: financiering,
      beschikbaar: beschikbaar, reserve: reserve, uitkering: uitkering, deel: deel };
  }

  var STAPPEN = [
    { nl: "Berekend", en: "Calculated" }, { nl: "Gecontroleerd", en: "Reviewed" }, { nl: "Correcties", en: "Adjustments" },
    { nl: "Goedgekeurd", en: "Approved" }, { nl: "Overzicht verstuurd", en: "Statement sent" }, { nl: "Uitbetaald", en: "Paid" }
  ];

  var API = {
    stamp: function () { return eigenaar + "|" + periode + "|" + stap + "|" + tab; },
    click: function (e) {
      var o = U.hit(e, "data-ek-set-eig"); if (o) { eigenaar = o; return true; }
      var p = U.hit(e, "data-ek-set-per"); if (p) { periode = p; return true; }
      var s = U.hit(e, "data-ek-set-stap"); if (s) { stap = Math.max(0, Math.min(5, +s)); return true; }
      var t = U.hit(e, "data-ek-set-tab"); if (t) { tab = t; return true; }
      return false;
    },
    html: function () {
      var e = EIGENAREN.filter(function (x) { return x.id === eigenaar; })[0];
      var b = bereken(e, periode);
      var totaal = EIGENAREN.reduce(function (s, x) { return s + bereken(x, periode).deel; }, 0);

      return U.head({
        eyebrow: T("Kapitaal · eigenaren", "Capital · owners"),
        title: T("Eigenaarsafrekening", "Owner settlement"),
        intro: T("Van huurinkomsten naar het bedrag dat daadwerkelijk op de rekening van een mede-eigenaar staat: kosten eraf, servicekosten er neutraal doorheen, beheervergoeding, rente en aflossing, en een reservering voor onderhoud. Elke regel is aanklikbaar tot op de onderliggende boeking, want dat is de vraag die een mede-eigenaar altijd stelt.",
                 "From rental income to the amount that actually reaches a co-owner's account: costs deducted, service charges passed through neutrally, management fee, interest and amortisation, and a reserve for maintenance. Every line drills down to the underlying posting, because that is the question a co-owner always asks."),
        chip: T("Uit te keren over " + U.MONTH(periode + "-01") + ": " + U.EUR(totaal), "Payable for " + U.MONTH(periode + "-01") + ": " + U.EUR(totaal))
      }) +
      U.kpis([
        [T("Eigenaarsposities", "Owner positions"), String(EIGENAREN.length), T("over vier objecten", "across four properties")],
        [T("Uit te keren deze maand", "Payable this month"), U.EUR(totaal), T("na reservering", "after the reserve")],
        [T("Beheervergoeding", "Management fee"), U.EUR(Math.abs(EIGENAREN.reduce(function (s, x) { return s + bereken(x, periode).fee; }, 0))), T("2,5% tot 4% van de huur", "2.5% to 4% of rent")],
        [T("Gereserveerd", "Reserved"), U.EUR(Math.abs(EIGENAREN.reduce(function (s, x) { return s + bereken(x, periode).reserve; }, 0))), T("voor onderhoud en leegstand", "for maintenance and vacancy")],
        [T("Fase", "Stage"), T(STAPPEN[stap].nl, STAPPEN[stap].en), T("vijfde werkdag van de maand", "fifth working day of the month")]
      ], 5) +
      '<div class="ek-mt ek-flow">' + EIGENAREN.map(function (x) {
        return '<button type="button" class="ek-tab' + (x.id === eigenaar ? " ek-on" : "") + '" data-ek-set-eig="' + x.id + '">' +
          U.esc(x.object) + " · " + x.aandeel + '%</button>';
      }).join("") + '</div>' +
      '<div class="ek-mt-s ek-flow">' + PERIODES.map(function (p) {
        return '<button type="button" class="ek-btn' + (p === periode ? " ek-btn-primary" : "") + '" data-ek-set-per="' + p + '">' + U.MONTH(p + "-01") + '</button>';
      }).join("") + '</div>' +
      '<div class="ek-mt">' + U.tabs([
        { id: "afrekening", label: T("Afrekening", "Settlement") },
        { id: "historie", label: T("Historie & uitbetaling", "History & payment") },
        { id: "afspraken", label: T("Afspraken", "Terms") }
      ], tab, "data-ek-set-tab") + '</div>' +
      (tab === "historie" ? historieTab(e) : tab === "afspraken" ? afsprakenTab(e) : afrekeningTab(e, b));
    }
  };

  function rij(label, bedrag, sterk) {
    return { total: !!sterk, cells: [label, '<span class="ek-num">' + (bedrag < 0 ? "- " + U.EUR(-bedrag) : U.EUR(bedrag)) + '</span>'] };
  }

  function afrekeningTab(e, b) {
    var rows = [
      rij(T("Huuropbrengsten", "Rental income"), b.r.huur),
      rij(T("Ontvangen servicekosten", "Service charges received"), b.r.service),
      rij(T("Bruto opbrengsten", "Gross income"), b.bruto, true),
      rij(T("Doorbelaste servicekosten", "Service charges passed on"), b.r.servicekosten),
      rij(T("Exploitatiekosten", "Operating costs"), b.r.exploitatie),
      rij(T("Onderhoud", "Maintenance"), b.r.onderhoud),
      rij(T("Verzekering", "Insurance"), b.r.verzekering),
      rij(T("Belastingen en heffingen", "Taxes and levies"), b.r.belasting),
      rij("NOI", b.noi, true),
      rij(T("Beheervergoeding " + U.NUM(e.fee, 1) + "% over de huur", "Management fee " + U.NUM(e.fee, 1) + "% of rent"), b.fee),
      rij(T("Resultaat na beheer", "Result after management"), b.naFee, true),
      rij(T("Rente", "Interest"), b.r.rente),
      rij(T("Aflossing", "Amortisation"), b.r.aflossing),
      rij(T("Beschikbaar", "Available"), b.beschikbaar, true),
      rij(T("Reservering " + U.NUM(e.reserve, 1) + "%", "Reserve " + U.NUM(e.reserve, 1) + "%"), b.reserve),
      rij(T("Uitkeerbaar, 100%", "Distributable, 100%"), b.uitkering, true),
      rij(T("Aandeel " + e.naam + " (" + e.aandeel + "%)", "Share of " + e.naam + " (" + e.aandeel + "%)"), b.deel, true)
    ];
    return '<div class="ek-mt ek-g ek-split">' +
      U.panel(T("Afrekening ", "Settlement ") + U.MONTH(periode + "-01") + " · " + e.object,
        U.table([{ label: T("Regel", "Line") }, { label: T("Bedrag", "Amount"), num: true }], rows),
        U.chip(U.EUR(b.deel), "ok")) +
      '<div>' +
      U.panel(T("Verwerking", "Processing"), '<div class="ek-panel-body">' + U.flow(STAPPEN.map(function (s) { return T(s.nl, s.en); }), stap) +
        '<div class="ek-mt-s">' + U.btns([
          { label: T("Berekenen", "Calculate"), attr: 'data-ek-set-stap="0"' },
          { label: T("Controleren", "Review"), attr: 'data-ek-set-stap="1"' },
          { label: T("Correctie toevoegen", "Add an adjustment"), attr: 'data-ek-set-stap="2"' },
          { label: T("Goedkeuren", "Approve"), primary: true, attr: 'data-ek-set-stap="3"' },
          { label: T("Overzicht genereren", "Generate statement"), attr: 'data-ek-set-stap="4"' },
          { label: T("Boeken en uitbetalen", "Post and pay"), attr: 'data-ek-set-stap="5"' }
        ]) + '</div>' +
        '<p class="ek-mt-s ek-note">' + T("Uitbetalen zet in deze demonstratieomgeving geen geld in beweging; het maakt de journaalpost en het SEPA-bestand klaar.",
          "Paying out moves no money in this demonstration environment; it prepares the journal entry and the SEPA file.") + '</p></div>') +
      '<div class="ek-mt-s">' + U.ai(T("Wat een eigenaar hier als eerste vraagt", "What an owner asks first here"),
        T("Waarom het bedrag afwijkt van vorige maand. In dit geval: " + (b.r.onderhoud < -15000 ? "het onderhoud was hoger door de vervanging van het regelblok in de luchtbehandeling, werkorder 2026-0428, met offerte en factuur eronder." : "de kosten liggen dicht bij het gemiddelde; het verschil zit vooral in de servicekosten die per saldo neutraal doorlopen.") + " Elke regel in deze afrekening klikt door naar de boekingen die eronder liggen, dus dat gesprek duurt één klik in plaats van een middag zoeken.",
          "Why the amount differs from last month. In this case: " + (b.r.onderhoud < -15000 ? "maintenance was higher because of the control block replacement in the air handling unit, work order 2026-0428, with the quote and invoice underneath." : "costs sit close to the average; the difference is mainly in service charges, which pass through neutrally.") + " Every line in this statement drills down to the postings beneath it, so that conversation takes one click instead of an afternoon of searching.")) + '</div>' +
      '</div></div>';
  }

  function historieTab(e) {
    var rijen = PERIODES.map(function (p) {
      var b = bereken(e, p);
      return [U.MONTH(p + "-01"), '<span class="ek-num">' + U.EUR(b.bruto) + '</span>',
        '<span class="ek-num">' + U.EUR(b.noi) + '</span>',
        '<span class="ek-num">' + U.EUR(Math.abs(b.fee)) + '</span>',
        '<span class="ek-num">' + U.EUR(Math.abs(b.reserve)) + '</span>',
        '<span class="ek-num">' + U.EUR(b.deel) + '</span>',
        p === periode ? U.chip(T("Deze periode", "This period"), "info") : U.chip(T("Uitbetaald", "Paid"), "ok"),
        U.btns([{ label: "PDF" }, { label: T("Boekingen", "Postings") }])];
    });
    return '<div class="ek-mt">' + U.panel(T("Historie", "History"),
      U.table([{ label: T("Periode", "Period") }, { label: T("Bruto", "Gross"), num: true }, { label: "NOI", num: true },
        { label: T("Beheer", "Management"), num: true }, { label: T("Reserve", "Reserve"), num: true },
        { label: T("Uitgekeerd", "Distributed"), num: true }, { label: T("Status", "Status") }, { label: T("Actie", "Action") }], rijen),
      U.btns([{ label: T("Jaaroverzicht", "Annual overview"), primary: true }, { label: T("Naar Excel", "To Excel") },
        { label: T("Naar het eigenaarsportaal", "To the owner portal") }])) +
      '<div class="ek-mt ek-g ek-split">' +
      U.panel(T("Uitbetaling", "Payment"), '<div class="ek-panel-body">' + U.kv([
        [T("Rekening", "Account"), U.esc(e.iban)],
        [T("Betaalmoment", "Payment date"), T("vijfde werkdag van de maand", "fifth working day of the month")],
        [T("Verwerking", "Processing"), T("SEPA-batch, ondertekend in de bankomgeving", "SEPA batch, signed in the bank environment")],
        [T("Bijlage", "Attachment"), T("overzicht en specificatie per object", "statement and breakdown per property")],
        [T("Bericht", "Notification"), T("automatisch in het eigenaarsportaal", "automatically in the owner portal")]
      ]) + '</div>') +
      U.panel(T("Reservering", "Reserve"), '<div class="ek-panel-body">' + U.kv([
        [T("Percentage", "Percentage"), U.NUM(e.reserve, 1) + "%"],
        [T("Stand van de reserve", "Reserve balance"), U.EUR(84200)],
        [T("Waarvoor", "Purpose"), T("planmatig onderhoud en leegstand", "planned maintenance and vacancy")],
        [T("Vrijval", "Release"), T("bij een capexuitgave uit het meerjarenplan", "on a capex payment from the long-term plan")],
        [T("Afspraak", "Agreement"), T("vastgelegd in de samenwerkingsovereenkomst", "set out in the co-ownership agreement")]
      ]) + '</div>') +
      '</div></div>';
  }

  function afsprakenTab(e) {
    return '<div class="ek-mt ek-g ek-split">' +
      U.panel(T("Afspraken met deze eigenaar", "Terms with this owner"), '<div class="ek-panel-body">' + U.kv([
        [T("Object", "Property"), U.esc(e.object)],
        [T("Aandeel", "Share"), e.aandeel + "%"],
        [T("Vehikel", "Vehicle"), U.esc(e.vehikel)],
        [T("Beheervergoeding", "Management fee"), U.NUM(e.fee, 1) + T("% over de gefactureerde huur", "% of invoiced rent")],
        [T("Reservering", "Reserve"), U.NUM(e.reserve, 1) + T("% van het beschikbare bedrag", "% of the available amount")],
        [T("Servicekosten", "Service charges"), T("lopen neutraal door, geen opslag", "pass through neutrally, no mark-up")],
        [T("Frequentie", "Frequency"), T("maandelijks, achteraf", "monthly, in arrears")],
        [T("Verhuurcourtage", "Letting fee"), T("apart, één maandhuur bij een nieuw contract", "separate, one month's rent on a new lease")],
        [T("Opzegtermijn beheer", "Notice on management"), T("drie maanden", "three months")]
      ]) + '</div>') +
      U.ai(T("Waarom dit hier staat en niet in een map", "Why this sits here and not in a folder"),
        T("De beheervergoeding en de reservering zijn de twee posten waarover discussie ontstaat, meestal een jaar nadat iedereen is vergeten wat er is afgesproken. Door ze naast de afrekening te zetten en er de overeenkomst bij te bewaren, is die discussie een verwijzing in plaats van een geheugenkwestie. Wijzigt een percentage, dan geldt dat vanaf een datum en blijven oude afrekeningen staan zoals ze waren.",
          "The management fee and the reserve are the two items that cause argument, usually a year after everyone has forgotten what was agreed. Putting them next to the settlement and keeping the agreement with them turns that argument into a reference rather than a memory test. If a percentage changes, it applies from a date and old statements stay exactly as they were.")) +
      '</div>';
  }

  U.mount("ek-settlement-root", API);
})();
