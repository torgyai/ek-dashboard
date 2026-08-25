/* Koppelingen: wat het platform bewust niet zelf is. Per koppeling de status,
   het bereik van de rechten, de laatste synchronisatie en het logboek. */
(function () {
  var U = window.EKUI, T = U.T;
  var groep = "alle", open = "bank";

  var GROEPEN = [
    { id: "alle", nl: "Alle", en: "All" },
    { id: "geld", nl: "Geld & facturen", en: "Money & invoices" },
    { id: "verhuur", nl: "Verhuur", en: "Letting" },
    { id: "data", nl: "Registers & data", en: "Registries & data" },
    { id: "legacy", nl: "Oude pakketten", en: "Legacy packages" }
  ];

  function koppelingen() {
    return [
      { id: "bank", naam: T("Bankfeeds", "Bank feeds"), groep: "geld", partij: T("Rabobank, ING, ABN AMRO", "Rabobank, ING, ABN AMRO"),
        staat: "actief", sync: "2026-08-25 06:12", records: 1284, rechten: T("Alleen lezen: saldi en mutaties", "Read only: balances and transactions"),
        waarom: T("Dagelijkse mutaties voor de reconciliatie. Bouw dit nooit zelf; werk via een vergunninghoudende aanbieder.",
                  "Daily transactions for the reconciliation. Never build this yourself; work through a licensed provider.") },
      { id: "sepa", naam: T("SEPA betalingen en incasso", "SEPA payments and direct debit"), groep: "geld", partij: T("Bank of betaaldienstverlener", "Bank or payment service provider"),
        staat: "test", sync: "-", records: 0, rechten: T("Bestand aanleveren, mens tekent in de bankomgeving", "File delivery, a person signs in the bank environment"),
        waarom: T("Het platform maakt het bestand, de bank voert uit. Zo blijft de betaalbevoegdheid waar hij hoort.",
                  "The platform creates the file, the bank executes. That keeps payment authority where it belongs.") },
      { id: "peppol", naam: T("Peppol e-facturatie", "Peppol e-invoicing"), groep: "geld", partij: T("Toegangspunt", "Access point"),
        staat: "actief", sync: "2026-08-24 18:40", records: 96, rechten: T("Versturen en ontvangen UBL en SI-UBL", "Send and receive UBL and SI-UBL"),
        waarom: T("Zakelijke huurders vragen er steeds vaker om, en het scheelt handmatig inboeken aan beide kanten.",
                  "Commercial tenants increasingly ask for it, and it saves manual entry on both sides.") },
      { id: "sign", naam: T("Elektronische handtekening", "Electronic signature"), groep: "verhuur", partij: T("eIDAS-conforme aanbieder", "eIDAS compliant provider"),
        staat: "actief", sync: "2026-08-22 11:05", records: 41, rechten: T("Document aanbieden, ondertekenrapport terugkrijgen", "Submit a document, receive the signing report"),
        waarom: T("Huurcontracten, opnamestaten en deelnamestukken. Het bewijs telt, niet de handtekening zelf.",
                  "Leases, condition reports and participation documents. It is the evidence that counts, not the signature itself.") },
      { id: "funda", naam: "Funda", groep: "verhuur", partij: "Funda", staat: "actief", sync: "2026-08-25 07:30", records: 4,
        rechten: T("Publiceren, bijwerken, intrekken", "Publish, update, unpublish"),
        waarom: T("Grootste bereik voor woonruimte en bedrijfsruimte in het noorden.", "Widest reach for residential and commercial space in the north.") },
      { id: "pararius", naam: "Pararius", groep: "verhuur", partij: "Pararius", staat: "actief", sync: "2026-08-25 07:31", records: 3,
        rechten: T("Publiceren, bijwerken, intrekken", "Publish, update, unpublish"),
        waarom: T("Vult Funda aan bij vrije-sector huurwoningen.", "Complements Funda for liberalised rental homes.") },
      { id: "wonen31", naam: "Wonen31", groep: "verhuur", partij: "Wonen31", staat: "uit", sync: "-", records: 0,
        rechten: T("Niet geactiveerd", "Not activated"),
        waarom: T("Alleen nodig zodra er sociale huur in de portefeuille komt.", "Only needed once social housing enters the portfolio.") },
      { id: "kvk", naam: T("KvK-register", "Chamber of Commerce"), groep: "data", partij: "KVK", staat: "actief", sync: "2026-08-20 09:14", records: 212,
        rechten: T("Opzoeken op naam en nummer", "Look up by name and number"),
        waarom: T("Vult relaties automatisch en houdt rechtsvormen actueel; scheelt tikfouten in de tenaamstelling.",
                  "Fills relations automatically and keeps legal forms current; avoids typing errors in the registered name.") },
      { id: "bag", naam: T("BAG en WOZ", "Land registry and WOZ"), groep: "data", partij: T("Kadaster en gemeenten", "Land registry and municipalities"),
        staat: "actief", sync: "2026-08-18 22:00", records: 604, rechten: T("Adres, bouwjaar, oppervlakte, WOZ-waarde", "Address, construction year, floor area, WOZ value"),
        waarom: T("Objectgegevens die je niet zelf hoeft bij te houden, en meteen de controle op je eigen invoer.",
                  "Property data you do not have to maintain yourself, and at the same time a check on your own entries.") },
      { id: "mail", naam: T("E-mail en agenda", "Email and calendar"), groep: "data", partij: "Microsoft 365", staat: "actief", sync: "2026-08-25 08:02", records: 1840,
        rechten: T("Berichten koppelen aan dossiers, agenda lezen", "Link messages to files, read the calendar"),
        waarom: T("Correspondentie hoort bij het dossier en niet in iemands persoonlijke postvak.", "Correspondence belongs to the file, not in one person's inbox.") },
      { id: "bi", naam: T("Power BI en OData", "Power BI and OData"), groep: "data", partij: "Microsoft", staat: "actief", sync: "2026-08-25 05:00", records: 1,
        rechten: T("Alleen lezen op geaggregeerde weergaven", "Read only on aggregated views"),
        waarom: T("Voor wie zijn eigen rapportage wil bouwen zonder in de database te hoeven.", "For those who want to build their own reporting without touching the database.") },
      { id: "kyc", naam: T("KYC en sanctiecontrole", "KYC and sanctions screening"), groep: "data", partij: T("Gespecialiseerde aanbieder", "Specialist provider"),
        staat: "test", sync: "-", records: 0, rechten: T("Uitkomst en bewijs opslaan, geen kopie van het paspoort", "Store the outcome and the evidence, no copy of the passport"),
        waarom: T("Alleen nodig bij investeerders. Zelf sanctielijsten bijhouden is een garantie op fouten.",
                  "Only needed for investors. Maintaining sanctions lists yourself guarantees mistakes.") },
      { id: "exact", naam: "Exact Online", groep: "legacy", partij: "Exact", staat: "aflopend", sync: "2026-08-24 23:00", records: 4318,
        rechten: T("Eenrichting: alleen uitlezen tijdens de overgang", "One way: read only during the transition"),
        waarom: T("Draait mee tot de proefbalans in het nieuwe grootboek drie maanden op rij sluit. Daarna uit.",
                  "Runs alongside until the trial balance in the new ledger reconciles three months running. Then off.") },
      { id: "twinfield", naam: "Twinfield", groep: "legacy", partij: "Wolters Kluwer", staat: "aflopend", sync: "2026-08-24 23:20", records: 2140,
        rechten: T("Eenrichting: alleen uitlezen tijdens de overgang", "One way: read only during the transition"),
        waarom: T("Zelfde afspraak als Exact. Let op de limiet van duizend credits per minuut bij het uitlezen.",
                  "Same arrangement as Exact. Watch the limit of a thousand credits per minute when reading.") },
      { id: "omniboxx", naam: "Omniboxx", groep: "legacy", partij: "Omniboxx", staat: "aflopend", sync: "2026-08-20 20:00", records: 41280,
        rechten: T("Export en documentarchief", "Export and document archive"),
        waarom: T("Blijft leesbaar als archief zolang het contract loopt.", "Stays readable as an archive for as long as the contract runs.") }
    ];
  }

  var LOG = [
    { tijd: "2026-08-25 07:31", wat: T("Pararius: 3 advertenties bijgewerkt", "Pararius: 3 listings updated"), ok: true },
    { tijd: "2026-08-25 07:30", wat: T("Funda: 4 advertenties bijgewerkt, 1 foto afgekeurd op resolutie", "Funda: 4 listings updated, 1 photo rejected on resolution"), ok: false },
    { tijd: "2026-08-25 06:12", wat: T("Bankfeeds: 1.284 mutaties opgehaald over 42 rekeningen", "Bank feeds: 1,284 transactions retrieved across 42 accounts"), ok: true },
    { tijd: "2026-08-25 05:00", wat: T("OData: vernieuwing dataset voor Power BI", "OData: dataset refresh for Power BI"), ok: true },
    { tijd: "2026-08-24 23:20", wat: T("Twinfield: 2.140 regels gelezen, twee keer gewacht op Retry-After", "Twinfield: 2,140 lines read, waited twice on Retry-After"), ok: true },
    { tijd: "2026-08-24 18:40", wat: T("Peppol: 96 facturen verzonden, 0 afgekeurd", "Peppol: 96 invoices sent, 0 rejected"), ok: true }
  ];

  var API = {
    stamp: function () { return groep + "|" + open; },
    click: function (e) {
      var g = U.hit(e, "data-ek-int-groep"); if (g) { groep = g; return true; }
      var o = U.hit(e, "data-ek-int-open"); if (o) { open = o; return true; }
      return false;
    },
    html: function () {
      var K = koppelingen();
      var lijst = groep === "alle" ? K : K.filter(function (k) { return k.groep === groep; });
      var gek = K.filter(function (k) { return k.id === open; })[0] || K[0];
      var actief = K.filter(function (k) { return k.staat === "actief"; }).length;

      var rijen = lijst.map(function (k) {
        return {
          attr: 'data-ek-int-open="' + k.id + '"', on: gek.id === k.id,
          cells: ['<strong>' + U.esc(k.naam) + '</strong><br><span class="ek-sub">' + U.esc(k.partij) + '</span>',
            U.chip(T(GROEPEN.filter(function (g) { return g.id === k.groep; })[0].nl, GROEPEN.filter(function (g) { return g.id === k.groep; })[0].en)),
            k.staat === "actief" ? U.chip(T("Actief", "Active"), "ok") : k.staat === "test" ? U.chip(T("In test", "In testing"), "warn")
              : k.staat === "aflopend" ? U.chip(T("Loopt af", "Winding down"), "info") : U.chip(T("Uit", "Off"), ""),
            U.esc(k.sync), '<span class="ek-num">' + (k.records ? U.NUM(k.records) : "-") + '</span>', U.esc(k.rechten)]
        };
      });

      return U.head({
        eyebrow: T("Platform · koppelingen", "Platform · integrations"),
        title: T("Koppelingen", "Integrations"),
        intro: T("Het platform is geen bank, geen betaaldienst, geen ondertekenaar en geen identiteitscontroleur. Die functies komen van partijen die er een vergunning en een keten voor hebben; het platform houdt de regie, de logging en het gegevensmodel. Elke koppeling heeft daarom een eigen adapter, zodat een aanbieder vervangen kan worden zonder het product te herbouwen.",
                 "The platform is not a bank, a payment service, a signing provider or an identity checker. Those functions come from parties licensed to provide them; the platform keeps the orchestration, the logging and the data model. Every integration therefore has its own adapter, so a provider can be swapped without rebuilding the product."),
        chip: T(actief + " actief · 3 in afbouw", actief + " active · 3 winding down")
      }) +
      U.kpis([
        [T("Koppelingen", "Integrations"), String(K.length), T("in vijf groepen", "in five groups")],
        [T("Actief", "Active"), String(actief), T("dagelijks of vaker", "daily or more often")],
        [T("Oude pakketten", "Legacy packages"), "3", T("alleen lezen, tijdens de overgang", "read only, during the transition")],
        [T("Laatste storing", "Last failure"), U.DATE("2026-08-25"), T("Funda, foto afgekeurd op resolutie", "Funda, photo rejected on resolution")],
        [T("Records vandaag", "Records today"), U.NUM(2472), T("over alle koppelingen", "across all integrations")]
      ], 5) +
      '<div class="ek-mt">' + U.tabs(GROEPEN.map(function (g) {
        return { id: g.id, label: T(g.nl, g.en), count: g.id === "alle" ? K.length : K.filter(function (k) { return k.groep === g.id; }).length };
      }), groep, "data-ek-int-groep") + '</div>' +
      '<div class="ek-mt">' + U.panel(T("Koppelingen", "Integrations"),
        U.table([{ label: T("Koppeling", "Integration") }, { label: T("Groep", "Group") }, { label: T("Status", "Status") },
          { label: T("Laatste sync", "Last sync") }, { label: T("Records", "Records"), num: true }, { label: T("Bereik van de rechten", "Scope of access") }], rijen),
        U.btns([{ label: T("Verbinden", "Connect"), primary: true }, { label: T("Autoriseren", "Authorise") }, { label: T("Testen", "Test") },
          { label: T("Nu synchroniseren", "Sync now") }, { label: T("Uitschakelen", "Disable"), danger: true }])) + '</div>' +
      '<div class="ek-mt ek-g ek-split">' +
      U.panel(gek.naam, '<div class="ek-panel-body">' + U.kv([
        [T("Aanbieder", "Provider"), U.esc(gek.partij)],
        [T("Status", "Status"), gek.staat === "actief" ? T("Actief", "Active") : gek.staat === "test" ? T("In test", "In testing") : gek.staat === "aflopend" ? T("Loopt af", "Winding down") : T("Uit", "Off")],
        [T("Laatste synchronisatie", "Last sync"), U.esc(gek.sync)],
        [T("Bereik", "Scope"), U.esc(gek.rechten)],
        [T("Adapter", "Adapter"), T("eigen contract, aanbieder vervangbaar", "own contract, provider replaceable")],
        [T("Foutafhandeling", "Error handling"), T("opnieuw proberen met oplopende wachttijd, daarna melding", "retry with increasing back-off, then an alert")]
      ]) + '<div class="ek-mt-s">' + U.ai(T("Waarom deze koppeling er is", "Why this integration exists"), U.esc(gek.waarom)) + '</div></div>') +
      U.panel(T("Logboek", "Log"), '<div class="ek-panel-body">' +
        LOG.map(function (l) {
          return '<div class="ek-flow" style="justify-content:space-between;padding:8px 0;border-bottom:1px solid #ebece8">' +
            '<span class="ek-p" style="flex:1">' + U.esc(l.wat) + '<br><span class="ek-sub">' + l.tijd + '</span></span>' +
            (l.ok ? U.chip(T("Geslaagd", "Succeeded"), "ok") : U.chip(T("Aandacht", "Attention"), "warn")) + '</div>';
        }).join("") +
        '<div class="ek-mt-s">' + U.btns([{ label: T("Volledig logboek", "Full log") }, { label: T("Fouten filteren", "Filter failures") }]) + '</div></div>') +
      '</div>';
    }
  };

  U.mount("ek-integrations-root", API);
})();
