/* Begrippen en afkortingen: uitleg bij LTV, DSCR, NOI, capex en de rest.
   Zet een stippellijn onder de afkorting met een uitleg bij aanwijzen, en biedt
   een uitklapbare begrippenlijst. Tweetalig (NL/EN). */
(function () {
  var T = function (nl, en) { return (window.__EK_T ? window.__EK_T(nl, en) : nl); };

  function terms() {
    return [
      ["LTV", T("Loan-to-value - de schuld op een object of portefeuille gedeeld door de marktwaarde. 40% LTV betekent dat 40% van de waarde met vreemd vermogen is gefinancierd. Banken hanteren een maximum; blijft de LTV daaronder, dan is er 'ruimte tot de convenantgrens'.",
                "Loan-to-value - debt on an asset or portfolio divided by market value. 40% LTV means 40% of the value is financed with debt. Banks set a maximum; staying below it leaves 'covenant headroom'.")],
      ["DSCR", T("Debt service coverage ratio - de operationele winst gedeeld door rente plus aflossing. 1,82x betekent dat er 1,82 euro binnenkomt voor elke euro die de bank per jaar opeist. Onder de afgesproken ondergrens (hier 1,25x) is de bank in zijn recht om in te grijpen.",
                 "Debt service coverage ratio - operating profit divided by interest plus amortisation. 1.82x means € 1.82 comes in for every euro the bank requires each year. Below the agreed floor (1.25x here) the bank may intervene.")],
      ["NOI", T("Net operating income, in het Nederlands het netto exploitatieresultaat: de huurinkomsten min de exploitatiekosten (beheer, onderhoud, verzekering, belastingen), maar vóór rente, aflossing en investeringen.",
                "Net operating income: rental income less operating costs (management, maintenance, insurance, taxes), but before interest, amortisation and capital expenditure.")],
      [T("NOI-brug", "NOI bridge"), T("Een NOI-brug laat stap voor stap zien hoe het netto exploitatieresultaat van vorig jaar naar dit jaar is bewogen: eerst de huurgroei erbij, dan leegstand eraf, dan indexering, kosten en nieuwe of verkochte objecten. Zo is in één oogopslag te zien welke post het verschil maakt.",
                                       "A NOI bridge shows step by step how net operating income moved from last year to this year: rental growth added, vacancy deducted, then indexation, costs and assets bought or sold. It shows at a glance which item drives the difference.")],
      ["Capex", T("Capital expenditure - investeringen in het pand die de waarde of levensduur verhogen: een nieuw dak, een warmtepomp, een complete renovatie. Dit staat los van onderhoud, dat je elk jaar hebt en direct ten laste van het resultaat komt.",
                  "Capital expenditure - investment in the building that raises value or extends life: a new roof, a heat pump, a full refurbishment. Distinct from maintenance, which recurs annually and is expensed directly.")],
      [T("Convenant", "Covenant"), T("Een afspraak in de leningsovereenkomst waaraan je je moet houden, bijvoorbeeld een maximale LTV of een minimale DSCR. Het woord komt uit het Engels (covenant) maar wordt in de Nederlandse financieringspraktijk gewoon zo gebruikt; 'bankconvenant' of 'financieringsconvenant' is de gangbare term.",
                                      "A condition in the loan agreement you must keep to, for example a maximum LTV or a minimum DSCR. Breaching it gives the lender rights, from a higher margin to calling the loan.")],
      [T("Ruimte tot de convenantgrens", "Covenant headroom"), T("Het verschil tussen waar je nu staat en de grens die de bank stelt. Bij een LTV van 40% en een grens van 55% is er 15 procentpunt ruimte: de waarde mag dalen of de schuld stijgen tot dat punt voordat de bank kan ingrijpen.",
                                                                  "The distance between where you stand today and the limit the bank sets. At 40% LTV against a 55% limit there are 15 percentage points of room before the lender can act.")],
      ["WOZ", T("De waarde die de gemeente jaarlijks aan een pand toekent. Basis voor de onroerendezaakbelasting en, bij woningen, voor de maximale huur en Box 3.",
                "The value the municipality assigns to a property each year. Basis for property tax and, for housing, for maximum rent and Box 3.")],
      [T("EPC / energielabel", "EPC / energy label"), T("Het energielabel van A tot G. Vanaf 2023 moeten kantoren minimaal label C hebben; voor 2030 ligt er een strengere norm in het vooruitzicht.",
                                                        "The energy label from A to G. Since 2023 offices need at least label C; a stricter standard is expected before 2030.")],
      ["ADR / RevPAR", T("Hotelmaatstaven: ADR is de gemiddelde kamerprijs van de verkochte kamers, RevPAR de opbrengst per beschikbare kamer - dus inclusief de kamers die leeg bleven.",
                         "Hotel metrics: ADR is the average rate of rooms sold, RevPAR the revenue per available room - including rooms that stayed empty.")],
      [T("Bruto aanvangsrendement", "Gross initial yield"), T("De jaarhuur gedeeld door de marktwaarde. Een pand van € 1 mln met € 70.000 huur per jaar heeft een BAR van 7%.",
                                                              "Annual rent divided by market value. A € 1m asset with € 70,000 rent a year yields 7%.")],
      [T("Derdengelden", "Client funds"), T("Geld dat wel op jouw rekening staat maar van iemand anders is, zoals geïnde huur die nog moet worden doorbetaald of waarborgsommen. Telt niet mee als vrij besteedbaar.",
                                            "Money in your account that belongs to someone else, such as collected rent still to be passed on, or deposits. Does not count as freely available.")],
      [T("Bouwdepot", "Construction escrow"), T("Een geblokkeerde rekening waaruit alleen bouwtermijnen worden betaald, vaak gevoed door een verzekeraar of financier.",
                                                "A blocked account from which only construction instalments are paid, usually funded by an insurer or lender.")],
      ["ESG", T("Environmental, Social en Governance: de drie manieren waarop een portefeuille naast het rendement wordt beoordeeld. Environmental is voor vastgoed de zwaarste (energie, uitstoot, afval), Social gaat over huurders, toegankelijkheid en veiligheid, en Governance over hoe het bestuurlijk geregeld is. Banken en verzekeraars vragen deze cijfers steeds vaker op vóór ze financieren.",
                "Environmental, Social and Governance: the three ways a portfolio is judged alongside its return. Environmental is heaviest for property (energy, emissions, waste), Social covers tenants, accessibility and safety, and Governance how things are run. Banks and insurers increasingly ask for these figures before financing.")],
      ["WAULT", T("Weighted Average Unexpired Lease Term: de gemiddelde resterende looptijd van alle huurcontracten, gewogen naar huur. Een WAULT van 4,2 jaar betekent dat de huurstroom gemiddeld nog ruim vier jaar vastligt. Hoe langer, hoe voorspelbaarder de inkomsten en hoe rustiger de bank.",
                  "Weighted Average Unexpired Lease Term: the average remaining term of all leases, weighted by rent. A WAULT of 4.2 years means the rent roll is contracted for just over four more years on average. The longer it is, the more predictable the income and the calmer the lender.")],
      [T("Huurexpiraties", "Lease expiries"), T("De contracten die aflopen, meestal per jaar gegroepeerd. Elk aflopend contract is een moment waarop de huurder kan vertrekken of opnieuw wil onderhandelen. Vallen er veel expiraties in hetzelfde jaar, dan komt de huurstroom in dat jaar onder druk te staan.",
                                                "The leases that end, usually grouped per year. Every expiry is a moment when the tenant can leave or renegotiate. If many expiries land in the same year, the rent roll comes under pressure in that year.")],
      [T("Convenanten", "Covenants"), T("De voorwaarden in de leningsovereenkomst waaraan je je moet houden, bijvoorbeeld een maximale LTV of een minimale DSCR. Overschrijding geeft de bank rechten, van een hogere opslag tot het opeisen van de lening. In het Nederlands wordt gewoon 'convenant' of 'bankconvenant' gebruikt.",
                                        "The conditions in the loan agreement you must keep to, for example a maximum LTV or a minimum DSCR. Breaching them gives the lender rights, from a higher margin to calling the loan.")],
      [T("Bestemmingsplan", "Zoning plan"), T("Het gemeentelijke plan dat vastlegt wat je op een perceel mag doen: wonen, detailhandel, horeca, bedrijvigheid, en hoe hoog en hoe dicht je mag bouwen. Wil je iets anders, dan is een wijziging of afwijkingsvergunning nodig.",
                                              "The municipal plan setting out what a site may be used for - housing, retail, hospitality, industry - and how high and dense you may build. Anything else requires a change or a deviation permit.")]
    ];
  }

  /* --- uitleg bij aanwijzen op korte labels --- */
  var KORT = ["LTV", "DSCR", "NOI", "Capex", "CAPEX", "WOZ", "EPC", "ADR", "RevPAR", "ESG", "WAULT"];
  function tips() {
    var L = terms();
    var map = Object.create(null);
    L.forEach(function (r) { map[String(r[0]).toLowerCase()] = r[1]; });
    var els = document.querySelectorAll("p,span,dt,th,h3,h4,td,label");
    for (var i = 0; i < els.length; i++) {
      var el = els[i];
      if (el.dataset.ekTip || el.children.length) continue;
      var t = (el.textContent || "").trim();
      if (!t || t.length > 40) continue;
      var hit = null;
      for (var k = 0; k < KORT.length; k++) {
        var w = KORT[k];
        if (new RegExp("(^|[^A-Za-z])" + w + "([^A-Za-z]|$)").test(t)) { hit = w.toLowerCase(); break; }
      }
      if (!hit || !map[hit]) continue;
      el.dataset.ekTip = "1";
      el.classList.add("ek-tip");
      el.setAttribute("title", map[hit]);
    }
  }

  /* --- uitklapbare begrippenlijst --- */
  function paneelHtml() {
    return '<div class="border border-[#d9ddd6] bg-white">' +
      '<button type="button" data-ek-gloss-toggle="1" class="flex w-full items-center justify-between gap-4 p-5 text-left hover:bg-slate-50">' +
        '<span><span class="block text-[9px] font-bold uppercase tracking-[0.13em] text-slate-500">' + T("Naslag", "Reference") + '</span>' +
        '<span class="mt-1 block text-[18px] font-semibold text-[#13263a]">' + T("Begrippen en afkortingen", "Terms and abbreviations") + '</span></span>' +
        '<span class="text-[13px] text-slate-400" aria-hidden="true">▸</span>' +
      '</button>' +
      '<div data-ek-gloss-body="1" class="hidden border-t border-slate-200 p-5">' +
        '<dl class="grid gap-4 lg:grid-cols-2">' +
        terms().map(function (r) {
          return '<div class="border border-slate-200 p-4">' +
            '<dt class="text-[13px] font-semibold text-[#13263a]">' + r[0] + '</dt>' +
            '<dd class="mt-1.5 text-[12px] leading-5 text-[#010b22]/70">' + r[1] + '</dd></div>';
        }).join("") +
        '</dl></div></div>';
  }

  function plaatsPaneel() {
    if (!/^\/(analytics|debt|tax|energy|leases)$/.test((window.__EK_PATH?window.__EK_PATH():location.pathname))) {
      var oud = document.getElementById("ek-glossary");
      if (oud) oud.remove();
      return;
    }
    var taal = window.__EK_LANG ? window.__EK_LANG() : "nl";
    var bestaand = document.getElementById("ek-glossary");
    if (bestaand && bestaand.dataset.taal === taal) return;
    if (bestaand) bestaand.remove();
    var host = document.querySelector("main") || document.body;
    var doel = host.querySelector("div[class*='px-5'][class*='pb-']") || host;
    var sec = document.createElement("section");
    sec.id = "ek-glossary";
    sec.dataset.taal = taal;
    sec.className = "mt-5";
    sec.innerHTML = paneelHtml();
    doel.appendChild(sec);
    sec.addEventListener("click", function (e) {
      if (!e.target.closest("[data-ek-gloss-toggle]")) return;
      var body = sec.querySelector("[data-ek-gloss-body]");
      var pijl = sec.querySelector("[data-ek-gloss-toggle] span[aria-hidden]");
      var dicht = body.classList.contains("hidden");
      body.classList.toggle("hidden", !dicht);
      if (pijl) pijl.textContent = dicht ? "▾" : "▸";
    });
  }

  function start() {
    if (!document.body) return setTimeout(start, 20);
    tips(); plaatsPaneel();
    if (window.__EK_ONLANG) window.__EK_ONLANG(function () {
      var els = document.querySelectorAll("[data-ek-tip]");
      for (var i = 0; i < els.length; i++) els[i].removeAttribute("data-ek-tip");
      tips(); plaatsPaneel();
    });
    var wacht = false;
    new MutationObserver(function () {
      if (wacht) return;
      wacht = true;
      requestAnimationFrame(function () { wacht = false; tips(); plaatsPaneel(); });
    }).observe(document.body, { childList: true, subtree: true });
  }
  start();
})();
