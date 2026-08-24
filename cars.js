/* Car Collection: de eigen autocollectie, puur om te laten zien.
   Doorsturen naar een autobedrijf voor onderhoud, keuring of taxatie. Tweetalig (NL/EN). */
(function () {
  var T = function (nl, en) { return (window.__EK_T ? window.__EK_T(nl, en) : nl); };
  function loc() { return window.__EK_LANG && window.__EK_LANG() === "en" ? "en-GB" : "nl-NL"; }
  function EUR(n) { return new Intl.NumberFormat(loc(), { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n); }
  function NUM(n) { return new Intl.NumberFormat(loc()).format(n); }
  var LBL = "text-[9px] font-bold uppercase tracking-[0.13em] text-slate-500";
  var open = null, keuze = null, verstuurd = {};

  var GARAGES = ["Autobedrijf Lijzenga", "SPD Automotive", "Autodijk"];

  function autos() {
    return [
      { id: "g63", merk: "Mercedes-AMG", model: "G 63", jaar: 2022, kleur: T("Obsidiaanzwart", "Obsidian black"),
        motor: "4.0 V8 biturbo, 585 pk", sprint: "4,5 s", km: 38400, waarde: 248000, groep: "daily",
        staat: T("In gebruik", "In use"), stalling: T("Leeuwarden, Apolloweg", "Leeuwarden, Apolloweg"),
        detail: T("De werkauto voor lange dagen: Leeuwarden naar Oldenburg en terug op één dag, met de aanhanger erachter als het moet.",
                  "The workhorse for long days: Leeuwarden to Oldenburg and back in a day, with the trailer behind it when needed."),
        weetje: T("Rijdt gemiddeld 1 op 6. Daar is nog nooit iemand vrolijk van geworden.", "Averages 6 km per litre. Nobody has ever been cheerful about that.") },

      { id: "g580", merk: "Mercedes-Benz", model: "G 580 EQ", jaar: 2025, kleur: T("Mat grijs", "Matte grey"),
        motor: T("4 elektromotoren, 587 pk", "4 electric motors, 587 hp"), sprint: "4,7 s", km: 9100, waarde: 194000, groep: "daily",
        staat: T("In gebruik", "In use"), stalling: T("Leeuwarden, Apolloweg", "Leeuwarden, Apolloweg"),
        detail: T("Dezelfde vorm, geen geluid. Kan om zijn as draaien op de plaats, wat vooral nut heeft op een volle laadplaats.",
                  "The same shape, no sound. Can turn on the spot, which is mainly useful on a crowded loading yard."),
        weetje: T("Op de zaak geladen, dus rijden kost hier praktisch niets.", "Charged at the yard, so driving it costs practically nothing.") },

      { id: "gt3", merk: "Porsche", model: "911 GT3 (992)", jaar: 2023, kleur: T("Shark blue", "Shark blue"),
        motor: T("4.0 zescilinder boxer, 510 pk", "4.0 flat-six, 510 hp"), sprint: "3,9 s", km: 6200, waarde: 289000, groep: "sport",
        staat: T("In de collectie", "In the collection"), stalling: T("Verwarmde stalling Dokkum", "Heated storage, Dokkum"),
        detail: T("Handbak, geen dak-opties, geen extra's die gewicht kosten. Twee keer per jaar mee naar een circuitdag.",
                  "Manual gearbox, no roof options, nothing extra that adds weight. Out twice a year for a track day."),
        weetje: T("Draait tot 9.000 toeren. Buren weten precies wanneer hij weggaat.", "Revs to 9,000. The neighbours know exactly when it leaves.") },

      { id: "carrera32", merk: "Porsche", model: "911 Carrera 3.2", jaar: 1987, kleur: T("Guards red", "Guards red"),
        motor: T("3.2 zescilinder boxer, 231 pk", "3.2 flat-six, 231 hp"), sprint: "6,1 s", km: 148900, waarde: 104000, groep: "klassiek",
        staat: T("In de collectie", "In the collection"), stalling: T("Verwarmde stalling Dokkum", "Heated storage, Dokkum"),
        detail: T("Luchtgekoeld, G50-bak, matching numbers. Gekocht in 2016 voor minder dan de helft van wat hij nu doet.",
                  "Air-cooled, G50 gearbox, matching numbers. Bought in 2016 for less than half what it fetches now."),
        weetje: T("De enige auto in de collectie die in waarde is verdubbeld.", "The only car in the collection that has doubled in value.") },

      { id: "rangerover", merk: "Range Rover", model: "Autobiography LWB", jaar: 2024, kleur: T("Charente grijs", "Charente grey"),
        motor: T("4.4 V8 mild hybrid, 530 pk", "4.4 V8 mild hybrid, 530 hp"), sprint: "4,6 s", km: 24700, waarde: 168000, groep: "daily",
        staat: T("In gebruik", "In use"), stalling: T("Leeuwarden, Apolloweg", "Leeuwarden, Apolloweg"),
        detail: T("De auto voor de lange afspraken en het slechte weer. Achterin kun je werken, en dat gebeurt ook.",
                  "The car for long appointments and bad weather. You can work in the back, and that is what happens."),
        weetje: T("Trekgewicht 3.500 kg, dus de klassieker past er zo achter.", "Towing capacity 3,500 kg, so the classic hooks straight on behind it.") },

      { id: "sklasse", merk: "Mercedes-Benz", model: "S 580 L", jaar: 2023, kleur: T("Nachtzwart", "Night black"),
        motor: "4.0 V8, 503 pk", sprint: "4,4 s", km: 51200, waarde: 149000, groep: "daily",
        staat: T("In gebruik", "In use"), stalling: T("Leeuwarden, Apolloweg", "Leeuwarden, Apolloweg"),
        detail: T("De representatieve auto: bankgesprekken, notaris, en af en toe een klant die uit Duitsland komt.",
                  "The representative car: bank meetings, the notary, and now and then a client coming over from Germany."),
        weetje: T("Achterin twee losse stoelen; de middenconsole is een koelkast.", "Two individual seats in the back; the centre console is a fridge.") },

      { id: "pagode", merk: "Mercedes-Benz", model: "280 SL Pagode", jaar: 1970, kleur: T("Papyrus wit", "Papyrus white"),
        motor: T("2.8 zes-in-lijn, 170 pk", "2.8 straight-six, 170 hp"), sprint: "9,3 s", km: 87600, waarde: 172000, groep: "klassiek",
        staat: T("In de collectie", "In the collection"), stalling: T("Verwarmde stalling Dokkum", "Heated storage, Dokkum"),
        detail: T("Volledig gerestaureerd in 2019, met hardtop én softtop. Gaat er in de zomer op zondagochtend uit, verder niet.",
                  "Fully restored in 2019, with both hardtop and soft top. Comes out on summer Sunday mornings, and not otherwise."),
        weetje: T("De naam komt van het licht doorhangende dak, dat op een pagode lijkt.", "The name comes from the slightly dished roof, which resembles a pagoda.") },

      { id: "etype", merk: "Jaguar", model: "E-Type Series 1 4.2", jaar: 1966, kleur: T("Opalescent dark blue", "Opalescent dark blue"),
        motor: T("4.2 zes-in-lijn, 265 pk", "4.2 straight-six, 265 hp"), sprint: "7,0 s", km: 62300, waarde: 178000, groep: "klassiek",
        staat: T("Bij de specialist", "With the specialist"), stalling: T("Onderhoud · SPD Automotive", "Maintenance · SPD Automotive"),
        detail: T("Coupé, chroom spaakwielen, in 2021 uit Engeland gehaald. Elk jaar twee weken bij de specialist voor de kleine dingen.",
                  "Coupé, chrome wire wheels, brought over from England in 2021. Two weeks with the specialist every year for the small things."),
        weetje: T("Enzo Ferrari noemde dit ooit de mooiste auto ooit gemaakt.", "Enzo Ferrari once called this the most beautiful car ever made.") },

      { id: "t1", merk: "Volkswagen", model: "T1 Samba", jaar: 1965, kleur: T("Sealing wax rood / beige", "Sealing wax red / beige"),
        motor: T("1.5 viercilinder boxer, 44 pk", "1.5 flat-four, 44 hp"), sprint: T("geen mening", "no opinion"), km: 112400, waarde: 98000, groep: "klassiek",
        staat: T("In de collectie", "In the collection"), stalling: T("Verwarmde stalling Dokkum", "Heated storage, Dokkum"),
        detail: T("Eenentwintig raampjes, vouwdak, originele kleurstelling. Staat elke zomer op de open dag van de loods.",
                  "Twenty-one windows, folding roof, original colour scheme. Stands at the warehouse open day every summer."),
        weetje: T("Past precies een pallet in, en dat is toevallig hoe hij aan zijn naam kwam op kantoor.", "Fits exactly one pallet, which is how it got its office nickname.") },

      { id: "shelby", merk: "Ford", model: "Mustang Shelby GT500", jaar: 2021, kleur: T("Grabber lime", "Grabber lime"),
        motor: T("5.2 V8 supercharged, 760 pk", "5.2 supercharged V8, 760 hp"), sprint: "3,5 s", km: 14800, waarde: 138000, groep: "sport",
        staat: T("In de collectie", "In the collection"), stalling: T("Verwarmde stalling Dokkum", "Heated storage, Dokkum"),
        detail: T("Amerikaans, luid en volstrekt onlogisch. Precies daarom staat hij er.",
                  "American, loud and completely illogical. Which is exactly why it is there."),
        weetje: T("De felste kleur in de collectie, en zo bedoeld.", "The loudest colour in the collection, and meant that way.") },

      { id: "rs6", merk: "Audi", model: "RS6 Avant Performance", jaar: 2024, kleur: T("Nardo grijs", "Nardo grey"),
        motor: T("4.0 V8 biturbo, 630 pk", "4.0 twin-turbo V8, 630 hp"), sprint: "3,4 s", km: 19600, waarde: 155000, groep: "sport",
        staat: T("In gebruik", "In use"), stalling: T("Leeuwarden, Apolloweg", "Leeuwarden, Apolloweg"),
        detail: T("Een stationwagen die harder gaat dan de meeste sportauto's en waar toch vier pallets monsters in passen.",
                  "An estate that is quicker than most sports cars and still swallows four pallets of samples."),
        weetje: T("De meest gebruikte auto van de collectie, met afstand.", "The most used car in the collection, by a distance.") },

      { id: "ex90", merk: "Volvo", model: "EX90 Ultra", jaar: 2025, kleur: T("Denim blauw", "Denim blue"),
        motor: T("Dubbele elektromotor, 517 pk", "Twin electric motor, 517 hp"), sprint: "4,9 s", km: 16300, waarde: 109000, groep: "gezin",
        staat: T("In gebruik", "In use"), stalling: T("Thuis", "At home"),
        detail: T("Zeven stoelen, stil, en de enige auto in de lijst waar iedereen mee weg mag.",
                  "Seven seats, quiet, and the only car on the list that everyone is allowed to take."),
        weetje: T("Wordt in de praktijk het vaakst met een hond achterin gezien.", "In practice it is most often seen with a dog in the back.") },

      { id: "fiesta", merk: "Ford", model: "Fiesta Rally4", jaar: 2022, kleur: T("Wit met wedstrijdbelettering", "White with race livery"),
        motor: T("1.0 EcoBoost, 215 pk", "1.0 EcoBoost, 215 hp"), sprint: T("n.v.t. · gripafhankelijk", "n/a · grip dependent"), km: 8900, waarde: 64000, groep: "rally",
        staat: T("Klaar voor de volgende rit", "Ready for the next event"), stalling: T("Werkplaats Dokkum", "Workshop, Dokkum"),
        detail: T("Twee- tot drie rally's per jaar in het noorden. Geen prijzenkast, wel elke keer over de finish tot nu toe.",
                  "Two or three rallies a year in the north. No trophy cabinet, but it has finished every time so far."),
        weetje: T("Goedkoopste auto in de lijst, en veruit de meeste lol per euro.", "Cheapest car on the list, and by far the most fun per euro.") }
    ];
  }

  var GROEP = {
    daily: { nl: "Dagelijks", en: "Daily" },
    sport: { nl: "Sport", en: "Sport" },
    klassiek: { nl: "Klassiek", en: "Classic" },
    gezin: { nl: "Gezin", en: "Family" },
    rally: { nl: "Rally", en: "Rally" }
  };

  function kaart(a) {
    var uit = open === a.id;
    var g = GROEP[a.groep];
    var stuur = verstuurd[a.id];
    return '<article class="border border-[#d9ddd6] bg-white">' +
      '<button type="button" data-ek-car="' + a.id + '" class="flex w-full flex-wrap items-start justify-between gap-3 p-5 text-left hover:bg-slate-50">' +
        '<span class="min-w-[230px] flex-1">' +
          '<span class="flex flex-wrap items-center gap-2">' +
            '<span class="border border-slate-300 px-2 py-1 text-[9px] font-bold uppercase tracking-[0.1em] text-slate-600">' + T(g.nl, g.en) + '</span>' +
            '<span class="text-[11px] text-slate-400">' + a.jaar + '</span></span>' +
          '<span class="mt-2 block text-[16px] font-semibold tracking-[-0.02em] text-[#13263a]">' + a.merk + ' ' + a.model + '</span>' +
          '<span class="mt-0.5 block text-[11px] text-slate-500">' + a.motor + ' · ' + a.kleur + '</span>' +
        '</span>' +
        '<span class="shrink-0 text-right">' +
          '<span class="block ' + LBL + '">' + T("Waarde", "Value") + '</span>' +
          '<span class="mt-1 block text-[18px] font-semibold tracking-[-0.04em] text-[#13263a]">' + EUR(a.waarde) + '</span>' +
          '<span class="mt-2 block text-[13px] text-slate-400" aria-hidden="true">' + (uit ? "▾" : "▸") + '</span>' +
        '</span>' +
      '</button>' +
      (uit ? '<div class="border-t border-slate-100 bg-slate-50 p-5">' +
        '<p class="max-w-3xl text-[12px] leading-5 text-[#010b22]/75">' + a.detail + '</p>' +
        '<div class="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">' +
          [[T("0 tot 100", "0 to 100"), a.sprint], [T("Kilometerstand", "Odometer"), NUM(a.km) + " km"],
           [T("Status", "Status"), a.staat], [T("Stalling", "Kept at"), a.stalling]].map(function (r) {
            return '<div class="border border-slate-200 bg-white p-3"><p class="' + LBL + '">' + r[0] + '</p>' +
              '<p class="mt-1.5 text-[13px] font-semibold text-[#13263a]">' + r[1] + '</p></div>'; }).join("") +
        '</div>' +
        '<p class="mt-3 text-[12px] italic leading-5 text-slate-500">' + a.weetje + '</p>' +
        '<div class="mt-4">' +
          (stuur
            ? '<p class="border border-[#bfddd4] bg-[#edf8f4] px-4 py-3 text-[12px] font-semibold text-[#0f625b]">' +
              T("Doorgestuurd naar ", "Sent to ") + stuur + T(". Zij nemen contact op voor een afspraak.", ". They will be in touch to make an appointment.") + '</p>'
            : keuze === a.id
              ? '<div class="border border-slate-200 bg-white p-4"><p class="' + LBL + '">' + T("Naar welk autobedrijf?", "Which garage?") + '</p>' +
                '<div class="mt-3 flex flex-wrap gap-2">' + GARAGES.map(function (g2) {
                  return '<button type="button" data-ek-car-send="' + a.id + '" data-ek-garage="' + g2 + '" class="border border-slate-300 bg-white px-3 py-2 text-[10px] font-bold uppercase tracking-[0.1em] text-[#13263a] hover:border-[#010b22]">' + g2 + '</button>';
                }).join("") + '</div></div>'
              : '<button type="button" data-ek-car-choose="' + a.id + '" class="border border-[#010b22] bg-[#010b22] px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.12em] text-white">' +
                T("Stuur door naar autobedrijf", "Send to a garage") + '</button>') +
        '</div></div>' : '') +
    '</article>';
  }

  var API = {
    click: function (e) {
      var s = e.target.closest("[data-ek-car-send]");
      if (s) { verstuurd[s.getAttribute("data-ek-car-send")] = s.getAttribute("data-ek-garage"); keuze = null; return true; }
      var c = e.target.closest("[data-ek-car-choose]");
      if (c) { keuze = c.getAttribute("data-ek-car-choose"); return true; }
      var b = e.target.closest("[data-ek-car]");
      if (b) { var id = b.getAttribute("data-ek-car"); open = open === id ? null : id; keuze = null; return true; }
      return false;
    },
    stempel: function () { return open + "|" + keuze + "|" + Object.keys(verstuurd).join(","); },
    html: function () {
      var A = autos();
      var totaal = A.reduce(function (s, a) { return s + a.waarde; }, 0);
      var oudste = A.reduce(function (m, a) { return a.jaar < m.jaar ? a : m; }, A[0]);
      var snelste = A.reduce(function (m, a) {
        var f = function (x) { return parseFloat(String(x.sprint).replace(",", ".")) || 99; };
        return f(a) < f(m) ? a : m;
      }, A[0]);
      var kpi = [
        [T("Auto's in de collectie", "Cars in the collection"), String(A.length), T("verzekerd als één vloot", "insured as a single fleet")],
        [T("Totale waarde", "Total value"), EUR(totaal), T("laatste taxatie mei 2026", "last valuation May 2026")],
        [T("Oudste", "Oldest"), String(oudste.jaar), oudste.merk + " " + oudste.model],
        [T("Snelste naar 100", "Quickest to 100"), snelste.sprint, snelste.merk + " " + snelste.model],
        [T("Totale kilometerstand", "Total mileage"), NUM(A.reduce(function (s, a) { return s + a.km; }, 0)) + " km", T("over alle auto's", "across all cars")]
      ];
      return kop() +
      '<section class="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">' + kpi.map(function (k) {
        return '<article class="border border-[#d9ddd6] bg-white p-5"><p class="' + LBL + '">' + k[0] + '</p>' +
          '<p class="mt-3 text-[22px] font-semibold tracking-[-0.05em] text-[#13263a]">' + k[1] + '</p>' +
          '<p class="mt-1 text-[11px] leading-4 text-slate-500">' + k[2] + '</p></article>';
      }).join("") + '</section>' +
      '<section class="mt-5 grid gap-4 lg:grid-cols-2">' + A.map(kaart).join("") + '</section>' +
      '<p class="mt-5 text-[11px] leading-5 text-slate-500">' +
      T("Waardes zijn indicatief en gebaseerd op de laatste vlootpolis. Doorsturen zet het onderhoudsverzoek klaar bij Autobedrijf Lijzenga, SPD Automotive of Autodijk; er wordt niets automatisch besteld of betaald.",
        "Values are indicative and based on the latest fleet policy. Sending forwards the service request to Autobedrijf Lijzenga, SPD Automotive or Autodijk; nothing is ordered or paid automatically.") + '</p>';
    }
  };

  function kop() {
    return '<section class="flex flex-col gap-5 border-b border-slate-300 pb-5 md:flex-row md:items-end md:justify-between">' +
      '<div><p class="' + LBL + '">' + T("Privé · vloot", "Personal · fleet") + '</p>' +
      '<h2 class="mt-2 text-[32px] font-semibold tracking-[-0.055em] text-[#13263a]">Car Collection</h2>' +
      '<p class="mt-2 max-w-2xl text-[12px] leading-5 text-[#010b22]/65">' +
      T("De eigen collectie, van de dagelijkse werkauto tot de klassiekers in de stalling. Klik een auto open voor de details en om hem door te sturen naar het autobedrijf.",
        "The collection, from the daily workhorse to the classics in storage. Open a car for the details and to send it to a garage.") + '</p></div>' +
      '<span class="border border-slate-300 bg-white px-3 py-2 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500">' +
      T("Vlootpolis · laatste taxatie mei 2026", "Fleet policy · last valuation May 2026") + '</span></section>';
  }

  window.__EK_CARS__ = API;

  function vul() {
    var root = document.getElementById("ek-cars-root");
    if (!root) return;
    var stempel = (window.__EK_LANG ? window.__EK_LANG() : "nl") + "|" + API.stempel();
    if (root.dataset.gevuld === stempel) return;
    root.dataset.gevuld = stempel;
    root.innerHTML = API.html();
    if (!root.dataset.klik) {
      root.dataset.klik = "1";
      root.addEventListener("click", function (e) { if (API.click(e)) vul(); });
    }
  }
  function start() {
    if (!document.body) return setTimeout(start, 20);
    vul();
    if (window.__EK_ONLANG) window.__EK_ONLANG(vul);
    var wacht = false;
    new MutationObserver(function () {
      if (wacht) return;
      wacht = true;
      requestAnimationFrame(function () { wacht = false; vul(); });
    }).observe(document.body, { childList: true, subtree: true });
  }
  start();
})();
