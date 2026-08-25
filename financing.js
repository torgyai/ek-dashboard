/* Financiering & kapitaal: faciliteiten, convenanten met ruimte tot de grens,
   aanbiedingen van banken op totale kosten vergeleken, en het bankpakket dat
   pas opengaat als elke eigenaar zijn object heeft vrijgegeven. */
(function () {
  var U = window.EKUI, T = U.T;
  var tab = "faciliteiten", open = "rabo-a", vrijgave = { "achmeatoren-iqon": 1, "basic-fit-dokkum": 1 };

  function faciliteiten() {
    return [
      { id: "rabo-a", bank: "Rabobank", ref: "FIN-2022-0003", entiteit: "EYE Vastgoed B.V.", hoofdsom: 24000000, uit: 21840000,
        type: T("Variabel met renteswap", "Floating with interest rate swap"), rente: 3.95, opslag: "Euribor 3M + 1,85%",
        start: "2022-06-01", eind: "2032-06-01", aflossing: 960000, onderpand: T("41 objecten Friesland", "41 properties in Friesland"),
        waarde: 52400000, hyp: T("Eerste hypotheek", "First charge") },
      { id: "rabo-b", bank: "Rabobank", ref: "FIN-2019-0011", entiteit: "ERKO Dokkum Beheer B.V.", hoofdsom: 8400000, uit: 7612000,
        type: T("Vast tot 2029", "Fixed to 2029"), rente: 4.15, opslag: T("vast", "fixed"),
        start: "2019-04-01", eind: "2029-04-01", aflossing: 336000, onderpand: T("Basic-Fit Dokkum en 6 winkels", "Basic-Fit Dokkum and 6 retail units"),
        waarde: 16800000, hyp: T("Eerste hypotheek", "First charge") },
      { id: "ing-1", bank: "ING", ref: "FIN-2018-0007", entiteit: "EYE Vastgoed B.V.", hoofdsom: 14500000, uit: 13284000,
        type: T("Vast tot 2028", "Fixed to 2028"), rente: 3.72, opslag: T("vast", "fixed"),
        start: "2018-07-01", eind: "2028-07-01", aflossing: 580000, onderpand: T("Portefeuille Groningen en Leeuwarden", "Groningen and Leeuwarden portfolio"),
        waarde: 31200000, hyp: T("Eerste hypotheek", "First charge") },
      { id: "abn-1", bank: "ABN AMRO", ref: "FIN-2023-0002", entiteit: T("EYE Vastgoed B.V. en Harns Invest B.V.", "EYE Vastgoed B.V. and Harns Invest B.V."), hoofdsom: 18000000, uit: 17240000,
        type: T("Variabel", "Floating"), rente: 3.65, opslag: "Euribor 3M + 1,55%",
        start: "2023-02-01", eind: "2033-02-01", aflossing: 360000, onderpand: "Achmeatoren / IQON",
        waarde: 38600000, hyp: T("Eerste hypotheek, hoofdelijk", "First charge, joint and several") },
      { id: "epie", bank: T("Onderhandse lening Epie Kooistra", "Private loan, Epie Kooistra"), ref: "FIN-2014-0001", entiteit: "Kooistra Beheer B.V.", hoofdsom: 2400000, uit: 2400000,
        type: T("Vast, aflossingsvrij", "Fixed, interest only"), rente: 5.0, opslag: T("vast", "fixed"),
        start: "2014-01-01", eind: "2029-01-01", aflossing: 0, onderpand: T("Tweede hypotheek Brouwerij Dockum", "Second charge on Brouwerij Dockum"),
        waarde: 4800000, hyp: T("Tweede hypotheek", "Second charge") },
      { id: "groen", bank: T("Rabobank Groenfinanciering", "Rabobank green finance"), ref: "FIN-2025-0014", entiteit: "EYE Vastgoed B.V.", hoofdsom: 3200000, uit: 2984000,
        type: T("Vast tot 2035", "Fixed to 2035"), rente: 2.95, opslag: T("groenrente", "green rate"),
        start: "2025-01-01", eind: "2035-01-01", aflossing: 216000, onderpand: T("Verduurzaamde objecten Dokkum", "Upgraded properties in Dokkum"),
        waarde: 8400000, hyp: T("Eerste hypotheek", "First charge") }
    ];
  }

  var CONVENANTEN = [
    { naam: "LTV", uitleg: T("Schuld gedeeld door marktwaarde", "Debt divided by market value"), grens: 60, waarde: 44.2, richting: "max", bank: "Rabobank", frequentie: T("Per kwartaal", "Quarterly") },
    { naam: "DSCR", uitleg: T("Operationeel resultaat gedeeld door rente en aflossing", "Operating result divided by interest and amortisation"), grens: 1.30, waarde: 1.94, richting: "min", bank: "Rabobank", frequentie: T("Per kwartaal", "Quarterly") },
    { naam: T("Rentedekking", "Interest cover"), uitleg: T("Operationeel resultaat gedeeld door rentelasten", "Operating result divided by interest expense"), grens: 2.00, waarde: 3.52, richting: "min", bank: "ING", frequentie: T("Per halfjaar", "Semi-annually") },
    { naam: T("Bezettingsgraad", "Occupancy"), uitleg: T("Verhuurde meters ten opzichte van totaal", "Let floor area against total"), grens: 85, waarde: 93.1, richting: "min", bank: "ABN AMRO", frequentie: T("Per jaar", "Annually") },
    { naam: T("Solvabiliteit", "Solvency"), uitleg: T("Eigen vermogen gedeeld door balanstotaal", "Equity divided by balance sheet total"), grens: 25, waarde: 32.2, richting: "min", bank: "Rabobank", frequentie: T("Per jaar", "Annually") }
  ];

  function aanbiedingen() {
    return [
      { bank: "Rabobank", hoofdsom: 13284000, basis: T("Euribor 3M 2,10%", "3M Euribor 2.10%"), marge: 1.55, afsluit: 0.35, bereid: 0.15, nonutil: 0.20,
        looptijd: 7, aflossing: 4.0, hedge: 0.18, juridisch: 24000, exit: T("Geen na jaar 3", "None after year 3"), ltv: 55, opmerking: T("Kent de portefeuille, snelste doorlooptijd.", "Knows the portfolio, quickest process.") },
      { bank: "ING", hoofdsom: 13284000, basis: T("Vast 3,48%", "Fixed 3.48%"), marge: 0, afsluit: 0.50, bereid: 0.10, nonutil: 0.15,
        looptijd: 10, aflossing: 3.0, hedge: 0, juridisch: 31000, exit: T("2% tot jaar 5", "2% until year 5"), ltv: 50, opmerking: T("Langste zekerheid, maar duur bij vervroegd aflossen.", "Longest certainty, but expensive to repay early.") },
      { bank: "ABN AMRO", hoofdsom: 13284000, basis: T("Euribor 3M 2,10%", "3M Euribor 2.10%"), marge: 1.40, afsluit: 0.45, bereid: 0.20, nonutil: 0.25,
        looptijd: 5, aflossing: 5.0, hedge: 0.22, juridisch: 28000, exit: T("Geen", "None"), ltv: 52, opmerking: T("Laagste marge, hoogste verplichte aflossing.", "Lowest margin, highest mandatory amortisation.") },
      { bank: T("Verzekeraar (via adviseur)", "Insurer (through adviser)"), hoofdsom: 13284000, basis: T("Vast 3,85%", "Fixed 3.85%"), marge: 0, afsluit: 0.75, bereid: 0, nonutil: 0,
        looptijd: 15, aflossing: 2.0, hedge: 0, juridisch: 46000, exit: T("Boeterente marktwaarde", "Make-whole penalty"), ltv: 45, opmerking: T("Vijftien jaar rust, maar lagere bevoorschotting en zware boeteclausule.", "Fifteen years of calm, but a lower advance rate and a heavy penalty clause.") }
    ];
  }

  var BANKPAKKET = [
    ["Financieringsmemorandum", "Financing memorandum", true],
    ["Structuur van kredietnemer en SPV's", "Borrower and SPV structure", true],
    ["Objectenlijst met kadastrale gegevens", "Asset schedule with land registry data", true],
    ["Huurlijst per unit", "Rent roll per unit", true],
    ["Historische NOI, drie jaar", "Historic NOI, three years", true],
    ["Begroting en prognose", "Budget and forecast", true],
    ["Taxatierapporten", "Valuation reports", true],
    ["Huurexpiratieschema", "Lease expiry schedule", true],
    ["Achterstanden en incassogeschiedenis", "Arrears and collection history", true],
    ["Capex-programma", "Capex programme", true],
    ["Energielabels en ESG-informatie", "Energy labels and ESG information", true],
    ["Bestaande schuld en zekerheden", "Existing debt and security", true],
    ["Jaarrekeningen per entiteit", "Annual accounts per entity", true],
    ["Verzekeringspolissen", "Insurance policies", false],
    ["Milieukundig bodemonderzoek", "Environmental soil survey", false]
  ];

  var API = {
    stamp: function () { return tab + "|" + open + "|" + Object.keys(vrijgave).join(","); },
    click: function (e) {
      var t = U.hit(e, "data-ek-fin-tab"); if (t) { tab = t; return true; }
      var o = U.hit(e, "data-ek-fin-open"); if (o) { open = o; return true; }
      var v = U.hit(e, "data-ek-fin-vrij");
      if (v) { if (vrijgave[v]) delete vrijgave[v]; else vrijgave[v] = 1; return true; }
      return false;
    },
    html: function () {
      var F = faciliteiten();
      var uit = F.reduce(function (s, f) { return s + f.uit; }, 0);
      var waarde = F.reduce(function (s, f) { return s + f.waarde; }, 0);
      var rente = F.reduce(function (s, f) { return s + f.uit * f.rente; }, 0) / uit;
      var aflossing = F.reduce(function (s, f) { return s + f.aflossing; }, 0);

      var body;
      if (tab === "faciliteiten") body = faciliteitenTab(F, uit);
      else if (tab === "convenanten") body = convenantenTab();
      else if (tab === "aanbiedingen") body = aanbiedingenTab();
      else body = bankpakketTab();

      return U.head({
        eyebrow: T("Kapitaal · financiering", "Capital · financing"),
        title: T("Financiering & kapitaal", "Financing & capital"),
        intro: T("Elke faciliteit met zijn zekerheden, convenanten en vervaldatum, en daarnaast de vraag die er echt toe doet: wat kost dit geld werkelijk. Aanbiedingen worden niet op het rentepercentage vergeleken maar op alles bij elkaar, inclusief afsluitprovisie, bereidstelling, hedging, juridische kosten en de boete bij vervroegd aflossen.",
                 "Every facility with its security, covenants and maturity, alongside the question that actually matters: what does this money really cost. Offers are not compared on the headline rate but on everything together, including arrangement fee, commitment fee, hedging, legal costs and the penalty for early repayment."),
        chip: T("Gewogen rente " + U.NUM(rente, 2) + "%", "Weighted rate " + U.NUM(rente, 2) + "%")
      }) +
      U.kpis([
        [T("Uitstaande schuld", "Debt outstanding"), U.EURK(uit), F.length + T(" faciliteiten bij 4 verstrekkers", " facilities with 4 lenders")],
        [T("Gewogen LTV", "Weighted LTV"), U.PCT(uit / waarde * 100), T("convenantgrens 60%", "covenant limit 60%"), uit / waarde * 100],
        [T("Gewogen rente", "Weighted rate"), U.NUM(rente, 2) + "%", T("2,84% van de schuld staat vast", "2.84% of the debt is fixed")],
        [T("Aflossing per jaar", "Annual amortisation"), U.EURK(aflossing), T("plus rente " + U.EURK(Math.round(uit * rente / 100)), "plus interest " + U.EURK(Math.round(uit * rente / 100)))],
        [T("Eerstvolgende vervaldatum", "Next maturity"), U.DATE("2028-07-01"), T("ING, " + U.EURK(13284000), "ING, " + U.EURK(13284000))]
      ], 5) +
      '<div class="ek-mt">' + U.tabs([
        { id: "faciliteiten", label: T("Faciliteiten", "Facilities"), count: F.length },
        { id: "convenanten", label: T("Convenanten", "Covenants"), count: CONVENANTEN.length },
        { id: "aanbiedingen", label: T("Aanbiedingen vergelijken", "Compare offers"), count: 4 },
        { id: "bankpakket", label: T("Bankpakket", "Bank pack") }
      ], tab, "data-ek-fin-tab") + '</div>' + body;
    }
  };

  function faciliteitenTab(F, uit) {
    var gek = F.filter(function (f) { return f.id === open; })[0] || F[0];
    var rijen = F.map(function (f) {
      return {
        attr: 'data-ek-fin-open="' + f.id + '"', on: gek.id === f.id,
        cells: ['<strong>' + U.esc(f.bank) + '</strong><br><span class="ek-sub">' + U.esc(f.ref) + '</span>',
          U.esc(f.entiteit), '<span class="ek-num">' + U.EURK(f.uit) + '</span>',
          U.NUM(f.rente, 2) + '%<br><span class="ek-sub">' + U.esc(f.opslag) + '</span>',
          U.esc(f.type), U.DATE(f.eind),
          '<span class="ek-num">' + U.EURK(f.aflossing) + '</span>',
          '<span class="ek-num">' + U.PCT(f.uit / f.waarde * 100) + '</span>']
      };
    });
    rijen.push({ total: true, cells: [T("Totaal", "Total"), "", '<span class="ek-num">' + U.EURK(uit) + '</span>', "", "", "",
      '<span class="ek-num">' + U.EURK(F.reduce(function (s, f) { return s + f.aflossing; }, 0)) + '</span>', ""] });
    var jaren = [["2026", 1236000], ["2027", 1452000], ["2028", 14736000], ["2029", 10012000], ["2030", 1452000], ["2031", 1452000], ["2032", 18876000], ["2033+", 16144000]];
    var maxj = 18876000;
    return '<div class="ek-mt">' + U.panel(T("Faciliteiten", "Facilities"),
      U.table([{ label: T("Verstrekker", "Lender") }, { label: T("Entiteit", "Entity") }, { label: T("Uitstaand", "Outstanding"), num: true },
        { label: T("Rente", "Rate") }, { label: T("Soort", "Type") }, { label: T("Vervalt", "Matures") },
        { label: T("Aflossing p.j.", "Amortisation p.a."), num: true }, { label: "LTV", num: true }], rijen),
      U.btns([{ label: T("Nieuwe faciliteit", "New facility"), primary: true }, { label: T("Termsheet opvragen", "Request term sheet") }, { label: T("Exporteren", "Export") }])) +
      '<div class="ek-mt ek-g ek-split">' +
      U.panel(gek.bank + " · " + gek.ref, '<div class="ek-panel-body">' + U.kv([
        [T("Kredietnemer", "Borrower"), U.esc(gek.entiteit)],
        [T("Hoofdsom", "Principal"), U.EUR(gek.hoofdsom)],
        [T("Uitstaand", "Outstanding"), U.EUR(gek.uit)],
        [T("Rente", "Rate"), U.NUM(gek.rente, 2) + "% · " + U.esc(gek.opslag)],
        [T("Aflossing", "Amortisation"), gek.aflossing ? U.EUR(gek.aflossing) + T(" per jaar", " per year") : T("aflossingsvrij", "interest only")],
        [T("Looptijd", "Term"), U.DATE(gek.start) + " → " + U.DATE(gek.eind)],
        [T("Onderpand", "Security"), U.esc(gek.onderpand)],
        [T("Zekerheid", "Charge"), U.esc(gek.hyp)],
        [T("Onderpandwaarde", "Collateral value"), U.EURK(gek.waarde)],
        [T("LTV op deze faciliteit", "LTV on this facility"), U.PCT(gek.uit / gek.waarde * 100)]
      ]) + '<div class="ek-mt-s">' + U.btns([{ label: T("Convenant toetsen", "Test covenant") }, { label: T("Rapportage sturen", "Send report") },
        { label: T("Herfinanciering starten", "Start refinancing"), primary: true }, { label: T("Aflosschema", "Amortisation schedule") }]) + '</div></div>') +
      U.panel(T("Vervalkalender", "Maturity ladder"), '<div class="ek-panel-body">' +
        jaren.map(function (j) {
          return '<div style="padding:6px 0"><div class="ek-flow" style="justify-content:space-between">' +
            '<span class="ek-p">' + j[0] + '</span><strong style="font-size:12px">' + U.EURK(j[1]) + '</strong></div>' +
            '<div class="ek-bar' + (j[1] > 12000000 ? " ek-bar-red" : "") + '"><span style="width:' + Math.round(j[1] / maxj * 100) + '%"></span></div></div>';
        }).join("") +
        '<p class="ek-mt-s ek-note">' + T("Twee jaren dragen samen ruim de helft van de schuld: 2028 en 2032. Dat is het moment om nu al met twee verstrekkers tegelijk te praten in plaats van zes maanden voor de vervaldatum met één.",
          "Two years carry more than half the debt between them: 2028 and 2032. That is the reason to start talking to two lenders at once now, rather than to one six months before maturity.") + '</p></div>') +
      '</div></div>';
  }

  function convenantenTab() {
    var rijen = CONVENANTEN.map(function (c) {
      var ruimte = c.richting === "max" ? (c.grens - c.waarde) / c.grens * 100 : (c.waarde - c.grens) / c.grens * 100;
      var eenheid = c.naam === "LTV" || c.naam.indexOf("graad") !== -1 || c.naam.indexOf("Solvab") !== -1 || c.naam.indexOf("Occup") !== -1 || c.naam.indexOf("Solven") !== -1 ? "%" : "x";
      return [U.esc(c.naam) + '<br><span class="ek-sub">' + U.esc(c.uitleg) + '</span>',
        U.esc(c.bank),
        (c.richting === "max" ? T("maximaal ", "maximum ") : T("minimaal ", "minimum ")) + U.NUM(c.grens, eenheid === "%" ? 0 : 2) + eenheid,
        '<strong>' + U.NUM(c.waarde, eenheid === "%" ? 1 : 2) + eenheid + '</strong>',
        '<div class="ek-bar' + (ruimte < 15 ? " ek-bar-red" : " ek-bar-ok") + '"><span style="width:' + Math.min(100, Math.round(ruimte * 2)) + '%"></span></div><span class="ek-sub">' + U.PCT(ruimte) + T(" ruimte", " headroom") + '</span>',
        U.esc(c.frequentie),
        ruimte < 15 ? U.chip(T("Krap", "Tight"), "warn") : U.chip(T("Ruim", "Comfortable"), "ok")];
    });
    return '<div class="ek-mt">' + U.panel(T("Convenanten", "Covenants"),
      U.table([{ label: T("Convenant", "Covenant") }, { label: T("Verstrekker", "Lender") }, { label: T("Grens", "Limit") },
        { label: T("Nu", "Current") }, { label: T("Ruimte", "Headroom") }, { label: T("Rapportage", "Reporting") }, { label: T("Status", "Status") }], rijen),
      U.btns([{ label: T("Toetsen op peildatum", "Test at a date"), primary: true }, { label: T("Rapportage genereren", "Generate report") },
        { label: T("Scenario doorrekenen", "Run a scenario") }])) +
      U.ai(T("Waar het krap kan worden", "Where this could get tight"),
        T("De LTV heeft nu ruime marge, maar hij is gevoelig voor waardering, niet voor cashflow: een taxatie die 12% lager uitkomt brengt de portefeuille van 44,2% naar 50,2% en dat is nog steeds binnen de grens. De DSCR is het convenant om in de gaten te houden zodra de renteswap in 2029 afloopt; bij ongewijzigde huren en een marktrente van 4,5% zakt hij naar ongeveer 1,58 en dat is nog boven de 1,30, maar de ruimte halveert.",
          "The LTV has comfortable headroom, but it is sensitive to valuation, not to cash flow: a valuation coming in 12% lower moves the portfolio from 44.2% to 50.2%, still inside the limit. The DSCR is the covenant to watch once the swap expires in 2029; with unchanged rents and a market rate of 4.5% it falls to roughly 1.58, still above 1.30, but the headroom halves.")) + '</div>';
  }

  function aanbiedingenTab() {
    var A = aanbiedingen();
    function totaal(a) {
      var basisRente = parseFloat(String(a.basis).replace(/[^0-9,\.]/g, "").replace(",", ".")) || 0;
      var jaarRente = (basisRente + a.marge) / 100 * a.hoofdsom;
      var eenmalig = (a.afsluit / 100) * a.hoofdsom + a.juridisch;
      var jaarKosten = jaarRente + (a.bereid / 100) * a.hoofdsom * 0.25 + (a.hedge / 100) * a.hoofdsom;
      return { jaar: Math.round(jaarKosten), eenmalig: Math.round(eenmalig),
        allin: Math.round(jaarKosten + eenmalig / a.looptijd),
        pct: (jaarKosten + eenmalig / a.looptijd) / a.hoofdsom * 100 };
    }
    var berekend = A.map(function (a) { return { a: a, t: totaal(a) }; });
    var beste = berekend.slice().sort(function (x, y) { return x.t.allin - y.t.allin; })[0];
    var rijen = berekend.map(function (b) {
      return [U.esc(b.a.bank) + (b.a.bank === beste.a.bank ? " " + U.chip(T("Laagste totale kosten", "Lowest all-in cost"), "ok") : ""),
        U.esc(b.a.basis) + (b.a.marge ? " + " + U.NUM(b.a.marge, 2) + "%" : ""),
        U.NUM(b.a.looptijd, 0) + " " + T("jaar", "years"),
        U.NUM(b.a.aflossing, 1) + "%",
        U.PCT(b.a.ltv, 0),
        '<span class="ek-num">' + U.EUR(b.t.eenmalig) + '</span>',
        '<span class="ek-num">' + U.EUR(b.t.jaar) + '</span>',
        '<span class="ek-num"><strong>' + U.NUM(b.t.pct, 2) + '%</strong></span>',
        U.esc(b.a.exit)];
    });
    return '<div class="ek-mt">' + U.panel(T("Aanbiedingen voor de herfinanciering van juli 2028", "Offers for the July 2028 refinancing"),
      U.table([{ label: T("Verstrekker", "Lender") }, { label: T("Rente", "Rate") }, { label: T("Looptijd", "Term") },
        { label: T("Aflossing", "Amortisation") }, { label: "LTV", num: true }, { label: T("Eenmalig", "Upfront"), num: true },
        { label: T("Per jaar", "Per year"), num: true }, { label: T("Totale kosten", "All-in cost"), num: true }, { label: T("Boete bij aflossen", "Prepayment") }], rijen),
      U.btns([{ label: T("Bank uitnodigen", "Invite lender"), primary: true }, { label: T("Termsheet uploaden", "Upload term sheet") },
        { label: T("Vergelijking exporteren", "Export comparison") }, { label: T("Voorkeur vastleggen", "Record preference") }])) +
      '<div class="ek-mt ek-g ek-split">' +
      U.panel(T("Wat er in de totale kosten zit", "What goes into the all-in cost"), '<div class="ek-panel-body">' +
        U.kv([
          [T("Basisrente", "Base rate"), T("Euribor of het vaste tarief", "Euribor or the fixed rate")],
          [T("Marge", "Margin"), T("opslag van de verstrekker", "the lender's spread")],
          [T("Afsluitprovisie", "Arrangement fee"), T("eenmalig, uitgesmeerd over de looptijd", "one-off, spread over the term")],
          [T("Bereidstelling", "Commitment fee"), T("over het nog niet opgenomen deel", "on the undrawn amount")],
          [T("Non-utilisatie", "Non-utilisation"), T("bij een niet volledig benutte faciliteit", "on a facility that is not fully drawn")],
          [T("Hedging", "Hedging"), T("kosten van de renteswap", "cost of the interest rate swap")],
          [T("Juridisch en taxatie", "Legal and valuation"), T("eenmalig", "one-off")],
          [T("Boete bij vervroegd aflossen", "Prepayment penalty"), T("telt pas mee als u verwacht eerder te herfinancieren", "only counts if you expect to refinance early")]
        ]) + '</div>') +
      U.ai(T("Wat de vergelijking laat zien", "What the comparison shows"),
        T("Op het rentepercentage lijkt ING het goedkoopst, maar de afsluitprovisie van 0,50% en de boeteclausule tot jaar 5 draaien dat om zodra herfinancieren binnen zeven jaar waarschijnlijk is. Rabobank komt op totale kosten het laagst uit en kent de portefeuille al, wat de doorlooptijd scheelt. De verzekeraar is alleen interessant als vijftien jaar rust meer waard is dan flexibiliteit; de bevoorschotting van 45% betekent bovendien dat er eigen geld bij moet.",
          "On the headline rate ING looks cheapest, but the 0.50% arrangement fee and the penalty clause running to year 5 turn that around as soon as refinancing within seven years is likely. Rabobank comes out lowest on all-in cost and already knows the portfolio, which saves time. The insurer is only interesting if fifteen years of calm is worth more than flexibility; its 45% advance rate also means putting in more equity.")) +
      '</div></div>';
  }

  function bankpakketTab() {
    var objecten = [
      { id: "achmeatoren-iqon", naam: "Achmeatoren / IQON", eigenaar: "EYE Vastgoed B.V. · Harns Invest B.V.", waarde: 38600000 },
      { id: "basic-fit-dokkum", naam: "Basic-Fit Dokkum", eigenaar: "ERKO Dokkum Beheer B.V. · Epie Kooistra", waarde: 6400000 },
      { id: "portefeuille-dokkum", naam: T("Portefeuille Dokkum, 41 objecten", "Dokkum portfolio, 41 properties"), eigenaar: "EYE Vastgoed B.V.", waarde: 52400000 },
      { id: "groningen", naam: T("Portefeuille Groningen", "Groningen portfolio"), eigenaar: "EYE Vastgoed B.V.", waarde: 18200000 }
    ];
    var vrij = objecten.filter(function (o) { return vrijgave[o.id]; });
    var waardeVrij = vrij.reduce(function (s, o) { return s + o.waarde; }, 0);
    var rijen = objecten.map(function (o) {
      return [U.esc(o.naam), U.esc(o.eigenaar), '<span class="ek-num">' + U.EURK(o.waarde) + '</span>',
        vrijgave[o.id] ? U.chip(T("Vrijgegeven", "Released"), "ok") : U.chip(T("Wacht op eigenaar", "Awaiting owner"), "warn"),
        U.btns([{ label: vrijgave[o.id] ? T("Vrijgave intrekken", "Withdraw release") : T("Vrijgeven", "Release"),
          primary: !vrijgave[o.id], danger: !!vrijgave[o.id], attr: 'data-ek-fin-vrij="' + o.id + '"' }])];
    });
    return '<div class="ek-mt ek-g ek-split">' +
      U.panel(T("Objecten in het pakket", "Assets in the pack"),
        U.table([{ label: T("Object", "Property") }, { label: T("Eigendom", "Ownership") }, { label: T("Waarde", "Value"), num: true },
          { label: T("Toestemming", "Consent") }, { label: T("Actie", "Action") }], rijen),
        U.btns([{ label: T("Object toevoegen", "Add asset") }, { label: T("Toestemming vragen", "Request consent") },
          { label: T("Bankpakket bouwen", "Build bank pack"), primary: true }, { label: T("Dataroom openen", "Open data room") }])) +
      U.panel(T("Inhoud van het pakket", "Contents of the pack"), '<div class="ek-panel-body">' +
        BANKPAKKET.map(function (b) {
          return '<label class="ek-check"><input type="checkbox" ' + (b[2] ? "checked" : "") + ' disabled> ' + T(b[0], b[1]) +
            (b[2] ? "" : ' <span class="ek-sub">· ' + T("nog aan te leveren", "still to be supplied") + '</span>') + '</label>';
        }).join("") +
        '<div class="ek-mt-s">' + U.kv([
          [T("Vrijgegeven waarde", "Value released"), U.EURK(waardeVrij) + " " + T("van", "of") + " " + U.EURK(objecten.reduce(function (s, o) { return s + o.waarde; }, 0))],
          [T("Toegang", "Access"), T("alleen genodigde verstrekkers, per document gelogd", "invited lenders only, logged per document")],
          [T("Geldigheid", "Validity"), T("90 dagen, daarna automatisch dicht", "90 days, then closed automatically")],
          [T("Huurdergegevens", "Tenant personal data"), T("niet opgenomen", "not included")]
        ]) + '</div></div>') +
      '</div>' +
      U.note(T("Een object komt pas in het pakket als de eigenaar het zelf heeft vrijgegeven. Bij gedeeld eigendom moeten beide partijen tekenen; dat is de reden dat Achmeatoren en Basic-Fit hier apart staan van de rest van de portefeuille. Het pakket is software en dataroom: het ordent informatie en nodigt verstrekkers uit, en doet geen aanbod en geen bemiddeling.",
               "An asset only enters the pack once the owner has released it. With shared ownership both parties have to sign, which is why Achmeatoren and Basic-Fit sit apart from the rest of the portfolio here. The pack is software and a data room: it organises information and invites lenders, it does not make an offer and does not intermediate."));
  }

  U.mount("ek-financing-root", API);
})();
