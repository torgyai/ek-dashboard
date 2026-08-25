/* Relaties: één partijmodel met rollen in plaats van losse lijsten met
   huurders, eigenaren, leveranciers en makelaars. Met dossier, portaaltoegang,
   dubbelherkenning en een AVG-tabblad. Tweetalig. */
(function () {
  var U = window.EKUI, T = U.T;
  var rol = "alle", open = "synergy", tab = "overzicht", uitnodigingen = {};

  var ROLLEN = [
    { id: "alle", nl: "Alle", en: "All" },
    { id: "huurder", nl: "Huurder", en: "Tenant" },
    { id: "eigenaar", nl: "Eigenaar", en: "Owner" },
    { id: "investeerder", nl: "Investeerder", en: "Investor" },
    { id: "leverancier", nl: "Leverancier", en: "Supplier" },
    { id: "makelaar", nl: "Makelaar", en: "Broker" },
    { id: "accountant", nl: "Accountant", en: "Accountant" },
    { id: "bank", nl: "Bank", en: "Bank" }
  ];
  function rolNaam(id) {
    for (var i = 0; i < ROLLEN.length; i++) if (ROLLEN[i].id === id) return T(ROLLEN[i].nl, ROLLEN[i].en);
    return id;
  }

  function partijen() {
    return [
      { id: "synergy", naam: "Synergy Installatietechniek", soort: "org", kvk: "01098344", plaats: "Dokkum",
        contact: "Jelke Wijnstra", mail: "jelke@synergy-installatie.nl", rollen: ["leverancier"], portaal: true,
        omzet: 184600, open: 12480, objecten: 23, contracten: 4, sinds: "2011",
        notitie: T("Vaste installateur voor cv, water en elektra. Reageert doorgaans binnen een dag op een werkorder.",
                   "Regular contractor for heating, water and electrics. Usually responds to a work order within a day.") },
      { id: "bouwteam", naam: T("Bouwteam EYE", "Bouwteam EYE"), soort: "org", kvk: "-", plaats: "Dokkum",
        contact: "Sietse Talsma", mail: "-", rollen: ["leverancier"], portaal: true,
        omzet: 402100, open: 0, objecten: 31, contracten: 1, sinds: "2016",
        notitie: T("Het eigen bouwteam. Werkorders lopen intern, maar wel met dezelfde urenregistratie en kostprijs als externe partijen.",
                   "The in-house building team. Work orders run internally, but with the same time recording and cost price as external parties.") },
      { id: "dijkstra", naam: "Dijkstra Draisma", soort: "org", kvk: "01035577", plaats: "Dokkum / Bolsward",
        contact: "-", mail: "-", rollen: ["leverancier"], portaal: false,
        omzet: 1264000, open: 96400, objecten: 6, contracten: 2, sinds: "2019",
        notitie: T("Grote verbouwingen en casco-ingrepen. Werkt met vaste staffels per project en levert altijd een revisiedossier op.",
                   "Larger refurbishments and structural work. Works with fixed project stages and always delivers an as-built file.") },
      { id: "harns", naam: "Harns Invest B.V.", soort: "org", kvk: "62880144", plaats: "Harlingen",
        contact: "-", mail: "-", rollen: ["eigenaar", "investeerder"], portaal: true,
        omzet: 0, open: 0, objecten: 1, contracten: 1, sinds: "2020",
        notitie: T("Mede-eigenaar van Achmeatoren / IQON met 45%. Ontvangt maandelijks de eigenaarsafrekening via het portaal.",
                   "Co-owner of Achmeatoren / IQON at 45%. Receives the monthly owner statement through the portal.") },
      { id: "epie", naam: "Epie Kooistra", soort: "persoon", kvk: "-", plaats: "Dokkum",
        contact: "Epie Kooistra", mail: "-", rollen: ["eigenaar", "investeerder"], portaal: true,
        omzet: 0, open: 0, objecten: 2, contracten: 2, sinds: "2014",
        notitie: T("Oom en mede-investeerder via Kooistra Beheer B.V. Deelt in Basic-Fit Dokkum (40%) en Brouwerij Dockum (25%).",
                   "Uncle and co-investor through Kooistra Beheer B.V. Shares in Basic-Fit Dokkum (40%) and Brouwerij Dockum (25%).") },
      { id: "vdmeer", naam: "Familie Van der Meer", soort: "persoon", kvk: "-", plaats: "Dokkum",
        contact: "H. van der Meer", mail: "-", rollen: ["huurder"], portaal: true,
        omzet: 13740, open: 0, objecten: 1, contracten: 1, sinds: "2026",
        notitie: T("Nieuwe huurder van Dockumer Sluys 12 per 1 september. Contract getekend, incassomachtiging afgegeven.",
                   "New tenant of Dockumer Sluys 12 from 1 September. Lease signed, direct debit mandate given.") },
      { id: "zorggroep", naam: "Stichting Zorggroep Noard", soort: "org", kvk: "41000318", plaats: "Leeuwarden",
        contact: "-", mail: "-", rollen: ["huurder"], portaal: false,
        omzet: 106800, open: 8900, objecten: 1, contracten: 1, sinds: "2026",
        notitie: T("Kandidaat-huurder voor de vijfde verdieping van IQON. Onderhandelt over drie maanden huurvrij.",
                   "Prospective tenant for the fifth floor of IQON. Negotiating three months rent-free.") },
      { id: "rabobank", naam: "Rabobank", soort: "org", kvk: "30046259", plaats: "Leeuwarden",
        contact: "-", mail: "-", rollen: ["bank"], portaal: true,
        omzet: 0, open: 0, objecten: 18, contracten: 7, sinds: "2009",
        notitie: T("Huisbankier en financier van het grootste deel van de portefeuille. Ontvangt per faciliteit een convenantrapportage.",
                   "House bank and lender for most of the portfolio. Receives a covenant report for each facility.") },
      { id: "accountant", naam: T("Accountantskantoor Noord", "Accountantskantoor Noord"), soort: "org", kvk: "01123900", plaats: "Leeuwarden",
        contact: "-", mail: "-", rollen: ["accountant"], portaal: true,
        omzet: 0, open: 0, objecten: 0, contracten: 1, sinds: "2012",
        notitie: T("Externe accountant met leestoegang op de administratie en exportrecht op de jaarstukken, zonder toegang tot huurdergegevens.",
                   "External accountant with read access to the ledger and export rights on the annual accounts, without access to tenant data.") },
      { id: "makelaar", naam: "Van Wieren Bedrijfsmakelaars", soort: "org", kvk: "01087722", plaats: "Leeuwarden",
        contact: "-", mail: "-", rollen: ["makelaar"], portaal: true,
        omzet: 0, open: 0, objecten: 4, contracten: 0, sinds: "2018",
        notitie: T("Bemiddelt de kantoormeters in Leeuwarden en Harlingen. Ziet in het portaal alleen de units die aan hem zijn toegewezen.",
                   "Handles the office space in Leeuwarden and Harlingen. Sees only the units assigned to them in the portal.") }
    ];
  }

  var DUBBEL = [
    { a: "Synergy Installatietechniek", b: "Synergy Installatie Techniek B.V.", reden: T("Zelfde KvK-nummer 01098344", "Same Chamber of Commerce number 01098344"), zeker: 98 },
    { a: "R. Postma", b: "Rients Postma", reden: T("Zelfde IBAN en adres", "Same IBAN and address"), zeker: 91 },
    { a: "Van Wieren Bedrijfsmakelaars", b: "Van Wieren Makelaardij", reden: T("Zelfde e-maildomein, ander KvK-nummer", "Same email domain, different registration"), zeker: 54 }
  ];

  var API = {
    stamp: function () { return rol + "|" + open + "|" + tab + "|" + Object.keys(uitnodigingen).join(","); },
    click: function (e) {
      var r = U.hit(e, "data-ek-rel-rol"); if (r) { rol = r; return true; }
      var o = U.hit(e, "data-ek-rel-open"); if (o) { open = o; tab = "overzicht"; return true; }
      var t = U.hit(e, "data-ek-rel-tab"); if (t) { tab = t; return true; }
      var i = U.hit(e, "data-ek-rel-invite"); if (i) { uitnodigingen[i] = 1; return true; }
      return false;
    },
    html: function () {
      var P = partijen();
      var lijst = rol === "alle" ? P : P.filter(function (p) { return p.rollen.indexOf(rol) !== -1; });
      var gek = P.filter(function (p) { return p.id === open; })[0] || P[0];

      var rijen = lijst.map(function (p) {
        return {
          attr: 'data-ek-rel-open="' + p.id + '"', on: gek.id === p.id,
          cells: [
            '<strong>' + U.esc(p.naam) + '</strong><br><span class="ek-sub">' + U.esc(p.plaats) + (p.kvk !== "-" ? " · KvK " + p.kvk : "") + '</span>',
            p.rollen.map(function (r) { return U.chip(rolNaam(r), r === "bank" ? "info" : (r === "huurder" ? "ok" : "")); }).join(" "),
            p.soort === "org" ? T("Organisatie", "Organisation") : T("Persoon", "Person"),
            '<span class="ek-num">' + p.objecten + '</span>',
            '<span class="ek-num">' + p.contracten + '</span>',
            '<span class="ek-num">' + (p.open ? U.EUR(p.open) : "-") + '</span>',
            (p.portaal || uitnodigingen[p.id]) ? U.chip(T("Actief", "Active"), "ok") : U.chip(T("Geen toegang", "No access"), "")
          ]
        };
      });

      return U.head({
        eyebrow: T("Verhuur & relaties", "Leasing & relations"),
        title: T("Relaties", "Relations"),
        intro: T("Eén partij met rollen, in plaats van vier losse adresboeken. Dezelfde onderneming kan tegelijk leverancier, huurder en mede-eigenaar zijn; alle facturen, contracten, documenten en berichten hangen aan dezelfde partij.",
                 "One party with roles instead of four separate address books. The same company can be supplier, tenant and co-owner at once; every invoice, contract, document and message hangs off the same party."),
        chip: T(P.length + " partijen · 3 dubbelmeldingen", P.length + " parties · 3 duplicate alerts")
      }) +
      U.kpis([
        [T("Partijen", "Parties"), String(P.length), T("personen en organisaties samen", "people and organisations combined")],
        [T("Met portaaltoegang", "With portal access"), String(P.filter(function (p) { return p.portaal; }).length), T("huurders, eigenaren, leveranciers", "tenants, owners, suppliers")],
        [T("Openstaand bij leveranciers", "Outstanding to suppliers"), U.EUR(P.reduce(function (s, p) { return s + p.open; }, 0)), T("inkoopfacturen in fiattering", "purchase invoices in approval")],
        [T("Mogelijke dubbelingen", "Possible duplicates"), "3", T("herkend op KvK, IBAN en adres", "matched on registration, IBAN and address")]
      ], 4) +
      '<div class="ek-mt">' + U.tabs(ROLLEN.map(function (r) {
        return { id: r.id, label: T(r.nl, r.en), count: r.id === "alle" ? P.length : P.filter(function (p) { return p.rollen.indexOf(r.id) !== -1; }).length };
      }), rol, "data-ek-rel-rol") + '</div>' +
      '<div class="ek-mt ek-g ek-split-wide">' +
      U.panel(T("Partijen", "Parties"), U.table([
        { label: T("Naam", "Name") }, { label: T("Rollen", "Roles") }, { label: T("Soort", "Type") },
        { label: T("Objecten", "Properties"), num: true }, { label: T("Contracten", "Contracts"), num: true },
        { label: T("Openstaand", "Outstanding"), num: true }, { label: T("Portaal", "Portal") }
      ], rijen), U.btns([{ label: T("Nieuwe relatie", "New relation"), primary: true }, { label: T("KvK ophalen", "Look up registry") }, { label: T("Exporteren", "Export") }])) +
      dossier(gek) + '</div>' + dubbelPaneel();
    }
  };

  function dossier(p) {
    var tabs = [
      { id: "overzicht", label: T("Overzicht", "Overview") },
      { id: "contracten", label: T("Contracten", "Contracts") },
      { id: "financieel", label: T("Financieel", "Financial") },
      { id: "communicatie", label: T("Communicatie", "Communication") },
      { id: "portaal", label: T("Portaal", "Portal") },
      { id: "privacy", label: T("Privacy", "Privacy") }
    ];
    var body;
    if (tab === "contracten") {
      body = U.table([{ label: T("Contract", "Contract") }, { label: T("Object", "Property") }, { label: T("Looptijd", "Term") }, { label: T("Status", "Status") }],
        (p.rollen.indexOf("leverancier") !== -1 ? [
          [T("Onderhoudsovereenkomst cv", "Maintenance agreement, heating"), T("23 objecten", "23 properties"), "2024-2027", U.chip(T("Actief", "Active"), "ok")],
          [T("Raamovereenkomst storingsdienst", "Framework agreement, callouts"), T("Portefeuillebreed", "Portfolio-wide"), "2025-2028", U.chip(T("Actief", "Active"), "ok")]
        ] : [
          [T("Huurovereenkomst", "Lease agreement"), T("zie objectdossier", "see property file"), "2026-2031", U.chip(T("Actief", "Active"), "ok")]
        ]));
    } else if (tab === "financieel") {
      body = U.kv([
        [T("Omzet dit jaar", "Turnover this year"), p.omzet ? U.EUR(p.omzet) : "-"],
        [T("Openstaand", "Outstanding"), p.open ? U.EUR(p.open) : U.EUR(0)],
        [T("Betaaltermijn", "Payment terms"), T("30 dagen", "30 days")],
        [T("IBAN", "IBAN"), T("bekend en geverifieerd", "on file and verified")],
        [T("Btw-nummer", "VAT number"), p.kvk !== "-" ? "NL" + p.kvk + "B01" : "-"],
        [T("Laatste betaling", "Last payment"), U.DATE("2026-08-11")]
      ]);
    } else if (tab === "communicatie") {
      body = '<ul style="list-style:none;padding:0;margin:0">' + [
        [U.DATE("2026-08-19"), T("Werkorder 2026-0412 afgemeld met foto's", "Work order 2026-0412 completed with photos")],
        [U.DATE("2026-08-11"), T("Factuur 2026-3391 betaald", "Invoice 2026-3391 paid")],
        [U.DATE("2026-07-28"), T("Offerte gevraagd voor vervanging ketel Dokkum", "Quote requested for boiler replacement Dokkum")]
      ].map(function (r) {
        return '<li class="ek-note" style="margin-bottom:10px"><span class="ek-lbl">' + r[0] + '</span><br>' + U.esc(r[1]) + '</li>';
      }).join("") + '</ul>';
    } else if (tab === "portaal") {
      var actief = p.portaal || uitnodigingen[p.id];
      body = U.kv([
        [T("Toegang", "Access"), actief ? U.chip(T("Actief", "Active"), "ok") : U.chip(T("Niet uitgenodigd", "Not invited"), "")],
        [T("Rol in portaal", "Portal role"), rolNaam(p.rollen[0])],
        [T("Ziet", "Sees"), p.rollen.indexOf("leverancier") !== -1 ? T("Eigen werkorders, planning en facturen", "Own work orders, schedule and invoices")
          : p.rollen.indexOf("eigenaar") !== -1 ? T("Eigen objecten, afrekeningen en waarderingen", "Own properties, statements and valuations")
          : T("Eigen contract, facturen en meldingen", "Own lease, invoices and issues")],
        [T("Twee-factor", "Two-factor"), actief ? T("Verplicht", "Required") : "-"]
      ]) + '<div class="ek-mt-s">' + U.btns([
        { label: actief ? T("Toegang intrekken", "Revoke access") : T("Uitnodigen", "Invite"), primary: !actief, attr: 'data-ek-rel-invite="' + p.id + '"' },
        { label: T("Sessies bekijken", "View sessions") }
      ]) + '</div>';
    } else if (tab === "privacy") {
      body = U.kv([
        [T("Grondslag", "Legal basis"), p.rollen.indexOf("huurder") !== -1 ? T("Uitvoering overeenkomst", "Performance of a contract") : T("Gerechtvaardigd belang", "Legitimate interest")],
        [T("Bewaartermijn", "Retention"), T("7 jaar na einde relatie", "7 years after the relationship ends")],
        [T("Bijzondere gegevens", "Special category data"), T("Geen", "None")],
        [T("Gedeeld met netwerk", "Shared with network"), T("Nee", "No")],
        [T("Inzageverzoek", "Access request"), T("Geen open verzoek", "No open request")]
      ]) + '<div class="ek-mt-s">' + U.btns([{ label: T("Gegevens exporteren", "Export data") }, { label: T("Correctieverzoek", "Correction request") }, { label: T("Bewaarbeleid", "Retention policy") }]) + '</div>';
    } else {
      body = U.kv([
        [T("Soort", "Type"), p.soort === "org" ? T("Organisatie", "Organisation") : T("Persoon", "Person")],
        [T("Rollen", "Roles"), p.rollen.map(rolNaam).join(", ")],
        [T("Plaats", "Location"), p.plaats],
        [T("KvK", "Registration"), p.kvk],
        [T("Contactpersoon", "Contact"), p.contact],
        [T("E-mail", "Email"), p.mail],
        [T("Relatie sinds", "Relation since"), p.sinds],
        [T("Objecten", "Properties"), String(p.objecten)]
      ]) + '<p class="ek-mt-s ek-p">' + U.esc(p.notitie) + '</p>' +
      '<div class="ek-mt-s">' + U.btns([
        { label: T("Bericht sturen", "Send message"), primary: true }, { label: T("Rol toevoegen", "Add role") },
        { label: T("Taak maken", "Create task") }, { label: T("Contract maken", "Create contract") },
        { label: T("Factuur maken", "Create invoice") }, { label: T("Archiveren", "Archive") }
      ]) + '</div>';
    }
    return U.panel(p.naam, '<div class="ek-panel-body">' + U.tabs(tabs, tab, "data-ek-rel-tab") + '<div class="ek-mt-s">' + body + '</div></div>');
  }

  function dubbelPaneel() {
    var rijen = DUBBEL.map(function (d) {
      return [U.esc(d.a), U.esc(d.b), U.esc(d.reden),
        '<div class="ek-bar' + (d.zeker > 85 ? " ek-bar-ok" : " ek-bar-red") + '"><span style="width:' + d.zeker + '%"></span></div><span class="ek-sub">' + d.zeker + '%</span>',
        U.btns([{ label: T("Samenvoegen", "Merge"), primary: d.zeker > 85 }, { label: T("Los laten", "Keep separate") }])];
    });
    return '<div class="ek-mt">' + U.panel(T("Mogelijke dubbelingen", "Possible duplicates"),
      U.table([{ label: T("Partij", "Party") }, { label: T("Mogelijk dezelfde als", "Possibly the same as") }, { label: T("Reden", "Reason") },
        { label: T("Zekerheid", "Confidence") }, { label: T("Actie", "Action") }], rijen)) +
      U.note(T("Samenvoegen is onomkeerbaar voor de weergave, maar niet voor de historie: beide bron-ID's blijven bewaard op elke boeking, factuur en werkorder, zodat een migratie altijd terug te herleiden is.",
               "Merging is irreversible for the display but not for the history: both source IDs stay recorded on every posting, invoice and work order, so a migration can always be traced back.")) + '</div>';
  }

  U.mount("ek-relations-root", API);
})();
