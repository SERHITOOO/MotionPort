import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import PremiumVehicleRender from "../components/PremiumVehicleRender";

type Airport = {
  name: string;
  shortName: string;
  passengers2024: number;
  passengers2025: number;
  growth: number;
  role: string;
  priority: string;
};

type Scenario = {
  name: string;
  cars: number;
  days: number;
  adr: number;
  monthlyRevenue: number;
  tone: string;
};

const airportData: Airport[] = [
  {
    name: "Warsaw Chopin",
    shortName: "Warszawa",
    passengers2024: 21261806,
    passengers2025: 24082472,
    growth: 13.3,
    role: "Hub startowy, największa skala, corporate.",
    priority: "1"
  },
  {
    name: "Kraków Balice",
    shortName: "Kraków",
    passengers2024: 11071697,
    passengers2025: 13240237,
    growth: 19.6,
    role: "Turystyka, premium leisure, biznes.",
    priority: "2"
  },
  {
    name: "Gdańsk",
    shortName: "Gdańsk",
    passengers2024: 6698533,
    passengers2025: 7378788,
    growth: 10.2,
    role: "Leisure, regional business, sezonowość do testu.",
    priority: "3"
  },
  {
    name: "Katowice",
    shortName: "Katowice",
    passengers2024: 6365359,
    passengers2025: 7287973,
    growth: 14.5,
    role: "Duży catchment, logistyka, klienci regionalni.",
    priority: "3"
  },
  {
    name: "Wrocław",
    shortName: "Wrocław",
    passengers2024: 4467264,
    passengers2025: 4900876,
    growth: 9.7,
    role: "Tech, biznes, corporate.",
    priority: "4"
  },
  {
    name: "Poznań",
    shortName: "Poznań",
    passengers2024: 3597147,
    passengers2025: 4137563,
    growth: 15.0,
    role: "Biznes, targi, eventy.",
    priority: "4"
  }
];

const airportMapPoints: Record<
  string,
  {
    x: string;
    y: string;
    lane: string;
    labelTransform: string;
  }
> = {
  "Warsaw Chopin": {
    x: "55%",
    y: "46%",
    lane: "Hub startowy",
    labelTransform: "translate(24px, -50%)"
  },
  "Kraków Balice": {
    x: "57%",
    y: "75%",
    lane: "Premium leisure + biznes",
    labelTransform: "translate(24px, 8px)"
  },
  Gdańsk: {
    x: "48%",
    y: "15%",
    lane: "Leisure + regional business",
    labelTransform: "translate(22px, -50%)"
  },
  Katowice: {
    x: "49%",
    y: "70%",
    lane: "Catchment regionalny",
    labelTransform: "translate(calc(-100% - 22px), -50%)"
  },
  Wrocław: {
    x: "31%",
    y: "66%",
    lane: "Tech + corporate",
    labelTransform: "translate(22px, -50%)"
  },
  Poznań: {
    x: "28%",
    y: "48%",
    lane: "Biznes + eventy",
    labelTransform: "translate(22px, -50%)"
  }
};

const topSixTraffic2025 = airportData.reduce(
  (total, airport) => total + airport.passengers2025,
  0
);

const scenarioData: Scenario[] = [
  {
    name: "Ostrożny",
    cars: 10,
    days: 14,
    adr: 300,
    monthlyRevenue: 42000,
    tone: "border-white/10 bg-white/[0.035]"
  },
  {
    name: "Bazowy",
    cars: 10,
    days: 18,
    adr: 350,
    monthlyRevenue: 63000,
    tone: "border-electric/25 bg-electric/[0.07]"
  },
  {
    name: "Ambitny",
    cars: 10,
    days: 22,
    adr: 450,
    monthlyRevenue: 99000,
    tone: "border-limepulse/25 bg-limepulse/[0.06]"
  }
];

const scaleData = [10, 25, 50, 100, 250].map((cars) => ({
  cars,
  monthlyRevenue: cars * 6300
}));

const pilotSimulatorPresets = [
  {
    name: "Lean",
    fleetSize: 10,
    adr: 300,
    rentalDays: 14,
    leaseCost: 2900,
    insurance: 600,
    cleaningCost: 75,
    damageReserve: 450,
    cac: 70,
    bookings: 7
  },
  {
    name: "Bazowy",
    fleetSize: 10,
    adr: 350,
    rentalDays: 18,
    leaseCost: 3200,
    insurance: 650,
    cleaningCost: 80,
    damageReserve: 450,
    cac: 65,
    bookings: 8
  },
  {
    name: "Premium",
    fleetSize: 10,
    adr: 450,
    rentalDays: 22,
    leaseCost: 3800,
    insurance: 800,
    cleaningCost: 95,
    damageReserve: 600,
    cac: 85,
    bookings: 9
  }
];

const heroMetrics = [
  {
    value: "24,1 mln",
    label: "pasażerów",
    detail: "Lotnisko Chopina 2025",
    source: "ULC, PDF Q4 2025"
  },
  {
    value: "USD 22,37 mld",
    label: "rynek Europy",
    detail: "Vehicle rental 2026",
    source: "Mordor Intelligence, estymacja"
  },
  {
    value: "10 aut",
    label: "pierwszy pilotaż",
    detail: "mała skala, szybka walidacja",
    source: "założenie"
  },
  {
    value: "90 dni",
    label: "czas walidacji",
    detail: "stop, optimize albo scale",
    source: "założenie"
  },
  {
    value: "18 dni/mies.",
    label: "bazowe obłożenie auta",
    detail: "do potwierdzenia",
    source: "założenie"
  },
  {
    value: "63 tys. PLN",
    label: "miesięcznie z 10 aut",
    detail: "model przed kosztami",
    source: "założenie"
  }
];

const objectionsData = [
  {
    objection: "To tylko wypożyczalnia.",
    answer:
      "Nie, jeśli model zostanie zbudowany wokół lotniskowego popytu, selekcji floty, corporate accounts, danych o obłożeniu i partnerstw z dealerami/importerami. Sama flota nie jest przewagą. Przewagą ma być powtarzalny playbook."
  },
  {
    objection: "To będzie zbyt kapitałochłonne.",
    answer:
      "Takie ryzyko istnieje. Dlatego pierwszy etap to mały pilotaż, leasing, partnerstwa dealerskie albo struktura revenue-share, a nie agresywny zakup floty."
  },
  {
    objection: "Konkurencja już istnieje.",
    answer:
      "Klasyczne wypożyczalnie konkurują dostępnością i klasą auta. Ten model próbuje konkurować doświadczeniem, konkretnym typem pojazdu, premium prezentacją i wartością dla marek samochodowych."
  },
  {
    objection: "Skąd wiadomo, że będzie popyt?",
    answer:
      "Nie wiadomo. Dlatego model jest ustawiony jako 90-dniowa walidacja, a nie obietnica. Kluczowe KPI: obłożenie, ADR, CAC, szkody, powroty klientów i corporate pipeline."
  },
  {
    objection: "Kto to kupi później?",
    answer:
      "Potencjalnie: wypożyczalnia, dealer group, importer, leasing, fleet management, airport service provider albo platforma mobility, ale tylko jeśli model pokaże powtarzalną ekonomię."
  }
];

const whyNowData = [
  "Rosnący ruch pasażerski.",
  "Wysoka intencja klienta na lotnisku.",
  "Rosnący rynek wynajmu pojazdów w Europie.",
  "Wzrost zainteresowania azjatyckimi EV/hybrydami.",
  "Klienci chcą doświadczać auta przed zakupem.",
  "Dealerzy i importerzy potrzebują nowych kanałów ekspozycji."
];

const technologyModules = [
  {
    title: "Flight-aware pickup",
    stage: "MVP półautomatyczny",
    text:
      "Klient podaje numer lotu. Proces odbioru dopasowuje komunikację do realnego czasu przylotu, opóźnienia i punktu wyjścia z terminala."
  },
  {
    title: "Digital Vehicle Passport",
    stage: "QR w aucie",
    text:
      "Każde auto ma cyfrowy paszport: instrukcja obsługi, zasady zwrotu, ładowanie lub tankowanie, zgłoszenie szkody i kontakt do wsparcia."
  },
  {
    title: "Smart handover",
    stage: "Pre-check + dokumentacja",
    text:
      "Przed odbiorem klient przechodzi podstawowy pre-check, a wydanie auta opiera się na zdjęciach, depozycie, jasnym statusie auta i standardzie zwrotu."
  },
  {
    title: "Fleet Intelligence Dashboard",
    stage: "Panel KPI",
    text:
      "Dashboard pokazuje obłożenie, ADR, koszt obsługi, szkody, reklamacje, popyt na segmenty aut oraz koszt pozyskania rezerwacji."
  },
  {
    title: "Test-drive lead engine",
    stage: "Feedback po jeździe",
    text:
      "Po wynajmie klient może wyrazić zainteresowanie dłuższym testem, kontaktem z dealerem lub zakupem. To tworzy wartość dla importera i dealera."
  },
  {
    title: "Segment demand scoring",
    stage: "Decyzje flotowe",
    text:
      "Pilot porównuje popyt na EV, hybrydy, auta spalinowe, SUV, premium i business. Flota po pilotażu wynika z danych, nie z intuicji."
  },
  {
    title: "Charging / fuel readiness",
    stage: "Gotowość operacyjna auta",
    text:
      "System rozróżnia potrzeby EV, hybryd i aut spalinowych: poziom baterii, paliwo, koszt energii, tankowanie, ładowanie i gotowość do wydania."
  }
];

const technologyMvp = [
  "Rezerwacja webowa i formularz pre-check.",
  "QR / digital vehicle passport w każdym aucie.",
  "Ręcznie wspierany flight-aware pickup.",
  "Panel KPI dla pilotażu.",
  "Feedback po jeździe i lead dla partnera.",
  "Raport tygodniowy: popyt, koszty, szkody, segmenty."
];

const technologyLater = [
  "Integracja z danymi lotów.",
  "Digital key lub lockbox tam, gdzie proces i prawo na to pozwolą.",
  "Integracje z telematyką i systemem rezerwacji.",
  "Automatyczne scoringi segmentów floty.",
  "Panel dla partnera flotowego, dealera lub importera.",
  "Model rekomendacji floty dla kolejnego lotniska."
];

const revenueStreams = [
  "Przychód z najmu dziennego.",
  "Pakiety weekendowe i premium.",
  "Opłata za odbiór lub zwrot przy lotnisku.",
  "Powtarzalne konta corporate.",
  "Dłuższy najem B2B.",
  "Pakiety ochrony, ubezpieczenia i dodatki.",
  "Delivery, concierge i obsługa poza godzinami.",
  "Partnerstwa test-drive z dealerami lub importerami.",
  "Ekspozycja marki i formaty promocyjne.",
  "Leady sprzedażowe dla dealerów i importerów.",
  "Remarketing floty i optymalizacja wartości rezydualnej."
];

const pilotPlan = [
  {
    period: "Dni 0-30",
    items: [
      "Finalne warunki pozyskania floty.",
      "Landing page i test zainteresowania rezerwacją.",
      "Siatka cen i warianty segmentów aut.",
      "Zasady depozytu, ubezpieczenia i odpowiedzialności.",
      "Pierwszy proces operacyjny przy lotnisku.",
      "Dashboard pomiaru KPI."
    ]
  },
  {
    period: "Dni 31-60",
    items: [
      "Testy płatnego pozyskania rezerwacji.",
      "Sprzedaż do firm i executive assistantów.",
      "Rozmowy z hotelami, concierge i parkingami.",
      "Rozmowy z dealerami oraz importerami.",
      "Pomiar obłożenia i problemów operacyjnych.",
      "Korekta cen oraz zasad wydania auta."
    ]
  },
  {
    period: "Dni 61-90",
    items: [
      "Przegląd marży kontrybucyjnej.",
      "Przegląd szkód, reklamacji i ubezpieczenia.",
      "Ocena CAC oraz konwersji kanałów.",
      "Ocena powrotów klientów i zapytań corporate.",
      "Ocena gotowości partnerów do skali.",
      "Decyzja: zatrzymać, poprawić albo skalować."
    ]
  }
];

const scaleCriteria = [
  "Obłożenie zbliża się do 18 dni najmu na auto miesięcznie albo je przekracza.",
  "ADR utrzymuje się blisko lub powyżej 350 PLN.",
  "Marża kontrybucyjna na aucie jest dodatnia po kosztach bezpośrednich.",
  "CAC jest powtarzalny i nie niszczy marży.",
  "Poziom szkód i reklamacji jest kontrolowany.",
  "Pojawia się pipeline corporate.",
  "Klienci rozumieją i doceniają selekcjonowaną flotę premium.",
  "Warunki pozyskania floty dają się powtórzyć."
];

const killCriteria = [
  "Obłożenie pozostaje słabe mimo testów kanałów.",
  "Klienci kupują tylko po dużym rabacie.",
  "Szkody i ubezpieczenie kasują marżę.",
  "Płatne pozyskanie rezerwacji jest zbyt drogie.",
  "Wydanie auta przy lotnisku jest operacyjnie chaotyczne.",
  "Finansowanie floty zabija marżę kontrybucyjną.",
  "Partner strategiczny nie widzi wartości poza najmem.",
  "Model działa tylko dzięki ręcznej pracy foundera."
];

const kpiData = [
  ["Dni najmu na auto / miesiąc", "cel 18", "pomiar w pilotażu"],
  ["ADR", "cel 350 PLN", "do walidacji"],
  ["Przychód na auto", "6 300 PLN", "model przed kosztami"],
  ["Marża kontrybucyjna na auto", "dodatnia", "do walidacji"],
  ["CAC na rezerwację", "próg", "pomiar w pilotażu"],
  ["Szkody i reklamacje", "kontrola", "do walidacji"],
  ["Konwersja rezerwacji", "pomiar", "pomiar w pilotażu"],
  ["Powroty klientów", "pomiar", "pomiar w pilotażu"],
  ["Leady corporate", "pipeline", "do walidacji"],
  ["Czas odbioru przy lotnisku", "pomiar", "pomiar w pilotażu"],
  ["NPS", "pomiar", "pomiar w pilotażu"],
  ["Popyt na segmenty aut", "segmentacja", "pomiar w pilotażu"]
];

const customerSegments = [
  {
    title: "Klient biznesowy",
    text: "Szybki odbiór, faktura, przewidywalne auto i wizerunek premium."
  },
  {
    title: "Turysta / weekend",
    text: "Komfort, jasne zasady i możliwość wyboru auta lepszego niż standardowa klasa rentalowa."
  },
  {
    title: "Corporate",
    text: "Powtarzalne użycie, stałe zasady konta, raportowanie i przewidywalna obsługa."
  },
  {
    title: "EV / hybrid curious",
    text: "Realny test auta przed zakupem lub dłuższą decyzją flotową."
  },
  {
    title: "Dealer / importer",
    text: "Ekspozycja, leady i dane o zachowaniu klientów w realnym użyciu."
  }
];

const gtmChannels = [
  "Google Search na intencję wynajmu przy lotnisku.",
  "Outbound do firm, biur zarządu i executive assistantów.",
  "Hotele, concierge i partnerzy premium travel.",
  "Co-marketing z dealerem lub importerem.",
  "Retargeting.",
  "LinkedIn B2B.",
  "Partnerstwa premium travel i parkingi okołolotniskowe."
];

const strategicPartners = [
  ["Grupa dealerska", "Najem jako wydłużony test-drive i kanał leadów sprzedażowych."],
  ["Importer", "Ekspozycja rynku i feedback dla marek azjatyckich."],
  ["Leasing", "Ulokowanie floty z potencjałem obłożenia i danych popytowych."],
  ["Fleet management", "Pion airport premium jako nowy use case flotowy."],
  ["Operator usług lotniskowych", "Dodatkowa monetyzacja ruchu pasażerskiego."],
  ["Klienci corporate", "Mobilność premium bez własnej floty."]
];

const positioningMatrix = [
  ["Tradycyjny rental", "Duży wolumen floty, słaba narracja konkretnego pojazdu."],
  ["Taxi / chauffeur", "Wygodne, ale bez samodzielnego doświadczenia auta premium."],
  ["Car sharing", "Miejskie, krótkie użycie, mniej premium i mniej airport-first."],
  ["Jazda próbna u dealera", "Krótka, sprzedażowa, daleka od realnego użycia w podróży."],
  ["MotionPort", "Airport-first, selekcjonowana flota premium, przychód z najmu plus wartość kanału dla marek."]
];

const potentialMoat = [
  "Playbook operacyjny przy lotnisku.",
  "Warunki pozyskania floty.",
  "Partnerstwa dealer / importer.",
  "Relacje corporate.",
  "Dane popytu na konkretne auta.",
  "Dane kosztu pozyskania klienta.",
  "Premium brand experience.",
  "SOP szkód, odbioru i zwrotu.",
  "Powtarzalny launch playbook lokalizacji.",
  "Zarządzanie wartością rezydualną."
];

const riskData = [
  ["Kapitałochłonność", "Mały pilot, leasing, partnerstwo dealerskie, revenue-share, bez dużego zakupu floty przed dowodem ekonomii."],
  ["Niskie obłożenie", "Test 10 aut, dynamic pricing, kanały corporate, śledzenie CAC per kanał."],
  ["Szkody / ubezpieczenie", "Depozyty, pakiety ochrony, inspekcje, telematyka i rezerwa na szkody."],
  ["Sezonowość", "Konta corporate, elastyczna flota, kilka lotnisk i pakiety weekendowe."],
  ["Konkurencja", "Selekcja premium, story konkretnego auta, wartość dla partnerów i lepsze doświadczenie."],
  ["Logistyka lotniskowa", "SOP, partner parkingowy, test odbioru i zwrotu, alternatywa okołolotniskowa."],
  ["Ładowanie EV", "Flota mieszana: EV, hybryda i wybrane auta spalinowe."],
  ["Wartość rezydualna", "Modele łatwiejsze w odsprzedaży, leasing, buyback lub wsparcie dealera."],
  ["CAC", "Priorytet dla high-intent search i corporate; szybkie wygaszanie słabych kanałów."],
  ["Brak skalowalności", "Playbook drugiego lotniska, progi KPI i standaryzacja operacji."]
];

const mustBeTrue = [
  "Klienci muszą płacić za premium, nie tylko reagować na rabat.",
  "10 aut musi zbliżyć się do bazowego obłożenia.",
  "ADR musi przetrwać test realnego popytu.",
  "Koszty bezpośrednie nie mogą zjadać marży.",
  "Szkody muszą być zarządzalne.",
  "Co najmniej jeden kanał pozyskania musi działać powtarzalnie.",
  "Popyt corporate musi pokazać powtarzalność.",
  "Pozyskanie floty musi dać się powtórzyć.",
  "Proces przy lotnisku nie może być zbyt chaotyczny.",
  "Partner strategiczny musi widzieć wartość poza przychodem z najmu."
];

const useOfFunds = [
  "Depozyty flotowe lub wsparcie leasingu.",
  "Ubezpieczenie i setup operacyjny.",
  "System rezerwacji i analityka.",
  "Proces wydania auta przy lotnisku.",
  "Testy marketingowe.",
  "Sprzedaż corporate.",
  "Legal i compliance.",
  "Premium content i prezentacja aut.",
  "Bufor kapitału obrotowego.",
  "Dashboard danych."
];

const milestoneData = [
  ["Etap 0", "Teaser inwestorski i rozmowy z partnerami."],
  ["Etap 1", "10-autowy pilot w Warszawie, 90 dni."],
  ["Etap 2", "25-50 aut, drugie lotnisko albo konta corporate."],
  ["Etap 3", "100+ aut, 3 lotniska, dodatnia ekonomia jednostkowa."],
  ["Etap 4", "Inwestycja strategiczna, akwizycja, roll-up albo ekspansja CEE."]
];

const exitBuyerData = [
  "Grupa car rental.",
  "Grupa dealerska.",
  "Importer automotive.",
  "Firma leasingowa.",
  "Fleet management.",
  "Operator usług lotniskowych.",
  "Platforma mobility.",
  "Operator corporate mobility."
];

const exitTriggers = [
  "100+ aut.",
  "3+ lotniska.",
  "Powtarzalny CAC.",
  "Dodatnia marża kontrybucyjna.",
  "Stabilne obłożenie.",
  "Konta corporate.",
  "Partnerstwo dealer / importer.",
  "Niski poziom szkód i reklamacji.",
  "Silne SOP.",
  "Dane potwierdzające popyt na pojazdy."
];

const finalInvestorDecision = [
  "Rynek jest wystarczająco duży, żeby go testować.",
  "Warszawa jest logicznym pierwszym pilotem.",
  "Model jest ryzykowny, ale mierzalny.",
  "Największe ryzyko to kapitałochłonność.",
  "Pierwszy pilot może istotnie obniżyć to ryzyko.",
  "Skalowanie musi być warunkowe, nie emocjonalne.",
  "Exit strategiczny ma sens tylko po udowodnieniu ekonomii lotniskowej."
];

function formatNumber(value: number) {
  return new Intl.NumberFormat("pl-PL").format(value);
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pl-PL", {
    maximumFractionDigits: 0
  }).format(value);
}

function getHomeHref() {
  const routeIndex = window.location.pathname.indexOf("/investor");
  if (routeIndex < 0) {
    return "./";
  }

  const basePath = window.location.pathname.slice(0, routeIndex);
  return `${basePath || ""}/`;
}

function SectionHeader({
  eyebrow,
  title,
  text
}: {
  eyebrow: string;
  title: string;
  text?: string;
}) {
  return (
    <div className="mb-10 max-w-4xl">
      <p className="eyebrow mb-4 border-electric/20 bg-electric/10 text-electric">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">
        {title}
      </h2>
      {text && <p className="mt-6 text-lg leading-8 text-mist/70">{text}</p>}
    </div>
  );
}

function MetricCard({
  value,
  label,
  detail,
  source
}: {
  value: string;
  label: string;
  detail: string;
  source?: string;
}) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      className="rounded-lg border border-white/10 bg-white/[0.04] p-5"
    >
      <p className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
        {value}
      </p>
      <p className="mt-2 text-sm font-semibold uppercase tracking-[0.16em] text-mist/50">
        {label}
      </p>
      <p className="mt-4 text-sm leading-6 text-mist/70">{detail}</p>
      {source && (
        <p className="mt-4 text-xs uppercase tracking-[0.16em] text-electric/80">
          {source}
        </p>
      )}
    </motion.article>
  );
}

function MemoCard() {
  return (
    <section id="thesis" className="section-shell py-16 sm:py-20">
      <motion.div
        initial={{ y: 28, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: false, amount: 0.25 }}
        transition={{ duration: 0.6 }}
        className="rounded-lg border border-limepulse/20 bg-[linear-gradient(145deg,rgba(182,255,77,0.10),rgba(255,255,255,0.04))] p-7 shadow-limeglow sm:p-10"
      >
        <p className="eyebrow mb-6 border-limepulse/20 bg-limepulse/10 text-limepulse">
          Teza inwestycyjna
        </p>
        <p className="max-w-5xl text-2xl font-semibold leading-tight tracking-tight text-white sm:text-4xl">
          Nie zakładamy, że rynek potrzebuje kolejnej wypożyczalni. Testujemy,
          czy lotnisko jako kanał popytu, selekcjonowana flota premium i
          partnerstwa dealersko-importerskie mogą stworzyć powtarzalny model
          monetyzacji aut, który da się skalować lotnisko po lotnisku.
        </p>
        <p className="mt-8 max-w-3xl text-lg leading-8 text-mist/75">
          Pierwszy cel nie brzmi: kupić flotę. Pierwszy cel brzmi: potwierdzić
          ekonomię 10 aut.
        </p>
      </motion.div>
    </section>
  );
}

function TechnologyLayer() {
  return (
    <section id="technology" className="section-shell py-16 sm:py-20">
      <SectionHeader
        eyebrow="Warstwa technologiczna"
        title="Airport Mobility OS: technologia ma walidować operację, nie udawać gotowej platformy."
        text="Najpierw prosty, mierzalny system pilotażowy: cyfrowy odbiór, instrukcja auta, dane floty i raport dla partnera. Dopiero po walidacji warto automatyzować droższe elementy."
      />

      <div className="rounded-lg border border-electric/20 bg-[linear-gradient(145deg,rgba(45,226,255,0.10),rgba(255,255,255,0.035))] p-6 sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <p className="eyebrow border-electric/20 bg-electric/10 text-electric">
              Produkt do pilotażu
            </p>
            <h3 className="mt-6 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              MotionPort nie musi zaczynać od dużej aplikacji mobilnej.
            </h3>
            <p className="mt-5 leading-8 text-mist/75">
              Najlepsze MVP to lekka warstwa operacyjna nad flotą: web,
              QR w aucie, dashboard KPI, feedback po jeździe i ręcznie wspierany
              odbiór przy lotnisku. To ogranicza koszt startu i szybciej pokazuje,
              czy model działa.
            </p>
            <p className="mt-5 rounded-lg border border-limepulse/20 bg-limepulse/[0.045] p-4 leading-7 text-mist/75">
              Teza technologiczna: przewaga nie wynika z samego kodu. Wynika z
              połączenia procesu lotniskowego, danych wykorzystania aut, leadów
              dla partnerów i powtarzalnego playbooka lokalizacji.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {technologyModules.map((module, index) => (
              <motion.article
                key={module.title}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: false, amount: 0.25 }}
                transition={{ duration: 0.45, delay: index * 0.03 }}
                className="rounded-lg border border-white/10 bg-night/45 p-5"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-limepulse">
                  {module.stage}
                </p>
                <h4 className="mt-4 text-xl font-semibold text-white">
                  {module.title}
                </h4>
                <p className="mt-4 leading-7 text-mist/70">{module.text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <div className="glass-card rounded-lg p-6">
          <h3 className="text-2xl font-semibold text-white">
            MVP na pierwsze 90 dni
          </h3>
          <div className="mt-6 space-y-3">
            {technologyMvp.map((item) => (
              <p key={item} className="leading-7 text-mist/75">
                {item}
              </p>
            ))}
          </div>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/[0.035] p-6">
          <h3 className="text-2xl font-semibold text-white">
            Automatyzować dopiero po walidacji
          </h3>
          <div className="mt-6 space-y-3">
            {technologyLater.map((item) => (
              <p key={item} className="leading-7 text-mist/75">
                {item}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StickyNav({ homeHref }: { homeHref: string }) {
  const links = [
    ["Teza", "#thesis"],
    ["Technologia", "#technology"],
    ["Rynek", "#market"],
    ["Ekonomia", "#economics"],
    ["Kalkulator", "#calculator"],
    ["Ryzyka", "#risks"],
    ["Exit", "#exit"]
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-night/80 backdrop-blur-xl">
      <nav className="section-shell flex h-16 items-center justify-between gap-4">
        <a href={homeHref} className="flex min-w-0 items-center gap-3">
          <span className="h-2.5 w-2.5 rounded-full bg-electric shadow-glow" />
          <span className="truncate text-xs font-semibold uppercase tracking-[0.22em] text-white sm:text-sm">
            MotionPort dla inwestora
          </span>
        </a>
        <div className="hidden items-center gap-5 xl:flex">
          {links.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="text-sm text-mist/60 transition hover:text-white"
            >
              {label}
            </a>
          ))}
        </div>
        <a
          href={homeHref}
          className="shrink-0 rounded-md border border-white/[0.15] px-4 py-2 text-sm font-semibold text-white transition hover:border-electric hover:bg-electric/10"
        >
          Strona główna
        </a>
      </nav>
    </header>
  );
}

function ObjectionCard({
  objection,
  answer,
  index
}: {
  objection: string;
  answer: string;
  index: number;
}) {
  return (
    <motion.article
      initial={{ y: 22, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: false, amount: 0.28 }}
      transition={{ duration: 0.45, delay: index * 0.04 }}
      className="glass-card rounded-lg p-6"
    >
      <p className="text-sm font-semibold text-electric">Pytanie {index + 1}</p>
      <h3 className="mt-4 text-xl font-semibold text-white">{objection}</h3>
      <p className="mt-4 leading-7 text-mist/70">{answer}</p>
    </motion.article>
  );
}

function AirportChart() {
  const max = Math.max(...airportData.map((airport) => airport.passengers2025));

  return (
    <div className="glass-card rounded-lg p-5 sm:p-7">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h3 className="text-2xl font-semibold text-white">
            Ruch pasażerski 2024 vs 2025
          </h3>
          <p className="mt-2 text-sm text-mist/[0.55]">
            Pasażerowie rocznie, źródło: ULC, PDF Q4 2025. Dane nie obejmują
            pasażerów tranzytowych oraz G.A.
          </p>
        </div>
        <div className="flex gap-4 text-xs uppercase tracking-[0.16em] text-mist/[0.55]">
          <span className="flex items-center gap-2">
            <span className="h-2 w-5 rounded-full bg-white/25" />
            2024
          </span>
          <span className="flex items-center gap-2">
            <span className="h-2 w-5 rounded-full bg-electric" />
            2025
          </span>
        </div>
      </div>
      <div className="space-y-5">
        {airportData.map((airport) => {
          const width2024 = (airport.passengers2024 / max) * 100;
          const width2025 = (airport.passengers2025 / max) * 100;

          return (
            <div key={airport.name} className="grid gap-3 md:grid-cols-[150px_1fr] md:items-center">
              <div>
                <p className="font-semibold text-white">{airport.shortName}</p>
                <p className="text-sm text-limepulse">+{airport.growth}% r/r</p>
              </div>
              <div className="space-y-2">
                <div className="h-3 rounded-full bg-white/[0.08]">
                  <div
                    className="h-3 rounded-full bg-white/25"
                    style={{ width: `${width2024}%` }}
                  />
                </div>
                <div className="h-3 rounded-full bg-white/[0.08]">
                  <div
                    className="h-3 rounded-full bg-gradient-to-r from-electric to-limepulse"
                    style={{ width: `${width2025}%` }}
                  />
                </div>
                <p className="text-xs text-mist/50">
                  {formatNumber(airport.passengers2025)} pax 2025
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function AirportRolloutMap() {
  const [selectedAirport, setSelectedAirport] = useState(airportData[0]);
  const selectedPoint = airportMapPoints[selectedAirport.name];
  const hubPoint = airportMapPoints["Warsaw Chopin"];

  return (
    <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
      <div className="relative overflow-hidden rounded-lg border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.08),rgba(255,255,255,0.025))] p-5">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_58%_52%,rgba(45,226,255,0.16),transparent_24%),radial-gradient(circle_at_36%_66%,rgba(182,255,77,0.10),transparent_18%)]" />

        <div className="relative z-10 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="eyebrow border-electric/20 bg-electric/10 text-electric">
              Mapa rollout
            </p>
            <h3 className="mt-5 max-w-md text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Priorytety wejścia na kolejne lotniska
            </h3>
          </div>
          <p className="max-w-[260px] text-sm leading-6 text-mist/55 sm:text-right">
            Schemat poglądowy. Priorytety wejścia wymagają potwierdzenia z
            partnerem lokalizacji i warunkami floty.
          </p>
        </div>

        <div className="relative z-10 mt-7 h-[390px] overflow-hidden rounded-[34px] border border-white/[0.08] bg-night/45 shadow-inner sm:h-[430px]">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:34px_34px]" />
          <div className="pointer-events-none absolute inset-8 rounded-[34px] border border-white/[0.055]" />
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-10 h-full w-full"
            preserveAspectRatio="none"
          >
            {airportData
              .filter((airport) => airport.name !== "Warsaw Chopin")
              .map((airport) => {
                const point = airportMapPoints[airport.name];
                const isSelected = airport.name === selectedAirport.name;

                return (
                  <line
                    key={airport.name}
                    x1={hubPoint.x}
                    y1={hubPoint.y}
                    x2={point.x}
                    y2={point.y}
                    stroke={isSelected ? "rgba(182,255,77,0.72)" : "rgba(45,226,255,0.30)"}
                    strokeWidth={isSelected ? 1.7 : 1}
                    strokeLinecap="round"
                    strokeDasharray={isSelected ? "0" : "5 8"}
                    vectorEffect="non-scaling-stroke"
                  />
                );
              })}
          </svg>

          {airportData.map((airport) => {
            const point = airportMapPoints[airport.name];
            const isSelected = airport.name === selectedAirport.name;

            return (
              <button
                key={airport.name}
                type="button"
                onClick={() => setSelectedAirport(airport)}
                className={`absolute -translate-x-1/2 -translate-y-1/2 text-left ${
                  isSelected ? "z-30" : "z-20"
                }`}
                style={{ left: point.x, top: point.y }}
              >
                <span
                  className={`absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full border transition ${
                    isSelected
                      ? "border-limepulse/70 bg-limepulse/15 shadow-[0_0_36px_rgba(182,255,77,0.25)]"
                      : "border-electric/30 bg-electric/10"
                  }`}
                />
                <span className="relative flex h-4 w-4 rounded-full bg-white p-1 shadow-[0_0_28px_rgba(45,226,255,0.70)]">
                  <span
                    className={`h-full w-full rounded-full ${
                      isSelected ? "bg-limepulse" : "bg-electric"
                    }`}
                  />
                </span>
                <span
                  className={`absolute left-0 top-0 hidden min-w-max rounded-md border px-3 py-2 text-xs font-semibold backdrop-blur sm:block ${
                    isSelected
                      ? "border-limepulse/30 bg-night/85 text-white"
                      : "border-white/10 bg-night/65 text-mist/65"
                  }`}
                  style={{ transform: point.labelTransform }}
                >
                  {airport.shortName}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <motion.div
        key={selectedAirport.name}
        initial={{ y: 16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.28 }}
        className="glass-card rounded-lg p-6"
      >
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-electric">
          Priorytet {selectedAirport.priority}
        </p>
        <h3 className="mt-4 text-3xl font-semibold tracking-tight text-white">
          {selectedAirport.name}
        </h3>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-white/10 bg-white/[0.035] p-4">
            <p className="text-2xl font-semibold text-white">
              {formatNumber(selectedAirport.passengers2025)}
            </p>
            <p className="mt-2 text-xs uppercase tracking-[0.16em] text-mist/45">
              pasażerowie 2025
            </p>
          </div>
          <div className="rounded-lg border border-limepulse/20 bg-limepulse/[0.045] p-4">
            <p className="text-2xl font-semibold text-limepulse">
              +{selectedAirport.growth}%
            </p>
            <p className="mt-2 text-xs uppercase tracking-[0.16em] text-mist/45">
              wzrost r/r
            </p>
          </div>
        </div>
        <div className="mt-5 rounded-lg border border-white/10 bg-night/40 p-5">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-mist/50">
            Rola w strategii
          </p>
          <p className="mt-3 leading-7 text-mist/75">{selectedAirport.role}</p>
        </div>
        <div className="mt-5 rounded-lg border border-electric/20 bg-electric/[0.045] p-5">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-electric">
            {selectedPoint.lane}
          </p>
          <p className="mt-3 leading-7 text-mist/75">
            Kliknięcie lotniska zmienia parametry ekspansji. Docelowo ten moduł
            może pokazywać lokalny CAC, obłożenie, partnerów i progi wejścia.
          </p>
        </div>
      </motion.div>
    </div>
  );
}

function ScenarioChart() {
  const max = Math.max(...scenarioData.map((scenario) => scenario.monthlyRevenue));

  return (
    <div className="glass-card rounded-lg p-6">
      <h3 className="text-2xl font-semibold text-white">
        Porównanie scenariuszy miesięcznego przychodu
      </h3>
      <p className="mt-2 text-sm text-mist/[0.55]">
        Model założeń. Nie wynik historyczny.
      </p>
      <div className="mt-7 space-y-5">
        {scenarioData.map((scenario) => (
          <div key={scenario.name}>
            <div className="mb-2 flex items-center justify-between gap-4 text-sm">
              <span className="font-semibold text-white">{scenario.name}</span>
              <span className="text-mist/[0.65]">
                {formatCurrency(scenario.monthlyRevenue)} PLN/mies.
              </span>
            </div>
            <div className="h-4 rounded-full bg-white/[0.08]">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${(scenario.monthlyRevenue / max) * 100}%` }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 0.7 }}
                className="h-4 rounded-full bg-gradient-to-r from-electric to-limepulse"
              />
            </div>
            <p className="mt-2 text-xs text-mist/50">
              {scenario.cars} aut, {scenario.days} dni/mies., {scenario.adr} PLN/dzień
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ScaleChart() {
  const max = Math.max(...scaleData.map((item) => item.monthlyRevenue));

  return (
    <div className="glass-card rounded-lg p-6">
      <h3 className="text-2xl font-semibold text-white">
        Flota vs miesięczny przychód
      </h3>
      <p className="mt-2 text-sm text-mist/[0.55]">
        Scenariusz bazowy: 350 PLN/dzień, 18 dni najmu miesięcznie, 6 300 PLN przychodu na auto miesięcznie.
      </p>
      <div className="mt-8 grid h-72 grid-cols-5 items-end gap-3">
        {scaleData.map((item) => (
          <div key={item.cars} className="flex h-full flex-col justify-end gap-3">
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: `${(item.monthlyRevenue / max) * 100}%` }}
              viewport={{ once: false, amount: 0.4 }}
              transition={{ duration: 0.7 }}
              className="min-h-2 rounded-t-md bg-gradient-to-t from-electric to-limepulse"
            />
            <div className="text-center">
              <p className="text-sm font-semibold text-white">{item.cars}</p>
              <p className="text-[0.68rem] text-mist/[0.45]">aut</p>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-5 rounded-lg border border-limepulse/20 bg-limepulse/[0.045] p-4 leading-7 text-mist/75">
        Model przed kosztami. Skalowanie floty bez potwierdzonej marży
        kontrybucyjnej jest błędem.
      </p>
    </div>
  );
}

function InvestorCalculator() {
  const [fleetSize, setFleetSize] = useState(10);
  const [adr, setAdr] = useState(350);
  const [rentalDays, setRentalDays] = useState(18);
  const [leaseCost, setLeaseCost] = useState(3200);
  const [insurance, setInsurance] = useState(650);
  const [cleaningCost, setCleaningCost] = useState(80);
  const [damageReserve, setDamageReserve] = useState(450);
  const [cac, setCac] = useState(65);
  const [bookings, setBookings] = useState(8);

  const output = useMemo(() => {
    const revenuePerVehicle = adr * rentalDays;
    const monthlyRevenue = revenuePerVehicle * fleetSize;
    const annualizedRevenue = monthlyRevenue * 12;
    const variableCostPerCar = cleaningCost * bookings + cac * bookings;
    const costPerCar = leaseCost + insurance + damageReserve + variableCostPerCar;
    const contributionPerVehicle = revenuePerVehicle - costPerCar;
    const contributionMargin = contributionPerVehicle * fleetSize;
    const breakEvenDays = adr > 0 ? Math.ceil(costPerCar / adr) : 0;

    return {
      monthlyRevenue,
      annualizedRevenue,
      costPerCar,
      contributionMargin,
      breakEvenDays,
      revenuePerVehicle,
      contributionPerVehicle
    };
  }, [
    adr,
    bookings,
    cac,
    cleaningCost,
    damageReserve,
    fleetSize,
    insurance,
    leaseCost,
    rentalDays
  ]);

  const inputs = [
    ["Wielkość floty", fleetSize, setFleetSize, 1, 250],
    ["Średnia stawka dzienna", adr, setAdr, 100, 900],
    ["Dni najmu na auto / miesiąc", rentalDays, setRentalDays, 1, 30],
    ["Miesięczny koszt leasingu / finansowania na auto", leaseCost, setLeaseCost, 0, 9000],
    ["Ubezpieczenie na auto", insurance, setInsurance, 0, 3000],
    ["Serwis / czyszczenie na rezerwację", cleaningCost, setCleaningCost, 0, 500],
    ["Rezerwa na szkody na auto", damageReserve, setDamageReserve, 0, 3000],
    ["CAC na rezerwację", cac, setCac, 0, 700],
    ["Średnia liczba rezerwacji na auto", bookings, setBookings, 1, 30]
  ] as const;

  const applyPreset = (preset: (typeof pilotSimulatorPresets)[number]) => {
    setFleetSize(preset.fleetSize);
    setAdr(preset.adr);
    setRentalDays(preset.rentalDays);
    setLeaseCost(preset.leaseCost);
    setInsurance(preset.insurance);
    setCleaningCost(preset.cleaningCost);
    setDamageReserve(preset.damageReserve);
    setCac(preset.cac);
    setBookings(preset.bookings);
  };

  const contributionRatio =
    output.monthlyRevenue > 0
      ? Math.max(
          0,
          Math.min(100, (output.contributionMargin / output.monthlyRevenue) * 100)
        )
      : 0;
  const breakEvenProgress = Math.min(100, (rentalDays / output.breakEvenDays) * 100);

  return (
    <section id="calculator" className="section-shell py-16 sm:py-20">
      <SectionHeader
        eyebrow="Symulator pilotażu"
        title="Zmieniaj założenia i od razu zobacz wpływ na ekonomię 10 aut."
        text="To nie jest prognoza finansowa. To interaktywny model wrażliwości, który pokazuje, które zmienne trzeba potwierdzić przed skalowaniem."
      />
      <div className="grid gap-6 lg:grid-cols-[1.02fr_0.98fr]">
        <div className="glass-card rounded-lg p-5 sm:p-7">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {pilotSimulatorPresets.map((preset) => (
              <button
                key={preset.name}
                type="button"
                onClick={() => applyPreset(preset)}
                className="rounded-md border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-white transition hover:border-electric hover:bg-electric/10"
              >
                {preset.name}
              </button>
            ))}
          </div>
          <div className="grid gap-4">
            {inputs.map(([label, value, setter, min, max]) => (
              <label key={label} className="grid gap-2">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm font-semibold text-mist/75">{label}</span>
                  <span className="text-sm text-electric">{formatCurrency(value)}</span>
                </div>
                <input
                  type="range"
                  min={min}
                  max={max}
                  value={value}
                  onChange={(event) => setter(Number(event.target.value))}
                  className="w-full accent-electric"
                />
              </label>
            ))}
          </div>
        </div>

        <div className="grid gap-4">
          <motion.div
            key={`${output.monthlyRevenue}-${output.contributionMargin}`}
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.25 }}
            className="rounded-lg border border-electric/20 bg-[linear-gradient(145deg,rgba(45,226,255,0.10),rgba(255,255,255,0.035))] p-6"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-electric">
              Sygnał pilotażu na żywo
            </p>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <div>
                <p className="text-4xl font-semibold tracking-tight text-white">
                  {formatCurrency(output.monthlyRevenue)} PLN
                </p>
                <p className="mt-2 text-sm text-mist/55">miesięczny przychód</p>
              </div>
              <div>
                <p
                  className={`text-4xl font-semibold tracking-tight ${
                    output.contributionMargin >= 0
                      ? "text-limepulse"
                      : "text-red-300"
                  }`}
                >
                  {formatCurrency(output.contributionMargin)} PLN
                </p>
                <p className="mt-2 text-sm text-mist/55">
                  szacowana kontrybucja
                </p>
              </div>
            </div>
            <div className="mt-7 space-y-5">
              <div>
                <div className="mb-2 flex justify-between text-xs uppercase tracking-[0.16em] text-mist/50">
                  <span>Marża / przychód</span>
                  <span>{contributionRatio.toFixed(0)}%</span>
                </div>
                <div className="h-3 rounded-full bg-white/10">
                  <motion.div
                    animate={{ width: `${contributionRatio}%` }}
                    transition={{ duration: 0.35 }}
                    className="h-3 rounded-full bg-gradient-to-r from-electric to-limepulse"
                  />
                </div>
              </div>
              <div>
                <div className="mb-2 flex justify-between text-xs uppercase tracking-[0.16em] text-mist/50">
                  <span>Dni najmu vs break-even</span>
                  <span>
                    {rentalDays}/{output.breakEvenDays} dni
                  </span>
                </div>
                <div className="h-3 rounded-full bg-white/10">
                  <motion.div
                    animate={{ width: `${breakEvenProgress}%` }}
                    transition={{ duration: 0.35 }}
                    className="h-3 rounded-full bg-gradient-to-r from-limepulse to-electric"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2">
          {[
            ["Przychód annualizowany", `${formatCurrency(output.annualizedRevenue)} PLN`],
            ["Koszt na auto", `${formatCurrency(output.costPerCar)} PLN`],
            ["Próg rentowności w dniach najmu", `${output.breakEvenDays} dni`],
            ["Przychód na pojazd", `${formatCurrency(output.revenuePerVehicle)} PLN`],
            ["Kontrybucja na pojazd", `${formatCurrency(output.contributionPerVehicle)} PLN`]
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-lg border border-white/10 bg-white/[0.04] p-5"
            >
              <p className="text-2xl font-semibold text-white">{value}</p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-mist/50">
                {label}
              </p>
            </div>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function RiskTable() {
  return (
    <section id="risks" className="section-shell py-16 sm:py-20">
      <SectionHeader
        eyebrow="Tabela ryzyk"
        title="Największe ryzyko: kapitałochłonność bez potwierdzonej marży."
        text="Ryzyka są częścią tezy. Inwestor powinien zobaczyć, że pilot jest zaprojektowany po to, żeby je szybko zmierzyć."
      />
      <div className="overflow-hidden rounded-lg border border-white/10">
        {riskData.map(([risk, mitigation], index) => (
          <div
            key={risk}
            className={`grid gap-3 p-5 md:grid-cols-[0.35fr_0.65fr] ${
              index % 2 === 0 ? "bg-white/[0.035]" : "bg-white/[0.015]"
            }`}
          >
            <p className="font-semibold text-white">{risk}</p>
            <p className="leading-7 text-mist/70">{mitigation}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function KPIGrid() {
  return (
    <section className="section-shell py-16 sm:py-20">
      <SectionHeader
        eyebrow="KPI dashboard"
        title="Brak wyników historycznych. Jest plan pomiaru."
        text="Każdy KPI powinien mieć właściciela, próg decyzyjny i tygodniowy rytm raportowania w pilotażu."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpiData.map(([metric, target, status]) => (
          <div
            key={metric}
            className="rounded-lg border border-white/10 bg-white/[0.035] p-5"
          >
            <p className="text-sm font-semibold text-white">{metric}</p>
            <p className="mt-4 text-2xl font-semibold text-electric">{target}</p>
            <p className="mt-3 text-xs uppercase tracking-[0.16em] text-mist/[0.45]">
              {status}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function SourceNote() {
  return (
    <section className="section-shell py-16 sm:py-20">
      <div className="rounded-lg border border-white/10 bg-white/[0.035] p-6 sm:p-8">
        <h2 className="text-3xl font-semibold tracking-tight text-white">
          Źródła i założenia
        </h2>
        <div className="mt-7 grid gap-4 text-sm leading-7 text-mist/70 md:grid-cols-2">
          <p>
            <a
              href="https://www.mordorintelligence.com/industry-reports/europe-vehicle-rental-market"
              className="font-semibold text-electric hover:text-white"
            >
              Mordor Intelligence: Europe Vehicle Rental Market.
            </a>{" "}
            Publiczny opis raportu wskazuje USD 22,37B w 2026, USD 30,91B w 2031
            oraz CAGR 6,68%. To estymacja rynkowa, nie wynik MotionPort.
          </p>
          <p>
            <a
              href="https://www.kenresearch.com/poland-car-rental-mobility-solutions-market"
              className="font-semibold text-electric hover:text-white"
            >
              Ken Research: Poland Car Rental & Mobility Solutions Market.
            </a>{" "}
            Publiczny opis raportu wskazuje wartość rynku około USD 1,2B. To
            estymacja raportu, wymagająca ostrożnego cytowania.
          </p>
          <p>
            <a
              href="https://ulc.gov.pl/_download/statystyki/2025/q4/wg_portow_lotniczych_4kw2025.pdf"
              className="font-semibold text-electric hover:text-white"
            >
              ULC: przewozy według portów lotniczych, Q4 2025.
            </a>{" "}
            Dane lotniskowe 2024/2025 użyte w materiale zostały zweryfikowane z
            PDF-em ULC opublikowanym w kwietniu 2026. Nie obejmują pasażerów
            tranzytowych oraz G.A.
          </p>
          <p>
            Założenia wewnętrzne MotionPort: ADR, obłożenie, wielkość floty,
            scenariusze przychodowe, koszty w kalkulatorze i progi skali. To
            nie są dane historyczne.
          </p>
          <p>
            <a
              href="https://www.iata.org/en/programs/innovation/digital-identity/"
              className="font-semibold text-electric hover:text-white"
            >
              IATA: Digital Identity Program.
            </a>{" "}
            Kierunek rynkowy dla cyfrowej podróży i contactless travel. W
            MotionPort traktowany jako kontekst, nie gotowa integracja.
          </p>
          <p>
            <a
              href="https://www.energy.gov/cmei/femp/telematics-federal-fleets-guide-efficient-fleet-management"
              className="font-semibold text-electric hover:text-white"
            >
              U.S. Department of Energy: fleet telematics.
            </a>{" "}
            Telematyka wspiera pomiar wykorzystania, utrzymania i kosztów floty.
            Integracja w MotionPort byłaby etapem po walidacji MVP.
          </p>
          <p>
            <a
              href="https://www.nrel.gov/transportation/electric-vehicle-infrastructure-rental-car-tool"
              className="font-semibold text-electric hover:text-white"
            >
              NREL: EVI-Rental.
            </a>{" "}
            Narzędzie pokazuje, że EV rental przy lotniskach wymaga modelowania
            ładowania, gotowości aut i wpływu na operacje. MotionPort zakłada
            mieszanie EV, hybryd i wybranych aut spalinowych, aby ograniczyć to
            ryzyko w pilotażu.
          </p>
        </div>
        <p className="mt-7 rounded-lg border border-limepulse/20 bg-limepulse/[0.045] p-4 leading-7 text-mist/75">
          Materiał zawiera założenia robocze do rozmów inwestorskich.
          Scenariusze przychodowe nie są wynikami historycznymi i wymagają
          weryfikacji w pilotażu.
        </p>
      </div>
    </section>
  );
}

function CTASection({ homeHref }: { homeHref: string }) {
  return (
    <section className="section-shell py-16 sm:py-20">
      <div className="rounded-lg border border-electric/20 bg-[linear-gradient(145deg,rgba(45,226,255,0.11),rgba(255,255,255,0.035))] p-7 sm:p-10">
        <p className="eyebrow mb-5 border-electric/20 bg-electric/10 text-electric">
          Decyzja inwestora
        </p>
        <h2 className="max-w-5xl text-4xl font-semibold tracking-tight text-white sm:text-6xl">
          Najpierw 10 aut. Potem dane. Dopiero potem skala.
        </h2>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {finalInvestorDecision.map((item) => (
            <p
              key={item}
              className="rounded-lg border border-white/10 bg-night/40 p-4 leading-7 text-mist/75"
            >
              {item}
            </p>
          ))}
        </div>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a
            href="#pilot-plan"
            className="rounded-md bg-white px-6 py-4 text-center text-sm font-semibold text-night transition hover:bg-electric"
          >
            Zobacz model pilotażu
          </a>
          <a
            href="#economics"
            className="rounded-md border border-limepulse/[0.35] px-6 py-4 text-center text-sm font-semibold text-limepulse transition hover:bg-limepulse/10"
          >
            Sprawdź scenariusze
          </a>
          <a
            href={homeHref}
            className="rounded-md border border-white/[0.15] px-6 py-4 text-center text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Wróć do strony głównej
          </a>
        </div>
      </div>
    </section>
  );
}

export default function InvestorPage() {
  const homeHref = getHomeHref();

  useEffect(() => {
    document.title = "MotionPort | Wersja dla inwestora";
  }, []);

  return (
    <div className="min-h-screen overflow-hidden bg-night text-white">
      <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.032)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.032)_1px,transparent_1px)] bg-[size:48px_48px]" />
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(45,226,255,0.18),transparent_30%),radial-gradient(circle_at_86%_18%,rgba(182,255,77,0.08),transparent_25%),linear-gradient(180deg,#050816_0%,#070B15_48%,#03050B_100%)]" />
      <StickyNav homeHref={homeHref} />

      <main className="relative z-10">
        <section className="section-shell py-14 sm:py-20 lg:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.65 }}
            >
              <p className="eyebrow mb-5 border-limepulse/20 bg-limepulse/10 text-limepulse">
                Wersja dla inwestora / pilot w Warszawie
              </p>
              <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
                Mobilność premium przy lotniskach. Najpierw 10 aut. Potem
                decyzja o skalowaniu.
              </h1>
              <p className="mt-7 max-w-3xl text-lg leading-8 text-mist/75 sm:text-xl">
                Selekcjonowana flota azjatyckich EV, hybryd i wybranych modeli
                spalinowych dla klientów biznesowych, turystów i corporate.
                Start przy Lotnisku Chopina. Skalowanie tylko po potwierdzeniu
                obłożenia, marży i kosztu pozyskania rezerwacji.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href="#thesis"
                  className="rounded-md bg-white px-5 py-3 text-center text-sm font-semibold text-night transition hover:bg-electric"
                >
                  Zobacz tezę inwestycyjną
                </a>
                <a
                  href="#economics"
                  className="rounded-md border border-electric/[0.35] px-5 py-3 text-center text-sm font-semibold text-electric transition hover:bg-electric/10"
                >
                  Sprawdź ekonomię pilotażu
                </a>
                <a
                  href="#technology"
                  className="rounded-md border border-white/[0.15] px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Zobacz Airport Mobility OS
                </a>
                <a
                  href="#exit"
                  className="rounded-md border border-limepulse/[0.35] px-5 py-3 text-center text-sm font-semibold text-limepulse transition hover:bg-limepulse/10"
                >
                  Zobacz ryzyka i exit
                </a>
              </div>
            </motion.div>
            <PremiumVehicleRender compact priority showHotspots />
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {heroMetrics.map((metric) => (
              <MetricCard key={metric.label} {...metric} />
            ))}
          </div>
        </section>

        <MemoCard />
        <TechnologyLayer />

        <section className="section-shell py-16 sm:py-20">
          <SectionHeader
            eyebrow="Najważniejsze pytania inwestora"
            title="Pytania, które trzeba zamknąć przed decyzją o pilotażu"
            text="Sekcja odpowiada wprost na najczęstsze wątpliwości: kapitałochłonność, konkurencję, popyt, skalowalność i potencjalny exit."
          />
          <div className="grid gap-5 lg:grid-cols-2">
            {objectionsData.map((item, index) => (
              <ObjectionCard key={item.objection} index={index} {...item} />
            ))}
          </div>
        </section>

        <section className="section-shell py-16 sm:py-20">
          <SectionHeader
            eyebrow="Dlaczego teraz"
            title="Lotnisko nie jest tylko lokalizacją. Lotnisko jest filtrem klientów z natychmiastową potrzebą mobilności."
          />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {whyNowData.map((item, index) => (
              <div
                key={item}
                className="rounded-lg border border-white/10 bg-white/[0.035] p-5"
              >
                <p className="text-sm font-semibold text-electric">
                  0{index + 1}
                </p>
                <p className="mt-4 text-lg font-semibold text-white">{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="market" className="section-shell py-16 sm:py-20">
          <SectionHeader
            eyebrow="Weryfikacja rynku"
            title="Rynek jest wystarczająco duży, ale pilot ma sprawdzić lokalną ekonomię."
          />
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            <MetricCard
              value="USD 22,37B"
              label="Europejski rynek rental 2026"
              detail="USD 30,91B by 2031, CAGR 6,68%."
              source="Mordor Intelligence"
            />
            <MetricCard
              value="USD 1,2B"
              label="Polski rynek mobility"
              detail="Szacowana wartość rynku car rental & mobility solutions."
              source="Ken Research"
            />
            <MetricCard
              value="24,1M"
              label="Lotnisko Chopina 2025"
              detail="13,3% r/r. Dane zweryfikowane z PDF ULC Q4 2025."
              source="ULC"
            />
            <MetricCard
              value={`${(topSixTraffic2025 / 1000000).toFixed(1)}M`}
              label="Top 6 lotnisk w Polsce"
              detail="Suma ruchu 2025 dla wskazanych lotnisk."
              source="ULC"
            />
          </div>
        </section>

        <section className="section-shell py-16 sm:py-20">
          <AirportChart />
          <p className="mt-6 rounded-lg border border-electric/20 bg-electric/[0.045] p-5 text-lg leading-8 text-mist/80">
            Start w Warszawie nie jest przypadkowy: największy wolumen,
            największa rozpoznawalność, największa szansa na ruch biznesowy i
            corporate.
          </p>
        </section>

        <section className="section-shell py-16 sm:py-20">
          <SectionHeader
            eyebrow="Ekspansja lotniskowa"
            title="Ekspansja lotnisko po lotnisku wymaga playbooka, nie tylko floty."
          />
          <AirportRolloutMap />
          <div className="mt-6 overflow-x-auto rounded-lg border border-white/10">
            <table className="w-full min-w-[860px] border-collapse text-left">
              <thead className="bg-white/[0.06] text-xs uppercase tracking-[0.16em] text-mist/50">
                <tr>
                  {["Lotnisko", "Pasażerowie 2025", "Wzrost r/r", "Rola w strategii", "Priorytet"].map(
                    (header) => (
                      <th key={header} className="px-5 py-4 font-semibold">
                        {header}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {airportData.map((airport) => (
                  <tr key={airport.name} className="border-t border-white/10">
                    <td className="px-5 py-4 font-semibold text-white">
                      {airport.name}
                    </td>
                    <td className="px-5 py-4 text-mist/75">
                      {formatNumber(airport.passengers2025)}
                    </td>
                    <td className="px-5 py-4 text-limepulse">+{airport.growth}%</td>
                    <td className="px-5 py-4 text-mist/75">{airport.role}</td>
                    <td className="px-5 py-4 text-electric">{airport.priority}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="section-shell py-16 sm:py-20">
          <SectionHeader
            eyebrow="Model biznesowy"
            title="Najlepszy scenariusz to miks: wynajem + corporate + partnerstwa automotive + dane o zainteresowaniu pojazdami."
          />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {revenueStreams.map((stream, index) => (
              <div
                key={stream}
                className="rounded-lg border border-white/10 bg-white/[0.035] p-5"
              >
                <p className="text-sm font-semibold text-limepulse">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <p className="mt-4 font-semibold text-white">{stream}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="economics" className="section-shell py-16 sm:py-20">
          <SectionHeader
            eyebrow="Ekonomia pilotażu 10 aut"
            title="Model założeń. Nie wynik historyczny."
            text="Scenariusz bazowy: 10 aut, ADR 350 PLN, 18 dni najmu na auto miesięcznie."
          />
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {scenarioData.map((scenario) => (
              <div
                key={scenario.name}
                className={`rounded-lg border p-6 ${scenario.tone}`}
              >
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-mist/[0.55]">
                  {scenario.name}
                </p>
                <p className="mt-4 text-4xl font-semibold tracking-tight text-white">
                  {formatCurrency(scenario.monthlyRevenue)} PLN
                </p>
                <p className="mt-4 leading-7 text-mist/70">
                  {scenario.cars} aut, {scenario.days} dni/mies., {scenario.adr} PLN/dzień.
                </p>
              </div>
            ))}
          </div>
          <div className="mt-6 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-lg border border-white/10 bg-white/[0.035] p-6">
              <p className="text-sm uppercase tracking-[0.16em] text-mist/50">
                Wyniki bazowe
              </p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {[
                  ["Przychód na auto / miesiąc", "6 300 PLN"],
                  ["Przychód z 10 aut / miesiąc", "63 000 PLN"],
                  ["Przychód annualizowany", "756 000 PLN"],
                  ["Status", "model przed kosztami"]
                ].map(([label, value]) => (
                  <div key={label}>
                    <p className="text-2xl font-semibold text-white">{value}</p>
                    <p className="mt-2 text-sm text-mist/[0.55]">{label}</p>
                  </div>
                ))}
              </div>
            </div>
            <ScenarioChart />
          </div>
        </section>

        <section className="section-shell py-16 sm:py-20">
          <SectionHeader
            eyebrow="Realna ekonomia"
            title="Przychód bez kosztów nie wystarcza."
            text="Decyzja o skalowaniu powinna zależeć od marży kontrybucyjnej na aucie, a nie od samego obrotu."
          />
          <div className="grid gap-5 lg:grid-cols-2">
            <div className="glass-card rounded-lg p-6">
              <p className="text-sm uppercase tracking-[0.16em] text-electric">
                Miesięczny przychód na auto
              </p>
              <p className="mt-5 text-3xl font-semibold text-white">
                ADR x dni najmu
              </p>
            </div>
            <div className="glass-card rounded-lg p-6">
              <p className="text-sm uppercase tracking-[0.16em] text-limepulse">
                Marża kontrybucyjna na auto
              </p>
              <p className="mt-5 leading-8 text-mist/75">
                Przychód na auto minus finansowanie lub leasing, ubezpieczenie,
                czyszczenie, serwis, parking, rezerwa na szkody, koszty
                płatności, bezpośredni CAC oraz koszt obsługi operacyjnej.
              </p>
            </div>
          </div>
        </section>

        <InvestorCalculator />

        <section className="section-shell py-16 sm:py-20">
          <SectionHeader
            eyebrow="Model skali"
            title="Skala robi wrażenie tylko wtedy, gdy jednostka ekonomiczna działa."
          />
          <ScaleChart />
        </section>

        <section id="pilot-plan" className="section-shell py-16 sm:py-20">
          <SectionHeader
            eyebrow="Plan pilotażu 90 dni"
            title="Trzy miesiące wystarczą, żeby niektóre założenia obronić albo zabić."
          />
          <div className="grid gap-5 lg:grid-cols-3">
            {pilotPlan.map((stage) => (
              <div key={stage.period} className="glass-card rounded-lg p-6">
                <h3 className="text-2xl font-semibold text-white">{stage.period}</h3>
                <div className="mt-6 space-y-3">
                  {stage.items.map((item) => (
                    <p key={item} className="leading-7 text-mist/70">
                      {item}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="section-shell py-16 sm:py-20">
          <SectionHeader
            eyebrow="Kryteria stop / scale"
            title="Kiedy skalować, a kiedy zabić projekt"
            text="Ta sekcja jest celowo twarda. Pokazuje, że skala ma być warunkowa, nie emocjonalna."
          />
          <div className="grid gap-5 lg:grid-cols-2">
            <div className="rounded-lg border border-limepulse/20 bg-limepulse/[0.045] p-6">
              <h3 className="text-2xl font-semibold text-white">Skalować, jeżeli</h3>
              <div className="mt-6 space-y-3">
                {scaleCriteria.map((item) => (
                  <p key={item} className="leading-7 text-mist/75">
                    {item}
                  </p>
                ))}
              </div>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/[0.035] p-6">
              <h3 className="text-2xl font-semibold text-white">Nie skalować, jeżeli</h3>
              <div className="mt-6 space-y-3">
                {killCriteria.map((item) => (
                  <p key={item} className="leading-7 text-mist/75">
                    {item}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>

        <KPIGrid />

        <section className="section-shell py-16 sm:py-20">
          <SectionHeader
            eyebrow="Segmenty klientów"
            title="Premium nie oznacza jednego klienta. Oznacza precyzyjny use case."
          />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {customerSegments.map((segment) => (
              <div key={segment.title} className="glass-card rounded-lg p-5">
                <h3 className="text-xl font-semibold text-white">{segment.title}</h3>
                <p className="mt-4 leading-7 text-mist/70">{segment.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section-shell py-16 sm:py-20">
          <SectionHeader
            eyebrow="Go-to-market"
            title="Każdy kanał musi być oceniany po koszcie rezerwacji, nie po zasięgu."
          />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {gtmChannels.map((channel, index) => (
              <div key={channel} className="rounded-lg border border-white/10 bg-white/[0.035] p-5">
                <p className="text-sm font-semibold text-electric">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <p className="mt-4 leading-7 text-mist/75">{channel}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section-shell py-16 sm:py-20">
          <SectionHeader
            eyebrow="Strategic partnerships"
            title="Partner ma dostać coś więcej niż prowizję od wynajmu."
          />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {strategicPartners.map(([partner, value]) => (
              <div key={partner} className="glass-card rounded-lg p-5">
                <h3 className="text-xl font-semibold text-white">{partner}</h3>
                <p className="mt-4 leading-7 text-mist/70">{value}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section-shell py-16 sm:py-20">
          <SectionHeader
            eyebrow="Competitive positioning"
            title="Pozycjonowanie musi uciekać od generycznej klasy auta."
          />
          <div className="grid gap-4 lg:grid-cols-5">
            {positioningMatrix.map(([model, text]) => (
              <div
                key={model}
                className={`rounded-lg border p-5 ${
                  model === "MotionPort"
                    ? "border-electric/25 bg-electric/[0.07]"
                    : "border-white/10 bg-white/[0.035]"
                }`}
              >
                <h3 className="text-lg font-semibold text-white">{model}</h3>
                <p className="mt-4 leading-7 text-mist/70">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section-shell py-16 sm:py-20">
          <SectionHeader
            eyebrow="Moat"
            title="Obecna przewaga jest słaba, dopóki nie zostanie zwalidowana."
            text="Przewaga nie powstaje z samego pomysłu. Powstaje z danych, umów, operacji i powtarzalności."
          />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {potentialMoat.map((item) => (
              <p
                key={item}
                className="rounded-lg border border-white/10 bg-white/[0.035] p-4 leading-7 text-mist/75"
              >
                {item}
              </p>
            ))}
          </div>
        </section>

        <RiskTable />

        <section className="section-shell py-16 sm:py-20">
          <SectionHeader
            eyebrow="Co musi być prawdą"
            title="Brutalna checklista walidacji"
          />
          <div className="grid gap-3 md:grid-cols-2">
            {mustBeTrue.map((item, index) => (
              <div key={item} className="flex gap-4 rounded-lg border border-white/10 bg-white/[0.035] p-4">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-electric/10 text-sm font-semibold text-electric">
                  {index + 1}
                </span>
                <p className="leading-7 text-mist/75">{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section-shell py-16 sm:py-20">
          <SectionHeader
            eyebrow="Logika finansowania"
            title="Kwota rundy: do określenia po warunkach pozyskania floty i zakresie pilotażu."
          />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {useOfFunds.map((item) => (
              <p key={item} className="rounded-lg border border-white/10 bg-white/[0.035] p-4 leading-7 text-mist/75">
                {item}
              </p>
            ))}
          </div>
        </section>

        <section className="section-shell py-16 sm:py-20">
          <SectionHeader
            eyebrow="Kamienie milowe"
            title="Kolejne etapy muszą wynikać z danych, nie z ambicji floty."
          />
          <div className="grid gap-4 md:grid-cols-5">
            {milestoneData.map(([stage, text]) => (
              <div key={stage} className="glass-card rounded-lg p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-electric">
                  {stage}
                </p>
                <p className="mt-4 leading-7 text-mist/75">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="exit" className="section-shell py-16 sm:py-20">
          <SectionHeader
            eyebrow="Logika exitu"
            title="Exit nie będzie za stronę internetową ani za samą flotę."
            text="Exit może być za powtarzalny kanał popytu, dane, partnerstwa i udowodnioną ekonomię pojazdu."
          />
          <div className="grid gap-5 lg:grid-cols-2">
            <div className="glass-card rounded-lg p-6">
              <h3 className="text-2xl font-semibold text-white">
                Potencjalni kupujący
              </h3>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {exitBuyerData.map((item) => (
                  <p key={item} className="rounded-lg border border-white/10 bg-white/[0.035] p-4 text-mist/75">
                    {item}
                  </p>
                ))}
              </div>
            </div>
            <div className="rounded-lg border border-limepulse/20 bg-limepulse/[0.045] p-6">
              <h3 className="text-2xl font-semibold text-white">Warunki, które mogą uruchomić exit</h3>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {exitTriggers.map((item) => (
                  <p key={item} className="rounded-lg border border-limepulse/[0.15] bg-night/[0.35] p-4 text-mist/75">
                    {item}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>

        <CTASection homeHref={homeHref} />
        <SourceNote />
      </main>
    </div>
  );
}
