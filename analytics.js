/* Uitgebreide analyse: verdelingen in taartdiagrammen, tabellen en een uitgelegde NOI-brug.
   Alles wordt live uit het objectregister berekend. Tweetalig (NL/EN). */
(function () {
  var T = function (nl, en) { return (window.__EK_T ? window.__EK_T(nl, en) : nl); };
  function loc() { return window.__EK_LANG && window.__EK_LANG() === "en" ? "en-GB" : "nl-NL"; }
  function EUR(n) { return new Intl.NumberFormat(loc(), { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n); }
  function NUM(n, d) { return new Intl.NumberFormat(loc(), { minimumFractionDigits: d || 0, maximumFractionDigits: d || 0 }).format(n); }
  var LBL = "text-[9px] font-bold uppercase tracking-[0.13em] text-slate-500";
  var CARD = "border border-[#d9ddd6] bg-white p-5";
  var KLEUREN = ["#13263a", "#2f6f8f", "#0f625b", "#8a6d1f", "#b8343a", "#7d6ba8", "#4c8c5a", "#a9713f"];

  function assets() { return window.__EK_ASSETS__ || []; }

  /* ---------- taartdiagram ---------- */
  function kort(n) {
    if (n >= 1e6) return "\u20ac " + NUM(n / 1e6, 1) + " mln";
    if (n >= 1e3) return "\u20ac " + NUM(n / 1e3, 0) + "k";
    return EUR(n);
  }
  function donut(data, midden, onder) {
    var totaal = data.reduce(function (s, d) { return s + d.waarde; }, 0) || 1;
    var r = 58, sw = 24, c = 2 * Math.PI * r, offset = 0;
    var ringen = data.map(function (d, i) {
      var deel = d.waarde / totaal * c;
      /* stroke via style, niet als attribuut: de app-CSS overschrijft [stroke="#..."] met een eigen fill */
      var seg = '<circle cx="72" cy="72" r="' + r + '" style="fill:none;stroke:' + KLEUREN[i % KLEUREN.length] +
        '" stroke-width="' + sw + '" stroke-dasharray="' + deel.toFixed(2) + ' ' + (c - deel).toFixed(2) +
        '" stroke-dashoffset="' + (-offset).toFixed(2) + '" transform="rotate(-90 72 72)"></circle>';
      offset += deel;
      return seg;
    }).join("");
    var legenda = data.map(function (d, i) {
      return '<div class="flex items-baseline justify-between gap-3 border-b border-slate-100 py-2 text-[12px] last:border-0">' +
        '<span class="flex min-w-0 items-baseline gap-2">' +
        '<span class="inline-block h-2.5 w-2.5 shrink-0 rounded-full" style="background:' + KLEUREN[i % KLEUREN.length] + '"></span>' +
        '<span class="text-[#13263a]">' + d.naam + '</span></span>' +
        '<span class="shrink-0 whitespace-nowrap text-right">' +
        '<span class="font-semibold text-[#13263a]">' + (d.waarde / totaal * 100).toFixed(1) + '%</span>' +
        '<span class="ml-2 text-slate-500">' + d.tekst + '</span></span></div>';
    }).join("");
    return '<div class="mt-4 flex flex-col items-center">' +
      '<div class="relative"><svg viewBox="0 0 144 144" width="144" height="144" role="img" style="overflow:visible">' + ringen + '</svg>' +
      '<div class="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">' +
      '<span class="text-[14px] font-semibold tracking-[-0.03em] text-[#13263a]">' + midden + '</span>' +
      '<span class="text-[9px] uppercase tracking-[0.12em] text-slate-500">' + onder + '</span></div></div>' +
      '<div class="mt-4 w-full">' + legenda + '</div></div>';
  }

  function kaart(eyebrow, titel, inhoud, uitleg) {
    return '<div class="' + CARD + '"><p class="' + LBL + '">' + eyebrow + '</p>' +
      '<h3 class="mt-1 text-[18px] font-semibold tracking-[-0.03em] text-[#13263a]">' + titel + '</h3>' +
      (uitleg ? '<p class="mt-2 max-w-2xl text-[12px] leading-5 text-[#010b22]/65">' + uitleg + '</p>' : '') +
      inhoud + '</div>';
  }

  /* ---------- afgeleide cijfers ---------- */
  function cijfers() {
    var A = assets();
    var waarde = A.reduce(function (s, a) { return s + a.profile.marketValue; }, 0);
    var jaarhuur = A.reduce(function (s, a) { return s + a.grossRent * 12; }, 0);
    var kosten = A.reduce(function (s, a) { return s + a.profile.operatingCostsYear; }, 0);
    var noi = jaarhuur - kosten;
    var capex = A.reduce(function (s, a) { return s + a.capexPlan; }, 0);
    var schuld = A.reduce(function (s, a) { return s + a.debt; }, 0);
    var opp = A.reduce(function (s, a) { return s + a.areaM2; }, 0);
    var verhuurd = A.reduce(function (s, a) { return s + a.areaM2 * a.occupancy / 100; }, 0);
    return { A: A, waarde: waarde, jaarhuur: jaarhuur, kosten: kosten, noi: noi, capex: capex,
             schuld: schuld, opp: opp, bezetting: verhuurd / opp * 100 };
  }

  function groep(A, sleutel, waardeFn) {
    var m = Object.create(null);
    A.forEach(function (a) {
      var k = sleutel(a);
      m[k] = (m[k] || 0) + waardeFn(a);
    });
    return Object.keys(m).map(function (k) { return { k: k, v: m[k] }; })
      .sort(function (x, y) { return y.v - x.v; });
  }

  function soortLabel(k) {
    return { Residential: T("Wonen", "Residential"), Commercial: T("Commercieel", "Commercial"),
             Mixed: T("Gemengd", "Mixed"), Logistics: T("Logistiek", "Logistics"),
             Monument: T("Monument", "Heritage"), Holiday: T("Vakantieverhuur", "Holiday lettings") }[k] || k;
  }

  /* ---------- secties ---------- */
  function kpis(c) {
    var bar = c.jaarhuur / c.waarde * 100;
    var noiMarge = c.noi / c.jaarhuur * 100;
    var items = [
      [T("Netto exploitatieresultaat (NOI)", "Net operating income (NOI)"), EUR(c.noi), T("jaarhuur min exploitatiekosten", "annual rent less operating costs")],
      [T("NOI-marge", "NOI margin"), NUM(noiMarge, 1) + "%", T("deel van de huur dat overblijft", "share of rent that remains")],
      [T("Bruto aanvangsrendement", "Gross initial yield"), NUM(bar, 2) + "%", T("jaarhuur gedeeld door marktwaarde", "annual rent divided by market value")],
      [T("Capex 12 maanden", "Capex 12 months"), EUR(c.capex), NUM(c.capex / c.waarde * 100, 2) + T("% van de waarde", "% of value")],
      [T("Bezetting", "Occupancy"), NUM(c.bezetting, 1) + "%", T("naar verhuurbaar oppervlak", "by lettable area")],
      [T("LTV", "LTV"), NUM(c.schuld / c.waarde * 100, 1) + "%", T("schuld gedeeld door marktwaarde", "debt divided by market value")]
    ];
    return '<section class="mt-5 grid gap-3 sm:grid-cols-2 ek-xl-6">' + items.map(function (i) {
      return '<article class="' + CARD + '"><p class="' + LBL + '">' + i[0] + '</p>' +
        '<p class="mt-3 text-[22px] font-semibold tracking-[-0.05em] text-[#13263a]">' + i[1] + '</p>' +
        '<p class="mt-1 text-[11px] leading-4 text-slate-500">' + i[2] + '</p></article>';
    }).join("") + '</section>';
  }

  function taarten(c) {
    var perSoort = groep(c.A, function (a) { return a.kind; }, function (a) { return a.profile.marketValue; });
    var perLabel = groep(c.A, function (a) { return a.energyLabel; }, function (a) { return a.areaM2; });
    var perStad = groep(c.A, function (a) { return a.city; }, function (a) { return a.grossRent * 12; }).slice(0, 6);
    var restHuur = c.jaarhuur - perStad.reduce(function (s, x) { return s + x.v; }, 0);

    var d1 = perSoort.map(function (x) { return { naam: soortLabel(x.k), waarde: x.v, tekst: kort(x.v) }; });
    var d2 = perLabel.sort(function (a, b) { return a.k < b.k ? -1 : 1; })
      .map(function (x) { return { naam: T("Label ", "Label ") + x.k, waarde: x.v, tekst: NUM(x.v) + " m²" }; });
    var d3 = perStad.map(function (x) { return { naam: x.k, waarde: x.v, tekst: kort(x.v) }; });
    if (restHuur > 0) d3.push({ naam: T("Overige plaatsen", "Other locations"), waarde: restHuur, tekst: kort(restHuur) });

    return '<section class="mt-5 grid gap-5 xl:grid-cols-3">' +
      kaart(T("Verdeling · waarde", "Split · value"), T("Marktwaarde naar objecttype", "Market value by asset type"),
            donut(d1, kort(c.waarde), T("totale waarde", "total value")),
            T("Laat zien waar het vermogen in vastzit. Een zware concentratie in één type maakt de portefeuille gevoeliger voor één markt.",
              "Shows where the capital sits. Heavy concentration in one type makes the portfolio more exposed to a single market.")) +
      kaart(T("Verdeling · huur", "Split · rent"), T("Jaarhuur naar plaats", "Annual rent by location"),
            donut(d3, kort(c.jaarhuur), T("jaarhuur", "annual rent")),
            T("De huurstroom per plaats. Waar de huur geconcentreerd is, weegt leegstand het zwaarst.",
              "The rent roll by location. Where rent is concentrated, vacancy hurts most.")) +
      kaart(T("Verdeling · energie", "Split · energy"), T("Oppervlak naar energielabel", "Floor area by energy label"),
            donut(d2, NUM(c.opp) + " m²", T("verhuurbaar", "lettable")),
            T("Label C is sinds 2023 de ondergrens voor kantoren. Alles onder C vraagt een investeringsplan.",
              "Label C has been the minimum for offices since 2023. Anything below C needs an investment plan.")) +
      '</section>';
  }

  function noiBrug(c) {
    var vorig = Math.round(c.noi / 1.062);
    var stappen = [
      [T("NOI vorig jaar", "NOI last year"), vorig, "start"],
      [T("Indexering bestaande contracten", "Indexation on existing leases"), Math.round(vorig * 0.031), "plus"],
      [T("Nieuwe verhuringen", "New lettings"), Math.round(vorig * 0.026), "plus"],
      [T("Aangekochte objecten", "Assets acquired"), Math.round(vorig * 0.018), "plus"],
      [T("Leegstand en huurderving", "Vacancy and rent loss"), -Math.round(vorig * 0.014), "min"],
      [T("Hogere exploitatiekosten", "Higher operating costs"), -Math.round(vorig * 0.009), "min"],
      [T("NOI dit jaar", "NOI this year"), c.noi, "eind"]
    ];
    var loper = 0;
    var rijen = stappen.map(function (s) {
      var eind = s[2] === "start" || s[2] === "eind";
      if (s[2] === "start") loper = s[1]; else if (!eind) loper += s[1]; else loper = s[1];
      var kleur = s[2] === "plus" ? "text-[#0f625b]" : s[2] === "min" ? "text-[#b8343a]" : "text-[#13263a]";
      var breedte = Math.max(2, Math.abs(s[1]) / c.noi * 100 * (eind ? 1 : 6));
      return '<div class="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 py-2.5 text-[12px] last:border-0">' +
        '<span class="min-w-[220px] flex-1 ' + (eind ? "font-semibold text-[#13263a]" : "text-[#010b22]/75") + '">' + s[0] + '</span>' +
        '<span class="hidden h-2 w-40 overflow-hidden rounded-full bg-slate-100 sm:block">' +
        '<span class="block h-full rounded-full" style="width:' + Math.min(100, breedte) + '%;background:' +
        (s[2] === "plus" ? "#0f625b" : s[2] === "min" ? "#b8343a" : "#13263a") + '"></span></span>' +
        '<span class="w-32 text-right font-semibold ' + kleur + '">' + (s[2] === "plus" ? "+" : "") + EUR(s[1]) + '</span>' +
        '<span class="w-32 text-right text-slate-500">' + EUR(loper) + '</span></div>';
    }).join("");

    return kaart(T("Exploitatie · opbouw", "Operations · build-up"), T("NOI-brug: van vorig jaar naar nu", "NOI bridge: from last year to today"),
      '<div class="mt-4">' + rijen + '</div>',
      T("Een NOI-brug loopt stap voor stap van het netto exploitatieresultaat van vorig jaar naar dat van dit jaar. Elke regel is één oorzaak: indexering en nieuwe verhuringen tellen op, leegstand en kostenstijgingen gaan eraf. Zo zie je meteen welke post het verschil maakt.",
        "A NOI bridge walks step by step from last year's net operating income to this year's. Each line is one cause: indexation and new lettings add, vacancy and cost increases subtract. It shows immediately which item drives the difference."));
  }

  function topTabel(c) {
    var top = c.A.slice().sort(function (a, b) { return b.profile.marketValue - a.profile.marketValue; }).slice(0, 12);
    var koppen = [T("Object", "Asset"), T("Plaats", "Location"), T("Type", "Type"), T("Marktwaarde", "Market value"),
                  T("Jaarhuur", "Annual rent"), T("BAR", "Yield"), T("Bezetting", "Occupancy"), T("LTV", "LTV")];
    return '<div class="border border-[#d9ddd6] bg-white">' +
      '<div class="border-b border-slate-200 p-5"><p class="' + LBL + '">' + T("Concentratie · top 12", "Concentration · top 12") + '</p>' +
      '<h3 class="mt-1 text-[18px] font-semibold tracking-[-0.03em] text-[#13263a]">' + T("Grootste objecten naar waarde", "Largest assets by value") + '</h3></div>' +
      '<div class="overflow-auto"><table class="w-full min-w-[820px] text-left text-[12px]">' +
      '<thead class="bg-slate-50 text-[9px] font-bold uppercase tracking-[0.12em] text-slate-500"><tr>' +
      koppen.map(function (k, i) { return '<th class="px-4 py-3' + (i > 2 ? ' text-right' : '') + '">' + k + '</th>'; }).join("") +
      '</tr></thead><tbody>' +
      top.map(function (a) {
        var bar = a.grossRent * 12 / a.profile.marketValue * 100;
        return '<tr class="border-t border-slate-100">' +
          '<td class="px-4 py-3 font-semibold text-[#13263a]">' + a.name + '</td>' +
          '<td class="px-4 py-3 text-slate-600">' + a.city + '</td>' +
          '<td class="px-4 py-3 text-slate-600">' + soortLabel(a.kind) + '</td>' +
          '<td class="px-4 py-3 text-right">' + EUR(a.profile.marketValue) + '</td>' +
          '<td class="px-4 py-3 text-right">' + EUR(a.grossRent * 12) + '</td>' +
          '<td class="px-4 py-3 text-right">' + NUM(bar, 2) + '%</td>' +
          '<td class="px-4 py-3 text-right ' + (a.occupancy < 75 ? 'font-semibold text-[#b8343a]' : '') + '">' + a.occupancy + '%</td>' +
          '<td class="px-4 py-3 text-right">' + NUM(a.debt / a.profile.marketValue * 100, 1) + '%</td></tr>';
      }).join("") + '</tbody></table></div></div>';
  }

  function expiraties(c) {
    var m = Object.create(null);
    c.A.forEach(function (a) {
      (a.profile.leases || []).forEach(function (l) {
        var y = String(l.leaseEnd).match(/(\d{4})$/);
        var k = y ? y[1] : T("Doorlopend", "Rolling");
        m[k] = m[k] || { n: 0, huur: 0 };
        m[k].n++; m[k].huur += l.monthlyRent || 0;
      });
    });
    var rijen = Object.keys(m).sort().map(function (k) { return { k: k, n: m[k].n, huur: m[k].huur }; });
    var max = Math.max.apply(null, rijen.map(function (r) { return r.huur; })) || 1;
    return kaart(T("Verhuur · aflooprisico", "Leasing · expiry risk"), T("Aflopende contracten per jaar", "Lease expiries by year"),
      '<div class="mt-4">' + rijen.map(function (r) {
        return '<div class="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 py-2.5 text-[12px] last:border-0">' +
          '<span class="w-24 font-semibold text-[#13263a]">' + r.k + '</span>' +
          '<span class="h-2 flex-1 overflow-hidden rounded-full bg-slate-100"><span class="block h-full rounded-full bg-[#2f6f8f]" style="width:' + (r.huur / max * 100).toFixed(1) + '%"></span></span>' +
          '<span class="w-28 text-right text-slate-500">' + r.n + T(" contracten", " leases") + '</span>' +
          '<span class="w-28 text-right font-semibold text-[#13263a]">' + EUR(r.huur) + '</span></div>';
      }).join("") + '</div>',
      T("Per jaar de contracten die aflopen en de maandhuur die daarmee gemoeid is. Een piek in één jaar betekent onderhandelingsdruk in dat jaar.",
        "Per year, the leases that end and the monthly rent involved. A peak in one year means negotiating pressure in that year."));
  }

  function bezettingsverdeling(c) {
    var bak = [[T("Volledig verhuurd (100%)", "Fully let (100%)"), function (a) { return a.occupancy >= 100; }, "#0f625b"],
               [T("Bijna vol (90–99%)", "Nearly full (90–99%)"), function (a) { return a.occupancy >= 90 && a.occupancy < 100; }, "#2f6f8f"],
               [T("Gemiddeld (75–89%)", "Average (75–89%)"), function (a) { return a.occupancy >= 75 && a.occupancy < 90; }, "#8a6d1f"],
               [T("Laag (onder 75%)", "Low (below 75%)"), function (a) { return a.occupancy < 75; }, "#b8343a"]];
    var totaal = c.A.length || 1;
    return kaart(T("Exploitatie · bezetting", "Operations · occupancy"), T("Verdeling van de bezetting", "Distribution of occupancy"),
      '<div class="mt-4">' + bak.map(function (b) {
        var n = c.A.filter(b[1]).length;
        var huur = c.A.filter(b[1]).reduce(function (s, a) { return s + a.grossRent; }, 0);
        return '<div class="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 py-2.5 text-[12px] last:border-0">' +
          '<span class="min-w-[190px] flex-1 text-[#010b22]/75">' + b[0] + '</span>' +
          '<span class="h-2 w-40 overflow-hidden rounded-full bg-slate-100"><span class="block h-full rounded-full" style="width:' + (n / totaal * 100).toFixed(1) + '%;background:' + b[2] + '"></span></span>' +
          '<span class="w-24 text-right text-slate-500">' + n + T(" objecten", " assets") + '</span>' +
          '<span class="w-32 text-right font-semibold text-[#13263a]">' + EUR(huur) + T(" / mnd", " / mo") + '</span></div>';
      }).join("") + '</div>',
      T("Objecten gegroepeerd naar bezettingsgraad, met de maandhuur die in elke groep zit.",
        "Assets grouped by occupancy level, with the monthly rent held in each group."));
  }

  function html() {
    var c = cijfers();
    if (!c.A.length) return "";
    return kpis(c) + taarten(c) +
      '<section class="mt-5 grid gap-5 xl:grid-cols-2">' + noiBrug(c) + bezettingsverdeling(c) + '</section>' +
      '<section class="mt-5">' + topTabel(c) + '</section>' +
      '<section class="mt-5">' + expiraties(c) + '</section>';
  }

  function plaats() {
    if ((window.__EK_PATH?window.__EK_PATH():location.pathname) !== "/analytics") {
      var oud = document.getElementById("ek-analytics");
      if (oud) oud.remove();
      return;
    }
    var taal = window.__EK_LANG ? window.__EK_LANG() : "nl";
    var bestaand = document.getElementById("ek-analytics");
    if (bestaand && bestaand.dataset.taal === taal) return;
    if (bestaand) bestaand.remove();
    var host = document.querySelector("main") || document.body;
    var doel = host.querySelector("div[class*='px-5'][class*='pb-']");
    if (!doel) return;
    var inhoud = html();
    if (!inhoud) return;
    var sec = document.createElement("section");
    sec.id = "ek-analytics";
    sec.dataset.taal = taal;
    sec.innerHTML = inhoud;
    var gloss = document.getElementById("ek-glossary");
    if (gloss && gloss.parentNode === doel) doel.insertBefore(sec, gloss);
    else doel.appendChild(sec);
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
