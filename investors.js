/* Investeerders & syndicatie: van propositie tot uitkering, met dezelfde
   cijfers als de exploitatie eronder. Software en dataroom, geen aanbieding. */
(function () {
  var U = window.EKUI, T = U.T;
  var tab = "deals", deal = "sense", stap = 5;

  function deals() {
    return [
      { id: "sense", naam: T("Sense Dokkum · theater, horeca en brouwerij", "Sense Dokkum · theatre, hospitality and brewery"), vehikel: "Sense Dokkum Vastgoed C.V.",
        doel: 2400000, toegezegd: 1875000, gestort: 950000, investeerders: 9, rendement: 7.4, looptijd: 8, status: "werving",
        omschrijving: T("Eigen inbreng voor de transformatie van het Sense-gebouw. Het vastgoed blijft in de C.V.; de exploitatie van horeca en brouwerij zit in een aparte werkmaatschappij, zodat een tegenvallend jaar in de horeca het vastgoed niet raakt.",
                        "Equity for the transformation of the Sense building. The property stays in the partnership; hospitality and brewing operations sit in a separate operating company, so a weak year in hospitality does not touch the property.") },
      { id: "ameland", naam: T("Oude Rabobank Ameland · zes verblijfseenheden", "Former Rabobank Ameland · six holiday units"), vehikel: "Ameland Verblijf B.V.",
        doel: 900000, toegezegd: 900000, gestort: 900000, investeerders: 4, rendement: 8.1, looptijd: 6, status: "gesloten",
        omschrijving: T("Volgestort in mei. Vier investeerders, waarvan twee uit de eigen kring. De verwachte opbrengst leunt op het seizoen; het rendement is daarom uitgedrukt na een leegstandsaanname van achttien weken per jaar.",
                        "Fully subscribed in May. Four investors, two of them from the immediate circle. The expected return leans on the season, so the yield is stated after an assumed eighteen weeks of vacancy per year.") },
      { id: "groningen", naam: T("Portefeuille Groningen · negen panden", "Groningen portfolio · nine properties"), vehikel: "Noord Wonen Invest C.V.",
        doel: 3600000, toegezegd: 1240000, gestort: 0, investeerders: 3, rendement: 6.8, looptijd: 10, status: "voorbereiding",
        omschrijving: T("Nog niet opengesteld. De taxaties zijn aangevraagd en de bankfinanciering is in gesprek; pas als de faciliteit rond is gaat de dataroom open voor de bredere kring.",
                        "Not yet opened. Valuations have been ordered and bank financing is under discussion; the data room only opens to the wider circle once the facility is in place.") }
    ];
  }

  var ROUTE = [
    { nl: "Propositie", en: "Opportunity" }, { nl: "Vehikel", en: "Vehicle" }, { nl: "Dataroom", en: "Data room" },
    { nl: "Uitnodiging", en: "Invitation" }, { nl: "KYC", en: "KYC" }, { nl: "Toezegging", en: "Commitment" },
    { nl: "Ondertekening", en: "Signing" }, { nl: "Storting", en: "Funding" }, { nl: "Closing", en: "Closing" },
    { nl: "Uitkering", en: "Distribution" }
  ];

  function investeerders(id) {
    var m = {
      sense: [
        { naam: "Epie Kooistra", soort: T("Particulier", "Individual"), toegezegd: 500000, gestort: 500000, kyc: "gereed", aandeel: 20.8 },
        { naam: "Harns Invest B.V.", soort: T("Vennootschap", "Company"), toegezegd: 600000, gestort: 300000, kyc: "gereed", aandeel: 25.0 },
        { naam: T("Familie De Boer", "De Boer family"), soort: T("Particulier", "Individual"), toegezegd: 250000, gestort: 150000, kyc: "gereed", aandeel: 10.4 },
        { naam: T("Stichting Hylkema", "Stichting Hylkema"), soort: T("Stichting", "Foundation"), toegezegd: 275000, gestort: 0, kyc: "loopt", aandeel: 11.5 },
        { naam: T("Vijf kleinere deelnemers", "Five smaller participants"), soort: T("Particulier", "Individual"), toegezegd: 250000, gestort: 0, kyc: "loopt", aandeel: 10.4 }
      ],
      ameland: [
        { naam: "Epie Kooistra", soort: T("Particulier", "Individual"), toegezegd: 300000, gestort: 300000, kyc: "gereed", aandeel: 33.3 },
        { naam: T("Familie De Boer", "De Boer family"), soort: T("Particulier", "Individual"), toegezegd: 200000, gestort: 200000, kyc: "gereed", aandeel: 22.2 },
        { naam: "Waddenkapitaal B.V.", soort: T("Vennootschap", "Company"), toegezegd: 250000, gestort: 250000, kyc: "gereed", aandeel: 27.8 },
        { naam: T("Twee particuliere deelnemers", "Two individual participants"), soort: T("Particulier", "Individual"), toegezegd: 150000, gestort: 150000, kyc: "gereed", aandeel: 16.7 }
      ],
      groningen: [
        { naam: "Harns Invest B.V.", soort: T("Vennootschap", "Company"), toegezegd: 600000, gestort: 0, kyc: "gereed", aandeel: 16.7 },
        { naam: "Waddenkapitaal B.V.", soort: T("Vennootschap", "Company"), toegezegd: 400000, gestort: 0, kyc: "loopt", aandeel: 11.1 },
        { naam: T("Eén particuliere deelnemer", "One individual participant"), soort: T("Particulier", "Individual"), toegezegd: 240000, gestort: 0, kyc: "open", aandeel: 6.7 }
      ]
    };
    return m[id];
  }

  var WATERVAL = [
    { laag: T("Voorkeursrendement 6% per jaar", "Preferred return of 6% per year"), wie: T("Investeerders", "Investors"), deel: "100 / 0" },
    { laag: T("Inhaalslag beheerder", "Manager catch-up"), wie: "EYE Vastgoed B.V.", deel: "0 / 100" },
    { laag: T("Restant tot verkoop", "Remainder until sale"), wie: T("Investeerders en beheerder", "Investors and manager"), deel: "80 / 20" },
    { laag: T("Overwinst bij verkoop", "Excess on sale"), wie: T("Investeerders en beheerder", "Investors and manager"), deel: "70 / 30" }
  ];

  var API = {
    stamp: function () { return tab + "|" + deal + "|" + stap; },
    click: function (e) {
      var t = U.hit(e, "data-ek-inv-tab"); if (t) { tab = t; return true; }
      var d = U.hit(e, "data-ek-inv-deal"); if (d) { deal = d; return true; }
      var s = U.hit(e, "data-ek-inv-stap"); if (s) { stap = Math.min(9, Math.max(0, stap + (+s))); return true; }
      return false;
    },
    html: function () {
      var D = deals();
      var gek = D.filter(function (d) { return d.id === deal; })[0] || D[0];
      var I = investeerders(gek.id);
      var toegezegd = D.reduce(function (s, d) { return s + d.toegezegd; }, 0);
      var gestort = D.reduce(function (s, d) { return s + d.gestort; }, 0);
      var doel = D.reduce(function (s, d) { return s + d.doel; }, 0);

      var body;
      if (tab === "deals") body = dealsTab(D, gek, I);
      else if (tab === "kapitaal") body = kapitaalTab(gek, I);
      else if (tab === "waterval") body = watervalTab(gek);
      else body = dataroomTab(gek);

      return U.head({
        eyebrow: T("Kapitaal · investeerders", "Capital · investors"),
        title: T("Investeerders & syndicatie", "Investors & syndication"),
        intro: T("Meerdere partijen die samen een object of een project financieren, met dezelfde huurlijst, taxatie en exploitatiecijfers als de rest van het dashboard. Deze werkruimte ordent de stukken, de toezeggingen en de uitkeringen; het aanbieden van deelnemingen en het aantrekken van geld blijft een aparte, juridisch getoetste stap.",
                 "Several parties funding a property or project together, working from the same rent roll, valuation and operating figures as the rest of the dashboard. This workspace organises the documents, the commitments and the distributions; offering participations and raising money remains a separate, legally reviewed step."),
        chip: T(D.length + " vehikels · " + I.length + " deelnemers in dit dossier", D.length + " vehicles · " + I.length + " participants in this deal")
      }) +
      U.kpis([
        [T("Doelbedrag", "Target"), U.EURK(doel), T("drie vehikels", "three vehicles")],
        [T("Toegezegd", "Committed"), U.EURK(toegezegd), U.PCT(toegezegd / doel * 100, 0) + T(" van het doel", " of target"), toegezegd / doel * 100],
        [T("Gestort", "Funded"), U.EURK(gestort), U.PCT(gestort / toegezegd * 100, 0) + T(" van de toezeggingen", " of commitments"), gestort / toegezegd * 100],
        [T("Deelnemers", "Participants"), "16", T("waarvan 11 met afgeronde KYC", "11 of them with completed KYC")],
        [T("Verwacht rendement", "Expected return"), U.NUM(gek.rendement, 1) + "%", T("per jaar, na kosten", "per year, after costs")]
      ], 5) +
      '<div class="ek-mt ek-flow">' + D.map(function (d) {
        return '<button type="button" class="ek-tab' + (d.id === deal ? " ek-on" : "") + '" data-ek-inv-deal="' + d.id + '">' + U.esc(d.vehikel) + '</button>';
      }).join("") + '</div>' +
      '<div class="ek-mt">' + U.tabs([
        { id: "deals", label: T("Dossier", "Deal") },
        { id: "kapitaal", label: T("Toezeggingen & KYC", "Commitments & KYC"), count: I.length },
        { id: "waterval", label: T("Rendementsverdeling", "Waterfall") },
        { id: "dataroom", label: T("Dataroom & vragen", "Data room & Q&A") }
      ], tab, "data-ek-inv-tab") + '</div>' + body;
    }
  };

  function dealsTab(D, gek, I) {
    var rijen = D.map(function (d) {
      return [U.esc(d.naam) + '<br><span class="ek-sub">' + U.esc(d.vehikel) + '</span>',
        '<span class="ek-num">' + U.EURK(d.doel) + '</span>',
        '<span class="ek-num">' + U.EURK(d.toegezegd) + '</span>',
        '<span class="ek-num">' + U.EURK(d.gestort) + '</span>',
        '<div class="ek-bar"><span style="width:' + Math.round(d.toegezegd / d.doel * 100) + '%"></span></div><span class="ek-sub">' + U.PCT(d.toegezegd / d.doel * 100, 0) + '</span>',
        '<span class="ek-num">' + d.investeerders + '</span>',
        U.NUM(d.rendement, 1) + '%',
        d.status === "gesloten" ? U.chip(T("Gesloten", "Closed"), "ok") : d.status === "werving" ? U.chip(T("In werving", "Raising"), "info") : U.chip(T("In voorbereiding", "In preparation"), "")];
    });
    return '<div class="ek-mt">' + U.panel(T("Vehikels", "Vehicles"),
      U.table([{ label: T("Propositie", "Opportunity") }, { label: T("Doel", "Target"), num: true }, { label: T("Toegezegd", "Committed"), num: true },
        { label: T("Gestort", "Funded"), num: true }, { label: T("Voortgang", "Progress") }, { label: T("Deelnemers", "Participants"), num: true },
        { label: T("Rendement", "Return") }, { label: T("Status", "Status") }], rijen),
      U.btns([{ label: T("Deal aanmaken", "Create deal"), primary: true }, { label: T("Vehikel opzetten", "Set up vehicle") }, { label: T("Exporteren", "Export") }])) +
      '<div class="ek-mt">' + U.panel(gek.vehikel, '<div class="ek-panel-body">' +
        U.flow(ROUTE.map(function (r) { return T(r.nl, r.en); }), stap) +
        '<p class="ek-mt-s ek-p">' + U.esc(gek.omschrijving) + '</p>' +
        '<div class="ek-mt-s ek-g ek-split">' + U.kv([
          [T("Vehikel", "Vehicle"), U.esc(gek.vehikel)],
          [T("Doelbedrag", "Target"), U.EUR(gek.doel)],
          [T("Minimale deelname", "Minimum participation"), U.EUR(50000)],
          [T("Looptijd", "Term"), gek.looptijd + " " + T("jaar", "years")],
          [T("Verwacht rendement", "Expected return"), U.NUM(gek.rendement, 1) + "% " + T("per jaar", "per year")],
          [T("Beheervergoeding", "Management fee"), T("1,2% over de inbreng", "1.2% of contributed capital")],
          [T("Uitkering", "Distribution"), T("per kwartaal, achteraf", "quarterly, in arrears")]
        ]) +
        U.ai(T("Wat een deelnemer als eerste vraagt", "What a participant asks first"),
          T("Waar komt het rendement vandaan en wat gebeurt er als het tegenzit. Bij dit dossier: de huur is contractueel vastgelegd voor de zaalverhuur, de horeca is variabel, en de brouwerij levert pas vanaf het tweede jaar bij. In het slechtste scenario dat is doorgerekend blijft er 4,1% over; de aflossing op de bankfaciliteit gaat dan voor de uitkering.",
            "Where the return comes from and what happens if it disappoints. In this deal: the event hire rent is contractually fixed, hospitality is variable, and the brewery only contributes from the second year. In the worst scenario modelled, 4.1% remains; amortisation on the bank facility then ranks ahead of the distribution.")) +
        '</div><div class="ek-mt-s">' + U.btns([
          { label: T("Vorige stap", "Previous stage"), attr: 'data-ek-inv-stap="-1"' },
          { label: T("Volgende stap", "Next stage"), primary: true, attr: 'data-ek-inv-stap="1"' },
          { label: T("Uitnodigen", "Invite") }, { label: T("Dataroom openen", "Open data room") },
          { label: T("Capital call", "Capital call") }, { label: T("Closing", "Closing") }
        ]) + '</div></div>') + '</div></div>';
  }

  function kapitaalTab(gek, I) {
    var rijen = I.map(function (i) {
      return [U.esc(i.naam), U.esc(i.soort),
        '<span class="ek-num">' + U.EUR(i.toegezegd) + '</span>',
        '<span class="ek-num">' + U.EUR(i.gestort) + '</span>',
        '<span class="ek-num">' + U.PCT(i.aandeel) + '</span>',
        i.kyc === "gereed" ? U.chip(T("Afgerond", "Complete"), "ok") : i.kyc === "loopt" ? U.chip(T("Loopt", "In progress"), "warn") : U.chip(T("Nog niet gestart", "Not started"), "bad"),
        U.btns([{ label: T("Stukken", "Documents") }, { label: T("Capital call", "Capital call") }])];
    });
    var tot = I.reduce(function (s, i) { return s + i.toegezegd; }, 0);
    rijen.push({ total: true, cells: [T("Totaal", "Total"), "", '<span class="ek-num">' + U.EUR(tot) + '</span>',
      '<span class="ek-num">' + U.EUR(I.reduce(function (s, i) { return s + i.gestort; }, 0)) + '</span>',
      '<span class="ek-num">' + U.PCT(I.reduce(function (s, i) { return s + i.aandeel; }, 0)) + '</span>', "", ""] });
    return '<div class="ek-mt ek-g ek-split">' +
      U.panel(T("Toezeggingen", "Commitments"),
        U.table([{ label: T("Deelnemer", "Participant") }, { label: T("Soort", "Type") }, { label: T("Toegezegd", "Committed"), num: true },
          { label: T("Gestort", "Funded"), num: true }, { label: T("Aandeel", "Share"), num: true }, { label: "KYC" }, { label: T("Actie", "Action") }], rijen),
        U.btns([{ label: T("Deelnemer uitnodigen", "Invite participant"), primary: true }, { label: T("Capital call versturen", "Send capital call") },
          { label: T("Register bijwerken", "Update register") }])) +
      U.panel(T("KYC en witwascontrole", "KYC and anti-money-laundering"), '<div class="ek-panel-body">' +
        U.kv([
          [T("Identificatie", "Identification"), T("via gespecialiseerde aanbieder, alleen resultaat opgeslagen", "through a specialist provider, only the result is stored")],
          [T("Uiteindelijk belanghebbende", "Ultimate beneficial owner"), T("vastgelegd per vennootschap en stichting", "recorded per company and foundation")],
          [T("PEP en sanctielijsten", "PEP and sanctions screening"), T("bij aanvang en jaarlijks opnieuw", "at onboarding and annually thereafter")],
          [T("Herkomst van het vermogen", "Source of funds"), T("verklaring plus onderbouwing", "declaration plus supporting evidence")],
          [T("Risicoprofiel", "Risk rating"), T("laag, midden of hoog met motivering", "low, medium or high with a rationale")],
          [T("Herbeoordeling", "Review date"), T("jaarlijks, eerder bij wijziging", "annually, sooner on any change")]
        ]) +
        '<p class="ek-mt-s ek-note">' + T("Er wordt geen eigen sanctielijst of paspoortcontrole gebouwd. Het systeem bewaart wie wanneer wat heeft gecontroleerd en met welke uitkomst, zodat het dossier bij een toets compleet is.",
          "No in-house sanctions list or passport check is built. The system records who checked what, when, and with what outcome, so the file is complete if it is ever reviewed.") + '</p></div>') +
      '</div>';
  }

  function watervalTab(gek) {
    var rijen = WATERVAL.map(function (w, i) {
      return [String(i + 1), U.esc(w.laag), U.esc(w.wie), U.esc(w.deel)];
    });
    var scenarios = [
      [T("Somber", "Downside"), 4.1, 0],
      [T("Basis", "Base case"), gek.rendement, 320000],
      [T("Gunstig", "Upside"), gek.rendement + 2.3, 780000]
    ];
    return '<div class="ek-mt ek-g ek-split">' +
      U.panel(T("Verdeling van het resultaat", "Distribution of the result"),
        U.table([{ label: "#" }, { label: T("Laag", "Tier") }, { label: T("Wie", "Who") }, { label: T("Verdeling", "Split") }], rijen),
        U.btns([{ label: T("Uitkering berekenen", "Calculate distribution"), primary: true }, { label: T("Scenario doorrekenen", "Run scenario") },
          { label: T("Rapportage versturen", "Send report") }])) +
      U.panel(T("Scenario's", "Scenarios"), '<div class="ek-panel-body">' +
        U.table([{ label: T("Scenario", "Scenario") }, { label: T("Rendement", "Return"), num: true }, { label: T("Overwinst bij verkoop", "Excess on sale"), num: true }],
          scenarios.map(function (s) {
            return [U.esc(s[0]), '<span class="ek-num">' + U.NUM(s[1], 1) + '%</span>', '<span class="ek-num">' + (s[2] ? U.EUR(s[2]) : "-") + '</span>'];
          })) +
        '<p class="ek-mt-s ek-note">' + T("De scenario's gebruiken de huurlijst, de servicekostenafrekening en de bankfaciliteit uit dit dashboard, niet een los rekenmodel. Verandert de bezetting in de exploitatie, dan verandert het scenario mee.",
          "The scenarios use the rent roll, the service charge settlement and the bank facility from this dashboard, not a separate spreadsheet. If occupancy changes in the operations, the scenario changes with it.") + '</p></div>') +
      '</div>';
  }

  function dataroomTab(gek) {
    var stukken = [
      ["Informatiememorandum", "Information memorandum", "PDF", true],
      ["Exploitatiebegroting tien jaar", "Ten-year operating budget", "XLSX", true],
      ["Taxatierapport", "Valuation report", "PDF", true],
      ["Huurlijst en contracten", "Rent roll and leases", "PDF", true],
      ["Bouwkundige opname", "Building survey", "PDF", true],
      ["Vergunningen en bestemmingsplan", "Permits and zoning", "PDF", true],
      ["Conceptovereenkomst deelname", "Draft participation agreement", "PDF", true],
      ["Milieukundig bodemonderzoek", "Environmental soil survey", "PDF", false]
    ];
    var vragen = [
      { wie: "Harns Invest B.V.", vraag: T("Wat gebeurt er als de horeca-exploitant wegvalt?", "What happens if the hospitality operator drops out?"),
        antwoord: T("De huurovereenkomst met de werkmaatschappij loopt door en het vastgoed is ook zonder die exploitant verhuurbaar; in de begroting is een leegstandsperiode van zes maanden meegenomen.",
                    "The lease with the operating company continues and the property is lettable without that operator; the budget allows for a six-month vacancy period.") },
      { wie: T("Stichting Hylkema", "Stichting Hylkema"), vraag: T("Is de brouwinstallatie apart te verkopen?", "Can the brewing installation be sold separately?"),
        antwoord: T("Ja, de installatie staat op de activastaat als roerend en is niet nagelvast verbonden; de bank heeft er geen zekerheidsrecht op.",
                    "Yes, the installation is on the asset register as movable and is not fixed to the building; the bank holds no security over it.") },
      { wie: T("Familie De Boer", "De Boer family"), vraag: T("Hoe wordt de waarde bepaald bij uittreden?", "How is value determined on exit?"),
        antwoord: T("Op basis van de laatste externe taxatie minus de schuld, met een afslag van 3% voor overdrachtskosten. Uittreden kan één keer per jaar op 1 juli.",
                    "On the latest external valuation less debt, with a 3% discount for transfer costs. Exit is possible once a year on 1 July.") }
    ];
    return '<div class="ek-mt ek-g ek-split">' +
      U.panel(T("Stukken", "Documents"), '<div class="ek-panel-body">' +
        U.table([{ label: T("Document", "Document") }, { label: T("Soort", "Type") }, { label: T("Status", "Status") }],
          stukken.map(function (s) {
            return [T(s[0], s[1]), s[2], s[3] ? U.chip(T("Beschikbaar", "Available"), "ok") : U.chip(T("In aanvraag", "Requested"), "warn")];
          })) +
        '<div class="ek-mt-s">' + U.btns([{ label: T("Document toevoegen", "Add document"), primary: true }, { label: T("Toegang beheren", "Manage access") },
          { label: T("Downloadlog", "Download log") }]) + '</div></div>') +
      U.panel(T("Vragen en antwoorden", "Questions and answers"), '<div class="ek-panel-body">' +
        vragen.map(function (v) {
          return '<div style="padding:10px 0;border-bottom:1px solid #ebece8">' +
            '<p class="ek-lbl">' + U.esc(v.wie) + '</p>' +
            '<p class="ek-p" style="margin-top:6px"><strong>' + U.esc(v.vraag) + '</strong></p>' +
            '<p class="ek-p" style="margin-top:4px">' + U.esc(v.antwoord) + '</p></div>';
        }).join("") +
        '<div class="ek-mt-s">' + U.btns([{ label: T("Vraag beantwoorden", "Answer question"), primary: true }, { label: T("Naar alle deelnemers", "Send to all participants") }]) + '</div></div>') +
      '</div>' +
      U.note(T("Alle antwoorden gaan naar alle deelnemers tegelijk en blijven in het dossier staan. Dat voorkomt dat één investeerder informatie heeft die een ander niet heeft, en het is meteen het bewijs dat iedereen hetzelfde beeld kreeg.",
               "Every answer goes to all participants at once and stays in the file. That prevents one investor holding information another does not have, and it is at the same time the evidence that everyone received the same picture."));
  }

  U.mount("ek-investors-root", API);
})();
