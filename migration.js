/* Migratiestudio: bron kiezen, mappen, valideren, proefrun, uitzonderingen,
   reconciliëren en cutover. Migratie als product, niet als eenmalig script. */
(function () {
  var U = window.EKUI, T = U.T;
  var bron = "omniboxx", tab = "overzicht", stap = 5;

  var BRONNEN = [
    { id: "omniboxx", naam: "Omniboxx", soort: T("Vastgoedbeheer", "Property management"),
      route: T("Exportsjablonen in Excel plus documentarchief", "Excel export templates plus a document archive"),
      let: T("Geen publiek API-schema gevonden; afspraken over de export lopen via de leverancier.", "No public API schema found; export arrangements run through the vendor."),
      records: 41280, doorlooptijd: T("2 tot 6 weken", "2 to 6 weeks") },
    { id: "bloxs", naam: "Bloxs", soort: T("Vastgoed-ERP", "Real estate ERP"),
      route: T("Open API en OData voor structuur, XAF-auditbestand voor een volledig boekjaar", "Open API and OData for structure, XAF audit file for a full financial year"),
      let: T("API moet eerst worden geactiveerd door de leverancier; importfunctie staat standaard uit.", "The API has to be enabled by the vendor first; the import function is off by default."),
      records: 38640, doorlooptijd: T("2 tot 5 weken", "2 to 5 weeks") },
    { id: "exact", naam: "Exact Online", soort: T("Boekhouding", "Accounting"),
      route: T("REST-API met OAuth voor actuele data, XML en CSV voor historie, auditbestand voor het jaarwerk", "REST API with OAuth for current data, XML and CSV for history, audit file for the year-end"),
      let: T("Bouw niet op onthouden endpointnamen; werk tegen het live schema van een geregistreerde app.", "Do not build on remembered endpoint names; work against the live schema of a registered app."),
      records: 96420, doorlooptijd: T("1 tot 6 weken", "1 to 6 weeks") },
    { id: "twinfield", naam: "Twinfield", soort: T("Boekhouding", "Accounting"),
      route: T("XML- en SOAP-diensten met OpenID Connect, plus auditbestanden en MT940", "XML and SOAP services with OpenID Connect, plus audit files and MT940"),
      let: T("Harde limieten: duizend credits per minuut en maximaal duizend regels per transactie; bij 429 wachten op Retry-After.", "Hard limits: a thousand credits per minute and at most a thousand lines per transaction; on a 429, wait for Retry-After."),
      records: 74310, doorlooptijd: T("2 tot 8 weken", "2 to 8 weeks") },
    { id: "excel", naam: T("Losse bestanden", "Loose files"), soort: T("Excel, CSV, MT940", "Excel, CSV, MT940"),
      route: T("Sjabloon downloaden, invullen, terugzetten en valideren", "Download the template, fill it in, upload and validate"),
      let: T("Meestal de laatste 10%: objecten die nooit in een systeem stonden.", "Usually the last 10%: properties that were never in any system."),
      records: 2140, doorlooptijd: T("dagen", "days") }
  ];

  var STAPPEN = [
    { nl: "Bron", en: "Source" }, { nl: "Verbinden", en: "Connect" }, { nl: "Profileren", en: "Profile" },
    { nl: "Mappen", en: "Map" }, { nl: "Valideren", en: "Validate" }, { nl: "Proefrun", en: "Dry run" },
    { nl: "Uitzonderingen", en: "Exceptions" }, { nl: "Reconciliëren", en: "Reconcile" }, { nl: "Goedkeuren", en: "Approve" }, { nl: "Overzetten", en: "Cut over" }
  ];

  function mapping(id) {
    var m = {
      omniboxx: [
        ["Complex / object-ID", "Complex / object ID", "property_complex.external_id", T("Voorvoegsel omniboxx:", "Prefix omniboxx:"), T("uniek", "unique")],
        ["Eenheid", "Unit", "unit", T("Bovenliggend object koppelen", "Link the parent property"), T("ouder verplicht", "parent required")],
        ["Huurcontract", "Rental contract", "lease", T("Datums en huurcomponenten splitsen", "Split dates and rent components"), T("start voor einde", "start before end")],
        ["Relatie", "Relation", "party", T("Ontdubbelen op e-mail en KvK", "Deduplicate on email and registration"), T("dubbelcontrole", "duplicate review")],
        ["Servicekostenafspraak", "Service charge scheme", "service_charge", T("Verdeelsleutel omzetten", "Convert the allocation key"), T("optelt tot 100%", "totals 100%")],
        ["Incident", "Incident", "maintenance_issue", T("Statussen hernoemen", "Rename statuses"), T("open blijft open", "open stays open")]
      ],
      bloxs: [
        ["Object", "Object", "property_complex / unit", T("Hiërarchie afleiden", "Derive the hierarchy"), T("adrescontrole", "address validation")],
        ["Relatie", "Relation", "party", T("Rollen normaliseren", "Normalise roles"), T("geldig roltype", "valid role type")],
        ["Huurcontract", "Lease", "lease", T("Componenten uitklappen", "Expand components"), T("huur sluit aan", "rent reconciles")],
        ["Memoriaal", "General journal", "journal_entry / line", T("Rekening en dimensie mappen", "Map account and dimension"), T("debet is credit", "debits equal credits")],
        ["WOZ-waarde", "WOZ value", "valuation", T("Peildatum bewaren", "Keep the reference date"), T("datum aanwezig", "date present")]
      ],
      exact: [
        ["Administratie", "Administration", "legal_entity", T("Eén op één", "One to one"), T("entiteit bestaat", "entity exists")],
        ["Relatie", "Account / relation", "party", T("Klant of leverancier als rol", "Customer or supplier as a role"), T("uniek extern kenmerk", "unique external reference")],
        ["Grootboekrekening", "GL account", "gl_account", T("Code behouden", "Preserve the code"), T("rekeningsoort gemapt", "account type mapped")],
        ["Kostenplaats", "Cost centre", "cost_center", T("Naar analytische dimensie", "To the analytical dimension"), T("bestaat", "exists")],
        ["Transactieregel", "Transaction line", "journal_line", T("Dimensies meenemen", "Carry the dimensions"), T("debet is credit", "debits equal credits")],
        ["Verkoopfactuur", "Sales invoice", "invoice", T("Koppelen aan contract waar mogelijk", "Link to the lease where possible"), T("totaal debiteuren sluit", "AR total matches")]
      ],
      twinfield: [
        ["Kantoor of bedrijf", "Office / company", "legal_entity", T("Organisatie mappen", "Map the organisation"), T("entiteit bestaat", "entity exists")],
        ["Dimensie niveau 1", "Dimension level 1", "gl_account", T("Rekeningklassen mappen", "Map the account classes"), T("code uniek", "code unique")],
        ["Dimensie niveau 2", "Dimension level 2", "party / cost_center", T("Routeren op dimensietype", "Route on dimension type"), T("type geldig", "type valid")],
        ["Dimensie niveau 3", "Dimension level 3", "project / fixed_asset", T("Routeren op dimensietype", "Route on dimension type"), T("verwijzing geldig", "reference valid")],
        ["Transactie", "Transaction", "journal_entry / line", T("Boekstuk en periode bewaren", "Preserve voucher and period"), T("grootboek sluit aan", "ledger reconciles")]
      ],
      excel: [
        ["Kolom A tot F", "Columns A to F", "property_complex", T("Sjabloon volgen", "Follow the template"), T("verplichte velden", "required fields")],
        ["Kolom G tot M", "Columns G to M", "unit", T("Sjabloon volgen", "Follow the template"), T("ouder verplicht", "parent required")],
        ["Kolom N tot T", "Columns N to T", "lease", T("Datumnotatie normaliseren", "Normalise date format"), T("start voor einde", "start before end")]
      ]
    };
    return m[id];
  }

  var UITZONDERINGEN = [
    { soort: T("Dubbele relatie", "Duplicate relation"), aantal: 34, ernst: "midden",
      uitleg: T("Zelfde persoon staat als huurder en als contactpersoon van een bedrijf. Samenvoegen op KvK en IBAN, met beide bron-ID's bewaard.",
                "The same person appears as tenant and as a company contact. Merge on registration and IBAN, keeping both source IDs.") },
    { soort: T("Contract zonder eenheid", "Lease without a unit"), aantal: 7, ernst: "hoog",
      uitleg: T("Zeven contracten verwijzen naar een unitnummer dat in het oude systeem is hergebruikt na een splitsing. Handmatig toewijzen op adres en oppervlakte.",
                "Seven leases point to a unit number that was reused in the old system after a split. Assign manually on address and floor area.") },
    { soort: T("Indexatie zonder oorspronkelijke datum", "Indexation without an original date"), aantal: 19, ernst: "hoog",
      uitleg: T("Alleen de huidige huur is bekend, niet de datum waarop de laatste verhoging inging. Zonder die datum klopt de volgende indexatie niet.",
                "Only the current rent is known, not the date the last increase took effect. Without that date the next indexation will be wrong.") },
    { soort: T("Servicekosten telt niet op tot 100%", "Service charge shares do not total 100%"), aantal: 3, ernst: "hoog",
      uitleg: T("Drie complexen komen uit op 97,4%, 99,1% en 101,2%. Waarschijnlijk leegstand die nooit is toegewezen.",
                "Three complexes come out at 97.4%, 99.1% and 101.2%. Most likely vacancy that was never allocated.") },
    { soort: T("Document zonder koppeling", "Document without a link"), aantal: 212, ernst: "laag",
      uitleg: T("Bestanden in een map die naar een object verwijst dat niet meer bestaat. Overzetten naar het archief, niet weggooien.",
                "Files in a folder pointing at a property that no longer exists. Move them to the archive, do not discard them.") },
    { soort: T("Afgesloten leverancier nog actief", "Closed supplier still active"), aantal: 11, ernst: "laag",
      uitleg: T("Leveranciers waarmee al jaren niet is gewerkt. Historisch bewaren, niet als actieve relatie overzetten.",
                "Suppliers not used for years. Keep them historically, do not migrate them as active relations.") }
  ];

  var CONTROLES = [
    { naam: T("Aantal objecten", "Property count"), bron: "118", doel: "118", ok: true },
    { naam: T("Aantal eenheden", "Unit count"), bron: "604", doel: "604", ok: true },
    { naam: T("Actieve huurcontracten", "Active leases"), bron: "541", doel: "541", ok: true },
    { naam: T("Contractuele jaarhuur", "Contracted annual rent"), bron: "€ 9.184.220", doel: "€ 9.184.220", ok: true },
    { naam: T("Waarborgsommen", "Tenant deposits"), bron: "€ 1.284.000", doel: "€ 1.284.000", ok: true },
    { naam: T("Openstaande debiteuren", "Receivables outstanding"), bron: "€ 742.400", doel: "€ 742.400", ok: true },
    { naam: T("Openstaande crediteuren", "Payables outstanding"), bron: "€ 486.900", doel: "€ 486.900", ok: true },
    { naam: T("Proefbalans per entiteit", "Trial balance per entity"), bron: "€ 102.793.200", doel: "€ 102.793.200", ok: true },
    { naam: T("Debet gelijk aan credit", "Debits equal credits"), bron: "0", doel: "0", ok: true },
    { naam: T("Banksaldo op overzetdatum", "Bank balance at cutover"), bron: "€ 4.186.000", doel: "€ 4.186.000", ok: true },
    { naam: T("Btw-saldi per tijdvak", "VAT balances per period"), bron: "€ 246.600", doel: "€ 246.600", ok: true },
    { naam: T("Servicekostenvoorschotten", "Service charge advances"), bron: "€ 341.800", doel: "€ 338.900", ok: false },
    { naam: T("Aantal documenten", "Document count"), bron: "18.412", doel: "18.200", ok: false },
    { naam: T("Controlegetal documenten", "Document checksums"), bron: "18.200", doel: "18.200", ok: true }
  ];

  var API = {
    stamp: function () { return bron + "|" + tab + "|" + stap; },
    click: function (e) {
      var b = U.hit(e, "data-ek-mig-bron"); if (b) { bron = b; return true; }
      var t = U.hit(e, "data-ek-mig-tab"); if (t) { tab = t; return true; }
      var s = U.hit(e, "data-ek-mig-stap"); if (s) { stap = Math.max(0, Math.min(9, stap + (+s))); return true; }
      return false;
    },
    html: function () {
      var B = BRONNEN.filter(function (b) { return b.id === bron; })[0];
      var totaal = BRONNEN.reduce(function (s, b) { return s + b.records; }, 0);
      var uitz = UITZONDERINGEN.reduce(function (s, u) { return s + u.aantal; }, 0);
      var faal = CONTROLES.filter(function (c) { return !c.ok; }).length;

      var body;
      if (tab === "mapping") body = mappingTab(B);
      else if (tab === "uitzonderingen") body = uitzonderingenTab();
      else if (tab === "reconciliatie") body = reconciliatieTab(faal);
      else body = overzichtTab(B, totaal, uitz);

      return U.head({
        eyebrow: T("Platform · migratie", "Platform · migration"),
        title: T("Migratiestudio", "Migration studio"),
        intro: T("Overstappen is geen eenmalig script maar een terugkerend proces: elke nieuwe eigenaar in het netwerk komt zo binnen. De bron blijft onaangeroerd bewaard, elk overgezet record onthoudt waar het vandaan kwam, en pas als de balans en de huurlijst tot op de cent aansluiten mag het oude pakket uit.",
                 "Switching over is not a one-off script but a recurring process: every new owner in the network arrives this way. The source is kept untouched, every migrated record remembers where it came from, and only when the balance sheet and the rent roll reconcile to the cent may the old package be switched off."),
        chip: T(U.NUM(totaal) + " records in beeld", U.NUM(totaal) + " records identified")
      }) +
      U.kpis([
        [T("Bronsystemen", "Source systems"), String(BRONNEN.length), T("vier pakketten plus losse bestanden", "four packages plus loose files")],
        [T("Records in beeld", "Records identified"), U.NUM(totaal), T("objecten, contracten, boekingen, documenten", "properties, leases, postings, documents")],
        [T("Uitzonderingen", "Exceptions"), String(uitz), T("waarvan 29 blokkerend", "29 of them blocking")],
        [T("Controles geslaagd", "Checks passed"), (CONTROLES.length - faal) + " / " + CONTROLES.length, T("twee sluiten nog niet", "two do not reconcile yet")],
        [T("Fase", "Stage"), T(STAPPEN[stap].nl, STAPPEN[stap].en), T("proefrun afgerond", "dry run complete")]
      ], 5) +
      '<div class="ek-mt ek-flow">' + BRONNEN.map(function (b) {
        return '<button type="button" class="ek-tab' + (b.id === bron ? " ek-on" : "") + '" data-ek-mig-bron="' + b.id + '">' +
          U.esc(b.naam) + " · " + U.NUM(b.records) + '</button>';
      }).join("") + '</div>' +
      '<div class="ek-mt">' + U.tabs([
        { id: "overzicht", label: T("Overzicht", "Overview") },
        { id: "mapping", label: T("Velddictionary", "Field dictionary") },
        { id: "uitzonderingen", label: T("Uitzonderingen", "Exceptions"), count: UITZONDERINGEN.length },
        { id: "reconciliatie", label: T("Reconciliatie", "Reconciliation"), count: CONTROLES.length }
      ], tab, "data-ek-mig-tab") + '</div>' + body;
    }
  };

  function overzichtTab(B, totaal, uitz) {
    return '<div class="ek-mt">' + U.panel(T("Migratieroute ", "Migration route ") + B.naam,
      '<div class="ek-panel-body">' + U.flow(STAPPEN.map(function (s) { return T(s.nl, s.en); }), stap) +
      '<div class="ek-mt-s ek-g ek-split">' + U.kv([
        [T("Bronsysteem", "Source system"), U.esc(B.naam) + " · " + U.esc(B.soort)],
        [T("Route", "Route"), U.esc(B.route)],
        [T("Records", "Records"), U.NUM(B.records)],
        [T("Verwachte doorlooptijd", "Expected duration"), U.esc(B.doorlooptijd)],
        [T("Herkomst per record", "Provenance per record"), T("bronsysteem, bronsleutel, tijdstip, batch en controlegetal", "source system, source key, timestamp, batch and checksum")],
        [T("Ruwe laag", "Raw layer"), T("onaangeroerd bewaard, ook na de overzetting", "kept untouched, also after the cutover")]
      ]) +
      U.ai(T("Waar het bij deze bron op vastloopt", "Where this source runs into trouble"), U.esc(B.let)) +
      '</div><div class="ek-mt-s">' + U.btns([
        { label: T("Vorige stap", "Previous stage"), attr: 'data-ek-mig-stap="-1"' },
        { label: T("Verbinden", "Connect") }, { label: T("Bestand uploaden", "Upload file") },
        { label: T("Profileren", "Profile") }, { label: T("Proefrun", "Dry run") },
        { label: T("Volgende stap", "Next stage"), primary: true, attr: 'data-ek-mig-stap="1"' },
        { label: T("Terugrollen", "Roll back"), danger: true }
      ]) + '</div></div>') +
      '<div class="ek-mt ek-g ek-split">' +
      U.panel(T("Volgorde van overzetten", "Migration waves"), '<div class="ek-panel-body">' +
        U.table([{ label: T("Golf", "Wave") }, { label: T("Gegevens", "Data") }, { label: T("Waarom in deze volgorde", "Why this order") }], [
          [T("Fundament", "Foundation"), T("organisaties, entiteiten, perioden, btw, bankrekeningen", "organisations, entities, periods, VAT, bank accounts"), T("alles verwijst hiernaar", "everything refers to these")],
          [T("Vastgoed", "Property"), T("portefeuilles, complexen, gebouwen, units", "portfolios, complexes, buildings, units"), T("contracten en techniek hangen eronder", "leases and technical records hang beneath")],
          [T("Partijen", "Parties"), T("eigenaren, huurders, leveranciers, makelaars", "owners, tenants, suppliers, brokers"), T("contracten verwijzen naar relaties", "leases refer to relations")],
          [T("Contracten", "Contracts"), T("huur, componenten, borg, indexatie", "leases, components, deposits, indexation"), T("bepaalt de facturatie", "drives the billing")],
          [T("Financiële stamgegevens", "Financial masters"), T("rekeningschema, dagboeken, dimensies", "chart of accounts, journals, dimensions"), T("nodig voor boekingen", "needed for postings")],
          [T("Historie", "History"), T("boekingen, facturen, open posten, bank", "postings, invoices, open items, bank"), T("financiële continuïteit", "financial continuity")],
          [T("Operatie", "Operations"), T("meldingen, werkorders, installaties, inspecties", "issues, work orders, installations, inspections"), T("werkvoorraad", "live workload")],
          [T("Documenten", "Documents"), T("contracten, facturen, foto's", "contracts, invoices, photos"), T("pas als de ID's vaststaan", "only once the IDs are fixed")],
          [T("Delta", "Delta"), T("alles wat sinds de eerste onttrekking is gewijzigd", "everything changed since the first extraction"), T("dicht het gat", "closes the gap")]
        ]) + '</div>') +
      U.panel(T("Wat er niet meekomt", "What does not come across"), '<div class="ek-panel-body">' + U.kv([
        [T("Gebruikers en rechten", "Users and permissions"), T("nooit blind overnemen; opnieuw toekennen", "never copied blindly; reassigned")],
        [T("Afgesloten leveranciers", "Closed suppliers"), T("historisch bewaren, niet activeren", "kept historically, not activated")],
        [T("Twintig jaar journaalhistorie", "Twenty years of journal history"), T("meestal onnodig; beginbalans plus twee jaar detail volstaat", "usually unnecessary; opening balance plus two years of detail is enough")],
        [T("Vrije velden zonder betekenis", "Free fields with no meaning"), T("in de ruwe laag, niet in het model", "in the raw layer, not in the model")],
        [T("Tussenrekeningen", "Suspense accounts"), T("eerst opschonen in de bron", "cleared in the source first")]
      ]) + '<p class="ek-mt-s ek-note">' + T("Het veiligste model voor een boekhoudmigratie is: oude administratie als leesbaar archief, nieuwe administratie vanaf een vaste datum, en een aangesloten beginbalans daartussenin.",
        "The safest model for an accounting migration is: the old ledger as a readable archive, the new ledger from a fixed date, and a reconciled opening balance in between.") + '</p></div>') +
      '</div></div>';
  }

  function mappingTab(B) {
    var rijen = mapping(B.id).map(function (m) {
      return [U.esc(B.naam), T(m[0], m[1]), '<code style="font-size:11px">' + m[2] + '</code>', U.esc(m[3]), U.chip(m[4], "info")];
    });
    return '<div class="ek-mt">' + U.panel(T("Velddictionary ", "Field dictionary ") + B.naam,
      U.table([{ label: T("Bron", "Source") }, { label: T("Bronveld", "Source field") }, { label: T("Doelveld", "Target field") },
        { label: T("Bewerking", "Transformation") }, { label: T("Controle", "Validation") }], rijen),
      U.btns([{ label: T("Mapping bewerken", "Edit mapping"), primary: true }, { label: T("Sjabloon downloaden", "Download template") },
        { label: T("Valideren", "Validate") }, { label: T("Opslaan als standaard", "Save as default") }])) +
      U.note(T("Deze dictionary is per bronsysteem herbruikbaar. Wat bij de eerste klant is uitgezocht, hoeft bij de volgende niet opnieuw: alleen de klantspecifieke afwijkingen komen erbij. Dat is precies wat migratie van een project een product maakt.",
               "This dictionary is reusable per source system. What was worked out for the first customer does not have to be worked out again for the next: only the customer-specific deviations are added. That is exactly what turns migration from a project into a product.")) + '</div>';
  }

  function uitzonderingenTab() {
    var rijen = UITZONDERINGEN.map(function (u) {
      return [U.esc(u.soort), '<span class="ek-num">' + u.aantal + '</span>',
        u.ernst === "hoog" ? U.chip(T("Blokkerend", "Blocking"), "bad") : u.ernst === "midden" ? U.chip(T("Aandacht", "Attention"), "warn") : U.chip(T("Laag", "Low"), ""),
        U.esc(u.uitleg),
        U.btns([{ label: T("Oplossen", "Resolve"), primary: u.ernst === "hoog" }, { label: T("Uitsluiten", "Exclude") }])];
    });
    return '<div class="ek-mt">' + U.panel(T("Uitzonderingenwachtrij", "Exception queue"),
      U.table([{ label: T("Soort", "Type") }, { label: T("Aantal", "Count"), num: true }, { label: T("Ernst", "Severity") },
        { label: T("Toelichting", "Explanation") }, { label: T("Actie", "Action") }], rijen),
      U.btns([{ label: T("Alles opnieuw valideren", "Revalidate all"), primary: true }, { label: T("Exporteren naar Excel", "Export to Excel") },
        { label: T("Toewijzen aan collega", "Assign to a colleague") }])) +
      U.ai(T("Wat hier het echte werk is", "Where the real work sits"),
        T("De 212 losse documenten kosten een middag. De negentien indexaties zonder oorspronkelijke datum kosten twee dagen en bepalen of de huurverhoging van volgend jaar klopt. Een migratie loopt zelden vast op volume, bijna altijd op dit soort ontbrekende geschiedenis; daarom staat deze lijst vooraan en niet in een logbestand.",
          "The 212 loose documents cost an afternoon. The nineteen indexations without an original date cost two days and decide whether next year's rent increase is correct. A migration rarely fails on volume, almost always on missing history like this; which is why this list sits up front and not in a log file.")) + '</div>';
  }

  function reconciliatieTab(faal) {
    var rijen = CONTROLES.map(function (c) {
      return [U.esc(c.naam), '<span class="ek-num">' + c.bron + '</span>', '<span class="ek-num">' + c.doel + '</span>',
        c.ok ? U.chip(T("Sluit", "Reconciles"), "ok") : U.chip(T("Verschil", "Difference"), "bad")];
    });
    return '<div class="ek-mt">' + U.panel(T("Reconciliatie bron tegen doel", "Source against target reconciliation"),
      U.table([{ label: T("Controle", "Check") }, { label: T("Bron", "Source"), num: true }, { label: T("Doel", "Target"), num: true },
        { label: T("Uitkomst", "Outcome") }], rijen),
      U.btns([{ label: T("Opnieuw draaien", "Run again"), primary: true }, { label: T("Verschillenrapport", "Difference report") },
        { label: T("Goedkeuren", "Approve"), off: faal > 0 }, { label: T("Overzetten", "Cut over"), off: faal > 0 }])) +
      U.note(faal
        ? T("Twee controles sluiten nog niet, dus de knoppen Goedkeuren en Overzetten staan uit. Het verschil in servicekostenvoorschotten van 2.900 euro komt vrijwel zeker uit de drie complexen waar de verdeling niet op 100% uitkomt; de 212 documenten zijn de losse bestanden uit de uitzonderingenlijst. Beide moeten verklaard zijn, niet weggeklikt.",
            "Two checks do not reconcile yet, so the Approve and Cut over buttons are disabled. The 2,900 euro difference in service charge advances almost certainly comes from the three complexes whose allocation does not total 100%; the 212 documents are the loose files from the exception list. Both have to be explained, not clicked away.")
        : T("Alle controles sluiten. De overzetting kan worden goedgekeurd.", "All checks reconcile. The cutover can be approved.")) + '</div>';
  }

  U.mount("ek-migration-root", API);
})();
