/* Werkruimte Inkomende e-mail - AI-triage van de mailbox: spam eruit, dringend eruit gelicht,
   follow-ups bewaakt en een concept-antwoord in Erics eigen toon. Tweetalig (NL/EN). */
(function () {
  var T = function (nl, en) { return (window.__EK_T ? window.__EK_T(nl, en) : nl); };
  var LBL = "text-[9px] font-bold uppercase tracking-[0.13em] text-slate-500";
  var CARD = "border border-[#d9ddd6] bg-white";
  var filter = "actie";
  var geopend = null;
  var concepten = {};
  var doorgestuurd = {};

  function berichten() {
    return [
      { id: "m1", van: "mr. R. van Dijk", adres: "vandijk@curatoren-nf.nl", tijd: "08:52",
        onderwerp: T("Faillissement tuincentrumketen - biedingstermijn", "Bankruptcy garden-centre chain - bidding deadline"),
        klasse: "dringend", categorie: T("Handel · kans", "Trading · opportunity"), deadline: T("vandaag 17:00", "today 17:00"),
        fragment: T("De inventaris van vier vestigingen komt beschikbaar. Biedingen graag vóór vanmiddag 17:00, onder voorbehoud van goedkeuring rechter-commissaris.",
                    "The inventory of four branches becomes available. Bids by 17:00 this afternoon, subject to approval by the supervisory judge."),
        ai: T("Kans met een harde deadline vandaag. De radar schat de partij op € 620k; een vergelijkbaar dossier uit 2024 leverde 31% marge. Zonder bod vóór 17:00 vervalt de kans.",
              "Opportunity with a hard deadline today. The radar values the lot at € 620k; a comparable 2024 file returned a 31% margin. Without a bid before 17:00 the chance lapses."),
        actie: T("Bod uitbrengen of afzien", "Place a bid or decline"),
        concept: T("Beste heer Van Dijk,\n\nDank voor de aanmelding. Wij zijn geïnteresseerd in de volledige partij, in één koop en zonder voorbehoud van financiering.\n\nWij bieden een vast bedrag voor de complete inventaris van alle vier de vestigingen, af te halen binnen tien werkdagen na gunning, in eigen vervoer en met eigen personeel. De panden leveren wij bezemschoon op.\n\nGraag hoor ik vandaag of dit werkbaar is; dan sturen wij het bod vóór 17:00 formeel per mail.\n\nMet vriendelijke groet,\nEric Kooistra\nKooistra.com",
                   "Dear mr Van Dijk,\n\nThank you for the notice. We are interested in the entire lot, in a single purchase and without a financing condition.\n\nWe offer a fixed amount for the complete inventory of all four branches, collected within ten working days of award, with our own transport and staff. We hand the premises back swept clean.\n\nPlease let me know today whether this works; we will then send the formal bid before 17:00.\n\nKind regards,\nEric Kooistra\nKooistra.com") },

      { id: "m2", van: "Gemeente Noardeast-Fryslân", adres: "omgeving@noardeast-fryslan.nl", tijd: "08:20",
        onderwerp: T("Ontvangstbevestiging aanvraag OMG-2026-04471", "Acknowledgement of application OMG-2026-04471"),
        klasse: "actie", categorie: T("Vastgoed · vergunning", "Property · permit"), deadline: T("reactie binnen 4 weken", "reply within 4 weeks"),
        fragment: T("Uw aanvraag voor verruiming van de horeca-categorie is ontvangen. Wij verzoeken u een akoestisch onderzoek aan te leveren.",
                    "Your application to widen the hospitality category has been received. We request an acoustic survey."),
        ai: T("Hoort bij het horecaplein (Sense × Brouwerij Dockum). Het akoestisch onderzoek is de enige ontbrekende bijlage; zonder dat stuk gaat de beslistermijn niet lopen.",
              "Relates to the hospitality square (Sense × Brouwerij Dockum). The acoustic survey is the only missing attachment; without it the decision period does not start."),
        actie: T("Akoestisch bureau opdracht geven", "Instruct an acoustics consultant"),
        concept: T("Geachte heer/mevrouw,\n\nDank voor de bevestiging. Het akoestisch onderzoek is inmiddels uitgezet; wij verwachten het rapport binnen drie weken aan te kunnen leveren.\n\nMocht u in de tussentijd nog stukken missen, dan hoor ik dat graag in één keer, zodat we de aanvraag in één ronde compleet krijgen.\n\nMet vriendelijke groet,\nEric Kooistra\nEYE Vastgoed B.V.",
                   "Dear sir or madam,\n\nThank you for the acknowledgement. The acoustic survey has been commissioned; we expect to submit the report within three weeks.\n\nIf any other documents are missing, I would appreciate hearing it in one go so we can complete the application in a single round.\n\nKind regards,\nEric Kooistra\nEYE Vastgoed B.V.") },

      { id: "m3", van: T("Jelke · Synergy Installatietechniek", "Jelke · Synergy Installatietechniek"), adres: "jelke@synergy-installatie.nl", tijd: "07:58",
        onderwerp: T("Planning storingen week 36 - vier objecten", "Scheduling breakdowns week 36 - four assets"),
        klasse: "actie", categorie: T("Onderhoud · planning", "Maintenance · scheduling"), deadline: T("antwoord vóór donderdag", "reply before Thursday"),
        fragment: T("We kunnen de vier openstaande installatiemeldingen in één ronde meenemen als we donderdag toegang hebben.",
                    "We can handle the four open installation items in one round if we have access on Thursday."),
        ai: T("Vier werkorders in één rit scheelt ongeveer een halve dag voorrijden. Alleen bij Frisia House Lemmer moet de huurder toegang regelen.",
              "Four work orders in one run saves roughly half a day of travel. Only at Frisia House Lemmer does the tenant need to arrange access."),
        actie: T("Toegang bevestigen bij de huurders", "Confirm access with the tenants"),
        concept: T("Hoi,\n\nPrima, doe donderdag maar in één ronde. Ik regel vandaag de toegang bij Frisia House Lemmer; de andere drie zijn vrij toegankelijk.\n\nAls er iets tegenvalt aan de installatie, bel me dan even voordat je doorpakt - dan beslissen we meteen of het Bouwteam het overneemt.\n\nGroet,\nEric",
                   "Hi,\n\nFine, do it all in one run on Thursday. I will arrange access at Frisia House Lemmer today; the other three are freely accessible.\n\nIf anything looks worse than expected, call me before you carry on - then we decide straight away whether the Bouwteam takes it over.\n\nBest,\nEric") },

      { id: "m4", van: "Achmea Vastgoed - schadebehandeling", adres: "schade@achmeavastgoed.nl", tijd: "gisteren 16:44",
        onderwerp: T("Club33 - tweede termijn na gereedmelding", "Club33 - second instalment after completion notice"),
        klasse: "follow", categorie: T("Verzekering · claim", "Insurance · claim"), deadline: T("wacht 9 dagen op antwoord", "awaiting reply for 9 days"),
        fragment: T("Wij ontvangen graag de planning van de herbouw voordat de tweede termijn in behandeling wordt genomen.",
                    "We would like the rebuild schedule before the second instalment is processed."),
        ai: T("Deze vraag ligt er negen dagen. De tweede termijn van € 490.000 blijft geblokkeerd zolang de planning ontbreekt. Dit is de duurste openstaande follow-up in de mailbox.",
              "This request has been open for nine days. The second instalment of € 490,000 stays blocked while the schedule is missing. It is the most expensive open follow-up in the mailbox."),
        actie: T("Herbouwplanning sturen", "Send the rebuild schedule"),
        concept: T("Geachte heer/mevrouw,\n\nExcuses voor de vertraging. De vergunning is verleend en de start bouw staat gepland in het vierde kwartaal van dit jaar, met oplevering in het tweede kwartaal van 2027.\n\nIk stuur de planning van de aannemer vandaag mee als bijlage. Graag verneem ik daarna wanneer de tweede termijn in behandeling wordt genomen.\n\nMet vriendelijke groet,\nEric Kooistra\nEYE Vastgoed B.V.",
                   "Dear sir or madam,\n\nApologies for the delay. The permit has been granted and construction is planned to start in the fourth quarter of this year, with completion in the second quarter of 2027.\n\nI am attaching the contractor's schedule today. I would then like to know when the second instalment will be processed.\n\nKind regards,\nEric Kooistra\nEYE Vastgoed B.V.") },

      { id: "m5", van: T("Huurder Zuidhorn 11", "Tenant Zuidhorn 11"), adres: "j.dewit@example.nl", tijd: "gisteren 14:12",
        onderwerp: T("Betalingsregeling huurachterstand", "Payment plan for rent arrears"),
        klasse: "actie", categorie: T("Incasso", "Collections"), deadline: T("antwoord binnen 3 dagen", "reply within 3 days"),
        fragment: T("Ik wil de achterstand in drie termijnen inlopen, naast de lopende huur.",
                    "I would like to clear the arrears in three instalments, alongside the current rent."),
        ai: T("Voorstel past binnen het incassobeleid: geen post ouder dan 90 dagen en de lopende huur wordt doorbetaald. Vastleggen in een korte regeling voorkomt escalatie.",
              "The proposal fits the collections policy: nothing older than 90 days and the running rent keeps being paid. Recording it in a short agreement prevents escalation."),
        actie: T("Regeling bevestigen en vastleggen", "Confirm and record the arrangement"),
        concept: T("Beste heer De Wit,\n\nDank voor uw bericht en voor het initiatief. Drie termijnen naast de lopende huur is akkoord.\n\nIk stuur u vandaag een korte bevestiging met de bedragen en de data. Zolang de termijnen en de gewone huur op tijd binnen zijn, ondernemen wij verder geen stappen.\n\nMet vriendelijke groet,\nEric Kooistra",
                   "Dear mr De Wit,\n\nThank you for your message and for taking the initiative. Three instalments alongside the running rent is agreed.\n\nI will send you a short confirmation today with the amounts and dates. As long as the instalments and the normal rent arrive on time, we will take no further steps.\n\nKind regards,\nEric Kooistra") },

      { id: "m6", van: "Dijkstra Draisma", adres: "calculatie@dijkstradraisma.nl", tijd: "gisteren 11:30",
        onderwerp: T("Offerte gevelherstel Achmeatoren - herziene versie", "Quotation façade repair Achmeatoren - revised"),
        klasse: "actie", categorie: T("Bouw · offerte", "Construction · quotation"), deadline: T("geldig t/m 15 sep", "valid until 15 Sep"),
        fragment: T("Bijgaand de herziene calculatie, inclusief steigerwerk en een post onvoorzien van 7%.",
                    "Attached is the revised calculation, including scaffolding and a 7% contingency."),
        ai: T("Ligt 4% onder de vorige versie. Past binnen het capexplan voor dit object; de post onvoorzien van 7% is marktconform voor gevelwerk aan een hoogbouwpand.",
              "Comes in 4% below the previous version. Fits the capex plan for this asset; the 7% contingency is normal for façade work on a high-rise."),
        actie: T("Gunnen of nog één ronde onderhandelen", "Award or negotiate one more round"),
        concept: T("Hoi,\n\nDank voor de herziene calculatie, die ziet er beter uit. Twee dingen nog: kunnen jullie het steigerwerk apart specificeren, en wat gebeurt er met het onvoorzien als dat niet wordt gebruikt?\n\nAls we daar uit zijn, kunnen we deze week gunnen.\n\nGroet,\nEric",
                   "Hi,\n\nThanks for the revised calculation, it looks better. Two things: can you itemise the scaffolding separately, and what happens to the contingency if it is not used?\n\nOnce that is settled we can award this week.\n\nBest,\nEric") },

      { id: "m7", van: "Rabobank - relatiebeheer", adres: "relatiebeheer@rabobank.nl", tijd: "gisteren 09:05",
        onderwerp: T("Jaarlijkse convenantrapportage 2026", "Annual covenant reporting 2026"),
        klasse: "follow", categorie: T("Financiering", "Financing"), deadline: T("aanleveren vóór 30 sep", "submit before 30 Sep"),
        fragment: T("Graag ontvangen wij de jaarcijfers en de berekening van LTV en DSCR per 30 juni.",
                    "Please send us the annual figures and the LTV and DSCR calculation as at 30 June."),
        ai: T("Standaardverzoek, maar met een harde datum. LTV staat op 40,0% tegen een grens van 55%, DSCR op 1,82x tegen 1,25x - beide ruim binnen de afspraken.",
              "Routine request, but with a hard date. LTV is 40.0% against a 55% limit and DSCR 1.82x against 1.25x - both comfortably within the agreement."),
        actie: T("Rapportage bij de accountant opvragen", "Request the reporting pack from the accountant"),
        concept: T("Beste,\n\nDank voor de herinnering. Ik vraag de cijfers deze week bij de accountant op; aanlevering vóór 30 september is haalbaar.\n\nTer indicatie alvast: de LTV komt uit rond 40% en de DSCR rond 1,8x, dus ruim binnen de convenanten.\n\nMet vriendelijke groet,\nEric Kooistra",
                   "Hello,\n\nThank you for the reminder. I will request the figures from the accountant this week; submission before 30 September is achievable.\n\nAs an early indication: LTV comes out around 40% and DSCR around 1.8x, so comfortably within the covenants.\n\nKind regards,\nEric Kooistra") },

      { id: "m8", van: "Feuerwehr-Pressestelle Emden", adres: "presse@feuerwehr-emden.de", tijd: "gisteren 22:14",
        onderwerp: T("Pressemitteilung: Lagerhallenbrand Emden", "Press release: warehouse fire in Emden"),
        klasse: "dringend", categorie: T("Handel · signaal (DE)", "Trading · signal (DE)"), deadline: T("radar volgt dit dossier", "radar is tracking this file"),
        fragment: T("Großbrand in einer Lagerhalle; Teile des Non-Food-Bestands sind durch Rauch beschädigt.",
                    "Major fire in a warehouse; parts of the non-food stock are smoke-damaged."),
        ai: T("Automatisch opgepikt door de Duitse nieuwsmonitor. Rookschade aan non-food is precies het profiel waar Kooistra op koopt; de verzekeraar schakelt meestal binnen vijf werkdagen een schadepartijkoper in.",
              "Picked up automatically by the German news monitor. Smoke damage to non-food is exactly Kooistra's buying profile; the insurer usually appoints a salvage buyer within five working days."),
        actie: T("Contact zoeken met de verzekeraar", "Approach the insurer"),
        concept: T("Sehr geehrte Damen und Herren,\n\nwir haben von dem Brand gelesen. Wir kaufen regelmäßig Non-Food-Bestände mit Rauch- oder Wasserschaden auf, komplett und in einem Zug, mit eigenem Transport.\n\nFalls Sie uns an den zuständigen Versicherer oder die Geschäftsleitung verweisen können, wären wir Ihnen dankbar.\n\nMit freundlichen Grüßen\nEric Kooistra\nKooistra.com",
                   "Dear sir or madam,\n\nWe read about the fire. We regularly buy non-food stock with smoke or water damage, complete and in one go, with our own transport.\n\nIf you could refer us to the insurer or the management involved, we would be grateful.\n\nKind regards,\nEric Kooistra\nKooistra.com") },

      { id: "m9", van: "Vastgoed Leads Nederland", adres: "no-reply@vastgoedleads-nl.biz", tijd: "07:12",
        onderwerp: T("EXCLUSIEF: 250 vastgoedleads voor u klaargezet", "EXCLUSIVE: 250 property leads ready for you"),
        klasse: "spam", categorie: T("Spam · commercieel", "Spam · commercial"), deadline: "-",
        fragment: T("Betaal eenmalig en ontvang direct toegang tot onze database met beleggers.",
                    "Pay once and get instant access to our investor database."),
        ai: T("Massamailing van een afzender zonder eerdere correspondentie, met een betaalverzoek en een verlopen SPF-record. Automatisch naar spam verplaatst.",
              "Mass mailing from a sender with no prior correspondence, a payment request and a failing SPF record. Moved to spam automatically."),
        actie: T("Geen actie - automatisch gefilterd", "No action - filtered automatically"), concept: null },

      { id: "m10", van: "Beheer & Onderhoud Noord", adres: "info@bo-noord.nl", tijd: "06:40",
        onderwerp: T("Gratis inspectie van uw dakbedekking", "Free inspection of your roofing"),
        klasse: "spam", categorie: T("Spam · acquisitie", "Spam · cold outreach"), deadline: "-",
        fragment: T("Wij inspecteren kosteloos uw daken en brengen daarna een vrijblijvende offerte uit.",
                    "We inspect your roofs free of charge and then issue a no-obligation quotation."),
        ai: T("Koude acquisitie, geen bestaande relatie, geen concrete aanleiding. Naar spam; het onderhoud loopt via Bouwteam en de vaste partners.",
              "Cold outreach, no existing relationship, no concrete trigger. Moved to spam; maintenance runs through the Bouwteam and the regular partners."),
        actie: T("Geen actie - automatisch gefilterd", "No action - filtered automatically"), concept: null }
    ];
  }

  var KLASSEN = {
    dringend: { nl: "Dringend", en: "Urgent", stijl: "border-[#ead4d5] bg-[#fff7f7] text-[#b8343a]" },
    actie: { nl: "Actie nodig", en: "Action needed", stijl: "border-[#e6dfc9] bg-[#fbf7ea] text-[#8a6d1f]" },
    follow: { nl: "Follow-up", en: "Follow-up", stijl: "border-[#cfd9e6] bg-[#f2f6fb] text-[#2f6f8f]" },
    spam: { nl: "Spam", en: "Spam", stijl: "border-slate-300 bg-slate-50 text-slate-500" }
  };

  function badge(k) {
    var c = KLASSEN[k];
    return '<span class="border ' + c.stijl + ' px-2 py-1 text-[9px] font-bold uppercase tracking-[0.1em]">' + T(c.nl, c.en) + '</span>';
  }

  function bericht(m) {
    var uit = geopend === m.id;
    var concept = concepten[m.id];
    return '<article class="border-b border-slate-100 last:border-0' + (m.klasse === "spam" ? " opacity-70" : "") + '">' +
      '<button type="button" data-ek-mail="' + m.id + '" class="flex w-full flex-wrap items-start justify-between gap-3 p-5 text-left hover:bg-slate-50">' +
        '<span class="min-w-[260px] flex-1">' +
          '<span class="flex flex-wrap items-center gap-2">' + badge(m.klasse) +
          '<span class="text-[10px] font-bold uppercase tracking-[0.1em] text-slate-500">' + m.categorie + '</span>' +
          '<span class="text-[11px] text-slate-400">' + m.tijd + '</span></span>' +
          '<span class="mt-2 block text-[14px] font-semibold text-[#13263a]">' + m.onderwerp + '</span>' +
          '<span class="mt-0.5 block text-[11px] text-slate-500">' + m.van + ' · ' + m.adres + '</span>' +
          '<span class="mt-1.5 block max-w-2xl text-[12px] leading-5 text-[#010b22]/65">' + m.fragment + '</span>' +
        '</span>' +
        '<span class="shrink-0 text-right">' +
          '<span class="block ' + LBL + '">' + T("Termijn", "Deadline") + '</span>' +
          '<span class="mt-1 block text-[12px] font-semibold text-[#13263a]">' + m.deadline + '</span>' +
          '<span class="mt-3 block text-[13px] text-slate-400" aria-hidden="true">' + (uit ? "▾" : "▸") + '</span>' +
        '</span>' +
      '</button>' +
      (uit ? '<div class="border-t border-slate-100 bg-slate-50 p-5">' +
        '<p class="' + LBL + '">' + T("Wat de AI ervan maakt", "What the AI makes of it") + '</p>' +
        '<p class="mt-2 max-w-3xl text-[12px] leading-5 text-[#010b22]/75">' + m.ai + '</p>' +
        '<p class="mt-3 text-[12px]"><span class="' + LBL + '">' + T("Voorgestelde actie", "Suggested action") + '</span> ' +
        '<span class="ml-2 font-semibold text-[#13263a]">' + m.actie + '</span></p>' +
        (doorgestuurd[m.id] ? '<p class="mt-4 border border-[#bfddd4] bg-[#edf8f4] px-4 py-3 text-[12px] font-semibold text-[#0f625b]">' +
          T("Doorgestuurd naar Amarens. Zij pakt de opvolging op en zet het terug op de lijst als er iets van jou nodig is.",
            "Forwarded to Amarens. She picks up the follow-up and puts it back on the list if something is needed from you.") + '</p>' : '') +
        (m.concept ? '<div class="mt-4">' +
          (concept
            ? '<div class="border border-slate-200 bg-white p-4">' +
              '<p class="' + LBL + '">' + T("Concept-antwoord · geschreven in Erics toon", "Draft reply · written in Eric's tone") + '</p>' +
              '<pre class="mt-2 whitespace-pre-wrap font-sans text-[12px] leading-5 text-[#13263a]">' + m.concept + '</pre>' +
              '<div class="mt-3 flex flex-wrap gap-2">' +
              '<button type="button" data-ek-mail-copy="' + m.id + '" class="border border-slate-300 bg-white px-3 py-2 text-[10px] font-bold uppercase tracking-[0.1em] text-[#13263a]">' + T("Kopieer tekst", "Copy text") + '</button>' +
              '<button type="button" data-ek-mail-again="' + m.id + '" class="border border-slate-300 bg-white px-3 py-2 text-[10px] font-bold uppercase tracking-[0.1em] text-slate-600">' + T("Andere versie", "Another version") + '</button>' +
              '<button type="button" data-ek-mail-amarens="' + m.id + '" class="border border-[#010b22] bg-white px-3 py-2 text-[10px] font-bold uppercase tracking-[0.1em] text-[#010b22]">' + T("Doorsturen Amarens", "Forward to Amarens") + '</button>' +
              '</div></div>'
            : '<div class="flex flex-wrap gap-2">' +
              '<button type="button" data-ek-mail-gen="' + m.id + '" class="border border-[#010b22] bg-[#010b22] px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.12em] text-white">' + T("Genereer een antwoord", "Generate a reply") + '</button>' +
              '<button type="button" data-ek-mail-amarens="' + m.id + '" class="border border-[#010b22] bg-white px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#010b22]">' + T("Doorsturen Amarens", "Forward to Amarens") + '</button></div>' +
              '<p class="mt-2 text-[11px] text-slate-500">' + T("Op basis van eerder door Eric verzonden e-mails: kort, direct, geen omhaal.", "Based on emails Eric sent earlier: short, direct, no flourish.") + '</p>')
          + '</div>' : '') +
      '</div>' : '') +
    '</article>';
  }

  function html() {
    var M = berichten();
    var tel = function (k) { return M.filter(function (m) { return m.klasse === k; }).length; };
    var zicht = filter === "alle" ? M
      : filter === "actie" ? M.filter(function (m) { return m.klasse !== "spam"; })
      : M.filter(function (m) { return m.klasse === filter; });

    var knop = function (k, tekst, n) {
      var actief = filter === k;
      return '<button type="button" data-ek-mailfilter="' + k + '" class="border px-3 py-2 text-[10px] font-bold uppercase tracking-[0.12em] ' +
        (actief ? 'border-[#010b22] bg-[#010b22] text-white' : 'border-slate-300 bg-white text-[#13263a]') + '">' + tekst + ' ' + n + '</button>';
    };

    var kpi = [
      [T("Nieuw vandaag", "New today"), "37", T("waarvan 22 automatisch afgehandeld", "22 handled automatically")],
      [T("Dringend", "Urgent"), String(tel("dringend")), T("met een termijn vandaag", "with a deadline today")],
      [T("Wacht op jouw reactie", "Awaiting your reply"), String(tel("follow")), T("langst openstaand: 9 dagen", "longest open: 9 days")],
      [T("Spam gefilterd", "Spam filtered"), "14", T("deze week · 0 fout-positief", "this week · 0 false positives")],
      [T("Gem. reactietijd", "Avg. response time"), T("5 u 20 m", "5 h 20 m"), T("doel: binnen de werkdag", "target: within the working day")]
    ];

    return '' +
    '<section class="flex flex-col gap-5 border-b border-slate-300 pb-5 md:flex-row md:items-end md:justify-between">' +
      '<div><p class="' + LBL + '">' + T("Communicatie · mailbox", "Communication · mailbox") + '</p>' +
      '<h2 class="mt-2 text-[32px] font-semibold tracking-[-0.055em] text-[#13263a]">' + T("Inkomende e-mail", "Incoming email") + '</h2>' +
      '<p class="mt-2 max-w-2xl text-[12px] leading-5 text-[#010b22]/65">' +
      T("De mailbox wordt gelezen, gesorteerd en van een voorstel voorzien: spam eruit, dringende zaken bovenaan, en bewaking van wat op een antwoord wacht. Van elke mail kan een concept-antwoord worden geschreven in Erics eigen toon.",
        "The mailbox is read, sorted and given a proposal: spam removed, urgent items on top, and tracking of whatever is waiting on a reply. For every message a draft answer can be written in Eric's own tone.") + '</p></div>' +
      '<div class="flex flex-wrap items-center gap-2">' +
        '<span class="border border-[#bfddd4] bg-[#edf8f4] px-3 py-2 text-[10px] font-bold uppercase tracking-[0.12em] text-[#0f625b]">' + T("Mailbox gekoppeld", "Mailbox connected") + '</span>' +
        '<span class="border border-slate-300 bg-white px-3 py-2 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500">' + T("Laatste scan 3 min geleden", "Last scan 3 min ago") + '</span>' +
      '</div></section>' +

    '<section class="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">' + kpi.map(function (k) {
      return '<article class="' + CARD + ' p-5"><p class="' + LBL + '">' + k[0] + '</p>' +
        '<p class="mt-3 text-[24px] font-semibold tracking-[-0.05em] text-[#13263a]">' + k[1] + '</p>' +
        '<p class="mt-1 text-[11px] leading-4 text-slate-500">' + k[2] + '</p></article>';
    }).join("") + '</section>' +

    '<section class="mt-5 ' + CARD + '">' +
      '<div class="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 p-4">' +
        '<div class="flex flex-wrap gap-2">' +
          knop("actie", T("Te behandelen", "To handle"), M.filter(function (m) { return m.klasse !== "spam"; }).length) +
          knop("dringend", T("Dringend", "Urgent"), tel("dringend")) +
          knop("follow", T("Follow-up", "Follow-up"), tel("follow")) +
          knop("spam", T("Spam", "Spam"), tel("spam")) +
          knop("alle", T("Alles", "All"), M.length) +
        '</div>' +
        '<span class="text-[11px] text-slate-500">' + T("Gesorteerd op urgentie en termijn", "Sorted by urgency and deadline") + '</span>' +
      '</div>' + zicht.map(bericht).join("") + '</section>' +

    '<section class="mt-5 grid gap-5 xl:grid-cols-2">' +
      '<div class="' + CARD + ' p-5"><p class="' + LBL + '">' + T("Hoe de sortering werkt", "How the sorting works") + '</p>' +
      '<h3 class="mt-1 text-[18px] font-semibold text-[#13263a]">' + T("Waarop de AI let", "What the AI looks at") + '</h3>' +
      '<dl class="mt-3 text-[12px]">' +
      [[T("Dringend", "Urgent"), T("harde termijn binnen 24 uur, of een bedrag dat vervalt", "hard deadline within 24 hours, or an amount that lapses")],
       [T("Actie nodig", "Action needed"), T("er wordt iets van Eric gevraagd dat hij zelf moet doen", "something is asked of Eric that only he can do")],
       [T("Follow-up", "Follow-up"), T("hij heeft geantwoord maar wacht op de ander, of andersom", "he replied and is waiting on the other side, or the reverse")],
       [T("Spam", "Spam"), T("geen eerdere correspondentie, betaalverzoek, of afzender faalt op SPF/DKIM", "no prior correspondence, payment request, or the sender fails SPF/DKIM")],
       [T("Voorspelling", "Prediction"), T("op basis van vergelijkbare dossiers: verwachte waarde, doorlooptijd en kans", "based on comparable files: expected value, turnaround and likelihood")]].map(function (r) {
        return '<div class="flex justify-between gap-5 border-b border-slate-100 py-2.5 last:border-0">' +
          '<dt class="font-semibold text-[#13263a]">' + r[0] + '</dt>' +
          '<dd class="max-w-[62%] text-right text-slate-500">' + r[1] + '</dd></div>'; }).join("") +
      '</dl></div>' +

      '<div class="' + CARD + ' p-5"><p class="' + LBL + '">' + T("Schrijfstijl", "Writing style") + '</p>' +
      '<h3 class="mt-1 text-[18px] font-semibold text-[#13263a]">' + T("Antwoorden in Erics toon", "Replies in Eric's tone") + '</h3>' +
      '<p class="mt-2 text-[12px] leading-5 text-[#010b22]/65">' +
      T("Het model leest de mails die Eric zelf verstuurd heeft en neemt daar de toon uit over: kort, zakelijk, meteen ter zake, en zonder beloftes die hij niet waarmaakt. Bij Duitse afzenders schrijft het in het Duits.",
        "The model reads the emails Eric has sent himself and takes the tone from those: short, businesslike, straight to the point, and without promises he will not keep. For German senders it writes in German.") + '</p>' +
      '<dl class="mt-3 text-[12px]">' +
      [[T("Lengte", "Length"), T("gemiddeld 96 woorden", "96 words on average")],
       [T("Aanhef", "Salutation"), T("'Hoi' bij bekenden, 'Geachte' bij instanties", "'Hi' with contacts, formal with institutions")],
       [T("Talen", "Languages"), T("Nederlands, Duits, Engels", "Dutch, German, English")],
       [T("Geleerd van", "Learned from"), T("1.240 verzonden berichten", "1,240 sent messages")]].map(function (r) {
        return '<div class="flex justify-between gap-5 border-b border-slate-100 py-2.5 last:border-0">' +
          '<dt class="font-semibold text-[#13263a]">' + r[0] + '</dt>' +
          '<dd class="text-right text-slate-500">' + r[1] + '</dd></div>'; }).join("") +
      '</dl>' +
      '<p class="mt-4 text-[11px] leading-5 text-slate-500">' +
      T("Concepten worden nooit automatisch verstuurd - Eric leest en verstuurt zelf.",
        "Drafts are never sent automatically - Eric reads and sends them himself.") + '</p></div>' +
    '</section>';
  }

  function vul() {
    var root = document.getElementById("ek-mail-root");
    if (!root) return;
    var stempel = [window.__EK_LANG ? window.__EK_LANG() : "nl", filter, geopend, Object.keys(concepten).join(","), Object.keys(doorgestuurd).join(",")].join("|");
    if (root.dataset.gevuld === stempel) return;
    root.dataset.gevuld = stempel;
    root.innerHTML = html();
    if (!root.dataset.klik) {
      root.dataset.klik = "1";
      root.addEventListener("click", function (e) {
        var f = e.target.closest("[data-ek-mailfilter]");
        if (f) { filter = f.getAttribute("data-ek-mailfilter"); geopend = null; return vul(); }
        var g = e.target.closest("[data-ek-mail-gen],[data-ek-mail-again]");
        if (g) {
          var gid = g.getAttribute("data-ek-mail-gen") || g.getAttribute("data-ek-mail-again");
          concepten[gid] = (concepten[gid] || 0) + 1;
          return vul();
        }
        var am = e.target.closest("[data-ek-mail-amarens]");
        if (am) { doorgestuurd[am.getAttribute("data-ek-mail-amarens")] = true; return vul(); }
        var cpy = e.target.closest("[data-ek-mail-copy]");
        if (cpy) {
          var mid = cpy.getAttribute("data-ek-mail-copy");
          var m = berichten().find(function (x) { return x.id === mid; });
          try { navigator.clipboard.writeText(m.concept); } catch (err) {}
          cpy.textContent = T("Gekopieerd", "Copied");
          return;
        }
        var b = e.target.closest("[data-ek-mail]");
        if (b) { var id = b.getAttribute("data-ek-mail"); geopend = geopend === id ? null : id; return vul(); }
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
