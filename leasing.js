/* Verhuur & kandidaten: van leegstand naar getekend contract.
   Publicatie naar Funda en Pararius, kandidatenpijplijn, bezichtigingen,
   aanbiedingen, digitale ondertekening en mutaties. Tweetalig. */
(function () {
  var U = window.EKUI, T = U.T;
  var tab = "leegstand", open = null, acties = {};

  function stap(id) { return acties[id] || 0; }

  function eenheden() {
    return [
      { id: "ds-12", object: "Dockumer Sluys appartementen", plaats: "Dokkum", unit: "Bouwnummer 12", type: T("Appartement 3-kamer", "Apartment, 3 rooms"),
        m2: 78, vraag: 1145, servicekosten: 62, vrij: "2026-09-01", energie: "A++", status: "publiek", kanaal: ["Funda", "Pararius"], dagen: 11, kandidaten: 6, wws: 168 },
      { id: "ds-14", object: "Dockumer Sluys appartementen", plaats: "Dokkum", unit: "Bouwnummer 14", type: T("Appartement 2-kamer", "Apartment, 2 rooms"),
        m2: 61, vraag: 925, servicekosten: 54, vrij: "2026-10-01", energie: "A++", status: "concept", kanaal: [], dagen: 0, kandidaten: 0, wws: 141 },
      { id: "casa-3", object: "Casa Velha appartementen", plaats: "Leeuwarden", unit: "Nr. 3", type: T("Appartement 2-kamer", "Apartment, 2 rooms"),
        m2: 64, vraag: 985, servicekosten: 48, vrij: "2026-09-15", energie: "B", status: "publiek", kanaal: ["Pararius"], dagen: 26, kandidaten: 3, wws: 147 },
      { id: "trije-2", object: "Trije Hûs", plaats: "Harlingen", unit: T("Tweede verdieping", "Second floor"), type: T("Kantoorruimte", "Office space"),
        m2: 212, vraag: 2450, servicekosten: 385, vrij: "2026-11-01", energie: "C", status: "onderhandeling", kanaal: ["Funda Business"], dagen: 63, kandidaten: 2, wws: null },
      { id: "iqon-5", object: "Achmeatoren / IQON", plaats: "Leeuwarden", unit: T("Vijfde verdieping, vleugel B", "Fifth floor, wing B"), type: T("Kantoorruimte", "Office space"),
        m2: 640, vraag: 8900, servicekosten: 1680, vrij: "2027-01-01", energie: "A", status: "publiek", kanaal: ["Funda Business", T("Eigen site", "Own site")], dagen: 38, kandidaten: 4, wws: null },
      { id: "gron-9", object: "Portefeuille Groningen", plaats: "Groningen", unit: T("Zuiderpark 9-B", "Zuiderpark 9-B"), type: T("Appartement 3-kamer", "Apartment, 3 rooms"),
        m2: 72, vraag: 1075, servicekosten: 58, vrij: "2026-09-01", energie: "C", status: "gereserveerd", kanaal: ["Pararius"], dagen: 19, kandidaten: 5, wws: 152 }
    ];
  }

  function kandidaten() {
    return [
      { id: "k1", naam: "Familie Van der Meer", unit: "ds-12", fase: 3, inkomen: 74500, bron: "Funda", score: 92,
        stukken: T("Compleet", "Complete"), opmerking: T("Twee vaste dienstverbanden, geen huisdieren, wil per 1 september.", "Two permanent contracts, no pets, wants 1 September.") },
      { id: "k2", naam: "J. Hoekstra", unit: "ds-12", fase: 2, inkomen: 51200, bron: "Pararius", score: 71,
        stukken: T("Werkgeversverklaring ontbreekt", "Employer statement missing"), opmerking: T("Inkomensnorm net gehaald bij 3,5x de huur.", "Meets the income norm just at 3.5x the rent.") },
      { id: "k3", naam: "Stichting Zorggroep Noard", unit: "iqon-5", fase: 4, inkomen: null, bron: T("Eigen site", "Own site"), score: 88,
        stukken: T("Jaarrekening 2025 ontvangen", "2025 annual accounts received"), opmerking: T("Wil 5 jaar met optie 5, vraagt drie maanden huurvrij.", "Wants 5 years plus 5, asking for three months rent-free.") },
      { id: "k4", naam: "Bakker & Zn. Advies", unit: "trije-2", fase: 4, inkomen: null, bron: "Funda Business", score: 76,
        stukken: T("KvK en jaarcijfers ontvangen", "Chamber of Commerce and accounts received"), opmerking: T("Vraagt om splitsing van de verdieping in twee units.", "Asking to split the floor into two units.") },
      { id: "k5", naam: "M. de Vries", unit: "casa-3", fase: 1, inkomen: 43800, bron: "Pararius", score: 58,
        stukken: T("Nog niets aangeleverd", "Nothing supplied yet"), opmerking: T("Onder de inkomensnorm; wachtlijst is het eerlijkst.", "Below the income norm; the waiting list is the fairest outcome.") },
      { id: "k6", naam: "T. Wielenga", unit: "gron-9", fase: 5, inkomen: 61900, bron: "Pararius", score: 84,
        stukken: T("Compleet", "Complete"), opmerking: T("Contract staat klaar voor ondertekening.", "Lease is ready for signature.") }
    ];
  }

  var FASEN = [
    { nl: "Lead", en: "Lead" }, { nl: "Stukken", en: "Documents" }, { nl: "Bezichtiging", en: "Viewing" },
    { nl: "Aanbod", en: "Offer" }, { nl: "Tekenen", en: "Signing" }, { nl: "Sleutel", en: "Keys" }
  ];
  function faseNaam(i) { var f = FASEN[Math.min(i, FASEN.length - 1)]; return T(f.nl, f.en); }

  function mutaties() {
    return [
      { id: "m1", soort: T("Oplevering", "Move-in"), unit: "Dockumer Sluys 12", datum: "2026-09-01", wie: "Familie Van der Meer", staat: T("Inspectie ingepland", "Inspection scheduled") },
      { id: "m2", soort: T("Vertrek", "Move-out"), unit: "Casa Velha 7", datum: "2026-09-14", wie: "R. Postma", staat: T("Eindinspectie 12-09", "Final inspection 12 Sep") },
      { id: "m3", soort: T("Verlenging", "Renewal"), unit: "Grand Café Wald", datum: "2027-01-01", wie: T("Exploitant", "Operator"), staat: T("Brief verstuurd", "Letter sent") },
      { id: "m4", soort: T("Opzegging", "Termination"), unit: "Portefeuille Groningen 4-A", datum: "2026-10-31", wie: "S. Bosma", staat: T("Bevestigd", "Confirmed") }
    ];
  }

  function indexaties() {
    return [
      { groep: T("Woningen Dokkum", "Residential Dokkum"), aantal: 41, basis: "CPI alle huishoudens", pct: 3.4, ingang: "2026-07-01", oud: 46820, nieuw: 48412, staat: "gereed" },
      { groep: T("Woningen Leeuwarden", "Residential Leeuwarden"), aantal: 28, basis: "CPI alle huishoudens", pct: 3.4, ingang: "2026-07-01", oud: 31240, nieuw: 32302, staat: "gereed" },
      { groep: T("Bedrijfsruimte Friesland", "Commercial Friesland"), aantal: 17, basis: "CPI + 1%", pct: 4.4, ingang: "2027-01-01", oud: 89150, nieuw: 93073, staat: "concept" },
      { groep: T("Winkels binnenstad", "Retail town centre"), aantal: 9, basis: T("CPI, plafond 5%", "CPI, capped at 5%"), pct: 3.4, ingang: "2027-01-01", oud: 41600, nieuw: 43014, staat: "concept" }
    ];
  }

  function statusChip(s) {
    var m = {
      publiek: [T("Gepubliceerd", "Published"), "ok"],
      concept: [T("Concept", "Draft"), ""],
      onderhandeling: [T("In onderhandeling", "In negotiation"), "warn"],
      gereserveerd: [T("Gereserveerd", "Reserved"), "info"]
    }[s] || [s, ""];
    return U.chip(m[0], m[1]);
  }

  var API = {
    stamp: function () { return tab + "|" + open + "|" + JSON.stringify(acties); },
    click: function (e) {
      var t = U.hit(e, "data-ek-lease-tab");
      if (t) { tab = t; open = null; return true; }
      var r = U.hit(e, "data-ek-lease-open");
      if (r) { open = open === r ? null : r; return true; }
      var a = U.hit(e, "data-ek-lease-act");
      if (a) {
        var d = a.split(":");
        if (d[0] === "stap") acties[d[1]] = Math.min(5, stap(d[1]) + 1);
        if (d[0] === "afwijs") acties[d[1]] = -1;
        if (d[0] === "wacht") acties[d[1]] = -2;
        if (d[0] === "pub") acties["pub-" + d[1]] = (acties["pub-" + d[1]] || 0) + 1;
        return true;
      }
      return false;
    },
    html: function () {
      var E = eenheden(), K = kandidaten();
      var leeg = E.length, actief = E.filter(function (e) { return e.status === "publiek"; }).length;
      var vraaghuur = E.reduce(function (s, e) { return s + e.vraag; }, 0);
      var dagen = Math.round(E.reduce(function (s, e) { return s + e.dagen; }, 0) / E.length);

      var body;
      if (tab === "leegstand") body = leegstandTab(E);
      else if (tab === "kandidaten") body = kandidatenTab(K, E);
      else if (tab === "mutaties") body = mutatiesTab();
      else body = indexatieTab();

      return U.head({
        eyebrow: T("Exploitatie · verhuur", "Operations · leasing"),
        title: T("Verhuur & kandidaten", "Leasing & candidates"),
        intro: T("Van leegstaande unit naar getekend contract in één lijn: publiceren op Funda en Pararius, kandidaten beoordelen, bezichtigen, aanbieden, tekenen en de sleutel overdragen. Elke stap landt direct op het object en het huurcontract.",
                 "From vacant unit to signed lease in one line: publish to Funda and Pararius, assess candidates, view, offer, sign and hand over the keys. Every step lands straight on the property and the lease."),
        chip: T("Doorlooptijd " + dagen + " dagen gemiddeld", "Average time to let " + dagen + " days")
      }) +
      U.kpis([
        [T("Beschikbare units", "Available units"), String(leeg), T("waarvan " + actief + " gepubliceerd", actief + " of them published")],
        [T("Vraaghuur per maand", "Asking rent per month"), U.EUR(vraaghuur), T("exclusief servicekosten", "excluding service charges")],
        [T("Actieve kandidaten", "Active candidates"), String(K.length), T("over 5 units", "across 5 units")],
        [T("Gemiddelde doorlooptijd", "Average time to let"), dagen + " " + T("dagen", "days"), T("norm: 45 dagen", "target: 45 days")],
        [T("Indexatie juli", "July indexation"), "3,4%", T("69 contracten verwerkt", "69 leases processed")]
      ], 5) +
      '<div class="ek-mt">' + U.tabs([
        { id: "leegstand", label: T("Leegstand & publicaties", "Vacancies & listings"), count: E.length },
        { id: "kandidaten", label: T("Kandidatenpijplijn", "Candidate pipeline"), count: K.length },
        { id: "mutaties", label: T("Mutaties", "Move-ins & move-outs"), count: 4 },
        { id: "indexatie", label: T("Indexatiebatch", "Indexation batch"), count: 4 }
      ], tab, "data-ek-lease-tab") + '</div>' + body;
    }
  };

  function leegstandTab(E) {
    var rijen = E.map(function (e) {
      var gepubliceerd = (acties["pub-" + e.id] || 0) % 2 === 1 ? !(e.status === "publiek") : (e.status === "publiek");
      return {
        attr: 'data-ek-lease-open="' + e.id + '"', on: open === e.id,
        cells: [
          '<strong>' + U.esc(e.unit) + '</strong><br><span class="ek-sub">' + U.esc(e.object) + " · " + U.esc(e.plaats) + '</span>',
          U.esc(e.type) + '<br><span class="ek-sub">' + e.m2 + ' m² · ' + T("label", "label") + ' ' + e.energie + (e.wws ? ' · ' + e.wws + ' ' + T("punten", "points") : "") + '</span>',
          U.EUR(e.vraag) + '<br><span class="ek-sub">+ ' + U.EUR(e.servicekosten) + ' ' + T("servicekosten", "service charges") + '</span>',
          U.DATE(e.vrij),
          gepubliceerd ? U.chip(e.kanaal.length ? e.kanaal.join(" · ") : T("Gepubliceerd", "Published"), "ok") : U.chip(T("Niet gepubliceerd", "Not published"), ""),
          statusChip(e.status),
          '<span class="ek-num">' + e.kandidaten + '</span>'
        ]
      };
    });
    var detail = "";
    var gek = E.filter(function (e) { return e.id === open; })[0];
    if (gek) {
      var gepubliceerd = (acties["pub-" + gek.id] || 0) % 2 === 1 ? !(gek.status === "publiek") : (gek.status === "publiek");
      detail = '<div class="ek-mt">' + U.panel(T("Unit ", "Unit ") + gek.unit + " · " + gek.object,
        '<div class="ek-panel-body ek-g ek-split">' +
        '<div>' + U.kv([
          [T("Type", "Type"), U.esc(gek.type)],
          [T("Oppervlak", "Floor area"), gek.m2 + " m²"],
          [T("Vraaghuur", "Asking rent"), U.EUR(gek.vraag) + " " + T("per maand", "per month")],
          [T("Servicekosten", "Service charges"), U.EUR(gek.servicekosten) + " " + T("voorschot", "advance")],
          [T("Beschikbaar per", "Available from"), U.DATE(gek.vrij)],
          [T("Energielabel", "Energy label"), gek.energie],
          [T("Woningwaardering", "Housing points"), gek.wws ? gek.wws + " " + T("punten · geliberaliseerd", "points · liberalised") : T("niet van toepassing", "not applicable")],
          [T("Kanalen", "Channels"), gek.kanaal.length ? U.esc(gek.kanaal.join(", ")) : "-"]
        ]) +
        '<div class="ek-mt-s">' + U.btns([
          { label: gepubliceerd ? T("Publicatie intrekken", "Unpublish") : T("Publiceren", "Publish"), primary: !gepubliceerd, attr: 'data-ek-lease-act="pub:' + gek.id + '"' },
          { label: T("Naar Funda", "To Funda"), attr: 'data-ek-lease-act="pub:' + gek.id + '"' },
          { label: T("Naar Pararius", "To Pararius"), attr: 'data-ek-lease-act="pub:' + gek.id + '"' },
          { label: T("Bezichtiging plannen", "Schedule viewing") },
          { label: T("Kandidaat uitnodigen", "Invite candidate") },
          { label: T("Advertentie bewerken", "Edit listing") }
        ]) + '</div></div>' +
        '<div>' + U.ai(T("Verhuuradvies", "Letting advice"),
          T("De vraaghuur ligt " + (gek.wws ? "binnen" : "boven") + " de bandbreedte van vergelijkbare units in " + gek.plaats + ". Bij deze doorlooptijd (" + gek.dagen + " dagen) is een verlaging van 2% niet nodig; wel loont het om de plattegrond en drie extra foto's toe te voegen, dat scheelt bij vergelijkbare advertenties gemiddeld negen dagen.",
            "The asking rent sits " + (gek.wws ? "within" : "above") + " the band for comparable units in " + gek.plaats + ". At this time on market (" + gek.dagen + " days) a 2% reduction is not needed; adding the floor plan and three extra photos does help, worth about nine days on comparable listings.")) +
        '</div></div>') + '</div>';
    }
    return '<div class="ek-mt">' + U.panel(T("Beschikbare units", "Available units"),
      U.table([
        { label: T("Unit", "Unit") }, { label: T("Type", "Type") }, { label: T("Vraaghuur", "Asking rent") },
        { label: T("Vrij per", "Available") }, { label: T("Publicatie", "Listing") }, { label: T("Status", "Status") },
        { label: T("Kandidaten", "Candidates"), num: true }
      ], rijen),
      U.btns([{ label: T("Nieuwe advertentie", "New listing"), primary: true }, { label: T("Bulk publiceren", "Bulk publish") }, { label: T("Exporteren", "Export") }])
    ) + '</div>' + detail;
  }

  function kandidatenTab(K, E) {
    var unitNaam = {};
    E.forEach(function (e) { unitNaam[e.id] = e.unit + " · " + e.plaats; });
    var rijen = K.map(function (k) {
      var s = acties[k.id] != null ? acties[k.id] : k.fase;
      var chipje = s === -1 ? U.chip(T("Afgewezen", "Rejected"), "bad")
        : s === -2 ? U.chip(T("Wachtlijst", "Waiting list"), "warn")
        : s >= 5 ? U.chip(T("Getekend", "Signed"), "ok") : U.chip(faseNaam(s), "info");
      return {
        attr: 'data-ek-lease-open="' + k.id + '"', on: open === k.id,
        cells: [
          '<strong>' + U.esc(k.naam) + '</strong><br><span class="ek-sub">' + T("via ", "via ") + U.esc(k.bron) + '</span>',
          U.esc(unitNaam[k.unit] || k.unit),
          k.inkomen ? U.EUR(k.inkomen) + '<br><span class="ek-sub">' + T("bruto per jaar", "gross per year") + '</span>' : T("Zakelijk", "Business"),
          '<div class="ek-bar' + (k.score >= 80 ? " ek-bar-ok" : (k.score < 65 ? " ek-bar-red" : "")) + '"><span style="width:' + k.score + '%"></span></div><span class="ek-sub">' + k.score + '/100</span>',
          U.esc(k.stukken),
          chipje
        ]
      };
    });
    var gek = K.filter(function (k) { return k.id === open; })[0];
    var detail = "";
    if (gek) {
      var s = acties[gek.id] != null ? acties[gek.id] : gek.fase;
      detail = '<div class="ek-mt">' + U.panel(gek.naam + " · " + (unitNaam[gek.unit] || ""),
        '<div class="ek-panel-body">' +
        U.flow(FASEN.map(function (f) { return T(f.nl, f.en); }), Math.max(0, s)) +
        '<p class="ek-mt-s ek-p">' + U.esc(gek.opmerking) + '</p>' +
        '<div class="ek-mt-s">' + U.btns([
          { label: T("Stukken opvragen", "Request documents") },
          { label: T("Bezichtiging plannen", "Schedule viewing") },
          { label: T("Volgende stap", "Advance stage"), primary: true, attr: 'data-ek-lease-act="stap:' + gek.id + '"' },
          { label: T("Contract genereren", "Generate lease") },
          { label: T("Ter ondertekening", "Send for signature") },
          { label: T("Wachtlijst", "Waiting list"), attr: 'data-ek-lease-act="wacht:' + gek.id + '"' },
          { label: T("Afwijzen", "Reject"), danger: true, attr: 'data-ek-lease-act="afwijs:' + gek.id + '"' }
        ]) + '</div>' +
        (s === -1 ? '<p class="ek-mt-s ek-note">' + T("Afwijzing vastgelegd met reden en datum; de kandidaat krijgt automatisch bericht en het dossier blijft twaalf maanden bewaard.",
          "Rejection recorded with reason and date; the candidate is notified automatically and the file is kept for twelve months.") + '</p>' : "") +
        '</div>') + '</div>';
    }
    return '<div class="ek-mt">' + U.panel(T("Kandidaten", "Candidates"),
      U.table([
        { label: T("Kandidaat", "Candidate") }, { label: T("Unit", "Unit") }, { label: T("Inkomen", "Income") },
        { label: T("Score", "Score") }, { label: T("Stukken", "Documents") }, { label: T("Fase", "Stage") }
      ], rijen),
      U.btns([{ label: T("Nieuwe kandidaat", "New candidate"), primary: true }, { label: T("Wachtlijst tonen", "Show waiting list") }])
    ) + '</div>' + detail +
    U.note(T("De score weegt inkomen tegen huur, volledigheid van de stukken en de gewenste ingangsdatum. Hij is een hulpmiddel voor de volgorde van bellen, geen automatisch besluit: toewijzen gebeurt altijd door een mens.",
             "The score weighs income against rent, completeness of the file and the requested start date. It is a guide for who to call first, not an automated decision: allocation is always made by a person."));
  }

  function mutatiesTab() {
    var rijen = mutaties().map(function (m) {
      return [U.esc(m.soort), U.esc(m.unit), U.DATE(m.datum), U.esc(m.wie), U.chip(m.staat, "info")];
    });
    return '<div class="ek-mt ek-g ek-split-wide">' +
      U.panel(T("Geplande mutaties", "Scheduled moves"),
        U.table([{ label: T("Soort", "Type") }, { label: T("Unit", "Unit") }, { label: T("Datum", "Date") }, { label: T("Partij", "Party") }, { label: T("Status", "Status") }], rijen),
        U.btns([{ label: T("Oplevering plannen", "Schedule move-in"), primary: true }, { label: T("Inspectie starten", "Start inspection") }])) +
      U.panel(T("Checklist oplevering", "Move-in checklist"),
        '<div class="ek-panel-body">' +
        ["Meterstanden vastleggen|Record meter readings", "Sleutels registreren|Register keys", "Opnamestaat met foto's|Condition report with photos",
         "Waarborgsom ontvangen|Deposit received", "Eerste huurtermijn gefactureerd|First rent invoiced", "Incassomachtiging getekend|Direct debit mandate signed",
         "Servicekostenvoorschot ingesteld|Service charge advance set"].map(function (r) {
          var d = r.split("|");
          return '<label class="ek-check"><input type="checkbox" checked disabled> ' + T(d[0], d[1]) + '</label>';
        }).join("") + '</div>') + '</div>';
  }

  function indexatieTab() {
    var I = indexaties();
    var totOud = I.reduce(function (s, r) { return s + r.oud; }, 0);
    var totNieuw = I.reduce(function (s, r) { return s + r.nieuw; }, 0);
    var rijen = I.map(function (r) {
      return [U.esc(r.groep), '<span class="ek-num">' + r.aantal + '</span>', U.esc(r.basis), U.PCT(r.pct),
        U.DATE(r.ingang), '<span class="ek-num">' + U.EUR(r.oud) + '</span>', '<span class="ek-num">' + U.EUR(r.nieuw) + '</span>',
        r.staat === "gereed" ? U.chip(T("Geboekt", "Posted"), "ok") : U.chip(T("Concept", "Draft"), "warn")];
    });
    rijen.push({ total: true, cells: [T("Totaal", "Total"), '<span class="ek-num">95</span>', "", "", "",
      '<span class="ek-num">' + U.EUR(totOud) + '</span>', '<span class="ek-num">' + U.EUR(totNieuw) + '</span>',
      U.chip("+ " + U.EUR(totNieuw - totOud) + T(" per maand", " per month"), "ok")] });
    return '<div class="ek-mt">' + U.panel(T("Indexatiebatch", "Indexation batch"),
      U.table([{ label: T("Groep", "Group") }, { label: T("Contracten", "Leases"), num: true }, { label: T("Grondslag", "Basis") },
        { label: T("Percentage", "Percentage") }, { label: T("Ingangsdatum", "Effective") }, { label: T("Oude huur", "Old rent"), num: true },
        { label: T("Nieuwe huur", "New rent"), num: true }, { label: T("Status", "Status") }], rijen),
      U.btns([{ label: T("Berekenen", "Calculate") }, { label: T("Uitsluiten", "Exclude") }, { label: T("Brieven voorbereiden", "Preview letters") },
        { label: T("Goedkeuren en boeken", "Approve and post"), primary: true }, { label: T("Versturen", "Send") }])) +
      U.note(T("Een indexatie wordt pas geboekt na goedkeuring. Contracten met een plafond of een afwijkende grondslag worden apart getoond en nooit stilzwijgend meegenomen; de brief per huurder gaat mee in dezelfde run.",
               "An indexation is only posted after approval. Leases with a cap or a different basis are shown separately and never silently included; the tenant letter goes out in the same run.")) + '</div>';
  }

  U.mount("ek-leasing-root", API);
})();
