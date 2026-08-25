/* Servicekosten als eigen domein: kostenafspraak, budget, verdeelsleutels,
   voorschotten, werkelijke kosten, afrekenrun per huurder en geschillen. */
(function () {
  var U = window.EKUI, T = U.T;
  var tab = "budget", complex = "iqon", stap = 2, geopend = null;

  var COMPLEXEN = [
    { id: "iqon", naam: "Achmeatoren / IQON", plaats: "Leeuwarden", units: 34, m2: 9840, jaar: 2025 },
    { id: "sluys", naam: "Dockumer Sluys appartementen", plaats: "Dokkum", units: 24, m2: 1740, jaar: 2025 },
    { id: "casa", naam: "Casa Velha appartementen", plaats: "Leeuwarden", units: 12, m2: 810, jaar: 2025 }
  ];

  function posten(id) {
    var basis = {
      iqon: [
        { post: T("Elektra algemene ruimten", "Electricity, common areas"), sleutel: "m2", budget: 78400, werkelijk: 84120, lev: "Vattenfall Zakelijk" },
        { post: T("Verwarming en warm water", "Heating and hot water"), sleutel: "meter", budget: 96500, werkelijk: 91240, lev: "Synergy Installatietechniek" },
        { post: T("Schoonmaak", "Cleaning"), sleutel: "m2", budget: 62000, werkelijk: 64880, lev: "Hellema Schoonmaak" },
        { post: T("Liftonderhoud", "Lift maintenance"), sleutel: "unit", budget: 21400, werkelijk: 21400, lev: "Kone" },
        { post: T("Glasbewassing", "Window cleaning"), sleutel: "m2", budget: 18600, werkelijk: 17950, lev: "Hellema Schoonmaak" },
        { post: T("Beveiliging en toegang", "Security and access"), sleutel: "unit", budget: 34800, werkelijk: 36240, lev: "Trigion" },
        { post: T("Groenvoorziening en terrein", "Grounds and landscaping"), sleutel: "m2", budget: 12900, werkelijk: 12440, lev: "Hoveniersbedrijf De Jong" },
        { post: T("Beheervergoeding", "Management fee"), sleutel: "vast", budget: 41800, werkelijk: 41800, lev: "EYE Vastgoed B.V." }
      ],
      sluys: [
        { post: T("Elektra algemene ruimten", "Electricity, common areas"), sleutel: "m2", budget: 9400, werkelijk: 8890, lev: "Vattenfall Zakelijk" },
        { post: T("Schoonmaak trappenhuis", "Cleaning, stairwells"), sleutel: "unit", budget: 12600, werkelijk: 13180, lev: "Hellema Schoonmaak" },
        { post: T("Liftonderhoud", "Lift maintenance"), sleutel: "unit", budget: 8200, werkelijk: 8200, lev: "Kone" },
        { post: T("Tuinonderhoud binnenhof", "Courtyard maintenance"), sleutel: "m2", budget: 4100, werkelijk: 3860, lev: "Hoveniersbedrijf De Jong" },
        { post: T("Beheervergoeding", "Management fee"), sleutel: "vast", budget: 7200, werkelijk: 7200, lev: "EYE Vastgoed B.V." }
      ],
      casa: [
        { post: T("Elektra algemene ruimten", "Electricity, common areas"), sleutel: "m2", budget: 4600, werkelijk: 4980, lev: "Vattenfall Zakelijk" },
        { post: T("Schoonmaak", "Cleaning"), sleutel: "unit", budget: 6800, werkelijk: 6620, lev: "Hellema Schoonmaak" },
        { post: T("Onderhoud installaties", "Building services maintenance"), sleutel: "unit", budget: 5400, werkelijk: 7310, lev: "Synergy Installatietechniek" },
        { post: T("Beheervergoeding", "Management fee"), sleutel: "vast", budget: 3600, werkelijk: 3600, lev: "EYE Vastgoed B.V." }
      ]
    };
    return basis[id];
  }

  function sleutelNaam(s) {
    return { m2: T("Per m²", "Per m²"), unit: T("Per unit", "Per unit"), meter: T("Meterstand", "Metered"), vast: T("Vast percentage", "Fixed share") }[s];
  }

  function huurders(id) {
    var lijst = {
      iqon: [
        { naam: "Nationale-Nederlanden", deel: 46.2, voorschot: 160000, periode: T("heel jaar", "full year") },
        { naam: "Kadaster", deel: 18.4, voorschot: 63600, periode: T("heel jaar", "full year") },
        { naam: T("Advocatenkantoor Terpstra", "Terpstra Advocaten"), deel: 9.1, voorschot: 31400, periode: T("heel jaar", "full year") },
        { naam: T("Stichting Zorggroep Noard", "Stichting Zorggroep Noard"), deel: 7.8, voorschot: 18800, periode: T("vanaf 1 mei", "from 1 May") },
        { naam: T("Overige huurders (6)", "Other tenants (6)"), deel: 12.1, voorschot: 41800, periode: T("heel jaar", "full year") },
        { naam: T("Leegstand, voor rekening eigenaar", "Vacancy, at owner's expense"), deel: 6.4, voorschot: 0, periode: T("gemiddeld 7 maanden", "7 months average"), leeg: true }
      ],
      sluys: [
        { naam: T("Huurders begane grond (6)", "Ground floor tenants (6)"), deel: 24.8, voorschot: 9900, periode: T("heel jaar", "full year") },
        { naam: T("Huurders eerste verdieping (9)", "First floor tenants (9)"), deel: 37.6, voorschot: 15000, periode: T("heel jaar", "full year") },
        { naam: T("Huurders tweede verdieping (8)", "Second floor tenants (8)"), deel: 33.2, voorschot: 13300, periode: T("heel jaar", "full year") },
        { naam: T("Leegstand, voor rekening eigenaar", "Vacancy, at owner's expense"), deel: 4.4, voorschot: 0, periode: T("2 units", "2 units"), leeg: true }
      ],
      casa: [
        { naam: T("Huurders (11)", "Tenants (11)"), deel: 91.7, voorschot: 20100, periode: T("heel jaar", "full year") },
        { naam: T("Leegstand, voor rekening eigenaar", "Vacancy, at owner's expense"), deel: 8.3, voorschot: 0, periode: T("1 unit", "1 unit"), leeg: true }
      ]
    };
    return lijst[id];
  }

  var GESCHILLEN = [
    { huurder: T("Advocatenkantoor Terpstra", "Terpstra Advocaten"), object: "Achmeatoren / IQON", jaar: 2024, bedrag: 4180,
      punt: T("Betwist het aandeel in de beveiligingskosten omdat de receptie na 18:00 uur niet bemand is.",
              "Disputes the share of security costs because reception is unstaffed after 18:00."), staat: "open" },
    { huurder: "Kadaster", object: "Achmeatoren / IQON", jaar: 2024, bedrag: 1240,
      punt: T("Vraagt onderbouwing van de stijging van de schoonmaakkosten met 12%.",
              "Asks for substantiation of the 12% rise in cleaning costs."), staat: "beantwoord" },
    { huurder: T("Huurder Sluys 7", "Tenant Sluys 7"), object: "Dockumer Sluys", jaar: 2025, bedrag: 310,
      punt: T("Vindt de liftkosten niet toerekenbaar aan de begane grond.",
              "Argues lift costs are not attributable to the ground floor."), staat: "afgehandeld" }
  ];

  var API = {
    stamp: function () { return tab + "|" + complex + "|" + stap + "|" + geopend; },
    click: function (e) {
      var t = U.hit(e, "data-ek-sk-tab"); if (t) { tab = t; return true; }
      var c = U.hit(e, "data-ek-sk-complex"); if (c) { complex = c; return true; }
      var s = U.hit(e, "data-ek-sk-stap"); if (s) { stap = Math.min(5, +s); return true; }
      var g = U.hit(e, "data-ek-sk-open"); if (g) { geopend = geopend === g ? null : g; return true; }
      return false;
    },
    html: function () {
      var C = COMPLEXEN.filter(function (c) { return c.id === complex; })[0];
      var P = posten(complex), H = huurders(complex);
      var budget = P.reduce(function (s, p) { return s + p.budget; }, 0);
      var werkelijk = P.reduce(function (s, p) { return s + p.werkelijk; }, 0);
      var voorschot = H.reduce(function (s, h) { return s + h.voorschot; }, 0);
      var saldo = voorschot - werkelijk;

      var body;
      if (tab === "budget") body = budgetTab(P, budget, werkelijk);
      else if (tab === "verdeling") body = verdelingTab(H, werkelijk);
      else if (tab === "afrekening") body = afrekeningTab(H, werkelijk, voorschot, saldo, C);
      else body = geschillenTab();

      return U.head({
        eyebrow: T("Exploitatie · servicekosten", "Operations · service charges"),
        title: T("Servicekosten", "Service charges"),
        intro: T("Servicekosten zijn geen gewone kostenpost maar een eigen administratie: een budget per complex, een verdeelsleutel per kostensoort, voorschotten die per huurder en per periode verschillen, en een afrekening die precies moet sluiten. Leegstand komt voor rekening van de eigenaar en wordt nooit stilzwijgend over de huurders verdeeld.",
                 "Service charges are not an ordinary cost line but an administration of their own: a budget per complex, an allocation key per cost type, advances that differ per tenant and per period, and a settlement that has to balance exactly. Vacancy is at the owner's expense and is never quietly spread across the tenants."),
        chip: T("Afrekening " + C.jaar, "Settlement " + C.jaar)
      }) +
      U.kpis([
        [T("Budget " + C.jaar, "Budget " + C.jaar), U.EUR(budget), C.naam],
        [T("Werkelijke kosten", "Actual costs"), U.EUR(werkelijk), T(werkelijk > budget ? "boven budget" : "binnen budget", werkelijk > budget ? "over budget" : "within budget")],
        [T("Ontvangen voorschotten", "Advances received"), U.EUR(voorschot), T("van " + (H.length - 1) + " huurdersgroepen", "from " + (H.length - 1) + " tenant groups")],
        [T("Saldo afrekening", "Settlement balance"), (saldo >= 0 ? "+ " : "- ") + U.EUR(Math.abs(saldo)), T(saldo >= 0 ? "terug naar huurders" : "na te vorderen", saldo >= 0 ? "refund to tenants" : "to be recharged")],
        [T("Verdeeld", "Allocated"), "100,0%", T("controle sluit", "check balances"), 100]
      ], 5) +
      '<div class="ek-mt ek-flow">' + COMPLEXEN.map(function (c) {
        return '<button type="button" class="ek-tab' + (c.id === complex ? " ek-on" : "") + '" data-ek-sk-complex="' + c.id + '">' +
          U.esc(c.naam) + " · " + c.units + " " + T("units", "units") + '</button>';
      }).join("") + '</div>' +
      '<div class="ek-mt">' + U.tabs([
        { id: "budget", label: T("Budget & werkelijke kosten", "Budget & actual costs") },
        { id: "verdeling", label: T("Verdeelsleutels & voorschotten", "Allocation & advances") },
        { id: "afrekening", label: T("Afrekenrun", "Settlement run") },
        { id: "geschillen", label: T("Geschillen", "Disputes"), count: GESCHILLEN.filter(function (g) { return g.staat !== "afgehandeld"; }).length }
      ], tab, "data-ek-sk-tab") + '</div>' + body;
    }
  };

  function budgetTab(P, budget, werkelijk) {
    var rijen = P.map(function (p) {
      var v = p.werkelijk - p.budget;
      return [U.esc(p.post), U.esc(p.lev), U.chip(sleutelNaam(p.sleutel)),
        '<span class="ek-num">' + U.EUR(p.budget) + '</span>',
        '<span class="ek-num">' + U.EUR(p.werkelijk) + '</span>',
        '<span class="ek-num">' + (v === 0 ? "-" : (v > 0 ? "+ " : "- ") + U.EUR(Math.abs(v))) + '</span>',
        v > p.budget * 0.05 ? U.chip(T("Toelichten", "Explain"), "bad") : (v < 0 ? U.chip(T("Onder budget", "Under budget"), "ok") : U.chip(T("Op budget", "On budget"), ""))];
    });
    rijen.push({ total: true, cells: [T("Totaal", "Total"), "", "", '<span class="ek-num">' + U.EUR(budget) + '</span>',
      '<span class="ek-num">' + U.EUR(werkelijk) + '</span>',
      '<span class="ek-num">' + (werkelijk - budget >= 0 ? "+ " : "- ") + U.EUR(Math.abs(werkelijk - budget)) + '</span>', ""] });
    return '<div class="ek-mt">' + U.panel(T("Kostenposten", "Cost items"),
      U.table([{ label: T("Post", "Item") }, { label: T("Leverancier", "Supplier") }, { label: T("Verdeelsleutel", "Allocation key") },
        { label: T("Budget", "Budget"), num: true }, { label: T("Werkelijk", "Actual"), num: true },
        { label: T("Verschil", "Variance"), num: true }, { label: T("Signaal", "Flag") }], rijen),
      U.btns([{ label: T("Budget maken", "Create budget"), primary: true }, { label: T("Vorig jaar kopiëren", "Copy previous year") },
        { label: T("Kosten importeren", "Import costs") }, { label: T("Post toevoegen", "Add item") }])) +
      U.ai(T("Wat opvalt in dit budget", "What stands out in this budget"),
        T("De elektrakosten voor de algemene ruimten liggen 7,3% boven budget terwijl het verbruik gelijk bleef; dat is volledig tariefeffect en hoort in de toelichting bij de afrekening. De post beveiliging stijgt structureel: bij de volgende budgetronde is het eerlijker die op werkelijke uren af te rekenen dan op een vast bedrag per unit.",
          "Electricity for the common areas is 7.3% over budget while consumption stayed flat; that is entirely a tariff effect and belongs in the settlement notes. Security is rising structurally: at the next budget round it is fairer to settle it on actual hours rather than a fixed amount per unit.")) + '</div>';
  }

  function verdelingTab(H, werkelijk) {
    var rijen = H.map(function (h) {
      var deel = Math.round(werkelijk * h.deel / 100);
      return [
        (h.leeg ? '<span class="ek-dim">' + U.esc(h.naam) + '</span>' : '<strong>' + U.esc(h.naam) + '</strong>'),
        U.esc(h.periode),
        '<span class="ek-num">' + U.PCT(h.deel) + '</span>',
        '<div class="ek-bar' + (h.leeg ? " ek-bar-red" : "") + '"><span style="width:' + Math.min(100, h.deel * 2) + '%"></span></div>',
        '<span class="ek-num">' + U.EUR(deel) + '</span>',
        '<span class="ek-num">' + (h.voorschot ? U.EUR(h.voorschot) : "-") + '</span>',
        '<span class="ek-num">' + (h.voorschot ? ((h.voorschot - deel >= 0 ? "+ " : "- ") + U.EUR(Math.abs(h.voorschot - deel))) : U.EUR(-deel)) + '</span>'
      ];
    });
    return '<div class="ek-mt ek-g ek-split">' +
      U.panel(T("Toewijzing per huurder", "Allocation per tenant"),
        U.table([{ label: T("Huurder", "Tenant") }, { label: T("Periode", "Period") }, { label: T("Aandeel", "Share"), num: true },
          { label: "", }, { label: T("Toegerekend", "Allocated"), num: true }, { label: T("Voorschot", "Advance"), num: true },
          { label: T("Saldo", "Balance"), num: true }], rijen),
        U.btns([{ label: T("Verdeelsleutel bepalen", "Define allocation key"), primary: true }, { label: T("Meterstanden inlezen", "Import meter data") },
          { label: T("Periode aanpassen", "Adjust period") }])) +
      U.panel(T("Sleutels in gebruik", "Keys in use"),
        '<div class="ek-panel-body">' + U.kv([
          [T("Per m²", "Per m²"), T("verhuurbaar vloeroppervlak volgens NEN 2580", "lettable floor area per NEN 2580")],
          [T("Per unit", "Per unit"), T("gelijk deel per verhuurbare eenheid", "equal share per lettable unit")],
          [T("Meterstand", "Metered"), T("werkelijk verbruik per tussenmeter", "actual consumption per submeter")],
          [T("Vast percentage", "Fixed share"), T("contractueel vastgelegd deel", "share fixed in the contract")],
          [T("Leegstand", "Vacancy"), T("altijd voor rekening van de eigenaar", "always at the owner's expense")]
        ]) + '<p class="ek-mt-s ek-note">' + T("De som van alle aandelen moet exact 100% zijn voordat een afrekening definitief kan worden. Wijkt het af, dan blokkeert de run en wijst het systeem de post aan die niet sluit.",
          "The shares must total exactly 100% before a settlement can be finalised. If they do not, the run blocks and the system points at the item that fails to balance.") + '</p></div>') + '</div>';
  }

  function afrekeningTab(H, werkelijk, voorschot, saldo, C) {
    var stappen = [T("Kosten verzameld", "Costs collected"), T("Verdeeld", "Allocated"), T("Gecontroleerd", "Validated"),
      T("Goedgekeurd", "Approved"), T("Overzichten", "Statements"), T("Verstuurd", "Sent")];
    var rijen = H.filter(function (h) { return !h.leeg; }).map(function (h) {
      var deel = Math.round(werkelijk * h.deel / 100);
      var v = h.voorschot - deel;
      return [U.esc(h.naam), '<span class="ek-num">' + U.EUR(h.voorschot) + '</span>', '<span class="ek-num">' + U.EUR(deel) + '</span>',
        '<span class="ek-num">' + (v >= 0 ? "+ " : "- ") + U.EUR(Math.abs(v)) + '</span>',
        v >= 0 ? U.chip(T("Terugbetaling", "Refund"), "ok") : U.chip(T("Nafactuur", "Additional invoice"), "warn"),
        U.chip(stap >= 4 ? T("Klaar", "Ready") : T("In bewerking", "In progress"), stap >= 4 ? "ok" : "")];
    });
    var leeg = H.filter(function (h) { return h.leeg; })[0];
    return '<div class="ek-mt">' + U.panel(T("Afrekenrun " + C.jaar, "Settlement run " + C.jaar),
      '<div class="ek-panel-body">' + U.flow(stappen, stap) +
      '<div class="ek-mt-s">' + U.btns([
        { label: T("Afrekening voorbereiden", "Prepare settlement"), attr: 'data-ek-sk-stap="1"' },
        { label: T("Valideren", "Validate"), attr: 'data-ek-sk-stap="2"' },
        { label: T("Goedkeuren", "Approve"), primary: true, attr: 'data-ek-sk-stap="3"' },
        { label: T("Definitief maken", "Finalise"), attr: 'data-ek-sk-stap="4"' },
        { label: T("Overzichten genereren", "Generate statements"), attr: 'data-ek-sk-stap="5"' },
        { label: T("Verschillen boeken", "Post differences") },
        { label: T("Naar huurders", "Send to tenants") }
      ]) + '</div></div>') +
      '<div class="ek-mt">' + U.panel(T("Resultaat per huurder", "Result per tenant"),
        U.table([{ label: T("Huurder", "Tenant") }, { label: T("Voorschot", "Advance"), num: true }, { label: T("Werkelijk aandeel", "Actual share"), num: true },
          { label: T("Verschil", "Difference"), num: true }, { label: T("Gevolg", "Outcome") }, { label: T("Status", "Status") }], rijen)) + '</div>' +
      '<div class="ek-mt ek-g ek-split">' +
      U.panel(T("Controle", "Checks"), '<div class="ek-panel-body">' + [
        [T("Som van de aandelen", "Sum of shares"), "100,0%", true],
        [T("Elke post heeft een bron", "Every item has a source"), T("8 van 8", "8 of 8"), true],
        [T("Voorschotten aangesloten op contract", "Advances reconciled to contracts"), T("sluit", "balances"), true],
        [T("Leegstand niet doorbelast", "Vacancy not recharged"), leeg ? U.EUR(Math.round(werkelijk * leeg.deel / 100)) + T(" voor eigenaar", " to owner") : "-", true],
        [T("Periodes per huurder", "Tenant periods"), T("1 gedeeltelijk jaar", "1 partial year"), true]
      ].map(function (r) {
        return '<div class="ek-flow" style="justify-content:space-between;border-bottom:1px solid #ebece8;padding:8px 0">' +
          '<span class="ek-p">' + r[0] + '</span>' + U.chip(r[1], "ok") + '</div>';
      }).join("") + '</div>') +
      U.ai(T("Toelichting die met de afrekening meegaat", "Note that goes out with the settlement"),
        T("De totale kosten liggen " + U.PCT(Math.abs((werkelijk - voorschot) / voorschot * 100)) + " " + (saldo < 0 ? "boven" : "onder") + " de ontvangen voorschotten. De grootste afwijking zit in elektra en beveiliging; beide zijn tariefstijgingen, geen extra verbruik. Voorstel: het voorschot voor volgend jaar met 6% verhogen, dan blijft de afrekening klein en voorspelbaar.",
          "Total costs are " + U.PCT(Math.abs((werkelijk - voorschot) / voorschot * 100)) + " " + (saldo < 0 ? "above" : "below") + " the advances received. The largest variance is in electricity and security; both are tariff increases, not extra consumption. Suggestion: raise next year's advance by 6% so the settlement stays small and predictable.")) +
      '</div></div>';
  }

  function geschillenTab() {
    var rijen = GESCHILLEN.map(function (g, i) {
      var id = "g" + i;
      return {
        attr: 'data-ek-sk-open="' + id + '"', on: geopend === id,
        cells: [U.esc(g.huurder), U.esc(g.object), String(g.jaar), '<span class="ek-num">' + U.EUR(g.bedrag) + '</span>',
          U.esc(g.punt),
          g.staat === "open" ? U.chip(T("Open", "Open"), "bad") : g.staat === "beantwoord" ? U.chip(T("Beantwoord", "Answered"), "warn") : U.chip(T("Afgehandeld", "Closed"), "ok")]
      };
    });
    return '<div class="ek-mt">' + U.panel(T("Geschillen over de afrekening", "Settlement disputes"),
      U.table([{ label: T("Huurder", "Tenant") }, { label: T("Object", "Property") }, { label: T("Jaar", "Year") },
        { label: T("Bedrag", "Amount"), num: true }, { label: T("Punt", "Point at issue") }, { label: T("Status", "Status") }], rijen),
      U.btns([{ label: T("Geschil openen", "Open dispute"), primary: true }, { label: T("Onderbouwing sturen", "Send substantiation") },
        { label: T("Creditnota maken", "Create credit note") }, { label: T("Afsluiten", "Close") }])) +
      U.note(T("Een geschil bevriest alleen het betwiste bedrag, niet de hele afrekening. De rest blijft opeisbaar en de correspondentie hangt aan hetzelfde huurdersdossier, zodat volgend jaar zichtbaar is wat er is afgesproken.",
               "A dispute freezes only the contested amount, not the whole settlement. The rest stays payable and the correspondence hangs off the same tenant file, so next year it is visible what was agreed.")) + '</div>';
  }

  U.mount("ek-servicecharges-root", API);
})();
