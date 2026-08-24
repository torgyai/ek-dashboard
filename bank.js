/* Werkruimte Bankrekeningen - saldi per bank, uitklapbaar naar de losse rekeningen.
   Vult de container die de route /bank rendert. Tweetalig (NL/EN).
   De saldi zijn fictief en dienen alleen als demonstratie. */
(function () {
  var T = function (nl, en) { return (window.__EK_T ? window.__EK_T(nl, en) : nl); };
  function EUR(n) {
    return new Intl.NumberFormat(window.__EK_LANG && window.__EK_LANG() === "en" ? "en-GB" : "nl-NL",
      { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);
  }
  var LBL = "text-[9px] font-bold uppercase tracking-[0.13em] text-slate-500";
  var CARD = "border border-[#d9ddd6] bg-white";
  var open = { rabobank: true, ing: false, abnamro: false };


  /* De rest van de rekeningen: per bank aangevuld tot het werkelijke aantal.
     Namen en IBAN's zijn fictief maar consistent. */
  function iban(code, i) {
    var n = (i * 7919 + 1234567) % 1000000000;
    var d = String(n).padStart(10, "0");
    return "NL" + String(10 + (i * 13) % 89) + " " + code + " " + d.slice(0, 4) + " " + d.slice(4, 8) + " " + d.slice(8, 10) + String((i * 3) % 10);
  }
  function extra(code, start, aantal, soorten) {
    var uit = [];
    for (var i = 0; i < aantal; i++) {
      var s = soorten[i % soorten.length];
      uit.push({
        naam: s.naam(i), iban: iban(code, start + i), soort: s.soort,
        saldo: s.saldo(i), mutatie: s.mutatie(i), geblokkeerd: !!s.geblokkeerd, prive: !!s.prive
      });
    }
    return uit;
  }
  function dag(i) {
    var d = ["vandaag 08:12", "vandaag 09:44", "gisteren 15:20", "gisteren 11:05", "eergisteren 16:38"];
    var e = ["today 08:12", "today 09:44", "yesterday 15:20", "yesterday 11:05", "two days ago 16:38"];
    return T(d[i % 5], e[i % 5]);
  }
  var STEDEN = ["Dokkum", "Leeuwarden", "Groningen", "Harlingen", "Sneek", "Drachten", "Heerenveen",
                "Bolsward", "Franeker", "Joure", "Lemmer", "Kollum", "Ameland", "Zuidhorn", "Winsum"];

  function banken() {
    return [
      {
        id: "rabobank", naam: "Rabobank", merk: "#f60000", kort: "RABO",
        rol: T("Hoofdbank · zakelijk", "Main bank · business"),
        rekeningen: [
          { naam: T("Betaalrekening EYE Vastgoed B.V.", "Current account EYE Vastgoed B.V."), iban: "NL21 RABO 0142 8877 01", soort: T("Betaalrekening", "Current"), saldo: 486320, mutatie: T("vandaag 08:41", "today 08:41") },
          { naam: T("Betaalrekening EYE Vastgoed Ontwikkeling B.V.", "Current account EYE Vastgoed Ontwikkeling B.V."), iban: "NL44 RABO 0318 9042 55", soort: T("Betaalrekening", "Current"), saldo: 212480, mutatie: T("vandaag 07:55", "today 07:55") },
          { naam: T("Huurincasso · derdengelden", "Rent collection · client funds"), iban: "NL08 RABO 0771 2093 14", soort: T("Derdengelden", "Client funds"), saldo: 138905, mutatie: T("vandaag 06:10", "today 06:10"), geblokkeerd: true },
          { naam: T("Spaarrekening reservefonds", "Savings · reserve fund"), iban: "NL63 RABO 0912 4455 20", soort: T("Spaarrekening", "Savings"), saldo: 1240000, mutatie: T("28 jul 2026", "28 Jul 2026") },
          { naam: T("Bouwdepot Club33 · herbouw na brand", "Construction deposit Club33 · rebuild after fire"), iban: "NL19 RABO 0455 3312 08", soort: T("Bouwdepot", "Escrow"), saldo: 490000, mutatie: T("14 mei 2025", "14 May 2025"), geblokkeerd: true },
          { naam: T("Betaalrekening Kooistra Winkels B.V.", "Current account Kooistra Winkels B.V."), iban: "NL72 RABO 0288 1190 47", soort: T("Betaalrekening", "Current"), saldo: 305640, mutatie: T("vandaag 09:02", "today 09:02") },
          { naam: T("Valutarekening USD (in euro's)", "USD currency account (in euros)"), iban: "NL95 RABO 0388 7712 66", soort: T("Valutarekening", "FX account"), saldo: 84200, mutatie: T("gisteren 16:20", "yesterday 16:20") }
        ].concat(extra("RABO", 11, 15, [
          { naam: function (i) { return T("Huurincasso ", "Rent collection ") + STEDEN[i % STEDEN.length]; },
            soort: T("Betaalrekening", "Current"), saldo: function (i) { return 18400 + i * 6350; }, mutatie: dag },
          { naam: function (i) { return T("Servicekosten ", "Service charges ") + STEDEN[(i + 5) % STEDEN.length]; },
            soort: T("Betaalrekening", "Current"), saldo: function (i) { return 9200 + i * 3100; }, mutatie: dag },
          { naam: function (i) { return T("Waarborgsommen huurders ", "Tenant deposits ") + STEDEN[(i + 9) % STEDEN.length]; },
            soort: T("Derdengelden", "Client funds"), saldo: function (i) { return 26500 + i * 4800; }, mutatie: dag, geblokkeerd: true },
          { naam: function (i) { return T("G-rekening aannemers ", "Blocked contractor account ") + (i + 1); },
            soort: T("G-rekening", "Blocked account"), saldo: function (i) { return 41200 + i * 5600; }, mutatie: dag, geblokkeerd: true },
          { naam: function (i) { return T("Onderhoudsreserve ", "Maintenance reserve ") + STEDEN[(i + 2) % STEDEN.length]; },
            soort: T("Spaarrekening", "Savings"), saldo: function (i) { return 74000 + i * 12500; }, mutatie: dag }
        ]))
      },
      {
        id: "ing", naam: "ING", merk: "#ff6200", kort: "INGB",
        rol: T("Zakelijk én privé", "Business and private"),
        rekeningen: [
          { naam: T("Zakelijke rekening Kooistra.com", "Business account Kooistra.com"), iban: "NL55 INGB 0678 4432 19", soort: T("Betaalrekening", "Current"), saldo: 428700, mutatie: T("vandaag 08:12", "today 08:12") },
          { naam: T("Privérekening E. Kooistra", "Private account E. Kooistra"), iban: "NL91 INGB 0002 4455 88", soort: T("Betaalrekening", "Current"), saldo: 96450, mutatie: T("vandaag 07:40", "today 07:40"), prive: true },
          { naam: T("Oranje Spaarrekening · privé", "Oranje savings · private"), iban: "NL23 INGB 0663 1120 04", soort: T("Spaarrekening", "Savings"), saldo: 615000, mutatie: T("01 aug 2026", "01 Aug 2026"), prive: true }
        ].concat(extra("INGB", 31, 11, [
          { naam: function (i) { return T("Zakelijke rekening Kooistra Winkels ", "Business account Kooistra Winkels ") + (i + 1); },
            soort: T("Betaalrekening", "Current"), saldo: function (i) { return 22600 + i * 8100; }, mutatie: dag },
          { naam: function (i) { return T("Verkooprekening Maxx ", "Maxx sales account ") + STEDEN[i % STEDEN.length]; },
            soort: T("Betaalrekening", "Current"), saldo: function (i) { return 15800 + i * 5400; }, mutatie: dag },
          { naam: function (i) { return T("Kasrekening loodsverkoop ", "Warehouse-sale cash account ") + (i + 1); },
            soort: T("Betaalrekening", "Current"), saldo: function (i) { return 6400 + i * 2300; }, mutatie: dag },
          { naam: function (i) { return T("Privé spaarrekening ", "Private savings ") + (i + 1); },
            soort: T("Spaarrekening", "Savings"), saldo: function (i) { return 34500 + i * 9800; }, mutatie: dag, prive: true },
          { naam: function (i) { return T("Creditcardrekening ", "Credit-card account ") + (i + 1); },
            soort: T("Creditcard", "Credit card"), saldo: function (i) { return 4200 + i * 1500; }, mutatie: dag }
        ]))
      },
      {
        id: "abnamro", naam: "ABN AMRO", merk: "#00893d", kort: "ABNA",
        rol: T("Projectfinanciering", "Project finance"),
        rekeningen: [
          { naam: T("Zakelijke rekening projectontwikkeling", "Business account development"), iban: "NL18 ABNA 0517 6642 30", soort: T("Betaalrekening", "Current"), saldo: 173900, mutatie: T("vandaag 08:33", "today 08:33") },
          { naam: T("Depositorekening · 12 maanden vast", "Deposit account · 12-month fixed"), iban: "NL66 ABNA 0442 8871 05", soort: T("Deposito", "Deposit"), saldo: 750000, mutatie: T("30 jun 2026", "30 Jun 2026"), geblokkeerd: true }
        ].concat(extra("ABNA", 51, 4, [
          { naam: function (i) { return T("Projectrekening horecaplein Dokkum", "Project account hospitality square Dokkum"); },
            soort: T("Betaalrekening", "Current"), saldo: function (i) { return 128400; }, mutatie: dag },
          { naam: function (i) { return T("Projectrekening herontwikkeling Hogedijken", "Project account Hogedijken redevelopment"); },
            soort: T("Betaalrekening", "Current"), saldo: function (i) { return 64900; }, mutatie: dag },
          { naam: function (i) { return T("Bouwdepot voormalige Aldi", "Construction escrow former Aldi"); },
            soort: T("Bouwdepot", "Escrow"), saldo: function (i) { return 215000; }, mutatie: dag, geblokkeerd: true },
          { naam: function (i) { return T("Rentevastrekening zekerhedenpool", "Fixed-rate account, security pool"); },
            soort: T("Spaarrekening", "Savings"), saldo: function (i) { return 96500; }, mutatie: dag }
        ]))
      }
    ];
  }

  function totaal(b) { return b.rekeningen.reduce(function (s, r) { return s + r.saldo; }, 0); }

  function kpiKaart(label, waarde, sub) {
    return '<article class="' + CARD + ' p-5"><p class="' + LBL + '">' + label + '</p>' +
      '<p class="mt-3 text-[24px] font-semibold tracking-[-0.05em] text-[#13263a]">' + waarde + '</p>' +
      '<p class="mt-1 text-[11px] text-slate-500">' + sub + '</p></article>';
  }

  function rekeningRij(r) {
    var merk = [];
    if (r.prive) merk.push('<span class="border border-slate-300 bg-slate-50 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.1em] text-slate-600">' + T("Privé", "Private") + '</span>');
    if (r.geblokkeerd) merk.push('<span class="border border-[#e6dfc9] bg-[#fbf7ea] px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.1em] text-[#8a6d1f]">' + T("Niet vrij besteedbaar", "Restricted") + '</span>');
    return '<div class="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-3.5 text-[12px] last:border-0">' +
      '<span class="min-w-[240px] flex-1"><span class="block font-semibold text-[#13263a]">' + r.naam + '</span>' +
      '<span class="mt-0.5 block font-mono text-[11px] tracking-tight text-slate-500">' + r.iban + '</span></span>' +
      '<span class="flex flex-wrap items-center gap-2">' + merk.join("") +
      '<span class="w-[110px] text-[10px] font-bold uppercase tracking-[0.1em] text-slate-500">' + r.soort + '</span>' +
      '<span class="w-[110px] text-right text-[11px] text-slate-400">' + r.mutatie + '</span>' +
      '<span class="w-[120px] text-right text-[14px] font-semibold text-[#13263a]">' + EUR(r.saldo) + '</span></span></div>';
  }

  function bankKaart(b) {
    var uit = !!open[b.id];
    return '<section class="' + CARD + '">' +
      '<button type="button" data-ek-bank="' + b.id + '" aria-expanded="' + uit + '" ' +
      'class="flex w-full flex-wrap items-center justify-between gap-4 p-5 text-left hover:bg-slate-50">' +
        '<span class="flex items-center gap-4">' +
          '<span class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white" style="background:' + b.merk + '">' + b.kort.slice(0, 4) + '</span>' +
          '<span><span class="block text-[17px] font-semibold tracking-[-0.03em] text-[#13263a]">' + b.naam + '</span>' +
          '<span class="block text-[11px] text-slate-500">' + b.rol + ' · ' + b.rekeningen.length + T(" rekeningen", " accounts") + '</span></span>' +
        '</span>' +
        '<span class="flex items-center gap-4">' +
          '<span class="text-right"><span class="block ' + LBL + '">' + T("Totaal saldo", "Total balance") + '</span>' +
          '<span class="block text-[20px] font-semibold tracking-[-0.04em] text-[#13263a]">' + EUR(totaal(b)) + '</span></span>' +
          '<span class="text-[13px] text-slate-400" aria-hidden="true">' + (uit ? "▾" : "▸") + '</span>' +
        '</span>' +
      '</button>' +
      (uit ? '<div class="border-t border-slate-200">' + b.rekeningen.map(rekeningRij).join("") + '</div>' : '') +
    '</section>';
  }

  function html() {
    var B = banken();
    var alles = B.reduce(function (s, b) { return s + totaal(b); }, 0);
    var prive = 0, geblokkeerd = 0, rek = 0;
    B.forEach(function (b) {
      rek += b.rekeningen.length;
      b.rekeningen.forEach(function (r) {
        if (r.prive) prive += r.saldo;
        if (r.geblokkeerd) geblokkeerd += r.saldo;
      });
    });
    return '' +
    '<section class="flex flex-col gap-5 border-b border-slate-300 pb-5 md:flex-row md:items-end md:justify-between">' +
      '<div><p class="' + LBL + '">' + T("Kapitaal · liquiditeit", "Capital · liquidity") + '</p>' +
      '<h2 class="mt-2 text-[32px] font-semibold tracking-[-0.055em] text-[#13263a]">' + T("Bankrekeningen", "Bank accounts") + '</h2>' +
      '<p class="mt-2 max-w-2xl text-[12px] leading-5 text-[#010b22]/65">' +
      T("Saldi per bank; klik een bank aan om de losse rekeningen te zien. Rekeningen met een bestemming - derdengelden, bouwdepot, deposito - zijn apart gemarkeerd.",
        "Balances per bank; select a bank to see the individual accounts. Accounts with a designated purpose - client funds, escrow, deposit - are flagged separately.") + '</p></div>' +
      '<span class="border border-slate-300 bg-white px-3 py-2 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500">' +
      T("Fictieve saldi · demonstratie", "Illustrative balances · demo") + '</span>' +
    '</section>' +

    '<section class="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">' +
      kpiKaart(T("Totaal op de bank", "Total held at banks"), EUR(alles), rek + T(" rekeningen bij 3 banken", " accounts at 3 banks")) +
      kpiKaart(T("Vrij besteedbaar", "Freely available"), EUR(alles - geblokkeerd - prive), T("zakelijk, zonder bestemming", "business, unrestricted")) +
      kpiKaart(T("Niet vrij besteedbaar", "Restricted"), EUR(geblokkeerd), T("derdengelden, bouwdepot, deposito", "client funds, escrow, deposit")) +
      kpiKaart(T("Privé (ING)", "Private (ING)"), EUR(prive), T("buiten de vennootschappen", "outside the companies")) +
    '</section>' +

    '<section class="mt-5 flex flex-col gap-4">' + B.map(bankKaart).join("") + '</section>' +

    '<p class="mt-5 text-[11px] leading-5 text-slate-500">' +
    T("Saldi zijn fictief en dienen alleen ter illustratie van de koppeling met de banken. Een echte koppeling loopt via PSD2-rekeninginformatie of via dagelijkse MT940/CAMT-bestanden.",
      "Balances are fictional and only illustrate the bank connection. A real connection runs through PSD2 account information or daily MT940/CAMT files.") + '</p>';
  }

  function vul() {
    var root = document.getElementById("ek-bank-root");
    if (!root) return;
    var stempel = (window.__EK_LANG ? window.__EK_LANG() : "nl") + "|" + JSON.stringify(open);
    if (root.dataset.gevuld === stempel) return;
    root.dataset.gevuld = stempel;
    root.innerHTML = html();
    if (!root.dataset.klik) {
      root.dataset.klik = "1";
      root.addEventListener("click", function (e) {
        var b = e.target.closest("[data-ek-bank]");
        if (!b) return;
        var id = b.getAttribute("data-ek-bank");
        open[id] = !open[id];
        vul();
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
