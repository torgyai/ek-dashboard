/* Inspecties & sleutels: opnames met checklist, bevindingen, foto's en score,
   plus het sleutelregister met uitgifte, inname en vermissing. */
(function () {
  var U = window.EKUI, T = U.T;
  var tab = "inspecties", open = "i1", bevinding = {};

  var SOORTEN = {
    oplevering: ["Oplevering aan huurder", "Move-in"], eindopname: ["Eindopname bij vertrek", "Move-out"],
    periodiek: ["Periodieke schouw", "Periodic survey"], wettelijk: ["Wettelijke keuring", "Statutory inspection"],
    conditie: ["Conditiemeting", "Condition survey"]
  };

  function inspecties() {
    return [
      { id: "i1", nr: "IN 2026-0142", soort: "oplevering", object: "Dockumer Sluys 12", plaats: "Dokkum", datum: "2026-08-28",
        door: T("Beheer Dokkum", "Property management Dokkum"), aanwezig: T("Huurder aanwezig", "Tenant present"),
        score: 4.6, staat: "concept", foto: 14,
        punten: [
          { p: T("Meterstanden opgenomen", "Meter readings taken"), ok: true, note: T("Elektra 21.480 kWh, water 184 m³", "Electricity 21,480 kWh, water 184 m³") },
          { p: T("Sleutels overgedragen", "Keys handed over"), ok: true, note: T("3 stuks, geregistreerd", "3 keys, registered") },
          { p: T("Wanden en plafonds", "Walls and ceilings"), ok: true, note: T("Nieuw gesausd", "Freshly painted") },
          { p: T("Vloerafwerking", "Floor finish"), ok: true, note: T("Zonder gebreken", "No defects") },
          { p: T("Keukenblok en apparatuur", "Kitchen and appliances"), ok: false, note: T("Kraan lekt langs de basis, werkorder aangemaakt", "Tap leaking at the base, work order created") },
          { p: T("Sanitair", "Bathroom"), ok: true, note: T("Zonder gebreken", "No defects") },
          { p: T("Beglazing en kozijnen", "Glazing and frames"), ok: true, note: T("Kierdicht", "Draught-tight") },
          { p: T("Rookmelders getest", "Smoke alarms tested"), ok: true, note: T("Twee stuks, beide werkend", "Two units, both working") },
          { p: T("Ventilatie", "Ventilation"), ok: true, note: T("Standen 1 tot 3 gecontroleerd", "Settings 1 to 3 checked") }
        ] },
      { id: "i2", nr: "IN 2026-0139", soort: "eindopname", object: "Casa Velha 7", plaats: "Leeuwarden", datum: "2026-09-12",
        door: T("Beheer Leeuwarden", "Property management Leeuwarden"), aanwezig: T("Huurder aanwezig", "Tenant present"),
        score: 3.8, staat: "gepland", foto: 0,
        punten: [
          { p: T("Meterstanden opnemen", "Take meter readings"), ok: null, note: "" },
          { p: T("Sleutels innemen", "Collect keys"), ok: null, note: T("4 uitgegeven", "4 issued") },
          { p: T("Wanden en plafonds", "Walls and ceilings"), ok: null, note: T("Let op boorgaten woonkamer", "Watch for drill holes in the living room") },
          { p: T("Vloerafwerking", "Floor finish"), ok: null, note: "" },
          { p: T("Waarborgsom verrekenen", "Settle the deposit"), ok: null, note: T("€ 2.290 in depot", "€ 2,290 held") }
        ] },
      { id: "i3", nr: "IN 2026-0128", soort: "wettelijk", object: "Achmeatoren / IQON", plaats: "Leeuwarden", datum: "2026-10-08",
        door: "Trigion", aanwezig: T("Technisch beheerder", "Technical manager"), score: 0, staat: "gepland", foto: 0,
        punten: [
          { p: T("Brandmeldinstallatie beproeven", "Test the fire alarm system"), ok: null, note: T("Certificaat vervalt 12 oktober", "Certificate expires 12 October") },
          { p: T("Ontruimingsinstallatie", "Evacuation system"), ok: null, note: "" },
          { p: T("Noodverlichting steekproef", "Emergency lighting sample"), ok: null, note: "" },
          { p: T("Blusmiddelen", "Extinguishers"), ok: null, note: "" },
          { p: T("Logboek bijwerken", "Update the log book"), ok: null, note: "" }
        ] },
      { id: "i4", nr: "IN 2026-0117", soort: "periodiek", object: "Grand Café Wald", plaats: "Wâlterswâld", datum: "2026-08-18",
        door: T("Bouwteam EYE", "Bouwteam EYE"), aanwezig: T("Zonder huurder", "Without the tenant"), score: 3.2, staat: "afgerond", foto: 22,
        punten: [
          { p: T("Gevel en voegwerk", "Facade and pointing"), ok: false, note: T("Voegwerk zuidgevel laat los, melding ME 2026-0426", "South facade pointing coming loose, issue ME 2026-0426") },
          { p: T("Dakbedekking", "Roof covering"), ok: true, note: T("Nog vijf jaar te gaan", "Five years of life left") },
          { p: T("Terras en bestrating", "Terrace and paving"), ok: false, note: T("Verzakking bij de zijingang", "Subsidence at the side entrance") },
          { p: T("Installaties", "Building services"), ok: true, note: T("Cv gekeurd in juli", "Boiler inspected in July") },
          { p: T("Brandveiligheid", "Fire safety"), ok: true, note: T("Vluchtwegen vrij", "Escape routes clear") }
        ] },
      { id: "i5", nr: "IN 2026-0104", soort: "conditie", object: T("Portefeuille Dokkum, 41 objecten", "Dokkum portfolio, 41 properties"), plaats: "Dokkum", datum: "2026-06-02",
        door: T("Extern bureau, NEN 2767", "External firm, NEN 2767"), aanwezig: T("Steekproef 12 objecten", "Sample of 12 properties"), score: 2.4, staat: "afgerond", foto: 186,
        punten: [
          { p: T("Conditiescore gemiddeld", "Average condition score"), ok: true, note: T("2,4 op de schaal van 1 tot 6", "2.4 on a scale of 1 to 6") },
          { p: T("Zes objecten score 3 of hoger", "Six properties scoring 3 or higher"), ok: false, note: T("Doorgezet naar het meerjarenplan", "Passed to the long-term plan") },
          { p: T("Meerjarenplan bijgewerkt", "Long-term plan updated"), ok: true, note: T("Schilderwerk naar voren gehaald", "Painting brought forward") }
        ] }
    ];
  }

  var SLEUTELS = [
    { nr: "SL-DS12-01", object: "Dockumer Sluys 12", soort: T("Voordeur en berging", "Front door and store"), houder: "H. van der Meer", uit: "2026-08-28", retour: null, staat: "uit" },
    { nr: "SL-DS12-02", object: "Dockumer Sluys 12", soort: T("Voordeur", "Front door"), houder: "H. van der Meer", uit: "2026-08-28", retour: null, staat: "uit" },
    { nr: "SL-DS12-03", object: "Dockumer Sluys 12", soort: T("Reserve, beheer", "Spare, management"), houder: T("Sleutelkast kantoor", "Key cabinet, office"), uit: null, retour: null, staat: "kast" },
    { nr: "SL-IQ5-11", object: "Achmeatoren 5.03", soort: T("Verdiepingssleutel", "Floor key"), houder: "Van Wieren Bedrijfsmakelaars", uit: "2026-08-14", retour: null, staat: "uit" },
    { nr: "SL-IQ-CV", object: "Achmeatoren, technische ruimte", soort: T("Technische ruimte", "Plant room"), houder: "Synergy Installatietechniek", uit: "2024-01-08", retour: null, staat: "uit" },
    { nr: "SL-CV07-02", object: "Casa Velha 7", soort: T("Voordeur", "Front door"), houder: "R. Postma", uit: "2021-04-01", retour: null, staat: "vermist" },
    { nr: "SL-WA-01", object: "Grand Café Wald", soort: T("Achteringang", "Rear entrance"), houder: T("Sleutelkluis ter plaatse", "Key safe on site"), uit: null, retour: null, staat: "kluis" }
  ];

  function soortNaam(s) { var x = SOORTEN[s]; return T(x[0], x[1]); }

  var API = {
    stamp: function () { return tab + "|" + open + "|" + JSON.stringify(bevinding); },
    click: function (e) {
      var t = U.hit(e, "data-ek-ins-tab"); if (t) { tab = t; return true; }
      var o = U.hit(e, "data-ek-ins-open"); if (o) { open = o; return true; }
      var b = U.hit(e, "data-ek-ins-vink");
      if (b) { bevinding[b] = bevinding[b] === 1 ? 0 : 1; return true; }
      return false;
    },
    html: function () {
      var I = inspecties();
      var gek = I.filter(function (x) { return x.id === open; })[0] || I[0];
      var gepland = I.filter(function (x) { return x.staat === "gepland"; }).length;
      var uit = SLEUTELS.filter(function (s) { return s.staat === "uit"; }).length;
      var vermist = SLEUTELS.filter(function (s) { return s.staat === "vermist"; }).length;

      return U.head({
        eyebrow: T("Exploitatie · opnames", "Operations · inspections"),
        title: T("Inspecties & sleutels", "Inspections & keys"),
        intro: T("Een opname is het moment waarop je vastlegt hoe iets erbij staat, met foto's en een handtekening eronder. Bij een vertrekkende huurder is dat het verschil tussen een gesprek over de waarborgsom en een discussie erover. Sleutels horen bij hetzelfde dossier: wie heeft wat, sinds wanneer, en wat is er kwijt.",
                 "An inspection is the moment you record how something stands, with photos and a signature underneath. With a departing tenant that is the difference between a conversation about the deposit and an argument about it. Keys belong to the same file: who holds what, since when, and what has gone missing."),
        chip: T(gepland + " gepland · " + vermist + " sleutel vermist", gepland + " scheduled · " + vermist + " key missing")
      }) +
      U.kpis([
        [T("Inspecties dit jaar", "Inspections this year"), "142", T("opnames, schouwen en keuringen", "move-ins, surveys and statutory checks")],
        [T("Gepland", "Scheduled"), String(gepland), T("waarvan één wettelijke keuring", "one of them a statutory inspection")],
        [T("Foto's vastgelegd", "Photos recorded"), "1.284", T("gemiddeld 9 per opname", "9 per inspection on average")],
        [T("Sleutels uitgegeven", "Keys issued"), String(uit), T("van " + SLEUTELS.length + " geregistreerd", "of " + SLEUTELS.length + " registered")],
        [T("Vermist", "Missing"), String(vermist), T("cilinder vervangen op kosten huurder", "cylinder replaced at the tenant's expense")]
      ], 5) +
      '<div class="ek-mt">' + U.tabs([
        { id: "inspecties", label: T("Inspecties", "Inspections"), count: I.length },
        { id: "sleutels", label: T("Sleutelregister", "Key register"), count: SLEUTELS.length }
      ], tab, "data-ek-ins-tab") + '</div>' +
      (tab === "sleutels" ? sleutelTab() : inspectieTab(I, gek));
    }
  };

  function inspectieTab(I, gek) {
    var rijen = I.map(function (i) {
      return {
        attr: 'data-ek-ins-open="' + i.id + '"', on: gek.id === i.id,
        cells: ['<strong>' + U.esc(i.nr) + '</strong><br><span class="ek-sub">' + U.esc(i.door) + '</span>',
          U.chip(soortNaam(i.soort), i.soort === "wettelijk" ? "info" : ""),
          U.esc(i.object) + '<br><span class="ek-sub">' + U.esc(i.plaats) + '</span>',
          U.DATE(i.datum), U.esc(i.aanwezig),
          '<span class="ek-num">' + (i.foto || "-") + '</span>',
          i.score ? '<span class="ek-num">' + U.NUM(i.score, 1) + '</span>' : '<span class="ek-dim">-</span>',
          i.staat === "afgerond" ? U.chip(T("Afgerond", "Complete"), "ok") : i.staat === "concept" ? U.chip(T("Concept", "Draft"), "warn") : U.chip(T("Gepland", "Scheduled"), "")]
      };
    });
    var punten = gek.punten.map(function (p, idx) {
      var sleutel = gek.id + "-" + idx;
      var ok = bevinding[sleutel] != null ? !!bevinding[sleutel] : p.ok;
      return [
        '<label class="ek-check" style="padding:0"><input type="checkbox" ' + (ok ? "checked" : "") + ' data-ek-ins-vink="' + sleutel + '"> ' + U.esc(p.p) + '</label>',
        p.note ? U.esc(p.note) : '<span class="ek-dim">' + T("geen bijzonderheden", "nothing to note") + '</span>',
        ok === true ? U.chip(T("Akkoord", "In order"), "ok") : ok === false ? U.chip(T("Bevinding", "Finding"), "bad") : U.chip(T("Nog te doen", "To do"), "")
      ];
    });
    return '<div class="ek-mt">' + U.panel(T("Inspecties", "Inspections"),
      U.table([{ label: T("Nummer", "Number") }, { label: T("Soort", "Type") }, { label: T("Object", "Property") },
        { label: T("Datum", "Date") }, { label: T("Aanwezig", "Present") }, { label: T("Foto's", "Photos"), num: true },
        { label: T("Score", "Score"), num: true }, { label: T("Status", "Status") }], rijen),
      U.btns([{ label: T("Inspectie plannen", "Schedule an inspection"), primary: true }, { label: T("Sjabloon kiezen", "Choose a template") },
        { label: T("Exporteren", "Export") }])) +
      '<div class="ek-mt ek-g ek-split">' +
      U.panel(gek.nr + " · " + gek.object, '<div class="ek-panel-body">' +
        U.table([{ label: T("Punt", "Item") }, { label: T("Bevinding", "Note") }, { label: T("Uitkomst", "Outcome") }], punten) +
        '<div class="ek-mt-s">' + U.btns([
          { label: T("Starten", "Start") }, { label: T("Bevinding toevoegen", "Add a finding") },
          { label: T("Foto toevoegen", "Add a photo") }, { label: T("Melding maken", "Create an issue") },
          { label: T("Laten tekenen", "Get it signed"), primary: true }, { label: T("Afronden", "Complete") },
          { label: T("Rapport (PDF)", "Report (PDF)") }
        ]) + '</div></div>') +
      U.panel(T("Wat er met een bevinding gebeurt", "What happens to a finding"), '<div class="ek-panel-body">' +
        U.kv([
          [T("Bevinding", "Finding"), T("wordt een melding met object, unit en foto", "becomes an issue with property, unit and photo")],
          [T("Bij oplevering", "At move-in"), T("gebrek voor rekening van de eigenaar", "defect at the owner's expense")],
          [T("Bij eindopname", "At move-out"), T("schade tegen de waarborgsom, met de opnamestaat van toen ernaast", "damage against the deposit, alongside the move-in report")],
          [T("Bij schouw", "At a survey"), T("naar het meerjarenplan als het geen storing is", "to the long-term plan if it is not a fault")],
          [T("Handtekening", "Signature"), T("beide partijen tekenen digitaal, met tijdstempel", "both parties sign digitally, with a timestamp")],
          [T("Bewaartermijn", "Retention"), T("vijf jaar na vertrek van de huurder", "five years after the tenant leaves")]
        ]) +
        '<p class="ek-mt-s ek-note">' + T("De opnamestaat bij binnenkomst is het enige bewijs dat telt bij vertrek. Zonder foto's van toen is elke discussie over de waarborgsom een kwestie van wie het hardst volhoudt.",
          "The move-in report is the only evidence that counts at move-out. Without photos from back then, every argument about the deposit comes down to who insists hardest.") + '</p></div>') +
      '</div></div>';
  }

  function sleutelTab() {
    var rijen = SLEUTELS.map(function (s) {
      return [U.esc(s.nr), U.esc(s.object), U.esc(s.soort), U.esc(s.houder),
        s.uit ? U.DATE(s.uit) : '<span class="ek-dim">-</span>',
        s.staat === "uit" ? U.chip(T("Uitgegeven", "Issued"), "info") : s.staat === "vermist" ? U.chip(T("Vermist", "Missing"), "bad")
          : s.staat === "kluis" ? U.chip(T("Sleutelkluis", "Key safe"), "") : U.chip(T("In de kast", "In the cabinet"), "ok"),
        U.btns(s.staat === "uit"
          ? [{ label: T("Innemen", "Collect"), primary: true }, { label: T("Vermist melden", "Report missing"), danger: true }]
          : s.staat === "vermist" ? [{ label: T("Cilinder vervangen", "Replace cylinder"), primary: true }]
          : [{ label: T("Uitgeven", "Issue"), primary: true }])];
    });
    return '<div class="ek-mt">' + U.panel(T("Sleutelregister", "Key register"),
      U.table([{ label: T("Nummer", "Number") }, { label: T("Object", "Property") }, { label: T("Soort", "Type") },
        { label: T("Houder", "Holder") }, { label: T("Uitgegeven", "Issued") }, { label: T("Status", "Status") }, { label: T("Actie", "Action") }], rijen),
      U.btns([{ label: T("Sleutel toevoegen", "Add a key"), primary: true }, { label: T("Uitgeven", "Issue") },
        { label: T("Innemen", "Collect") }, { label: T("Exporteren", "Export") }])) +
      U.ai(T("Waarom dit register bestaat", "Why this register exists"),
        T("Eén sleutel staat sinds 2021 op naam van een vertrokken huurder. Dat is geen administratieve slordigheid maar een risico: bij een inbraak zonder braaksporen kijkt de verzekeraar precies hiernaar. De cilinder vervangen kost 180 euro en dat bedrag is bij vertrek verrekenbaar met de waarborgsom, mits de vermissing toen is vastgelegd.",
          "One key has been in the name of a departed tenant since 2021. That is not administrative sloppiness but a risk: after a break-in without forced entry, this is exactly what the insurer looks at. Replacing the cylinder costs 180 euro, and that amount can be offset against the deposit at move-out, provided the loss was recorded at the time.")) + '</div>';
  }

  U.mount("ek-inspections-root", API);
})();
