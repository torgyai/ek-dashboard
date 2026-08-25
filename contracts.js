/* Contracten: woon- en bedrijfshuur, leveranciers, beheer, financiering en
   verzekering in één register, met huurcomponenten, indexatieregel,
   breakopties, opzegtermijnen en ondertekenstatus. Tweetalig. */
(function () {
  var U = window.EKUI, T = U.T;
  var soort = "alle", open = "iqon-nn", tab = "overzicht";

  var SOORTEN = [
    { id: "alle", nl: "Alle", en: "All" },
    { id: "woon", nl: "Woonhuur", en: "Residential" },
    { id: "bedrijf", nl: "Bedrijfshuur", en: "Commercial" },
    { id: "parkeren", nl: "Parkeren & opslag", en: "Parking & storage" },
    { id: "leverancier", nl: "Leverancier", en: "Supplier" },
    { id: "beheer", nl: "Beheer", en: "Management" },
    { id: "financiering", nl: "Financiering", en: "Finance" },
    { id: "verzekering", nl: "Verzekering", en: "Insurance" }
  ];

  function contracten() {
    return [
      { id: "iqon-nn", nr: "HC-2021-0044", soort: "bedrijf", tegenpartij: "Nationale-Nederlanden", object: "Achmeatoren / IQON",
        entiteit: "EYE Vastgoed B.V.", start: "2021-04-01", eind: "2031-03-31", opzeg: 12, breaks: ["2027-03-31"],
        huur: 742000, service: 138000, btw: T("Belast", "VAT taxed"), index: "CPI alle huishoudens", indexdag: "2027-01-01", cap: null,
        borg: 185500, freq: T("Per kwartaal vooraf", "Quarterly in advance"), tekenstatus: "getekend",
        lijnen: [["Basishuur", "Base rent", 742000], ["Servicekosten voorschot", "Service charge advance", 138000], ["Parkeerplaatsen (24)", "Parking spaces (24)", 43200]] },
      { id: "bf-dokkum", nr: "HC-2019-0012", soort: "bedrijf", tegenpartij: "Basic-Fit Nederland B.V.", object: "Basic-Fit Dokkum",
        entiteit: "ERKO Dokkum Beheer B.V.", start: "2019-09-01", eind: "2029-08-31", opzeg: 12, breaks: ["2026-08-31"],
        huur: 214000, service: 18400, btw: T("Belast", "VAT taxed"), index: "CPI alle huishoudens", indexdag: "2026-09-01", cap: null,
        borg: 53500, freq: T("Per maand vooraf", "Monthly in advance"), tekenstatus: "getekend",
        lijnen: [["Basishuur", "Base rent", 214000], ["Servicekosten voorschot", "Service charge advance", 18400]] },
      { id: "ds-12", nr: "HW-2026-0311", soort: "woon", tegenpartij: "Familie Van der Meer", object: "Dockumer Sluys 12",
        entiteit: "EYE Vastgoed B.V.", start: "2026-09-01", eind: null, opzeg: 1, breaks: [],
        huur: 13740, service: 744, btw: T("Vrijgesteld", "VAT exempt"), index: "CPI alle huishoudens", indexdag: "2027-07-01", cap: 5,
        borg: 2290, freq: T("Per maand vooraf", "Monthly in advance"), tekenstatus: "wacht",
        lijnen: [["Kale huur", "Net rent", 13740], ["Servicekosten voorschot", "Service charge advance", 744]] },
      { id: "wald", nr: "HC-2023-0028", soort: "bedrijf", tegenpartij: T("Exploitatie Grand Café Wald", "Grand Café Wald operations"), object: "Grand Café Wald",
        entiteit: "EYE Vastgoed B.V.", start: "2023-01-01", eind: "2027-12-31", opzeg: 6, breaks: ["2026-12-31"],
        huur: 96000, service: 9600, btw: T("Belast", "VAT taxed"), index: T("CPI, plafond 5%", "CPI, capped at 5%"), indexdag: "2027-01-01", cap: 5,
        borg: 24000, freq: T("Per maand vooraf", "Monthly in advance"), tekenstatus: "getekend",
        lijnen: [["Basishuur", "Base rent", 96000], ["Terras", "Terrace", 4800], ["Servicekosten voorschot", "Service charge advance", 9600]] },
      { id: "synergy", nr: "LV-2024-0007", soort: "leverancier", tegenpartij: "Synergy Installatietechniek", object: T("23 objecten", "23 properties"),
        entiteit: "EYE Vastgoed B.V.", start: "2024-01-01", eind: "2027-12-31", opzeg: 3, breaks: [],
        huur: 0, service: 0, btw: T("Belast", "VAT taxed"), index: "CPI + 0%", indexdag: "2027-01-01", cap: null,
        borg: 0, freq: T("Per kwartaal achteraf", "Quarterly in arrears"), tekenstatus: "getekend",
        lijnen: [["Onderhoudsabonnement cv", "Heating maintenance subscription", 46800], ["Storingsdienst 24/7", "24/7 callout service", 18000]] },
      { id: "rabo-1", nr: "FIN-2022-0003", soort: "financiering", tegenpartij: "Rabobank", object: T("Zekerhedenpakket A", "Security package A"),
        entiteit: "EYE Vastgoed B.V.", start: "2022-06-01", eind: "2032-06-01", opzeg: 0, breaks: [],
        huur: 0, service: 0, btw: T("Niet van toepassing", "Not applicable"), index: T("Euribor 3M + 1,85%", "3M Euribor + 1.85%"), indexdag: "2026-09-01", cap: null,
        borg: 0, freq: T("Per kwartaal", "Quarterly"), tekenstatus: "getekend",
        lijnen: [["Hoofdsom", "Principal", 14800000], ["Aflossing per jaar", "Annual amortisation", 592000]] },
      { id: "verzekering", nr: "VZ-2025-0002", soort: "verzekering", tegenpartij: "Univé Zakelijk", object: T("Portefeuillebreed", "Portfolio-wide"),
        entiteit: T("Alle entiteiten", "All entities"), start: "2025-01-01", eind: "2026-12-31", opzeg: 3, breaks: [],
        huur: 0, service: 0, btw: T("Vrijgesteld", "VAT exempt"), index: T("Herbouwwaarde-index", "Rebuild cost index"), indexdag: "2027-01-01", cap: null,
        borg: 0, freq: T("Per jaar vooraf", "Annually in advance"), tekenstatus: "verloopt",
        lijnen: [["Opstal", "Buildings", 148000], ["Aansprakelijkheid", "Liability", 12400], ["Huurderving", "Loss of rent", 21600]] },
      { id: "parkeren-lw", nr: "PK-2024-0019", soort: "parkeren", tegenpartij: T("Diverse huurders", "Various tenants"), object: T("Parkeerdek Leeuwarden", "Leeuwarden parking deck"),
        entiteit: "EYE Vastgoed B.V.", start: "2024-04-01", eind: null, opzeg: 1, breaks: [],
        huur: 38400, service: 0, btw: T("Belast", "VAT taxed"), index: "CPI alle huishoudens", indexdag: "2027-01-01", cap: null,
        borg: 0, freq: T("Per maand vooraf", "Monthly in advance"), tekenstatus: "getekend",
        lijnen: [["32 plaatsen", "32 spaces", 38400]] }
    ];
  }

  function tekenChip(s) {
    if (s === "getekend") return U.chip(T("Getekend", "Signed"), "ok");
    if (s === "wacht") return U.chip(T("Wacht op handtekening", "Awaiting signature"), "warn");
    return U.chip(T("Verloopt binnenkort", "Expiring soon"), "bad");
  }

  var API = {
    stamp: function () { return soort + "|" + open + "|" + tab; },
    click: function (e) {
      var s = U.hit(e, "data-ek-con-soort"); if (s) { soort = s; return true; }
      var o = U.hit(e, "data-ek-con-open"); if (o) { open = o; tab = "overzicht"; return true; }
      var t = U.hit(e, "data-ek-con-tab"); if (t) { tab = t; return true; }
      return false;
    },
    html: function () {
      var C = contracten();
      var lijst = soort === "alle" ? C : C.filter(function (c) { return c.soort === soort; });
      var gek = C.filter(function (c) { return c.id === open; })[0] || C[0];
      var huurTot = C.reduce(function (s, c) { return s + c.huur; }, 0);
      var breaks = C.filter(function (c) { return c.breaks.length; }).length;

      var rijen = lijst.map(function (c) {
        return {
          attr: 'data-ek-con-open="' + c.id + '"', on: gek.id === c.id,
          cells: [
            '<strong>' + U.esc(c.nr) + '</strong><br><span class="ek-sub">' + U.esc(c.tegenpartij) + '</span>',
            U.esc(c.object) + '<br><span class="ek-sub">' + U.esc(c.entiteit) + '</span>',
            U.DATE(c.start) + " → " + (c.eind ? U.DATE(c.eind) : T("onbepaald", "open-ended")),
            c.huur ? '<span class="ek-num">' + U.EUR(c.huur) + '</span>' : '<span class="ek-num ek-dim">-</span>',
            U.esc(c.index) + '<br><span class="ek-sub">' + T("per ", "from ") + U.DATE(c.indexdag) + (c.cap ? " · " + T("plafond ", "cap ") + c.cap + "%" : "") + '</span>',
            c.breaks.length ? U.chip(U.DATE(c.breaks[0]), "warn") : '<span class="ek-dim">-</span>',
            tekenChip(c.tekenstatus)
          ]
        };
      });

      return U.head({
        eyebrow: T("Verhuur & relaties", "Leasing & relations"),
        title: T("Contracten", "Contracts"),
        intro: T("Alle overeenkomsten in één register: huur, leveranciers, beheer, financiering en verzekering. Het contract is de bron van de facturatie, de indexatie, de opzegtermijn en de rapportage; er is geen tweede administratie waarin dezelfde afspraken nog eens staan.",
                 "Every agreement in one register: leases, suppliers, management, finance and insurance. The contract is the source of the billing, the indexation, the notice period and the reporting; there is no second system holding the same terms again."),
        chip: T("WAULT 5,8 jaar", "WAULT 5.8 years")
      }) +
      U.kpis([
        [T("Actieve contracten", "Active contracts"), String(C.length), T("over alle soorten", "across all types")],
        [T("Contractuele huur", "Contracted rent"), U.EUR(huurTot), T("per jaar, exclusief servicekosten", "per year, excluding service charges")],
        [T("Breakopties", "Break options"), String(breaks), T("binnen 24 maanden", "within 24 months")],
        [T("Wacht op handtekening", "Awaiting signature"), "1", T("digitaal, eIDAS-conform", "digital, eIDAS compliant")],
        [T("Eerstvolgende indexatie", "Next indexation"), U.DATE("2026-09-01"), T("Basic-Fit Dokkum", "Basic-Fit Dokkum")]
      ], 5) +
      '<div class="ek-mt">' + U.tabs(SOORTEN.map(function (s) {
        return { id: s.id, label: T(s.nl, s.en), count: s.id === "alle" ? C.length : C.filter(function (c) { return c.soort === s.id; }).length };
      }), soort, "data-ek-con-soort") + '</div>' +
      '<div class="ek-mt">' + U.panel(T("Contractregister", "Contract register"), U.table([
        { label: T("Contract", "Contract") }, { label: T("Object / entiteit", "Property / entity") }, { label: T("Looptijd", "Term") },
        { label: T("Huur per jaar", "Rent per year"), num: true }, { label: T("Indexatie", "Indexation") },
        { label: T("Break", "Break") }, { label: T("Status", "Status") }
      ], rijen), U.btns([{ label: T("Nieuw contract", "New contract"), primary: true }, { label: T("Importeren", "Import") }, { label: T("Exporteren", "Export") }])) + '</div>' +
      '<div class="ek-mt">' + detail(gek) + '</div>' +
      U.note(T("Een wijziging in het contract is altijd een aanvulling met eigen ingangsdatum, nooit een overschrijving van de oude tekst. Daardoor blijft zichtbaar welke huur op welke dag gold, wat bij een indexatiegeschil of een boekenonderzoek het verschil maakt.",
               "A change to a contract is always an amendment with its own effective date, never an overwrite of the old text. That keeps visible which rent applied on which day, which is what matters in an indexation dispute or an audit."));
    }
  };

  function detail(c) {
    var tabs = [
      { id: "overzicht", label: T("Overzicht", "Overview") },
      { id: "lijnen", label: T("Financiële regels", "Financial lines") },
      { id: "indexatie", label: T("Indexatie", "Indexation") },
      { id: "breaks", label: T("Breaks & opzegging", "Breaks & notices") },
      { id: "handtekening", label: T("Handtekeningen", "Signatures") },
      { id: "historie", label: T("Historie", "History") }
    ];
    var body;
    if (tab === "lijnen") {
      var tot = c.lijnen.reduce(function (s, l) { return s + l[2]; }, 0);
      var rijen = c.lijnen.map(function (l) {
        return [T(l[0], l[1]), U.esc(c.freq), U.esc(c.btw), '<span class="ek-num">' + U.EUR(l[2]) + '</span>',
          '<span class="ek-num">' + U.EUR(Math.round(l[2] / 12)) + '</span>'];
      });
      rijen.push({ total: true, cells: [T("Totaal", "Total"), "", "", '<span class="ek-num">' + U.EUR(tot) + '</span>', '<span class="ek-num">' + U.EUR(Math.round(tot / 12)) + '</span>'] });
      body = U.table([{ label: T("Component", "Component") }, { label: T("Frequentie", "Frequency") }, { label: T("Btw", "VAT") },
        { label: T("Per jaar", "Per year"), num: true }, { label: T("Per maand", "Per month"), num: true }], rijen) +
        '<div class="ek-mt-s">' + U.btns([{ label: T("Regel toevoegen", "Add line") }, { label: T("Factuurschema maken", "Create invoice schedule"), primary: true }]) + '</div>';
    } else if (tab === "indexatie") {
      var pct = c.cap ? Math.min(3.4, c.cap) : 3.4;
      body = U.kv([
        [T("Grondslag", "Basis"), U.esc(c.index)],
        [T("Eerstvolgende datum", "Next date"), U.DATE(c.indexdag)],
        [T("Plafond", "Cap"), c.cap ? c.cap + "%" : T("geen", "none")],
        [T("Bodem", "Floor"), T("0% · huur daalt nooit", "0% · rent never decreases")],
        [T("Berekend percentage", "Calculated percentage"), U.PCT(pct)],
        [T("Huur na indexatie", "Rent after indexation"), c.huur ? U.EUR(Math.round(c.huur * (1 + pct / 100))) : "-"],
        [T("Effect per jaar", "Annual effect"), c.huur ? "+ " + U.EUR(Math.round(c.huur * pct / 100)) : "-"]
      ]) + '<div class="ek-mt-s">' + U.btns([{ label: T("Berekenen", "Calculate") }, { label: T("Brief opstellen", "Generate letter") },
        { label: T("Toepassen en boeken", "Apply and post"), primary: true }]) + '</div>';
    } else if (tab === "breaks") {
      body = U.kv([
        [T("Opzegtermijn", "Notice period"), c.opzeg ? c.opzeg + " " + T("maanden", "months") : T("niet van toepassing", "not applicable")],
        [T("Breakopties", "Break options"), c.breaks.length ? c.breaks.map(U.DATE).join(", ") : T("geen", "none")],
        [T("Uiterste opzegdatum", "Latest notice date"), c.breaks.length ? U.DATE("2026-03-31") : (c.eind ? U.DATE(c.eind) : T("doorlopend", "rolling"))],
        [T("Verlengingsregel", "Renewal rule"), T("Stilzwijgend met 5 jaar, tenzij tijdig opgezegd", "Automatically extends by 5 years unless notice is given in time")],
        [T("Herinnering", "Reminder"), T("90 dagen voor de opzegdatum, naar beheer en directie", "90 days before the notice date, to management and the board")]
      ]) + '<div class="ek-mt-s">' + U.btns([{ label: T("Verlengen", "Renew"), primary: true }, { label: T("Opzeggen", "Terminate"), danger: true },
        { label: T("Aanvulling toevoegen", "Add amendment") }]) + '</div>';
    } else if (tab === "handtekening") {
      body = U.flow([T("Concept", "Draft"), T("Ter goedkeuring", "For approval"), T("Ter ondertekening", "For signature"),
        T("Getekend huurder", "Signed by tenant"), T("Medeondertekend", "Countersigned")], c.tekenstatus === "getekend" ? 4 : 2) +
        '<div class="ek-mt-s">' + U.kv([
          [T("Aanbieder", "Provider"), T("eIDAS-conforme dienst", "eIDAS compliant service")],
          [T("Bewijs", "Evidence"), T("Ondertekenrapport met tijdstempel en IP", "Signing report with timestamp and IP")],
          [T("Documenthash", "Document hash"), "SHA-256 · 4f1c…9ab2"],
          [T("Bewaartermijn", "Retention"), T("10 jaar na einde contract", "10 years after the contract ends")]
        ]) + '</div><div class="ek-mt-s">' + U.btns([{ label: T("Ter ondertekening sturen", "Send for signature"), primary: true },
          { label: T("Herinnering sturen", "Send reminder") }, { label: T("Document downloaden", "Download document") }]) + '</div>';
    } else if (tab === "historie") {
      body = U.table([{ label: T("Datum", "Date") }, { label: T("Gebeurtenis", "Event") }, { label: T("Door", "By") }], [
        [U.DATE("2026-07-01"), T("Indexatie 3,4% toegepast en geboekt", "Indexation of 3.4% applied and posted"), "systeem / Amarens"],
        [U.DATE("2025-11-14"), T("Aanvulling: extra parkeerplaatsen toegevoegd", "Amendment: extra parking spaces added"), "E. Kooistra"],
        [U.DATE("2024-01-08"), T("Servicekostenvoorschot verhoogd na afrekening", "Service charge advance raised after settlement"), T("beheer", "management")],
        [U.DATE("2021-04-01"), T("Contract gestart", "Contract commenced"), "E. Kooistra"]
      ]);
    } else {
      body = '<div class="ek-g ek-split">' + U.kv([
        [T("Contractnummer", "Contract number"), U.esc(c.nr)],
        [T("Soort", "Type"), T(SOORTEN.filter(function (s) { return s.id === c.soort; })[0].nl, SOORTEN.filter(function (s) { return s.id === c.soort; })[0].en)],
        [T("Tegenpartij", "Counterparty"), U.esc(c.tegenpartij)],
        [T("Object", "Property"), U.esc(c.object)],
        [T("Entiteit", "Legal entity"), U.esc(c.entiteit)],
        [T("Ingangsdatum", "Start date"), U.DATE(c.start)],
        [T("Einddatum", "End date"), c.eind ? U.DATE(c.eind) : T("onbepaalde tijd", "open-ended")],
        [T("Betaalfrequentie", "Payment frequency"), U.esc(c.freq)],
        [T("Btw-behandeling", "VAT treatment"), U.esc(c.btw)],
        [T("Waarborgsom", "Deposit"), c.borg ? U.EUR(c.borg) : "-"]
      ]) + U.ai(T("Signalen bij dit contract", "Signals on this contract"),
        c.breaks.length
          ? T("De breakoptie per " + U.DATE(c.breaks[0]) + " vraagt uiterlijk twaalf maanden vooraf een reactie. Bij deze huurprijs en de huidige markthuur is verlengen aantrekkelijker dan hertekenen; leg de gesprekken vast in het dossier zodat de opzegtermijn niet ongemerkt verstrijkt.",
              "The break option at " + U.DATE(c.breaks[0]) + " needs an answer at least twelve months in advance. At this rent and current market rent, extending is more attractive than re-letting; record the conversations in the file so the notice period does not pass unnoticed.")
          : T("Geen breakoptie. Let bij dit contract vooral op de indexatiedatum en op de vraag of het servicekostenvoorschot nog aansluit bij de werkelijke kosten van vorig jaar.",
              "No break option. On this contract, watch the indexation date and whether the service charge advance still matches last year's actual costs.")) + '</div>' +
      '<div class="ek-mt-s">' + U.btns([{ label: T("Bewerken", "Edit") }, { label: T("Aanvulling", "Amendment") },
        { label: T("Ter ondertekening", "Send for signature"), primary: true }, { label: T("Verlengen", "Renew") },
        { label: T("Opzeggen", "Terminate"), danger: true }, { label: T("Archiveren", "Archive") }]) + '</div>';
    }
    return U.panel(c.nr + " · " + c.tegenpartij, '<div class="ek-panel-body">' + U.tabs(tabs, tab, "data-ek-con-tab") + '<div class="ek-mt-s">' + body + '</div></div>');
  }

  U.mount("ek-contracts-root", API);
})();
