/* Objectspecifieke panelen op de objectpagina. Tweetalig (NL/EN).
   Alleen weergave: leest niets en wijzigt geen data. */
(function () {
  var T = function (nl, en) { return (window.__EK_T ? window.__EK_T(nl, en) : nl); };

  function notes() {
    return {
      "casa-velha": {
        eyebrow: T("Exploitatie · korte verhuur", "Operation · short stay"),
        titel: T("Vakantieverhuur via eigen boekingssysteem", "Holiday letting through an in-house booking system"),
        badge: T("Boekingssysteem gekoppeld", "Booking system connected"), badgeOk: true,
        intro: T("Dit object kent geen structurele leegstand. De 21 appartementen worden kortdurend verhuurd; de bezetting wisselt per seizoen en wordt live uit het boekingssysteem gelezen.",
                 "This asset has no structural vacancy. The 21 apartments are let short-stay; occupancy varies by season and is read live from the booking system."),
        cijfers: [
          [T("Jaarbezetting", "Annual occupancy"), "72%"], [T("Bezetting hoogseizoen", "Peak-season occupancy"), "94%"],
          [T("Gem. verblijfsduur", "Avg. length of stay"), T("5,4 nachten", "5.4 nights")], [T("Gem. nachtprijs", "Avg. nightly rate"), "€ 148"],
          [T("Boekingen dit jaar", "Bookings this year"), "892"], [T("Omzet per beschikbare eenheid", "Revenue per available unit"), T("€ 327 / maand", "€ 327 / month")]
        ],
        regels: [
          [T("Boekingskanalen", "Booking channels"), T("Eigen website · Booking.com · Airbnb", "Own website · Booking.com · Airbnb")],
          [T("Synchronisatie", "Synchronisation"), T("Elke 15 minuten · laatste run vandaag 07:15", "Every 15 minutes · last run today 07:15")],
          [T("Prijsstelling", "Pricing"), T("Dynamisch per seizoen en bezettingsgraad", "Dynamic by season and occupancy")]
        ]
      },
      "hotel-abdij": {
        eyebrow: T("Exploitatie · twee inkomstenstromen", "Operation · two income streams"),
        titel: T("Hotel de Abdij en Grand Café de Abdij", "Hotel de Abdij and Grand Café de Abdij"),
        badge: T("Boekingssysteem gekoppeld", "Booking system connected"), badgeOk: true,
        intro: T("Eén pand met twee gescheiden inkomstenstromen: het hotel wordt in eigen beheer geëxploiteerd, de horeca op de begane grond is verhuurd aan een externe uitbater.",
                 "One building with two separate income streams: the hotel is run in-house, the ground-floor hospitality space is let to an external operator."),
        kolommen: [
          { kop: T("Hotel de Abdij · eigen exploitatie", "Hotel de Abdij · own operation"),
            regels: [[T("Kamers", "Rooms"), "25"], [T("Jaarbezetting", "Annual occupancy"), "74%"], [T("Gem. kamerprijs (ADR)", "Avg. daily rate (ADR)"), "€ 121"],
                     ["RevPAR", "€ 90"], [T("Maandopbrengst", "Monthly revenue"), "€ 76.500"], [T("Aandeel in objecthuur", "Share of asset income"), "81%"]] },
          { kop: T("Grand Café de Abdij · verhuurd", "Grand Café de Abdij · let"),
            regels: [[T("Huurder", "Tenant"), "Grand Café de Abdij B.V."], [T("Maandhuur", "Monthly rent"), "€ 17.500"],
                     [T("Contract", "Lease"), T("1 apr 2022 – 31 mrt 2032", "1 Apr 2022 – 31 Mar 2032")], [T("Breakoptie", "Break option"), T("31 mrt 2028", "31 Mar 2028")],
                     [T("Indexering", "Indexation"), T("Jaarlijkse CPI", "Annual CPI")], [T("Aandeel in objecthuur", "Share of asset income"), "19%"]] }
        ]
      },
      club33: {
        eyebrow: T("Schade · verzekeringsdossier", "Damage · insurance file"),
        titel: T("Herbouw na brand van 8 februari 2025", "Rebuild after the fire of 8 February 2025"),
        badge: T("Claim in behandeling", "Claim in progress"), badgeOk: false,
        intro: T("Dit pand staat niet leeg door marktomstandigheden: het is door brand verwoest en volledig buiten gebruik. Er is daarom geen huurstroom. De tweede helft van de uitkering volgt na oplevering en herkeuring.",
                 "This building is not vacant for market reasons: it was destroyed by fire and is entirely out of use, so there is no rental income. The second half of the payout follows completion and re-inspection."),
        cijfers: [
          [T("Schadedatum", "Date of loss"), T("8 feb 2025", "8 Feb 2025")], [T("Verzekerde som", "Sum insured"), "€ 1.156.000"],
          [T("Claim toegekend", "Claim awarded"), "€ 980.000"], [T("Reeds uitgekeerd (50%)", "Paid out to date (50%)"), "€ 490.000"],
          [T("Resterend na oplevering", "Remaining after completion"), "€ 490.000"], [T("Verwachte oplevering", "Expected completion"), "Q2 2027"]
        ],
        regels: [
          [T("Status claim", "Claim status"), T("Toegekend · eerste termijn ontvangen 14 mei 2025", "Awarded · first instalment received 14 May 2025")],
          [T("Tweede termijn", "Second instalment"), T("Betaalbaar na gereedmelding en herkeuring door verzekeraar", "Payable after completion notice and insurer re-inspection")],
          [T("Herbouw", "Rebuild"), T("Vergunning verleend · start bouw gepland Q4 2026", "Permit granted · construction start planned Q4 2026")],
          [T("Huurderving", "Loss of rent"), T("Gedekt tot 24 maanden na schadedatum", "Covered up to 24 months after the date of loss")]
        ],
        extra: {
          kop: T("Geschiedenis van het pand", "History of the building"),
          tekst: T("Legeweg 31/33 is al bijna een eeuw een uitgaanspand. In 1928 opende hier de eerste bioscoop van Dokkum (Buntenbach); in 1953 werd het pand de vaste bioscoop en theaterzaal De Harmonie met ruim 400 stoelen, geëxploiteerd door de familie Oosten tot 1994. Daarna volgden twee kleinere filmzalen, jarenlange leegstand, een zalen- en snookercentrum en ten slotte sportcafé en Club33. De bouw van de zaal wordt in het dashboard aangehouden op 1928; een exacte bouwdatum is niet openbaar gedocumenteerd.",
                   "Legeweg 31/33 has been an entertainment venue for almost a century. Dokkum's first cinema (Buntenbach) opened here in 1928; in 1953 the building became the town's permanent cinema and theatre De Harmonie, seating over 400 and run by the Oosten family until 1994. Two smaller screening rooms followed, then years of vacancy, a function and snooker centre and finally a sports café and Club33. The dashboard records the hall as built in 1928; no exact construction date is publicly documented."),
          bron: T("Bronnen: in-dokkum.nl (Dokkum toen en nu: Sportcafé de Harmonie), gemeentelijke bekendmakingen Legeweg 33.",
                  "Sources: in-dokkum.nl (Dokkum then and now: Sportcafé de Harmonie), municipal notices for Legeweg 33.")
        }
      },
      "sea-you-ballum": {
        eyebrow: T("Exploitatie · seizoenshoreca", "Operation · seasonal hospitality"),
        titel: T("Strandpaviljoen verhuurd aan uitbater", "Beach pavilion let to an operator"),
        badge: T("Verhuurd", "Let"), badgeOk: true,
        intro: T("Strandpaviljoen op het Ballumerstrand, verhuurd aan een zelfstandige uitbater. De exploitatie is seizoensgebonden; het paviljoen wordt buiten het seizoen afgebouwd opgeslagen.",
                 "Beach pavilion on the Ballum beach, let to an independent operator. Operation is seasonal; outside the season the pavilion is dismantled and stored."),
        cijfers: [
          [T("Uitbater", "Operator"), "Sea You Beach B.V."], [T("Maandhuur", "Monthly rent"), "€ 9.800"],
          [T("Seizoen", "Season"), T("Maart t/m oktober", "March to October")], [T("Terras", "Terrace"), T("180 zitplaatsen", "180 seats")],
          [T("Contract", "Lease"), T("1 mrt 2023 – 28 feb 2033", "1 Mar 2023 – 28 Feb 2033")], [T("Breakoptie", "Break option"), T("28 feb 2029", "28 Feb 2029")]
        ],
        regels: [
          [T("Omzethuur", "Turnover rent"), T("6% over de omzet boven € 750.000 per seizoen", "6% of turnover above € 750,000 per season")],
          [T("Vergunning", "Permit"), T("Strandpaviljoenvergunning gemeente Ameland · geldig t/m 2033", "Beach-pavilion permit, municipality of Ameland · valid to 2033")],
          [T("Onderhoud", "Maintenance"), T("Casco eigenaar · inventaris en installatie uitbater", "Shell by owner · fit-out and installations by operator")]
        ]
      },
      "rabobank-nes": {
        eyebrow: T("Herbestemming · voormalig bankkantoor", "Repurposing · former bank branch"),
        titel: T("Oude Rabobank in Nes, deels omgezet naar wonen", "Former Rabobank in Nes, partly converted to housing"),
        badge: T("Kluisruimte nog leeg", "Vault space still vacant"), badgeOk: false,
        intro: T("Het voormalige bankkantoor aan de Van Heeckerenstraat kwam in 2021 via een openbare veiling op de markt. De begane grond is verhuurd, op de verdieping zijn twee appartementen gemaakt. De kelder met de oude kluisruimte wacht nog op een invulling.",
                 "The former bank branch on Van Heeckerenstraat came to market through a public auction in 2021. The ground floor is let and two apartments were created upstairs. The basement with the old vault is still awaiting a use."),
        cijfers: [
          [T("Verworven", "Acquired"), T("november 2021 · veiling bij opbod", "November 2021 · open-bid auction")],
          [T("Bouwjaar", "Year built"), "1974"],
          [T("Verhuurbaar oppervlak", "Lettable area"), "780 m²"],
          [T("Eenheden", "Units"), T("4 (1 commercieel, 2 woningen, 1 leeg)", "4 (1 commercial, 2 residential, 1 vacant)")],
          [T("Maandhuur", "Monthly rent"), "€ 11.400"],
          [T("Bezetting", "Occupancy"), "75%"]
        ],
        regels: [
          [T("Begane grond", "Ground floor"), T("Verhuurd aan Ameland Zorg & Welzijn t/m aug 2032", "Let to Ameland Zorg & Welzijn until Aug 2032")],
          [T("Verdieping", "Upper floor"), T("Twee appartementen · beide verhuurd, doorlopend contract", "Two apartments · both let on rolling contracts")],
          [T("Kelder", "Basement"), T("Voormalige kluisruimte, 140 m² · studie naar horeca of opslag", "Former vault, 140 m² · studying hospitality or storage use")],
          [T("Aandachtspunt", "Attention point"), T("Geldautomaten zijn bij overdracht verwijderd; gevelherstel staat in het capexplan", "ATMs were removed at handover; façade repair is in the capex plan")]
        ]
      },
      "sense-dokkum": HORECAPLEIN("sense"),
      "brouwerij-dockum": HORECAPLEIN("brouwerij")
    };
  }

  /* Gedeeld plan: nieuw horecaplein Dokkum (Sense + Brouwerij Dockum) */
  function HORECAPLEIN(rol) {
    return {
      eyebrow: T("Ontwikkeling · horecaplein Dokkum", "Development · hospitality square Dokkum"),
      titel: T("Nieuw horecaplein: Sense × Brouwerij Dockum", "New hospitality square: Sense × Brouwerij Dockum"),
      badge: T("Plan in voorbereiding", "Plan in preparation"), badgeOk: true,
      intro: rol === "sense"
        ? T("Het Sense-gebouw en Brouwerij Dockum liggen op loopafstand van elkaar. Het plan is om beide panden en de ruimte ertussen samen te voegen tot één horecaplein in Dokkum: overdag brouwerij, proeflokaal en terras, 's avonds theater, live muziek en uitgaan onder één noemer.",
            "The Sense building and Brouwerij Dockum are within walking distance of each other. The plan is to join both buildings and the space between them into a single hospitality square in Dokkum: brewery, taproom and terrace by day, theatre, live music and nightlife by night.")
        : T("Brouwerij Dockum vormt samen met het Sense-gebouw de basis voor een nieuw horecaplein in Dokkum. De brouwerij levert de dagfunctie - rondleidingen, proeflokaal, terras en zalenverhuur - terwijl Sense het avond- en uitgaansprogramma verzorgt.",
            "Together with the Sense building, Brouwerij Dockum forms the basis for a new hospitality square in Dokkum. The brewery provides the daytime function - tours, taproom, terrace and function rooms - while Sense carries the evening and nightlife programme."),
      cijfers: [
        [T("Status", "Status"), T("Schetsontwerp · haalbaarheid", "Concept design · feasibility")],
        [T("Beoogde opening", "Target opening"), "2028"],
        [T("Panden", "Buildings"), T("Sense (Hogedijken 18-2) en Brouwerij Dockum (Koophandel 10)", "Sense (Hogedijken 18-2) and Brouwerij Dockum (Koophandel 10)")],
        [T("Programma", "Programme"), T("Brouwerij · proeflokaal · theater · uitgaan", "Brewery · taproom · theatre · nightlife")],
        [T("Plein en terras", "Square and terrace"), T("ca. 900 m² buitenruimte", "approx. 900 m² outdoor space")],
        [T("Investering (indicatie)", "Investment (indicative)"), "€ 3,4 mln"]
      ],
      regels: [
        [T("Dagprogramma", "Daytime programme"), T("Brouwerijrondleidingen, proeflokaal, lunch en zalenverhuur", "Brewery tours, taproom, lunch and function-room hire")],
        [T("Avondprogramma", "Evening programme"), T("Theater, live muziek en uitgaan tot in de nacht", "Theatre, live music and nightlife into the small hours")],
        [T("Vergunningen", "Permits"), T("Horeca- en geluidsvergunning te verruimen; vooroverleg met de gemeente loopt", "Hospitality and noise permits to be widened; pre-consultation with the municipality is under way")],
        [T("Volgende stap", "Next step"), T("Haalbaarheidsstudie en verkeers-/parkeeronderzoek afronden", "Complete the feasibility study and the traffic and parking survey")]
      ]
    };
  }

  var CARD = "border border-[#d9ddd6] bg-white p-5";
  var LBL = "text-[9px] font-bold uppercase tracking-[0.13em] text-slate-500";

  function cel(l, v) {
    return '<div class="border border-slate-200 p-3"><p class="' + LBL + '">' + l +
           '</p><p class="mt-2 text-[15px] font-semibold text-[#13263a]">' + v + '</p></div>';
  }
  function regel(l, v) {
    return '<div class="flex justify-between gap-5 border-b border-slate-100 py-2.5 text-[12px] last:border-0">' +
           '<dt class="text-slate-500">' + l + '</dt><dd class="text-right font-semibold text-[#13263a]">' + v + '</dd></div>';
  }
  function bouw(n) {
    var h = '<div class="' + CARD + '">';
    h += '<div class="flex flex-wrap items-start justify-between gap-3">';
    h += '<div><p class="' + LBL + '">' + n.eyebrow + '</p>' +
         '<h3 class="mt-1 text-[19px] font-semibold tracking-[-0.03em] text-[#13263a]">' + n.titel + '</h3></div>';
    if (n.badge) {
      var kleur = n.badgeOk ? "border-[#bfddd4] bg-[#edf8f4] text-[#0f625b]" : "border-[#ead4d5] bg-[#fff7f7] text-[#b8343a]";
      h += '<span class="border ' + kleur + ' px-3 py-2 text-[10px] font-bold uppercase tracking-[0.12em]">' + n.badge + '</span>';
    }
    h += '</div>';
    if (n.intro) h += '<p class="mt-3 max-w-3xl text-[12px] leading-5 text-[#010b22]/65">' + n.intro + '</p>';
    if (n.cijfers) {
      h += '<div class="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">';
      n.cijfers.forEach(function (c) { h += cel(c[0], c[1]); });
      h += '</div>';
    }
    if (n.kolommen) {
      h += '<div class="mt-5 grid gap-4 lg:grid-cols-2">';
      n.kolommen.forEach(function (k) {
        h += '<div class="border border-slate-200 p-4"><p class="' + LBL + '">' + k.kop + '</p><dl class="mt-3">';
        k.regels.forEach(function (r) { h += regel(r[0], r[1]); });
        h += '</dl></div>';
      });
      h += '</div>';
    }
    if (n.regels) {
      h += '<dl class="mt-5">';
      n.regels.forEach(function (r) { h += regel(r[0], r[1]); });
      h += '</dl>';
    }
    if (n.extra) {
      h += '<div class="mt-5 border border-slate-200 bg-slate-50 p-4">' +
           '<p class="' + LBL + '">' + n.extra.kop + '</p>' +
           '<p class="mt-2 max-w-3xl text-[12px] leading-5 text-[#010b22]/70">' + n.extra.tekst + '</p>' +
           (n.extra.bron ? '<p class="mt-2 text-[11px] text-slate-400">' + n.extra.bron + '</p>' : '') +
           '</div>';
    }
    return h + '</div>';
  }

  function huidigId() {
    var m = (window.__EK_PATH?window.__EK_PATH():location.pathname).match(/^\/properties\/([^/?#]+)/);
    return m ? decodeURIComponent(m[1]) : null;
  }
  function plaats() {
    var id = huidigId();
    var N = notes();
    var taal = window.__EK_LANG ? window.__EK_LANG() : "nl";
    var bestaand = document.getElementById("ek-asset-note");
    if (!id || !N[id]) { if (bestaand) bestaand.remove(); return; }
    if (bestaand && bestaand.dataset.assetId === id && bestaand.dataset.taal === taal) return;
    if (bestaand) bestaand.remove();
    var anker = [].slice.call(document.querySelectorAll("section")).find(function (s) {
      return /grid gap-5 xl:grid-cols-\[minmax/.test(s.className);
    });
    if (!anker || !anker.parentNode) return;
    var sec = document.createElement("section");
    sec.id = "ek-asset-note";
    sec.dataset.assetId = id;
    sec.dataset.taal = taal;
    sec.className = "mt-5";
    sec.innerHTML = bouw(N[id]);
    anker.parentNode.insertBefore(sec, anker);
  }

  function start() {
    if (!document.body) return setTimeout(start, 20);
    plaats();
    if (window.__EK_ONLANG) window.__EK_ONLANG(plaats);
    var wacht = false;
    new MutationObserver(function () {
      if (wacht) return;
      wacht = true;
      requestAnimationFrame(function () { wacht = false; plaats(); });
    }).observe(document.body, { childList: true, subtree: true });
  }
  start();
})();
