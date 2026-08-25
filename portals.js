/* Zes portalen uit één raamwerk: huurder, eigenaar/investeerder, leverancier,
   makelaar, accountant en bank. Per rol wat die ziet, mag en kan aanklikken.
   Wordt onder het bestaande toegangsoverzicht gehangen. */
(function () {
  var U = window.EKUI, T = U.T;
  var portaal = "huurder", tab = "beeld", uitnodiging = {};

  function pad() {
    return window.__EK_PATH ? window.__EK_PATH() : (window.__EK_PATH?window.__EK_PATH():location.pathname);
  }

  var PORTALEN = [
    { id: "huurder", nl: "Huurder", en: "Tenant", gebruikers: 541, actief: 388,
      ziet: [["Eigen huurcontract en huurspecificatie", "Own lease and rent breakdown"],
             ["Facturen, betalingen en openstaand saldo", "Invoices, payments and outstanding balance"],
             ["Servicekostenafrekening met toelichting", "Service charge settlement with notes"],
             ["Eigen meldingen met status en foto's", "Own issues with status and photos"],
             ["Documenten: contract, opnamestaat, huisregels", "Documents: lease, condition report, house rules"],
             ["Berichten met de beheerder", "Messages with the manager"]],
      knoppen: [["Betalen", "Pay"], ["Factuur downloaden", "Download invoice"], ["Melding maken", "Report an issue"],
                ["Foto toevoegen", "Add a photo"], ["Bericht sturen", "Message the manager"],
                ["Huurcontract downloaden", "Download the lease"], ["Servicekosten bekijken", "View service charges"],
                ["Gegevens wijzigen", "Update my details"]],
      niet: ["Andere huurders, de exploitatiecijfers van het gebouw en alles van de eigenaar.",
             "Other tenants, the building's operating figures and anything belonging to the owner."] },
    { id: "eigenaar", nl: "Eigenaar & investeerder", en: "Owner & investor", gebruikers: 12, actief: 11,
      ziet: [["Eigen objecten met waarde en bezetting", "Own properties with value and occupancy"],
             ["Maandelijkse eigenaarsafrekening", "Monthly owner statement"],
             ["Exploitatieresultaat en NOI per object", "Operating result and NOI per property"],
             ["Budget tegen werkelijk en capexprogramma", "Budget against actual and the capex programme"],
             ["Taxaties en energielabels", "Valuations and energy labels"],
             ["Uitkeringen en toezeggingen in het vehikel", "Distributions and commitments in the vehicle"]],
      knoppen: [["Object bekijken", "View property"], ["Afrekening downloaden", "Download statement"],
                ["Budget bekijken", "View budget"], ["NOI bekijken", "View NOI"], ["Taxatie bekijken", "View valuation"],
                ["Dataroom openen", "Open data room"], ["Vraag stellen", "Ask a question"], ["Exporteren", "Export"]],
      niet: ["Huurdergegevens van andere eigenaren en de administratie van entiteiten waar hij niet in deelneemt.",
             "Tenant data of other owners and the ledgers of entities they do not participate in."] },
    { id: "leverancier", nl: "Leverancier", en: "Supplier", gebruikers: 34, actief: 27,
      ziet: [["Toegewezen werkorders met adres en contact", "Assigned work orders with address and contact"],
             ["Afgesproken tarieven en raamovereenkomst", "Agreed rates and framework agreement"],
             ["Planning en afgesproken doorlooptijd", "Schedule and agreed response time"],
             ["Eigen ingediende facturen en betaalstatus", "Own submitted invoices and payment status"],
             ["Installatiegegevens en onderhoudshistorie", "Installation data and maintenance history"]],
      knoppen: [["Werkorder aannemen", "Accept work order"], ["Weigeren", "Decline"], ["Datum voorstellen", "Propose a date"],
                ["Offerte uploaden", "Upload quote"], ["Starten", "Start"], ["Foto toevoegen", "Add photo"],
                ["Gereedmelden", "Complete"], ["Factuur indienen", "Submit invoice"]],
      niet: ["Werkorders van andere leveranciers, huurgegevens en alles wat met geld van de eigenaar te maken heeft.",
             "Work orders of other suppliers, rent data and anything to do with the owner's money."] },
    { id: "makelaar", nl: "Makelaar", en: "Broker", gebruikers: 6, actief: 4,
      ziet: [["Aan hem toegewezen leegstand", "Vacancies assigned to them"],
             ["Vraaghuur, oppervlakte en beschikbaarheid", "Asking rent, floor area and availability"],
             ["Eigen aangebrachte kandidaten met status", "Own introduced candidates with status"],
             ["Advertentiemateriaal en plattegronden", "Listing material and floor plans"],
             ["Bezichtigingsagenda", "Viewing schedule"]],
      knoppen: [["Kandidaat aanmelden", "Register a candidate"], ["Bezichtiging plannen", "Schedule a viewing"],
                ["Stukken uploaden", "Upload documents"], ["Aanbod doorgeven", "Pass on an offer"],
                ["Materiaal downloaden", "Download material"], ["Status bekijken", "Check status"]],
      niet: ["Kandidaten van andere makelaars, de huurhistorie van zittende huurders en de financiering van het object.",
             "Candidates of other brokers, the rent history of sitting tenants and the financing of the property."] },
    { id: "accountant", nl: "Accountant", en: "Accountant", gebruikers: 3, actief: 3,
      ziet: [["Grootboek, dagboeken en journaalposten", "Ledger, journals and journal entries"],
             ["Proefbalans en jaarstukken per entiteit", "Trial balance and annual accounts per entity"],
             ["Btw-aangiften met aansluiting", "VAT returns with the reconciliation"],
             ["Bankmutaties en afletterstatus", "Bank transactions and matching status"],
             ["Onderliggende facturen en documenten", "Underlying invoices and documents"]],
      knoppen: [["Periode openen", "Open a period"], ["Auditbestand exporteren", "Export audit file"],
                ["Proefbalans downloaden", "Download trial balance"], ["Vraag stellen bij een post", "Query a posting"],
                ["Document opvragen", "Request a document"], ["Jaarstukken samenstellen", "Compile annual accounts"]],
      niet: ["Persoonsgegevens van huurders die niet nodig zijn voor de jaarrekening, en de netwerkcijfers van andere organisaties.",
             "Tenant personal data not needed for the accounts, and the network figures of other organisations."] },
    { id: "bank", nl: "Bank & financier", en: "Bank & lender", gebruikers: 4, actief: 2,
      ziet: [["Alleen het vrijgegeven financieringspakket", "Only the released financing pack"],
             ["Huurlijst, historische NOI en waarderingen", "Rent roll, historic NOI and valuations"],
             ["Convenantrapportage met ruimte tot de grens", "Covenant report with headroom to the limit"],
             ["Zekerheden, bestaande schuld en aflosschema", "Security, existing debt and amortisation schedule"],
             ["Energielabels en capexprogramma", "Energy labels and the capex programme"]],
      knoppen: [["Pakket bekijken", "View the pack"], ["Document opvragen", "Request a document"],
                ["Vraag stellen", "Ask a question"], ["Vrijgegeven bestanden downloaden", "Download released files"],
                ["Termsheet uploaden", "Upload a term sheet"]],
      niet: ["Huurdergegevens, bankmutaties, correspondentie en elk object dat de eigenaar niet expliciet heeft vrijgegeven.",
             "Tenant data, bank transactions, correspondence and any property the owner has not explicitly released."] }
  ];

  function beeld(id) {
    if (id === "huurder") {
      return { titel: T("Wat de huurder ziet", "What the tenant sees"),
        kpi: [[T("Huur per maand", "Rent per month"), "€ 1.145"], [T("Openstaand", "Outstanding"), "€ 0"],
              [T("Open meldingen", "Open issues"), "1"], [T("Volgende incasso", "Next collection"), U.DATE("2026-09-01")]],
        rijen: [[T("Factuur 2026-09-0412", "Invoice 2026-09-0412"), U.DATE("2026-09-01"), "€ 1.207", U.chip(T("Automatisch geïncasseerd", "Collected by direct debit"), "ok")],
                [T("Melding: kraan lekt in de keuken", "Issue: dripping tap in the kitchen"), U.DATE("2026-08-22"), "-", U.chip(T("Vakman ingepland 27-08", "Contractor scheduled 27 Aug"), "info")],
                [T("Servicekostenafrekening 2025", "Service charge settlement 2025"), U.DATE("2026-06-30"), "- € 84", U.chip(T("Terugbetaald", "Refunded"), "ok")]],
        kop: [T("Onderwerp", "Item"), T("Datum", "Date"), T("Bedrag", "Amount"), T("Status", "Status")] };
    }
    if (id === "eigenaar") {
      return { titel: T("Wat de eigenaar ziet", "What the owner sees"),
        kpi: [[T("Eigen objecten", "Own properties"), "1"], [T("Aandeel", "Share"), "45%"],
              [T("NOI dit jaar", "NOI this year"), "€ 1.842k"], [T("Laatste uitkering", "Last distribution"), "€ 96.400"]],
        rijen: [["Achmeatoren / IQON", T("Bezetting 93,1%", "Occupancy 93.1%"), "€ 38,6 mln", U.chip(T("Taxatie mei 2026", "Valued May 2026"), "")],
                [T("Eigenaarsafrekening juli", "Owner statement July"), U.DATE("2026-08-05"), "€ 96.400", U.chip(T("Uitbetaald", "Paid out"), "ok")],
                [T("Capexprogramma verduurzaming", "Capex programme, sustainability"), T("start september", "starts September"), "€ 2,1 mln", U.chip(T("Goedkeuring gevraagd", "Approval requested"), "warn")]],
        kop: [T("Onderwerp", "Item"), T("Toelichting", "Detail"), T("Bedrag", "Amount"), T("Status", "Status")] };
    }
    if (id === "leverancier") {
      return { titel: T("Wat de leverancier ziet", "What the supplier sees"),
        kpi: [[T("Open werkorders", "Open work orders"), "6"], [T("Deze week gepland", "Scheduled this week"), "4"],
              [T("Ingediend, nog niet betaald", "Submitted, not yet paid"), "€ 12.480"], [T("Reactietijd", "Response time"), "0,8 " + T("dag", "day")]],
        rijen: [["WO 2026-0431 · Dockumer Sluys 12", T("Kraan lekt in de keuken", "Dripping tap in the kitchen"), U.DATE("2026-08-27"), U.chip(T("Aangenomen", "Accepted"), "ok")],
                ["WO 2026-0428 · Achmeatoren", T("Storing luchtbehandeling verdieping 4", "Air handling fault, floor 4"), U.DATE("2026-08-26"), U.chip(T("Offerte gevraagd", "Quote requested"), "warn")],
                ["WO 2026-0419 · Grand Café Wald", T("Jaarlijkse keuring cv", "Annual boiler inspection"), U.DATE("2026-09-03"), U.chip(T("Ingepland", "Scheduled"), "info")]],
        kop: [T("Werkorder", "Work order"), T("Omschrijving", "Description"), T("Datum", "Date"), T("Status", "Status")] };
    }
    if (id === "makelaar") {
      return { titel: T("Wat de makelaar ziet", "What the broker sees"),
        kpi: [[T("Toegewezen units", "Assigned units"), "4"], [T("Eigen kandidaten", "Own candidates"), "3"],
              [T("Bezichtigingen deze week", "Viewings this week"), "2"], [T("Gemiddelde doorlooptijd", "Average time to let"), "38 " + T("dagen", "days")]],
        rijen: [[T("Achmeatoren, vijfde verdieping vleugel B", "Achmeatoren, fifth floor wing B"), "640 m²", "€ 8.900", U.chip(T("4 kandidaten", "4 candidates"), "info")],
                [T("Trije Hûs, tweede verdieping", "Trije Hûs, second floor"), "212 m²", "€ 2.450", U.chip(T("In onderhandeling", "In negotiation"), "warn")],
                [T("Casa Velha nr. 3", "Casa Velha no. 3"), "64 m²", "€ 985", U.chip(T("Bezichtiging 28-08", "Viewing 28 Aug"), "")]],
        kop: [T("Unit", "Unit"), T("Oppervlak", "Area"), T("Vraaghuur", "Asking rent"), T("Status", "Status")] };
    }
    if (id === "accountant") {
      return { titel: T("Wat de accountant ziet", "What the accountant sees"),
        kpi: [[T("Entiteiten", "Entities"), "3"], [T("Open periode", "Open period"), U.MONTH("2026-08-01")],
              [T("Ongeletterde mutaties", "Unmatched transactions"), "7"], [T("Vragen open", "Open queries"), "2"]],
        rijen: [[T("Proefbalans EYE Vastgoed B.V.", "Trial balance EYE Vastgoed B.V."), U.MONTH("2026-07-01"), "€ 102.793.200", U.chip(T("Sluit", "Reconciles"), "ok")],
                [T("Btw-aangifte juli", "VAT return July"), U.DATE("2026-08-31"), "€ 290.620", U.chip(T("Ter controle", "For review"), "warn")],
                [T("Vraag bij MEM 2026-08-002", "Query on MEM 2026-08-002"), U.DATE("2026-08-19"), "€ 18.400", U.chip(T("Wacht op antwoord", "Awaiting answer"), "info")]],
        kop: [T("Onderwerp", "Item"), T("Periode", "Period"), T("Bedrag", "Amount"), T("Status", "Status")] };
    }
    return { titel: T("Wat de bank ziet", "What the lender sees"),
      kpi: [[T("Vrijgegeven objecten", "Released properties"), "2"], [T("Vrijgegeven waarde", "Value released"), "€ 45 mln"],
            [T("Toegang tot", "Access until"), U.DATE("2026-11-30")], [T("Documenten", "Documents"), "13"]],
      rijen: [["Achmeatoren / IQON", T("Huurlijst, taxatie, NOI", "Rent roll, valuation, NOI"), "€ 38,6 mln", U.chip(T("Volledig", "Complete"), "ok")],
              ["Basic-Fit Dokkum", T("Huurlijst, taxatie", "Rent roll, valuation"), "€ 6,4 mln", U.chip(T("Volledig", "Complete"), "ok")],
              [T("Convenantrapportage Q2", "Covenant report Q2"), T("LTV 44,2% · DSCR 1,94", "LTV 44.2% · DSCR 1.94"), "-", U.chip(T("Binnen de grenzen", "Within limits"), "ok")]],
      kop: [T("Onderdeel", "Item"), T("Inhoud", "Contents"), T("Waarde", "Value"), T("Status", "Status")] };
  }

  var API = {
    stamp: function () { return portaal + "|" + tab + "|" + Object.keys(uitnodiging).join(","); },
    click: function (e) {
      var p = U.hit(e, "data-ek-por-p"); if (p) { portaal = p; return true; }
      var t = U.hit(e, "data-ek-por-tab"); if (t) { tab = t; return true; }
      var i = U.hit(e, "data-ek-por-uit"); if (i) { uitnodiging[i] = 1; return true; }
      return false;
    },
    html: function () {
      var P = PORTALEN.filter(function (x) { return x.id === portaal; })[0];
      var B = beeld(portaal);
      var gebruikers = PORTALEN.reduce(function (s, p) { return s + p.gebruikers; }, 0);
      var actief = PORTALEN.reduce(function (s, p) { return s + p.actief; }, 0);

      var body;
      if (tab === "rechten") body = rechtenTab(P);
      else if (tab === "beheer") body = beheerTab();
      else body = beeldTab(P, B);

      return '<div style="height:1px;background:#d9ddd6;margin:32px 0 26px"></div>' + U.head({
        eyebrow: T("Deelnemers · portalen", "Participants · portals"),
        title: T("Zes portalen, één raamwerk", "Six portals, one framework"),
        intro: T("Huurder, eigenaar, leverancier, makelaar, accountant en bank kijken allemaal in hetzelfde systeem, maar zien alleen wat bij hun rol hoort. Er is geen aparte portaalsoftware met een eigen kopie van de gegevens: wat de beheerder wijzigt, staat een seconde later in het portaal, en wat een leverancier afmeldt, staat direct op de werkorder.",
                 "Tenant, owner, supplier, broker, accountant and lender all look into the same system, but each sees only what belongs to their role. There is no separate portal application with its own copy of the data: what the manager changes is in the portal a second later, and what a supplier completes lands straight on the work order."),
        chip: T(actief + " van " + gebruikers + " uitgenodigd actief", actief + " of " + gebruikers + " invited are active")
      }) +
      U.kpis([
        [T("Portalen", "Portals"), String(PORTALEN.length), T("uit hetzelfde raamwerk", "from the same framework")],
        [T("Uitgenodigde gebruikers", "Invited users"), U.NUM(gebruikers), T("huurders, partners en dienstverleners", "tenants, partners and service providers")],
        [T("Actief", "Active"), U.NUM(actief), U.PCT(actief / gebruikers * 100, 0) + T(" logt in", " sign in"), actief / gebruikers * 100],
        [T("Tweefactor", "Two-factor"), "100%", T("verplicht voor elk portaal", "required for every portal")],
        [T("Kosten per portaalgebruiker", "Cost per portal user"), "€ 0", T("portalen zitten in het platform", "portals are part of the platform")]
      ], 5) +
      '<div class="ek-mt ek-flow">' + PORTALEN.map(function (p) {
        return '<button type="button" class="ek-tab' + (p.id === portaal ? " ek-on" : "") + '" data-ek-por-p="' + p.id + '">' +
          U.esc(T(p.nl, p.en)) + " · " + p.gebruikers + '</button>';
      }).join("") + '</div>' +
      '<div class="ek-mt">' + U.tabs([
        { id: "beeld", label: T("Wat de rol ziet", "What the role sees") },
        { id: "rechten", label: T("Rechten & grenzen", "Rights & limits") },
        { id: "beheer", label: T("Portaalbeheer", "Portal management") }
      ], tab, "data-ek-por-tab") + '</div>' + body;
    }
  };

  function beeldTab(P, B) {
    return '<div class="ek-mt">' + U.panel(B.titel + " · " + T(P.nl, P.en),
      '<div class="ek-panel-body">' +
      '<section class="ek-g ek-g4">' + B.kpi.map(function (k) {
        return '<article class="ek-card ek-card-tight"><p class="ek-lbl">' + U.esc(k[0]) + '</p><p class="ek-val" style="font-size:18px">' + U.esc(k[1]) + '</p></article>';
      }).join("") + '</section>' +
      '<div class="ek-mt-s">' + U.table(B.kop.map(function (k) { return { label: k }; }),
        B.rijen.map(function (r) { return r; })) + '</div>' +
      '<div class="ek-mt-s"><p class="ek-lbl">' + T("Knoppen in dit portaal", "Buttons in this portal") + '</p><div class="ek-mt-s">' +
      U.btns(P.knoppen.map(function (k, i) { return { label: T(k[0], k[1]), primary: i === 0 }; })) + '</div></div>' +
      '</div>') + '</div>';
  }

  function rechtenTab(P) {
    return '<div class="ek-mt ek-g ek-split">' +
      U.panel(T("Ziet wel", "Can see"), '<div class="ek-panel-body">' +
        P.ziet.map(function (z) { return '<label class="ek-check"><input type="checkbox" checked disabled> ' + T(z[0], z[1]) + '</label>'; }).join("") + '</div>') +
      U.panel(T("Ziet niet", "Cannot see"), '<div class="ek-panel-body">' +
        '<p class="ek-p">' + T(P.niet[0], P.niet[1]) + '</p>' +
        '<div class="ek-mt-s">' + U.kv([
          [T("Grondslag", "Basis"), T("rol plus begrenzing op object, entiteit en gevoeligheid", "role plus bounds on property, entity and sensitivity")],
          [T("Vervaldatum", "Expiry"), portaal === "bank" ? U.DATE("2026-11-30") : T("zolang de relatie loopt", "for as long as the relationship lasts")],
          [T("Gelogd", "Logged"), T("elke inzage van gevoelige gegevens en elke download", "every view of sensitive data and every download")],
          [T("Intrekken", "Revoke"), T("per direct, het auditspoor blijft", "immediate, the audit trail remains")]
        ]) + '</div></div>') +
      '</div>' +
      U.note(T("De portalen delen één rechtenmodel met de rest van het platform. Een leverancier die ook huurder is, logt één keer in en ziet beide rollen naast elkaar; er ontstaat geen tweede account met een eigen wachtwoord dat niemand meer bijhoudt.",
               "The portals share one permission model with the rest of the platform. A supplier who is also a tenant signs in once and sees both roles side by side; there is no second account with its own password that nobody maintains."));
  }

  function beheerTab() {
    var rijen = PORTALEN.map(function (p) {
      var uit = uitnodiging[p.id];
      return [T(p.nl, p.en), '<span class="ek-num">' + p.gebruikers + '</span>', '<span class="ek-num">' + (p.actief + (uit ? 1 : 0)) + '</span>',
        '<div class="ek-bar' + (p.actief / p.gebruikers < 0.6 ? " ek-bar-red" : " ek-bar-ok") + '"><span style="width:' + Math.round(p.actief / p.gebruikers * 100) + '%"></span></div>',
        p.id === "bank" ? U.chip(U.DATE("2026-11-30"), "warn") : U.chip(T("Doorlopend", "Ongoing"), ""),
        U.btns([{ label: uit ? T("Uitnodiging verstuurd", "Invitation sent") : T("Uitnodigen", "Invite"), primary: !uit, attr: 'data-ek-por-uit="' + p.id + '"' },
          { label: T("Bekijken als", "Preview as") }, { label: T("Intrekken", "Revoke"), danger: true }])];
    });
    return '<div class="ek-mt">' + U.panel(T("Portaalbeheer", "Portal management"),
      U.table([{ label: T("Portaal", "Portal") }, { label: T("Uitgenodigd", "Invited"), num: true }, { label: T("Actief", "Active"), num: true },
        { label: T("Gebruik", "Usage") }, { label: T("Geldigheid", "Validity") }, { label: T("Actie", "Action") }], rijen),
      U.btns([{ label: T("Huisstijl instellen", "Configure branding"), primary: true }, { label: T("Uitnodiging opnieuw sturen", "Resend invitation") },
        { label: T("Sessies bekijken", "View sessions") }, { label: T("Exporteren", "Export") }])) +
      U.ai(T("Wat opvalt in het gebruik", "What stands out in the usage"),
        T("Van de 541 huurders logt 72% in; de rest belt of mailt nog. Dat is geen probleem, maar wel de plek waar de meeste tijd te winnen valt: een melding via het portaal komt met object, unit en foto binnen, een melding per telefoon kost drie vragen voordat duidelijk is waar het over gaat. De makelaars zijn de kleinste groep en tegelijk de groep die het portaal het vaakst opent.",
          "Of the 541 tenants, 72% sign in; the rest still phone or email. That is not a problem, but it is where most time can be saved: an issue reported through the portal arrives with property, unit and photo attached, while one reported by phone costs three questions before it is clear what it is about. The brokers are the smallest group and at the same time the group that opens the portal most often.")) + '</div>';
  }

  /* De app rendert /portals zelf; deze werkruimte komt eronder te hangen. */
  function haak() {
    if (pad().replace(/\/$/, "") !== "/portals") return;
    var main = document.querySelector("main");
    if (!main) return;
    if (document.getElementById("ek-portals-root")) return;
    var d = document.createElement("div");
    d.id = "ek-portals-root";
    d.className = "px-5 pb-12 lg:px-8";
    main.appendChild(d);
  }

  var wacht = false;
  function start() {
    if (!document.body) return setTimeout(start, 20);
    haak();
    new MutationObserver(function () {
      if (wacht) return;
      wacht = true;
      requestAnimationFrame(function () { wacht = false; haak(); });
    }).observe(document.body, { childList: true, subtree: true });
  }
  start();
  U.mount("ek-portals-root", API);
})();
