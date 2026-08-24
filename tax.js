/* Aanvullend fiscaal advies op de pagina Fiscaliteit & structuur.
   Algemene toelichting, geen persoonlijk belastingadvies. Tweetalig (NL/EN). */
(function () {
  var T = function (nl, en) { return (window.__EK_T ? window.__EK_T(nl, en) : nl); };
  function EUR(n) {
    return new Intl.NumberFormat(window.__EK_LANG && window.__EK_LANG() === "en" ? "en-GB" : "nl-NL",
      { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);
  }
  var LBL = "text-[9px] font-bold uppercase tracking-[0.13em] text-slate-500";
  var CARD = "border border-[#d9ddd6] bg-white p-5";

  function items() {
    var A = window.__EK_ASSETS__ || [];
    var monumenten = A.filter(function (a) { return a.kind === "Monument"; }).length;
    var slechtLabel = A.filter(function (a) { return "DEFG".indexOf(a.energyLabel) !== -1; }).length;
    var woningen = A.filter(function (a) { return a.kind === "Residential"; }).length;

    return [
      { cat: T("Verkoop", "Disposal"), prio: T("Kans", "Opportunity"),
        titel: T("Herinvesteringsreserve bij verkoop", "Reinvestment reserve on disposal"),
        raakt: T("Elke verkoop met boekwinst binnen de vennootschappen.", "Any disposal within the companies that realises a book profit."),
        regel: T("Verkoopt een vennootschap een pand met winst, dan kan die boekwinst onder voorwaarden in een herinvesteringsreserve worden geplaatst in plaats van direct te worden belast. De reserve moet binnen drie jaar worden afgeboekt op een vervangende investering; blijft die uit, dan valt de reserve alsnog in de winst.",
                  "If a company sells a property at a profit, that book profit can under conditions be placed in a reinvestment reserve instead of being taxed immediately. The reserve must be applied to a replacement investment within three years; if it is not, it falls into taxable profit after all."),
        bewijs: T("Verkoopakte, boekwaarde, vervangingsvoornemen schriftelijk vastgelegd, en de planning van de herinvestering.",
                  "Deed of sale, book value, a written record of the replacement intention, and the reinvestment schedule.") },

      { cat: T("Verduurzaming", "Sustainability"), prio: slechtLabel ? T("Prioriteit", "Priority") : T("Ter informatie", "Information"),
        titel: T("Investeringsaftrek bij verduurzaming", "Investment allowance on sustainability works"),
        raakt: T(slechtLabel + " objecten hebben label D of lager en staan in het capexplan.",
                 slechtLabel + " assets have label D or lower and appear in the capex plan."),
        regel: T("Voor energiezuinige bedrijfsmiddelen bestaat de energie-investeringsaftrek (EIA): een extra aftrekpost bovenop de gewone afschrijving, mits het middel op de Energielijst van dat jaar staat en de melding binnen drie maanden na opdracht is gedaan. Die meldtermijn is hard - te laat melden betekent geen aftrek, hoe goed de investering ook is.",
                  "Energy-efficient business assets qualify for the energy investment allowance (EIA): an extra deduction on top of normal depreciation, provided the asset is on that year's Energy List and the notification is filed within three months of the order. That deadline is hard - filing late means no allowance, however sound the investment."),
        bewijs: T("Opdrachtbevestiging met datum, specificatie van de installatie, meldingsbewijs RVO en de factuur.",
                  "Dated order confirmation, specification of the installation, RVO notification receipt and the invoice.") },

      { cat: T("Monumenten", "Heritage"), prio: monumenten ? T("Beoordelen", "Review") : T("Ter informatie", "Information"),
        titel: T("Onderhoud aan rijksmonumenten", "Maintenance on listed monuments"),
        raakt: T("Panden met een monumentale status in de portefeuille.", "Assets with listed status in the portfolio."),
        regel: T("De fiscale aftrek van onderhoudskosten voor particuliere monumenteigenaren is vervallen en vervangen door een subsidieregeling; voor panden in een vennootschap gelden gewoon de normale regels voor onderhoud versus verbetering. Het onderscheid is hier het geld waard: onderhoud is direct aftrekbaar, verbetering moet worden geactiveerd en afgeschreven.",
                  "The income-tax deduction for private monument owners has been abolished and replaced by a subsidy scheme; for assets held in a company the ordinary rules on maintenance versus improvement apply. That distinction is worth money here: maintenance is deductible immediately, improvement must be capitalised and depreciated."),
        bewijs: T("Bestek en offerte per post uitgesplitst naar onderhoud en verbetering, plus de monumentenvergunning.",
                  "Specification and quotation split per item into maintenance and improvement, plus the monument permit.") },

      { cat: T("Btw", "VAT"), prio: T("Beoordelen", "Review"),
        titel: T("Herzieningstermijn bij functiewijziging", "VAT adjustment period on change of use"),
        raakt: T("Objecten waarvoor een wijziging van bestemming loopt, zoals de voormalige Aldi en het horecaplein.",
                 "Assets with a pending change of use, such as the former Aldi and the hospitality square."),
        regel: T("Voor onroerende zaken geldt een herzieningstermijn van negen jaar na het jaar van ingebruikname. Gaat een pand binnen die termijn van btw-belaste verhuur naar btw-vrijgestelde verhuur - bijvoorbeeld van winkel naar woningen - dan moet een deel van de eerder teruggevraagde btw worden terugbetaald. Reken dat door vóór de omzetting, niet erna.",
                  "For real estate a nine-year adjustment period applies after the year of first use. If a building moves within that period from VAT-taxed letting to VAT-exempt letting - for example shop to housing - part of the VAT reclaimed earlier must be repaid. Calculate that before the conversion, not after."),
        bewijs: T("Datum eerste ingebruikname, teruggevraagde btw per jaar, het nieuwe huurcontract en de vergunning.",
                  "Date of first use, VAT reclaimed per year, the new lease and the permit.") },

      { cat: T("Structuur", "Structure"), prio: T("Beoordelen", "Review"),
        titel: T("Privébezit tegenover bezit in de B.V.", "Private ownership versus ownership in the company"),
        raakt: T(woningen + " woningobjecten; relevant bij elke nieuwe aankoop.", woningen + " residential assets; relevant on every new acquisition."),
        regel: T("Vastgoed in privé valt in Box 3 en wordt belast over het vermogen, ongeacht het werkelijke resultaat; het stelsel is in beweging en gaat toe naar heffing over werkelijk rendement. Vastgoed in een B.V. valt onder de vennootschapsbelasting, waar rente en afschrijving aftrekbaar zijn maar uitkeren naar privé nog een tweede heffing kost. Bij hoge financiering pakt de B.V. meestal beter uit, bij onbelast vermogen vaak juist niet.",
                  "Property held privately falls in Box 3 and is taxed on wealth regardless of actual result; that regime is changing towards taxation of actual return. Property in a company falls under corporate income tax, where interest and depreciation are deductible but distributing to private hands costs a second layer of tax. With high leverage the company usually wins; with unleveraged equity often not."),
        bewijs: T("Financieringsgraad per object, verwacht rendement, uitkeringsplanning en de positie in Box 2.",
                  "Leverage per asset, expected return, distribution planning and the Box 2 position.") },

      { cat: T("Overdracht", "Transfer"), prio: T("Kans", "Opportunity"),
        titel: T("Overdrachtsbelasting bij herstructurering", "Transfer tax on restructuring"),
        raakt: T("Overdrachten binnen de eigen structuur en aandelentransacties in vastgoedvennootschappen.",
                 "Transfers within the group and share transactions in property companies."),
        regel: T("Naast het algemene tarief bestaan er vrijstellingen die binnen een concern kunnen gelden, onder meer bij interne reorganisatie, fusie en splitsing. Ze zijn voorwaardelijk en kennen aanhoudingstermijnen: wordt binnen die termijn alsnog vervreemd, dan wordt de vrijstelling teruggenomen.",
                  "Alongside the general rate there are exemptions that can apply within a group, including internal reorganisation, merger and demerger. They are conditional and carry holding periods: disposing within that period claws the exemption back."),
        bewijs: T("Structuurschema voor en na, notariële stukken, en een schriftelijke onderbouwing van de vrijstelling.",
                  "Structure chart before and after, notarial documents, and a written substantiation of the exemption.") }
    ];
  }

  function kaart(i) {
    var kleur = /Prioriteit|Priority/.test(i.prio) ? "border-[#ead4d5] bg-[#fff7f7] text-[#b8343a]"
      : /Kans|Opportunity/.test(i.prio) ? "border-[#bfddd4] bg-[#edf8f4] text-[#0f625b]"
      : /Beoordelen|Review/.test(i.prio) ? "border-[#e6dfc9] bg-[#fbf7ea] text-[#8a6d1f]"
      : "border-slate-300 bg-white text-slate-600";
    return '<article class="' + CARD + '">' +
      '<div class="flex flex-wrap items-start justify-between gap-3">' +
        '<div><p class="' + LBL + '">' + i.cat + '</p>' +
        '<h4 class="mt-1 text-[16px] font-semibold tracking-[-0.02em] text-[#13263a]">' + i.titel + '</h4></div>' +
        '<span class="border ' + kleur + ' px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.12em]">' + i.prio + '</span>' +
      '</div>' +
      '<p class="mt-3 text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-500">' + T("Waar het speelt", "Where it applies") + '</p>' +
      '<p class="mt-1 text-[12px] leading-5 text-[#010b22]/70">' + i.raakt + '</p>' +
      '<p class="mt-3 text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-500">' + T("De regel", "The rule") + '</p>' +
      '<p class="mt-1 text-[12px] leading-5 text-[#010b22]/70">' + i.regel + '</p>' +
      '<p class="mt-3 text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-500">' + T("Nodig in het dossier", "Needed in the file") + '</p>' +
      '<p class="mt-1 text-[12px] leading-5 text-[#010b22]/70">' + i.bewijs + '</p>' +
      '</article>';
  }

  function html() {
    return '<section class="mt-6 border-t border-slate-300 pt-6">' +
      '<p class="' + LBL + '">' + T("Fiscaal · aandachtspunten", "Tax · points of attention") + '</p>' +
      '<h3 class="mt-1 text-[22px] font-semibold tracking-[-0.04em] text-[#13263a]">' + T("Waar in deze portefeuille fiscaal iets te halen of te verliezen valt", "Where this portfolio can gain or lose on tax") + '</h3>' +
      '<p class="mt-2 max-w-3xl text-[12px] leading-5 text-[#010b22]/65">' +
      T("Algemene toelichting bij de posten die in deze portefeuille spelen, met per punt wat er in het dossier moet zitten. Dit is geen persoonlijk belastingadvies: tarieven en voorwaarden veranderen per jaar, dus leg elk voornemen voor aan de eigen fiscalist voordat er getekend wordt.",
        "General explanation of the items that play in this portfolio, with what each one needs in the file. This is not personal tax advice: rates and conditions change every year, so put any intention to the company's own tax adviser before signing.") + '</p>' +
      '<div class="mt-5 grid gap-4 lg:grid-cols-2">' + items().map(kaart).join("") + '</div></section>';
  }


  /* --- automatisch signaal in het blok op de fiscale pagina --- */
  function signalen() {
    var A = window.__EK_ASSETS__ || [];
    var wozOpen = A.filter(function (a) { return a.wozReview === "Open"; });
    var wozWaarde = wozOpen.reduce(function (s, a) { return s + a.wozValue; }, 0);
    var box3 = A.filter(function (a) { return /Box 3/.test(a.profile.boxTreatment); });
    var eia = A.filter(function (a) { return a.capexPlan >= 2e5 && "DEFG".indexOf(a.energyLabel) !== -1; });
    var eiaBedrag = eia.reduce(function (s, a) { return s + a.capexPlan; }, 0);
    var leeg = A.filter(function (a) { return a.occupancy === 0; });
    return [
      { prio: T("Nu", "Now"),
        kop: T(wozOpen.length + " objecten met een open WOZ-bezwaartermijn", wozOpen.length + " assets with an open WOZ objection window"),
        tekst: T("Samen " + EUR(wozWaarde) + " aan WOZ-waarde. De termijn sluit halverwege mei; daarna staat de waarde een jaar vast en betaal je de OZB over een cijfer dat niet meer te betwisten is.",
                 "Together " + EUR(wozWaarde) + " of WOZ value. The window closes mid-May; after that the value is fixed for a year and property tax runs on a figure that can no longer be challenged.") },
      { prio: T("Deze maand", "This month"),
        kop: T("Meldingstermijn energie-investeringsaftrek", "Energy investment allowance deadline"),
        tekst: T(eia.length + " objecten met label D of lager hebben samen " + EUR(eiaBedrag) + " aan capex gepland. De EIA-melding moet binnen drie maanden na opdracht bij RVO liggen; te laat is geen aftrek, hoe goed de investering ook is.",
                 eia.length + " assets at label D or lower have " + EUR(eiaBedrag) + " of capex planned. The EIA notification must reach RVO within three months of the order; late means no allowance, however sound the investment.") },
      { prio: T("Vóór de omzetting", "Before conversion"),
        kop: T("Btw-herziening bij functiewijziging", "VAT adjustment on change of use"),
        tekst: T(leeg.length + " objecten staan leeg en zijn kandidaat voor een andere functie. Gaat een pand binnen negen jaar na ingebruikname van btw-belaste naar vrijgestelde verhuur, dan moet een deel van de teruggevraagde btw terug. Reken dat door vóór het besluit.",
                 leeg.length + " assets are vacant and candidates for another use. If a building moves from VAT-taxed to exempt letting within nine years of first use, part of the reclaimed VAT must be repaid. Calculate that before the decision.") },
      { prio: T("Bij verkoop", "On disposal"),
        kop: T("Herinvesteringsreserve klaarzetten", "Set up the reinvestment reserve"),
        tekst: T("Bij een verkoop met boekwinst kan die winst in een herinvesteringsreserve, mits het vervangingsvoornemen vóór de verkoop schriftelijk vastligt. Achteraf vastleggen werkt niet.",
                 "On a disposal at a book profit that gain can go into a reinvestment reserve, provided the replacement intention is recorded in writing before the sale. Recording it afterwards does not work.") },
      { prio: T("Jaarlijks", "Annually"),
        kop: T(box3.length + " objecten in Box 3", box3.length + " assets in Box 3"),
        tekst: T("Deze panden worden in privé gehouden en dus belast over vermogen, niet over resultaat. Het stelsel beweegt naar heffing over werkelijk rendement; bij hoge financiering pakt de B.V. meestal beter uit.",
                 "These are held privately and therefore taxed on wealth rather than result. The regime is moving towards taxing actual return; with high leverage the company usually works out better.") }
    ];
  }

  function vulAi() {
    var doel = document.getElementById("ek-tax-ai");
    if (!doel) return;
    var taal = window.__EK_LANG ? window.__EK_LANG() : "nl";
    if (doel.dataset.taal === taal) return;
    if (!(window.__EK_ASSETS__ || []).length) return;
    doel.dataset.taal = taal;
    doel.className = "border border-[#c7c7c7] bg-[#eeeeee] p-5";
    doel.innerHTML =
      '<p class="text-[9px] font-bold uppercase tracking-[0.13em] text-[#0f625b]">' + T("Automatisch fiscaal signaal", "Automatic tax signal") + '</p>' +
      '<h3 class="mt-2 text-[17px] font-semibold text-[#010b22]">' + T("Wat er nu op de klok staat", "What is on the clock right now") + '</h3>' +
      '<div class="mt-3">' + signalen().map(function (s) {
        return '<div class="border-b border-slate-300/60 py-2.5 last:border-0">' +
          '<div class="flex flex-wrap items-baseline gap-2">' +
          '<span class="border border-[#010b22]/25 bg-white px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.1em] text-[#010b22]">' + s.prio + '</span>' +
          '<span class="text-[12px] font-semibold text-[#010b22]">' + s.kop + '</span></div>' +
          '<p class="mt-1 text-[11px] leading-5 text-[#010b22]/70">' + s.tekst + '</p></div>';
      }).join("") + '</div>' +
      '<p class="mt-3 text-[11px] leading-5 text-[#010b22]/60">' +
      T("Signalen zijn afgeleid uit het register en bedoeld om op tijd te handelen. De uiteindelijke berekening en de handtekening blijven bij de eigen fiscalist.",
        "Signals are derived from the register and meant to prompt action in time. The final calculation and sign-off stay with the company's own tax adviser.") + '</p>';
  }

  function plaats() {
    if ((window.__EK_PATH?window.__EK_PATH():location.pathname) !== "/tax") {
      var oud = document.getElementById("ek-tax");
      if (oud) oud.remove();
      return;
    }
    var taal = window.__EK_LANG ? window.__EK_LANG() : "nl";
    var bestaand = document.getElementById("ek-tax");
    if (bestaand && bestaand.dataset.taal === taal) return;
    if (bestaand) bestaand.remove();
    var host = document.querySelector("main") || document.body;
    var doel = host.querySelector("div[class*='px-5'][class*='pb-']");
    if (!doel || !(window.__EK_ASSETS__ || []).length) return;
    var sec = document.createElement("section");
    sec.id = "ek-tax";
    sec.dataset.taal = taal;
    sec.innerHTML = html();
    var gloss = document.getElementById("ek-glossary");
    if (gloss && gloss.parentNode === doel) doel.insertBefore(sec, gloss);
    else doel.appendChild(sec);
  }

  function alles() { plaats(); vulAi(); }
  function start() {
    if (!document.body) return setTimeout(start, 20);
    alles();
    if (window.__EK_ONLANG) window.__EK_ONLANG(function () {
      var d = document.getElementById("ek-tax-ai");
      if (d) d.removeAttribute("data-taal");
      alles();
    });
    var wacht = false;
    new MutationObserver(function () {
      if (wacht) return;
      wacht = true;
      requestAnimationFrame(function () { wacht = false; alles(); });
    }).observe(document.body, { childList: true, subtree: true });
  }
  start();
})();
