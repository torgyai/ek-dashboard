/* Netwerk: meerdere eigenaren houden hun eigen omgeving, maar kunnen met een
   expliciete toestemming gegevens bijdragen aan een gezamenlijk beeld. */
(function () {
  var U = window.EKUI, T = U.T;
  var tab = "beeld", grants = { harns: "portefeuille", epie: "analyse", waddenkapitaal: "analyse", hylkema: "geen" }, gekozen = "harns";

  var NIVEAUS = [
    { id: "geen", nl: "Geen deling", en: "No sharing", uitleg: ["Alleen de eigen omgeving. De organisatie telt niet mee in het netwerkbeeld.", "Own environment only. The organisation does not appear in the network view."] },
    { id: "analyse", nl: "Alleen totalen", en: "Aggregates only", uitleg: ["Aantallen, waarde, bezetting, NOI en schuld op portefeuilleniveau. Geen objectnamen, geen huurders, geen documenten.", "Counts, value, occupancy, NOI and debt at portfolio level. No property names, no tenants, no documents."] },
    { id: "portefeuille", nl: "Objectniveau", en: "Property level", uitleg: ["Per object waarde, huur, bezetting, energielabel en schuld. Nog steeds geen persoonsgegevens van huurders.", "Per property: value, rent, occupancy, energy label and debt. Still no tenant personal data."] },
    { id: "beheer", nl: "Beheer", en: "Full management", uitleg: ["Toegang tot contracten, boekingen en werkorders omdat de netwerkpartner het beheer daadwerkelijk uitvoert.", "Access to leases, postings and work orders because the network partner actually performs the management."] }
  ];

  function organisaties() {
    return [
      { id: "eye", naam: "EYE Vastgoed B.V.", plaats: "Dokkum", objecten: 118, units: 604, waarde: 148200000, noi: 8420000, schuld: 65360000,
        bezetting: 93.1, wault: 5.8, eigen: true },
      { id: "harns", naam: "Harns Invest B.V.", plaats: "Harlingen", objecten: 14, units: 86, waarde: 31400000, noi: 1842000, schuld: 15200000,
        bezetting: 88.4, wault: 4.2 },
      { id: "epie", naam: "Kooistra Beheer B.V.", plaats: "Dokkum", objecten: 9, units: 41, waarde: 12800000, noi: 764000, schuld: 4900000,
        bezetting: 96.2, wault: 6.9 },
      { id: "waddenkapitaal", naam: "Waddenkapitaal B.V.", plaats: "Leeuwarden", objecten: 22, units: 148, waarde: 46800000, noi: 2684000, schuld: 24100000,
        bezetting: 91.7, wault: 5.1 },
      { id: "hylkema", naam: T("Stichting Hylkema", "Stichting Hylkema"), plaats: "Franeker", objecten: 6, units: 28, waarde: 9200000, noi: 512000, schuld: 2100000,
        bezetting: 100, wault: 8.4 }
    ];
  }

  function meedoet(o) { return o.eigen || (grants[o.id] && grants[o.id] !== "geen"); }

  var API = {
    stamp: function () { return tab + "|" + gekozen + "|" + JSON.stringify(grants); },
    click: function (e) {
      var t = U.hit(e, "data-ek-net-tab"); if (t) { tab = t; return true; }
      var o = U.hit(e, "data-ek-net-org"); if (o) { gekozen = o; return true; }
      var g = U.hit(e, "data-ek-net-grant");
      if (g) { var d = g.split(":"); grants[d[0]] = d[1]; return true; }
      return false;
    },
    html: function () {
      var O = organisaties();
      var mee = O.filter(meedoet);
      var waarde = mee.reduce(function (s, o) { return s + o.waarde; }, 0);
      var schuld = mee.reduce(function (s, o) { return s + o.schuld; }, 0);
      var noi = mee.reduce(function (s, o) { return s + o.noi; }, 0);
      var units = mee.reduce(function (s, o) { return s + o.units; }, 0);

      var body;
      if (tab === "beeld") body = beeldTab(O, mee, waarde, schuld, noi);
      else if (tab === "toestemming") body = toestemmingTab(O);
      else body = poolTab(mee, waarde, schuld, noi);

      return U.head({
        eyebrow: T("Intelligence · netwerk", "Intelligence · network"),
        title: T("Netwerk", "Network"),
        intro: T("Elke eigenaar houdt zijn eigen administratie en zijn eigen toegang. Wat gedeeld wordt, wordt per organisatie expliciet vrijgegeven: welke gegevens, op welk detailniveau, met welk doel en tot wanneer. Er is geen verborgen stand waarin één partij alles van iedereen ziet.",
                 "Every owner keeps their own administration and their own access. What is shared is released explicitly per organisation: which data, at what level of detail, for what purpose and until when. There is no hidden setting in which one party sees everything about everyone."),
        chip: T(mee.length + " van " + O.length + " organisaties delen", mee.length + " of " + O.length + " organisations sharing")
      }) +
      U.kpis([
        [T("Gezamenlijke waarde", "Combined value"), U.EURK(waarde), T(mee.length + " organisaties", mee.length + " organisations")],
        [T("Eenheden", "Units"), U.NUM(units), T("woningen en bedrijfsruimte", "residential and commercial")],
        [T("Gezamenlijke NOI", "Combined NOI"), U.EURK(noi), U.PCT(noi / waarde * 100) + T(" op waarde", " on value")],
        [T("Gezamenlijke schuld", "Combined debt"), U.EURK(schuld), T("LTV ", "LTV ") + U.PCT(schuld / waarde * 100)],
        [T("Vrije leencapaciteit", "Unused debt capacity"), U.EURK(Math.round(waarde * 0.6 - schuld)), T("tot 60% LTV", "up to 60% LTV")]
      ], 5) +
      '<div class="ek-mt">' + U.tabs([
        { id: "beeld", label: T("Netwerkbeeld", "Network view") },
        { id: "toestemming", label: T("Toestemmingen", "Consent grants"), count: Object.keys(grants).length },
        { id: "pool", label: T("Financieringspool", "Financing pool") }
      ], tab, "data-ek-net-tab") + '</div>' + body;
    }
  };

  function beeldTab(O, mee, waarde, schuld, noi) {
    var rijen = O.map(function (o) {
      var niveau = o.eigen ? "beheer" : (grants[o.id] || "geen");
      var deelt = meedoet(o);
      var toon = function (v) { return deelt ? v : '<span class="ek-dim">' + T("niet gedeeld", "not shared") + '</span>'; };
      return [U.esc(o.naam) + '<br><span class="ek-sub">' + U.esc(o.plaats) + '</span>',
        toon('<span class="ek-num">' + o.objecten + '</span>'),
        toon('<span class="ek-num">' + o.units + '</span>'),
        toon('<span class="ek-num">' + U.EURK(o.waarde) + '</span>'),
        toon('<span class="ek-num">' + U.PCT(o.bezetting) + '</span>'),
        toon('<span class="ek-num">' + U.EURK(o.noi) + '</span>'),
        toon('<span class="ek-num">' + U.PCT(o.schuld / o.waarde * 100) + '</span>'),
        o.eigen ? U.chip(T("Eigen organisatie", "Own organisation"), "info")
          : U.chip(T(NIVEAUS.filter(function (n) { return n.id === niveau; })[0].nl, NIVEAUS.filter(function (n) { return n.id === niveau; })[0].en), deelt ? "ok" : "")];
    });
    var verdeling = [
      [T("Woningen", "Residential"), 62], [T("Bedrijfsruimte en kantoor", "Commercial and office"), 24],
      [T("Winkels", "Retail"), 9], [T("Overig", "Other"), 5]
    ];
    var labels = [["A en hoger", "A and above", 41], ["B", "B", 22], ["C", "C", 19], ["D en lager", "D and below", 18]];
    return '<div class="ek-mt">' + U.panel(T("Deelnemers", "Members"),
      U.table([{ label: T("Organisatie", "Organisation") }, { label: T("Objecten", "Properties"), num: true }, { label: T("Units", "Units"), num: true },
        { label: T("Waarde", "Value"), num: true }, { label: T("Bezetting", "Occupancy"), num: true }, { label: "NOI", num: true },
        { label: "LTV", num: true }, { label: T("Deelt", "Sharing") }], rijen),
      U.btns([{ label: T("Organisatie uitnodigen", "Invite organisation"), primary: true }, { label: T("Toegang vragen", "Request access") },
        { label: T("Cohort maken", "Create cohort") }, { label: T("Exporteren", "Export") }])) +
      '<div class="ek-mt ek-g ek-g3">' +
      U.panel(T("Naar type", "By type"), '<div class="ek-panel-body">' + verdeling.map(function (v) {
        return '<div style="padding:6px 0"><div class="ek-flow" style="justify-content:space-between"><span class="ek-p">' + v[0] + '</span><strong style="font-size:12px">' + U.PCT(v[1], 0) + '</strong></div>' +
          '<div class="ek-bar"><span style="width:' + v[1] + '%"></span></div></div>';
      }).join("") + '</div>') +
      U.panel(T("Energielabels", "Energy labels"), '<div class="ek-panel-body">' + labels.map(function (l) {
        return '<div style="padding:6px 0"><div class="ek-flow" style="justify-content:space-between"><span class="ek-p">' + T(l[0], l[1]) + '</span><strong style="font-size:12px">' + U.PCT(l[2], 0) + '</strong></div>' +
          '<div class="ek-bar' + (l[0].indexOf("D") === 0 ? " ek-bar-red" : "") + '"><span style="width:' + l[2] + '%"></span></div></div>';
      }).join("") + '</div>') +
      U.ai(T("Wat het netwerk zichtbaar maakt", "What the network makes visible"),
        T("Los van elkaar zijn dit vier portefeuilles die elk bij hun eigen bank een gesprek voeren. Samen is het " + U.EURK(waarde) + " met een LTV van " + U.PCT(schuld / waarde * 100) + " en een NOI van " + U.EURK(noi) + ". Dat is precies de schaal waarop een verstrekker één faciliteit wil doen in plaats van vier, en waarop een taxateur en een adviseur bereid zijn scherper te offreren.",
          "Separately these are four portfolios each having its own conversation with its own bank. Together it is " + U.EURK(waarde) + " with an LTV of " + U.PCT(schuld / waarde * 100) + " and NOI of " + U.EURK(noi) + ". That is exactly the scale at which a lender wants to do one facility instead of four, and at which a valuer and an adviser are willing to sharpen their quote.")) +
      '</div></div>';
  }

  function toestemmingTab(O) {
    var andere = O.filter(function (o) { return !o.eigen; });
    var org = andere.filter(function (o) { return o.id === gekozen; })[0] || andere[0];
    var niveau = grants[org.id] || "geen";
    var rijen = andere.map(function (o) {
      var n = grants[o.id] || "geen";
      var def = NIVEAUS.filter(function (x) { return x.id === n; })[0];
      return {
        attr: 'data-ek-net-org="' + o.id + '"', on: org.id === o.id,
        cells: [U.esc(o.naam), U.chip(T(def.nl, def.en), n === "geen" ? "" : (n === "beheer" ? "info" : "ok")),
          n === "geen" ? "-" : T("Netwerkanalyse en financiering", "Network analytics and financing"),
          n === "geen" ? "-" : U.DATE("2027-08-31"),
          n === "geen" ? "-" : (n === "beheer" ? T("Ja", "Yes") : T("Nee", "No")),
          n === "geen" ? "-" : "E. Kooistra · " + U.DATE("2026-06-12")]
      };
    });
    return '<div class="ek-mt">' + U.panel(T("Toestemmingen", "Consent grants"),
      U.table([{ label: T("Organisatie", "Organisation") }, { label: T("Niveau", "Level") }, { label: T("Doel", "Purpose") },
        { label: T("Geldig tot", "Valid until") }, { label: T("Export toegestaan", "Export allowed") }, { label: T("Goedgekeurd door", "Approved by") }], rijen)) +
      '<div class="ek-mt ek-g ek-split">' +
      U.panel(T("Toestemming voor ", "Consent for ") + org.naam, '<div class="ek-panel-body">' +
        NIVEAUS.map(function (n) {
          return '<label class="ek-check"><input type="radio" ' + (n.id === niveau ? "checked" : "") + ' disabled> ' +
            '<span><strong>' + T(n.nl, n.en) + '</strong><br><span class="ek-sub">' + T(n.uitleg[0], n.uitleg[1]) + '</span></span></label>';
        }).join("") +
        '<div class="ek-mt-s">' + U.btns(NIVEAUS.map(function (n) {
          return { label: T(n.nl, n.en), primary: n.id === niveau, attr: 'data-ek-net-grant="' + org.id + ':' + n.id + '"' };
        })) + '</div>' +
        '<div class="ek-mt-s">' + U.kv([
          [T("Gegevenscategorieën", "Data categories"), T("portefeuilletotalen, objectprestaties, waardering, financiering", "portfolio totals, property performance, valuation, financing")],
          [T("Uitgesloten", "Excluded"), T("huurdergegevens, bankmutaties, documenten, leveranciersvoorwaarden", "tenant data, bank transactions, documents, supplier terms")],
          [T("Doorgifte aan derden", "Onward sharing"), T("alleen aan uitdrukkelijk genoemde verstrekkers", "only to explicitly named lenders")],
          [T("Intrekken", "Revocation"), T("per direct, met behoud van het auditspoor", "immediate, with the audit trail retained")]
        ]) + '</div></div>') +
      U.ai(T("Waarom het zo streng staat", "Why this is set so tightly"),
        T("Een netwerk werkt alleen als elke deelnemer weet dat hij zelf de kraan dichtdraait. Daarom is de toestemming per organisatie, per categorie en met een einddatum, en logt het systeem elke keer dat een netwerkpartner die gegevens opvraagt. Wie op alles ja klikt in één vinkje weet volgende maand niet meer waar hij ja tegen zei.",
          "A network only works if every member knows they can turn off the tap themselves. That is why consent is per organisation, per category and with an end date, and why the system logs every time a network partner queries that data. Anyone who agrees to everything with a single checkbox will not remember next month what they agreed to.")) +
      '</div></div>';
  }

  function poolTab(mee, waarde, schuld, noi) {
    var pro = Math.round(waarde * 0.55);
    var extra = pro - schuld;
    var rijen = mee.map(function (o) {
      return [U.esc(o.naam), '<span class="ek-num">' + U.EURK(o.waarde) + '</span>',
        '<span class="ek-num">' + U.EURK(o.schuld) + '</span>',
        '<span class="ek-num">' + U.PCT(o.schuld / o.waarde * 100) + '</span>',
        '<span class="ek-num">' + U.EURK(Math.round(o.waarde * 0.55 - o.schuld)) + '</span>',
        '<span class="ek-num">' + U.NUM(o.noi / (o.schuld * 0.04) , 2) + '</span>'];
    });
    rijen.push({ total: true, cells: [T("Pool", "Pool"), '<span class="ek-num">' + U.EURK(waarde) + '</span>',
      '<span class="ek-num">' + U.EURK(schuld) + '</span>', '<span class="ek-num">' + U.PCT(schuld / waarde * 100) + '</span>',
      '<span class="ek-num">' + U.EURK(extra) + '</span>', '<span class="ek-num">' + U.NUM(noi / (schuld * 0.04), 2) + '</span>'] });
    return '<div class="ek-mt">' + U.panel(T("Gezamenlijke financieringscapaciteit", "Combined debt capacity"),
      U.table([{ label: T("Organisatie", "Organisation") }, { label: T("Waarde", "Value"), num: true }, { label: T("Huidige schuld", "Current debt"), num: true },
        { label: "LTV", num: true }, { label: T("Ruimte tot 55%", "Headroom to 55%"), num: true }, { label: "DSCR", num: true }], rijen),
      U.btns([{ label: T("Pool samenstellen", "Assemble pool"), primary: true }, { label: T("Bankpakket genereren", "Generate bank pack") },
        { label: T("Verstrekkers uitnodigen", "Invite lenders") }, { label: T("Portefeuilles vergelijken", "Compare portfolios") }])) +
      '<div class="ek-mt ek-g ek-split">' +
      U.panel(T("Wat een verstrekker hiervan ziet", "What a lender sees"), '<div class="ek-panel-body">' + U.kv([
        [T("Gezamenlijke waarde", "Combined value"), U.EURK(waarde)],
        [T("Bestaande schuld", "Existing debt"), U.EURK(schuld)],
        [T("Pro forma schuld op 55%", "Pro forma debt at 55%"), U.EURK(pro)],
        [T("Extra capaciteit", "Additional capacity"), U.EURK(extra)],
        [T("Gecombineerde NOI", "Combined NOI"), U.EURK(noi)],
        [T("Rentedekking bij 4%", "Interest cover at 4%"), U.NUM(noi / (pro * 0.04), 2) + "x"],
        [T("Spreiding", "Diversification"), T("4 organisaties, 169 objecten, 3 provincies", "4 organisations, 169 properties, 3 provinces")],
        [T("Grootste huurder", "Largest tenant"), T("8,4% van de huur", "8.4% of the rent")]
      ]) + '</div>') +
      U.ai(T("Waar dit wel en niet over gaat", "What this is and is not"),
        T("Dit is een gezamenlijke voorbereiding: dezelfde definities, dezelfde peildatum, één stapel stukken en één gesprek met een verstrekker. Elke deelnemer leent nog steeds zelf, op zijn eigen objecten, met zijn eigen zekerheden. Zodra het een gemeenschappelijke pot zou worden waar mensen in storten, verandert het karakter en is een juridische toets nodig voordat er ook maar iets wordt aangeboden.",
          "This is joint preparation: the same definitions, the same reporting date, one set of documents and one conversation with a lender. Every member still borrows on their own account, against their own assets, with their own security. The moment it becomes a common pot that people pay into, its character changes and a legal review is needed before anything at all is offered.")) +
      '</div></div>';
  }

  U.mount("ek-network-root", API);
})();
