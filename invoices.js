/* Facturatie en AR/AP: huurfacturen uit het contract, inkoopfacturen met
   fiatteringsflow, debiteurenbeheer en de betaalrun met SEPA en incasso. */
(function () {
  var U = window.EKUI, T = U.T;
  var tab = "verkoop", open = null, gefiatteerd = {}, run = 0;

  function verkoop() {
    return [
      { id: "v1", nr: "2026-07-0118", partij: "Nationale-Nederlanden", object: "Achmeatoren / IQON", datum: "2026-07-01", verval: "2026-07-15",
        net: 185500, btw: 38955, kanaal: "Peppol", staat: "betaald", bron: T("Uit contract HC-2021-0044", "From lease HC-2021-0044") },
      { id: "v2", nr: "2026-07-0119", partij: "Basic-Fit Nederland B.V.", object: "Basic-Fit Dokkum", datum: "2026-07-01", verval: "2026-07-15",
        net: 17833, btw: 3745, kanaal: "Peppol", staat: "betaald", bron: T("Uit contract HC-2019-0012", "From lease HC-2019-0012") },
      { id: "v3", nr: "2026-07-0120", partij: T("Advocatenkantoor Terpstra", "Terpstra Advocaten"), object: "Achmeatoren / IQON", datum: "2026-07-01", verval: "2026-07-15",
        net: 9240, btw: 1940, kanaal: T("E-mail", "Email"), staat: "openstaand", bron: T("Uit contract HC-2022-0031", "From lease HC-2022-0031") },
      { id: "v4", nr: "2026-07-0121", partij: T("Exploitatie Grand Café Wald", "Grand Café Wald operations"), object: "Grand Café Wald", datum: "2026-07-01", verval: "2026-07-15",
        net: 8800, btw: 1848, kanaal: T("E-mail", "Email"), staat: "te-laat", bron: T("Uit contract HC-2023-0028", "From lease HC-2023-0028") },
      { id: "v5", nr: "2026-07-0122", partij: T("Woonhuurders Dokkum (41)", "Residential tenants Dokkum (41)"), object: T("Diverse", "Various"), datum: "2026-07-01", verval: "2026-07-01",
        net: 48412, btw: 0, kanaal: T("Incasso", "Direct debit"), staat: "betaald", bron: T("Verzamelrun woonhuur", "Residential batch run") },
      { id: "v6", nr: "2026-07-0123", partij: "Kadaster", object: "Achmeatoren / IQON", datum: "2026-07-01", verval: "2026-07-15",
        net: 42600, btw: 8946, kanaal: "Peppol", staat: "openstaand", bron: T("Uit contract HC-2020-0009", "From lease HC-2020-0009") }
    ];
  }

  function inkoop() {
    return [
      { id: "i1", nr: "2026-3391", lev: "Synergy Installatietechniek", object: "Dockumer Sluys", datum: "2026-07-14",
        net: 1840, btw: 386, wo: "WO 2026-0412", stap: 3, coderen: T("Onderhoud · 4100", "Maintenance · 4100") },
      { id: "i2", nr: "DD-88214", lev: "Dijkstra Draisma", object: "Sense Dokkum", datum: "2026-07-22",
        net: 96400, btw: 20244, wo: T("Project SENSE-2026", "Project SENSE-2026"), stap: 2, coderen: T("Project · investering", "Project · capitalised") },
      { id: "i3", nr: "VF-2026-0771", lev: "Vattenfall Zakelijk", object: "Achmeatoren / IQON", datum: "2026-08-01",
        net: 7010, btw: 1472, wo: "-", stap: 1, coderen: T("Servicekosten · 4200", "Service charges · 4200") },
      { id: "i4", nr: "TR-20261144", lev: "Trigion", object: "Achmeatoren / IQON", datum: "2026-08-04",
        net: 3020, btw: 634, wo: "-", stap: 4, coderen: T("Servicekosten · 4200", "Service charges · 4200") },
      { id: "i5", nr: "PM-2026-118", lev: "Postma Bouw", object: "Oude Rabobank Ameland", datum: "2026-08-11",
        net: 28400, btw: 5964, wo: T("Project RABO-AME", "Project RABO-AME"), stap: 0, coderen: T("Nog te coderen", "To be coded") }
    ];
  }

  var FIAT = [
    { nl: "Ontvangen", en: "Received" }, { nl: "Gecodeerd", en: "Coded" }, { nl: "Technisch akkoord", en: "Technical approval" },
    { nl: "Financieel akkoord", en: "Financial approval" }, { nl: "Klaar voor betaling", en: "Ready to pay" }
  ];

  function debiteuren() {
    return [
      { partij: T("Exploitatie Grand Café Wald", "Grand Café Wald operations"), object: "Grand Café Wald", bedrag: 10648, dagen: 41,
        stap: T("Tweede herinnering", "Second reminder"), afspraak: T("Toezegging betaling 5 september", "Promised payment 5 September") },
      { partij: T("Advocatenkantoor Terpstra", "Terpstra Advocaten"), object: "Achmeatoren / IQON", bedrag: 11180, dagen: 26,
        stap: T("Eerste herinnering", "First reminder"), afspraak: T("Betwist deel servicekosten", "Disputes part of the service charges") },
      { partij: T("Huurder Groningen 4-A", "Tenant Groningen 4-A"), object: "Portefeuille Groningen", bedrag: 3225, dagen: 68,
        stap: T("Betalingsregeling", "Payment plan"), afspraak: T("Drie termijnen van 1.075", "Three instalments of 1,075") },
      { partij: T("Huurder Dokkum Hoogstraat", "Tenant Dokkum Hoogstraat"), object: T("Winkelpand Hoogstraat", "Hoogstraat retail unit"), bedrag: 7420, dagen: 94,
        stap: T("Incassobureau", "Collection agency"), afspraak: T("Overgedragen 12 juli", "Handed over 12 July") },
      { partij: T("Overige huurders (17)", "Other tenants (17)"), object: T("Diverse", "Various"), bedrag: 18940, dagen: 19,
        stap: T("Automatische herinnering", "Automatic reminder"), afspraak: T("Loopt via incasso", "Handled by direct debit") }
    ];
  }

  var API = {
    stamp: function () { return tab + "|" + open + "|" + JSON.stringify(gefiatteerd) + "|" + run; },
    click: function (e) {
      var t = U.hit(e, "data-ek-fac-tab"); if (t) { tab = t; open = null; return true; }
      var o = U.hit(e, "data-ek-fac-open"); if (o) { open = open === o ? null : o; return true; }
      var f = U.hit(e, "data-ek-fac-fiat"); if (f) { gefiatteerd[f] = (gefiatteerd[f] || 0) + 1; return true; }
      var r = U.hit(e, "data-ek-fac-run"); if (r) { run = Math.min(4, +r); return true; }
      return false;
    },
    html: function () {
      var V = verkoop(), I = inkoop(), D = debiteuren();
      var uit = V.reduce(function (s, v) { return s + v.net + v.btw; }, 0);
      var openstaand = V.filter(function (v) { return v.staat !== "betaald"; }).reduce(function (s, v) { return s + v.net + v.btw; }, 0);
      var teBetalen = I.reduce(function (s, i) { return s + i.net + i.btw; }, 0);
      var achterstand = D.reduce(function (s, d) { return s + d.bedrag; }, 0);

      var body;
      if (tab === "verkoop") body = verkoopTab(V);
      else if (tab === "inkoop") body = inkoopTab(I);
      else if (tab === "debiteuren") body = debiteurenTab(D, achterstand);
      else body = betaalrunTab(I, teBetalen);

      return U.head({
        eyebrow: T("Administratie · facturatie", "Accounting · invoicing"),
        title: T("Facturatie & AR/AP", "Invoicing & AR/AP"),
        intro: T("Huurfacturen komen uit het contract, inkoopfacturen uit de werkorder of het project. Beide landen in hetzelfde grootboek, met dezelfde objectcodering, zodat debiteurenbeheer, servicekostenafrekening en objectresultaat op één administratie draaien.",
                 "Rent invoices come from the lease, purchase invoices from the work order or project. Both land in the same ledger with the same property coding, so debtor management, service charge settlement and property results all run on one administration."),
        chip: T("Incassograad 88,7%", "Collection rate 88.7%")
      }) +
      U.kpis([
        [T("Gefactureerd juli", "Invoiced in July"), U.EUR(uit), T("6 facturen en 1 verzamelrun", "6 invoices and 1 batch run")],
        [T("Openstaand debiteuren", "Receivables outstanding"), U.EUR(openstaand + achterstand - 10648), T("waarvan 41 dagen of ouder: " + U.EUR(21293), "of which 41 days or older: " + U.EUR(21293))],
        [T("Te betalen crediteuren", "Payables outstanding"), U.EUR(teBetalen), T("5 facturen in fiattering", "5 invoices in approval")],
        [T("Incassograad", "Collection rate"), "88,7%", T("norm 95%", "target 95%"), 88.7],
        [T("Gemiddelde betaaltermijn", "Average days to pay"), "23 " + T("dagen", "days"), T("afgesproken: 14 dagen", "agreed: 14 days")]
      ], 5) +
      '<div class="ek-mt">' + U.tabs([
        { id: "verkoop", label: T("Verkoopfacturen", "Sales invoices"), count: V.length },
        { id: "inkoop", label: T("Inkoop & fiattering", "Purchase & approval"), count: I.length },
        { id: "debiteuren", label: T("Debiteurenbeheer", "Debtor management"), count: D.length },
        { id: "betaalrun", label: T("Betaalrun & incasso", "Payment run & direct debit") }
      ], tab, "data-ek-fac-tab") + '</div>' + body;
    }
  };

  function verkoopTab(V) {
    var rijen = V.map(function (v) {
      return [U.esc(v.nr) + '<br><span class="ek-sub">' + U.esc(v.bron) + '</span>',
        U.esc(v.partij) + '<br><span class="ek-sub">' + U.esc(v.object) + '</span>',
        U.DATE(v.datum), U.DATE(v.verval),
        '<span class="ek-num">' + U.EUR(v.net) + '</span>',
        '<span class="ek-num">' + (v.btw ? U.EUR(v.btw) : T("vrijgesteld", "exempt")) + '</span>',
        '<span class="ek-num">' + U.EUR(v.net + v.btw) + '</span>',
        U.chip(v.kanaal, v.kanaal === "Peppol" ? "info" : ""),
        v.staat === "betaald" ? U.chip(T("Betaald", "Paid"), "ok") : v.staat === "openstaand" ? U.chip(T("Openstaand", "Outstanding"), "") : U.chip(T("Te laat", "Overdue"), "bad")];
    });
    return '<div class="ek-mt">' + U.panel(T("Verkoopfacturen juli 2026", "Sales invoices July 2026"),
      U.table([{ label: T("Nummer", "Number") }, { label: T("Partij / object", "Party / property") }, { label: T("Datum", "Date") },
        { label: T("Vervalt", "Due") }, { label: T("Netto", "Net"), num: true }, { label: T("Btw", "VAT"), num: true },
        { label: T("Totaal", "Total"), num: true }, { label: T("Kanaal", "Channel") }, { label: T("Status", "Status") }], rijen),
      U.btns([{ label: T("Uit contract genereren", "Generate from lease"), primary: true }, { label: T("Terugkerende reeks", "Recurring series") },
        { label: T("Voorbeeld", "Preview") }, { label: T("Boeken", "Post") }, { label: T("Versturen", "Send") },
        { label: T("Via Peppol", "Via Peppol") }, { label: T("Crediteren", "Credit") }, { label: T("PDF downloaden", "Download PDF") }])) +
      U.ai(T("Wat de facturatierun deze maand deed", "What the invoice run did this month"),
        T("118 contracten leverden 6 losse facturen en één verzamelrun voor 41 woonhuurders op. Twee contracten met een gebroken periode zijn naar rato berekend, en één huurder met een nieuwe incassomachtiging is bewust nog per e-mail gefactureerd zodat de eerste incasso niet stort.",
          "118 leases produced 6 individual invoices and one batch run for 41 residential tenants. Two leases with a partial period were prorated, and one tenant with a new direct debit mandate was deliberately invoiced by email so the first collection does not fail.")) + '</div>';
  }

  function inkoopTab(I) {
    var rijen = I.map(function (i) {
      var s = Math.min(4, (i.stap + (gefiatteerd[i.id] || 0)));
      return {
        attr: 'data-ek-fac-open="' + i.id + '"', on: open === i.id,
        cells: [U.esc(i.nr), U.esc(i.lev) + '<br><span class="ek-sub">' + U.esc(i.object) + '</span>', U.DATE(i.datum),
          U.esc(i.wo), U.esc(i.coderen),
          '<span class="ek-num">' + U.EUR(i.net) + '</span>',
          '<span class="ek-num">' + U.EUR(i.net + i.btw) + '</span>',
          U.chip(T(FIAT[s].nl, FIAT[s].en), s === 4 ? "ok" : (s === 0 ? "warn" : "info"))]
      };
    });
    var gek = I.filter(function (i) { return i.id === open; })[0];
    var detail = "";
    if (gek) {
      var s = Math.min(4, gek.stap + (gefiatteerd[gek.id] || 0));
      detail = '<div class="ek-mt">' + U.panel(gek.nr + " · " + gek.lev,
        '<div class="ek-panel-body">' + U.flow(FIAT.map(function (f) { return T(f.nl, f.en); }), s) +
        '<div class="ek-mt-s ek-g ek-split">' +
        U.kv([[T("Leverancier", "Supplier"), U.esc(gek.lev)], [T("Object", "Property"), U.esc(gek.object)],
          [T("Werkorder of project", "Work order or project"), U.esc(gek.wo)], [T("Codering", "Coding"), U.esc(gek.coderen)],
          [T("Netto", "Net"), U.EUR(gek.net)], [T("Btw", "VAT"), U.EUR(gek.btw)], [T("Totaal", "Total"), U.EUR(gek.net + gek.btw)],
          [T("Herkenning", "Recognition"), T("automatisch uit de PDF, drie velden gecontroleerd", "automatic from the PDF, three fields checked")]]) +
        U.ai(T("Controle", "Check"), gek.wo !== "-"
          ? T("Deze factuur hoort bij " + gek.wo + ". Bedrag en object komen overeen met de goedgekeurde offerte; er is geen meerwerk gemeld dat hier nog bovenop komt.",
              "This invoice belongs to " + gek.wo + ". Amount and property match the approved quote; no additional work has been reported on top of this.")
          : T("Geen werkorder gekoppeld. Bij servicekostenposten is dat normaal, maar controleer of de periode klopt met de afrekening waar deze kosten in vallen.",
              "No work order linked. For service charge items that is normal, but check that the period matches the settlement these costs fall into.")) +
        '</div><div class="ek-mt-s">' + U.btns([
          { label: T("Coderen", "Code") }, { label: T("Splitsen", "Split") },
          { label: T("Volgende fiattering", "Next approval"), primary: true, attr: 'data-ek-fac-fiat="' + gek.id + '"' },
          { label: T("Afkeuren", "Reject"), danger: true }, { label: T("Wijziging vragen", "Request change") },
          { label: T("Betaling plannen", "Schedule payment") }
        ]) + '</div></div>') + '</div>';
    }
    return '<div class="ek-mt">' + U.panel(T("Inkoopfacturen in fiattering", "Purchase invoices in approval"),
      U.table([{ label: T("Nummer", "Number") }, { label: T("Leverancier / object", "Supplier / property") }, { label: T("Datum", "Date") },
        { label: T("Werkorder", "Work order") }, { label: T("Codering", "Coding") }, { label: T("Netto", "Net"), num: true },
        { label: T("Totaal", "Total"), num: true }, { label: T("Fase", "Stage") }], rijen),
      U.btns([{ label: T("Uploaden", "Upload"), primary: true }, { label: T("Scannen", "Scan") }, { label: T("Peppol ophalen", "Fetch from Peppol") }])) + '</div>' + detail;
  }

  function debiteurenTab(D, achterstand) {
    var rijen = D.map(function (d) {
      var tone = d.dagen > 60 ? "bad" : d.dagen > 30 ? "warn" : "";
      return [U.esc(d.partij) + '<br><span class="ek-sub">' + U.esc(d.object) + '</span>',
        '<span class="ek-num">' + U.EUR(d.bedrag) + '</span>',
        '<span class="ek-num">' + d.dagen + '</span>',
        U.chip(d.stap, tone), U.esc(d.afspraak),
        U.btns([{ label: T("Bellen", "Call") }, { label: T("Herinnering", "Reminder") }, { label: T("Escaleren", "Escalate") }])];
    });
    var ouderdom = [[T("0 tot 30 dagen", "0 to 30 days"), 18940], [T("31 tot 60 dagen", "31 to 60 days"), 21828],
      [T("61 tot 90 dagen", "61 to 90 days"), 3225], [T("Ouder dan 90 dagen", "Over 90 days"), 7420]];
    return '<div class="ek-mt ek-g ek-split">' +
      U.panel(T("Openstaande posten", "Open items"),
        U.table([{ label: T("Debiteur", "Debtor") }, { label: T("Bedrag", "Amount"), num: true }, { label: T("Dagen", "Days"), num: true },
          { label: T("Fase", "Stage") }, { label: T("Afspraak", "Arrangement") }, { label: T("Actie", "Action") }], rijen),
        U.btns([{ label: T("Herinnering sturen", "Send reminder"), primary: true }, { label: T("Aanmaning", "Formal notice") },
          { label: T("Betalingsregeling", "Payment plan") }, { label: T("Naar incassobureau", "To collection agency") }, { label: T("Afboeken", "Write off"), danger: true }])) +
      U.panel(T("Ouderdomsanalyse", "Ageing"), '<div class="ek-panel-body">' +
        ouderdom.map(function (o) {
          return '<div style="padding:8px 0;border-bottom:1px solid #ebece8">' +
            '<div class="ek-flow" style="justify-content:space-between"><span class="ek-p">' + o[0] + '</span>' +
            '<strong style="font-size:12px">' + U.EUR(o[1]) + '</strong></div>' +
            '<div class="ek-bar ek-mt-s' + (o[1] > 7000 && o[0].indexOf("90") !== -1 ? " ek-bar-red" : "") + '"><span style="width:' + Math.round(o[1] / achterstand * 100) + '%"></span></div></div>';
        }).join("") +
        '<p class="ek-mt-s ek-note">' + T("De incassograad van 88,7% komt hier vandaan: van elke euro contractuele huur is 11,3 cent nog niet binnen. Het grootste deel daarvan zit in vier dossiers, niet in de brede portefeuille.",
          "The 88.7% collection rate comes from here: of every euro of contracted rent, 11.3 cents is still outstanding. Most of that sits in four cases, not across the portfolio.") + '</p></div>') + '</div>';
  }

  function betaalrunTab(I, teBetalen) {
    var stappen = [T("Selectie", "Selection"), T("Goedgekeurd", "Approved"), T("Batch gemaakt", "Batch created"),
      T("Ondertekend", "Signed"), T("Ingediend bij de bank", "Submitted to the bank")];
    var rijen = I.filter(function (i) { return Math.min(4, i.stap + (gefiatteerd[i.id] || 0)) >= 3; }).map(function (i) {
      return [U.esc(i.lev), U.esc(i.nr), U.DATE(i.datum), '<span class="ek-num">' + U.EUR(i.net + i.btw) + '</span>',
        "NL·· " + T("bekend", "on file"), U.chip(T("Klaar", "Ready"), "ok")];
    });
    return '<div class="ek-mt ek-g ek-split">' +
      U.panel(T("Betaalrun 25 augustus", "Payment run 25 August"),
        '<div class="ek-panel-body">' + U.flow(stappen, run) +
        '<div class="ek-mt-s">' + U.table([{ label: T("Begunstigde", "Beneficiary") }, { label: T("Factuur", "Invoice") },
          { label: T("Datum", "Date") }, { label: T("Bedrag", "Amount"), num: true }, { label: "IBAN" }, { label: T("Status", "Status") }], rijen) + '</div>' +
        '<div class="ek-mt-s">' + U.btns([
          { label: T("Selecteren", "Select"), attr: 'data-ek-fac-run="1"' },
          { label: T("Goedkeuren", "Approve"), attr: 'data-ek-fac-run="2"' },
          { label: T("SEPA-batch maken", "Create SEPA batch"), primary: true, attr: 'data-ek-fac-run="3"' },
          { label: T("Indienen", "Submit"), attr: 'data-ek-fac-run="4"' },
          { label: T("Annuleren", "Cancel"), danger: true, attr: 'data-ek-fac-run="0"' }
        ]) + '</div>' +
        '<p class="ek-mt-s ek-note">' + T("In deze demonstratieomgeving wordt niets werkelijk betaald. De laatste stap levert een SEPA-bestand op dat een mens in de bankomgeving zelf indient en ondertekent.",
          "Nothing is actually paid in this demonstration environment. The last step produces a SEPA file that a person submits and signs in the bank's own environment.") + '</p></div>') +
      U.panel(T("Incassomachtigingen", "Direct debit mandates"), '<div class="ek-panel-body">' +
        U.kv([
          [T("Actieve machtigingen", "Active mandates"), "94"],
          [T("Incasso 1 september", "Collection 1 September"), U.EUR(52840) + " · 41 " + T("posten", "items")],
          [T("Vorige run gestorneerd", "Reversed in the last run"), "3 · " + U.EUR(3210)],
          [T("Nieuwe machtigingen deze maand", "New mandates this month"), "2"],
          [T("Aankondigingstermijn", "Pre-notification"), T("14 dagen vooraf per e-mail", "14 days in advance by email")]
        ]) +
        '<div class="ek-mt-s">' + U.btns([{ label: T("Machtiging aanmaken", "Create mandate") }, { label: T("Batch klaarzetten", "Prepare batch"), primary: true },
          { label: T("Storneringen bekijken", "View reversals") }]) + '</div></div>') + '</div>';
  }

  U.mount("ek-invoices-root", API);
})();
