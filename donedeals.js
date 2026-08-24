/* Done Deals: het geheugen van de dealradar. Afgeronde en mislukte partijen uit het verleden,
   met bronnen, betrokkenen en wat de radar eruit heeft geleerd. Tweetalig (NL/EN).
   Alle feiten komen uit openbare berichtgeving; er zijn geen telefoonnummers verzonnen. */
(function () {
  var T = function (nl, en) { return (window.__EK_T ? window.__EK_T(nl, en) : nl); };
  var LBL = "text-[9px] font-bold uppercase tracking-[0.13em] text-slate-500";
  var open = null;
  var filter = "alle";
  var gebeld = {};

  function deals() {
    return [
      {
        id: "blokker-202", jaar: "2024", titel: T("Blokker · 202 zeecontainers", "Blokker · 202 sea containers"),
        soort: T("Faillissementsvoorraad", "Bankruptcy stock"), afloop: "goed",
        kort: T("De grootste partij tot nu toe: goederen die Blokker in het Verre Oosten had besteld maar nooit betaald, en die daardoor buiten de boedel vielen.",
                "The largest lot so far: goods Blokker had ordered in the Far East but never paid for, which therefore fell outside the bankruptcy estate."),
        detail: T("202 zeecontainers, ongeveer 10.000 pallets huishoudartikelen, gekocht van de rederijen en expediteurs met instemming van de curatoren. De koopsom is nooit openbaar gemaakt (geheimhouding); in de pers heet het 'enkele miljoenen'. Havenkosten liepen op tot € 15.000 à € 20.000 per dag, dus alles moest binnen achttien dagen gelost zijn: ploegen van twaalf uur, zes dagen per week. Over het aantal verschillende artikelen lopen de bronnen uiteen: NOS noemt 16.000, de vakpers circa 1.600.",
                  "202 sea containers, roughly 10,000 pallets of household goods, bought from the shipping and freight companies with the receivers' consent. The purchase price was never disclosed (NDA); the press says 'several million'. Port costs ran to € 15,000-20,000 a day, so everything had to be unloaded within eighteen days: twelve-hour shifts, six days a week. Sources differ on the number of distinct articles: NOS says 16,000, the trade press about 1,600."),
        les: T("Snelheid was hier duurder dan inkoop: elke dag stilstand in de haven kostte meer dan de marge op een pallet. De radar rekent sindsdien bij elke partij de losdagen mee als kostenpost, niet als detail.",
               "Speed cost more than buying here: every idle day in port cost more than the margin on a pallet. Since then the radar prices unloading days into every lot as a cost item, not a detail."),
        partijen: [T("Curatoren Blokker", "Blokker receivers"), T("Gordon Brothers (eerste € 35 mln zekerheid)", "Gordon Brothers (first € 35m secured)"), T("Rederijen en expediteurs", "Shipping and freight companies")],
        contact: T("Via de curatoren van Blokker", "Via the Blokker receivers"), telefoon: null,
        bronnen: [["NOS", "https://nos.nl/artikel/2547940-failliet-blokker-verkoopt-202-zeecontainers-met-spullen-aan-handelaar"],
                  ["Warehouse Totaal", "https://www.warehousetotaal.nl/nieuws/200-zeecontainers-blokker-friese-opkoper-slaat-zijn-slag/135867/"],
                  ["RetailTrends", "https://retailtrends.nl/news/74556/ondernemer-koopt-200-zeecontainers-met-blokker-voorraad-op"],
                  ["Transport Online", "https://www.transport-online.nl/68807/friese-kooistra-com-koopt-202-zeecontainers-met-goederen-van-blokker-op/"]]
      },
      {
        id: "blokker-franchise", jaar: "2025", titel: T("Blokker-franchisenemers · wekelijkse levering", "Blokker franchisees · weekly supply"),
        soort: T("Doorlopende afzet", "Rolling offtake"), afloop: "goed",
        kort: T("De 45 franchisenemers vielen buiten het faillissement en spraken af wekelijks via Kooistra te bestellen. Daarmee werd de partij niet alleen ingekocht maar ook meteen afgezet.",
                "The 45 franchisees fell outside the bankruptcy and agreed to order weekly through Kooistra, so the lot was not only bought but immediately placed."),
        detail: T("De franchisers hadden in december zo'n zestig leveranciers moeten benaderen om de winkels gevuld te houden. Kooistra zegde toe de doorstartende keten een jaar lang te bevoorraden, met een contractuele bepaling dat de Blokker-artikelen niet bij discounters terecht mochten komen. Begin 2025 leverde hij naar schatting 30% van het assortiment in de resterende winkels, vanuit drie magazijnen in Friesland.",
                  "In December the franchisers had had to approach some sixty suppliers to keep the shops stocked. Kooistra committed to supplying the restarting chain for a year, with a contract clause keeping the Blokker-branded goods away from discounters. By early 2025 he was supplying an estimated 30% of the assortment in the remaining shops, from three warehouses in Friesland."),
        les: T("Een partij met een vaste afnemer erachter is meer waard dan een partij met een hogere marge. De radar weegt sindsdien mee of er al een afzetkanaal klaarstaat.",
               "A lot with a committed buyer behind it is worth more than a lot with a higher margin. The radar now weighs whether an outlet channel is already in place."),
        partijen: ["Roland Palmer (Blokker)", "Alwin Piest (Leek)", "Carlo Thijssen (Made)"],
        contact: T("Roland Palmer, eigenaar Blokker-merk", "Roland Palmer, owner of the Blokker brand"), telefoon: null,
        bronnen: [["De Telegraaf", "https://kooistra.com/artikel-de-telegraaf-kooistra-com-helpt-bij-doorstart-provinciale-franchisers-blokker/"],
                  ["Wonen360", "https://www.wonen360.nl/article/9693347/45-franchisenemers-blokker-bereiken-akkoord-met-ondernemer-eric-kooistra/"]]
      },
      {
        id: "casa-antwerpen", jaar: "2025", titel: T("CASA · 20+ containers uit Antwerpen", "CASA · 20+ containers from Antwerp"),
        soort: T("Faillissementsvoorraad", "Bankruptcy stock"), afloop: "gemengd",
        kort: T("Voorraad van CASA, een voormalig Blokker-onderdeel, opgehaald in Antwerpen en gekoppeld aan een afnameregeling van achttien maanden.",
                "Stock from CASA, a former Blokker subsidiary, collected in Antwerp and tied to an eighteen-month drawdown arrangement."),
        detail: T("Ruim twintig containers. De veertig resterende Blokker-locaties kregen achttien maanden om de hele voorraad af te nemen. Kooistra sloeg bewust hogere biedingen van concurrerende discounters af om de eigen franchisenemers niet te onderbieden - een keuze die marge kostte maar het kanaal beschermde.",
                  "Over twenty containers. The forty remaining Blokker locations were given eighteen months to draw down the whole inventory. Kooistra deliberately turned down higher bids from competing discounters so as not to undercut the franchisees, a choice that cost margin but protected the channel."),
        les: T("Marge inleveren om een kanaal te beschermen is een investering, geen verlies. De radar rekent dat sindsdien apart door in plaats van het als gemiste opbrengst te boeken.",
               "Giving up margin to protect a channel is an investment, not a loss. The radar now accounts for that separately instead of booking it as lost revenue."),
        partijen: ["CASA", "Roland Palmer (Blokker)"],
        contact: T("Tjitse Lawerman, algemeen directeur Kooistra.com", "Tjitse Lawerman, managing director Kooistra.com"), telefoon: null,
        bronnen: [["RTV NOF", "https://www.rtvnof.nl/opkoper-kooistra-positief-over-nieuwe-blokker-winkels-mooi-als-dat-in-stand-blijft/703490/"],
                  ["Omrop Fryslân", "https://kooistra.com/omrop-fryslan-opkoper-uit-leeuwarden-positief-over-nieuwe-blokker-winkels-mooi-als-dat-in-stand-blijft/"]]
      },
      {
        id: "phryge", jaar: "2025", titel: T("Parijs 2024 · circa 220.000 mascotte-knuffels", "Paris 2024 · about 220,000 mascot plush toys"),
        soort: T("Overvoorraad", "Overstock"), afloop: "goed",
        kort: T("Na de Spelen wilde geen enkele keten de Phryge-knuffels nog hebben. Ingekocht voor rond de 50 cent tot een euro per stuk, bestemd voor internationale doorverkoop.",
                "After the Games no chain wanted the Phryge mascots any more. Bought at roughly 50 cents to a euro each, intended for international resale."),
        detail: T("Illustratief voor het model dat Eric Kooistra zelf beschrijft: 'voor iets dat een euro kost, betalen wij tien cent' - inkoop op 10 tot 20 procent van de winkelwaarde. In dezelfde periode noemde hij een omzet van ongeveer € 10 mln en circa twintig mensen.",
                  "Illustrative of the model Eric Kooistra describes himself: 'for something that costs a euro, we pay ten cents' - buying at 10 to 20 percent of retail value. In the same period he mentioned turnover of about € 10m and roughly twenty people."),
        les: T("Evenementenvoorraad verliest zijn waarde op een vaste datum, niet geleidelijk. Inkopen kan alleen als de doorverkoop buiten de oorspronkelijke markt ligt.",
               "Event stock loses its value on a fixed date, not gradually. Buying only works if the resale sits outside the original market."),
        partijen: [T("Retailketens met restvoorraad", "Retail chains with residual stock")],
        contact: "Eric Kooistra, Kooistra.com", telefoon: null,
        bronnen: [["AD", "https://kooistra.com/en/kooistra-ad/"], ["de Ondernemer", "https://kooistra.com/eric-kooistra-blokker-zeecontainers-paris-knuffels/"]]
      },
      {
        id: "loombands", jaar: T("circa 2015", "around 2015"), titel: T("Loombands · 44 trailers die bleven liggen", "Loom bands · 44 trailers that sat still"),
        soort: T("Hype-restant", "Fad residue"), afloop: "tegenvaller",
        kort: T("Vierenveertig trailers loombands, gekocht toen de rage al over haar hoogtepunt was. Ze lagen jaren in het magazijn voordat ze alsnog met winst weg konden.",
                "Forty-four trailers of loom bands, bought when the craze was already past its peak. They sat in the warehouse for years before eventually moving at a profit."),
        detail: T("In het profiel in de Leeuwarder Courant genoemd als voorbeeld van een partij die veel te lang bleef liggen. Uiteindelijk alsnog met winst verkocht, maar de rentelast en de magazijnruimte hebben jaren gekost.",
                  "Mentioned in the Leeuwarder Courant profile as an example of a lot that sat far too long. Eventually sold at a profit, but the carrying cost and warehouse space took years."),
        les: T("Bij een hype is de vraag niet wat het waard is, maar hoe lang je het kunt vasthouden. De radar zet sindsdien een maximale houdtermijn op modegevoelige partijen.",
               "With a fad the question is not what it is worth but how long you can hold it. The radar now puts a maximum holding period on fashion-sensitive lots."),
        partijen: [], contact: "Eric Kooistra, Kooistra.com", telefoon: null,
        bronnen: [["Leeuwarder Courant", "https://kooistra.com/artikel-leeuwarder-courant-elke-dag-inkopen-doen/"]]
      },
      {
        id: "maxx-groningen", jaar: "2017", titel: T("Maxx XXXL Groningen · opening ingeperkt door de gemeente", "Maxx XXXL Groningen · opening curtailed by the city"),
        soort: T("Winkelformule", "Retail format"), afloop: "tegenvaller",
        kort: T("De grootste outlet van Nederland zou opengaan in de voormalige Praxis aan het Sontplein. Op de avond vóór de opening handhaafde de gemeente het bestemmingsplan.",
                "The largest outlet in the Netherlands was to open in the former Praxis on Sontplein. The evening before opening, the city enforced the zoning plan."),
        detail: T("Op die locatie mochten volgens het bestemmingsplan alleen bouwmarkt- en tuincentrumartikelen worden verkocht. Personeel werkte van woensdagavond tot diep in de nacht om niet-toegestane goederen weg te halen of af te zetten. De deuren gingen tien minuten te laat open, om 09:10, voor zo'n dertig wachtende klanten, en een groot deel van de zichtbare koopwaar mocht niet worden verkocht. Klanten die op een advertentie waren afgekomen, klaagden.",
                  "The zoning plan allowed only DIY and garden-centre goods at that location. Staff worked from Wednesday evening into the small hours removing or cordoning off non-compliant stock. The doors opened ten minutes late, at 09:10, to some thirty waiting customers, and much of the visible merchandise could not legally be sold. Customers who had come on the strength of an advertisement complained."),
        les: T("Het bestemmingsplan van een pop-uplocatie is even belangrijk als de huurprijs. Sinds dit dossier wordt vóór elke tijdelijke winkel eerst de toegestane branchering gecheckt - dezelfde toets die nu per object in het dashboard staat.",
               "The zoning plan of a pop-up location matters as much as the rent. Since this file the permitted use is checked before every temporary shop, the same check that now sits per asset in the dashboard."),
        partijen: [T("Gemeente Groningen", "Municipality of Groningen"), "Hugo Kingma (Maxx XXXL)", "Praxis"],
        contact: T("Afdeling handhaving, gemeente Groningen", "Enforcement department, City of Groningen"), telefoon: null,
        bronnen: [["OOG Groningen", "https://www.oogtv.nl/2017/03/outlet-maxx-xxxl-snijdt-zichzelf-in-de-vingers/"],
                  ["RTV Noord", "https://www.rtvnoord.nl/nieuws/175852/Nieuwe-mega-outlet-in-Stad-mag-niet-alles-verkopen"],
                  ["GIC", "https://gic.nl/economie/maxx-xxxl-groningen-grootste-outlet-van-nederland-opent/"]]
      },
      {
        id: "maxx-gorinchem", jaar: "2017", titel: T("Maxx in het lege V&D-pand, Gorinchem", "Maxx in the empty V&D building, Gorinchem"),
        soort: T("Winkelformule", "Retail format"), afloop: "goed",
        kort: T("Ongeveer 5.400 m² voormalig warenhuis aan de voet van de Grote Kerk, leeg sinds V&D sloot, tijdelijk gehuurd tot eind 2017.",
                "About 5,400 m² of former department store at the foot of the Grote Kerk, empty since V&D closed, leased temporarily to the end of 2017."),
        detail: T("Het pand stond leeg sinds 19 april 2016. De stellingen gingen er dezelfde week in; opening binnen drie weken. Eigenaar was Stichting Pensioenfonds Openbaar Vervoer, bemiddeling via Michon Vastgoed.",
                  "The building had stood empty since 19 April 2016. Shelving went in that same week; opening within three weeks. The owner was Stichting Pensioenfonds Openbaar Vervoer, with Michon Vastgoed acting as broker."),
        les: T("Leegstand is voor de eigenaar een kostenpost en voor de handel een kans: tijdelijke huur is bijna altijd bespreekbaar. Dit is dezelfde redenering die nu onder de leegstaande objecten in de portefeuille ligt.",
               "Vacancy is a cost to the owner and an opportunity to the trade: temporary letting is nearly always negotiable. The same reasoning now sits under the vacant assets in the portfolio."),
        partijen: ["Stichting Pensioenfonds Openbaar Vervoer", "Michon Vastgoed", "Tjitse Lawerman"],
        contact: T("Michon Vastgoed, verhuurmakelaar", "Michon Vastgoed, letting agent"), telefoon: null,
        bronnen: [["Kooistra.com", "https://kooistra.com/warenhuis-maxx-in-voormalig-vd-pand-gorinchem/"]]
      },
      {
        id: "c1000", jaar: "2015", titel: T("C1000 · circa 1.500 pallets", "C1000 · about 1,500 pallets"),
        soort: T("Formuleopheffing", "Formula wind-down"), afloop: "gemengd",
        kort: T("Na het opheffen van de C1000-formule kwamen 800 pallets uit de distributiecentra en 700 van leveranciers vrij, samen zo'n vijftig trailers.",
                "After the C1000 formula was wound down, 800 pallets from the distribution centres and 700 from suppliers came free, about fifty trailers in all."),
        detail: T("De goederen gingen naar de Maxx-vestigingen in Assen, Groningen en Leeuwarden. Eric Kooistra was er open over dat de marge niet het doel was: de merknaam trok publiek, en dat was de winst.",
                  "The goods went to the Maxx outlets in Assen, Groningen and Leeuwarden. Eric Kooistra was open about margin not being the point: the brand name drew traffic, and that was the return."),
        les: T("Een bekende merknaam op een restpartij is marketingwaarde, ook als de partij zelf nauwelijks marge heeft. Dat is een aparte post in de beoordeling geworden.",
               "A known brand name on a residual lot carries marketing value even when the lot itself barely has margin. That has become a separate item in the assessment."),
        partijen: ["C1000"], contact: "Eric Kooistra, Kooistra.com", telefoon: null,
        bronnen: [["Kooistra.com", "https://kooistra.com/c1000-fans-graaien-nog-een-keer/"]]
      },
      {
        id: "opop", jaar: "2019", titel: T("Op=Op Voordeelshop · faillissement van een afnemer", "Op=Op Voordeelshop · a buyer goes under"),
        soort: T("Afnemersrisico", "Buyer risk"), afloop: "tegenvaller",
        kort: T("De Drentse discountketen die in 2017 nog 31 Blokker-winkels overnam, groeide naar circa 160 vestigingen en ging failliet. Een afzetkanaal voor de partijhandel viel weg.",
                "The Drenthe discount chain that took over 31 Blokker shops in 2017 grew to about 160 locations and went bankrupt. An offtake channel for the lot trade disappeared."),
        detail: T("Tjitse Lawerman legde in Dagblad van het Noorden het mechanisme uit: boven de honderd winkels kan een keten geen kleine partijen van een paar duizend stuks meer kopen en moet ze grote, gelijkvormige orders plaatsen. Precies het wisselende assortiment dat de formule aantrekkelijk maakte, verdwijnt dan.",
                  "In Dagblad van het Noorden, Tjitse Lawerman explained the mechanism: above a hundred shops a chain can no longer buy small lots of a few thousand units and has to place large, uniform orders. Exactly the changing assortment that made the format attractive then disappears."),
        les: T("Een groeiende afnemer is niet vanzelf een betere afnemer. De radar houdt sindsdien bij hoeveel van de omzet bij ketens boven de honderd vestigingen ligt.",
               "A growing buyer is not automatically a better buyer. The radar now tracks how much turnover sits with chains above a hundred locations."),
        partijen: ["Op=Op Voordeelshop", "Tjitse Lawerman"],
        contact: T("Tjitse Lawerman, Kooistra.com", "Tjitse Lawerman, Kooistra.com"), telefoon: null,
        bronnen: [["Dagblad van het Noorden", "https://kooistra.com/hoe-moet-het-nu-verder-met-opop/"]]
      },
      {
        id: "naamsverwarring", jaar: "2024", titel: T("Naamsverwarring na het faillissement van Big Bazar", "Name confusion after the Big Bazar bankruptcy"),
        soort: T("Reputatie", "Reputation"), afloop: "tegenvaller",
        kort: T("Een familielid met dezelfde achternaam kocht Big Bazar en zag die keten omvallen. In de markt werd Kooistra.com daar herhaaldelijk mee verward.",
                "A relative with the same surname bought Big Bazar and saw that chain collapse. In the market Kooistra.com was repeatedly confused with it."),
        detail: T("Curatoren stelden Heerke Kooistra in november 2024 aansprakelijk voor ongeveer € 45 mln aan schade wegens vermeend wanbeheer; in januari 2025 volgde een celstraf van een jaar wegens gebrekkige boekhouding. Eric Kooistra heeft zich in interviews uitdrukkelijk van die associatie gedistantieerd. Over de precieze familierelatie verschillen de bronnen: NOS schrijft neef, RetailTrends oom.",
                  "In November 2024 receivers held Heerke Kooistra liable for roughly € 45m of losses over alleged mismanagement; in January 2025 a one-year prison sentence followed for deficient bookkeeping. Eric Kooistra has explicitly distanced himself from the association in interviews. Sources differ on the exact family relation: NOS says cousin, RetailTrends says uncle."),
        les: T("Reputatie is onderdeel van de inkoopprijs: wie wordt aangezien voor een gevallen keten, betaalt dat terug in tragere financiering. Sindsdien staat de eigen naamsvermelding standaard in elk persbericht.",
               "Reputation is part of the purchase price: being mistaken for a fallen chain is repaid in slower financing. Since then the company's own name is stated explicitly in every press release."),
        partijen: ["Heerke Kooistra", T("Curatoren Big Bazar", "Big Bazar receivers")],
        contact: null, telefoon: null,
        bronnen: [["WâldNet", "https://www.waldnet.nl/wn/nieuws/79745/_Jerke_Kooistra_aansprakelijk_voor_faillissement_Big_Bazar_.html"],
                  ["RetailTrends", "https://retailtrends.nl/news/74556/ondernemer-koopt-200-zeecontainers-met-blokker-voorraad-op"]]
      },
      {
        id: "financiering", jaar: "2025", titel: T("Financiering: banken zijn te traag voor dit model", "Financing: banks are too slow for this model"),
        soort: T("Bedrijfsvoering", "Operations"), afloop: "tegenvaller",
        kort: T("Vandaag kopen en morgen verkopen past niet in het tempo van een kredietaanvraag. Grote partijen moeten daardoor buiten de bank om worden gefinancierd.",
                "Buy today and sell tomorrow does not fit the pace of a credit application. Large lots therefore have to be financed outside the bank."),
        detail: T("In het profiel in de Leeuwarder Courant (december 2025) worden twee structurele knelpunten genoemd: de doorlooptijd bij banken, en de naamsverwarring rond Big Bazar. Voor de grote partijen wordt met snelle externe financiers gewerkt.",
                  "The Leeuwarder Courant profile (December 2025) names two structural bottlenecks: the lead time at banks, and the name confusion around Big Bazar. For the large lots, fast external financiers are used."),
        les: T("Financiering moet vóór de kans geregeld zijn, niet erna. De radar toont daarom bij elke kans direct het benodigde bedrag en de beschikbare ruimte.",
               "Financing has to be arranged before the opportunity, not after. The radar therefore shows the amount needed and the room available on every opportunity."),
        partijen: [], contact: null, telefoon: null,
        bronnen: [["Leeuwarder Courant", "https://friesland.headliner.nl/item/bij-kooistra-com-in-leeuwarden-liggen-miljoenen-producten-maar-we-moeten-het-hier-met-dubbeltjes-lc-114777"]]
      },
      {
        id: "loodsverkoop-dokkum", jaar: "2020", titel: T("Loodsverkoop Dokkum · vier dagen, rijen voor de deur", "Warehouse sale Dokkum · four days, queues at the door"),
        soort: T("Consumentenverkoop", "Consumer sale"), afloop: "goed",
        kort: T("Een vierdaagse loodsverkoop bij de Veiling in Dokkum trok vanaf de eerste ochtend lange rijen: huishoudelijke artikelen, speelgoed, keukenspullen en kerstvoorraad.",
                "A four-day warehouse sale at the Veiling in Dokkum drew long queues from the first morning: household goods, toys, kitchen articles and Christmas stock."),
        detail: T("2 tot en met 5 december 2020. Een woordvoerder: 'we hebben tweehonderd karren buiten staan en die zijn continu in gebruik.' Kanttekening: Dokkum is ook de standplaats van het verwante familiebedrijf Kooistra Opkopers, dus het is niet volledig duidelijk onder welke vlag deze verkoop viel.",
                  "2 to 5 December 2020. A spokesperson: 'we have two hundred trolleys outside and they are in constant use.' Caveat: Dokkum is also the base of the related family firm Kooistra Opkopers, so it is not entirely clear under whose flag this sale ran."),
        les: T("Restanten van een partij ruimen sneller op via een eigen verkoopevenement dan via de handel. Dat is nu een vaste stap aan het einde van elke partij.",
               "The tail of a lot clears faster through an own sales event than through the trade. That is now a fixed step at the end of every lot."),
        partijen: [T("Loodsverkoop Dokkum", "Loodsverkoop Dokkum")],
        contact: "Dirkje Kool, Loodsverkoop Dokkum", telefoon: null,
        bronnen: [["Omrop Fryslân", "https://www.omropfryslan.nl/nl/nieuws/680305/drukte-bij-grote-loodsverkoop-in-leeuwarden"],
                  ["Kooistra.com", "https://kooistra.com/enorme-drukte-bij-grote-loodsverkoop/"]]
      },
      {
        id: "ddr", jaar: T("na 1989", "after 1989"), titel: T("Oost-Duitsland · fabrieken leegkopen na de Muur", "East Germany · buying out factories after the Wall"),
        soort: T("Fabriekspartij", "Factory lot"), afloop: "goed",
        kort: T("De vorige generatie kocht na de val van de Muur nog volle fabrieken in Oost-Duitsland leeg en verkocht de goederen door in West-Europa.",
                "The previous generation bought out still-full factories in East Germany after the Wall fell and resold the goods in Western Europe."),
        detail: T("Op de eigen site staat de vader van Eric als Dirk Kooistra. De Ondernemer beschrijft het als het overnemen van enorme voorraden uit de Sovjettijd via fabrieksaankopen, waaronder miljoenen tandenborstels. De familielijn begint in 1935, toen grootvader Kooistra met een bakfiets langs de deur ging; de partijhandel dateert het bedrijf zelf vanaf 1979.",
                  "The company's own site names Eric's father as Dirk Kooistra. De Ondernemer describes it as taking over vast Soviet-era stockpiles through factory purchases, including millions of toothbrushes. The family line starts in 1935, when grandfather Kooistra went door to door with a cargo bike; the company dates its lot trading from 1979."),
        les: T("De grootste partijen komen uit een systeemwissel, niet uit een winkel. De radar kijkt daarom ook naar aangekondigde sluitingen en productiestops, niet alleen naar faillissementen.",
               "The biggest lots come from a change of system, not from a shop. The radar therefore also watches announced closures and production stops, not only bankruptcies."),
        partijen: ["Dirk Kooistra"], contact: null, telefoon: null,
        bronnen: [["Kooistra.com", "https://kooistra.com/en/about-us/"], ["de Ondernemer", "https://kooistra.com/eric-kooistra-blokker-zeecontainers-paris-knuffels/"]]
      }
    ];
  }

  var AFLOOP = {
    goed: { nl: "Geslaagd", en: "Success", stijl: "border-[#bfddd4] bg-[#edf8f4] text-[#0f625b]" },
    gemengd: { nl: "Gemengd", en: "Mixed", stijl: "border-[#e6dfc9] bg-[#fbf7ea] text-[#8a6d1f]" },
    tegenvaller: { nl: "Tegenvaller", en: "Setback", stijl: "border-[#ead4d5] bg-[#fff7f7] text-[#b8343a]" }
  };

  function rij(d) {
    var a = AFLOOP[d.afloop];
    var uit = open === d.id;
    return '<article class="border-b border-slate-100 last:border-0">' +
      '<button type="button" data-ek-deal="' + d.id + '" class="flex w-full flex-wrap items-start justify-between gap-3 p-5 text-left hover:bg-slate-50">' +
        '<span class="min-w-[260px] flex-1">' +
          '<span class="flex flex-wrap items-center gap-2">' +
            '<span class="border ' + a.stijl + ' px-2 py-1 text-[9px] font-bold uppercase tracking-[0.1em]">' + T(a.nl, a.en) + '</span>' +
            '<span class="text-[10px] font-bold uppercase tracking-[0.1em] text-slate-500">' + d.soort + '</span>' +
            '<span class="text-[11px] text-slate-400">' + d.jaar + '</span></span>' +
          '<span class="mt-2 block text-[15px] font-semibold text-[#13263a]">' + d.titel + '</span>' +
          '<span class="mt-1.5 block max-w-3xl text-[12px] leading-5 text-[#010b22]/65">' + d.kort + '</span>' +
        '</span>' +
        '<span class="shrink-0 text-[13px] text-slate-400" aria-hidden="true">' + (uit ? "▾" : "▸") + '</span>' +
      '</button>' +
      (uit ? '<div class="border-t border-slate-100 bg-slate-50 p-5">' +
        '<p class="' + LBL + '">' + T("Wat er gebeurde", "What happened") + '</p>' +
        '<p class="mt-2 max-w-3xl text-[12px] leading-5 text-[#010b22]/75">' + d.detail + '</p>' +
        '<p class="mt-4 ' + LBL + '">' + T("Wat de radar hiervan geleerd heeft", "What the radar learned from it") + '</p>' +
        '<p class="mt-2 max-w-3xl text-[12px] leading-5 text-[#13263a]">' + d.les + '</p>' +
        '<div class="mt-4 grid gap-4 lg:grid-cols-2">' +
          '<div class="border border-slate-200 bg-white p-4"><p class="' + LBL + '">' + T("Betrokkenen", "Parties involved") + '</p>' +
            (d.partijen.length
              ? '<ul class="mt-2 text-[12px] leading-6 text-[#13263a]">' + d.partijen.map(function (x) { return '<li>' + x + '</li>'; }).join("") + '</ul>'
              : '<p class="mt-2 text-[12px] text-slate-500">' + T("Niet in de bronnen genoemd.", "Not named in the sources.") + '</p>') +
            '<p class="mt-3 ' + LBL + '">' + T("Contactpersoon", "Contact") + '</p>' +
            '<p class="mt-1 text-[12px] text-[#13263a]">' + (d.contact || T("Niet vastgelegd", "Not recorded")) + '</p>' +
            '<div class="mt-3">' +
              (gebeld[d.id]
                ? '<p class="border border-[#bfddd4] bg-[#edf8f4] px-3 py-2 text-[11px] font-bold uppercase tracking-[0.1em] text-[#0f625b]">' +
                  T("Gebeld · ", "Called · ") + gebeld[d.id] + '</p>'
                : '<button type="button" data-ek-bel="' + d.id + '" class="inline-flex items-center gap-2 border border-[#010b22] bg-[#010b22] px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.12em] text-white">' +
                  T("Bellen", "Call") + '</button>') +
            '</div></div>' +
          '<div class="border border-slate-200 bg-white p-4"><p class="' + LBL + '">' + T("Bronnen", "Sources") + '</p>' +
            '<ul class="mt-2 text-[12px] leading-6">' + d.bronnen.map(function (b) {
              return '<li><a href="' + b[1] + '" target="_blank" rel="noopener noreferrer" class="font-semibold text-[#2f6f8f] underline decoration-dotted underline-offset-2">' + b[0] + '</a></li>';
            }).join("") + '</ul></div>' +
        '</div></div>' : '') +
    '</article>';
  }

  window.__EK_DONEDEALS__ = {
    setFilter: function (f) { filter = f; open = null; },
    toggle: function (id) { open = open === id ? null : id; },
    click: function (e) {
      var b = e.target.closest("[data-ek-bel]");
      if (!b) return false;
      var d = new Date();
      gebeld[b.getAttribute("data-ek-bel")] =
        T("vandaag om ", "today at ") + String(d.getHours()).padStart(2, "0") + ":" + String(d.getMinutes()).padStart(2, "0");
      return true;
    },
    stempel: function () { return filter + "|" + open + "|" + Object.keys(gebeld).join(","); },
    html: function () {
      var D = deals();
      var tel = function (k) { return D.filter(function (d) { return d.afloop === k; }).length; };
      var zicht = filter === "alle" ? D : D.filter(function (d) { return d.afloop === filter; });
      var knop = function (k, tekst, n) {
        return '<button type="button" data-ek-dealfilter="' + k + '" class="border px-3 py-2 text-[10px] font-bold uppercase tracking-[0.12em] ' +
          (filter === k ? 'border-[#010b22] bg-[#010b22] text-white' : 'border-slate-300 bg-white text-[#13263a]') + '">' + tekst + ' ' + n + '</button>';
      };
      return '<section class="mt-5 border border-[#d9ddd6] bg-white">' +
        '<div class="flex flex-wrap items-start justify-between gap-4 border-b border-slate-200 p-5">' +
          '<div><p class="' + LBL + '">' + T("Geheugen van de radar", "Memory of the radar") + '</p>' +
          '<h3 class="mt-1 text-[20px] font-semibold tracking-[-0.03em] text-[#13263a]">Done Deals</h3>' +
          '<p class="mt-2 max-w-3xl text-[12px] leading-5 text-[#010b22]/65">' +
          T("Elke afgeronde partij blijft bewaard, met de betrokkenen en de bronnen erbij. Ook de dossiers die tegenvielen, want daar zit de meeste informatie in. Klik een regel open voor het hele verhaal.",
            "Every completed lot is kept, with the parties and the sources attached. The files that disappointed too, because that is where most of the information sits. Open a row for the full story.") + '</p></div>' +
          '<span class="border border-slate-300 bg-white px-3 py-2 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500">' +
          D.length + T(" dossiers", " files") + '</span>' +
        '</div>' +
        '<div class="flex flex-wrap gap-2 border-b border-slate-200 p-4">' +
          knop("alle", T("Alles", "All"), D.length) +
          knop("goed", T("Geslaagd", "Success"), tel("goed")) +
          knop("gemengd", T("Gemengd", "Mixed"), tel("gemengd")) +
          knop("tegenvaller", T("Tegenvallers", "Setbacks"), tel("tegenvaller")) +
        '</div>' +
        zicht.map(rij).join("") + '</section>';
    }
  };
})();
