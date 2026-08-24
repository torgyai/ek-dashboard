/* Energie & ESG: uitleg van de term en een gegenereerd advies over welke objecten
   het snelst een beter energielabel kunnen halen. Tweetalig (NL/EN). */
(function () {
  var T = function (nl, en) { return (window.__EK_T ? window.__EK_T(nl, en) : nl); };
  function loc() { return window.__EK_LANG && window.__EK_LANG() === "en" ? "en-GB" : "nl-NL"; }
  function EUR(n) { return new Intl.NumberFormat(loc(), { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n); }
  function NUM(n, d) { return new Intl.NumberFormat(loc(), { minimumFractionDigits: d || 0, maximumFractionDigits: d || 0 }).format(n); }
  var LBL = "text-[9px] font-bold uppercase tracking-[0.13em] text-slate-500";
  var CARD = "border border-[#d9ddd6] bg-white p-5";
  var LABELS = ["A", "B", "C", "D", "E", "F", "G"];

  /* Maatregelpakketten met een indicatieve prijs per m2 en het aantal labelstappen. */
  function pakketten(a) {
    var p = [];
    if (a.energyKwhM2 > 150) {
      p.push({ naam: T("Ledverlichting met aanwezigheidsdetectie", "LED lighting with presence detection"),
               prijs: 22, stappen: 1, dagen: 10,
               waarom: T("Snelste ingreep: geen vergunning, geen huurderoverlast, en het verbruik daalt meteen.",
                         "Fastest measure: no permit, no tenant disruption, and consumption drops immediately.") });
    }
    if (a.energyKwhM2 > 130) {
      p.push({ naam: T("Inregelen installatie en klokthermostaten", "Rebalancing plant and adding time controls"),
               prijs: 9, stappen: 0.5, dagen: 4,
               waarom: T("Kost bijna niets en levert vrijwel altijd 5 tot 10 procent op; wordt te vaak overgeslagen.",
                         "Costs almost nothing and nearly always returns 5 to 10 percent; too often skipped.") });
    }
    if ("DEFG".indexOf(a.energyLabel) !== -1) {
      p.push({ naam: T("HR++ beglazing op de noordgevel", "HR++ glazing on the north façade"),
               prijs: 78, stappen: 1, dagen: 25,
               waarom: T("Grootste stap per euro bij panden van vóór 1990 met enkel glas aan de koude kant.",
                         "Biggest step per euro on pre-1990 buildings with single glazing on the cold side.") });
      p.push({ naam: T("Dakisolatie bij het eerstvolgende dakonderhoud", "Roof insulation at the next roof works"),
               prijs: 46, stappen: 1, dagen: 18,
               waarom: T("Alleen rendabel als het dak toch open gaat; anders wachten tot de onderhoudsronde.",
                         "Only worthwhile when the roof is opened anyway; otherwise wait for the maintenance round.") });
    }
    if (a.energyKwhM2 > 110 && a.kind !== "Monument") {
      p.push({ naam: T("Warmtepomp in plaats van de cv-ketel", "Heat pump replacing the boiler"),
               prijs: 135, stappen: 2, dagen: 45,
               waarom: T("Grote stap, maar alleen zinvol nadat de schil is aangepakt; anders draait hij te zwaar.",
                         "A big step, but only sensible after the envelope is done; otherwise it runs too hard.") });
    }
    if (a.energyLabel !== "A" && a.kind !== "Monument" && a.areaM2 > 600) {
      p.push({ naam: T("Zonnepanelen op het platte dak", "Solar panels on the flat roof"),
               prijs: 58, stappen: 1, dagen: 20,
               waarom: T("Werkt het best bij een huurder die overdag verbruikt; anders gaat het rendement naar het net.",
                         "Works best with a tenant who consumes during the day; otherwise the return goes to the grid.") });
    }
    return p;
  }

  function kandidaten() {
    var A = (window.__EK_ASSETS__ || []).filter(function (a) { return "BCDEFG".indexOf(a.energyLabel) !== -1; });
    return A.map(function (a) {
      var P = pakketten(a);
      if (!P.length) return null;
      /* neem de pakketten die samen de meeste labelstappen per euro geven */
      var gesorteerd = P.slice().sort(function (x, y) { return (x.prijs / x.stappen) - (y.prijs / y.stappen); });
      var gekozen = gesorteerd.slice(0, 3);
      var kosten = gekozen.reduce(function (s, x) { return s + x.prijs * a.areaM2; }, 0);
      var stappen = Math.min(3, Math.round(gekozen.reduce(function (s, x) { return s + x.stappen; }, 0)));
      var index = LABELS.indexOf(a.energyLabel);
      var nieuw = LABELS[Math.max(0, index - stappen)];
      var besparing = Math.round(a.energyKwhM2 * a.areaM2 * 0.11 * (stappen / 2) * 0.34);
      var dagen = Math.max.apply(null, gekozen.map(function (x) { return x.dagen; }));
      return {
        a: a, pakket: gekozen, kosten: kosten, stappen: stappen, nieuw: nieuw,
        besparing: besparing, dagen: dagen,
        terug: besparing > 0 ? kosten / besparing : 99,
        score: (stappen * 100) / (kosten / 1000 + 1) + (a.occupancy < 75 ? 12 : 0)
      };
    }).filter(Boolean).sort(function (x, y) { return y.score - x.score; });
  }

  function rij(k, i) {
    var a = k.a;
    return '<div class="border-b border-slate-100 p-5 last:border-0">' +
      '<div class="flex flex-wrap items-start justify-between gap-3">' +
        '<div class="min-w-[240px] flex-1">' +
          '<div class="flex flex-wrap items-center gap-2">' +
            '<span class="flex h-6 w-6 items-center justify-center rounded-full bg-[#13263a] text-[10px] font-bold text-white">' + (i + 1) + '</span>' +
            '<span class="border border-slate-300 px-2 py-1 text-[9px] font-bold uppercase tracking-[0.1em] text-slate-600">' + T("Label ", "Label ") + a.energyLabel +
            ' → ' + k.nieuw + '</span>' +
            '<span class="text-[11px] text-slate-500">' + a.city + ' · ' + NUM(a.areaM2) + ' m² · ' + a.energyKwhM2 + ' kWh/m²</span></div>' +
          '<h4 class="mt-2 text-[15px] font-semibold text-[#13263a]">' + a.name + '</h4>' +
          '<ul class="mt-2 max-w-2xl text-[12px] leading-6 text-[#010b22]/70">' +
          k.pakket.map(function (x) { return '<li>· ' + x.naam + '</li>'; }).join("") + '</ul>' +
          '<p class="mt-1.5 max-w-2xl text-[12px] leading-5 text-slate-500">' + k.pakket[0].waarom + '</p>' +
        '</div>' +
        '<div class="grid shrink-0 grid-cols-2 gap-2 sm:grid-cols-4">' +
          [[T("Investering", "Investment"), EUR(k.kosten)],
           [T("Besparing / jaar", "Saving / year"), EUR(k.besparing)],
           [T("Terugverdientijd", "Payback"), NUM(k.terug, 1) + T(" jaar", " yrs")],
           [T("Doorlooptijd", "Lead time"), k.dagen + T(" dagen", " days")]].map(function (r) {
            return '<div class="border border-slate-200 bg-white p-3 text-right"><p class="' + LBL + '">' + r[0] + '</p>' +
              '<p class="mt-1 text-[13px] font-semibold text-[#13263a]">' + r[1] + '</p></div>'; }).join("") +
        '</div>' +
      '</div></div>';
  }

  function html() {
    var K = kandidaten();
    if (!K.length) return "";
    var snel = K.slice(0, 8);
    var totaalInv = snel.reduce(function (s, k) { return s + k.kosten; }, 0);
    var totaalBes = snel.reduce(function (s, k) { return s + k.besparing; }, 0);
    var stappen = snel.reduce(function (s, k) { return s + k.stappen; }, 0);

    return '<section class="mt-6 border-t border-slate-300 pt-6">' +
      '<div class="grid gap-5 lg:grid-cols-[minmax(0,1fr)_340px]">' +
        '<div><p class="' + LBL + '">' + T("Wat betekent ESG?", "What does ESG mean?") + '</p>' +
        '<h3 class="mt-1 text-[22px] font-semibold tracking-[-0.04em] text-[#13263a]">' +
        T("Environmental, Social en Governance", "Environmental, Social and Governance") + '</h3>' +
        '<p class="mt-2 max-w-3xl text-[12px] leading-5 text-[#010b22]/70">' +
        T("Drie manieren waarop een portefeuille wordt beoordeeld naast het rendement. Environmental gaat over energie, uitstoot, water en afval, en is voor vastgoed veruit de zwaarste: het energielabel zit hier. Social gaat over de mensen eromheen, van huurders en toegankelijkheid tot veiligheid op de bouwplaats. Governance gaat over hoe het is geregeld: wie beslist wat, hoe de administratie op orde is en of afspraken worden nagekomen. Banken en verzekeraars vragen deze cijfers steeds vaker op vóór ze financieren.",
          "Three ways a portfolio is judged alongside its return. Environmental covers energy, emissions, water and waste, and is by far the heaviest for property: the energy label sits here. Social covers the people around it, from tenants and accessibility to site safety. Governance covers how things are arranged: who decides what, whether the administration is in order and whether agreements are kept. Banks and insurers increasingly ask for these figures before they finance.") + '</p></div>' +
        '<div class="' + CARD + '"><p class="' + LBL + '">' + T("Snelste winst", "Quickest gain") + '</p>' +
        '<h4 class="mt-1 text-[16px] font-semibold text-[#13263a]">' + T("Als de acht objecten hieronder worden gedaan", "If the eight assets below are done") + '</h4>' +
        '<dl class="mt-3 text-[12px]">' +
        [[T("Investering", "Investment"), EUR(totaalInv)],
         [T("Besparing per jaar", "Saving per year"), EUR(totaalBes)],
         [T("Labelstappen", "Label steps"), NUM(stappen)],
         [T("Gem. terugverdientijd", "Avg. payback"), NUM(totaalInv / (totaalBes || 1), 1) + T(" jaar", " yrs")]].map(function (r) {
          return '<div class="flex justify-between gap-4 border-b border-slate-100 py-2.5 last:border-0">' +
            '<dt class="text-slate-500">' + r[0] + '</dt><dd class="font-semibold text-[#13263a]">' + r[1] + '</dd></div>'; }).join("") +
        '</dl></div>' +
      '</div>' +

      '<div class="mt-5 border border-[#d9ddd6] bg-white">' +
        '<div class="flex flex-wrap items-start justify-between gap-3 border-b border-slate-200 p-5">' +
          '<div><p class="' + LBL + '">' + T("Gegenereerd advies", "Generated advice") + '</p>' +
          '<h3 class="mt-1 text-[18px] font-semibold text-[#13263a]">' + T("Welke objecten het snelst een beter label halen", "Which assets reach a better label fastest") + '</h3>' +
          '<p class="mt-2 max-w-3xl text-[12px] leading-5 text-[#010b22]/65">' +
          T("Gerangschikt op labelstappen per geïnvesteerde euro, met een opslag voor panden die toch al leeg staan: daar kan gewerkt worden zonder een huurder te storen. Bedragen zijn richtprijzen per m² en moeten per object worden getoetst.",
            "Ranked on label steps per euro invested, with a bonus for assets that are vacant anyway: there the work can be done without disturbing a tenant. Amounts are indicative per m² and need checking per asset.") + '</p></div>' +
          '<span class="border border-[#bfddd4] bg-[#edf8f4] px-3 py-2 text-[10px] font-bold uppercase tracking-[0.12em] text-[#0f625b]">' +
          K.length + T(" objecten beoordeeld", " assets assessed") + '</span>' +
        '</div>' + snel.map(rij).join("") + '</div>' +

      '<div class="mt-5 grid gap-4 lg:grid-cols-3">' +
        [[T("Wat eerst, wat later", "What first, what later"),
          T("Eerst de schil (glas, dak, kieren), dan pas de installatie. Een warmtepomp in een ongeïsoleerd pand draait te zwaar, verbruikt meer dan berekend en gaat korter mee.",
            "The envelope first (glazing, roof, draughts), only then the plant. A heat pump in an uninsulated building runs too hard, uses more than calculated and lasts less long.")],
         [T("Koppel het aan een huurmoment", "Tie it to a lease event"),
          T("Werk uitvoeren tussen twee huurders in scheelt overlastvergoeding en versnelt de doorlooptijd. Bij de objecten hierboven met lage bezetting kan dat nu.",
            "Doing the work between two tenants avoids disruption payments and shortens the lead time. On the low-occupancy assets above that is possible now.")],
         [T("Monumenten apart behandelen", "Treat monuments separately"),
          T("Bij monumentale panden zijn glas en gevel vaak niet aan te passen. Daar zit de winst in verlichting, installatie en het inregelen daarvan, niet in de schil.",
            "On listed buildings the glazing and façade often cannot be altered. There the gain sits in lighting, plant and its settings, not in the envelope.")]].map(function (r) {
          return '<div class="' + CARD + '"><p class="' + LBL + '">' + r[0] + '</p>' +
            '<p class="mt-2 text-[12px] leading-5 text-[#010b22]/70">' + r[1] + '</p></div>'; }).join("") +
      '</div></section>';
  }

  function plaats() {
    if ((window.__EK_PATH?window.__EK_PATH():location.pathname) !== "/energy") {
      var oud = document.getElementById("ek-esg");
      if (oud) oud.remove();
      return;
    }
    var taal = window.__EK_LANG ? window.__EK_LANG() : "nl";
    var bestaand = document.getElementById("ek-esg");
    if (bestaand && bestaand.dataset.taal === taal) return;
    if (bestaand) bestaand.remove();
    var host = document.querySelector("main") || document.body;
    var doel = host.querySelector("div[class*='px-5'][class*='pb-']");
    if (!doel || !(window.__EK_ASSETS__ || []).length) return;
    var inhoud = html();
    if (!inhoud) return;
    var sec = document.createElement("section");
    sec.id = "ek-esg";
    sec.dataset.taal = taal;
    sec.innerHTML = inhoud;
    doel.appendChild(sec);
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
