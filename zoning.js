/* Bestemmingsplan per object, inclusief lopende wijzigingsaanvragen.
   Afgeleid van de objectgegevens; puur weergave. Tweetalig (NL/EN). */
(function () {
  var T = function (nl, en) { return (window.__EK_T ? window.__EK_T(nl, en) : nl); };
  var LBL = "text-[9px] font-bold uppercase tracking-[0.13em] text-slate-500";

  function hash(s) {
    var h = 0;
    for (var i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
    return h;
  }

  function bestemming(a) {
    switch (a.kind) {
      case "Residential": return T("Wonen", "Residential");
      case "Logistics": return T("Bedrijventerrein · categorie 3.1", "Business park · category 3.1");
      case "Holiday": return T("Recreatie - verblijfsrecreatie", "Recreation - holiday accommodation");
      case "Mixed": return T("Gemengd - wonen, detailhandel en horeca", "Mixed - housing, retail and hospitality");
      case "Monument": return T("Gemengd - beschermd stadsgezicht", "Mixed - protected townscape");
      default: return T("Centrum - detailhandel en dienstverlening", "Centre - retail and services");
    }
  }

  var AANVRAGEN = {
    "sense-dokkum": {
      status: T("Ingediend", "Submitted"), toon: "lopend",
      wat: T("Verruiming horeca-categorie en geluidszone ten behoeve van het horecaplein",
             "Widening of the hospitality category and noise zone for the hospitality square"),
      zaak: "OMG-2026-04471", ingediend: T("14 mei 2026", "14 May 2026"), besluit: T("uiterlijk 12 sep 2026", "by 12 Sep 2026")
    },
    "brouwerij-dockum": {
      status: T("Ingediend", "Submitted"), toon: "lopend",
      wat: T("Uitbreiding terras en avondopenstelling, gekoppeld aan het plan voor het horecaplein",
             "Terrace extension and evening opening hours, linked to the hospitality-square plan"),
      zaak: "OMG-2026-04472", ingediend: T("14 mei 2026", "14 May 2026"), besluit: T("uiterlijk 12 sep 2026", "by 12 Sep 2026")
    },
    "former-aldi": {
      status: T("Ontwerpbesluit ter inzage", "Draft decision on public display"), toon: "lopend",
      wat: T("Functiewijziging van detailhandel naar wonen, 14 appartementen",
             "Change of use from retail to housing, 14 apartments"),
      zaak: "BPW-2026-01188", ingediend: T("03 feb 2026", "03 Feb 2026"), besluit: T("zienswijzentermijn t/m 30 sep 2026", "consultation period until 30 Sep 2026")
    },
    "rabobank-nes": {
      status: T("In voorbereiding", "In preparation"), toon: "voorbereiding",
      wat: T("Kelder (voormalige kluisruimte) toevoegen als horeca- of opslagfunctie",
             "Adding the basement (former vault) as hospitality or storage use"),
      zaak: "-", ingediend: "-", besluit: T("indiening gepland Q4 2026", "submission planned Q4 2026")
    },
    club33: {
      status: T("Vastgesteld", "Adopted"), toon: "gereed",
      wat: T("Herbouwvergunning na brand, met behoud van de bestaande horecabestemming",
             "Rebuild permit after the fire, retaining the existing hospitality use"),
      zaak: "OMG-2025-09934", ingediend: T("22 sep 2025", "22 Sep 2025"), besluit: T("verleend 11 mrt 2026", "granted 11 Mar 2026")
    },
    "noarderstek": {
      status: T("Onherroepelijk", "Irrevocable"), toon: "gereed",
      wat: T("Herontwikkeling tuincentrumlocatie naar woningbouw", "Redevelopment of the garden-centre site into housing"),
      zaak: "BPW-2024-00712", ingediend: T("18 jun 2024", "18 Jun 2024"), besluit: T("onherroepelijk 09 jan 2026", "irrevocable 09 Jan 2026")
    },
    "fonteinkerk": {
      status: T("Ingediend", "Submitted"), toon: "lopend",
      wat: T("Kerkgebouw omzetten naar maatschappelijke functie met horeca-ondersteuning",
             "Converting the church into a community function with supporting hospitality"),
      zaak: "OMG-2026-02203", ingediend: T("07 apr 2026", "07 Apr 2026"), besluit: T("uiterlijk 05 aug 2026", "by 05 Aug 2026")
    },
    "achmeatoren-iqon": {
      status: T("In voorbereiding", "In preparation"), toon: "voorbereiding",
      wat: T("Toevoegen woonfunctie op de bovenste zes verdiepingen", "Adding a residential function on the top six floors"),
      zaak: "-", ingediend: "-", besluit: T("vooroverleg met de gemeente loopt", "pre-consultation with the municipality under way")
    }
  };

  function plannaam(a) {
    var steden = {
      Dokkum: T("Bestemmingsplan Binnenstad Dokkum 2019", "Zoning plan Dokkum Town Centre 2019"),
      Leeuwarden: T("Bestemmingsplan Leeuwarden – Centrum 2021", "Zoning plan Leeuwarden – Centre 2021"),
      Groningen: T("Bestemmingsplan Binnenstad Groningen 2020", "Zoning plan Groningen City Centre 2020"),
      Amsterdam: T("Bestemmingsplan Amsterdam – Stadsdeel 2022", "Zoning plan Amsterdam – District 2022"),
      Rotterdam: T("Bestemmingsplan Rotterdam Centrum 2021", "Zoning plan Rotterdam Centre 2021"),
      Ameland: T("Bestemmingsplan Ameland Kernen 2018", "Zoning plan Ameland Villages 2018"),
      Harlingen: T("Bestemmingsplan Harlingen Binnenstad 2017", "Zoning plan Harlingen Town Centre 2017")
    };
    return steden[a.city] || T("Bestemmingsplan " + a.city + " 2020", "Zoning plan " + a.city + " 2020");
  }

  function cel(l, v) {
    return '<div class="border border-slate-200 p-3"><p class="' + LBL + '">' + l +
           '</p><p class="mt-2 text-[14px] font-semibold text-[#13263a]">' + v + '</p></div>';
  }

  function bouw(a) {
    var h = hash(a.id);
    var aanvraag = AANVRAGEN[a.id];
    var kleur = !aanvraag ? "border-slate-300 bg-white text-slate-600"
      : aanvraag.toon === "gereed" ? "border-[#bfddd4] bg-[#edf8f4] text-[#0f625b]"
      : aanvraag.toon === "lopend" ? "border-[#e6dfc9] bg-[#fbf7ea] text-[#8a6d1f]"
      : "border-slate-300 bg-slate-50 text-slate-600";
    var status = aanvraag ? aanvraag.status : T("Geen aanvraag lopend", "No application pending");

    var out = '<div class="border border-[#d9ddd6] bg-white p-5">' +
      '<div class="flex flex-wrap items-start justify-between gap-3">' +
        '<div><p class="' + LBL + '">' + T("Planologie · bestemmingsplan", "Planning · zoning plan") + '</p>' +
        '<h3 class="mt-1 text-[19px] font-semibold tracking-[-0.03em] text-[#13263a]">' + plannaam(a) + '</h3></div>' +
        '<span class="border ' + kleur + ' px-3 py-2 text-[10px] font-bold uppercase tracking-[0.12em]">' + status + '</span>' +
      '</div>' +
      '<div class="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">' +
        cel(T("Huidige bestemming", "Current use class"), bestemming(a)) +
        cel(T("Bouwvlak benut", "Building envelope used"), (62 + h % 34) + "%") +
        cel(T("Max. bouwhoogte", "Max. building height"), (a.kind === "Logistics" ? 12 : 9 + h % 8) + " m") +
        cel(T("Laatst geactualiseerd", "Last updated"), (2016 + h % 9) + "") +
      '</div>';

    if (aanvraag) {
      out += '<div class="mt-4 border border-slate-200 bg-slate-50 p-4">' +
        '<p class="' + LBL + '">' + T("Lopende wijzigingsaanvraag", "Pending change application") + '</p>' +
        '<p class="mt-2 max-w-3xl text-[12px] leading-5 text-[#010b22]/70">' + aanvraag.wat + '</p>' +
        '<dl class="mt-3 text-[12px]">' +
        [[T("Status", "Status"), aanvraag.status],
         [T("Zaaknummer", "Case number"), aanvraag.zaak],
         [T("Ingediend", "Submitted"), aanvraag.ingediend],
         [T("Besluit", "Decision"), aanvraag.besluit]].map(function (r) {
          return '<div class="flex justify-between gap-5 border-b border-slate-200 py-2 last:border-0">' +
            '<dt class="text-slate-500">' + r[0] + '</dt>' +
            '<dd class="text-right font-semibold text-[#13263a]">' + r[1] + '</dd></div>'; }).join("") +
        '</dl></div>';
    } else {
      out += '<p class="mt-4 text-[12px] leading-5 text-[#010b22]/65">' +
        T("Het huidige gebruik past binnen het geldende bestemmingsplan; er loopt geen wijzigingsaanvraag.",
          "Current use fits within the zoning plan in force; no change application is pending.") + '</p>';
    }
    return out + '</div>';
  }

  function huidigId() {
    var m = (window.__EK_PATH?window.__EK_PATH():location.pathname).match(/^\/properties\/([^/?#]+)/);
    return m ? decodeURIComponent(m[1]) : null;
  }
  function plaats() {
    var id = huidigId();
    var A = window.__EK_ASSETS__ || [];
    var asset = id && A.find(function (x) { return x.id === id; });
    var taal = window.__EK_LANG ? window.__EK_LANG() : "nl";
    var bestaand = document.getElementById("ek-zoning");
    if (!asset) { if (bestaand) bestaand.remove(); return; }
    if (bestaand && bestaand.dataset.assetId === id && bestaand.dataset.taal === taal) return;
    if (bestaand) bestaand.remove();
    var anker = [].slice.call(document.querySelectorAll("section")).find(function (s) {
      return /grid gap-5 xl:grid-cols-\[minmax/.test(s.className);
    });
    if (!anker || !anker.parentNode) return;
    var sec = document.createElement("section");
    sec.id = "ek-zoning";
    sec.dataset.assetId = id;
    sec.dataset.taal = taal;
    sec.className = "mt-5";
    sec.innerHTML = bouw(asset);
    anker.parentNode.insertBefore(sec, anker);
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
