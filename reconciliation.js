/* Bankreconciliatie: transacties tegen openstaande posten, met voorstellen,
   leerregels, splitsen en handmatig boeken. Niets wordt werkelijk betaald. */
(function () {
  var U = window.EKUI, T = U.T;
  var rekening = "rabo-214", gekozen = "t1", besluit = {};

  var REKENINGEN = [
    { id: "rabo-214", bank: "Rabobank", iban: "NL64 RABO 0142 8871 03", naam: T("Hoofdrekening EYE Vastgoed", "Main account EYE Vastgoed"), saldo: 1842600, open: 6 },
    { id: "rabo-88", bank: "Rabobank", iban: "NL21 RABO 0388 1120 44", naam: T("Huurontvangsten woningen", "Residential rent receipts"), saldo: 412800, open: 2 },
    { id: "ing-42", bank: "ING", iban: "NL18 INGB 0004 2277 91", naam: T("ERKO Dokkum Beheer", "ERKO Dokkum Beheer"), saldo: 286400, open: 1 },
    { id: "abn-7", bank: "ABN AMRO", iban: "NL92 ABNA 0517 4416 08", naam: T("Waarborgsommen", "Tenant deposits"), saldo: 1284000, open: 0 }
  ];

  function mutaties() {
    return [
      { id: "t1", datum: "2026-08-21", omschrijving: "NATIONALE-NEDERLANDEN NV FACTUUR 2026-07-0118", tegen: "NL12 INGB 0000 0002 21",
        bedrag: 224455, kenmerk: "2026-07-0118", voorstel: T("Verkoopfactuur 2026-07-0118 · Nationale-Nederlanden", "Sales invoice 2026-07-0118 · Nationale-Nederlanden"), zeker: 99,
        soort: "match", uitleg: T("Factuurnummer staat letterlijk in de omschrijving en het bedrag komt exact overeen.", "The invoice number appears verbatim in the description and the amount matches exactly.") },
      { id: "t2", datum: "2026-08-21", omschrijving: "VERZAMELINCASSO HUUR 41 POSTEN", tegen: "-",
        bedrag: 52840, kenmerk: "SEPA-2026-08", voorstel: T("Incassobatch augustus · 41 huurfacturen", "Direct debit batch August · 41 rent invoices"), zeker: 97,
        soort: "batch", uitleg: T("Batchkenmerk gevonden; de 41 onderliggende facturen worden in één keer afgeletterd.", "Batch reference found; the 41 underlying invoices are matched in one go.") },
      { id: "t3", datum: "2026-08-20", omschrijving: "GRAND CAFE WALD DEELBETALING", tegen: "NL44 RABO 0177 2288 90",
        bedrag: 5000, kenmerk: "-", voorstel: T("Deelbetaling op factuur 2026-07-0121 (openstaand 10.648)", "Part payment on invoice 2026-07-0121 (outstanding 10,648)"), zeker: 78,
        soort: "deel", uitleg: T("Bedrag past niet op één factuur; voorstel is een deelbetaling met restant open te laten staan.", "The amount does not fit one invoice; the suggestion is a part payment leaving the remainder open.") },
      { id: "t4", datum: "2026-08-19", omschrijving: "SYNERGY INSTALLATIETECHNIEK 2026-3391", tegen: "NL09 RABO 0301 8844 12",
        bedrag: -2226, kenmerk: "2026-3391", voorstel: T("Inkoopfactuur 2026-3391 · Synergy Installatietechniek", "Purchase invoice 2026-3391 · Synergy Installatietechniek"), zeker: 99,
        soort: "match", uitleg: T("Betaling uit de betaalrun van 18 augustus.", "Payment from the run of 18 August.") },
      { id: "t5", datum: "2026-08-18", omschrijving: "VATTENFALL ZAKELIJK INCASSO PERIODE 07", tegen: "NL77 INGB 0002 7788 01",
        bedrag: -8482, kenmerk: "-", voorstel: T("Nieuwe regel voorstellen: energie servicekosten IQON", "Suggest a new rule: energy, IQON service charges"), zeker: 62,
        soort: "regel", uitleg: T("Deze tegenrekening kwam de laatste twaalf maanden elf keer voorbij en werd steeds op 4200 servicekosten geboekt met object IQON.", "This counterparty appeared eleven times in the last twelve months and was each time posted to 4200 service charges with property IQON.") },
      { id: "t6", datum: "2026-08-15", omschrijving: "TERUGSTORTING WAARBORGSOM SLUYS 7", tegen: "NL30 ABNA 0611 4422 87",
        bedrag: -2290, kenmerk: "-", voorstel: T("Waarborgsommen 1650 · vertrek huurder Sluys 7", "Tenant deposits 1650 · move-out Sluys 7"), zeker: 84,
        soort: "match", uitleg: T("Bedrag komt overeen met de vastgelegde waarborgsom en de mutatie van 14 september staat al klaar.", "The amount matches the recorded deposit and the 14 September move-out is already scheduled.") },
      { id: "t7", datum: "2026-08-14", omschrijving: "ONBEKEND 1.240,00 SPOEDOPDRACHT", tegen: "NL55 KNAB 0402 1177 33",
        bedrag: -1240, kenmerk: "-", voorstel: T("Geen voorstel", "No suggestion"), zeker: 0,
        soort: "geen", uitleg: T("Geen factuur, werkorder of contract gevonden die hierop past. Dit hoort naar de uitzonderingenlijst en niet naar een verzamelrekening.", "No invoice, work order or lease found that fits. This belongs in the exception list, not on a suspense account.") }
    ];
  }

  var API = {
    stamp: function () { return rekening + "|" + gekozen + "|" + JSON.stringify(besluit); },
    click: function (e) {
      var r = U.hit(e, "data-ek-rec-rek"); if (r) { rekening = r; return true; }
      var t = U.hit(e, "data-ek-rec-tx"); if (t) { gekozen = t; return true; }
      var b = U.hit(e, "data-ek-rec-do");
      if (b) { var d = b.split(":"); besluit[d[1]] = d[0]; return true; }
      return false;
    },
    html: function () {
      var M = mutaties();
      var R = REKENINGEN.filter(function (r) { return r.id === rekening; })[0];
      var gek = M.filter(function (m) { return m.id === gekozen; })[0] || M[0];
      var afgehandeld = Object.keys(besluit).length;
      var auto = M.filter(function (m) { return m.zeker >= 90; }).length;

      var rijen = M.map(function (m) {
        var b = besluit[m.id];
        return {
          attr: 'data-ek-rec-tx="' + m.id + '"', on: gek.id === m.id,
          cells: [U.DATE(m.datum),
            '<span style="font-size:11px">' + U.esc(m.omschrijving) + '</span><br><span class="ek-sub">' + U.esc(m.tegen) + '</span>',
            '<span class="ek-num" style="color:' + (m.bedrag < 0 ? "#b4232c" : "#167a51") + '">' + (m.bedrag < 0 ? "- " : "+ ") + U.EUR(Math.abs(m.bedrag)) + '</span>',
            U.esc(m.voorstel),
            m.zeker ? '<div class="ek-bar' + (m.zeker >= 90 ? " ek-bar-ok" : (m.zeker < 70 ? " ek-bar-red" : "")) + '"><span style="width:' + m.zeker + '%"></span></div><span class="ek-sub">' + m.zeker + '%</span>' : '<span class="ek-dim">-</span>',
            b ? U.chip(b === "match" ? T("Afgeletterd", "Matched") : b === "regel" ? T("Regel gemaakt", "Rule created") : b === "negeer" ? T("Genegeerd", "Ignored") : T("Handmatig geboekt", "Posted manually"), "ok")
              : U.chip(T("Te doen", "To do"), m.zeker >= 90 ? "info" : "warn")]
        };
      });

      return U.head({
        eyebrow: T("Administratie · bank", "Accounting · banking"),
        title: T("Bankreconciliatie", "Bank reconciliation"),
        intro: T("Elke banktransactie krijgt een voorstel op basis van factuurkenmerk, bedrag, tegenrekening en wat er eerder handmatig mee is gedaan. Wat het systeem zeker weet gaat automatisch; wat het niet weet komt in de uitzonderingenlijst en verdwijnt niet stilletjes op een tussenrekening.",
                 "Every bank transaction gets a suggestion based on the invoice reference, amount, counterparty and what was done with it manually before. What the system is sure of goes through automatically; what it is not sure of lands in the exception list rather than quietly on a suspense account."),
        chip: T(auto + " van " + M.length + " automatisch herkend", auto + " of " + M.length + " matched automatically")
      }) +
      U.kpis([
        [T("Saldo rekening", "Account balance"), U.EUR(R.saldo), R.iban],
        [T("Ongeletterde mutaties", "Unmatched transactions"), String(M.length - afgehandeld), T("van " + M.length + " deze week", "of " + M.length + " this week")],
        [T("Automatisch herkend", "Matched automatically"), Math.round(auto / M.length * 100) + "%", T("drempel 90% zekerheid", "threshold 90% confidence")],
        [T("Openstaande posten", "Open items"), U.EUR(61233), T("debiteuren en crediteuren samen", "receivables and payables combined")],
        [T("Laatste import", "Last import"), U.DATE("2026-08-21"), T("bankafschrift, dagelijks", "bank statement, daily")]
      ], 5) +
      '<div class="ek-mt ek-flow">' + REKENINGEN.map(function (r) {
        return '<button type="button" class="ek-tab' + (r.id === rekening ? " ek-on" : "") + '" data-ek-rec-rek="' + r.id + '">' +
          U.esc(r.bank) + " · " + U.esc(r.naam) + (r.open ? " · " + r.open : "") + '</button>';
      }).join("") + '</div>' +
      '<div class="ek-mt">' + U.panel(T("Mutaties", "Transactions"),
        U.table([{ label: T("Datum", "Date") }, { label: T("Omschrijving", "Description") }, { label: T("Bedrag", "Amount"), num: true },
          { label: T("Voorstel", "Suggestion") }, { label: T("Zekerheid", "Confidence") }, { label: T("Status", "Status") }], rijen),
        U.btns([{ label: T("Automatisch matchen", "Match automatically"), primary: true }, { label: T("Bestand inlezen", "Import file") },
          { label: T("Verversen", "Refresh") }, { label: T("Afletteren", "Reconcile") }])) + '</div>' +
      '<div class="ek-mt ek-g ek-split">' +
      U.panel(T("Geselecteerde mutatie", "Selected transaction"), '<div class="ek-panel-body">' +
        U.kv([
          [T("Datum", "Date"), U.DATE(gek.datum)],
          [T("Omschrijving", "Description"), U.esc(gek.omschrijving)],
          [T("Tegenrekening", "Counterparty"), U.esc(gek.tegen)],
          [T("Bedrag", "Amount"), (gek.bedrag < 0 ? "- " : "+ ") + U.EUR(Math.abs(gek.bedrag))],
          [T("Kenmerk", "Reference"), U.esc(gek.kenmerk)],
          [T("Voorstel", "Suggestion"), U.esc(gek.voorstel)],
          [T("Grootboek", "Ledger"), gek.bedrag > 0 ? "1300 " + T("Debiteuren", "Trade receivables") : (gek.soort === "regel" ? "4200 " + T("Servicekosten", "Service charge costs") : "1600 " + T("Crediteuren", "Trade payables"))]
        ]) +
        '<div class="ek-mt-s">' + U.btns([
          { label: T("Matchen", "Match"), primary: gek.zeker >= 70, attr: 'data-ek-rec-do="match:' + gek.id + '"' },
          { label: T("Splitsen", "Split"), attr: 'data-ek-rec-do="split:' + gek.id + '"' },
          { label: T("Regel maken", "Create rule"), attr: 'data-ek-rec-do="regel:' + gek.id + '"' },
          { label: T("Handmatig boeken", "Post manually"), attr: 'data-ek-rec-do="hand:' + gek.id + '"' },
          { label: T("Negeren", "Ignore"), attr: 'data-ek-rec-do="negeer:' + gek.id + '"' },
          { label: T("Match ongedaan maken", "Undo match"), danger: true, attr: 'data-ek-rec-do="open:' + gek.id + '"' }
        ]) + '</div></div>') +
      U.ai(T("Waarom dit voorstel", "Why this suggestion"), U.esc(gek.uitleg) +
        '<p class="ek-mt-s">' + T("Regels worden opgeslagen per tegenrekening en omschrijvingpatroon, met de grootboekrekening, het object en de btw-behandeling erbij. Een regel geldt pas na bevestiging door een mens en blijft zichtbaar in het auditspoor.",
          "Rules are stored per counterparty and description pattern, together with the ledger account, the property and the VAT treatment. A rule only takes effect after a person confirms it and stays visible in the audit trail.") + '</p>') +
      '</div>' +
      U.note(T("Deze werkruimte toont voorstellen en boekt in de demonstratieadministratie. Er wordt geen echte bankverbinding geopend en er verlaat geen betaling het systeem.",
               "This workspace shows suggestions and posts into the demonstration ledger. No real bank connection is opened and no payment leaves the system."));
    }
  };

  U.mount("ek-reconciliation-root", API);
})();
