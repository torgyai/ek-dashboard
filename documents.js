/* Documenten: één bestand dat aan meerdere records hangt, met classificatie,
   versies, controlegetal, ondertekenstatus en bewaarregels. */
(function () {
  var U = window.EKUI, T = U.T;
  var map = "alle", open = "d1";

  var MAPPEN = [
    { id: "alle", nl: "Alle", en: "All" },
    { id: "contract", nl: "Contracten", en: "Contracts" },
    { id: "eigendom", nl: "Eigendom & kadaster", en: "Title & land registry" },
    { id: "financieel", nl: "Financieel", en: "Financial" },
    { id: "technisch", nl: "Technisch", en: "Technical" },
    { id: "vergunning", nl: "Vergunningen", en: "Permits" },
    { id: "verzekering", nl: "Verzekering", en: "Insurance" }
  ];

  function documenten() {
    return [
      { id: "d1", naam: T("Huurovereenkomst Nationale-Nederlanden 2021", "Lease Nationale-Nederlanden 2021"), map: "contract", soort: "PDF", grootte: "2,4 MB",
        versie: 3, datum: "2026-07-01", eigenaar: "EYE Vastgoed B.V.", hash: "4f1c9d2e…9ab2", tekenen: "getekend", bewaar: T("10 jaar na einde contract", "10 years after the lease ends"),
        vertrouwelijk: T("Intern en huurder", "Internal and tenant"),
        koppelingen: [T("Contract HC-2021-0044", "Lease HC-2021-0044"), "Achmeatoren / IQON", T("Relatie Nationale-Nederlanden", "Relation Nationale-Nederlanden"), T("Faciliteit FIN-2023-0002", "Facility FIN-2023-0002")] },
      { id: "d2", naam: T("Taxatierapport Achmeatoren 2026", "Valuation report Achmeatoren 2026"), map: "financieel", soort: "PDF", grootte: "8,1 MB",
        versie: 1, datum: "2026-05-14", eigenaar: "EYE Vastgoed B.V.", hash: "9b3a71c4…14ef", tekenen: "nvt", bewaar: T("7 jaar", "7 years"),
        vertrouwelijk: T("Intern, eigenaar en verstrekker", "Internal, owner and lender"),
        koppelingen: ["Achmeatoren / IQON", T("Faciliteit FIN-2023-0002", "Facility FIN-2023-0002"), T("Bankpakket 2026", "Bank pack 2026"), T("Vehikel Harns Invest", "Harns Invest vehicle")] },
      { id: "d3", naam: T("Omgevingsvergunning Sense Dokkum", "Planning permission Sense Dokkum"), map: "vergunning", soort: "PDF", grootte: "1,2 MB",
        versie: 2, datum: "2026-05-14", eigenaar: "EYE Vastgoed B.V.", hash: "c72e08b1…5d40", tekenen: "nvt", bewaar: T("Permanent", "Permanent"),
        vertrouwelijk: T("Openbaar", "Public"),
        koppelingen: ["Sense Dokkum", T("Project SENSE-2026", "Project SENSE-2026"), T("Bestemmingsplandossier", "Zoning file")] },
      { id: "d4", naam: T("Eigendomsakte Brouwerij Dockum", "Title deed Brouwerij Dockum"), map: "eigendom", soort: "PDF", grootte: "640 kB",
        versie: 1, datum: "2024-11-08", eigenaar: "ERKO Dokkum Beheer B.V.", hash: "1a58fe93…77c1", tekenen: "getekend", bewaar: T("Permanent", "Permanent"),
        vertrouwelijk: T("Intern", "Internal"),
        koppelingen: ["Brouwerij Dockum", T("Entiteit ERKO Dokkum Beheer B.V.", "Entity ERKO Dokkum Beheer B.V."), T("Mede-eigenaar Epie Kooistra", "Co-owner Epie Kooistra")] },
      { id: "d5", naam: T("Onderhoudsovereenkomst Synergy 2024-2027", "Maintenance agreement Synergy 2024-2027"), map: "contract", soort: "PDF", grootte: "1,8 MB",
        versie: 2, datum: "2024-01-01", eigenaar: "EYE Vastgoed B.V.", hash: "77b21c09…3e88", tekenen: "getekend", bewaar: T("7 jaar na einde", "7 years after expiry"),
        vertrouwelijk: T("Intern en leverancier", "Internal and supplier"),
        koppelingen: [T("Contract LV-2024-0007", "Contract LV-2024-0007"), T("23 objecten", "23 properties"), "Synergy Installatietechniek"] },
      { id: "d6", naam: T("Opnamestaat Dockumer Sluys 12", "Condition report Dockumer Sluys 12"), map: "technisch", soort: "PDF", grootte: "12,4 MB",
        versie: 1, datum: "2026-08-28", eigenaar: "EYE Vastgoed B.V.", hash: "e40b6a17…21ba", tekenen: "wacht", bewaar: T("5 jaar na vertrek huurder", "5 years after the tenant leaves"),
        vertrouwelijk: T("Intern en huurder", "Internal and tenant"),
        koppelingen: [T("Unit Dockumer Sluys 12", "Unit Dockumer Sluys 12"), T("Huurder Van der Meer", "Tenant Van der Meer"), T("Mutatie 1 september", "Move-in 1 September")] },
      { id: "d7", naam: T("Opstalpolis Univé 2025-2026", "Buildings policy Univé 2025-2026"), map: "verzekering", soort: "PDF", grootte: "980 kB",
        versie: 4, datum: "2025-01-01", eigenaar: T("Alle entiteiten", "All entities"), hash: "38cd12f7…60a9", tekenen: "getekend", bewaar: T("7 jaar", "7 years"),
        vertrouwelijk: T("Intern en verstrekker", "Internal and lender"),
        koppelingen: [T("Contract VZ-2025-0002", "Contract VZ-2025-0002"), T("Portefeuillebreed", "Portfolio-wide"), T("Bankpakket 2026", "Bank pack 2026")] },
      { id: "d8", naam: T("Jaarrekening EYE Vastgoed B.V. 2025", "Annual accounts EYE Vastgoed B.V. 2025"), map: "financieel", soort: "PDF", grootte: "3,6 MB",
        versie: 2, datum: "2026-04-22", eigenaar: "EYE Vastgoed B.V.", hash: "5e91b4d0…08fc", tekenen: "getekend", bewaar: T("7 jaar", "7 years"),
        vertrouwelijk: T("Intern, accountant en verstrekker", "Internal, accountant and lender"),
        koppelingen: [T("Entiteit EYE Vastgoed B.V.", "Entity EYE Vastgoed B.V."), T("Boekjaar 2025", "Financial year 2025"), T("Bankpakket 2026", "Bank pack 2026")] }
    ];
  }

  var API = {
    stamp: function () { return map + "|" + open; },
    click: function (e) {
      var m = U.hit(e, "data-ek-doc-map"); if (m) { map = m; return true; }
      var o = U.hit(e, "data-ek-doc-open"); if (o) { open = o; return true; }
      return false;
    },
    html: function () {
      var D = documenten();
      var lijst = map === "alle" ? D : D.filter(function (d) { return d.map === map; });
      var gek = D.filter(function (d) { return d.id === open; })[0] || D[0];
      var koppelingen = D.reduce(function (s, d) { return s + d.koppelingen.length; }, 0);

      var rijen = lijst.map(function (d) {
        return {
          attr: 'data-ek-doc-open="' + d.id + '"', on: gek.id === d.id,
          cells: ['<strong>' + U.esc(d.naam) + '</strong><br><span class="ek-sub">' + d.soort + " · " + d.grootte + " · v" + d.versie + '</span>',
            U.chip(T(MAPPEN.filter(function (m) { return m.id === d.map; })[0].nl, MAPPEN.filter(function (m) { return m.id === d.map; })[0].en)),
            U.DATE(d.datum), U.esc(d.eigenaar),
            '<span class="ek-num">' + d.koppelingen.length + '</span>',
            d.tekenen === "getekend" ? U.chip(T("Getekend", "Signed"), "ok") : d.tekenen === "wacht" ? U.chip(T("Wacht", "Pending"), "warn") : '<span class="ek-dim">-</span>',
            U.esc(d.vertrouwelijk)]
        };
      });

      return U.head({
        eyebrow: T("Deelnemers · documenten", "Participants · documents"),
        title: T("Documenten", "Documents"),
        intro: T("Eén bestand kan aan een contract, een object, een relatie, een project en een financiering tegelijk hangen zonder dat er kopieën ontstaan. Elk document heeft een controlegetal, zodat later te bewijzen is dat de versie die de bank kreeg dezelfde is als die in het dossier staat.",
                 "One file can be attached to a lease, a property, a relation, a project and a facility at the same time without creating copies. Every document carries a checksum, so it can later be proven that the version the bank received is the one in the file."),
        chip: T(D.length + " documenten · " + koppelingen + " koppelingen", D.length + " documents · " + koppelingen + " links")
      }) +
      U.kpis([
        [T("Documenten", "Documents"), String(D.length), T("in zeven mappen", "in seven folders")],
        [T("Koppelingen", "Links"), String(koppelingen), T("gemiddeld " + U.NUM(koppelingen / D.length, 1) + " per document", "average " + U.NUM(koppelingen / D.length, 1) + " per document")],
        [T("Wacht op handtekening", "Awaiting signature"), "1", T("opnamestaat Dockumer Sluys", "condition report Dockumer Sluys")],
        [T("Controlegetal aanwezig", "Checksum present"), "100%", T("SHA-256 bij elk bestand", "SHA-256 on every file")],
        [T("Bewaarregel ingesteld", "Retention rule set"), "100%", T("van permanent tot 5 jaar", "from permanent to 5 years")]
      ], 5) +
      '<div class="ek-mt">' + U.tabs(MAPPEN.map(function (m) {
        return { id: m.id, label: T(m.nl, m.en), count: m.id === "alle" ? D.length : D.filter(function (d) { return d.map === m.id; }).length };
      }), map, "data-ek-doc-map") + '</div>' +
      '<div class="ek-mt">' + U.panel(T("Documenten", "Documents"),
        U.table([{ label: T("Document", "Document") }, { label: T("Map", "Folder") }, { label: T("Datum", "Date") },
          { label: T("Eigenaar", "Owner") }, { label: T("Koppelingen", "Links"), num: true }, { label: T("Ondertekening", "Signature") },
          { label: T("Vertrouwelijkheid", "Confidentiality") }], rijen),
        U.btns([{ label: T("Uploaden", "Upload"), primary: true }, { label: T("Scannen", "Scan") }, { label: T("Labelen", "Tag") }, { label: T("Exporteren", "Export") }])) + '</div>' +
      '<div class="ek-mt ek-g ek-split">' +
      U.panel(gek.naam, '<div class="ek-panel-body">' + U.kv([
        [T("Soort", "Type"), gek.soort + " · " + gek.grootte],
        [T("Versie", "Version"), "v" + gek.versie + " " + T("van", "of") + " " + U.DATE(gek.datum)],
        [T("Eigenaar", "Owner"), U.esc(gek.eigenaar)],
        [T("Controlegetal", "Checksum"), "SHA-256 · " + gek.hash],
        [T("Ondertekening", "Signature"), gek.tekenen === "getekend" ? T("Getekend, met ondertekenrapport", "Signed, with signing report") : gek.tekenen === "wacht" ? T("Verstuurd, wacht op huurder", "Sent, awaiting tenant") : T("Niet van toepassing", "Not applicable")],
        [T("Bewaartermijn", "Retention"), U.esc(gek.bewaar)],
        [T("Vertrouwelijkheid", "Confidentiality"), U.esc(gek.vertrouwelijk)]
      ]) + '<div class="ek-mt-s"><p class="ek-lbl">' + T("Gekoppeld aan", "Linked to") + '</p><div class="ek-btns ek-mt-s">' +
        gek.koppelingen.map(function (k) { return U.chip(k, "info"); }).join("") + '</div></div>' +
        '<div class="ek-mt-s">' + U.btns([
          { label: T("Voorbeeld", "Preview"), primary: true }, { label: T("Downloaden", "Download") },
          { label: T("Nieuwe versie", "New version") }, { label: T("Verplaatsen", "Move") }, { label: T("Delen", "Share") },
          { label: T("Ter ondertekening", "Send for signature") }, { label: T("Vergrendelen", "Lock") }, { label: T("Archiveren", "Archive") }
        ]) + '</div></div>') +
      U.panel(T("Versiehistorie", "Version history"), '<div class="ek-panel-body">' +
        U.table([{ label: T("Versie", "Version") }, { label: T("Datum", "Date") }, { label: T("Door", "By") }, { label: T("Wijziging", "Change") }],
          [["v" + gek.versie, U.DATE(gek.datum), "Amarens", T("Huidige versie", "Current version")],
           ["v" + Math.max(1, gek.versie - 1), U.DATE("2025-11-14"), "E. Kooistra", T("Aanvulling verwerkt", "Amendment processed")],
           ["v1", U.DATE("2021-04-01"), T("bij oplevering", "at handover"), T("Eerste vastlegging", "First filing")]].slice(0, gek.versie)) +
        '<p class="ek-mt-s ek-note">' + T("Een nieuwe versie vervangt de oude nooit: beide blijven met hun eigen controlegetal bewaard. Bij een geschil over wat er precies is afgesproken is dat het verschil tussen een vermoeden en een bewijs.",
          "A new version never replaces the old one: both are kept with their own checksum. In a dispute about what was actually agreed, that is the difference between a hunch and evidence.") + '</p></div>') +
      '</div>';
    }
  };

  U.mount("ek-documents-root", API);
})();
