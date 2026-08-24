/* Dutch wording for the EK Dashboard UI. Edit any line to change the wording.
   __EK_NL_RULES__ = patterns (text containing numbers/names); __EK_NL_DICT__ = exact phrases. */
window.__EK_NL_RULES__ = [
  // dates: 15 Mar 2026 -> 15 mrt 2026
  [/^(\d{1,2}) Jan (\d{4})$/, "$1 jan $2"], [/^(\d{1,2}) Feb (\d{4})$/, "$1 feb $2"],
  [/^(\d{1,2}) Mar (\d{4})$/, "$1 mrt $2"], [/^(\d{1,2}) Apr (\d{4})$/, "$1 apr $2"],
  [/^(\d{1,2}) May (\d{4})$/, "$1 mei $2"], [/^(\d{1,2}) Jun (\d{4})$/, "$1 jun $2"],
  [/^(\d{1,2}) Jul (\d{4})$/, "$1 jul $2"], [/^(\d{1,2}) Aug (\d{4})$/, "$1 aug $2"],
  [/^(\d{1,2}) Sep (\d{4})$/, "$1 sep $2"], [/^(\d{1,2}) Oct (\d{4})$/, "$1 okt $2"],
  [/^(\d{1,2}) Nov (\d{4})$/, "$1 nov $2"], [/^(\d{1,2}) Dec (\d{4})$/, "$1 dec $2"],
  // toasts / generated sentences
  [/^(.+) payment record opened\.$/, "Betaalregistratie $1 geopend."],
  [/^(.+) added to the property manager review queue\.$/, "$1 toegevoegd aan de beoordelingswachtrij van de vastgoedbeheerder."],
  [/^(.+) added to the accountant review queue\.$/, "$1 toegevoegd aan de beoordelingswachtrij van de accountant."],
  [/^(.+) added to the adviser review queue\.$/, "$1 toegevoegd aan de beoordelingswachtrij van de adviseur."],
  [/^(.+) added to the partner review queue\.$/, "$1 toegevoegd aan de beoordelingswachtrij van de partner."],
  [/^(.+) selected for review\.$/, "$1 geselecteerd voor beoordeling."],
  [/^(.+) · policy renewal$/, "$1 · polisverlenging"],
  [/^(.+) · Use & fire-safety permit$/, "$1 · gebruiks- en brandveiligheidsvergunning"],
  [/^(.+) · Monument permit$/, "$1 · monumentenvergunning"],
  [/^(.+) · Environmental permit$/, "$1 · omgevingsvergunning"],
  [/^Select (.+)$/, "Selecteer $1"],
  [/^Filter by (.+)$/, "Filter op $1"],
  // counted labels
  [/^(\d[\d.,]*) portfolio assets$/, "$1 portefeuilleobjecten"],
  [/^(\d[\d.,]*) assets with arrears$/, "$1 objecten met achterstand"],
  [/^(\d[\d.,]*) assets$/, "$1 objecten"],
  [/^(\d[\d.,]*) records$/, "$1 registraties"],
  [/^(\d[\d.,]*) current records$/, "$1 actuele registraties"],
  [/^(\d[\d.,]*) active lease records$/, "$1 actieve huurcontracten"],
  [/^(\d[\d.,]*) documents$/, "$1 documenten"],
  [/^(\d[\d.,]*) EPC files$/, "$1 EPC-bestanden"],
  [/^(\d[\d.,]*) facilities$/, "$1 faciliteiten"],
  [/^(\d[\d.,]*) locations$/, "$1 locaties"],
  [/^(\d[\d.,]*) open items?$/, "$1 openstaande punten"],
  [/^(\d[\d.,]*) co-owners?$/, "$1 mede-eigenaar(s)"],
  [/^(\d[\d.,]*) spaces$/, "$1 parkeerplaatsen"],
  [/^Unit (\d+)$/, "Eenheid $1"],
  [/^Residential lease (\d+)$/, "Woninghuurcontract $1"],
  [/^Operating lease (\d+)$/, "Bedrijfshuurcontract $1"],
  [/^Commercial (\d+)$/, "Commercieel $1"],
  [/^Documents (\d+)$/, "Documenten $1"],
  // units and measures
  [/^€ ?([\d.,]+) \/ month$/, "€ $1 / maand"],
  [/^([\d.,]+)% on WOZ$/, "$1% op WOZ"],
  [/^([\d.,]+)% occupied$/, "$1% verhuurd"],
  [/^([\d.,]+)% occ\.$/, "$1% bez."],
  [/^([\d.,]+)% economic interest$/, "$1% economisch belang"],
  [/^([\d.,]+)% direct interest$/, "$1% controlerend belang"],
  [/^([\d.,]+)% controlled$/, "$1% zeggenschap"],
  [/^([\d.,]+)% LTV headroom$/, "$1% LTV-ruimte"],
  [/^([\d.,]+) years?$/, "$1 jaar"],
  [/^([\d.,]+) m² \/ ([\d.,]+) spaces$/, "$1 m² / $2 parkeerplaatsen"],
  [/^([\d.,]+)% INTEREST$/, "$1% BELANG"],
  [/^([\d.,]+) units · Built (\d{4})$/, "$1 eenheden · Bouwjaar $2"],
  [/^([\d.,]+) assets · reconciliation required$/, "$1 objecten · afstemming vereist"],
  [/^([\d.,]+) assets require a tax-book-value to current-WOZ reconciliation\.$/,
   "$1 objecten vereisen een afstemming van fiscale boekwaarde met de actuele WOZ-waarde."],
  [/^([\d.,]+) commercial, mixed or hospitality assets require unit-level classification\.$/,
   "$1 commerciële, gemengde of horecaobjecten vereisen classificatie op eenheidsniveau."],
  [/^([\d.,]+) recorded ownership vehicles; portfolio debt of (.+)\.$/,
   "$1 geregistreerde eigendomsvehikels; portefeuilleschuld van $2."],
  [/^Leases ending by (\d{4})$/, "Huurcontracten aflopend vóór $1"]
];

window.__EK_NL_DICT__ = {
  /* ---------- shell / navigation ---------- */
  "Portfolio": "Portefeuille", "Operations": "Exploitatie", "Capital & tax": "Kapitaal & fiscaliteit",
  "Risk & planning": "Risico & planning", "Intelligence": "Intelligence",
  "Participant access": "Deelnemerstoegang", "Participant workspaces": "Deelnemerswerkruimtes",
  "Open navigation": "Open navigatie", "Notifications alt+T": "Meldingen alt+T",
  "Command centre": "Commandocentrum", "Asset register": "Objectregister", "Map": "Kaart",
  "Leases & tenants": "Huurcontracten & huurders", "Collections": "Incasso", "Work orders": "Werkorders",
  "Debt & covenants": "Schuld & convenanten", "Tax & structure": "Fiscaliteit & structuur",
  "Transactions": "Transacties", "Reports": "Rapportages", "Scenario studio": "Scenariostudio",
  "Energy & ESG": "Energie & ESG", "Ownership": "Eigendom", "Data room": "Dataroom",
  "Analytics": "Analyse", "Portfolio intelligence": "Portefeuille-intelligence",
  "Alert centre": "Meldingencentrum", "Participant portals": "Deelnemersportalen",
  "Connections": "Koppelingen", "Register": "Register", "Exceptions": "Aandachtspunten",

  /* ---------- command centre ---------- */
  "Portfolio-wide data": "Portefeuillebrede gegevens",
  "Executive command centre": "Commandocentrum",
  "Value, income, occupancy and exceptions": "Waarde, inkomsten, bezetting en aandachtspunten",
  "Owner brief": "Eigenaarsbriefing", "Morning exposure": "Ochtendoverzicht",
  "Collections, lease events, debt, capex and operations from the current register":
    "Incasso, huurgebeurtenissen, schuld, capex en exploitatie uit het huidige register",
  "Portfolio register · all assets": "Objectregister · alle objecten",
  "Asset performance": "Objectprestaties", "Portfolio queue": "Openstaand",
  "Priority actions": "Prioritaire acties", "Portfolio value": "Portefeuillewaarde",
  "Monthly rent roll": "Maandelijkse huurstroom", "Occupancy": "Bezetting",
  "Debt / LTV": "Schuld / LTV", "Arrears": "Achterstanden", "WOZ basis": "WOZ-grondslag",
  "Current leases": "Lopende huurcontracten", "By lettable area": "Naar verhuurbaar oppervlak",
  "Tenant accounts": "Huurdersrekeningen", "Lease expiries": "Huurexpiraties",
  "Debt concentration": "Schuldconcentratie", "12-month capex": "12-maands capex",
  "12m capex": "12m capex", "12m capex plan": "12m capexplan",
  "Open work orders": "Openstaande werkorders", "Top three facilities": "Top drie faciliteiten",
  "Approved plan exposure": "Goedgekeurde planomvang", "Across the portfolio": "Over de portefeuille",
  "Arrears · collections": "Achterstanden · incasso", "Asset": "Object", "Type": "Type",
  "Rent": "Huur", "Occ.": "Bez.", "Debt": "Schuld", "Capex": "Capex", "WOZ": "WOZ",
  "Workspace control": "Werkruimtebeheer", "Portfolio dataset": "Portefeuilledataset",
  "Active dataset": "Actieve dataset", "Nonox portfolio register": "Nonox objectregister",
  "Open asset register": "Open objectregister", "Dataset refreshed.": "Dataset vernieuwd.",
  "Workspace readiness": "Gereedheid werkruimte",
  "Portfolio data is available across every workspace.":
    "Portefeuillegegevens zijn beschikbaar in elke werkruimte.",
  "Map markers": "Kaartmarkeringen", "Operating modules": "Exploitatiemodules",
  "Connected": "Gekoppeld", "Refresh dataset": "Dataset vernieuwen",

  /* ---------- asset register / ownership ---------- */
  "Portfolio record": "Portefeuilledossier", "Assets in view": "Objecten in beeld",
  "Value interest": "Waardebelang", "Annual rent": "Jaarhuur", "NOI": "NOI",
  "After operating costs": "Na exploitatiekosten", "After costs": "Na kosten",
  "Cash flow": "Kasstroom", "Before personal tax": "Vóór inkomstenbelasting",
  "Attributable capital plan": "Toerekenbaar kapitaalplan",
  "Attributable open balance": "Toerekenbaar openstaand saldo",
  "Attributable facility balance": "Toerekenbaar faciliteitssaldo",
  "Attributable contracted rent": "Toerekenbare contractuele huur",
  "Assets & economic interest": "Objecten & economisch belang",
  "Partner, vehicle and ownership exposure register":
    "Register van partners, vehikels en eigendomsposities",
  "All co-owners": "Alle mede-eigenaren", "All holding vehicles": "Alle houdstervehikels",
  "All assets": "Alle objecten", "Vacancy": "Leegstand",
  "Energy exceptions": "Energie-aandachtspunten", "Elevated risk": "Verhoogd risico",
  "Search asset, city, partner or holding": "Zoek object, plaats, partner of houdster",
  "Asset / holding vehicle": "Object / houdstervehikel", "Co-owner(s)": "Mede-eigenaar(s)",
  "Beneficial share": "Economisch aandeel", "Attributable rent": "Toerekenbare huur",
  "Sole ownership": "Volledig eigendom", "value": "waarde", "annual": "jaarlijks",
  "Selected ownership record": "Geselecteerd eigendomsdossier",
  "Beneficial ownership": "Economisch eigendom",
  "Attributable annual rent": "Toerekenbare jaarhuur", "Attributable NOI": "Toerekenbare NOI",
  "Attributable cash flow": "Toerekenbare kasstroom", "Attributable arrears": "Toerekenbare achterstanden",
  "Attributable debt": "Toerekenbare schuld", "Attributable capex": "Toerekenbare capex",
  "Attributable value": "Toerekenbare waarde",
  "Distribution basis": "Uitkeringsgrondslag", "Open complete asset file": "Open volledig objectdossier",
  "Beneficial market-value share": "Economisch aandeel in marktwaarde",
  "Attributable contracted rent": "Toerekenbare contractuele huur",
  "Open map": "Open kaart", "Market value": "Marktwaarde",
  "Attributable value, income, cash flow, distributions and shared asset exposure.":
    "Toerekenbare waarde, inkomsten, kasstroom, uitkeringen en gedeelde objectposities.",
  "1 co-owner": "1 mede-eigenaar"
};

Object.assign(window.__EK_NL_DICT__, {
  /* ---------- property detail ---------- */
  "Property control": "Portefeuillebeheer", "Asset summary": "Objectsamenvatting",
  "Commercial, capital and operational position": "Commerciële, kapitaal- en exploitatiepositie",
  "Asset file": "Objectdossier", "Record navigation": "Dossiernavigatie",
  "Commercial lease stack": "Commerciële huurstapel", "Income & valuation": "Inkomsten & waardering",
  "Facility & covenants": "Faciliteit & convenanten", "Technical & ESG": "Technisch & ESG",
  "Risk & compliance": "Risico & compliance", "Tax & ownership": "Fiscaliteit & eigendom",
  "Document index": "Documentindex", "Overview": "Overzicht", "Commercial": "Commercieel",
  "Finance": "Financieel", "Documents": "Documenten",
  "Lettable / site area": "Verhuurbaar / perceeloppervlak", "Market rent": "Markthuur",
  "Gross yield": "Bruto aanvangsrendement", "Service charge": "Servicekosten",
  "Property manager": "Vastgoedbeheerder", "Last inspection": "Laatste inspectie",
  "Next inspection": "Volgende inspectie", "Meter": "Meter",
  "Decision context": "Beslissingscontext", "Current asset signals": "Actuele objectsignalen",
  "Risk drivers": "Risicofactoren", "Vacancy exposure": "Leegstandsrisico",
  "Energy intensity": "Energie-intensiteit", "Open technical item": "Openstaand technisch punt",
  "WOZ review": "WOZ-herziening", "Maintenance contractor": "Onderhoudsaannemer",
  "Contracted rent": "Contractuele huur", "Insurance": "Verzekering",
  "Market value and capital history": "Marktwaarde en kapitaalhistorie",
  "Acquisition date": "Aankoopdatum", "Purchase price": "Aankoopprijs",
  "Valuation date": "Taxatiedatum", "Valuation basis": "Taxatiegrondslag",
  "Valuer": "Taxateur", "Valuation report": "Taxatierapport", "Valuation": "Taxatie",
  "Implied value": "Impliciete waarde", "Value delta": "Waardeverschil",
  "Built / refurbished": "Bouwjaar / renovatie", "Construction": "Constructie",
  "Concrete frame with brick façade": "Betonskelet met gemetselde gevel",
  "Zoning": "Bestemming", "Site / parking": "Terrein / parkeren", "Units": "Eenheden",
  "Unit": "Eenheid", "Main unit": "Hoofdeenheid", "Available unit": "Beschikbare eenheid",
  "Building & operations": "Gebouw & exploitatie", "Property type": "Objecttype",
  "Property": "Object", "Classification": "Classificatie", "Category": "Categorie",
  "High risk": "Hoog risico", "Selected asset review": "Beoordeling geselecteerd object",

  /* ---------- leases & tenants ---------- */
  "Lease": "Huurcontract", "Lease stack": "Huurstapel", "Lease schedule": "Huurschema",
  "Lease schedules": "Huurschema's", "Lease start": "Ingangsdatum", "Lease end": "Einddatum",
  "Start date": "Startdatum", "End date": "Einddatum", "Break": "Breakoptie",
  "Deposit": "Waarborgsom", "Indexation": "Indexering", "Annual indexation": "Jaarlijkse indexering",
  "Annual CPI": "Jaarlijkse CPI", "Annual CPI / contract-specific": "Jaarlijkse CPI / contractspecifiek",
  "Tenant": "Huurder", "Legal tenant name": "Statutaire huurdersnaam",
  "Monthly rent": "Maandhuur", "Monthly gross rent": "Bruto maandhuur",
  "Contracted monthly rent": "Contractuele maandhuur", "Monthly charge": "Maandelijkse last",
  "Payment status": "Betaalstatus", "Open issues": "Openstaande meldingen",
  "Unit tenancy, rent and expiry schedule": "Huur, huurprijs en expiratieschema per eenheid",
  "Unit-level occupancy, rent and expiry": "Bezetting, huur en expiratie op eenheidsniveau",
  "Lease, tenant and occupancy control": "Beheer van huurcontracten, huurders en bezetting",
  "Leases, notices and approvals": "Huurcontracten, opzeggingen en goedkeuringen",
  "Add lease": "Huurcontract toevoegen", "Create lease": "Huurcontract aanmaken",
  "Lease creation": "Huurcontract aanmaken", "Close lease form": "Huurcontractformulier sluiten",
  "Lease signature workflow": "Ondertekeningsproces huurcontract",
  "Lease events": "Huurgebeurtenissen", "Lease expirations": "Huurexpiraties",
  "Lease weighted": "Huurgewogen", "WAULT": "WAULT", "Rent reversion": "Huurherziening",
  "Rent growth": "Huurgroei", "Vacant": "Leegstaand", "Active": "Actief",
  "Development / not yet let": "Ontwikkeling / nog niet verhuurd",
  "Commercial space": "Commerciële ruimte", "Commercial use": "Commercieel gebruik",
  "Residential use": "Woongebruik", "Residential": "Woningen", "Logistics": "Logistiek",
  "Mixed": "Gemengd", "Monument": "Monument", "Apartment": "Appartement",
  "Commercial pool": "Commerciële pool", "Residential pool": "Woningpool",

  /* ---------- operations / work orders ---------- */
  "Operations desk": "Exploitatiebalie", "Work order queue": "Werkorderwachtrij",
  "Create work order": "Werkorder aanmaken", "Log work order": "Werkorder vastleggen",
  "Describe work required": "Beschrijf de benodigde werkzaamheden",
  "Maintenance": "Onderhoud", "Maintenance control": "Onderhoudsbeheer",
  "Maintenance report": "Onderhoudsrapport", "Report an issue": "Melding maken",
  "Describe the issue": "Beschrijf de melding", "Log issue": "Melding vastleggen",
  "Submit issue": "Melding indienen", "Issue": "Melding", "Severity": "Urgentie",
  "In progress": "In behandeling", "Completed": "Afgerond", "Open": "Open",
  "Received": "Ontvangen", "Priority": "Prioriteit", "High priority": "Hoge prioriteit",
  "High": "Hoog", "Medium": "Middel", "Moderate": "Gemiddeld", "Urgent": "Urgent",
  "Leasing, work orders, inspections and asset availability.":
    "Verhuur, werkorders, inspecties en beschikbaarheid van objecten.",
  "Next inspections": "Volgende inspecties", "Inspection": "Inspectie",
  "Next technical inspection": "Volgende technische inspectie",
  "Current technical items": "Actuele technische punten",
  "Technical record and maintenance control": "Technisch dossier en onderhoudsbeheer",
  "Planned works": "Geplande werkzaamheden", "Select property first": "Selecteer eerst een object"
});

Object.assign(window.__EK_NL_DICT__, {
  /* ---------- collections ---------- */
  "Collection exposure": "Incassopositie", "Current collection": "Actuele incasso",
  "Cash collection": "Kasincasso", "Open collections": "Openstaande incasso",
  "Open arrears": "Openstaande achterstanden", "No open arrears": "Geen openstaande achterstanden",
  "No open items": "Geen openstaande punten", "Outstanding": "Uitstaand",
  "Outstanding balance": "Uitstaand saldo", "Open balance share": "Aandeel openstaand saldo",
  "Current tenant balances": "Actuele huurderssaldi",
  "Outstanding balances and property context": "Uitstaande saldi en objectcontext",
  "Charges & arrears": "Lasten & achterstanden",
  "Charges and payment reconciliation": "Afstemming van lasten en betalingen",
  "Rent charges, reconciliation, VAT, WOZ and portfolio evidence.":
    "Huurlasten, afstemming, btw, WOZ en portefeuillebewijs.",
  "Rent, charges, VAT and ledger extracts": "Huur, lasten, btw en grootboekuittreksels",
  "Collections follow-up": "Incasso-opvolging", "Collections report": "Incassorapport",
  "Paid": "Betaald", "Due": "Vervallen", "Due this month": "Deze maand vervallen",
  "Balance": "Saldo", "Reconcile": "Afstemmen",

  /* ---------- finance / debt ---------- */
  "Financial control": "Financiële sturing", "Income statement": "Resultatenrekening",
  "Annual income, costs and NOI": "Jaarlijkse inkomsten, kosten en NOI",
  "Operating costs": "Exploitatiekosten", "Costs": "Kosten",
  "Net operating income": "Netto exploitatieresultaat", "NOI yield": "NOI-rendement",
  "NOI bridge": "NOI-brug", "Annual capex": "Jaarlijkse capex",
  "After annual capex": "Na jaarlijkse capex", "Capex provision": "Capexvoorziening",
  "Capex approved": "Capex goedgekeurd", "Capex requirement": "Capexbehoefte",
  "Retrofit capex": "Verduurzamingscapex", "Estimated cash flow": "Geschatte kasstroom",
  "Annual debt service": "Jaarlijkse schuldendienst", "Debt exposure": "Schuldpositie",
  "Debt outstanding": "Uitstaande schuld", "Debt facility": "Financieringsfaciliteit",
  "Debt screen": "Schuldoverzicht", "Debt security": "Zekerheidsstelling",
  "Debt documents": "Schulddocumenten", "Outstanding facilities": "Uitstaande faciliteiten",
  "Facility maturity": "Looptijd faciliteit", "Facility schedule": "Faciliteitenschema",
  "Maturity": "Einddatum", "Maturity & covenant calendar": "Kalender einddata & convenanten",
  "Next facility event": "Volgende faciliteitsgebeurtenis",
  "Covenant headroom": "Convenantruimte", "DSCR floor": "DSCR-ondergrens",
  "Policy LTV limit": "LTV-beleidslimiet", "Portfolio LTV": "Portefeuille-LTV",
  "Loan-to-value": "Loan-to-value", "LTV": "LTV", "Lender": "Financier",
  "Interest rate": "Rentepercentage", "Interest": "Rente", "Rate": "Tarief",
  "Rate reset": "Renteherziening", "Fixed rate end": "Einde rentevastperiode",
  "Weighted rate": "Gewogen tarief", "Weighted portfolio": "Gewogen portefeuille",
  "Principal": "Hoofdsom", "Security": "Zekerheid", "Security pool": "Zekerhedenpool",
  "Security, pricing and covenant position": "Zekerheden, pricing en convenantpositie",
  "Asset-backed capital reviews": "Kapitaalbeoordelingen met objectzekerheid",
  "Capital management": "Kapitaalbeheer", "Capital decisions": "Kapitaalbesluiten",
  "Capital reference": "Kapitaalreferentie",
  "Capital expenditure approvals due": "Goedkeuringen investeringen vervallen",
  "Financial data": "Financiële gegevens", "Estimate": "Raming",
  "Value concentration": "Waardeconcentratie", "Exposure": "Positie",

  /* ---------- tax & structure ---------- */
  "Dutch tax record": "Nederlands fiscaal dossier", "Dutch tax review": "Nederlandse fiscale toets",
  "Dutch tax intelligence · source-backed": "Nederlandse fiscale intelligence · bronvermeld",
  "Tax review": "Fiscale toets", "Tax review pathways": "Fiscale toetsroutes",
  "Tax action": "Fiscale actie", "Next tax event": "Volgende fiscale gebeurtenis",
  "VAT": "Btw", "BTW status": "Btw-status", "BTW treatment": "Btw-behandeling",
  "VAT letting screen": "Btw-verhuurtoets",
  "VAT status of commercial letting": "Btw-status van commerciële verhuur",
  "Income treatment": "Inkomstenbehandeling", "Box treatment": "Boxbehandeling",
  "Municipal tax provision": "Voorziening gemeentelijke belastingen",
  "WOZ value": "WOZ-waarde", "WOZ tax year": "WOZ-belastingjaar",
  "WOZ review window": "WOZ-bezwaartermijn", "WOZ review windows": "WOZ-bezwaartermijnen",
  "WOZ reviews": "WOZ-herzieningen", "WOZ review window is open.": "De WOZ-bezwaartermijn is open.",
  "No immediate WOZ action.": "Geen directe WOZ-actie vereist.",
  "Open review windows": "Open bezwaartermijnen", "Against WOZ basis": "Ten opzichte van WOZ-grondslag",
  "Interest-weighted WOZ": "Belanggewogen WOZ", "Published VPB bands": "Gepubliceerde Vpb-schijven",
  "Earnings-stripping bridge": "Earningsstrippingbrug",
  "Entity-level EBITDA bridge needed": "EBITDA-brug op entiteitsniveau vereist",
  "Fiscal-unity eligibility and consequences": "Voorwaarden en gevolgen fiscale eenheid",
  "WOZ floor and depreciation pack": "WOZ-bodemwaarde en afschrijvingsdossier",
  "Annual filing current": "Aangifte actueel", "Annual filings": "Jaarlijkse aangiften",
  "Filed": "Ingediend", "Mandatory transaction screen": "Verplichte transactietoets",
  "Run before signing": "Uitvoeren vóór ondertekening",
  "No automatic tax recommendation": "Geen automatisch fiscaal advies",
  "Professional-review boundary": "Grens van professionele beoordeling",
  "Evidence required": "Bewijs vereist", "Evidence requested": "Bewijs opgevraagd",
  "Request evidence": "Bewijs opvragen",
  "Evidence before election, transaction or distribution":
    "Bewijs vóór keuze, transactie of uitkering",

  /* ---------- ownership ---------- */
  "Ownership & governance": "Eigendom & governance", "Ownership control": "Eigendomsbeheer",
  "Ownership entity": "Eigendomsentiteit", "Ownership report": "Eigendomsrapport",
  "Ownership workflow": "Eigendomsproces", "Open ownership report": "Open eigendomsrapport",
  "Entities, beneficial interest and transfers": "Entiteiten, economisch belang en overdrachten",
  "Legal entities": "Rechtspersonen", "Legal structure": "Juridische structuur",
  "Legal owner, UBOs and acquisition record": "Juridisch eigenaar, UBO's en verwervingsdossier",
  "Beneficial interests": "Economische belangen", "Beneficial owners": "Economisch eigenaren",
  "Beneficial ownership and review status": "Economisch eigendom en beoordelingsstatus",
  "All recorded beneficial interests are current.":
    "Alle vastgelegde economische belangen zijn actueel.",
  "Recorded co-owners": "Vastgelegde mede-eigenaren", "Control": "Zeggenschap",
  "Control entity": "Zeggenschapsentiteit", "Control interest": "Zeggenschapsbelang",
  "Control summary": "Samenvatting zeggenschap", "Controlled": "Onder zeggenschap",
  "Control path and operating entities": "Zeggenschapsketen en werkmaatschappijen",
  "Control files closed": "Beheersdossiers gesloten", "Direct": "Direct", "Economic": "Economisch",
  "Transfer history": "Overdrachtshistorie", "Transfer type": "Overdrachtstype",
  "Transfers": "Overdrachten", "Record transfer": "Overdracht vastleggen",
  "Add transfer": "Overdracht toevoegen", "Close transfer form": "Overdrachtsformulier sluiten",
  "Share transfer": "Aandelenoverdracht", "Certificate transfer": "Certificaatoverdracht",
  "Subscription": "Inschrijving", "Supporting document": "Onderliggend document",
  "Share transfers, certificates and subscriptions": "Aandelenoverdrachten, certificaten en inschrijvingen",
  "Current / no pending transfer": "Actueel / geen lopende overdracht",
  "Signatory rules": "Tekenbevoegdheid", "Board approvals": "Bestuursgoedkeuringen",
  "Governance": "Governance", "Governance review": "Governancebeoordeling",
  "Open governance file": "Open governancedossier", "Consent status": "Instemmingsstatus",
  "Annual ownership review": "Jaarlijkse eigendomsbeoordeling",
  "Income-producing asset interests": "Belangen in renderende objecten",
  "Portfolio holding positions": "Portefeuilleposities", "Portfolio holding vehicle": "Houdstervehikel",
  "Partner agreements": "Partnerovereenkomsten", "Partner statement": "Partnerverklaring"
});

Object.assign(window.__EK_NL_DICT__, {
  /* ---------- energy & ESG ---------- */
  "Energy": "Energie", "Energy label": "Energielabel", "Energy assets": "Energieobjecten",
  "Energy evidence": "Energiebewijs", "Energy pathway": "Verduurzamingspad",
  "Energy pathway on track": "Verduurzamingspad op schema", "Within pathway": "Binnen het pad",
  "Below target": "Onder doelstelling", "Energy upgrade required": "Verduurzaming vereist",
  "Upgrade priority": "Verduurzamingsprioriteit", "ESG priority": "ESG-prioriteit",
  "Target intensity": "Doelintensiteit", "Current intensity": "Huidige intensiteit",
  "Intensity": "Intensiteit", "Estimated reduction": "Geschatte reductie",
  "Measure bundle": "Maatregelenpakket", "Envelope + heat pump": "Schil + warmtepomp",
  "LED + controls + insulation": "LED + regeltechniek + isolatie",
  "Energy & smart meter": "Energie & slimme meter", "Smart-meter ID": "Slimme-meter-ID",
  "EPC & smart-meter export": "EPC- en slimmemeter-export", "EPC": "Energielabel",
  "EPC expiry": "Vervaldatum energielabel", "EPC A–B": "Energielabel A–B",
  "Electricity YTD": "Elektriciteit YTD", "Gas YTD": "Gas YTD", "Solar YTD": "Zon YTD",
  "Consumption, label and decarbonisation evidence": "Verbruik, label en verduurzamingsbewijs",
  "Energy, EPC & retrofit plan": "Energie, energielabel & verduurzamingsplan",

  /* ---------- compliance / risk / permits ---------- */
  "Compliance status": "Compliancestatus", "Risk": "Risico", "Risk control": "Risicobeheersing",
  "Risk classification": "Risicoclassificatie", "risk classification": "risicoclassificatie",
  "Risk or open-issue exposure": "Risico- of meldingenpositie",
  "Asset exceptions and monitored controls": "Objectaandachtspunten en bewaakte beheersmaatregelen",
  "Asset-level control record": "Beheersdossier op objectniveau",
  "Selected control": "Geselecteerde beheersmaatregel",
  "Mark control complete": "Beheersmaatregel afronden", "Watch": "Bewaken",
  "Permits & safety": "Vergunningen & veiligheid", "Permit actions": "Vergunningacties",
  "Permit expiry": "Vervaldatum vergunning", "Permit renewal": "Vergunningverlenging",
  "Primary permit": "Primaire vergunning",
  "Permit and inspection evidence": "Vergunning- en inspectiebewijs",
  "Insurance & claims": "Verzekering & schades", "Insurance & permits": "Verzekering & vergunningen",
  "Insurance certificate": "Verzekeringsbewijs", "Insurance controls": "Verzekeringsbeheersing",
  "Insurance provider": "Verzekeraar", "Insurance renewal": "Verzekeringsverlenging",
  "Policy expiry": "Vervaldatum polis",
  "Protection, compliance and renewal dates": "Dekking, compliance en verlengingsdata",
  "Latest status": "Laatste status", "Status": "Status", "Next review": "Volgende beoordeling",
  "Next action": "Volgende actie", "Next step": "Volgende stap", "Coverage": "Dekking",
  "Elevated": "Verhoogd", "Effective": "Effectief", "Current": "Actueel", "None": "Geen",
  "Clear": "Geen achterstand", "clear": "geen", "Loaded": "Geladen",

  /* ---------- reports / scenarios / transactions / dataroom ---------- */
  "Portfolio reporting": "Portefeuillerapportage", "Portfolio overview": "Portefeuilleoverzicht",
  "Reporting": "Rapportage", "Download PDF": "Download pdf", "Prepare export": "Export voorbereiden",
  "Geographic exposure": "Geografische spreiding", "Operating positions": "Exploitatieposities",
  "Operating trend": "Exploitatietrend", "Investment review": "Investeringsbeoordeling",
  "Planning": "Planning", "Assumptions": "Uitgangspunten", "Base case": "Basisscenario",
  "Scenario NOI": "Scenario-NOI", "Sensitivity grid": "Gevoeligheidsmatrix",
  "Stress test": "Stresstest", "Save scenario": "Scenario opslaan", "Save": "Opslaan",
  "Cancel": "Annuleren", "Exit yield": "Exit-rendement", "Yield / rent growth": "Rendement / huurgroei",
  "Scenario assumptions saved to the planning workspace.":
    "Scenario-uitgangspunten opgeslagen in de planningswerkruimte.",
  "Review leasing plan and capital requirements":
    "Beoordeel verhuurplan en kapitaalbehoefte",
  "Asset plan · vacancy and lease-up review": "Objectplan · leegstand en verhuurbeoordeling",
  "Transaction": "Transactie",
  "Acquisition, disposal and share-deal screen": "Toets voor aankoop, verkoop en aandelentransactie",
  "Development programme": "Ontwikkelprogramma",
  "Development & capital projects": "Ontwikkeling & kapitaalprojecten",
  "Portfolio data room": "Portefeuilledataroom", "Diligence index": "Due-diligence-index",
  "Controlled documents": "Beheerde documenten",
  "Controlled property documents": "Beheerde objectdocumenten",
  "Document type": "Documenttype", "Selected document": "Geselecteerd document",
  "Selected folder": "Geselecteerde map", "Upload a document": "Document uploaden",
  "Access": "Toegang", "Access directory": "Toegangsoverzicht", "View": "Bekijken",
  "Corporate calendar files in review": "Vennootschappelijke agendastukken in beoordeling",
  "WOZ, VAT, ownership and review evidence": "WOZ, btw, eigendom en beoordelingsbewijs",

  /* ---------- advisor / alerts ---------- */
  "Decision desk": "Beslissingsdesk", "Decision support": "Beslissingsondersteuning",
  "Decision queue": "Beslissingswachtrij", "Open decision desk": "Open beslissingsdesk",
  "Add to decision queue": "Toevoegen aan beslissingswachtrij",
  "Portfolio query": "Portefeuillevraag", "Portfolio prompts": "Portefeuillevragen",
  "Prebuilt queries": "Vooraf ingestelde vragen", "Context scoped": "Contextgebonden",
  "Grounded assessment": "Onderbouwde beoordeling", "Data used": "Gebruikte gegevens",
  "Ask a portfolio question.": "Stel een vraag over de portefeuille.",
  "Ask about value, risk, leasing, debt, energy or capex":
    "Vraag naar waarde, risico, verhuur, schuld, energie of capex",
  "Ask portfolio intelligence": "Vraag het aan portefeuille-intelligence",
  "Which assets should be reviewed this week?": "Welke objecten moeten deze week worden beoordeeld?",
  "What is driving the current arrears exposure?": "Wat veroorzaakt de huidige achterstandspositie?",
  "Show the capital plan for assets below energy target.":
    "Toon het kapitaalplan voor objecten onder de energiedoelstelling.",
  "What is the lease expiry risk in the next 24 months?":
    "Wat is het expiratierisico van huurcontracten in de komende 24 maanden?",
  "Open arrears": "Openstaande achterstanden", "CPI indexation dates": "CPI-indexeringsdata",
  "Critical maintenance issues": "Kritieke onderhoudsmeldingen",
  "Daily, weekly and urgent alerts": "Dagelijkse, wekelijkse en urgente meldingen",
  "Daily": "Dagelijks", "Weekly": "Wekelijks", "daily": "dagelijks", "weekly": "wekelijks",
  "digest": "samenvatting", "Owner digest": "Eigenaarssamenvatting",
  "Owner channel": "Eigenaarskanaal", "Owner email": "E-mail eigenaar",
  "Owner email escalation": "E-mailescalatie eigenaar",
  "Email review schedule": "E-mailbeoordelingsschema", "Email": "E-mail",
  "Escalation enabled": "Escalatie ingeschakeld", "Escalation disabled": "Escalatie uitgeschakeld",
  "Urgent issue delivery": "Bezorging urgente meldingen",
  "Personal alerts and digest delivery": "Persoonlijke meldingen en samenvattingen",
  "Send an immediate owner alert when a high-priority work order is created.":
    "Stuur direct een melding aan de eigenaar wanneer een werkorder met hoge prioriteit wordt aangemaakt.",
  "Preference saved.": "Voorkeur opgeslagen."
});

Object.assign(window.__EK_NL_DICT__, {
  /* ---------- portals / roles / tenant ---------- */
  "Role workspace": "Rolwerkruimte", "Owner workspace": "Eigenaarswerkruimte",
  "Open owner workspace": "Open eigenaarswerkruimte", "Tenant workspace": "Huurderswerkruimte",
  "Property manager": "Vastgoedbeheerder", "Accountant": "Accountant", "Adviser": "Adviseur",
  "Partner": "Partner", "Review queue": "Beoordelingswachtrij",
  "Records requiring attention": "Registraties die aandacht vragen",
  "Selected record": "Geselecteerde registratie",
  "Add to review queue": "Toevoegen aan beoordelingswachtrij",
  "Return to review": "Terug naar beoordeling", "Review": "Beoordeling",
  "Select a record from the review queue to focus this participant’s next portfolio action.":
    "Selecteer een registratie uit de beoordelingswachtrij om de volgende portefeuilleactie van deze deelnemer te bepalen.",
  "Tenant account": "Huurdersaccount", "Your tenancy": "Uw huurovereenkomst",
  "Your agreement": "Uw overeenkomst", "Tenant updates": "Huurdersupdates",
  "No issues submitted from this tenant account.":
    "Geen meldingen ingediend vanuit dit huurdersaccount.",
  "Document selected for your property manager.":
    "Document geselecteerd voor uw vastgoedbeheerder.",
  "Portal access": "Portaaltoegang", "Portal + email": "Portaal + e-mail",
  "Owner / authorised advisers": "Eigenaar / gemachtigde adviseurs",

  /* ---------- setup / connections / settings ---------- */
  "Connect": "Koppelen", "Connection requested": "Koppeling aangevraagd",
  "Ready for connection": "Gereed voor koppeling", "Configured for setup": "Ingericht voor setup",
  "Provider selection required": "Aanbiederkeuze vereist",
  "Provider-neutral import and connector layer": "Aanbiederneutrale import- en koppellaag",
  "Licensed Kadaster and valuation-provider route": "Route via Kadaster en taxatie-aanbieders",
  "Market data": "Marktdata", "Market data connection request created.":
    "Koppelverzoek voor marktdata aangemaakt.",
  "Financial data connection request created.":
    "Koppelverzoek voor financiële gegevens aangemaakt.",
  "Owner email connection request created.": "Koppelverzoek voor e-mail eigenaar aangemaakt.",
  "DocuSign connection request created.": "Koppelverzoek voor DocuSign aangemaakt.",
  "WOZ, transactions and benchmark data": "WOZ-, transactie- en benchmarkgegevens",
  "Security": "Beveiliging", "Last updated": "Laatst bijgewerkt",
  "Updated today": "Vandaag bijgewerkt", "Updated yesterday": "Gisteren bijgewerkt",

  /* ---------- auth / errors / misc chrome ---------- */
  "Sign in": "Inloggen", "Sign in to view portfolio information.":
    "Log in om portefeuille-informatie te bekijken.",
  "Your workspace and every record inside it are secured by user role and portfolio membership.":
    "Uw werkruimte en elke registratie daarin zijn beveiligd op basis van gebruikersrol en portefeuillelidmaatschap.",
  "This account is inactive.": "Dit account is inactief.",
  "Contact the portfolio owner to restore access.":
    "Neem contact op met de portefeuille-eigenaar om toegang te herstellen.",
  "An unexpected error occurred.": "Er is een onverwachte fout opgetreden.",
  "Reload Page": "Pagina herladen", "Zoom in": "Inzoomen", "Zoom out": "Uitzoomen",
  "Toggle attribution": "Bronvermelding tonen", "Search assets or ownership": "Zoek objecten of eigendom",
  "Search building, city or address": "Zoek gebouw, plaats of adres",
  "Property search": "Objectzoekopdracht", "Asset record sections": "Secties objectdossier",
  "Selected": "Geselecteerd", "Selected asset": "Geselecteerd object",
  "Record": "Registratie", "All": "Alle", "From": "Van", "To": "Tot", "Use": "Gebruik",
  "Rule": "Regel", "Structure": "Structuur", "Distribution": "Uitkering",
  "Asset management": "Vastgoedbeheer", "Frisia Asset Management": "Frisia Asset Management",
  "North cluster": "Noordcluster", "before tax": "vóór belasting",
  "actions": "acties", "records": "registraties", "locations": "locaties",
  "driver": "aanjager", "risk": "risico", "units.": "eenheden.",
  "m² lettable area ·": "m² verhuurbaar oppervlak ·", "· Asset ID": "· Object-ID",
  "· Owner:": "· Eigenaar:", "kWh/m²": "kWh/m²",
  "The assistant reads the current": "De assistent leest het huidige",
  "-asset record, including leases, arrears, debt, energy, capex, risk, inspection, insurance, permit, tax and ownership fields.":
    "-objectdossier, inclusief velden voor huurcontracten, achterstanden, schuld, energie, capex, risico, inspectie, verzekering, vergunning, fiscaliteit en eigendom.",
  ". Evidence is indexed for review and controlled sharing.":
    ". Bewijsstukken worden geïndexeerd voor beoordeling en beheerd delen.",
  "The live portfolio does not contain entity tax returns, tax-book values, tenant VAT declarations, tax EBITDA, personal residence facts or signed transaction documents. The platform therefore flags what to investigate, rather than labelling a strategy as best.":
    "De live portefeuille bevat geen aangiften van entiteiten, fiscale boekwaarden, btw-verklaringen van huurders, fiscale EBITDA, gegevens over persoonlijke woonplaats of ondertekende transactiedocumenten. Het platform geeft daarom aan wat onderzocht moet worden, in plaats van een strategie als beste te bestempelen.",
  "Run before every asset acquisition, restructuring, disposal or property-rich share transaction.":
    "Uit te voeren vóór elke aankoop, herstructurering, verkoop of aandelentransactie in vastgoedrijke entiteiten.",
  "For every acquisition, disposal, refinancing, restructuring or property-company share deal: confirm legal entity, intended property use, VAT position, RETT scope, debt model, tax book value, WOZ evidence and ownership chain.":
    "Bevestig bij elke aankoop, verkoop, herfinanciering, herstructurering of aandelentransactie in een vastgoedvennootschap: rechtspersoon, beoogd gebruik, btw-positie, reikwijdte overdrachtsbelasting, financieringsmodel, fiscale boekwaarde, WOZ-bewijs en eigendomsketen.",
  "RETT can apply to direct real estate, rights in rem and shares in a BV/NV whose assets are predominantly real estate.":
    "Overdrachtsbelasting kan van toepassing zijn op direct vastgoed, beperkte rechten en aandelen in een bv/nv waarvan de bezittingen overwegend uit vastgoed bestaan.",
  "A parent and subsidiaries can request fiscal-unity treatment for corporate income tax, subject to ownership, voting, profit, capital and legal-form conditions.":
    "Een moedermaatschappij en dochters kunnen een fiscale eenheid voor de vennootschapsbelasting aanvragen, mits wordt voldaan aan voorwaarden inzake eigendom, stemrecht, winst, kapitaal en rechtsvorm.",
  "For corporate income tax, building depreciation stops when the WOZ value floor is reached.":
    "Voor de vennootschapsbelasting stopt de afschrijving op gebouwen zodra de WOZ-bodemwaarde is bereikt.",
  "Use for proposed dividends, cash extraction and share-sale scenarios; keep it separate from property cash flow.":
    "Gebruik dit voor voorgenomen dividenden, kasonttrekking en verkoopscenario's van aandelen; houd dit gescheiden van de vastgoedkasstroom.",
  "Lease, tenant VAT status, use percentage, declaration, historic VAT recovery and contract clause.":
    "Huurcontract, btw-status van de huurder, gebruikspercentage, verklaring, historische btw-teruggaaf en contractbepaling.",
  "Cap table, voting/economic rights, legal-form and residence evidence, entity forecasts, loss profiles and existing elections.":
    "Kapitaalstructuur, stem- en economische rechten, bewijs van rechtsvorm en vestigingsplaats, prognoses per entiteit, verliesposities en bestaande keuzes.",
  "Transaction structure, intended use, valuations, property-company balance sheet, notary pack and formal tax opinion.":
    "Transactiestructuur, beoogd gebruik, taxaties, balans van de vastgoedvennootschap, notarieel dossier en formeel fiscaal advies.",
  "Valuation, debt, lease events, risk and decision support.":
    "Taxatie, financiering, huurgebeurtenissen, risico en beslissingsondersteuning.",
  "Value, rent, occupancy, arrears, energy and risk":
    "Waarde, huur, bezetting, achterstanden, energie en risico",
  "Principal distribution and disposal planning": "Planning van hoofduitkering en verkoop",
  "Principal distribution and disposal planning: evidence request logged.":
    "Planning van hoofduitkering en verkoop: bewijsverzoek vastgelegd."
});

Object.assign(window.__EK_NL_DICT__, {
  "Portfolio map": "Portefeuillekaart", "Asset geography": "Objectgeografie",
  "Portfolio workspace · Netherlands": "Portefeuillewerkruimte · Nederland",
  "assets": "objecten", "exceptions": "aandachtspunten", "vacancy": "leegstand",
  "Below 75%": "Onder 75%", "Selected control": "Geselecteerde beheersmaatregel"
});
window.__EK_NL_RULES__.push(
  [/^(€ ?[\d.,]+) outstanding$/, "$1 uitstaand"],
  [/^(€ ?[\d.,]+) \/ yr$/, "$1 / jaar"],
  [/^(.+) outstanding$/, "$1 uitstaand"]
);

var EK_MONTH = { Jan:"jan", Feb:"feb", Mar:"mrt", Apr:"apr", May:"mei", Jun:"jun",
                 Jul:"jul", Aug:"aug", Sep:"sep", Oct:"okt", Nov:"nov", Dec:"dec" };
Object.assign(window.__EK_NL_DICT__, {
  "Annual": "Jaarlijks", "Assets": "Objecten", "Asset-specific": "Objectspecifiek",
  "Address to confirm": "Adres te bevestigen", "Location to confirm": "Locatie te bevestigen",
  "Annual contracted share": "Jaarlijks gecontracteerd aandeel",
  "Asset inspection register": "Objectinspectieregister",
  "Asset risk register": "Objectrisicoregister", "Risk register": "Risicoregister",
  "Control register": "Beheersregister", "Review register": "Beoordelingsregister",
  "Transfer register": "Overdrachtsregister", "Tax treatment register": "Register fiscale behandeling",
  "Lease register": "Huurregister", "Live lease register": "Actueel huurregister",
  "Asset register export prepared for review.": "Export objectregister gereed voor beoordeling.",
  "Asset-level co-owner exposure is available in the asset register and property file.":
    "Mede-eigendomsposities op objectniveau zijn beschikbaar in het objectregister en het objectdossier.",
  "Commercial, mixed or hospitality assets": "Commerciële, gemengde of horecaobjecten",
  "Current portfolio records": "Actuele portefeuilleregistraties",
  "Issues, inspections and 12-month capex": "Meldingen, inspecties en 12-maands capex",
  "No objection window open": "Geen bezwaartermijn open",
  "Filter by co-owner": "Filter op mede-eigenaar",
  "Filter by ownership vehicle": "Filter op houdstervehikel",
  "Use & fire-safety permit": "Gebruiks- en brandveiligheidsvergunning",
  "Belastingdienst · interest limitation": "Belastingdienst · renteaftrekbeperking",
  "Belastingdienst · transfer tax": "Belastingdienst · overdrachtsbelasting",
  "Box 1 assets": "Box 1-vermogen", "WOZ, Box 1 / Box 3 and BTW position": "WOZ, box 1 / box 3 en btw-positie",
  "To / above €200k taxable profit": "Tot / boven € 200k belastbare winst",
  "Two-person approval above €250k": "Vierogenprincipe boven € 250k",
  "Covenant floor 1.25x": "Convenantondergrens 1,25x",
  "Above 120 kWh/m²": "Boven 120 kWh/m²", "Below 85% occupied": "Onder 85% verhuurd",
  "Ending by 2027": "Aflopend vóór 2027", "At 6.25% yield": "Bij 6,25% rendement",
  "+100 bps rate": "+100 bp rente", "-15% value": "-15% waarde",
  "% occupied across": "% verhuurd over", "% INTEREST": "% BELANG",
  "units · Built": "eenheden · Bouwjaar",
  "Sensitivity: vacancy +5pp reduces annual rent by":
    "Gevoeligheid: leegstand +5pp verlaagt de jaarhuur met",
  "Pro rata after operating costs, annual debt service and a 15% reserve against the current 12-month capex plan; before personal tax.":
    "Naar rato na exploitatiekosten, jaarlijkse schuldendienst en een reserve van 15% op het huidige 12-maands capexplan; vóór inkomstenbelasting.",
  "Decision support only. This register identifies the information a Dutch tax professional needs; it does not calculate a personal tax liability or make an election.":
    "Uitsluitend beslissingsondersteuning. Dit register benoemt welke informatie een Nederlandse fiscalist nodig heeft; het berekent geen persoonlijke belastingschuld en maakt geen keuze.",
  "Box 2 covers dividends and share-disposal gains from a substantial interest; the published 2026 bands are 24.5% to €68,843 and 31% above it.":
    "Box 2 ziet op dividenden en vervreemdingswinsten uit aanmerkelijk belang; de gepubliceerde schijven voor 2026 zijn 24,5% tot € 68.843 en 31% daarboven.",
  "Net interest can be non-deductible above both 24.5% of profit and €1,000,000, with carry-forward of non-deductible interest.":
    "Nettorente kan niet aftrekbaar zijn boven zowel 24,5% van de winst als € 1.000.000, waarbij niet-aftrekbare rente voortwentelbaar is.",
  "VAT-taxed letting requires a VAT entrepreneur tenant, the 90%/70% use test and documented joint election; residential use is excluded.":
    "Btw-belaste verhuur vereist een huurder die btw-ondernemer is, de 90%/70%-gebruikstoets en een vastgelegd gezamenlijk optieverzoek; woongebruik is uitgesloten.",
  "Entity-level tax EBITDA, interest paid and received, carry-forward register, financing terms and fiscal-unity position.":
    "Fiscale EBITDA per entiteit, betaalde en ontvangen rente, voortwentelingsregister, financieringsvoorwaarden en positie fiscale eenheid.",
  "Fixed-asset register, tax book value, current and prior WOZ decisions, land/building allocation and renovation ledger.":
    "Activaregister, fiscale boekwaarde, huidige en eerdere WOZ-beschikkingen, splitsing grond/opstal en renovatiegrootboek.",
  "Principal tax residence, substantial-interest position, other Box 2 income, withholding tax, board papers and personal forecast.":
    "Fiscale woonplaats, aanmerkelijkbelangpositie, overige box 2-inkomsten, bronbelasting, bestuursstukken en persoonlijke prognose."
});
window.__EK_NL_RULES__.push(
  [/^Open (.+): (\d[\d.,]*) assets?$/, function (m, a, n) {
     var d = window.__EK_NL_DICT__[a] || a; return "Open " + d + ": " + n + " object" + (n === "1" ? "" : "en"); }],
  [/^(.+): (\d[\d.,]*) assets?$/, function (m, a, n) {
     var d = window.__EK_NL_DICT__[a] || a; return d + ": " + n + " object" + (n === "1" ? "" : "en"); }],
  [/^(\d+) open work items?$/, "$1 openstaande werkpunten"],
  [/^Operational review · (\d+) open items?$/, "Operationele beoordeling · $1 openstaande punten"],
  [/^(\d+) ownership vehicles are present in the portfolio register\.$/,
   "$1 eigendomsvehikels zijn aanwezig in het portefeuilleregister."],
  [/^Occupier lease (\d+)$/, "Gebruikershuurcontract $1"],
  [/^Lease register downloaded with ([\d.,]+) portfolio records\.$/,
   "Huurregister gedownload met $1 portefeuilleregistraties."],
  [/^Collections report downloaded with ([\d.,]+) portfolio records\.$/,
   "Incassorapport gedownload met $1 portefeuilleregistraties."],
  [/^Dutch tax review downloaded with ([\d.,]+) portfolio records\.$/,
   "Nederlandse fiscale toets gedownload met $1 portefeuilleregistraties."],
  [/^Maintenance report downloaded with ([\d.,]+) portfolio records\.$/,
   "Onderhoudsrapport gedownload met $1 portefeuilleregistraties."],
  [/^Ownership report downloaded with ([\d.,]+) portfolio records\.$/,
   "Eigendomsrapport gedownload met $1 portefeuilleregistraties."],
  [/^Portfolio overview downloaded with ([\d.,]+) portfolio records\.$/,
   "Portefeuilleoverzicht gedownload met $1 portefeuilleregistraties."],
  [/^(.+) · fixed rate ends (\d{1,2}) (\w{3}) (\d{4})$/, function (m, a, d, mo, y) {
     return a + " · rentevast tot " + d + " " + (EK_MONTH[mo] || mo) + " " + y; }],
  [/^Next inspection (\d{1,2}) (\w{3}) (\d{4})\. (\d+) open operational items? require control review\.$/,
   function (m, d, mo, y, n) {
     return "Volgende inspectie " + d + " " + (EK_MONTH[mo] || mo) + " " + y + ". " + n +
            " openstaande operationele punten vragen om beoordeling."; }],
  [/^a\.s\.r\. Real Estate policy\. Coverage (.+); validate insured use against the current lease stack\.$/,
   "a.s.r. Real Estate-polis. Dekking $1; toets het verzekerde gebruik aan de huidige huurstapel."]
);

Object.assign(window.__EK_NL_DICT__, {
  "assets · reconciliation required": "objecten · afstemming vereist",
  "assets require a tax-book-value to current-WOZ reconciliation.":
    "objecten vereisen een afstemming van fiscale boekwaarde met de actuele WOZ-waarde.",
  "commercial, mixed or hospitality assets require unit-level classification.":
    "commerciële, gemengde of horecaobjecten vereisen classificatie op eenheidsniveau."
});

Object.assign(window.__EK_NL_DICT__, {
  "% occupied": "% verhuurd", "% occ.": "% bez.", "% LTV headroom": "% LTV-ruimte"
});
/* Dutch number formatting for the few values the app renders with a decimal point */
window.__EK_NL_RULES__.push(
  [/^(\d+)\.(\d+)%$/, "$1,$2%"],
  [/^(\d+)\.(\d+)% op WOZ$/, "$1,$2% op WOZ"],
  [/^(\d+)\.(\d+)% verhuurd$/, "$1,$2% verhuurd"],
  [/^(\d+)\.(\d+)x DSCR$/, "$1,$2x DSCR"],
  [/^(\d+)\.(\d+)y$/, "$1,$2 jr"],
  [/^(\d+)y$/, "$1 jr"],
  [/^(\d+)\.(\d+) jaar$/, "$1,$2 jaar"]
);

/* --- aanvullingen: convenanten, werkorders, bankpagina en begrippen --- */
Object.assign(window.__EK_NL_DICT__, {
  "Bank policy limit 55% LTV": "Interne bankgrens: maximaal 55% LTV",
  "76% on fixed rates": "76% tegen vaste rente",
  "Minimum under bank covenant 1.25x": "Minimum volgens bankconvenant 1,25x",
  "Maximum LTV under bank covenant": "Maximale LTV volgens bankconvenant",
  "Covenant headroom": "Ruimte tot de convenantgrenzen",
  "Covenant floor 1.25x": "Ondergrens volgens convenant 1,25x",
  "Policy limit 55%": "Interne grens 55%",
  "Policy LTV limit": "Maximale LTV volgens beleid",
  "Assigned to": "Uitbesteed aan",
  "Bouwteam (eigen ploeg)": "Bouwteam (eigen ploeg)",
  "Synergy Installatietechniek": "Synergy Installatietechniek",
  "Maintenance control": "Onderhoudsbeheer",
  "Work order queue": "Werkorderwachtrij",
  "Base case": "Basisscenario",
  "Stress test": "Stresstest",
  "Weighted rate": "Gewogen rente",
  "Debt outstanding": "Uitstaande schuld",
  "Portfolio LTV": "Portefeuille-LTV"
});
window.__EK_NL_RULES__.push(
  [/^Installations · (\d+) open items?$/, "Installaties · $1 openstaande punten"],
  [/^Repairs & finishing · (\d+) open items?$/, "Herstel en afwerking · $1 openstaande punten"],
  [/^Renovation · (\d+) open items?$/, "Verbouwing · $1 openstaande punten"],
  [/^(\d[\d.,]*) facilities$/, "$1 faciliteiten"],
  [/^LTV ([\d.,]+)%$/, "LTV $1%"],
  [/^DSCR ([\d.,]+)x$/, "DSCR $1x"],
  [/^\+(\d+) bps rate$/, "+$1 bp rente"],
  [/^-(\d+)% NOI$/, "-$1% NOI"],
  [/^-(\d+)% value$/, "-$1% waarde"]
);

/* --- aanvullingen: huurdersportaal, fiscale behandeling, ESG --- */
Object.assign(window.__EK_NL_DICT__, {
  "Take a photo": "Maak foto",
  "Add a file": "Bestand toevoegen",
  "Upload a document": "Bestand toevoegen",
  "Box 3 \u00b7 private holding": "Box 3 \u00b7 privébezit",
  "Corporate income tax (BV)": "Vennootschapsbelasting (B.V.)",
  "ERKO Dokkum Beheer B.V.": "ERKO Dokkum Beheer B.V.",
  "Epie Kooistra": "Epie Kooistra",
  "Kooistra Beheer B.V.": "Kooistra Beheer B.V.",
  "Professional-review boundary": "Grens van de beoordeling",
  "Mandatory transaction screen": "Verplichte transactietoets",
  "Run before signing": "Doorlopen vóór ondertekening"
});
window.__EK_NL_RULES__.push(
  [/^Attached: (.+)$/, "Toegevoegd: $1"],
  [/^Ready to submit: (.+)$/, "Klaar om te versturen: $1"]
);

Object.assign(window.__EK_NL_DICT__, {
  "Vacant - active leasing mandate": "Leeg - actieve verhuuropdracht"
});

/* --- laatste Engelse restanten --- */
Object.assign(window.__EK_NL_DICT__, {
  "Low": "Laag", "Moderate": "Gemiddeld", "Elevated": "Verhoogd", "High": "Hoog",
  "Low risk": "Laag risico", "Moderate risk": "Gemiddeld risico",
  "Elevated risk": "Verhoogd risico", "High risk": "Hoog risico",
  "No material exceptions": "Geen materiële afwijkingen",
  "Private tenant": "Particuliere huurder",
  "Updated today": "Vandaag bijgewerkt",
  "Updated yesterday": "Gisteren bijgewerkt",
  "Ownership & governance": "Eigendom & zeggenschap",
  "Governance": "Zeggenschap",
  "Governance review": "Beoordeling zeggenschap",
  "Open governance file": "Open het zeggenschapsdossier",
  "Annual ownership review": "Jaarlijkse eigendomsbeoordeling",
  "Doorsturen Amarens": "Doorsturen Amarens"
});
window.__EK_NL_RULES__.push(
  [/^Updated (\d+) days? ago$/, "Bijgewerkt $1 dagen geleden"],
  [/^Updated (\d{1,2}) Jan (\d{4})$/, "Bijgewerkt $1 jan $2"],
  [/^Updated (\d{1,2}) Feb (\d{4})$/, "Bijgewerkt $1 feb $2"],
  [/^Updated (\d{1,2}) Mar (\d{4})$/, "Bijgewerkt $1 mrt $2"],
  [/^Updated (\d{1,2}) Apr (\d{4})$/, "Bijgewerkt $1 apr $2"],
  [/^Updated (\d{1,2}) May (\d{4})$/, "Bijgewerkt $1 mei $2"],
  [/^Updated (\d{1,2}) Jun (\d{4})$/, "Bijgewerkt $1 jun $2"],
  [/^Updated (\d{1,2}) Jul (\d{4})$/, "Bijgewerkt $1 jul $2"],
  [/^Updated (\d{1,2}) Aug (\d{4})$/, "Bijgewerkt $1 aug $2"],
  [/^Updated (\d{1,2}) Sep (\d{4})$/, "Bijgewerkt $1 sep $2"],
  [/^Updated (\d{1,2}) Oct (\d{4})$/, "Bijgewerkt $1 okt $2"],
  [/^Updated (\d{1,2}) Nov (\d{4})$/, "Bijgewerkt $1 nov $2"],
  [/^Updated (\d{1,2}) Dec (\d{4})$/, "Bijgewerkt $1 dec $2"]
);

Object.assign(window.__EK_NL_DICT__, {
  "Holiday": "Vakantieverhuur",
  "Holiday lettings": "Vakantieverhuur"
});
