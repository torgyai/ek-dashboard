/* Beheer & toegang: gebruikers, rollen, rechtenmatrix, auditspoor, beveiliging
   en privacy. Geen onzichtbare knop waarmee iemand alles van iedereen ziet. */
(function () {
  var U = window.EKUI, T = U.T;
  var tab = "gebruikers", rol = "propertymanager";

  function gebruikers() {
    return [
      { naam: "Eric Kooistra", rol: "eigenaar", org: "EYE Vastgoed B.V.", mfa: true, laatst: "2026-08-25 08:14", bereik: T("Alle entiteiten", "All entities") },
      { naam: "Amarens", rol: "controller", org: "EYE Vastgoed B.V.", mfa: true, laatst: "2026-08-25 07:52", bereik: T("Alle entiteiten", "All entities") },
      { naam: "Sietse Talsma", rol: "technisch", org: "EYE Vastgoed B.V.", mfa: true, laatst: "2026-08-24 16:30", bereik: T("Techniek en projecten", "Technical and projects") },
      { naam: T("Beheer Dokkum", "Property management Dokkum"), rol: "propertymanager", org: "EYE Vastgoed B.V.", mfa: true, laatst: "2026-08-25 09:01", bereik: T("Portefeuille Friesland", "Friesland portfolio") },
      { naam: T("Accountantskantoor Noord", "Accountantskantoor Noord"), rol: "accountant", org: T("Extern", "External"), mfa: true, laatst: "2026-08-19 14:22", bereik: T("Administratie, alleen lezen", "Ledger, read only") },
      { naam: "Jelke Wijnstra", rol: "leverancier", org: "Synergy Installatietechniek", mfa: true, laatst: "2026-08-25 06:40", bereik: T("Eigen werkorders", "Own work orders") },
      { naam: "Harns Invest B.V.", rol: "investeerder", org: T("Extern", "External"), mfa: true, laatst: "2026-08-21 11:08", bereik: T("Achmeatoren / IQON", "Achmeatoren / IQON") },
      { naam: T("Bankreviewer Rabobank", "Bank reviewer Rabobank"), rol: "bank", org: T("Extern", "External"), mfa: true, laatst: "2026-08-18 10:15", bereik: T("Bankpakket 2026, tot 30 november", "Bank pack 2026, until 30 November") }
    ];
  }

  var ROLLEN = [
    { id: "eigenaar", nl: "Organisatiebeheerder", en: "Organisation admin" },
    { id: "controller", nl: "Financieel controller", en: "Finance controller" },
    { id: "propertymanager", nl: "Propertymanager", en: "Property manager" },
    { id: "technisch", nl: "Technisch beheerder", en: "Technical manager" },
    { id: "accountant", nl: "Externe accountant", en: "External accountant" },
    { id: "leverancier", nl: "Onderhoudspartij", en: "Maintenance vendor" },
    { id: "investeerder", nl: "Investeerder", en: "Investor" },
    { id: "bank", nl: "Bankreviewer", en: "Bank reviewer" }
  ];

  var RECHTEN = [
    { code: "property.read", nl: "Objecten inzien", en: "View properties" },
    { code: "property.write", nl: "Objecten wijzigen", en: "Edit properties" },
    { code: "lease.approve", nl: "Huurcontract goedkeuren", en: "Approve a lease" },
    { code: "invoice.post", nl: "Factuur boeken", en: "Post an invoice" },
    { code: "payment.approve", nl: "Betaling goedkeuren", en: "Approve a payment" },
    { code: "journal.reverse", nl: "Journaalpost storneren", en: "Reverse a journal entry" },
    { code: "tenant.pii.read", nl: "Huurdergegevens inzien", en: "View tenant personal data" },
    { code: "investor.kyc.read", nl: "KYC-dossier inzien", en: "View KYC file" },
    { code: "network.aggregate.read", nl: "Netwerkcijfers lezen", en: "Read network aggregates" },
    { code: "financing.data_room.share", nl: "Dataroom delen", en: "Share the data room" },
    { code: "admin.user.manage", nl: "Gebruikers beheren", en: "Manage users" }
  ];

  var MATRIX = {
    eigenaar:        [1,1,1,1,1,1,1,1,1,1,1],
    controller:      [1,0,1,1,1,1,1,0,1,1,0],
    propertymanager: [1,1,1,1,0,0,1,0,0,0,0],
    technisch:       [1,1,0,0,0,0,0,0,0,0,0],
    accountant:      [1,0,0,0,0,0,0,0,0,0,0],
    leverancier:     [0,0,0,0,0,0,0,0,0,0,0],
    investeerder:    [1,0,0,0,0,0,0,0,1,0,0],
    bank:            [1,0,0,0,0,0,0,0,1,0,0]
  };

  var AUDIT = [
    { tijd: "2026-08-25 09:04", wie: "Amarens", wat: T("Journaalpost MEM 2026-08-002 geboekt", "Posted journal entry MEM 2026-08-002"), waar: "EYE Vastgoed B.V.", ip: "83.163.…", ok: true },
    { tijd: "2026-08-25 08:41", wie: "Eric Kooistra", wat: T("Toestemming Waddenkapitaal verhoogd naar objectniveau", "Raised Waddenkapitaal consent to property level"), waar: T("Netwerk", "Network"), ip: "83.163.…", ok: true },
    { tijd: "2026-08-24 16:32", wie: "Sietse Talsma", wat: T("Werkorder 2026-0431 toegewezen aan Bouwteam", "Assigned work order 2026-0431 to Bouwteam"), waar: "Dockumer Sluys", ip: "77.249.…", ok: true },
    { tijd: "2026-08-24 11:12", wie: T("Bankreviewer Rabobank", "Bank reviewer Rabobank"), wat: T("Taxatierapport Achmeatoren gedownload", "Downloaded valuation report Achmeatoren"), waar: T("Bankpakket 2026", "Bank pack 2026"), ip: "145.220.…", ok: true },
    { tijd: "2026-08-23 22:07", wie: T("Onbekend", "Unknown"), wat: T("Mislukte aanmelding, drie pogingen", "Failed sign-in, three attempts"), waar: "-", ip: "185.44.…", ok: false },
    { tijd: "2026-08-22 15:48", wie: T("Ondersteuning NordX", "NordX support"), wat: T("Tijdelijke toegang, 45 minuten, ticket 2026-118", "Temporary access, 45 minutes, ticket 2026-118"), waar: T("Alle entiteiten", "All entities"), ip: "94.208.…", ok: true },
    { tijd: "2026-08-21 11:09", wie: "Harns Invest B.V.", wat: T("Eigenaarsafrekening juli bekeken", "Viewed the July owner statement"), waar: "Achmeatoren / IQON", ip: "62.194.…", ok: true }
  ];

  var API = {
    stamp: function () { return tab + "|" + rol; },
    click: function (e) {
      var t = U.hit(e, "data-ek-adm-tab"); if (t) { tab = t; return true; }
      var r = U.hit(e, "data-ek-adm-rol"); if (r) { rol = r; return true; }
      return false;
    },
    html: function () {
      var G = gebruikers();
      var body;
      if (tab === "rechten") body = rechtenTab();
      else if (tab === "audit") body = auditTab();
      else if (tab === "beveiliging") body = beveiligingTab();
      else if (tab === "privacy") body = privacyTab();
      else body = gebruikersTab(G);

      return U.head({
        eyebrow: T("Platform · beheer", "Platform · administration"),
        title: T("Beheer & toegang", "Admin & access"),
        intro: T("Rollen bundelen losse rechten, en die rechten worden begrensd op entiteit, portefeuille en gevoeligheid. Wie iets ziet dat gevoelig is, laat daar een spoor van achter. Ondersteuning kan alleen tijdelijk meekijken, met reden, zichtbare melding en een logregel; er is geen stille beheerdersstand.",
                 "Roles bundle individual rights, and those rights are bounded by entity, portfolio and sensitivity. Anyone who views something sensitive leaves a trace. Support can only look in temporarily, with a reason, a visible banner and a log entry; there is no silent administrator mode."),
        chip: T(G.length + " gebruikers · 8 rollen", G.length + " users · 8 roles")
      }) +
      U.kpis([
        [T("Gebruikers", "Users"), String(G.length), T("intern en extern samen", "internal and external combined")],
        [T("Tweefactor actief", "Two-factor active"), "100%", T("verplicht voor iedereen", "required for everyone")],
        [T("Rollen", "Roles"), String(ROLLEN.length), T("elk opgebouwd uit losse rechten", "each built from individual rights")],
        [T("Auditregels dit jaar", "Audit entries this year"), U.NUM(184620), T("onwijzigbaar bewaard", "stored immutably")],
        [T("Tijdelijke ondersteuningstoegang", "Temporary support access"), "1", T("afgelopen 90 dagen, 45 minuten", "in the last 90 days, 45 minutes")]
      ], 5) +
      '<div class="ek-mt">' + U.tabs([
        { id: "gebruikers", label: T("Gebruikers", "Users"), count: G.length },
        { id: "rechten", label: T("Rollen & rechten", "Roles & rights") },
        { id: "audit", label: T("Auditspoor", "Audit trail") },
        { id: "beveiliging", label: T("Beveiliging", "Security") },
        { id: "privacy", label: T("Privacy & bewaren", "Privacy & retention") }
      ], tab, "data-ek-adm-tab") + '</div>' + body;
    }
  };

  function rolNaam(id) {
    var r = ROLLEN.filter(function (x) { return x.id === id; })[0];
    return r ? T(r.nl, r.en) : id;
  }

  function gebruikersTab(G) {
    var rijen = G.map(function (g) {
      return [U.esc(g.naam) + '<br><span class="ek-sub">' + U.esc(g.org) + '</span>',
        U.chip(rolNaam(g.rol), g.org === T("Extern", "External") ? "info" : ""),
        U.esc(g.bereik),
        g.mfa ? U.chip(T("Actief", "Active"), "ok") : U.chip(T("Ontbreekt", "Missing"), "bad"),
        U.esc(g.laatst),
        U.btns([{ label: T("Rol wijzigen", "Change role") }, { label: T("Sessie beëindigen", "End session") }])];
    });
    return '<div class="ek-mt">' + U.panel(T("Gebruikers", "Users"),
      U.table([{ label: T("Naam", "Name") }, { label: T("Rol", "Role") }, { label: T("Bereik", "Scope") },
        { label: T("Tweefactor", "Two-factor") }, { label: T("Laatste aanmelding", "Last sign-in") }, { label: T("Actie", "Action") }], rijen),
      U.btns([{ label: T("Gebruiker toevoegen", "Add user"), primary: true }, { label: T("Tweefactor herstellen", "Reset two-factor") },
        { label: T("Deactiveren", "Deactivate"), danger: true }, { label: T("Exporteren", "Export") }])) +
      U.note(T("Externe gebruikers, van accountant tot bankreviewer, staan in dezelfde lijst als het eigen team. Dat is bewust: wie toegang heeft tot de gegevens hoort op één plek zichtbaar te zijn, ook als hij bij een ander bedrijf werkt.",
               "External users, from the accountant to the bank reviewer, appear in the same list as the internal team. That is deliberate: everyone with access to the data should be visible in one place, even when they work for another company.")) + '</div>';
  }

  function rechtenTab() {
    var idx = ROLLEN.map(function (r) { return r.id; }).indexOf(rol);
    var rijen = RECHTEN.map(function (r, i) {
      return ['<code style="font-size:11px">' + r.code + '</code>', T(r.nl, r.en),
        MATRIX[rol][i] ? U.chip(T("Toegestaan", "Allowed"), "ok") : U.chip(T("Niet toegestaan", "Not allowed"), ""),
        MATRIX[rol][i] ? (r.code.indexOf("pii") !== -1 || r.code.indexOf("kyc") !== -1 ? T("Gelogd bij elke raadpleging", "Logged on every view") : T("Binnen het toegewezen bereik", "Within the assigned scope")) : "-"];
    });
    return '<div class="ek-mt ek-flow">' + ROLLEN.map(function (r) {
      return '<button type="button" class="ek-tab' + (r.id === rol ? " ek-on" : "") + '" data-ek-adm-rol="' + r.id + '">' + T(r.nl, r.en) + '</button>';
    }).join("") + '</div>' +
    '<div class="ek-mt ek-g ek-split">' +
    U.panel(T("Rechten van ", "Rights of ") + rolNaam(rol),
      U.table([{ label: T("Recht", "Right") }, { label: T("Betekenis", "Meaning") }, { label: T("Status", "Status") }, { label: T("Begrenzing", "Bounded by") }], rijen),
      U.btns([{ label: T("Recht toevoegen", "Add right") }, { label: T("Rol dupliceren", "Duplicate role") }, { label: T("Opslaan", "Save"), primary: true }])) +
    U.panel(T("Begrenzing op inhoud", "Bounding on content"), '<div class="ek-panel-body">' + U.kv([
      [T("Entiteit", "Legal entity"), T("welke BV's mag deze rol zien", "which companies this role may see")],
      [T("Portefeuille", "Portfolio"), T("bijvoorbeeld alleen Friesland", "for example Friesland only")],
      [T("Object en unit", "Property and unit"), T("bijvoorbeeld alleen de eigen objecten", "for example only their own properties")],
      [T("Gevoeligheid", "Sensitivity"), T("huurdergegevens en KYC apart afgeschermd", "tenant data and KYC shielded separately")],
      [T("Periode", "Period"), T("toegang met einddatum, bijvoorbeeld voor een bankreviewer", "access with an end date, for example for a bank reviewer")]
    ]) + '<p class="ek-mt-s ek-note">' + T("Een rol is een bundel rechten, geen controle in de code. Zodra ergens staat dat iemand iets mag omdat hij toevallig beheerder heet, is het niet meer te onderhouden en niet meer uit te leggen aan een auditor.",
      "A role is a bundle of rights, not a check in the code. The moment something is allowed because a person happens to be called an administrator, it stops being maintainable and stops being explainable to an auditor.") + '</p></div>') +
    '</div>';
  }

  function auditTab() {
    var rijen = AUDIT.map(function (a) {
      return [a.tijd, U.esc(a.wie), U.esc(a.wat), U.esc(a.waar), a.ip,
        a.ok ? U.chip(T("Geslaagd", "Succeeded"), "ok") : U.chip(T("Mislukt", "Failed"), "bad")];
    });
    return '<div class="ek-mt">' + U.panel(T("Auditspoor", "Audit trail"),
      U.table([{ label: T("Tijdstip", "Time") }, { label: T("Wie", "Who") }, { label: T("Wat", "What") },
        { label: T("Waar", "Where") }, { label: "IP" }, { label: T("Uitkomst", "Outcome") }], rijen),
      U.btns([{ label: T("Filteren", "Filter"), primary: true }, { label: T("Verschil tonen", "Show diff") }, { label: T("Exporteren", "Export") }])) +
      '<div class="ek-mt ek-g ek-split">' +
      U.panel(T("Wat wordt vastgelegd", "What is recorded"), '<div class="ek-panel-body">' + U.kv([
        [T("Aanmelden", "Sign-in"), T("geslaagd en mislukt", "successful and failed")],
        [T("Inzage gevoelige gegevens", "Viewing sensitive data"), T("huurdergegevens, KYC, bankdetail", "tenant data, KYC, bank detail")],
        [T("Boekingen", "Postings"), T("aanmaken, boeken, storneren", "create, post, reverse")],
        [T("Betalingen", "Payments"), T("goedkeuren en indienen", "approve and submit")],
        [T("Rechten", "Permissions"), T("elke wijziging, met waarde ervoor en erna", "every change, with before and after values")],
        [T("Delen", "Sharing"), T("verlenen en intrekken van toestemming", "granting and revoking consent")],
        [T("Export", "Export"), T("wie welk bestand meenam", "who took which file")],
        [T("Ondersteuning", "Support"), T("reden, duur en elke handeling", "reason, duration and every action")]
      ]) + '</div>') +
      U.ai(T("Wat opvalt in het spoor", "What stands out in the trail"),
        T("Drie mislukte aanmeldpogingen vanaf één adres in de nacht van 23 augustus. Het account bestond niet, dus er is niets gebeurd, maar het patroon is de moeite van het blokkeren waard. Verder: de bankreviewer heeft precies één document gedownload en zijn toegang verloopt op 30 november; dat hoeft niemand handmatig af te sluiten.",
          "Three failed sign-in attempts from one address during the night of 23 August. The account did not exist, so nothing happened, but the pattern is worth blocking. Beyond that: the bank reviewer downloaded exactly one document and their access expires on 30 November; nobody has to close that off by hand.")) +
      '</div></div>';
  }

  function beveiligingTab() {
    var punten = [
      ["Tweefactor verplicht voor alle gebruikers", "Two-factor required for all users", true],
      ["Eenmalige aanmelding via OIDC of SAML", "Single sign-on through OIDC or SAML", true],
      ["Passkeys als sterker alternatief", "Passkeys as a stronger alternative", true],
      ["Extra bevestiging bij betalen, exporteren en rechten wijzigen", "Step-up confirmation for payments, exports and permission changes", true],
      ["Versleuteling onderweg en in opslag", "Encryption in transit and at rest", true],
      ["Sleutelbeheer in een aparte kluis", "Key management in a separate vault", true],
      ["Scheiding tussen ontwikkel-, test- en productieomgeving", "Separation of development, test and production", true],
      ["Back-ups met herstel op een tijdstip", "Backups with point-in-time recovery", true],
      ["Herstel jaarlijks getest, niet alleen ingericht", "Restore tested annually, not merely configured", true],
      ["Virusscan op elk geüpload bestand", "Virus scanning on every uploaded file", true],
      ["Sessieoverzicht met de mogelijkheid om af te melden", "Session overview with remote sign-out", true],
      ["Ondertekende webhooks met herhaalbeveiliging", "Signed webhooks with replay protection", true],
      ["Jaarlijkse penetratietest door een externe partij", "Annual penetration test by an external party", false],
      ["Draaiboek voor een datalek, inclusief meldtermijn", "Runbook for a data breach, including the notification deadline", true]
    ];
    return '<div class="ek-mt ek-g ek-split">' +
      U.panel(T("Beveiligingsbasis", "Security baseline"), '<div class="ek-panel-body">' +
        punten.map(function (p) {
          return '<label class="ek-check"><input type="checkbox" ' + (p[2] ? "checked" : "") + ' disabled> ' + T(p[0], p[1]) +
            (p[2] ? "" : ' <span class="ek-sub">· ' + T("gepland voor het vierde kwartaal", "planned for the fourth quarter") + '</span>') + '</label>';
        }).join("") + '</div>') +
      U.panel(T("Ondersteuningstoegang", "Support access"), '<div class="ek-panel-body">' +
        U.flow([T("Verzoek", "Request"), T("Organisatie keurt goed", "Organisation approves"), T("Reden en einddatum vastgelegd", "Reason and expiry recorded"),
          T("Tijdelijke sessie", "Temporary session"), T("Alles gelogd", "Everything logged")], 4) +
        '<div class="ek-mt-s">' + U.kv([
          [T("Maximale duur", "Maximum duration"), T("4 uur, daarna automatisch beëindigd", "4 hours, then ended automatically")],
          [T("Zichtbaarheid", "Visibility"), T("banner in beeld voor alle gebruikers van die organisatie", "a banner visible to all users of that organisation")],
          [T("Zonder goedkeuring", "Without approval"), T("niet mogelijk, ook niet voor de platformbeheerder", "not possible, not even for the platform administrator")],
          [T("Laatste keer gebruikt", "Last used"), U.DATE("2026-08-22") + " · " + T("45 minuten, ticket 2026-118", "45 minutes, ticket 2026-118")]
        ]) + '</div></div>') +
      '</div>';
  }

  function privacyTab() {
    var rijen = [
      [T("Huurdergegevens", "Tenant data"), T("Uitvoering van de huurovereenkomst", "Performance of the lease"), T("7 jaar na einde huur", "7 years after the lease ends"), T("Beheer, financiën", "Management, finance")],
      [T("Kandidaatgegevens", "Candidate data"), T("Precontractuele fase", "Pre-contractual stage"), T("12 maanden na afwijzing", "12 months after rejection"), T("Verhuur", "Leasing")],
      [T("Leveranciersgegevens", "Supplier data"), T("Uitvoering overeenkomst", "Performance of a contract"), T("7 jaar", "7 years"), T("Techniek, financiën", "Technical, finance")],
      [T("Investeerdersgegevens en KYC", "Investor data and KYC"), T("Wettelijke verplichting", "Legal obligation"), T("5 jaar na einde relatie", "5 years after the relationship ends"), T("Directie, compliance", "Board, compliance")],
      [T("Camerabeelden algemene ruimten", "CCTV in common areas"), T("Gerechtvaardigd belang", "Legitimate interest"), T("4 weken", "4 weeks"), T("Techniek", "Technical")],
      [T("Correspondentie", "Correspondence"), T("Uitvoering en dossiervorming", "Performance and record keeping"), T("7 jaar", "7 years"), T("Beheer", "Management")]
    ];
    return '<div class="ek-mt">' + U.panel(T("Verwerkingen", "Processing activities"),
      U.table([{ label: T("Gegevens", "Data") }, { label: T("Grondslag", "Legal basis") }, { label: T("Bewaartermijn", "Retention") },
        { label: T("Wie heeft toegang", "Who has access") }], rijen),
      U.btns([{ label: T("Verwerkersregister", "Processor register") }, { label: T("Verwerkersovereenkomsten", "Processing agreements") },
        { label: T("Inzageverzoek behandelen", "Handle an access request"), primary: true }, { label: T("Exporteren", "Export") }])) +
      '<div class="ek-mt ek-g ek-split">' +
      U.panel(T("Bij een datalek", "In case of a data breach"), '<div class="ek-panel-body">' +
        U.flow([T("Vaststellen", "Detect"), T("Indammen", "Contain"), T("Beoordelen risico", "Assess risk"),
          T("Melden binnen 72 uur", "Notify within 72 hours"), T("Betrokkenen informeren", "Inform data subjects"), T("Evalueren", "Review")], 0) +
        '<p class="ek-mt-s ek-p">' + T("Het draaiboek staat vast en de rollen zijn belegd voordat er iets gebeurt. Een verwerker meldt aan de verwerkingsverantwoordelijke, niet aan de toezichthouder; die volgorde staat in de verwerkersovereenkomst.",
          "The runbook is fixed and the roles are assigned before anything happens. A processor notifies the controller, not the supervisory authority; that order is set out in the processing agreement.") + '</p></div>') +
      U.ai(T("Waarom dit hier staat en niet in een handleiding", "Why this sits here and not in a manual"),
        T("Een platform dat huurdergegevens, bankdetails en KYC-dossiers samenbrengt, is een serieuze verwerking. De grondslag per gegevenssoort, de bewaartermijn en de vraag wie erbij kan, horen daarom in het product zichtbaar te zijn en niet alleen in een document dat één keer per jaar wordt geopend.",
          "A platform that brings together tenant data, bank details and KYC files is a serious processing operation. The legal basis per data type, the retention period and the question of who can reach it therefore belong visibly in the product, not only in a document opened once a year.")) +
      '</div></div>';
  }

  U.mount("ek-admin-root", API);
})();
