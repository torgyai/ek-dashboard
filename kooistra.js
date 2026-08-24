/* Werkruimte Kooistra.com - inkoop, verkoop en AI-dealradar met nieuws- en P2000-monitor.
   Vult de container die de route /kooistra rendert. Tweetalig (NL/EN). */
(function () {
  var T = function (nl, en) { return (window.__EK_T ? window.__EK_T(nl, en) : nl); };
  var EUR = function (n) {
    return new Intl.NumberFormat(window.__EK_LANG && window.__EK_LANG() === "en" ? "en-GB" : "nl-NL",
      { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);
  };
  var LBL = "text-[9px] font-bold uppercase tracking-[0.13em] text-slate-500";
  var CARD = "border border-[#d9ddd6] bg-white";
  var tab = "radar";

  /* ---------------- gegevens ---------------- */
  function kpis() {
    return [
      { label: T("Ingekocht dit jaar", "Purchased this year"), waarde: EUR(14680000), sub: T("83 partijen · 41 leveranciers", "83 lots · 41 suppliers") },
      { label: T("Verkocht dit jaar", "Sold this year"), waarde: EUR(19240000), sub: T("brutomarge 23,7%", "gross margin 23.7%") },
      { label: T("Voorraadwaarde", "Stock value"), waarde: EUR(4310000), sub: T("11.240 pallets · 15.000 m²", "11,240 pallets · 15,000 m²") },
      { label: T("Gem. doorlooptijd", "Avg. turnaround"), waarde: T("34 dagen", "34 days"), sub: T("van inkoop tot verkocht", "from purchase to sold") },
      { label: T("Gem. reactietijd", "Avg. response time"), waarde: T("3 u 40 m", "3 h 40 m"), sub: T("van signaal tot bod", "from signal to bid") },
      { label: T("Openstaande biedingen", "Open bids"), waarde: EUR(1875000), sub: T("7 dossiers in behandeling", "7 files in progress") }
    ];
  }

  function radar() {
    return [
      { titel: T("Faillissement tuincentrumketen · 4 vestigingen", "Bankruptcy garden-centre chain · 4 branches"),
        bron: T("Centraal Insolventieregister", "Central Insolvency Register"),
        soort: T("Faillissement", "Bankruptcy"), waarde: 620000, score: 94, tijd: T("12 min geleden", "12 min ago"), spoed: true,
        detail: T("Curator inventariseert; voorraad tuinmeubelen, potterie en seizoensartikelen. Vergelijkbaar met de partij Intratuin 2024 (doorlooptijd 26 dagen).",
                  "Receiver is taking stock; garden furniture, pottery and seasonal goods. Comparable to the Intratuin lot in 2024 (26-day turnaround)."),
        contact: T("Curator mr. R. van Dijk · 058 – 213 44 90", "Receiver mr. R. van Dijk · +31 58 213 44 90") },
      { titel: T("Brand distributiecentrum supermarktformule Drachten", "Fire at supermarket distribution centre, Drachten"),
        bron: T("P2000 + regionaal nieuws", "P2000 + regional news"),
        soort: T("Brand-/waterschade", "Fire / water damage"), waarde: 480000, score: 91, tijd: T("38 min geleden", "38 min ago"), spoed: true,
        detail: T("Grote brand, deel van het DC verloren. Rookschade aan non-food verwacht: huishoud, textiel, seizoen. Verzekeraar schakelt doorgaans binnen 5 werkdagen een schadepartijkoper in.",
                  "Major fire, part of the DC lost. Smoke damage expected on non-food: household, textile, seasonal. Insurers usually bring in a salvage buyer within 5 working days."),
        contact: T("Bedrijfsleiding DC · via hoofdkantoor 0512 – 58 21 00", "DC management · via head office +31 512 58 21 00") },
      { titel: T("Insolvenz Haushaltswaren-Filialist · Niedersachsen", "Insolvency household-goods chain · Lower Saxony"),
        bron: T("Duits nieuws + Insolvenzbekanntmachungen", "German news + Insolvenzbekanntmachungen"),
        soort: T("Faillissement (DE)", "Bankruptcy (DE)"), waarde: 540000, score: 88, tijd: T("1 uur geleden", "1 hour ago"), spoed: true,
        detail: T("Elf filialen sluiten, volledige winkelvoorraad komt vrij. Rijafstand Leeuwarden – Oldenburg ca. 2,5 uur; eerdere Duitse partijen haalden een marge van 30–35%.",
                  "Eleven branches closing, full shop inventory released. Leeuwarden – Oldenburg is about 2.5 hours; earlier German lots achieved margins of 30–35%."),
        contact: T("Insolvenzverwalter · +49 441 – 21 07 55", "Insolvency administrator · +49 441 21 07 55") },
      { titel: T("Overvoorraad speelgoedimporteur · einde seizoen", "Toy importer overstock · end of season"),
        bron: T("Eigen netwerk", "Own network"),
        soort: T("Overvoorraad", "Overstock"), waarde: 310000, score: 86, tijd: T("2 uur geleden", "2 hours ago"), spoed: false,
        detail: T("Importeur wil magazijn leeg vóór het nieuwe seizoen. 14 zeecontainers, gemengde pallets, deels A-merken.",
                  "Importer wants the warehouse empty before the new season. 14 sea containers, mixed pallets, partly A-brands."),
        contact: T("Inkoopmanager · bekend bij Kooistra sinds 2019", "Buying manager · known to Kooistra since 2019") },
      { titel: T("Retourenstroom webshop woonaccessoires", "Returns flow, home-accessories webshop"),
        bron: T("Marktplaatsen / veilingportalen", "Marketplaces / auction portals"),
        soort: T("Retouren", "Returns"), waarde: 145000, score: 78, tijd: T("5 uur geleden", "5 hours ago"), spoed: false,
        detail: T("Structurele stroom van ca. 900 pallets per jaar. Kans op doorlopend contract in plaats van eenmalige partij.",
                  "Structural flow of roughly 900 pallets a year. Chance of a rolling contract rather than a one-off lot."),
        contact: T("Logistiek manager · via veilingportaal", "Logistics manager · via auction portal") },
      { titel: T("Fabriekspartij sanitair · productiewissel", "Sanitary factory lot · production changeover"),
        bron: T("Europees netwerk (DE)", "European network (DE)"),
        soort: T("Fabriekspartij", "Factory lot"), waarde: 265000, score: 74, tijd: T("gisteren", "yesterday"), spoed: false,
        detail: T("Duitse fabrikant stopt met een productlijn. Eerste recht van bod tot vrijdag.",
                  "German manufacturer is discontinuing a product line. First right of bid until Friday."),
        contact: T("Vertriebsleitung · +49 251 – 44 09 12", "Vertriebsleitung · +49 251 44 09 12") }
    ];
  }

  function monitor() {
    return [
      { tijd: "09:12", kanaal: "P2000", tekst: T("Zeer grote brand - distributiecentrum, Drachten", "Very large fire - distribution centre, Drachten"), actie: T("sms verstuurd", "SMS sent"), spoed: true },
      { tijd: "08:47", kanaal: T("Insolventieregister", "Insolvency register"), tekst: T("Faillietverklaring tuincentrumketen (4 vestigingen)", "Bankruptcy declared, garden-centre chain (4 branches)"), actie: T("sms verstuurd", "SMS sent"), spoed: true },
      { tijd: "08:21", kanaal: T("Nieuws (DE)", "News (DE)"), tekst: T("Haushaltswaren-Filialist meldet Insolvenz an - 11 Filialen", "Household-goods chain files for insolvency - 11 branches"), actie: T("sms verstuurd", "SMS sent"), spoed: true },
      { tijd: "08:05", kanaal: T("Nieuws", "News"), tekst: T("Warenhuisketen sluit 12 filialen - uitverkoop voorraad verwacht", "Department-store chain closes 12 branches - stock clearance expected"), actie: T("gevolgd", "tracked"), spoed: false },
      { tijd: "07:31", kanaal: "P2000", tekst: T("Middelbrand - bedrijfspand meubelgroothandel, Heerenveen", "Medium fire - furniture wholesaler premises, Heerenveen"), actie: T("beoordeeld · te klein", "assessed · too small"), spoed: false },
      { tijd: T("gisteren 22:10", "yesterday 22:10"), kanaal: T("Feuerwehr / Presse (DE)", "Feuerwehr / press (DE)"), tekst: T("Lagerhallenbrand Emden - Non-Food-Bestand betroffen", "Warehouse fire in Emden - non-food stock affected"), actie: T("op radar", "on radar"), spoed: false },
      { tijd: T("gisteren 21:40", "yesterday 21:40"), kanaal: T("Nieuws", "News"), tekst: T("Importeur kondigt sluiting Nederlandse vestiging aan", "Importer announces closure of its Dutch branch"), actie: T("sms verstuurd", "SMS sent"), spoed: true }
    ];
  }

  function smsjes() {
    return [
      { tijd: "09:13", tekst: T("KANS · Zeer grote brand DC supermarktformule Drachten. Non-food waarschijnlijk rookschade. Contact hoofdkantoor 0512-582100. Geschatte partijwaarde € 480k. Reageer BIED voor dossier.",
                                "LEAD · Very large fire at supermarket DC in Drachten. Non-food likely smoke-damaged. Head office +31 512 582100. Estimated lot value € 480k. Reply BID for the file.") },
      { tijd: "08:48", tekst: T("KANS · Faillissement tuincentrumketen, 4 vestigingen. Curator mr. R. van Dijk 058-2134490. Geschatte partijwaarde € 620k. Vergelijkbaar dossier 2024: marge 31%.",
                                "LEAD · Bankruptcy garden-centre chain, 4 branches. Receiver mr. R. van Dijk +31 58 2134490. Estimated lot value € 620k. Comparable 2024 file: 31% margin.") },
      { tijd: "08:22", tekst: T("KANS (DE) · Insolvenz huishoudketen Niedersachsen, 11 filialen. Verwalter +49 441-210755. Geschatte partijwaarde € 540k. Rijtijd 2u35 vanaf Leeuwarden.",
                                "LEAD (DE) · Insolvency household chain Lower Saxony, 11 branches. Administrator +49 441 210755. Estimated lot value € 540k. 2h35 drive from Leeuwarden.") }
    ];
  }

  function bronnen() {
    return [
      [T("P2000 meldkamer", "P2000 emergency dispatch"), T("brand, instorting, waterschade", "fire, collapse, water damage")],
      [T("Centraal Insolventieregister", "Central Insolvency Register"), T("faillissementen en surseances", "bankruptcies and suspensions of payment")],
      [T("Insolvenzbekanntmachungen (DE)", "Insolvenzbekanntmachungen (DE)"), T("Duitse faillissementen, dagelijks", "German insolvencies, daily")],
      [T("Duitse regionale pers + Feuerwehr", "German regional press + fire brigade"), T("branden en sluitingen NRW / Niedersachsen", "fires and closures in NRW / Lower Saxony")],
      [T("Regionaal en landelijk nieuws", "Regional and national news"), T("sluitingen, reorganisaties, branden", "closures, restructurings, fires")],
      [T("Veiling- en marktplaatsportalen", "Auction and marketplace portals"), T("kavels en retourstromen", "lots and return flows")],
      [T("Eigen netwerk", "Own network"), T("importeurs, curatoren, verzekeraars", "importers, receivers, insurers")]
    ];
  }

  /* verkoopkanalen richting consument en handel */
  function kanalen() {
    return [
      { naam: "Maxx", web: "maxxwinkel.nl",
        soort: T("Eigen warenhuizen · consument", "Own department stores · consumer"),
        aandeel: 34,
        detail: T("Warenhuisformule met wisselend assortiment, vaak tijdelijk in leegstaande panden. Neemt het grootste deel van de ingekochte inventaris af.",
                  "Department-store format with a constantly changing assortment, often temporarily in vacant buildings. Takes the largest share of purchased inventory.") },
      { naam: "ActieVerkoop Dokkum", web: "facebook.com/actieverkoop",
        soort: T("Loodsverkoop · consument", "Warehouse sale · consumer"),
        aandeel: 12,
        detail: T("Meerdaagse loodsverkopen, standaard 70% korting op alles. Wordt ingezet om restanten van een partij snel op te ruimen.",
                  "Multi-day warehouse sales, standard 70% off everything. Used to clear the tail end of a lot quickly.") },
      { naam: T("B2B-webshop", "B2B webshop"), web: "kooistra.com",
        soort: T("Handel · per doos, pallet of partij", "Trade · by box, pallet or full lot"),
        aandeel: 31,
        detail: T("Vaste afnemers in binnen- en buitenland kopen per doos, pallet of hele partij.",
                  "Regular buyers at home and abroad purchase by box, pallet or entire lot.") },
      { naam: T("Groothandel Europa", "European wholesale"), web: T("direct · NL / DE / BE", "direct · NL / DE / BE"),
        soort: T("Handel · doorverkoop in bulk", "Trade · bulk resale"),
        aandeel: 23,
        detail: T("Doorverkoop in bulk aan handelaren en discounters, met name Duitsland en België.",
                  "Bulk resale to traders and discounters, mainly Germany and Belgium.") }
    ];
  }

  function historie() {
    return [
      { partij: T("Blokker · 202 zeecontainers", "Blokker · 202 sea containers"), jaar: "2025", inkoop: 2400000, verkocht: 70, opbrengst: 2150000, dagen: 71, schatting: true },
      { partij: T("Warenhuisvoorraad · non-food", "Department-store stock · non-food"), jaar: "2025", inkoop: 780000, verkocht: 100, opbrengst: 1120000, dagen: 44 },
      { partij: T("Bouwmarkt · overvoorraad tuin", "DIY chain · garden overstock"), jaar: "2026", inkoop: 540000, verkocht: 100, opbrengst: 726000, dagen: 29 },
      { partij: T("Sanitairfabrikant · productiewissel", "Sanitary manufacturer · changeover"), jaar: "2026", inkoop: 410000, verkocht: 100, opbrengst: 583000, dagen: 38 }
    ];
  }

  /* ---------------- opbouw ---------------- */
  function kpi(k) {
    return '<article class="' + CARD + ' p-5"><p class="' + LBL + '">' + k.label + '</p>' +
      '<p class="mt-3 text-[24px] font-semibold tracking-[-0.05em] text-[#13263a]">' + k.waarde + '</p>' +
      '<p class="mt-1 text-[11px] text-slate-500">' + k.sub + '</p></article>';
  }
  function scoreBalk(s) {
    var kleur = s >= 90 ? "#b8343a" : s >= 80 ? "#8a6d1f" : "#0f625b";
    return '<div class="flex items-center gap-2"><div class="h-1.5 w-20 overflow-hidden rounded-full bg-slate-200">' +
      '<div style="width:' + s + '%;background:' + kleur + '" class="h-full"></div></div>' +
      '<span class="text-[11px] font-semibold" style="color:' + kleur + '">' + s + '</span></div>';
  }
  function deal(d) {
    return '<article class="border-b border-slate-100 p-5 last:border-0">' +
      '<div class="flex flex-wrap items-start justify-between gap-3">' +
        '<div class="min-w-[260px] flex-1"><div class="flex flex-wrap items-center gap-2">' +
          '<span class="border border-slate-300 px-2 py-1 text-[9px] font-bold uppercase tracking-[0.1em] text-slate-600">' + d.soort + '</span>' +
          (d.spoed ? '<span class="border border-[#ead4d5] bg-[#fff7f7] px-2 py-1 text-[9px] font-bold uppercase tracking-[0.1em] text-[#b8343a]">' + T("Direct handelen", "Act now") + '</span>' : '') +
          '<span class="text-[11px] text-slate-500">' + d.tijd + ' · ' + d.bron + '</span></div>' +
        '<h4 class="mt-2 text-[15px] font-semibold text-[#13263a]">' + d.titel + '</h4>' +
        '<p class="mt-1.5 max-w-2xl text-[12px] leading-5 text-[#010b22]/65">' + d.detail + '</p>' +
        '<p class="mt-2 text-[11px] text-slate-500">' + T("Contact: ", "Contact: ") + d.contact + '</p></div>' +
        '<div class="text-right"><p class="' + LBL + '">' + T("Geschatte partijwaarde", "Estimated lot value") + '</p>' +
        '<p class="mt-1 text-[18px] font-semibold text-[#13263a]">' + EUR(d.waarde) + '</p>' +
        '<div class="mt-2 flex justify-end">' + scoreBalk(d.score) + '</div>' +
        '<p class="mt-1 text-[10px] uppercase tracking-[0.1em] text-slate-500">' + T("Kansscore", "Opportunity score") + '</p></div>' +
      '</div></article>';
  }
  function monitorRij(m) {
    var verstuurd = m.actie === "sms verstuurd" || m.actie === "SMS sent";
    var kleur = verstuurd ? "text-[#b8343a]" : "text-slate-500";
    return '<div class="flex items-start justify-between gap-4 border-b border-slate-100 py-2.5 text-[12px] last:border-0">' +
      '<div class="flex min-w-0 items-start gap-3"><span class="w-[104px] shrink-0 text-[11px] text-slate-400">' + m.tijd + '</span>' +
      '<span class="w-[150px] shrink-0 text-[10px] font-bold uppercase tracking-[0.1em] text-slate-500">' + m.kanaal + '</span>' +
      '<span class="' + (m.spoed ? 'font-semibold text-[#13263a]' : 'text-[#010b22]/75') + '">' + m.tekst + '</span></div>' +
      '<span class="shrink-0 text-[10px] font-bold uppercase tracking-[0.1em] ' + kleur + '">' + m.actie + '</span></div>';
  }
  function smsRij(s) {
    return '<div class="border border-slate-200 bg-slate-50 p-3.5">' +
      '<p class="' + LBL + '">' + s.tijd + T(" · sms naar Eric", " · SMS to Eric") + '</p>' +
      '<p class="mt-2 text-[12px] leading-5 text-[#13263a]">' + s.tekst + '</p></div>';
  }
  function kanaalRij(k) {
    return '<div class="border-b border-slate-100 py-3.5 last:border-0">' +
      '<div class="flex flex-wrap items-baseline justify-between gap-2">' +
        '<span class="text-[13px] font-semibold text-[#13263a]">' + k.naam +
        ' <span class="text-[11px] font-normal text-slate-400">' + k.web + '</span></span>' +
        '<span class="text-[12px] font-semibold text-[#0f625b]">' + k.aandeel + '%</span></div>' +
      '<p class="mt-0.5 text-[10px] font-bold uppercase tracking-[0.1em] text-slate-500">' + k.soort + '</p>' +
      '<div class="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-200">' +
        '<div class="h-full rounded-full bg-[#13263a]" style="width:' + k.aandeel + '%"></div></div>' +
      '<p class="mt-2 text-[12px] leading-5 text-[#010b22]/65">' + k.detail + '</p></div>';
  }
  function histRij(h) {
    var kostprijs = h.inkoop * h.verkocht / 100;
    var marge = Math.round((h.opbrengst - kostprijs) / kostprijs * 100);
    return '<div class="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 py-3 text-[12px] last:border-0">' +
      '<span class="min-w-[230px] flex-1"><span class="font-semibold text-[#13263a]">' + h.partij +
      (h.schatting ? ' <span class="text-slate-400">*</span>' : '') + '</span>' +
      '<span class="block text-[11px] text-slate-500">' + h.jaar + T(" · doorlooptijd ", " · turnaround ") + h.dagen + T(" dagen", " days") + '</span></span>' +
      '<span class="w-28 text-right text-slate-600">' + EUR(h.inkoop) + '</span>' +
      '<span class="w-20 text-right ' + (h.verkocht < 100 ? 'font-semibold text-[#8a6d1f]' : 'text-slate-600') + '">' + h.verkocht + '%</span>' +
      '<span class="w-28 text-right text-slate-600">' + EUR(h.opbrengst) + '</span>' +
      '<span class="w-20 text-right font-semibold text-[#0f625b]">+' + marge + '%</span></div>';
  }

  function html() {
    return '' +
    '<section class="flex flex-col gap-5 border-b border-slate-300 pb-5 md:flex-row md:items-end md:justify-between">' +
      '<div><p class="' + LBL + '">' + T("Handel · Kooistra.com", "Trading · Kooistra.com") + '</p>' +
      '<h2 class="mt-2 text-[32px] font-semibold tracking-[-0.055em] text-[#13263a]">' + T("Inkoop & dealradar", "Sourcing & deal radar") + '</h2>' +
      '<p class="mt-2 max-w-2xl text-[13px] font-semibold leading-5 text-[#13263a]">' +
        T("Wie het eerst belt, koopt.", "Whoever calls first, buys.") + '</p>' +
      '<p class="mt-1.5 max-w-2xl text-[12px] leading-5 text-[#010b22]/65">' +
        T("De dealradar bewaakt nieuws, insolventies en meldkamerberichten in Nederland én Duitsland en stuurt Eric direct een sms zodra er iets te halen valt.",
          "The deal radar watches news, insolvencies and emergency-dispatch traffic in the Netherlands and Germany, and texts Eric the moment there is something to pick up.") +
      '</p></div>' +
      '<div class="flex flex-wrap items-center gap-2">' +
        '<span class="border border-[#bfddd4] bg-[#edf8f4] px-3 py-2 text-[10px] font-bold uppercase tracking-[0.12em] text-[#0f625b]">' + T("Radar actief", "Radar live") + '</span>' +
        '<span class="border border-slate-300 bg-white px-3 py-2 text-[10px] font-bold uppercase tracking-[0.12em] text-[#13263a]">' + T("Sms-alerts aan", "SMS alerts on") + '</span>' +
      '</div></section>' +

    tabbalk() +
    (tab === "deals" ? (window.__EK_DONEDEALS__ ? window.__EK_DONEDEALS__.html() : "")
     : tab === "cars" ? (window.__EK_CARS__ ? window.__EK_CARS__.html() : "")
     : radarView());
  }

  function tabbalk() {
    var t = [["radar", T("Dealradar", "Deal radar")], ["deals", "Done Deals"], ["cars", "Car Collection"]];
    return '<section class="mt-5 flex flex-wrap gap-2">' + t.map(function (x) {
      return '<button type="button" data-ek-ktab="' + x[0] + '" class="border px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.12em] ' +
        (tab === x[0] ? 'border-[#010b22] bg-[#010b22] text-white' : 'border-slate-300 bg-white text-[#13263a]') + '">' + x[1] + '</button>';
    }).join("") + '</section>';
  }

  function radarView() {
    return '' +
    '<section class="mt-5 grid gap-3 sm:grid-cols-2 ek-xl-6">' + kpis().map(kpi).join("") + '</section>' +

    '<section class="mt-5 grid gap-5 xl:grid-cols-[minmax(0,1fr)_360px]">' +
      '<div class="' + CARD + '">' +
        '<div class="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 p-5">' +
          '<div><p class="' + LBL + '">' + T("AI-dealradar", "AI deal radar") + '</p>' +
          '<h3 class="mt-1 text-[18px] font-semibold text-[#13263a]">' + T("Kansen die nu spelen", "Opportunities live right now") + '</h3></div>' +
          '<span class="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-[#0f625b]">' +
          '<span class="inline-block h-2 w-2 rounded-full bg-[#0f625b]"></span>' + T("live · laatste scan 2 min geleden", "live · last scan 2 min ago") + '</span>' +
        '</div>' + radar().map(deal).join("") + '</div>' +

      '<div class="flex flex-col gap-5">' +
        '<div class="' + CARD + ' p-5"><p class="' + LBL + '">' + T("Sms-notificaties naar Eric", "SMS alerts to Eric") + '</p>' +
          '<h3 class="mt-1 text-[18px] font-semibold text-[#13263a]">' + T("Laatste alerts", "Latest alerts") + '</h3>' +
          '<div class="mt-4 flex flex-col gap-3">' + smsjes().map(smsRij).join("") + '</div>' +
          '<p class="mt-4 text-[11px] leading-5 text-slate-500">' +
          T("Alert bij: brand- en waterschade, faillissement, bedrijfsbeëindiging, overvoorraad boven € 100.000 en partijen binnen 400 km van Leeuwarden (Nederland, Noord-Duitsland en België).",
            "Alerts on: fire and water damage, bankruptcy, business closure, overstock above € 100,000 and lots within 400 km of Leeuwarden (Netherlands, northern Germany and Belgium).") + '</p></div>' +

        '<div class="' + CARD + ' p-5"><p class="' + LBL + '">' + T("Bronnen", "Sources") + '</p>' +
          '<h3 class="mt-1 text-[18px] font-semibold text-[#13263a]">' + T("Wat de radar afzoekt", "What the radar scans") + '</h3>' +
          '<dl class="mt-3 text-[12px]">' +
          bronnen().map(function (r) {
            return '<div class="flex justify-between gap-4 border-b border-slate-100 py-2.5 last:border-0">' +
              '<dt class="font-semibold text-[#13263a]">' + r[0] + '</dt>' +
              '<dd class="text-right text-slate-500">' + r[1] + '</dd></div>'; }).join("") +
          '</dl></div>' +
      '</div></section>' +

    '<section class="mt-5 grid gap-5 xl:grid-cols-[minmax(0,1fr)_360px] ek-xl-420">' +
      '<div class="' + CARD + ' p-5"><p class="' + LBL + '">' + T("Monitor · vandaag", "Monitor · today") + '</p>' +
        '<h3 class="mt-1 text-[18px] font-semibold text-[#13263a]">' + T("Nieuws- en meldkamerstroom", "News and dispatch feed") + '</h3>' +
        '<div class="mt-4">' + monitor().map(monitorRij).join("") + '</div></div>' +

      '<div class="' + CARD + ' p-5"><p class="' + LBL + '">' + T("Verkoopkanalen", "Sales channels") + '</p>' +
        '<h3 class="mt-1 text-[18px] font-semibold text-[#13263a]">' + T("Waar de partijen heen gaan", "Where the lots end up") + '</h3>' +
        '<p class="mt-2 text-[12px] leading-5 text-[#010b22]/65">' +
        T("Een deel van de ingekochte inventaris gaat rechtstreeks naar de consument, via de eigen winkelformules.",
          "Part of the purchased inventory goes straight to consumers through the group's own retail formats.") + '</p>' +
        '<div class="mt-3">' + kanalen().map(kanaalRij).join("") + '</div></div>' +
    '</section>' +

    '<section class="mt-5"><div class="' + CARD + ' p-5">' +
      '<p class="' + LBL + '">' + T("Prestaties · partijen", "Performance · lots") + '</p>' +
      '<h3 class="mt-1 text-[18px] font-semibold text-[#13263a]">' + T("Inkoop tegenover opbrengst", "Purchase versus proceeds") + '</h3>' +
      '<div class="mt-4 flex flex-wrap justify-end gap-3 text-[9px] font-bold uppercase tracking-[0.1em] text-slate-400">' +
        '<span class="w-28 text-right">' + T("Inkoop", "Purchase") + '</span>' +
        '<span class="w-20 text-right">' + T("Verkocht", "Sold") + '</span>' +
        '<span class="w-28 text-right">' + T("Opbrengst", "Proceeds") + '</span>' +
        '<span class="w-20 text-right">' + T("Marge", "Margin") + '</span></div>' +
      '<div class="mt-1">' + historie().map(histRij).join("") + '</div>' +
      '<p class="mt-4 text-[11px] leading-5 text-slate-500">' +
      T("* Blokker, december 2024: 202 zeecontainers met circa 10.000 pallets en 16.000 verschillende artikelen. Aantallen zijn openbaar; de inkoopsom is dat niet en staat hier als interne schatting. Circa 70% is verkocht, de rest ligt nog in het magazijn - de marge op het verkochte deel is daardoor lager dan bij afgeronde partijen.",
        "* Blokker, December 2024: 202 sea containers holding roughly 10,000 pallets and 16,000 distinct articles. The volumes are public; the purchase price is not and is shown here as an internal estimate. About 70% has been sold, the remainder is still in the warehouse - so the margin on the sold portion is lower than on completed lots.") +
      '</p></div></section>';
  }

  function vul() {
    var root = document.getElementById("ek-kooistra-root");
    if (!root) return;
    var taal = window.__EK_LANG ? window.__EK_LANG() : "nl";
    var stempel = [taal, tab,
      window.__EK_DONEDEALS__ ? window.__EK_DONEDEALS__.stempel() : "",
      window.__EK_CARS__ ? window.__EK_CARS__.stempel() : ""].join("|");
    if (root.dataset.gevuld === stempel) return;
    root.dataset.gevuld = stempel;
    root.innerHTML = html();
    if (!root.dataset.klik) {
      root.dataset.klik = "1";
      root.addEventListener("click", function (e) {
        var t = e.target.closest("[data-ek-ktab]");
        if (t) { tab = t.getAttribute("data-ek-ktab"); return vul(); }
        if (window.__EK_CARS__ && window.__EK_CARS__.click(e)) return vul();
        var f = e.target.closest("[data-ek-dealfilter]");
        if (f && window.__EK_DONEDEALS__) { window.__EK_DONEDEALS__.setFilter(f.getAttribute("data-ek-dealfilter")); return vul(); }
        var d = e.target.closest("[data-ek-deal]");
        if (d && window.__EK_DONEDEALS__) { window.__EK_DONEDEALS__.toggle(d.getAttribute("data-ek-deal")); return vul(); }
      });
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
