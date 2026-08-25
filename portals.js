/* Portaalsimulator: zes rollen, elk met een eigen portaal met meerdere
   schermen die echt doorklikken. Wat een huurder, eigenaar, leverancier,
   makelaar, accountant of bank te zien krijgt, hier precies zoals het is. */
(function () {
  var U = window.EKUI, T = U.T;
  var rol = "huurder", scherm = "overzicht", vlak = "portaal";
  var staat = { betaald: {}, meldingen: [], gereed: {}, formulier: false, melding: "" };

  function pad() { return window.__EK_PATH ? window.__EK_PATH() : (window.__EK_PATH?window.__EK_PATH():location.pathname); }
  function num(n) { return '<span class="ek-num">' + n + '</span>'; }

  /* ---------- rollen ---------- */
  var ROLLEN = [
    { id: "huurder", nl: "Huurder", en: "Tenant", wie: "H. van der Meer", init: "HM", org: T("Dockumer Sluys 12, Dokkum", "Dockumer Sluys 12, Dokkum"), aantal: 541, actief: 388,
      schermen: ["overzicht", "facturen", "meldingen", "servicekosten", "documenten", "berichten", "gegevens"] },
    { id: "eigenaar", nl: "Eigenaar & investeerder", en: "Owner & investor", wie: "Harns Invest B.V.", init: "HI", org: T("Mede-eigenaar Achmeatoren / IQON, 45%", "Co-owner Achmeatoren / IQON, 45%"), aantal: 12, actief: 11,
      schermen: ["overzicht", "objecten", "afrekeningen", "rendement", "taxaties", "documenten", "vragen"] },
    { id: "leverancier", nl: "Leverancier", en: "Supplier", wie: "Jelke Wijnstra", init: "JW", org: "Synergy Installatietechniek", aantal: 34, actief: 27,
      schermen: ["werkorders", "planning", "offertes", "facturen", "installaties"] },
    { id: "makelaar", nl: "Makelaar", en: "Broker", wie: "Van Wieren", init: "VW", org: T("Bedrijfsmakelaars, Leeuwarden", "Commercial agents, Leeuwarden"), aantal: 6, actief: 4,
      schermen: ["aanbod", "kandidaten", "bezichtigingen", "materiaal"] },
    { id: "accountant", nl: "Accountant", en: "Accountant", wie: T("Kantoor Noord", "Kantoor Noord"), init: "KN", org: T("Externe accountant, drie entiteiten", "External accountant, three entities"), aantal: 3, actief: 3,
      schermen: ["administratie", "proefbalans", "btw", "documenten", "vragen"] },
    { id: "bank", nl: "Bank & financier", en: "Bank & lender", wie: "Rabobank", init: "RB", org: T("Reviewer, toegang tot 30 november", "Reviewer, access until 30 November"), aantal: 4, actief: 2,
      schermen: ["pakket", "convenanten", "objecten", "documenten", "vragen"] }
  ];
  function rolDef() { return ROLLEN.filter(function (r) { return r.id === rol; })[0]; }

  var SCHERMNAMEN = {
    overzicht: ["Overzicht", "Overview"], facturen: ["Facturen & betalen", "Invoices & payments"], meldingen: ["Meldingen", "Issues"],
    servicekosten: ["Servicekosten", "Service charges"], documenten: ["Documenten", "Documents"], berichten: ["Berichten", "Messages"],
    gegevens: ["Mijn gegevens", "My details"], objecten: ["Objecten", "Properties"], afrekeningen: ["Afrekeningen", "Statements"],
    rendement: ["Rendement", "Return"], taxaties: ["Taxaties", "Valuations"], vragen: ["Vragen & antwoorden", "Questions"],
    werkorders: ["Werkorders", "Work orders"], planning: ["Planning", "Schedule"], offertes: ["Offertes", "Quotes"],
    installaties: ["Installaties", "Installations"], aanbod: ["Aanbod", "Availability"], kandidaten: ["Kandidaten", "Candidates"],
    bezichtigingen: ["Bezichtigingen", "Viewings"], materiaal: ["Materiaal", "Marketing material"],
    administratie: ["Administratie", "Ledger"], proefbalans: ["Proefbalans", "Trial balance"], btw: ["Btw & ICP", "VAT & ICP"],
    pakket: ["Financieringspakket", "Financing pack"], convenanten: ["Convenanten", "Covenants"]
  };
  function schermNaam(id) { var s = SCHERMNAMEN[id]; return s ? T(s[0], s[1]) : id; }

  /* ---------- gegevens per portaal ---------- */
  function huurderFacturen() {
    return [
      { id: "f1", nr: "2026-09-0412", oms: T("Huur september", "Rent for September"), datum: "2026-09-01", bedrag: 1207, staat: "openstaand" },
      { id: "f2", nr: "2026-08-0388", oms: T("Huur augustus", "Rent for August"), datum: "2026-08-01", bedrag: 1207, staat: "betaald" },
      { id: "f3", nr: "2026-07-0361", oms: T("Huur juli", "Rent for July"), datum: "2026-07-01", bedrag: 1207, staat: "betaald" },
      { id: "f4", nr: "2026-06-0334", oms: T("Servicekosten 2025, terugbetaling", "Service charges 2025, refund"), datum: "2026-06-30", bedrag: -84, staat: "verrekend" }
    ];
  }
  function huurderMeldingen() {
    return [
      { nr: "ME 2026-0431", oms: T("Kraan lekt in de keuken", "Dripping tap in the kitchen"), datum: "2026-08-22",
        staat: T("Vakman ingepland op 27 augustus", "Contractor scheduled for 27 August"), tone: "info" },
      { nr: "ME 2026-0364", oms: T("Tochtklacht slaapkamerraam", "Draught from the bedroom window"), datum: "2026-05-14",
        staat: T("Opgelost, tochtstrip vervangen", "Resolved, draught strip replaced"), tone: "ok" }
    ].concat(staat.meldingen);
  }

  /* ---------- rendering ---------- */
  var API = {
    stamp: function () { return rol + "|" + scherm + "|" + vlak + "|" + JSON.stringify(staat.betaald) + "|" + staat.meldingen.length + "|" + JSON.stringify(staat.gereed) + "|" + staat.formulier + "|" + staat.melding; },
    click: function (e) {
      var r = U.hit(e, "data-ek-por-p");
      if (r) { rol = r; scherm = rolDef.call ? ROLLEN.filter(function (x) { return x.id === r; })[0].schermen[0] : "overzicht"; staat.melding = ""; staat.formulier = false; return true; }
      var v = U.hit(e, "data-ek-por-vlak"); if (v) { vlak = v; return true; }
      var s = U.hit(e, "data-ek-por-scherm"); if (s) { scherm = s; staat.melding = ""; staat.formulier = false; return true; }
      var b = U.hit(e, "data-ek-por-betaal");
      if (b) { staat.betaald[b] = 1; staat.melding = T("Betaling van € 1.207 in gang gezet. In deze demonstratieomgeving wordt niets werkelijk afgeschreven.",
        "Payment of € 1,207 initiated. Nothing is actually debited in this demonstration environment."); return true; }
      if (U.hit(e, "data-ek-por-form")) { staat.formulier = !staat.formulier; return true; }
      if (U.hit(e, "data-ek-por-verstuur")) {
        var d = new Date();
        staat.meldingen.push({ nr: "ME 2026-04" + (40 + staat.meldingen.length), oms: T("Nieuwe melding via het portaal", "New issue through the portal"),
          datum: "2026-08-25", staat: T("Ontvangen, wordt vandaag beoordeeld", "Received, will be assessed today"), tone: "warn" });
        staat.formulier = false;
        staat.melding = T("Melding verstuurd. U krijgt bericht zodra er een vakman is ingepland.", "Issue submitted. You will be notified as soon as a contractor is scheduled.");
        return true;
      }
      var g = U.hit(e, "data-ek-por-gereed");
      if (g) { staat.gereed[g] = 1; staat.melding = T("Werkorder afgemeld. De beheerder ziet dit direct in de werkorderlijst.",
        "Work order completed. The manager sees this immediately in the work order list."); return true; }
      var d2 = U.hit(e, "data-ek-por-doe");
      if (d2) { staat.melding = d2; return true; }
      return false;
    },
    html: function () {
      var R = rolDef();
      var gebruikers = ROLLEN.reduce(function (s, p) { return s + p.aantal; }, 0);
      var actief = ROLLEN.reduce(function (s, p) { return s + p.actief; }, 0);

      return '<div style="height:1px;background:#d9ddd6;margin:32px 0 26px"></div>' + U.head({
        eyebrow: T("Deelnemers · portalen", "Participants · portals"),
        title: T("Portalen, van binnenuit", "The portals, from the inside"),
        intro: T("Zes rollen kijken in hetzelfde systeem en zien elk een ander portaal. Hieronder staat geen beschrijving maar het portaal zelf: klik door de schermen, betaal een factuur, meld een storing, meld een werkorder af. Wat hier gebeurt, landt in de werkruimtes hiernaast; er is geen tweede systeem met een eigen kopie van de gegevens.",
                 "Six roles look into the same system and each sees a different portal. What follows is not a description but the portal itself: click through the screens, pay an invoice, report a fault, complete a work order. What happens here lands in the workspaces alongside; there is no second system with its own copy of the data."),
        chip: T(actief + " van " + gebruikers + " uitgenodigd actief", actief + " of " + gebruikers + " invited are active")
      }) +
      U.kpis([
        [T("Portalen", "Portals"), String(ROLLEN.length), T("uit hetzelfde raamwerk", "from the same framework")],
        [T("Uitgenodigd", "Invited"), U.NUM(gebruikers), T("huurders, partners en dienstverleners", "tenants, partners and service providers")],
        [T("Actief", "Active"), U.NUM(actief), U.PCT(actief / gebruikers * 100, 0) + T(" logt in", " sign in"), actief / gebruikers * 100],
        [T("Schermen", "Screens"), "33", T("over zes rollen", "across six roles")],
        [T("Kosten per portaalgebruiker", "Cost per portal user"), "€ 0", T("portalen zitten in het platform", "portals are part of the platform")]
      ], 5) +
      '<div class="ek-mt ek-flow">' + ROLLEN.map(function (p) {
        return '<button type="button" class="ek-tab' + (p.id === rol ? " ek-on" : "") + '" data-ek-por-p="' + p.id + '">' +
          U.esc(T(p.nl, p.en)) + " · " + p.aantal + '</button>';
      }).join("") + '</div>' +
      '<div class="ek-mt">' + U.tabs([
        { id: "portaal", label: T("Het portaal zelf", "The portal itself") },
        { id: "rechten", label: T("Rechten & grenzen", "Rights & limits") },
        { id: "beheer", label: T("Beheer & gebruik", "Management & usage") }
      ], vlak, "data-ek-por-vlak") + '</div>' +
      (vlak === "rechten" ? rechtenVlak(R) : vlak === "beheer" ? beheerVlak() : portaalVlak(R));
    }
  };

  function portaalVlak(R) {
    var schermen = R.schermen;
    if (schermen.indexOf(scherm) === -1) scherm = schermen[0];
    return '<div class="ek-mt ek-portal">' +
      '<div class="ek-portal-bar">' +
        '<div class="ek-portal-merk"><span class="ek-portal-logo">EK Dashboard<small>by NordX</small></span>' +
        '<span class="ek-portal-rol">' + U.esc(T(R.nl, R.en)) + T("portaal", " portal") + '</span></div>' +
        '<div class="ek-portal-user"><span>' + U.esc(R.wie) + '<br><span style="opacity:.6">' + U.esc(R.org) + '</span></span>' +
        '<span class="ek-avatar">' + R.init + '</span></div>' +
      '</div>' +
      '<div class="ek-portal-nav">' + schermen.map(function (s) {
        return '<button type="button" class="' + (s === scherm ? "ek-on" : "") + '" data-ek-por-scherm="' + s + '">' + U.esc(schermNaam(s)) + '</button>';
      }).join("") + '</div>' +
      '<div class="ek-portal-body">' + inhoud(R) + '</div>' +
    '</div>' +
    U.note(T("Dit is de weergave zoals de gebruiker hem krijgt, met dezelfde gegevens als het beheer ziet. Knoppen die geld verplaatsen of iets versturen doen in deze demonstratieomgeving niets echts; alle andere handelingen werken en veranderen de status direct.",
             "This is the view as the user gets it, on the same data the manager sees. Buttons that move money or send something out do nothing real in this demonstration environment; everything else works and changes the status immediately."));
  }

  function kop(titel, sub) {
    return '<p class="ek-portal-titel">' + U.esc(titel) + '</p>' + (sub ? '<p class="ek-portal-sub">' + U.esc(sub) + '</p>' : "");
  }
  function melding() {
    return staat.melding ? '<div class="ek-melding ek-mt-s">' + U.esc(staat.melding) + '</div>' : "";
  }
  function tegels(rows) {
    return '<section class="ek-mt-s ek-g ek-g4">' + rows.map(function (r) {
      return '<article class="ek-card ek-card-tight"><p class="ek-lbl">' + U.esc(r[0]) + '</p>' +
        '<p class="ek-val" style="font-size:19px">' + r[1] + '</p>' + (r[2] ? '<p class="ek-sub">' + U.esc(r[2]) + '</p>' : "") + '</article>';
    }).join("") + '</section>';
  }

  function inhoud(R) {
    var f = {
      huurder: huurderScherm, eigenaar: eigenaarScherm, leverancier: leverancierScherm,
      makelaar: makelaarScherm, accountant: accountantScherm, bank: bankScherm
    }[R.id];
    return f();
  }

  /* ================= HUURDER ================= */
  function huurderScherm() {
    if (scherm === "facturen") {
      var F = huurderFacturen();
      var rijen = F.map(function (v) {
        var betaald = v.staat === "betaald" || staat.betaald[v.id];
        return [U.esc(v.nr) + '<br><span class="ek-sub">' + U.esc(v.oms) + '</span>', U.DATE(v.datum),
          num((v.bedrag < 0 ? "- " : "") + U.EUR(Math.abs(v.bedrag))),
          betaald ? U.chip(T("Voldaan", "Paid"), "ok") : v.staat === "verrekend" ? U.chip(T("Verrekend", "Offset"), "info") : U.chip(T("Openstaand", "Outstanding"), "warn"),
          U.btns(betaald || v.staat === "verrekend"
            ? [{ label: T("Factuur (PDF)", "Invoice (PDF)"), attr: 'data-ek-por-doe="' + T("De factuur is gedownload.", "The invoice has been downloaded.") + '"' }]
            : [{ label: T("Betalen", "Pay"), primary: true, attr: 'data-ek-por-betaal="' + v.id + '"' },
               { label: T("Factuur (PDF)", "Invoice (PDF)"), attr: 'data-ek-por-doe="' + T("De factuur is gedownload.", "The invoice has been downloaded.") + '"' }])];
      });
      return kop(T("Facturen en betalen", "Invoices and payments"),
        T("Uw huur wordt automatisch geïncasseerd op de eerste van de maand. Losse facturen kunt u hier zelf voldoen.",
          "Your rent is collected by direct debit on the first of the month. Individual invoices can be paid here.")) + melding() +
        tegels([[T("Huur per maand", "Rent per month"), "€ 1.207"], [T("Openstaand", "Outstanding"), staat.betaald.f1 ? "€ 0" : "€ 1.207"],
          [T("Volgende incasso", "Next collection"), U.DATE("2026-09-01")], [T("Incassomachtiging", "Mandate"), T("Actief", "Active")]]) +
        '<div class="ek-mt-s">' + U.table([{ label: T("Factuur", "Invoice") }, { label: T("Datum", "Date") },
          { label: T("Bedrag", "Amount"), num: true }, { label: T("Status", "Status") }, { label: "" }], rijen) + '</div>';
    }
    if (scherm === "meldingen") {
      var M = huurderMeldingen();
      return kop(T("Meldingen", "Issues"), T("Een melding met een foto erbij wordt gemiddeld anderhalve dag sneller opgelost.",
        "An issue with a photo attached is resolved a day and a half faster on average.")) + melding() +
        '<div class="ek-mt-s">' + U.btns([{ label: staat.formulier ? T("Annuleren", "Cancel") : T("Melding maken", "Report an issue"), primary: !staat.formulier, attr: 'data-ek-por-form="1"' }]) + '</div>' +
        (staat.formulier ? '<div class="ek-form ek-mt-s">' +
          '<label class="ek-field-lbl"><span class="ek-lbl">' + T("Waar gaat het over", "What is it about") + '</span>' +
          '<select class="ek-field"><option>' + T("Loodgieterswerk", "Plumbing") + '</option><option>' + T("Verwarming", "Heating") +
          '</option><option>' + T("Elektra", "Electrical") + '</option><option>' + T("Sloten en sleutels", "Locks and keys") +
          '</option><option>' + T("Anders", "Something else") + '</option></select></label>' +
          '<label class="ek-field-lbl"><span class="ek-lbl">' + T("Omschrijving", "Description") + '</span>' +
          '<textarea class="ek-field" rows="3" placeholder="' + T("Beschrijf kort wat er aan de hand is", "Briefly describe what is wrong") + '"></textarea></label>' +
          '<label class="ek-check"><input type="checkbox" checked> ' + T("Ik ben overdag bereikbaar op het bekende nummer", "I can be reached on the number on file during the day") + '</label>' +
          U.btns([{ label: T("Foto toevoegen", "Add a photo") }, { label: T("Versturen", "Submit"), primary: true, attr: 'data-ek-por-verstuur="1"' }]) +
          '</div>' : "") +
        '<div class="ek-mt-s">' + U.table([{ label: T("Nummer", "Number") }, { label: T("Melding", "Issue") },
          { label: T("Gemeld", "Reported") }, { label: T("Status", "Status") }],
          M.map(function (m) { return [U.esc(m.nr), U.esc(m.oms), U.DATE(m.datum), U.chip(m.staat, m.tone)]; })) + '</div>';
    }
    if (scherm === "servicekosten") {
      return kop(T("Servicekosten", "Service charges"), T("Wat u vooruitbetaalt en wat het werkelijk is geworden, met de posten erachter.",
        "What you pay in advance and what it actually became, with the underlying items.")) + melding() +
        tegels([[T("Voorschot per maand", "Advance per month"), "€ 62"], [T("Afrekening 2025", "Settlement 2025"), "- € 84", T("terugbetaald", "refunded")],
          [T("Uw aandeel", "Your share"), "3,1%", T("naar oppervlakte", "by floor area")], [T("Volgende afrekening", "Next settlement"), T("juni 2027", "June 2027")]]) +
        '<div class="ek-mt-s">' + U.table([{ label: T("Post", "Item") }, { label: T("Verdeelsleutel", "Allocation") },
          { label: T("Uw aandeel", "Your share"), num: true }, { label: T("Voorschot", "Advance"), num: true }],
          [[T("Elektra algemene ruimten", "Electricity, common areas"), T("Per m²", "Per m²"), num("€ 276"), num("€ 288")],
           [T("Schoonmaak trappenhuis", "Cleaning, stairwells"), T("Per unit", "Per unit"), num("€ 549"), num("€ 528")],
           [T("Liftonderhoud", "Lift maintenance"), T("Per unit", "Per unit"), num("€ 342"), num("€ 342")],
           [T("Tuinonderhoud binnenhof", "Courtyard maintenance"), T("Per m²", "Per m²"), num("€ 118"), num("€ 126")],
           [T("Beheervergoeding", "Management fee"), T("Vast percentage", "Fixed share"), num("€ 300"), num("€ 300")],
           { total: true, cells: [T("Totaal", "Total"), "", num("€ 1.585"), num("€ 1.584")] }]) + '</div>' +
        '<div class="ek-mt-s">' + U.btns([{ label: T("Afrekening (PDF)", "Settlement (PDF)"), primary: true, attr: 'data-ek-por-doe="' + T("De afrekening is gedownload.", "The settlement has been downloaded.") + '"' },
          { label: T("Vraag stellen over een post", "Ask about an item"), attr: 'data-ek-por-doe="' + T("Uw vraag staat klaar bij de beheerder.", "Your question is queued for the manager.") + '"' }]) + '</div>';
    }
    if (scherm === "documenten") {
      return kop(T("Documenten", "Documents"), T("Alles wat bij uw woning en uw contract hoort, op één plek.",
        "Everything belonging to your home and your lease, in one place.")) + melding() +
        '<div class="ek-mt-s">' + U.table([{ label: T("Document", "Document") }, { label: T("Datum", "Date") }, { label: T("Soort", "Type") }, { label: "" }],
          [[T("Huurovereenkomst", "Lease agreement"), U.DATE("2026-08-14"), "PDF", U.btns([{ label: T("Openen", "Open"), attr: 'data-ek-por-doe="' + T("Document geopend.", "Document opened.") + '"' }])],
           [T("Opnamestaat met foto's", "Condition report with photos"), U.DATE("2026-08-28"), "PDF", U.btns([{ label: T("Ondertekenen", "Sign"), primary: true, attr: 'data-ek-por-doe="' + T("U wordt doorgestuurd naar de ondertekendienst.", "You are taken to the signing service.") + '"' }])],
           [T("Huisregels", "House rules"), U.DATE("2026-01-01"), "PDF", U.btns([{ label: T("Openen", "Open"), attr: 'data-ek-por-doe="' + T("Document geopend.", "Document opened.") + '"' }])],
           [T("Servicekostenafrekening 2025", "Service charge settlement 2025"), U.DATE("2026-06-30"), "PDF", U.btns([{ label: T("Openen", "Open"), attr: 'data-ek-por-doe="' + T("Document geopend.", "Document opened.") + '"' }])],
           [T("Incassomachtiging", "Direct debit mandate"), U.DATE("2026-08-14"), "PDF", U.btns([{ label: T("Openen", "Open"), attr: 'data-ek-por-doe="' + T("Document geopend.", "Document opened.") + '"' }])]]) + '</div>';
    }
    if (scherm === "berichten") {
      return kop(T("Berichten", "Messages"), T("Alles wat u hier stuurt komt in uw eigen dossier terecht, niet in iemands persoonlijke postvak.",
        "Everything you send here lands in your own file, not in someone's personal inbox.")) + melding() +
        '<div class="ek-mt-s">' +
        ['2026-08-22|' + T("Beheer", "Management") + '|' + T("Uw melding over de kraan is doorgezet naar Synergy. Zij nemen contact op voor een afspraak.", "Your report about the tap has been passed to Synergy. They will contact you to arrange a time."),
         '2026-08-22|' + T("U", "You") + '|' + T("De kraan in de keuken lekt langs de basis, ik heb de hoofdkraan dichtgedraaid.", "The kitchen tap is leaking around the base, I have closed the stopcock."),
         '2026-07-02|' + T("Beheer", "Management") + '|' + T("De huur is per 1 juli met 3,4% geïndexeerd. De brief met de onderbouwing staat bij uw documenten.", "The rent was indexed by 3.4% from 1 July. The letter explaining it is with your documents.")].map(function (r) {
          var d = r.split("|");
          return '<div class="ek-card ek-card-tight" style="margin-bottom:8px"><p class="ek-lbl">' + U.esc(d[1]) + ' · ' + U.DATE(d[0]) + '</p>' +
            '<p class="ek-p" style="margin-top:6px">' + U.esc(d[2]) + '</p></div>';
        }).join("") +
        '<div class="ek-form"><label class="ek-field-lbl"><span class="ek-lbl">' + T("Nieuw bericht", "New message") + '</span>' +
        '<textarea class="ek-field" rows="2" placeholder="' + T("Typ hier uw bericht", "Type your message here") + '"></textarea></label>' +
        U.btns([{ label: T("Versturen", "Send"), primary: true, attr: 'data-ek-por-doe="' + T("Bericht verstuurd. De beheerder ziet het direct in uw dossier.", "Message sent. The manager sees it in your file immediately.") + '"' }]) + '</div></div>';
    }
    if (scherm === "gegevens") {
      return kop(T("Mijn gegevens", "My details"), T("U bepaalt zelf wat er klopt. Een wijziging gaat ter controle naar de beheerder.",
        "You decide what is correct. A change goes to the manager for review.")) + melding() +
        '<div class="ek-mt-s ek-g ek-split">' +
        '<div class="ek-form">' +
        '<label class="ek-field-lbl"><span class="ek-lbl">' + T("Naam", "Name") + '</span><input class="ek-field" value="H. van der Meer"></label>' +
        '<label class="ek-field-lbl"><span class="ek-lbl">' + T("E-mail", "Email") + '</span><input class="ek-field" value="h.vandermeer@example.nl"></label>' +
        '<label class="ek-field-lbl"><span class="ek-lbl">' + T("Telefoon", "Phone") + '</span><input class="ek-field" value="06 ·· ·· ·· ··"></label>' +
        '<label class="ek-field-lbl"><span class="ek-lbl">' + T("Rekeningnummer voor incasso", "Account for direct debit") + '</span><input class="ek-field" value="NL·· INGB ···· ···· 12"></label>' +
        U.btns([{ label: T("Opslaan", "Save"), primary: true, attr: 'data-ek-por-doe="' + T("Wijziging ingediend. De beheerder bevestigt binnen twee werkdagen.", "Change submitted. The manager will confirm within two working days.") + '"' }]) +
        '</div>' +
        U.panel(T("Wat er met uw gegevens gebeurt", "What happens with your data"), '<div class="ek-panel-body">' + U.kv([
          [T("Grondslag", "Legal basis"), T("Uitvoering van de huurovereenkomst", "Performance of the lease")],
          [T("Bewaartermijn", "Retention"), T("7 jaar na het einde van de huur", "7 years after the lease ends")],
          [T("Wie kan erbij", "Who can see it"), T("Beheer en financiën, niet de netwerkpartners", "Management and finance, not the network partners")],
          [T("Gedeeld met derden", "Shared with third parties"), T("Alleen de installateur die uw melding uitvoert", "Only the contractor handling your issue")],
          [T("Uw rechten", "Your rights"), T("Inzage, correctie en een kopie van uw dossier", "Access, correction and a copy of your file")]
        ]) + '<div class="ek-mt-s">' + U.btns([{ label: T("Mijn dossier downloaden", "Download my file"), attr: 'data-ek-por-doe="' + T("Uw dossier wordt klaargezet en gemaild.", "Your file is being prepared and will be emailed.") + '"' }]) + '</div></div>') +
        '</div>';
    }
    return kop(T("Welkom, familie Van der Meer", "Welcome, Van der Meer family"),
      T("Dockumer Sluys 12, Dokkum. Uw huur staat op automatische incasso en er loopt één melding.",
        "Dockumer Sluys 12, Dokkum. Your rent is on direct debit and one issue is open.")) + melding() +
      tegels([[T("Huur per maand", "Rent per month"), "€ 1.207", T("inclusief € 62 servicekosten", "including € 62 service charges")],
        [T("Openstaand", "Outstanding"), staat.betaald.f1 ? "€ 0" : "€ 1.207", T("vervalt 1 september", "due 1 September")],
        [T("Open meldingen", "Open issues"), String(1 + staat.meldingen.length), T("vakman ingepland", "contractor scheduled")],
        [T("Contract loopt tot", "Lease runs until"), T("onbepaalde tijd", "open-ended"), T("opzegtermijn één maand", "one month's notice")]]) +
      '<div class="ek-mt-s ek-g ek-split">' +
      U.panel(T("Wat er speelt", "What is going on"), '<div class="ek-panel-body">' +
        U.table([{ label: T("Onderwerp", "Item") }, { label: T("Datum", "Date") }, { label: T("Status", "Status") }],
          [[T("Kraan lekt in de keuken", "Dripping tap in the kitchen"), U.DATE("2026-08-22"), U.chip(T("Vakman op 27 augustus", "Contractor on 27 August"), "info")],
           [T("Opnamestaat ter ondertekening", "Condition report to sign"), U.DATE("2026-08-28"), U.chip(T("Wacht op u", "Waiting for you"), "warn")],
           [T("Huur september", "Rent for September"), U.DATE("2026-09-01"), U.chip(T("Wordt geïncasseerd", "Will be collected"), "")]]) + '</div>') +
      U.panel(T("Snel iets regelen", "Get something done"), '<div class="ek-panel-body">' +
        U.btns([{ label: T("Melding maken", "Report an issue"), primary: true, attr: 'data-ek-por-scherm="meldingen"' },
          { label: T("Factuur bekijken", "View invoice"), attr: 'data-ek-por-scherm="facturen"' },
          { label: T("Servicekosten", "Service charges"), attr: 'data-ek-por-scherm="servicekosten"' },
          { label: T("Bericht sturen", "Send a message"), attr: 'data-ek-por-scherm="berichten"' },
          { label: T("Huurcontract", "Lease"), attr: 'data-ek-por-scherm="documenten"' }]) +
        '<p class="ek-mt-s ek-note">' + T("Een melding via het portaal komt binnen met object, unit en foto erbij. Datzelfde per telefoon kost drie vragen voordat duidelijk is waar het over gaat.",
          "An issue reported through the portal arrives with the property, unit and photo attached. The same call takes three questions before it is clear what it concerns.") + '</p></div>') + '</div>';
  }

  /* ================= EIGENAAR ================= */
  function eigenaarScherm() {
    if (scherm === "objecten") {
      return kop(T("Uw objecten", "Your properties"), T("Alleen de objecten waarin u deelneemt, met uw aandeel erin verwerkt.",
        "Only the properties you participate in, with your share applied.")) + melding() +
        '<div class="ek-mt-s">' + U.table([{ label: T("Object", "Property") }, { label: T("Uw aandeel", "Your share"), num: true },
          { label: T("Waarde (100%)", "Value (100%)"), num: true }, { label: T("Uw deel", "Your part"), num: true },
          { label: T("Bezetting", "Occupancy"), num: true }, { label: "NOI", num: true }, { label: T("Label", "Label") }],
          [["Achmeatoren / IQON", num("45%"), num("€ 38,6 mln"), num("€ 17,4 mln"), num("93,1%"), num("€ 1,84 mln"), U.chip("A", "ok")],
           [T("Parkeerdek Achmeatoren", "Achmeatoren parking deck"), num("45%"), num("€ 5,8 mln"), num("€ 2,6 mln"), num("100%"), num("€ 0,29 mln"), U.chip("-", "")]]) + '</div>' +
        '<div class="ek-mt-s">' + U.btns([{ label: T("Objectdossier openen", "Open the property file"), primary: true, attr: 'data-ek-por-doe="' + T("U ziet het volledige objectdossier, zonder huurdergegevens.", "You see the full property file, without tenant personal data.") + '"' },
          { label: T("Huurlijst (Excel)", "Rent roll (Excel)"), attr: 'data-ek-por-doe="' + T("De huurlijst is gedownload, geanonimiseerd op huurdersnaam.", "The rent roll has been downloaded, anonymised on tenant name.") + '"' }]) + '</div>';
    }
    if (scherm === "afrekeningen") {
      return kop(T("Afrekeningen", "Statements"), T("Elke maand op de vijfde werkdag, met de onderliggende posten erbij.",
        "Every month on the fifth working day, with the underlying items attached.")) + melding() +
        '<div class="ek-mt-s">' + U.table([{ label: T("Periode", "Period") }, { label: T("Huurinkomsten", "Rental income"), num: true },
          { label: T("Kosten", "Costs"), num: true }, { label: T("Rente en aflossing", "Interest and amortisation"), num: true },
          { label: T("Uw uitkering", "Your distribution"), num: true }, { label: T("Status", "Status") }, { label: "" }],
          [[U.MONTH("2026-07-01"), num("€ 268.400"), num("- € 74.200"), num("- € 97.800"), num("€ 43.380"), U.chip(T("Uitbetaald", "Paid"), "ok"),
            U.btns([{ label: "PDF", attr: 'data-ek-por-doe="' + T("Afrekening juli gedownload.", "July statement downloaded.") + '"' }])],
           [U.MONTH("2026-06-01"), num("€ 264.100"), num("- € 88.600"), num("- € 97.800"), num("€ 34.965"), U.chip(T("Uitbetaald", "Paid"), "ok"),
            U.btns([{ label: "PDF", attr: 'data-ek-por-doe="' + T("Afrekening juni gedownload.", "June statement downloaded.") + '"' }])],
           [U.MONTH("2026-05-01"), num("€ 264.100"), num("- € 61.400"), num("- € 97.800"), num("€ 47.205"), U.chip(T("Uitbetaald", "Paid"), "ok"),
            U.btns([{ label: "PDF", attr: 'data-ek-por-doe="' + T("Afrekening mei gedownload.", "May statement downloaded.") + '"' }])]]) + '</div>' +
        '<p class="ek-mt-s ek-note">' + T("De kosten in juni waren hoger door de vervanging van het regelblok in de luchtbehandeling. Dat bedrag staat als werkorder in het systeem en is aanklikbaar in de afrekening.",
          "Costs in June were higher because of the control block replacement in the air handling unit. That amount sits in the system as a work order and is clickable inside the statement.") + '</p>';
    }
    if (scherm === "rendement") {
      return kop(T("Rendement", "Return"), T("Wat het object doet en wat u ervan overhoudt, over twaalf maanden.",
        "What the property does and what you keep from it, over twelve months.")) + melding() +
        tegels([[T("Direct rendement", "Income return"), "5,9%", T("op uw inleg", "on your contribution")],
          [T("Waardeontwikkeling", "Value movement"), "+ 2,4%", T("taxatie mei 2026", "valuation May 2026")],
          [T("Totaal rendement", "Total return"), "8,3%", T("laatste twaalf maanden", "last twelve months")],
          [T("Uitgekeerd dit jaar", "Distributed this year"), "€ 289.400", T("zeven maanden", "seven months")]]) +
        '<div class="ek-mt-s">' + U.table([{ label: T("Onderdeel", "Component") }, { label: T("100%", "100%"), num: true }, { label: T("Uw 45%", "Your 45%"), num: true }],
          [[T("Huurinkomsten", "Rental income"), num("€ 3.184.000"), num("€ 1.432.800")],
           [T("Servicekosten, per saldo", "Service charges, net"), num("€ 0"), num("€ 0")],
           [T("Exploitatiekosten", "Operating costs"), num("- € 642.000"), num("- € 288.900")],
           [T("Onderhoud", "Maintenance"), num("- € 284.000"), num("- € 127.800")],
           [T("Beheervergoeding", "Management fee"), num("- € 96.000"), num("- € 43.200")],
           { total: true, cells: ["NOI", num("€ 2.162.000"), num("€ 972.900")] },
           [T("Rente", "Interest"), num("- € 629.000"), num("- € 283.050")],
           [T("Aflossing", "Amortisation"), num("- € 360.000"), num("- € 162.000")],
           { total: true, cells: [T("Uitkeerbaar", "Distributable"), num("€ 1.173.000"), num("€ 527.850")] }]) + '</div>';
    }
    if (scherm === "taxaties") {
      return kop(T("Taxaties", "Valuations"), T("Wie heeft gewaardeerd, wanneer, met welke methodiek en welke aannames.",
        "Who valued, when, using what method and which assumptions.")) + melding() +
        '<div class="ek-mt-s">' + U.table([{ label: T("Datum", "Date") }, { label: T("Taxateur", "Valuer") }, { label: T("Methodiek", "Method") },
          { label: T("Waarde", "Value"), num: true }, { label: T("Aanvangsrendement", "Yield"), num: true }, { label: "" }],
          [[U.DATE("2026-05-14"), "Cushman & Wakefield", T("DCF plus kapitalisatie", "DCF plus capitalisation"), num("€ 38.600.000"), num("5,6%"),
            U.btns([{ label: T("Rapport", "Report"), attr: 'data-ek-por-doe="' + T("Taxatierapport geopend.", "Valuation report opened.") + '"' }])],
           [U.DATE("2024-05-02"), "Cushman & Wakefield", T("DCF plus kapitalisatie", "DCF plus capitalisation"), num("€ 37.700.000"), num("5,8%"),
            U.btns([{ label: T("Rapport", "Report"), attr: 'data-ek-por-doe="' + T("Taxatierapport geopend.", "Valuation report opened.") + '"' }])]]) + '</div>' +
        '<p class="ek-mt-s ek-note">' + T("De taxatie van mei gaat uit van verhuur van de vijfde verdieping binnen twaalf maanden. Blijft die leeg, dan drukt dat de waarde met ongeveer 900.000 euro; dat scenario staat in het rapport doorgerekend.",
          "The May valuation assumes the fifth floor is let within twelve months. If it stays vacant, that lowers the value by roughly 900,000 euro; the report models that scenario.") + '</p>';
    }
    if (scherm === "documenten") return documentenScherm([
      [T("Eigenaarsafrekening juli 2026", "Owner statement July 2026"), "2026-08-05"],
      [T("Taxatierapport mei 2026", "Valuation report May 2026"), "2026-05-14"],
      [T("Jaarrekening 2025", "Annual accounts 2025"), "2026-04-22"],
      [T("Samenwerkingsovereenkomst", "Co-ownership agreement"), "2020-11-03"],
      [T("Capexvoorstel verduurzaming", "Capex proposal, sustainability"), "2026-08-12"]
    ]);
    if (scherm === "vragen") return vragenScherm([
      ["Harns Invest B.V.", T("Wat gebeurt er met de huur als de vijfde verdieping langer leegstaat?", "What happens to the rent if the fifth floor stays vacant longer?"),
       T("De begroting rekent met leegstand tot 1 januari. Duurt het langer, dan daalt de uitkering met ongeveer 3.900 euro per maand voor uw aandeel; de aflossing gaat voor.",
         "The budget assumes vacancy until 1 January. If it takes longer, the distribution falls by roughly 3,900 euro a month for your share; amortisation ranks first.")],
      ["Harns Invest B.V.", T("Waarom stegen de onderhoudskosten in juni?", "Why did maintenance costs rise in June?"),
       T("Vervanging van het regelblok in de luchtbehandeling, 4.800 euro. Werkorder 2026-0428, offerte en factuur staan bij de documenten.",
         "Replacement of the control block in the air handling unit, 4,800 euro. Work order 2026-0428, quote and invoice are with the documents.")]
    ]);
    return kop(T("Welkom, Harns Invest B.V.", "Welcome, Harns Invest B.V."),
      T("Mede-eigenaar van Achmeatoren / IQON met 45%. De afrekening van juli is uitbetaald.",
        "Co-owner of Achmeatoren / IQON at 45%. The July statement has been paid out.")) + melding() +
      tegels([[T("Uw deel van de waarde", "Your part of the value"), "€ 17,4 mln", T("taxatie mei 2026", "valuation May 2026")],
        [T("NOI, uw aandeel", "NOI, your share"), "€ 973k", T("twaalf maanden", "twelve months")],
        [T("Laatste uitkering", "Last distribution"), "€ 43.380", U.DATE("2026-08-05")],
        [T("Bezetting", "Occupancy"), "93,1%", T("één verdieping in de verhuur", "one floor on the market")]]) +
      '<div class="ek-mt-s ek-g ek-split">' +
      U.panel(T("Wat er speelt", "What is going on"), '<div class="ek-panel-body">' +
        U.table([{ label: T("Onderwerp", "Item") }, { label: T("Status", "Status") }],
          [[T("Verdieping 5, vleugel B in de verhuur", "Floor 5, wing B on the market"), U.chip(T("Vier kandidaten", "Four candidates"), "info")],
           [T("Capexvoorstel verduurzaming, € 2,1 mln", "Capex proposal, sustainability, € 2.1m"), U.chip(T("Uw goedkeuring gevraagd", "Your approval requested"), "warn")],
           [T("Convenantrapportage Q2 naar de bank", "Q2 covenant report to the bank"), U.chip(T("Verstuurd", "Sent"), "ok")]]) +
        '<div class="ek-mt-s">' + U.btns([{ label: T("Capexvoorstel bekijken", "Review the capex proposal"), primary: true, attr: 'data-ek-por-doe="' + T("Het voorstel staat open met de terugverdientijd en het subsidiedeel.", "The proposal is open, with payback period and grant component.") + '"' },
          { label: T("Goedkeuren", "Approve"), attr: 'data-ek-por-doe="' + T("Uw goedkeuring is vastgelegd met datum en tijd.", "Your approval has been recorded with date and time.") + '"' }]) + '</div></div>') +
      U.panel(T("Snel naar", "Go to"), '<div class="ek-panel-body">' + U.btns([
        { label: T("Afrekeningen", "Statements"), attr: 'data-ek-por-scherm="afrekeningen"' },
        { label: T("Rendement", "Return"), attr: 'data-ek-por-scherm="rendement"' },
        { label: T("Objecten", "Properties"), attr: 'data-ek-por-scherm="objecten"' },
        { label: T("Taxaties", "Valuations"), attr: 'data-ek-por-scherm="taxaties"' },
        { label: T("Vraag stellen", "Ask a question"), attr: 'data-ek-por-scherm="vragen"' }]) + '</div>') + '</div>';
  }

  /* ================= LEVERANCIER ================= */
  function leverancierScherm() {
    var WO = [
      { id: "w1", nr: "WO 2026-0431", object: "Dockumer Sluys 12, Dokkum", oms: T("Kraan lekt in de keuken", "Dripping tap in the kitchen"),
        datum: "2026-08-27", tijd: "09:00 - 11:00", contact: T("Huurder is thuis", "Tenant is at home"), tarief: T("Uurtarief € 68, voorrijden inbegrepen", "Hourly rate € 68, call-out included") },
      { id: "w2", nr: "WO 2026-0428", object: "Achmeatoren / IQON, Leeuwarden", oms: T("Luchtbehandeling verdieping 4 slaat af", "Air handling floor 4 shuts down"),
        datum: "2026-08-26", tijd: "13:00 - 17:00", contact: T("Melden bij de receptie", "Report to reception"), tarief: T("Volgens offerte, € 4.800", "Per quote, € 4,800") },
      { id: "w3", nr: "WO 2026-0419", object: "Grand Café Wald, Wâlterswâld", oms: T("Jaarlijkse keuring cv", "Annual boiler inspection"),
        datum: "2026-09-03", tijd: "08:00 - 10:00", contact: T("Sleutel bij de buren", "Key with the neighbours"), tarief: T("Onderhoudsabonnement", "Maintenance subscription") }
    ];
    if (scherm === "planning") {
      return kop(T("Planning", "Schedule"), T("Uw week, met de afspraken die met de huurder zijn gemaakt.",
        "Your week, with the appointments agreed with the tenant.")) + melding() +
        '<div class="ek-mt-s">' + WO.map(function (w) {
          return '<div class="ek-card ek-card-tight" style="margin-bottom:8px"><div class="ek-flow" style="justify-content:space-between">' +
            '<div><p class="ek-lbl">' + U.DATE(w.datum) + ' · ' + w.tijd + '</p>' +
            '<p style="font-size:13px;font-weight:600;margin-top:4px">' + U.esc(w.oms) + '</p>' +
            '<p class="ek-sub">' + U.esc(w.object) + ' · ' + U.esc(w.contact) + '</p></div>' +
            (staat.gereed[w.id] ? U.chip(T("Afgemeld", "Completed"), "ok") : U.btns([{ label: T("Datum wijzigen", "Change date"), attr: 'data-ek-por-doe="' + T("De beheerder krijgt uw voorstel voor een andere datum.", "The manager receives your proposal for another date.") + '"' }])) +
            '</div></div>';
        }).join("") + '</div>';
    }
    if (scherm === "offertes") {
      return kop(T("Offertes", "Quotes"), T("Wat is gevraagd, wat u heeft aangeboden en wat is goedgekeurd.",
        "What was requested, what you offered and what was approved.")) + melding() +
        '<div class="ek-mt-s">' + U.table([{ label: T("Aanvraag", "Request") }, { label: T("Object", "Property") }, { label: T("Bedrag", "Amount"), num: true },
          { label: T("Status", "Status") }, { label: "" }],
          [[T("Vervanging regelblok luchtbehandeling", "Air handling control block replacement"), "Achmeatoren / IQON", num("€ 4.800"),
            U.chip(T("Goedgekeurd", "Approved"), "ok"), U.btns([{ label: T("Bekijken", "View"), attr: 'data-ek-por-doe="' + T("Offerte geopend.", "Quote opened.") + '"' }])],
           [T("Vervanging cv-ketel Casa Velha", "Boiler replacement Casa Velha"), "Casa Velha, Leeuwarden", num("€ 6.400"),
            U.chip(T("In beoordeling", "Under review"), "warn"), U.btns([{ label: T("Aanpassen", "Amend"), attr: 'data-ek-por-doe="' + T("U kunt de offerte aanpassen en opnieuw indienen.", "You can amend the quote and resubmit it.") + '"' }])],
           [T("Noodverlichting Sense Dokkum", "Emergency lighting Sense Dokkum"), "Sense Dokkum", num("€ 12.900"),
            U.chip(T("Gevraagd", "Requested"), ""), U.btns([{ label: T("Offerte uploaden", "Upload quote"), primary: true, attr: 'data-ek-por-doe="' + T("Offerte geüpload en doorgezet naar de beheerder.", "Quote uploaded and passed to the manager.") + '"' }])]]) + '</div>';
    }
    if (scherm === "facturen") {
      return kop(T("Uw facturen", "Your invoices"), T("Wat u heeft ingediend en waar het in de fiattering staat.",
        "What you have submitted and where it stands in the approval flow.")) + melding() +
        '<div class="ek-mt-s">' + U.table([{ label: T("Factuur", "Invoice") }, { label: T("Werkorder", "Work order") }, { label: T("Bedrag", "Amount"), num: true },
          { label: T("Ingediend", "Submitted") }, { label: T("Status", "Status") }],
          [["2026-3391", "WO 2026-0412", num("€ 2.226"), U.DATE("2026-07-14"), U.chip(T("Betaald 11 augustus", "Paid 11 August"), "ok")],
           ["2026-3402", "WO 2026-0419", num("€ 386"), U.DATE("2026-08-12"), U.chip(T("Goedgekeurd, betaalrun 25 augustus", "Approved, payment run 25 August"), "info")],
           ["2026-3411", "WO 2026-0428", num("€ 4.800"), U.DATE("2026-08-24"), U.chip(T("In fiattering", "In approval"), "warn")]]) + '</div>' +
        '<div class="ek-mt-s">' + U.btns([{ label: T("Factuur indienen", "Submit an invoice"), primary: true, attr: 'data-ek-por-doe="' + T("Factuur ingediend. De codering op object en werkorder gebeurt automatisch.", "Invoice submitted. Coding to property and work order happens automatically.") + '"' },
          { label: T("Via Peppol versturen", "Send via Peppol"), attr: 'data-ek-por-doe="' + T("Uw factuur is via Peppol ontvangen en herkend.", "Your invoice has been received and recognised through Peppol.") + '"' }]) + '</div>';
    }
    if (scherm === "installaties") {
      return kop(T("Installaties onder uw beheer", "Installations you maintain"), T("Met de historie erbij, zodat u niet ter plaatse hoeft te ontdekken wat er vorige keer is gedaan.",
        "With the history attached, so you do not have to discover on site what was done last time.")) + melding() +
        '<div class="ek-mt-s">' + U.table([{ label: T("Installatie", "Installation") }, { label: T("Object", "Property") }, { label: T("Serienummer", "Serial") },
          { label: T("Interval", "Interval") }, { label: T("Volgende beurt", "Next service") }],
          [[T("Cv-ketel, cascade", "Boiler, cascade"), "Achmeatoren / IQON", "RM-610-2244", T("Per jaar", "Annually"), U.DATE("2026-11-12")],
           [T("Luchtbehandeling", "Air handling"), "Achmeatoren / IQON", "SA-60-1188", T("Twee keer per jaar", "Twice a year"), U.DATE("2026-09-30")],
           [T("Warmtepomp", "Heat pump"), "Trije Hûs", "DK-AL-9902", T("Per jaar", "Annually"), U.DATE("2027-03-18")],
           [T("Ventilatie woningen", "Residential ventilation"), "Casa Velha", "IT-DF-5510", T("Twee keer per jaar", "Twice a year"), U.DATE("2026-12-01")]]) + '</div>';
    }
    return kop(T("Werkorders", "Work orders"), T("Alleen wat aan u is toegewezen. Aannemen, inplannen, uitvoeren en afmelden gaat hier.",
      "Only what is assigned to you. Accepting, scheduling, doing and completing all happen here.")) + melding() +
      tegels([[T("Open werkorders", "Open work orders"), String(WO.length - Object.keys(staat.gereed).length)],
        [T("Deze week gepland", "Scheduled this week"), "2"], [T("Ingediend, nog niet betaald", "Submitted, unpaid"), "€ 4.800"],
        [T("Uw reactietijd", "Your response time"), "0,8 " + T("dag", "days"), T("afspraak: 1 werkdag", "agreed: 1 working day")]]) +
      '<div class="ek-mt-s">' + WO.map(function (w) {
        var klaar = staat.gereed[w.id];
        return '<div class="ek-card" style="margin-bottom:10px">' +
          '<div class="ek-flow" style="justify-content:space-between;align-items:flex-start">' +
          '<div><p class="ek-lbl">' + U.esc(w.nr) + ' · ' + U.DATE(w.datum) + ' · ' + w.tijd + '</p>' +
          '<p style="font-size:14px;font-weight:600;margin-top:5px">' + U.esc(w.oms) + '</p>' +
          '<p class="ek-sub">' + U.esc(w.object) + '</p>' +
          '<p class="ek-sub">' + U.esc(w.contact) + ' · ' + U.esc(w.tarief) + '</p></div>' +
          (klaar ? U.chip(T("Afgemeld", "Completed"), "ok") : U.chip(T("Aangenomen", "Accepted"), "info")) + '</div>' +
          '<div class="ek-mt-s">' + U.btns(klaar
            ? [{ label: T("Factuur indienen", "Submit invoice"), primary: true, attr: 'data-ek-por-doe="' + T("Factuur ingediend voor deze werkorder.", "Invoice submitted for this work order.") + '"' }]
            : [{ label: T("Starten", "Start"), attr: 'data-ek-por-doe="' + T("Starttijd geregistreerd.", "Start time recorded.") + '"' },
               { label: T("Foto toevoegen", "Add photo"), attr: 'data-ek-por-doe="' + T("Foto toegevoegd aan de werkorder.", "Photo added to the work order.") + '"' },
               { label: T("Materiaal boeken", "Log materials"), attr: 'data-ek-por-doe="' + T("Materiaal geboekt op deze werkorder.", "Materials logged on this work order.") + '"' },
               { label: T("Gereedmelden", "Complete"), primary: true, attr: 'data-ek-por-gereed="' + w.id + '"' },
               { label: T("Datum voorstellen", "Propose a date"), attr: 'data-ek-por-doe="' + T("Voorstel voor een andere datum verstuurd.", "Proposal for another date sent.") + '"' }]) + '</div></div>';
      }).join("") + '</div>';
  }

  /* ================= MAKELAAR ================= */
  function makelaarScherm() {
    if (scherm === "kandidaten") {
      return kop(T("Uw kandidaten", "Your candidates"), T("Alleen de kandidaten die u zelf heeft aangebracht, met de fase waarin ze zitten.",
        "Only the candidates you introduced yourself, with the stage they are in.")) + melding() +
        '<div class="ek-mt-s">' + U.table([{ label: T("Kandidaat", "Candidate") }, { label: T("Unit", "Unit") }, { label: T("Aangebracht", "Introduced") },
          { label: T("Fase", "Stage") }, { label: "" }],
          [[T("Stichting Zorggroep Noard", "Stichting Zorggroep Noard"), T("Achmeatoren 5.03", "Achmeatoren 5.03"), U.DATE("2026-07-18"),
            U.chip(T("Aanbod uitgebracht", "Offer made"), "info"), U.btns([{ label: T("Status bekijken", "Check status"), attr: 'data-ek-por-doe="' + T("De eigenaar beoordeelt het verzoek om drie maanden huurvrij.", "The owner is reviewing the request for three months rent-free.") + '"' }])],
           ["Bakker & Zn. Advies", T("Trije Hûs, tweede verdieping", "Trije Hûs, second floor"), U.DATE("2026-06-02"),
            U.chip(T("In onderhandeling", "In negotiation"), "warn"), U.btns([{ label: T("Bericht sturen", "Send a message"), attr: 'data-ek-por-doe="' + T("Uw bericht staat bij de beheerder.", "Your message is with the manager.") + '"' }])],
           [T("Kandidaat teruggetrokken", "Candidate withdrew"), T("Casa Velha nr. 3", "Casa Velha no. 3"), U.DATE("2026-05-21"),
            U.chip(T("Vervallen", "Lapsed"), ""), ""]]) + '</div>' +
        '<div class="ek-mt-s">' + U.btns([{ label: T("Kandidaat aanmelden", "Register a candidate"), primary: true, attr: 'data-ek-por-doe="' + T("Kandidaat aangemeld. De beheerder toetst de stukken.", "Candidate registered. The manager will assess the documents.") + '"' }]) + '</div>';
    }
    if (scherm === "bezichtigingen") {
      return kop(T("Bezichtigingen", "Viewings"), T("Wat er staat gepland en welke sleutel u nodig heeft.",
        "What is scheduled and which key you need.")) + melding() +
        '<div class="ek-mt-s">' + U.table([{ label: T("Datum", "Date") }, { label: T("Unit", "Unit") }, { label: T("Kandidaat", "Candidate") },
          { label: T("Toegang", "Access") }, { label: "" }],
          [[U.DATE("2026-08-28") + " · 14:00", T("Achmeatoren 5.03", "Achmeatoren 5.03"), T("Twee geïnteresseerden", "Two interested parties"),
            T("Sleutel bij de receptie", "Key at reception"), U.btns([{ label: T("Verzetten", "Reschedule"), attr: 'data-ek-por-doe="' + T("Verzoek tot verzetten verstuurd.", "Reschedule request sent.") + '"' }])],
           [U.DATE("2026-09-02") + " · 10:30", T("Trije Hûs, tweede verdieping", "Trije Hûs, second floor"), "Bakker & Zn. Advies",
            T("Sleutelkluis, code op de dag zelf", "Key safe, code on the day"), U.btns([{ label: T("Bevestigen", "Confirm"), primary: true, attr: 'data-ek-por-doe="' + T("Bezichtiging bevestigd.", "Viewing confirmed.") + '"' }])]]) + '</div>';
    }
    if (scherm === "materiaal") {
      return kop(T("Materiaal", "Marketing material"), T("Plattegronden, foto's en teksten die u mag gebruiken.",
        "Floor plans, photos and copy you are allowed to use.")) + melding() +
        '<div class="ek-mt-s">' + U.table([{ label: T("Bestand", "File") }, { label: T("Unit", "Unit") }, { label: T("Soort", "Type") }, { label: "" }],
          [[T("Plattegrond verdieping 5", "Floor plan, floor 5"), T("Achmeatoren 5.03", "Achmeatoren 5.03"), "PDF",
            U.btns([{ label: T("Downloaden", "Download"), attr: 'data-ek-por-doe="' + T("Bestand gedownload.", "File downloaded.") + '"' }])],
           [T("Fotoserie, twaalf beelden", "Photo set, twelve images"), T("Achmeatoren 5.03", "Achmeatoren 5.03"), "ZIP",
            U.btns([{ label: T("Downloaden", "Download"), attr: 'data-ek-por-doe="' + T("Bestand gedownload.", "File downloaded.") + '"' }])],
           [T("Objecttekst Nederlands en Engels", "Property copy, Dutch and English"), T("Achmeatoren 5.03", "Achmeatoren 5.03"), "DOCX",
            U.btns([{ label: T("Downloaden", "Download"), attr: 'data-ek-por-doe="' + T("Bestand gedownload.", "File downloaded.") + '"' }])],
           [T("Energielabel", "Energy label"), T("Achmeatoren", "Achmeatoren"), "PDF",
            U.btns([{ label: T("Downloaden", "Download"), attr: 'data-ek-por-doe="' + T("Bestand gedownload.", "File downloaded.") + '"' }])]]) + '</div>';
    }
    return kop(T("Aanbod dat aan u is toegewezen", "Availability assigned to you"),
      T("Vier units, met vraaghuur, oppervlakte en de datum waarop ze vrij zijn.",
        "Four units, with asking rent, floor area and the date they become available.")) + melding() +
      tegels([[T("Toegewezen units", "Assigned units"), "4"], [T("Uw kandidaten", "Your candidates"), "3"],
        [T("Bezichtigingen deze week", "Viewings this week"), "2"], [T("Gemiddelde doorlooptijd", "Average time to let"), "38 " + T("dagen", "days")]]) +
      '<div class="ek-mt-s">' + U.table([{ label: T("Unit", "Unit") }, { label: T("Oppervlak", "Area"), num: true }, { label: T("Vraaghuur", "Asking rent"), num: true },
        { label: T("Vrij per", "Available") }, { label: T("Kandidaten", "Candidates"), num: true }, { label: "" }],
        [[T("Achmeatoren, verdieping 5 vleugel B", "Achmeatoren, floor 5 wing B"), num("640 m²"), num("€ 8.900"), U.DATE("2027-01-01"), num("4"),
          U.btns([{ label: T("Kandidaat aanmelden", "Register a candidate"), primary: true, attr: 'data-ek-por-doe="' + T("Kandidaat aangemeld voor deze unit.", "Candidate registered for this unit.") + '"' }])],
         [T("Trije Hûs, tweede verdieping", "Trije Hûs, second floor"), num("212 m²"), num("€ 2.450"), U.DATE("2026-11-01"), num("2"),
          U.btns([{ label: T("Materiaal", "Material"), attr: 'data-ek-por-scherm="materiaal"' }])],
         [T("Casa Velha nr. 3", "Casa Velha no. 3"), num("64 m²"), num("€ 985"), U.DATE("2026-09-15"), num("3"),
          U.btns([{ label: T("Bezichtiging plannen", "Schedule a viewing"), attr: 'data-ek-por-scherm="bezichtigingen"' }])],
         [T("Dockumer Sluys, bouwnummer 14", "Dockumer Sluys, unit 14"), num("61 m²"), num("€ 925"), U.DATE("2026-10-01"), num("0"),
          U.btns([{ label: T("Nog niet gepubliceerd", "Not yet published"), off: true }])]]) + '</div>';
  }

  /* ================= ACCOUNTANT ================= */
  function accountantScherm() {
    if (scherm === "proefbalans") {
      return kop(T("Proefbalans", "Trial balance"), T("Per entiteit en per periode, met doorklik naar de onderliggende boekingen.",
        "Per entity and per period, with a click through to the underlying postings.")) + melding() +
        '<div class="ek-mt-s">' + U.table([{ label: T("Rek.", "Acct") }, { label: T("Omschrijving", "Description") },
          { label: T("Debet", "Debit"), num: true }, { label: T("Credit", "Credit"), num: true }],
          [["0100", T("Vastgoedbeleggingen", "Investment property"), num("€ 96.400.000"), ""],
           ["1100", T("Liquide middelen", "Cash at bank"), num("€ 4.186.000"), ""],
           ["1300", T("Debiteuren", "Trade receivables"), num("€ 742.400"), ""],
           ["1600", T("Crediteuren", "Trade payables"), "", num("€ 486.900")],
           ["1650", T("Waarborgsommen huurders", "Tenant deposits"), "", num("€ 1.284.000")],
           ["0800", T("Langlopende schulden banken", "Long-term bank loans"), "", num("€ 62.400.000")],
           { total: true, cells: ["", T("Totaal", "Total"), num("€ 102.793.200"), num("€ 102.793.200")] }]) + '</div>' +
        '<div class="ek-mt-s">' + U.btns([{ label: T("Auditbestand exporteren", "Export audit file"), primary: true, attr: 'data-ek-por-doe="' + T("XAF-auditbestand aangemaakt voor boekjaar 2026.", "XAF audit file created for financial year 2026.") + '"' },
          { label: T("Naar Excel", "To Excel"), attr: 'data-ek-por-doe="' + T("Proefbalans geëxporteerd.", "Trial balance exported.") + '"' },
          { label: T("Periode kiezen", "Choose a period"), attr: 'data-ek-por-doe="' + T("U kunt elke afgesloten periode terugkijken.", "You can look back at any closed period.") + '"' }]) + '</div>';
    }
    if (scherm === "btw") {
      return kop(T("Btw en ICP", "VAT and ICP"), T("Met de aansluiting op het grootboek erbij, zodat de controle geen puzzel is.",
        "With the reconciliation to the ledger attached, so the check is not a puzzle.")) + melding() +
        '<div class="ek-mt-s">' + U.table([{ label: T("Rubriek", "Box") }, { label: T("Omschrijving", "Description") },
          { label: T("Grondslag", "Base"), num: true }, { label: T("Btw", "VAT"), num: true }],
          [["1a", T("Leveringen belast 21%", "Supplies taxed at 21%"), num("€ 1.842.000"), num("€ 386.820")],
           ["1e", T("Leveringen vrijgesteld, woonhuur", "Exempt supplies, residential rent"), num("€ 684.000"), num("-")],
           ["5b", T("Voorbelasting", "Input VAT"), "-", num("- € 96.200")],
           { total: true, cells: ["", T("Af te dragen over juli", "Payable for July"), "", num("€ 290.620")] }]) + '</div>' +
        '<p class="ek-mt-s ek-note">' + T("Veertien objecten hebben zowel belaste als vrijgestelde verhuur; de voorbelasting is verdeeld op de omzetverhouding 73 tegen 27. Drie objecten zitten in de herzieningstermijn.",
          "Fourteen properties have both taxed and exempt letting; input VAT is split on the 73 to 27 turnover ratio. Three properties are inside the adjustment period.") + '</p>';
    }
    if (scherm === "documenten") return documentenScherm([
      [T("Jaarrekening 2025, EYE Vastgoed B.V.", "Annual accounts 2025, EYE Vastgoed B.V."), "2026-04-22"],
      [T("Auditbestand 2025", "Audit file 2025"), "2026-04-10"],
      [T("Bankafschriften juli 2026", "Bank statements July 2026"), "2026-08-01"],
      [T("Taxatierapport Achmeatoren", "Valuation report Achmeatoren"), "2026-05-14"],
      [T("Leningovereenkomst Rabobank", "Loan agreement Rabobank"), "2022-06-01"]
    ]);
    if (scherm === "vragen") return vragenScherm([
      [T("Kantoor Noord", "Kantoor Noord"), T("Waarom staat MEM 2026-08-002 nog op concept?", "Why is MEM 2026-08-002 still in draft?"),
       T("De herrubricering van de servicekosten wacht op de definitieve afrekening van IQON. Zodra die is goedgekeurd wordt de post geboekt.",
         "The service charge reclassification is waiting for the final IQON settlement. The entry will be posted once that is approved.")],
      [T("Kantoor Noord", "Kantoor Noord"), T("Is de waarborgsommenrekening aangesloten?", "Is the deposits account reconciled?"),
       T("Ja, 1.284.000 euro op rekening 1650 komt overeen met het totaal van de individuele waarborgsommen per contract.",
         "Yes, 1,284,000 euro on account 1650 matches the total of the individual deposits per lease.")]
    ]);
    return kop(T("Administratie", "Ledger"), T("Leestoegang op drie entiteiten, met exportrecht en de mogelijkheid om per post een vraag te stellen.",
      "Read access to three entities, with export rights and the option to query any posting.")) + melding() +
      tegels([[T("Entiteiten", "Entities"), "3"], [T("Open periode", "Open period"), U.MONTH("2026-08-01")],
        [T("Ongeletterde mutaties", "Unmatched transactions"), "7"], [T("Uw vragen open", "Your open queries"), "2"]]) +
      '<div class="ek-mt-s">' + U.table([{ label: T("Entiteit", "Entity") }, { label: T("Laatst afgesloten", "Last closed") },
        { label: T("Balanstotaal", "Balance sheet total"), num: true }, { label: T("Resultaat", "Result"), num: true }, { label: T("Status", "Status") }],
        [["EYE Vastgoed B.V.", U.MONTH("2026-07-01"), num("€ 102,8 mln"), num("€ 2,09 mln"), U.chip(T("Sluit", "Reconciles"), "ok")],
         ["ERKO Dokkum Beheer B.V.", U.MONTH("2026-07-01"), num("€ 18,5 mln"), num("€ 0,38 mln"), U.chip(T("Sluit", "Reconciles"), "ok")],
         ["Kooistra Beheer B.V.", U.MONTH("2026-06-01"), num("€ 7,2 mln"), num("€ 0,15 mln"), U.chip(T("Juli nog open", "July still open"), "warn")]]) + '</div>' +
      '<div class="ek-mt-s">' + U.btns([{ label: T("Naar proefbalans", "To the trial balance"), primary: true, attr: 'data-ek-por-scherm="proefbalans"' },
        { label: T("Btw en ICP", "VAT and ICP"), attr: 'data-ek-por-scherm="btw"' },
        { label: T("Vraag stellen bij een post", "Query a posting"), attr: 'data-ek-por-scherm="vragen"' }]) + '</div>';
  }

  /* ================= BANK ================= */
  function bankScherm() {
    if (scherm === "convenanten") {
      return kop(T("Convenanten", "Covenants"), T("Zoals ze in de kredietovereenkomst staan gedefinieerd, met de ruimte tot de grens.",
        "As defined in the loan agreement, with the headroom to the limit.")) + melding() +
        '<div class="ek-mt-s">' + U.table([{ label: T("Convenant", "Covenant") }, { label: T("Grens", "Limit") }, { label: T("Nu", "Current") },
          { label: T("Ruimte", "Headroom") }, { label: T("Peildatum", "As at") }, { label: T("Status", "Status") }],
          [["LTV", T("maximaal 60%", "maximum 60%"), "44,2%", num("26,3%"), U.DATE("2026-06-30"), U.chip(T("Ruim", "Comfortable"), "ok")],
           ["DSCR", T("minimaal 1,30", "minimum 1.30"), "1,94", num("49,2%"), U.DATE("2026-06-30"), U.chip(T("Ruim", "Comfortable"), "ok")],
           [T("Rentedekking", "Interest cover"), T("minimaal 2,00", "minimum 2.00"), "3,52", num("76,0%"), U.DATE("2026-06-30"), U.chip(T("Ruim", "Comfortable"), "ok")],
           [T("Bezettingsgraad", "Occupancy"), T("minimaal 85%", "minimum 85%"), "93,1%", num("9,5%"), U.DATE("2026-06-30"), U.chip(T("Ruim", "Comfortable"), "ok")]]) + '</div>' +
        '<p class="ek-mt-s ek-note">' + T("Deze cijfers komen rechtstreeks uit de administratie van de kredietnemer, met dezelfde definities als in de overeenkomst. Er zit geen handmatige stap tussen waarin een getal kan verschuiven.",
          "These figures come straight from the borrower's ledger, using the same definitions as the agreement. There is no manual step in between where a number can shift.") + '</p>';
    }
    if (scherm === "objecten") {
      return kop(T("Vrijgegeven objecten", "Released properties"), T("Alleen wat de eigenaar expliciet heeft vrijgegeven voor dit pakket.",
        "Only what the owner explicitly released for this pack.")) + melding() +
        '<div class="ek-mt-s">' + U.table([{ label: T("Object", "Property") }, { label: T("Waarde", "Value"), num: true },
          { label: T("Huur per jaar", "Rent per year"), num: true }, { label: T("Bezetting", "Occupancy"), num: true },
          { label: "WAULT", num: true }, { label: T("Label", "Label") }, { label: T("Zekerheid", "Security") }],
          [["Achmeatoren / IQON", num("€ 38,6 mln"), num("€ 3,18 mln"), num("93,1%"), num("6,2 jr"), U.chip("A", "ok"), T("Eerste hypotheek", "First charge")],
           ["Basic-Fit Dokkum", num("€ 6,4 mln"), num("€ 0,21 mln"), num("100%"), num("3,0 jr"), U.chip("B", "ok"), T("Eerste hypotheek", "First charge")]]) + '</div>' +
        '<div class="ek-mt-s">' + U.btns([{ label: T("Huurlijst opvragen", "Request the rent roll"), primary: true, attr: 'data-ek-por-doe="' + T("De huurlijst is beschikbaar, zonder persoonsgegevens van huurders.", "The rent roll is available, without tenant personal data.") + '"' },
          { label: T("Extra object aanvragen", "Request another property"), attr: 'data-ek-por-doe="' + T("Uw verzoek gaat naar de eigenaar, die per object beslist.", "Your request goes to the owner, who decides per property.") + '"' }]) + '</div>';
    }
    if (scherm === "documenten") return documentenScherm([
      [T("Financieringsmemorandum", "Financing memorandum"), "2026-08-14"],
      [T("Huurlijst per unit", "Rent roll per unit"), "2026-08-01"],
      [T("Taxatierapport Achmeatoren", "Valuation report Achmeatoren"), "2026-05-14"],
      [T("Jaarrekening 2025", "Annual accounts 2025"), "2026-04-22"],
      [T("Convenantrapportage Q2 2026", "Covenant report Q2 2026"), "2026-07-14"],
      [T("Capexprogramma", "Capex programme"), "2026-08-12"]
    ]);
    if (scherm === "vragen") return vragenScherm([
      ["Rabobank", T("Hoe is de leegstand van verdieping 5 verwerkt in de prognose?", "How is the vacancy on floor 5 reflected in the forecast?"),
       T("De prognose rekent met verhuur per 1 januari 2027 tegen 8.900 euro per maand. In het somberste scenario blijft de DSCR op 1,71.",
         "The forecast assumes letting from 1 January 2027 at 8,900 euro a month. In the downside scenario the DSCR stays at 1.71.")],
      ["Rabobank", T("Is er nieuwe schuld aangetrokken sinds de laatste rapportage?", "Has any new debt been raised since the last report?"),
       T("Nee. De enige mutatie is de reguliere aflossing van 240.000 euro in het tweede kwartaal.",
         "No. The only movement is the regular amortisation of 240,000 euro in the second quarter.")]
    ]);
    return kop(T("Financieringspakket EYE Vastgoed", "Financing pack EYE Vastgoed"),
      T("Toegang tot 30 november 2026. Elke opening van een document wordt vastgelegd.",
        "Access until 30 November 2026. Every document opened is recorded.")) + melding() +
      tegels([[T("Vrijgegeven waarde", "Value released"), "€ 45,0 mln", T("twee objecten", "two properties")],
        [T("Gevraagde faciliteit", "Facility requested"), "€ 13,3 mln", T("herfinanciering juli 2028", "refinancing July 2028")],
        [T("Pro forma LTV", "Pro forma LTV"), "48,4%", T("convenantgrens 60%", "covenant limit 60%")],
        [T("DSCR", "DSCR"), "1,94", T("minimaal 1,30", "minimum 1.30")]]) +
      '<div class="ek-mt-s ek-g ek-split">' +
      U.panel(T("Inhoud van het pakket", "Contents of the pack"), '<div class="ek-panel-body">' +
        ["Financieringsmemorandum|Financing memorandum", "Objectenlijst met kadastrale gegevens|Asset schedule with land registry data",
         "Huurlijst per unit|Rent roll per unit", "Historische NOI, drie jaar|Historic NOI, three years",
         "Taxatierapporten|Valuation reports", "Huurexpiratieschema|Lease expiry schedule",
         "Achterstanden en incassogeschiedenis|Arrears and collection history", "Capexprogramma|Capex programme",
         "Energielabels en ESG|Energy labels and ESG", "Bestaande schuld en zekerheden|Existing debt and security"].map(function (x) {
          var d = x.split("|");
          return '<label class="ek-check"><input type="checkbox" checked disabled> ' + T(d[0], d[1]) + '</label>';
        }).join("") + '</div>') +
      U.panel(T("Wat u hier niet ziet", "What you do not see here"), '<div class="ek-panel-body">' +
        '<p class="ek-p">' + T("Huurdergegevens, bankmutaties, correspondentie en elk object dat de eigenaar niet heeft vrijgegeven. Dat is geen technische beperking maar een keuze van de eigenaar, per object vastgelegd met een einddatum.",
          "Tenant personal data, bank transactions, correspondence and any property the owner has not released. That is not a technical limit but the owner's choice, recorded per property with an end date.") + '</p>' +
        '<div class="ek-mt-s">' + U.kv([
          [T("Toegang tot", "Access until"), U.DATE("2026-11-30")],
          [T("Downloads gelogd", "Downloads logged"), T("ja, per document en per gebruiker", "yes, per document and per user")],
          [T("Vragen", "Questions"), T("gaan naar de eigenaar, antwoord komt in het pakket", "go to the owner, the answer lands in the pack")]
        ]) + '</div>' +
        '<div class="ek-mt-s">' + U.btns([{ label: T("Termsheet uploaden", "Upload a term sheet"), primary: true, attr: 'data-ek-por-doe="' + T("Termsheet ontvangen. De eigenaar vergelijkt hem met de andere aanbiedingen op totale kosten.", "Term sheet received. The owner will compare it with the other offers on all-in cost.") + '"' },
          { label: T("Vraag stellen", "Ask a question"), attr: 'data-ek-por-scherm="vragen"' }]) + '</div></div>') + '</div>';
  }

  /* ---------- gedeelde schermen ---------- */
  function documentenScherm(lijst) {
    return kop(T("Documenten", "Documents"), T("Wat voor u is vrijgegeven. Elke opening wordt vastgelegd.",
      "What has been released to you. Every opening is recorded.")) + melding() +
      '<div class="ek-mt-s">' + U.table([{ label: T("Document", "Document") }, { label: T("Datum", "Date") }, { label: "" }],
        lijst.map(function (d) {
          return [U.esc(d[0]), U.DATE(d[1]), U.btns([{ label: T("Openen", "Open"), attr: 'data-ek-por-doe="' + T("Document geopend en vastgelegd in het logboek.", "Document opened and recorded in the log.") + '"' },
            { label: T("Downloaden", "Download"), attr: 'data-ek-por-doe="' + T("Download vastgelegd met tijdstip en gebruiker.", "Download recorded with time and user.") + '"' }])];
        })) + '</div>';
  }
  function vragenScherm(lijst) {
    return kop(T("Vragen en antwoorden", "Questions and answers"), T("Antwoorden gaan naar iedereen met toegang, zodat niemand meer weet dan een ander.",
      "Answers go to everyone with access, so nobody knows more than anyone else.")) + melding() +
      '<div class="ek-mt-s">' + lijst.map(function (v) {
        return '<div class="ek-card ek-card-tight" style="margin-bottom:8px"><p class="ek-lbl">' + U.esc(v[0]) + '</p>' +
          '<p class="ek-p" style="margin-top:6px"><strong>' + U.esc(v[1]) + '</strong></p>' +
          '<p class="ek-p" style="margin-top:4px">' + U.esc(v[2]) + '</p></div>';
      }).join("") +
      '<div class="ek-form"><label class="ek-field-lbl"><span class="ek-lbl">' + T("Nieuwe vraag", "New question") + '</span>' +
      '<textarea class="ek-field" rows="2" placeholder="' + T("Stel uw vraag", "Ask your question") + '"></textarea></label>' +
      U.btns([{ label: T("Versturen", "Send"), primary: true, attr: 'data-ek-por-doe="' + T("Vraag verstuurd. Het antwoord verschijnt hier en bij alle andere deelnemers.", "Question sent. The answer will appear here and for all other participants.") + '"' }]) + '</div></div>';
  }

  /* ---------- rechten en beheer ---------- */
  var RECHTEN = {
    huurder: { ziet: [["Eigen huurcontract en huurspecificatie", "Own lease and rent breakdown"], ["Facturen, betalingen en saldo", "Invoices, payments and balance"],
      ["Servicekostenafrekening met de posten erachter", "Service charge settlement with the underlying items"], ["Eigen meldingen met status en foto's", "Own issues with status and photos"],
      ["Documenten en berichten in het eigen dossier", "Documents and messages in their own file"]],
      niet: ["Andere huurders, de exploitatiecijfers van het gebouw en alles van de eigenaar.", "Other tenants, the building's operating figures and anything belonging to the owner."] },
    eigenaar: { ziet: [["Eigen objecten met waarde, bezetting en NOI", "Own properties with value, occupancy and NOI"], ["Maandelijkse afrekening met onderliggende posten", "Monthly statement with underlying items"],
      ["Budget tegen werkelijk en het capexprogramma", "Budget against actual and the capex programme"], ["Taxaties en energielabels", "Valuations and energy labels"],
      ["Uitkeringen en toezeggingen in het vehikel", "Distributions and commitments in the vehicle"]],
      niet: ["Huurdergegevens van andere eigenaren en de administratie van entiteiten waarin hij niet deelneemt.", "Tenant data of other owners and the ledgers of entities they do not participate in."] },
    leverancier: { ziet: [["Toegewezen werkorders met adres en contact", "Assigned work orders with address and contact"], ["Afgesproken tarieven en raamovereenkomst", "Agreed rates and framework agreement"],
      ["Planning en afgesproken doorlooptijd", "Schedule and agreed response time"], ["Eigen offertes en facturen met betaalstatus", "Own quotes and invoices with payment status"],
      ["Installatiegegevens en onderhoudshistorie", "Installation data and maintenance history"]],
      niet: ["Werkorders van andere leveranciers, huurgegevens en alles wat met het geld van de eigenaar te maken heeft.", "Work orders of other suppliers, rent data and anything to do with the owner's money."] },
    makelaar: { ziet: [["Aan hem toegewezen leegstand", "Vacancies assigned to them"], ["Vraaghuur, oppervlakte en beschikbaarheid", "Asking rent, floor area and availability"],
      ["Eigen aangebrachte kandidaten met fase", "Own introduced candidates with their stage"], ["Advertentiemateriaal en plattegronden", "Listing material and floor plans"],
      ["Bezichtigingsagenda en toegang", "Viewing schedule and access"]],
      niet: ["Kandidaten van andere makelaars, de huurhistorie van zittende huurders en de financiering van het object.", "Candidates of other brokers, the rent history of sitting tenants and the financing of the property."] },
    accountant: { ziet: [["Grootboek, dagboeken en journaalposten", "Ledger, journals and journal entries"], ["Proefbalans en jaarstukken per entiteit", "Trial balance and annual accounts per entity"],
      ["Btw-aangiften met de aansluiting", "VAT returns with the reconciliation"], ["Bankmutaties en afletterstatus", "Bank transactions and matching status"],
      ["Onderliggende facturen en documenten", "Underlying invoices and documents"]],
      niet: ["Persoonsgegevens van huurders die niet nodig zijn voor de jaarrekening, en de netwerkcijfers van andere organisaties.", "Tenant personal data not needed for the accounts, and the network figures of other organisations."] },
    bank: { ziet: [["Alleen het vrijgegeven financieringspakket", "Only the released financing pack"], ["Huurlijst, historische NOI en waarderingen", "Rent roll, historic NOI and valuations"],
      ["Convenantrapportage met ruimte tot de grens", "Covenant report with headroom to the limit"], ["Zekerheden, bestaande schuld en aflosschema", "Security, existing debt and amortisation schedule"],
      ["Energielabels en capexprogramma", "Energy labels and the capex programme"]],
      niet: ["Huurdergegevens, bankmutaties, correspondentie en elk object dat de eigenaar niet expliciet heeft vrijgegeven.", "Tenant data, bank transactions, correspondence and any property the owner has not explicitly released."] }
  };

  function rechtenVlak(R) {
    var r = RECHTEN[R.id];
    return '<div class="ek-mt ek-g ek-split">' +
      U.panel(T("Ziet wel", "Can see"), '<div class="ek-panel-body">' +
        r.ziet.map(function (z) { return '<label class="ek-check"><input type="checkbox" checked disabled> ' + T(z[0], z[1]) + '</label>'; }).join("") + '</div>') +
      U.panel(T("Ziet niet", "Cannot see"), '<div class="ek-panel-body"><p class="ek-p">' + T(r.niet[0], r.niet[1]) + '</p>' +
        '<div class="ek-mt-s">' + U.kv([
          [T("Grondslag", "Basis"), T("rol plus begrenzing op object, entiteit en gevoeligheid", "role plus bounds on property, entity and sensitivity")],
          [T("Vervaldatum", "Expiry"), R.id === "bank" ? U.DATE("2026-11-30") : T("zolang de relatie loopt", "as long as the relationship lasts")],
          [T("Gelogd", "Logged"), T("elke inzage van gevoelige gegevens en elke download", "every view of sensitive data and every download")],
          [T("Intrekken", "Revoke"), T("per direct, het auditspoor blijft", "immediate, the audit trail remains")]
        ]) + '</div></div>') +
      '</div>' +
      U.note(T("De portalen delen één rechtenmodel met de rest van het platform. Een leverancier die ook huurder is, logt één keer in en ziet beide rollen naast elkaar; er ontstaat geen tweede account met een eigen wachtwoord dat niemand meer bijhoudt.",
               "The portals share one permission model with the rest of the platform. A supplier who is also a tenant signs in once and sees both roles side by side; there is no second account with its own password that nobody maintains."));
  }

  function beheerVlak() {
    var rijen = ROLLEN.map(function (p) {
      return [T(p.nl, p.en), num(p.aantal), num(p.actief),
        '<div class="ek-bar' + (p.actief / p.aantal < 0.6 ? " ek-bar-red" : " ek-bar-ok") + '"><span style="width:' + Math.round(p.actief / p.aantal * 100) + '%"></span></div><span class="ek-sub">' + Math.round(p.actief / p.aantal * 100) + '%</span>',
        String(p.schermen.length),
        p.id === "bank" ? U.chip(U.DATE("2026-11-30"), "warn") : U.chip(T("Doorlopend", "Ongoing"), ""),
        U.btns([{ label: T("Uitnodigen", "Invite"), primary: true, attr: 'data-ek-por-doe="' + T("Uitnodiging verstuurd. De ontvanger stelt zelf twee-factor in.", "Invitation sent. The recipient sets up two-factor themselves.") + '"' },
          { label: T("Bekijken als", "Preview as"), attr: 'data-ek-por-p="' + p.id + '"' },
          { label: T("Intrekken", "Revoke"), danger: true, attr: 'data-ek-por-doe="' + T("Toegang ingetrokken. Het auditspoor blijft bewaard.", "Access revoked. The audit trail is retained.") + '"' }])];
    });
    return '<div class="ek-mt">' + U.panel(T("Portaalbeheer", "Portal management"),
      U.table([{ label: T("Portaal", "Portal") }, { label: T("Uitgenodigd", "Invited"), num: true }, { label: T("Actief", "Active"), num: true },
        { label: T("Gebruik", "Usage") }, { label: T("Schermen", "Screens") }, { label: T("Geldigheid", "Validity") }, { label: T("Actie", "Action") }], rijen),
      U.btns([{ label: T("Huisstijl instellen", "Configure branding"), primary: true, attr: 'data-ek-por-doe="' + T("Logo, kleur en afzender per portaal in te stellen.", "Logo, colour and sender can be set per portal.") + '"' },
        { label: T("Uitnodiging opnieuw sturen", "Resend invitation"), attr: 'data-ek-por-doe="' + T("Uitnodiging opnieuw verstuurd.", "Invitation resent.") + '"' },
        { label: T("Sessies bekijken", "View sessions"), attr: 'data-ek-por-doe="' + T("Actieve sessies per gebruiker, met de mogelijkheid ze te beëindigen.", "Active sessions per user, with the option to end them.") + '"' }])) +
      melding() +
      U.ai(T("Wat opvalt in het gebruik", "What stands out in the usage"),
        T("Van de 541 huurders logt 72% in; de rest belt of mailt nog. Dat is geen probleem, maar wel de plek waar de meeste tijd te winnen valt: een melding via het portaal komt met object, unit en foto binnen. De makelaars zijn de kleinste groep en tegelijk de groep die het portaal het vaakst opent.",
          "Of the 541 tenants, 72% sign in; the rest still phone or email. That is not a problem, but it is where most time can be saved: an issue reported through the portal arrives with property, unit and photo attached. The brokers are the smallest group and at the same time the group that opens the portal most often.")) + '</div>';
  }

  /* ---------- inhaken op de bestaande portalenpagina ---------- */
  function haak() {
    if (pad().replace(/\/$/, "") !== "/portals") return;
    var main = document.querySelector("main");
    if (!main || document.getElementById("ek-portals-root")) return;
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
