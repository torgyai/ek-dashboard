/* Grootboek: rekeningschema, dagboeken, journaalposten met vastgoeddimensies,
   proefbalans per entiteit, btw en ICP, en periodeafsluiting. */
(function () {
  var U = window.EKUI, T = U.T;
  var tab = "proefbalans", entiteit = "eye", post = "j1";

  var ENTITEITEN = [
    { id: "eye", naam: "EYE Vastgoed B.V.", kvk: "01128866", boekjaar: "2026", btw: "NL8121.44.716.B01" },
    { id: "erko", naam: "ERKO Dokkum Beheer B.V.", kvk: "01099412", boekjaar: "2026", btw: "NL8203.19.442.B01" },
    { id: "beheer", naam: "Kooistra Beheer B.V.", kvk: "01044190", boekjaar: "2026", btw: "NL8044.62.108.B01" }
  ];

  function balans(ent) {
    var f = ent === "eye" ? 1 : (ent === "erko" ? 0.18 : 0.07);
    function r(n) { return Math.round(n * f / 100) * 100; }
    return [
      { nr: "0100", naam: T("Vastgoedbeleggingen", "Investment property"), soort: "balans", debet: r(96400000), credit: 0 },
      { nr: "0200", naam: T("Inventaris en installaties", "Fixtures and installations"), soort: "balans", debet: r(1240000), credit: 0 },
      { nr: "0500", naam: T("Cumulatieve afschrijving", "Accumulated depreciation"), soort: "balans", debet: 0, credit: r(380000) },
      { nr: "0700", naam: T("Geplaatst kapitaal", "Issued capital"), soort: "balans", debet: 0, credit: r(28000000) },
      { nr: "0710", naam: T("Reserves en onverdeeld resultaat", "Reserves and undistributed result"), soort: "balans", debet: 0, credit: r(5085200) },
      { nr: "0800", naam: T("Langlopende schulden banken", "Long-term bank loans"), soort: "balans", debet: 0, credit: r(62400000) },
      { nr: "0810", naam: T("Kortlopend deel leningen", "Current portion of loans"), soort: "balans", debet: 0, credit: r(2960000) },
      { nr: "1100", naam: T("Liquide middelen", "Cash at bank"), soort: "balans", debet: r(4186000), credit: 0 },
      { nr: "1300", naam: T("Debiteuren", "Trade receivables"), soort: "balans", debet: r(742400), credit: 0 },
      { nr: "1400", naam: T("Vooruitbetaalde kosten", "Prepaid expenses"), soort: "balans", debet: r(128600), credit: 0 },
      { nr: "1500", naam: T("Btw te vorderen", "VAT receivable"), soort: "balans", debet: r(96200), credit: 0 },
      { nr: "1600", naam: T("Crediteuren", "Trade payables"), soort: "balans", debet: 0, credit: r(486900) },
      { nr: "1620", naam: T("Te betalen kosten", "Accrued expenses"), soort: "balans", debet: 0, credit: r(214300) },
      { nr: "1650", naam: T("Waarborgsommen huurders", "Tenant deposits"), soort: "balans", debet: 0, credit: r(1284000) },
      { nr: "1700", naam: T("Btw af te dragen", "VAT payable"), soort: "balans", debet: 0, credit: r(342800) },
      { nr: "1800", naam: T("Vooruitontvangen huur", "Rent received in advance"), soort: "balans", debet: 0, credit: r(1640000) }
    ];
  }

  function resultaat(ent) {
    var f = ent === "eye" ? 1 : (ent === "erko" ? 0.18 : 0.07);
    function r(n) { return Math.round(n * f / 100) * 100; }
    return [
      { nr: "8000", naam: T("Huuropbrengsten", "Rental income"), bedrag: r(6842000) },
      { nr: "8100", naam: T("Opbrengst servicekosten", "Service charge income"), bedrag: r(1184000) },
      { nr: "8900", naam: T("Overige opbrengsten", "Other income"), bedrag: r(96400) },
      { nr: "4000", naam: T("Exploitatiekosten", "Operating costs"), bedrag: -r(1284600) },
      { nr: "4100", naam: T("Onderhoud", "Maintenance"), bedrag: -r(742900) },
      { nr: "4200", naam: T("Servicekosten", "Service charge costs"), bedrag: -r(1196400) },
      { nr: "4300", naam: T("Beheerkosten", "Management costs"), bedrag: -r(318400) },
      { nr: "4400", naam: T("Verzekering en belastingen", "Insurance and property taxes"), bedrag: -r(486200) },
      { nr: "4800", naam: T("Afschrijvingen", "Depreciation"), bedrag: -r(164000) },
      { nr: "4900", naam: T("Rentelasten", "Interest expense"), bedrag: -r(1842000) }
    ];
  }

  function posten() {
    return [
      { id: "j1", nr: "VK 2026-07-118", dagboek: T("Verkoop", "Sales"), datum: "2026-07-01", omschrijving: T("Huurfacturatie juli, 118 contracten", "July rent run, 118 leases"),
        bron: T("Automatisch uit contracten", "Automatic from contracts"), status: "geboekt",
        regels: [
          { rek: "1300", naam: T("Debiteuren", "Trade receivables"), debet: 684520, credit: 0, dim: T("diverse huurders", "various tenants") },
          { rek: "8000", naam: T("Huuropbrengsten", "Rental income"), debet: 0, credit: 512430, dim: T("per object en unit", "per property and unit") },
          { rek: "8100", naam: T("Opbrengst servicekosten", "Service charge income"), debet: 0, credit: 84620, dim: T("per complex", "per complex") },
          { rek: "1700", naam: T("Btw af te dragen", "VAT payable"), debet: 0, credit: 87470, dim: "21%" }
        ] },
      { id: "j2", nr: "IK 2026-07-042", dagboek: T("Inkoop", "Purchase"), datum: "2026-07-14", omschrijving: T("Synergy Installatietechniek, storing cv Dockumer Sluys", "Synergy Installatietechniek, heating callout Dockumer Sluys"),
        bron: T("Werkorder 2026-0412", "Work order 2026-0412"), status: "geboekt",
        regels: [
          { rek: "4100", naam: T("Onderhoud", "Maintenance"), debet: 1840, credit: 0, dim: "Dockumer Sluys · WO 2026-0412" },
          { rek: "1500", naam: T("Btw te vorderen", "VAT receivable"), debet: 386, credit: 0, dim: "21%" },
          { rek: "1600", naam: T("Crediteuren", "Trade payables"), debet: 0, credit: 2226, dim: "Synergy Installatietechniek" }
        ] },
      { id: "j3", nr: "BK 2026-07-311", dagboek: T("Bank", "Bank"), datum: "2026-07-22", omschrijving: T("Ontvangst huur augustus, 41 incasso's", "Rent received August, 41 direct debits"),
        bron: T("Bankafschrift Rabobank 214", "Bank statement Rabobank 214"), status: "geboekt",
        regels: [
          { rek: "1100", naam: T("Liquide middelen", "Cash at bank"), debet: 52840, credit: 0, dim: "NL64 RABO 0142 8871 03" },
          { rek: "1300", naam: T("Debiteuren", "Trade receivables"), debet: 0, credit: 52840, dim: T("afgeletterd op 41 facturen", "matched to 41 invoices") }
        ] },
      { id: "j4", nr: "MEM 2026-07-009", dagboek: T("Memoriaal", "General journal"), datum: "2026-07-31", omschrijving: T("Afschrijving installaties juli", "Depreciation of installations, July"),
        bron: T("Vaste activa-administratie", "Fixed asset register"), status: "geboekt",
        regels: [
          { rek: "4800", naam: T("Afschrijvingen", "Depreciation"), debet: 13667, credit: 0, dim: T("14 activa", "14 assets") },
          { rek: "0500", naam: T("Cumulatieve afschrijving", "Accumulated depreciation"), debet: 0, credit: 13667, dim: T("lineair, 15 jaar", "straight line, 15 years") }
        ] },
      { id: "j5", nr: "MEM 2026-08-002", dagboek: T("Memoriaal", "General journal"), datum: "2026-08-19", omschrijving: T("Herrubricering servicekosten IQON naar afrekening 2025", "Reclassification of IQON service charges to the 2025 settlement"),
        bron: T("Handmatig, Amarens", "Manual, Amarens"), status: "concept",
        regels: [
          { rek: "4200", naam: T("Servicekosten", "Service charge costs"), debet: 0, credit: 18400, dim: "Achmeatoren / IQON" },
          { rek: "1400", naam: T("Vooruitbetaalde kosten", "Prepaid expenses"), debet: 18400, credit: 0, dim: T("afrekening 2025", "2025 settlement") }
        ] }
    ];
  }

  var PERIODES = [
    { m: "2026-01", staat: "vast" }, { m: "2026-02", staat: "vast" }, { m: "2026-03", staat: "vast" },
    { m: "2026-04", staat: "vast" }, { m: "2026-05", staat: "vast" }, { m: "2026-06", staat: "vast" },
    { m: "2026-07", staat: "gecontroleerd" }, { m: "2026-08", staat: "open" }
  ];

  var API = {
    stamp: function () { return tab + "|" + entiteit + "|" + post; },
    click: function (e) {
      var t = U.hit(e, "data-ek-gb-tab"); if (t) { tab = t; return true; }
      var n = U.hit(e, "data-ek-gb-ent"); if (n) { entiteit = n; return true; }
      var p = U.hit(e, "data-ek-gb-post"); if (p) { post = p; return true; }
      return false;
    },
    html: function () {
      var ent = ENTITEITEN.filter(function (e) { return e.id === entiteit; })[0];
      var B = balans(entiteit);
      var debet = B.reduce(function (s, r) { return s + r.debet; }, 0);
      var credit = B.reduce(function (s, r) { return s + r.credit; }, 0);
      var R = resultaat(entiteit);
      var res = R.reduce(function (s, r) { return s + r.bedrag; }, 0);

      var body;
      if (tab === "proefbalans") body = proefbalansTab(B, debet, credit, R, res);
      else if (tab === "posten") body = postenTab();
      else if (tab === "btw") body = btwTab(entiteit);
      else if (tab === "schema") body = schemaTab(B, R);
      else body = afsluitingTab();

      return U.head({
        eyebrow: T("Administratie · grootboek", "Accounting · general ledger"),
        title: T("Grootboek", "General ledger"),
        intro: T("De eigen boekhoudkern. Elke journaalregel draagt naast de grootboekrekening ook de entiteit, het object, de unit, het contract, de partij en het project mee. Daardoor is de vraag wat een object werkelijk opbrengt geen exportklus meer, maar een filter.",
                 "The native accounting engine. Every journal line carries the legal entity, property, unit, lease, party and project alongside the ledger account. That turns the question of what a property actually earns from an export job into a filter."),
        chip: ent.naam + " · " + T("boekjaar ", "financial year ") + ent.boekjaar
      }) +
      U.kpis([
        [T("Balanstotaal", "Balance sheet total"), U.EURK(debet), ent.naam],
        [T("Resultaat tot en met juli", "Result to end of July"), U.EURK(res), T("na rente en afschrijving", "after interest and depreciation")],
        [T("Debet gelijk aan credit", "Debits equal credits"), debet === credit ? T("Ja", "Yes") : T("Nee", "No"), U.EURK(debet) + " / " + U.EURK(credit)],
        [T("Open periode", "Open period"), U.MONTH("2026-08-01"), T("juli is gecontroleerd", "July has been reviewed")],
        [T("Journaalposten dit jaar", "Journal entries this year"), "4.318", T("waarvan 3.902 automatisch", "3,902 of them automatic")]
      ], 5) +
      '<div class="ek-mt ek-flow">' + ENTITEITEN.map(function (e) {
        return '<button type="button" class="ek-tab' + (e.id === entiteit ? " ek-on" : "") + '" data-ek-gb-ent="' + e.id + '">' + U.esc(e.naam) + '</button>';
      }).join("") + '</div>' +
      '<div class="ek-mt">' + U.tabs([
        { id: "proefbalans", label: T("Proefbalans", "Trial balance") },
        { id: "posten", label: T("Journaalposten", "Journal entries") },
        { id: "schema", label: T("Rekeningschema", "Chart of accounts") },
        { id: "btw", label: T("Btw & ICP", "VAT & ICP") },
        { id: "afsluiting", label: T("Periodeafsluiting", "Period close") }
      ], tab, "data-ek-gb-tab") + '</div>' + body;
    }
  };

  function proefbalansTab(B, debet, credit, R, res) {
    var rijen = B.map(function (r) {
      return [r.nr, U.esc(r.naam), '<span class="ek-num">' + (r.debet ? U.EUR(r.debet) : "") + '</span>',
        '<span class="ek-num">' + (r.credit ? U.EUR(r.credit) : "") + '</span>'];
    });
    rijen.push({ total: true, cells: ["", T("Totaal", "Total"), '<span class="ek-num">' + U.EUR(debet) + '</span>', '<span class="ek-num">' + U.EUR(credit) + '</span>'] });
    var rrijen = R.map(function (r) {
      return [r.nr, U.esc(r.naam), '<span class="ek-num">' + (r.bedrag >= 0 ? U.EUR(r.bedrag) : "- " + U.EUR(-r.bedrag)) + '</span>'];
    });
    rrijen.push({ total: true, cells: ["", T("Resultaat", "Result"), '<span class="ek-num">' + U.EUR(res) + '</span>'] });
    return '<div class="ek-mt ek-g ek-split-wide">' +
      U.panel(T("Proefbalans per 31 juli 2026", "Trial balance at 31 July 2026"),
        U.table([{ label: T("Rek.", "Acct") }, { label: T("Omschrijving", "Description") },
          { label: T("Debet", "Debit"), num: true }, { label: T("Credit", "Credit"), num: true }], rijen),
        U.btns([{ label: T("Exporteren", "Export") }, { label: T("Naar Excel", "To Excel") }])) +
      U.panel(T("Winst- en verliesrekening", "Profit and loss"),
        U.table([{ label: T("Rek.", "Acct") }, { label: T("Omschrijving", "Description") }, { label: T("Bedrag", "Amount"), num: true }], rrijen)) +
      '</div>' +
      U.note(T("De proefbalans sluit op de cent en wordt bij elke boeking opnieuw getoetst. Dat is precies de controle waaraan een migratie uit Exact of Twinfield moet voldoen voordat het oude pakket uit mag: niet het aantal records telt, maar de balans per periode.",
               "The trial balance ties to the cent and is retested on every posting. That is exactly the control a migration out of Exact or Twinfield has to pass before the old package can be switched off: it is not the record count that matters, but the balance per period."));
  }

  function postenTab() {
    var P = posten();
    var gek = P.filter(function (p) { return p.id === post; })[0] || P[0];
    var rijen = P.map(function (p) {
      var som = p.regels.reduce(function (s, r) { return s + r.debet; }, 0);
      return {
        attr: 'data-ek-gb-post="' + p.id + '"', on: gek.id === p.id,
        cells: [U.esc(p.nr), U.chip(p.dagboek), U.DATE(p.datum), U.esc(p.omschrijving),
          '<span class="ek-num">' + U.EUR(som) + '</span>',
          p.status === "geboekt" ? U.chip(T("Geboekt", "Posted"), "ok") : U.chip(T("Concept", "Draft"), "warn")]
      };
    });
    var lijnen = gek.regels.map(function (r) {
      return [r.rek, U.esc(r.naam), U.esc(r.dim),
        '<span class="ek-num">' + (r.debet ? U.EUR(r.debet) : "") + '</span>',
        '<span class="ek-num">' + (r.credit ? U.EUR(r.credit) : "") + '</span>'];
    });
    var d = gek.regels.reduce(function (s, r) { return s + r.debet; }, 0);
    var c = gek.regels.reduce(function (s, r) { return s + r.credit; }, 0);
    lijnen.push({ total: true, cells: ["", T("Totaal", "Total"), "", '<span class="ek-num">' + U.EUR(d) + '</span>', '<span class="ek-num">' + U.EUR(c) + '</span>'] });
    return '<div class="ek-mt">' + U.panel(T("Journaalposten", "Journal entries"),
      U.table([{ label: T("Nummer", "Number") }, { label: T("Dagboek", "Journal") }, { label: T("Datum", "Date") },
        { label: T("Omschrijving", "Description") }, { label: T("Bedrag", "Amount"), num: true }, { label: T("Status", "Status") }], rijen),
      U.btns([{ label: T("Nieuwe journaalpost", "New journal entry"), primary: true }, { label: T("Importeren", "Import") }, { label: T("Exporteren", "Export") }])) +
      '<div class="ek-mt">' + U.panel(gek.nr + " · " + gek.omschrijving,
        '<div class="ek-panel-body">' +
        U.kv([[T("Bron", "Source"), U.esc(gek.bron)], [T("Boekingsdatum", "Posting date"), U.DATE(gek.datum)],
          [T("Periode", "Period"), U.MONTH(gek.datum)], [T("Status", "Status"), gek.status === "geboekt" ? T("Geboekt en onwijzigbaar", "Posted and immutable") : T("Concept", "Draft")]]) +
        '<div class="ek-mt-s">' + U.table([{ label: T("Rek.", "Acct") }, { label: T("Omschrijving", "Description") },
          { label: T("Dimensies", "Dimensions") }, { label: T("Debet", "Debit"), num: true }, { label: T("Credit", "Credit"), num: true }], lijnen) + '</div>' +
        '<div class="ek-mt-s">' + U.btns([
          { label: T("Regel toevoegen", "Add line") }, { label: T("Document koppelen", "Attach document") },
          { label: T("Boeken", "Post"), primary: gek.status !== "geboekt", off: gek.status === "geboekt" },
          { label: T("Storneren", "Reverse"), danger: true }, { label: T("Kopiëren", "Copy") }
        ]) + '</div></div>') + '</div>' +
      U.note(T("Een geboekte post wordt nooit overschreven. Corrigeren gebeurt met een tegenboeking die zelf ook zichtbaar blijft, zodat de historie van een cijfer altijd te volgen is.",
               "A posted entry is never overwritten. Corrections are made with a reversing entry that itself stays visible, so the history of any figure can always be followed.")) + '</div>';
  }

  function schemaTab(B, R) {
    var rijen = B.map(function (r) {
      return [r.nr, U.esc(r.naam), T("Balans", "Balance sheet"), r.nr < "0700" || r.nr.indexOf("11") === 0 || r.nr.indexOf("13") === 0 ? T("Debet", "Debit") : T("Credit", "Credit"),
        r.nr === "1500" || r.nr === "1700" ? "21% / 9% / 0%" : T("geen", "none"),
        T("object, unit", "property, unit")];
    }).concat(R.map(function (r) {
      return [r.nr, U.esc(r.naam), T("Resultaat", "Profit and loss"), r.bedrag >= 0 ? T("Credit", "Credit") : T("Debet", "Debit"),
        r.nr >= "8000" ? "21% / vrijgesteld" : "21% / 9%",
        T("object, unit, contract, project", "property, unit, lease, project")];
    }));
    return '<div class="ek-mt">' + U.panel(T("Rekeningschema", "Chart of accounts"),
      U.table([{ label: T("Nummer", "Number") }, { label: T("Omschrijving", "Description") }, { label: T("Soort", "Type") },
        { label: T("Normaal saldo", "Normal balance") }, { label: T("Btw-code", "VAT code") }, { label: T("Verplichte dimensies", "Required dimensions") }], rijen),
      U.btns([{ label: T("Rekening toevoegen", "New account"), primary: true }, { label: T("Bewerken", "Edit") },
        { label: T("Deactiveren", "Deactivate") }, { label: T("Importeren", "Import") }, { label: T("Exporteren", "Export") }])) + '</div>';
  }

  function btwTab(ent) {
    var f = ent === "eye" ? 1 : (ent === "erko" ? 0.18 : 0.07);
    function r(n) { return Math.round(n * f / 100) * 100; }
    var rijen = [
      ["1a", T("Leveringen belast 21%", "Supplies taxed at 21%"), r(1842000), r(386820)],
      ["1e", T("Leveringen vrijgesteld (woonhuur)", "Exempt supplies (residential rent)"), r(684000), 0],
      ["3b", T("Diensten naar EU-landen", "Services to EU countries"), r(0), 0],
      ["5b", T("Voorbelasting", "Input VAT"), r(0), -r(96200)]
    ].map(function (x) {
      return [x[0], U.esc(x[1]), '<span class="ek-num">' + (x[2] ? U.EUR(x[2]) : "-") + '</span>',
        '<span class="ek-num">' + (x[3] ? (x[3] < 0 ? "- " + U.EUR(-x[3]) : U.EUR(x[3])) : "-") + '</span>'];
    });
    rijen.push({ total: true, cells: ["", T("Af te dragen over juli", "Payable for July"), "", '<span class="ek-num">' + U.EUR(r(290620)) + '</span>'] });
    return '<div class="ek-mt ek-g ek-split">' +
      U.panel(T("Btw-aangifte juli 2026", "VAT return July 2026"),
        U.table([{ label: T("Rubriek", "Box") }, { label: T("Omschrijving", "Description") },
          { label: T("Grondslag", "Base"), num: true }, { label: T("Btw", "VAT"), num: true }], rijen),
        U.btns([{ label: T("Aangifte voorbereiden", "Prepare return"), primary: true }, { label: T("Aansluiting tonen", "Show reconciliation") }, { label: T("Exporteren", "Export") }])) +
      U.panel(T("Aandachtspunten", "Points of attention"), '<div class="ek-panel-body">' +
        U.kv([
          [T("Gemengd gebruik", "Mixed use"), T("14 objecten met zowel belaste als vrijgestelde verhuur", "14 properties with both taxed and exempt letting")],
          [T("Pro rata", "Pro rata"), T("voorbelasting verdeeld op omzetverhouding 73/27", "input VAT split on a 73/27 turnover ratio")],
          [T("Herzieningstermijn", "Adjustment period"), T("3 objecten binnen de negenjaarstermijn", "3 properties inside the nine-year period")],
          [T("ICP", "ICP"), T("geen intracommunautaire prestaties dit tijdvak", "no intra-EU supplies this period")],
          [T("Aangiftedatum", "Filing date"), U.DATE("2026-08-31")]
        ]) + '</div>') + '</div>';
  }

  function afsluitingTab() {
    var rijen = PERIODES.map(function (p) {
      return [U.MONTH(p.m + "-01"),
        p.staat === "vast" ? U.chip(T("Vergrendeld", "Locked"), "ok") : p.staat === "gecontroleerd" ? U.chip(T("Gecontroleerd", "Reviewed"), "info") : U.chip(T("Open", "Open"), "warn"),
        p.staat === "open" ? T("beheer", "management") : "Amarens",
        p.staat === "vast" ? U.DATE("2026-0" + (+p.m.slice(5) + 1) + "-12") : "-",
        U.btns([{ label: p.staat === "vast" ? T("Openen", "Unlock") : T("Vergrendelen", "Lock"), primary: p.staat !== "vast" }])];
    });
    return '<div class="ek-mt ek-g ek-split">' +
      U.panel(T("Perioden", "Periods"),
        U.table([{ label: T("Periode", "Period") }, { label: T("Status", "Status") }, { label: T("Door", "By") },
          { label: T("Afgesloten op", "Closed on") }, { label: T("Actie", "Action") }], rijen)) +
      U.panel(T("Checklist maandafsluiting", "Month-end checklist"), '<div class="ek-panel-body">' +
        ["Alle bankmutaties afgeletterd|All bank transactions matched", "Huurfacturatie geboekt|Rent run posted",
         "Inkoopfacturen gefiatteerd|Purchase invoices approved", "Afschrijving geboekt|Depreciation posted",
         "Btw aangesloten op grootboek|VAT reconciled to the ledger", "Servicekosten toegerekend|Service charges allocated",
         "Rente en aflossing verwerkt|Interest and amortisation processed", "Intercompany saldi gelijk|Intercompany balances agree",
         "Waarborgsommen aangesloten|Deposits reconciled"].map(function (x) {
          var d = x.split("|");
          return '<label class="ek-check"><input type="checkbox" checked disabled> ' + T(d[0], d[1]) + '</label>';
        }).join("") +
        '<div class="ek-mt-s">' + U.btns([{ label: T("Periode vergrendelen", "Lock period"), primary: true }, { label: T("Jaar afsluiten", "Close year") }]) + '</div></div>') +
      '</div>';
  }

  U.mount("ek-ledger-root", API);
})();
