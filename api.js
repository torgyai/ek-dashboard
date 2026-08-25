/* API & webhooks: de eigen open koppellaag. Wat de vier oude pakketten met
   moeite blootgeven, is hier het uitgangspunt: alles wat het scherm kan,
   kan de API ook, met dezelfde rechten en hetzelfde auditspoor. */
(function () {
  var U = window.EKUI, T = U.T;
  var tab = "endpoints", groep = "vastgoed", open = "properties";

  var GROEPEN = [
    { id: "vastgoed", nl: "Vastgoed", en: "Property" },
    { id: "relaties", nl: "Relaties & contracten", en: "Relations & contracts" },
    { id: "financieel", nl: "Financieel", en: "Financial" },
    { id: "techniek", nl: "Techniek & projecten", en: "Technical & projects" },
    { id: "platform", nl: "Platform", en: "Platform" }
  ];

  function endpoints() {
    return [
      { id: "organizations", pad: "/api/v1/organizations", groep: "platform", methoden: ["GET", "POST", "PATCH"], omschrijving: ["Klantorganisaties", "Customer organisations"] },
      { id: "legal-entities", pad: "/api/v1/legal-entities", groep: "platform", methoden: ["GET", "POST", "PATCH"], omschrijving: ["Vennootschappen met KvK, btw en boekjaar", "Companies with registration, VAT and financial year"] },
      { id: "portfolios", pad: "/api/v1/portfolios", groep: "vastgoed", methoden: ["GET", "POST", "PATCH"], omschrijving: ["Portefeuilles met strategie en beheerder", "Portfolios with strategy and manager"] },
      { id: "complexes", pad: "/api/v1/complexes", groep: "vastgoed", methoden: ["GET", "POST", "PATCH"], omschrijving: ["Complexen boven gebouwen", "Complexes above buildings"] },
      { id: "buildings", pad: "/api/v1/buildings", groep: "vastgoed", methoden: ["GET", "POST", "PATCH"], omschrijving: ["Gebouwen met adres, bouwjaar en oppervlakte", "Buildings with address, year and floor area"] },
      { id: "properties", pad: "/api/v1/properties", groep: "vastgoed", methoden: ["GET", "POST", "PATCH", "DELETE"], omschrijving: ["Objecten met eigendom, waarde en label", "Properties with ownership, value and label"] },
      { id: "units", pad: "/api/v1/units", groep: "vastgoed", methoden: ["GET", "POST", "PATCH"], omschrijving: ["Eenheden met status, oppervlakte en streefhuur", "Units with status, area and target rent"] },
      { id: "valuations", pad: "/api/v1/valuations", groep: "vastgoed", methoden: ["GET", "POST"], omschrijving: ["Taxaties met datum, taxateur en methodiek", "Valuations with date, valuer and methodology"] },
      { id: "energy", pad: "/api/v1/energy-labels", groep: "vastgoed", methoden: ["GET", "PATCH"], omschrijving: ["Energielabels met geldigheid", "Energy labels with validity"] },
      { id: "parties", pad: "/api/v1/parties", groep: "relaties", methoden: ["GET", "POST", "PATCH"], omschrijving: ["Personen en organisaties met rollen", "People and organisations with roles"] },
      { id: "leases", pad: "/api/v1/leases", groep: "relaties", methoden: ["GET", "POST", "PATCH"], omschrijving: ["Huurcontracten met componenten en indexatie", "Leases with components and indexation"] },
      { id: "contracts", pad: "/api/v1/contracts", groep: "relaties", methoden: ["GET", "POST", "PATCH"], omschrijving: ["Overige contracten: leverancier, beheer, financiering", "Other contracts: supplier, management, finance"] },
      { id: "listings", pad: "/api/v1/listings", groep: "relaties", methoden: ["GET", "POST", "PATCH", "DELETE"], omschrijving: ["Advertenties en publicatiestatus per kanaal", "Listings and publication status per channel"] },
      { id: "applications", pad: "/api/v1/applications", groep: "relaties", methoden: ["GET", "POST", "PATCH"], omschrijving: ["Kandidaten met fase en stukken", "Candidates with stage and documents"] },
      { id: "invoices", pad: "/api/v1/invoices", groep: "financieel", methoden: ["GET", "POST", "PATCH"], omschrijving: ["Verkoopfacturen met regels en btw", "Sales invoices with lines and VAT"] },
      { id: "purchase-invoices", pad: "/api/v1/purchase-invoices", groep: "financieel", methoden: ["GET", "POST", "PATCH"], omschrijving: ["Inkoopfacturen met fiatteringsstatus", "Purchase invoices with approval status"] },
      { id: "payments", pad: "/api/v1/payments", groep: "financieel", methoden: ["GET", "POST"], omschrijving: ["Betalingen en incasso-opdrachten", "Payments and direct debit instructions"] },
      { id: "bank-transactions", pad: "/api/v1/bank-transactions", groep: "financieel", methoden: ["GET", "POST"], omschrijving: ["Banktransacties met afletterstatus", "Bank transactions with matching status"] },
      { id: "journal-entries", pad: "/api/v1/journal-entries", groep: "financieel", methoden: ["GET", "POST"], omschrijving: ["Journaalposten met regels en dimensies", "Journal entries with lines and dimensions"] },
      { id: "ledger-accounts", pad: "/api/v1/ledger-accounts", groep: "financieel", methoden: ["GET", "POST", "PATCH"], omschrijving: ["Rekeningschema met btw-codes", "Chart of accounts with VAT codes"] },
      { id: "service-charges", pad: "/api/v1/service-charges", groep: "financieel", methoden: ["GET", "POST", "PATCH"], omschrijving: ["Servicekostenschema's, voorschotten en afrekeningen", "Service charge schemes, advances and settlements"] },
      { id: "budgets", pad: "/api/v1/budgets", groep: "financieel", methoden: ["GET", "POST", "PATCH"], omschrijving: ["Budgetten per object, project en jaar", "Budgets per property, project and year"] },
      { id: "tickets", pad: "/api/v1/tickets", groep: "techniek", methoden: ["GET", "POST", "PATCH"], omschrijving: ["Meldingen met status, prioriteit en SLA", "Issues with status, priority and SLA"] },
      { id: "work-orders", pad: "/api/v1/work-orders", groep: "techniek", methoden: ["GET", "POST", "PATCH"], omschrijving: ["Werkorders met leverancier, offerte en kosten", "Work orders with supplier, quote and cost"] },
      { id: "installations", pad: "/api/v1/installations", groep: "techniek", methoden: ["GET", "POST", "PATCH"], omschrijving: ["Installaties met serienummer en keuringsdatum", "Installations with serial number and inspection date"] },
      { id: "inspections", pad: "/api/v1/inspections", groep: "techniek", methoden: ["GET", "POST"], omschrijving: ["Inspecties met checklist, foto's en uitkomst", "Inspections with checklist, photos and outcome"] },
      { id: "projects", pad: "/api/v1/projects", groep: "techniek", methoden: ["GET", "POST", "PATCH"], omschrijving: ["Projecten met budget en verplichtingen", "Projects with budget and commitments"] },
      { id: "documents", pad: "/api/v1/documents", groep: "platform", methoden: ["GET", "POST", "DELETE"], omschrijving: ["Documenten met controlegetal en koppelingen", "Documents with checksum and links"] },
      { id: "reports", pad: "/api/v1/reports", groep: "platform", methoden: ["GET", "POST"], omschrijving: ["Rapportages draaien en ophalen", "Run and retrieve reports"] },
      { id: "data-sharing-grants", pad: "/api/v1/data-sharing-grants", groep: "platform", methoden: ["GET", "POST", "DELETE"], omschrijving: ["Toestemmingen voor het netwerk", "Consent grants for the network"] },
      { id: "audit-events", pad: "/api/v1/audit-events", groep: "platform", methoden: ["GET"], omschrijving: ["Auditspoor, alleen lezen", "Audit trail, read only"] },
      { id: "migrations", pad: "/api/v1/migrations", groep: "platform", methoden: ["GET", "POST"], omschrijving: ["Migratiebatches met status en reconciliatie", "Migration batches with status and reconciliation"] }
    ];
  }

  var WEBHOOKS = [
    { event: "lease.created", omschrijving: ["Nieuw huurcontract vastgelegd", "New lease recorded"], abonnees: 2 },
    { event: "lease.signed", omschrijving: ["Contract digitaal ondertekend", "Lease signed digitally"], abonnees: 3 },
    { event: "lease.indexed", omschrijving: ["Indexatie toegepast en geboekt", "Indexation applied and posted"], abonnees: 2 },
    { event: "lease.terminated", omschrijving: ["Contract beëindigd of opgezegd", "Lease ended or given notice"], abonnees: 2 },
    { event: "invoice.created", omschrijving: ["Factuur aangemaakt", "Invoice created"], abonnees: 1 },
    { event: "invoice.posted", omschrijving: ["Factuur geboekt in het grootboek", "Invoice posted to the ledger"], abonnees: 2 },
    { event: "invoice.paid", omschrijving: ["Factuur volledig voldaan", "Invoice paid in full"], abonnees: 3 },
    { event: "invoice.overdue", omschrijving: ["Vervaldatum verstreken", "Due date passed"], abonnees: 2 },
    { event: "bank_transaction.created", omschrijving: ["Nieuwe banktransactie ingelezen", "New bank transaction imported"], abonnees: 1 },
    { event: "ticket.created", omschrijving: ["Melding aangemaakt", "Issue created"], abonnees: 3 },
    { event: "ticket.completed", omschrijving: ["Melding afgerond door leverancier", "Issue completed by the supplier"], abonnees: 3 },
    { event: "work_order.created", omschrijving: ["Werkorder verstrekt", "Work order issued"], abonnees: 2 },
    { event: "document.signed", omschrijving: ["Document ondertekend, met bewijsrapport", "Document signed, with the signing report"], abonnees: 2 },
    { event: "property.updated", omschrijving: ["Objectgegevens gewijzigd", "Property data changed"], abonnees: 1 },
    { event: "unit.status_changed", omschrijving: ["Eenheid van verhuurd naar leeg of omgekeerd", "Unit moved from let to vacant or back"], abonnees: 2 },
    { event: "data_share.granted", omschrijving: ["Toestemming verleend aan een netwerkpartner", "Consent granted to a network partner"], abonnees: 1 },
    { event: "data_share.revoked", omschrijving: ["Toestemming ingetrokken", "Consent revoked"], abonnees: 1 }
  ];

  var TOKENS = [
    { naam: T("Power BI rapportage", "Power BI reporting"), soort: T("Servicerekening", "Service account"), scopes: "property.read, invoice.read, report.read",
      laatst: "2026-08-25 05:00", verloopt: "2027-01-31", staat: "actief" },
    { naam: T("Koppeling accountantskantoor", "Accountancy firm integration"), soort: T("Servicerekening", "Service account"), scopes: "ledger.read, document.read",
      laatst: "2026-08-19 14:22", verloopt: "2026-12-31", staat: "actief" },
    { naam: T("Publicatiekoppeling Funda", "Funda publication integration"), soort: T("Servicerekening", "Service account"), scopes: "listing.read, listing.write",
      laatst: "2026-08-25 07:30", verloopt: "2027-06-30", staat: "actief" },
    { naam: T("Migratie Twinfield, tijdelijk", "Twinfield migration, temporary"), soort: T("Migratiesleutel", "Migration key"), scopes: "migration.read, migration.write",
      laatst: "2026-08-24 23:20", verloopt: "2026-10-01", staat: "tijdelijk" },
    { naam: T("Oude testsleutel", "Old test key"), soort: T("Persoonlijk", "Personal"), scopes: "property.read",
      laatst: "2026-03-11 09:44", verloopt: "2026-04-01", staat: "verlopen" }
  ];

  var API = {
    stamp: function () { return tab + "|" + groep + "|" + open; },
    click: function (e) {
      var t = U.hit(e, "data-ek-api-tab"); if (t) { tab = t; return true; }
      var g = U.hit(e, "data-ek-api-groep"); if (g) { groep = g; return true; }
      var o = U.hit(e, "data-ek-api-open"); if (o) { open = o; return true; }
      return false;
    },
    html: function () {
      var E = endpoints();
      var body;
      if (tab === "webhooks") body = webhookTab();
      else if (tab === "toegang") body = toegangTab();
      else if (tab === "regels") body = regelsTab();
      else body = endpointTab(E);

      return U.head({
        eyebrow: T("Platform · koppelvlak", "Platform · interface"),
        title: T("API & webhooks", "API & webhooks"),
        intro: T("Alles wat op het scherm kan, kan ook via de API, met dezelfde rechten en hetzelfde auditspoor. Dat is meteen de beste garantie tegen opsluiting: een klant die weg wil, kan zijn eigen gegevens er compleet uit halen zonder een exportverzoek in te dienen bij een leverancier.",
                 "Everything that works on screen works through the API too, with the same permissions and the same audit trail. That is at once the best guarantee against lock-in: a customer who wants to leave can take their own data out in full without filing an export request with a vendor."),
        chip: T(E.length + " collecties · " + WEBHOOKS.length + " gebeurtenissen", E.length + " collections · " + WEBHOOKS.length + " events")
      }) +
      U.kpis([
        [T("Collecties", "Collections"), String(E.length), T("elk met lijst, ophalen, aanmaken en wijzigen", "each with list, get, create and update")],
        [T("Webhookgebeurtenissen", "Webhook events"), String(WEBHOOKS.length), T("met handtekening en herhaalbeveiliging", "signed and replay protected")],
        [T("Actieve sleutels", "Active keys"), String(TOKENS.filter(function (t) { return t.staat === "actief"; }).length), T("plus één tijdelijke migratiesleutel", "plus one temporary migration key")],
        [T("Verzoeken vandaag", "Requests today"), U.NUM(18420), T("piek om 05:00 door de rapportagerun", "peak at 05:00 from the reporting run")],
        [T("Gemiddelde responstijd", "Average response time"), "84 ms", T("95e percentiel 310 ms", "95th percentile 310 ms")]
      ], 5) +
      '<div class="ek-mt">' + U.tabs([
        { id: "endpoints", label: T("Endpoints", "Endpoints"), count: E.length },
        { id: "webhooks", label: T("Webhooks", "Webhooks"), count: WEBHOOKS.length },
        { id: "toegang", label: T("Toegang & sleutels", "Access & keys"), count: TOKENS.length },
        { id: "regels", label: T("Spelregels", "Ground rules") }
      ], tab, "data-ek-api-tab") + '</div>' + body;
    }
  };

  function endpointTab(E) {
    var lijst = E.filter(function (e) { return e.groep === groep; });
    var gek = E.filter(function (e) { return e.id === open; })[0] || lijst[0] || E[0];
    var rijen = lijst.map(function (e) {
      return {
        attr: 'data-ek-api-open="' + e.id + '"', on: gek.id === e.id,
        cells: ['<code style="font-size:11.5px">' + e.pad + '</code>',
          e.methoden.map(function (m) { return U.chip(m, m === "GET" ? "" : m === "DELETE" ? "bad" : "info"); }).join(" "),
          T(e.omschrijving[0], e.omschrijving[1])]
      };
    });
    var voorbeeld = 'GET ' + gek.pad + '?updated_after=2026-08-01&amp;limit=100\n' +
      'Authorization: Bearer &lt;token&gt;\n' +
      'X-Organization: eye-vastgoed\n\n' +
      '200 OK\n' +
      '{\n' +
      '  "data": [ … ],\n' +
      '  "next_cursor": "eyJpZCI6…",\n' +
      '  "count": 100\n' +
      '}';
    return '<div class="ek-mt">' + U.tabs(GROEPEN.map(function (g) {
      return { id: g.id, label: T(g.nl, g.en), count: E.filter(function (e) { return e.groep === g.id; }).length };
    }), groep, "data-ek-api-groep") + '</div>' +
    '<div class="ek-mt ek-g ek-split">' +
    U.panel(T("Collecties", "Collections"),
      U.table([{ label: T("Pad", "Path") }, { label: T("Methoden", "Methods") }, { label: T("Omschrijving", "Description") }], rijen),
      U.btns([{ label: T("Documentatie openen", "Open documentation"), primary: true }, { label: "OpenAPI" }, { label: T("In de testomgeving proberen", "Try in the sandbox") }])) +
    U.panel(T("Voorbeeld", "Example"), '<div class="ek-panel-body">' +
      '<pre style="margin:0;overflow-x:auto;font-size:11px;line-height:18px;background:#f6f6f4;padding:12px;border-radius:10px">' + voorbeeld + '</pre>' +
      '<div class="ek-mt-s">' + U.kv([
        [T("Filteren", "Filtering"), T("op elk veld, plus updated_after voor delta's", "on any field, plus updated_after for deltas")],
        [T("Paginering", "Pagination"), T("cursor, geen offset", "cursor based, not offset")],
        [T("Volgorde", "Ordering"), T("standaard op gewijzigd-op", "by updated-at by default")],
        [T("Uitbreiden", "Expanding"), T("include=lines,party om rondrijden te voorkomen", "include=lines,party to avoid round trips")]
      ]) + '</div></div>') +
    '</div>';
  }

  function webhookTab() {
    var rijen = WEBHOOKS.map(function (w) {
      return ['<code style="font-size:11.5px">' + w.event + '</code>', T(w.omschrijving[0], w.omschrijving[1]),
        '<span class="ek-num">' + w.abonnees + '</span>',
        U.chip(T("Actief", "Active"), "ok")];
    });
    return '<div class="ek-mt ek-g ek-split">' +
      U.panel(T("Gebeurtenissen", "Events"),
        U.table([{ label: T("Gebeurtenis", "Event") }, { label: T("Wanneer", "When") }, { label: T("Abonnees", "Subscribers"), num: true },
          { label: T("Status", "Status") }], rijen),
        U.btns([{ label: T("Abonnement toevoegen", "Add subscription"), primary: true }, { label: T("Testbericht sturen", "Send a test event") },
          { label: T("Afleverlog", "Delivery log") }])) +
      U.panel(T("Hoe de aflevering werkt", "How delivery works"), '<div class="ek-panel-body">' + U.kv([
        [T("Handtekening", "Signature"), T("HMAC over de hele body, met tijdstempel", "HMAC over the full body, with a timestamp")],
        [T("Herhaalbeveiliging", "Replay protection"), T("tijdstempel ouder dan vijf minuten wordt geweigerd", "a timestamp older than five minutes is rejected")],
        [T("Opnieuw proberen", "Retries"), T("acht keer met oplopende wachttijd, tot 24 uur", "eight times with increasing back-off, up to 24 hours")],
        [T("Volgorde", "Ordering"), T("niet gegarandeerd; gebruik het volgnummer in de body", "not guaranteed; use the sequence number in the body")],
        [T("Eén keer verwerken", "Exactly once"), T("elke levering draagt een unieke sleutel", "every delivery carries a unique key")],
        [T("Bij falen", "On failure"), T("melding in het scherm en in het logboek, niet stilzwijgend uit", "an alert on screen and in the log, never silently disabled")]
      ]) + '<p class="ek-mt-s ek-note">' + T("Twinfield kent in de bekeken documentatie geen algemene webhookvoorziening en Exact wel; dat verschil is precies de reden om dit zelf te doen en er niet van afhankelijk te zijn.",
        "In the documentation reviewed, Twinfield has no general webhook facility while Exact does; that difference is exactly why this is built in-house rather than depended upon.") + '</p></div>') +
      '</div>';
  }

  function toegangTab() {
    var rijen = TOKENS.map(function (t) {
      return [U.esc(t.naam), U.esc(t.soort), '<code style="font-size:11px">' + U.esc(t.scopes) + '</code>',
        U.esc(t.laatst), U.DATE(t.verloopt),
        t.staat === "actief" ? U.chip(T("Actief", "Active"), "ok") : t.staat === "tijdelijk" ? U.chip(T("Tijdelijk", "Temporary"), "warn") : U.chip(T("Verlopen", "Expired"), ""),
        U.btns([{ label: T("Vernieuwen", "Rotate") }, { label: T("Intrekken", "Revoke"), danger: true }])];
    });
    return '<div class="ek-mt">' + U.panel(T("Sleutels en servicerekeningen", "Keys and service accounts"),
      U.table([{ label: T("Naam", "Name") }, { label: T("Soort", "Type") }, { label: T("Rechten", "Scopes") },
        { label: T("Laatst gebruikt", "Last used") }, { label: T("Verloopt", "Expires") }, { label: T("Status", "Status") }, { label: T("Actie", "Action") }], rijen),
      U.btns([{ label: T("Sleutel aanmaken", "Create a key"), primary: true }, { label: T("Testomgeving", "Sandbox") },
        { label: T("Gebruik bekijken", "View usage") }, { label: T("Verlopen sleutels opruimen", "Clean up expired keys") }])) +
      U.ai(T("Waarom sleutels aflopen", "Why keys expire"),
        T("Een sleutel zonder einddatum wordt vergeten. Die van de accountant loopt af als het jaarwerk klaar is, die van de migratie zodra Twinfield uit gaat, en die van de oude test is in april vanzelf gestopt zonder dat iemand hoefde in te grijpen. Elke sleutel draagt bovendien alleen de rechten die de koppeling nodig heeft: de rapportagesleutel kan lezen en niets schrijven.",
          "A key without an end date gets forgotten. The accountant's expires when the year-end work is done, the migration key when Twinfield is switched off, and the old test key stopped by itself in April without anyone having to intervene. Every key also carries only the rights the integration needs: the reporting key can read and write nothing.")) + '</div>';
  }

  function regelsTab() {
    return '<div class="ek-mt ek-g ek-split">' +
      U.panel(T("Spelregels van de API", "Ground rules of the API"), '<div class="ek-panel-body">' + U.kv([
        [T("Versies", "Versioning"), T("v1 blijft staan; wijzigingen die breken krijgen v2", "v1 stays; breaking changes get a v2")],
        [T("Idempotentie", "Idempotency"), T("elke schrijfactie accepteert een idempotency-key", "every write accepts an idempotency key")],
        [T("Externe kenmerken", "External references"), T("bronsysteem en bronsleutel blijven bewaard", "source system and source key are retained")],
        [T("Limieten", "Rate limits"), T("600 verzoeken per minuut per organisatie, 60 bij schrijven", "600 requests per minute per organisation, 60 for writes")],
        [T("Bij overschrijding", "On exceeding"), T("429 met Retry-After, nooit een stille afkap", "429 with Retry-After, never a silent cut-off")],
        [T("Grote uitvoer", "Large exports"), T("als taak, met een link naar het bestand", "as a job, with a link to the file")],
        [T("Rechten", "Permissions"), T("dezelfde als in het scherm, per sleutel begrensd", "the same as on screen, bounded per key")],
        [T("Auditspoor", "Audit trail"), T("elk verzoek gelogd met sleutel, doel en resultaat", "every request logged with key, purpose and result")]
      ]) + '</div>') +
      U.panel(T("Taken", "Jobs"), '<div class="ek-panel-body">' +
        U.table([{ label: T("Taak", "Job") }, { label: T("Wat het doet", "What it does") }, { label: T("Laatste run", "Last run") }], [
          ['<code style="font-size:11px">/export-jobs</code>', T("Volledige uitvoer van de eigen gegevens, in CSV of JSON", "Full export of your own data, in CSV or JSON"), U.DATE("2026-08-01")],
          ['<code style="font-size:11px">/import-jobs</code>', T("Bulkinvoer met validatie vooraf en een foutenrapport", "Bulk import with validation up front and an error report"), U.DATE("2026-08-20")],
          ['<code style="font-size:11px">/sync-jobs</code>', T("Terugkerende synchronisatie met een gekoppeld systeem", "Recurring synchronisation with a connected system"), "2026-08-25 05:00"],
          ['<code style="font-size:11px">/migrations</code>', T("Migratiebatch met reconciliatie en herkomst", "Migration batch with reconciliation and provenance"), U.DATE("2026-08-24")]
        ]) +
        '<div class="ek-mt-s">' + U.btns([{ label: T("Export starten", "Start an export"), primary: true }, { label: T("Taken bekijken", "View jobs") },
          { label: T("Foutenrapport", "Error report") }]) + '</div>' +
        '<p class="ek-mt-s ek-note">' + T("De volledige uitvoer is bewust geen gunst maar een knop. Een klant die vertrekt neemt zijn objecten, contracten, boekingen en documenten mee, inclusief de bronverwijzingen naar het pakket waar het ooit vandaan kwam.",
          "The full export is deliberately a button rather than a favour. A customer who leaves takes their properties, leases, postings and documents with them, including the source references to the package it originally came from.") + '</p></div>') +
      '</div>';
  }

  U.mount("ek-api-root", API);
})();
