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

const topSixTraffic2025 = airportData.reduce(
  (total, airport) => total + airport.passengers2025,
  0
);

const scenarioData: Scenario[] = [
  {
    name: "Conservative",
    cars: 10,
    days: 14,
    adr: 300,
    monthlyRevenue: 42000,
    tone: "border-white/10 bg-white/[0.035]"
  },
  {
    name: "Base",
    cars: 10,
    days: 18,
    adr: 350,
    monthlyRevenue: 63000,
    tone: "border-electric/25 bg-electric/[0.07]"
  },
  {
    name: "Aggressive",
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

const heroMetrics = [
  {
    value: "24,1 mln",
    label: "pasażerów",
    detail: "Lotnisko Chopina 2025",
    source: "ULC"
  },
  {
    value: "USD 22,37 mld",
    label: "rynek Europy",
    detail: "Vehicle rental 2026",
    source: "Mordor Intelligence"
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

const revenueStreams = [
  "Daily rental revenue.",
  "Weekend premium packages.",
  "Airport pickup / dropoff fee.",
  "Corporate recurring accounts.",
  "Long-term B2B rental.",
  "Insurance / protection package.",
  "Delivery and concierge add-ons.",
  "Dealer/importer test-drive partnerships.",
  "Brand exposure revenue.",
  "Lead generation for vehicle sales.",
  "Fleet remarketing / residual value optimization."
];

const pilotPlan = [
  {
    period: "Day 0-30",
    items: [
      "Final fleet sourcing.",
      "Landing page and booking interest.",
      "Pricing grid.",
      "Deposit and insurance rules.",
      "First airport operating process.",
      "Measurement dashboard."
    ]
  },
  {
    period: "Day 31-60",
    items: [
      "Paid acquisition tests.",
      "Corporate outreach.",
      "Hotel/concierge partnerships.",
      "Dealer/importer conversations.",
      "Utilization tracking.",
      "Pricing adjustment."
    ]
  },
  {
    period: "Day 61-90",
    items: [
      "Contribution margin review.",
      "Damage/claims review.",
      "CAC review.",
      "Repeat booking review.",
      "Corporate pipeline review.",
      "Decision: stop, optimize, or scale."
    ]
  }
];

const scaleCriteria = [
  "Utilization approaches or exceeds 18 rental days per car/month.",
  "ADR remains near or above 350 PLN.",
  "Contribution margin per car is positive after direct costs.",
  "CAC is repeatable and not destroying margin.",
  "Damage ratio is controlled.",
  "Corporate pipeline appears.",
  "Customers understand and value the premium fleet.",
  "Fleet sourcing terms are repeatable."
];

const killCriteria = [
  "Utilization stays weak.",
  "Customers only buy on discount.",
  "Damage and insurance erase margin.",
  "Paid acquisition is too expensive.",
  "Airport handover is operationally messy.",
  "Fleet financing kills contribution margin.",
  "No strategic partner sees value.",
  "The model depends only on founder effort."
];

const kpiData = [
  ["Rental days per car/month", "target 18", "pomiar w pilotażu"],
  ["ADR", "target 350 PLN", "do walidacji"],
  ["Revenue per car", "6 300 PLN", "model przed kosztami"],
  ["Contribution margin per car", "positive", "do walidacji"],
  ["CAC per booking", "threshold", "pomiar w pilotażu"],
  ["Damage/claims ratio", "controlled", "do walidacji"],
  ["Booking conversion", "tracked", "pomiar w pilotażu"],
  ["Repeat bookings", "tracked", "pomiar w pilotażu"],
  ["Corporate leads", "pipeline", "do walidacji"],
  ["Airport pickup time", "tracked", "pomiar w pilotażu"],
  ["NPS", "tracked", "pomiar w pilotażu"],
  ["Vehicle category demand", "segmented", "pomiar w pilotażu"]
];

const customerSegments = [
  {
    title: "Business traveler",
    text: "Fast pickup, invoice, predictable car, premium image."
  },
  {
    title: "Tourist / weekend",
    text: "Premium experience, clear rules, comfort."
  },
  {
    title: "Corporate",
    text: "Recurring usage, fixed account rules, predictable service."
  },
  {
    title: "EV/hybrid curious",
    text: "Real-world test before purchase."
  },
  {
    title: "Dealer/importer",
    text: "Exposure, leads, customer behavior data."
  }
];

const gtmChannels = [
  "Google Search for airport rental intent.",
  "Corporate outreach to companies and executive assistants.",
  "Hotels and concierge.",
  "Dealer/importer co-marketing.",
  "Retargeting.",
  "LinkedIn B2B.",
  "Premium travel partnerships."
];

const strategicPartners = [
  ["Dealer group", "Rental as extended test drive and sales lead channel."],
  ["Importer", "Market exposure for Asian brands."],
  ["Leasing company", "Fleet placement with utilization upside."],
  ["Fleet management company", "Premium airport vertical."],
  ["Airport service provider", "Additional monetization of passenger traffic."],
  ["Corporate clients", "Premium mobility without owning fleet."]
];

const positioningMatrix = [
  ["Traditional rental", "High fleet volume, low vehicle storytelling."],
  ["Taxi/chauffeur", "Convenient, but no self-drive premium vehicle experience."],
  ["Car sharing", "Urban, short use, less premium, less airport-oriented."],
  ["Dealer test drive", "Short, sales-heavy, not real-life usage."],
  ["MotionPort", "Airport-first, curated premium fleet, rental revenue plus brand/channel value."]
];

const potentialMoat = [
  "Airport operating playbook.",
  "Fleet sourcing terms.",
  "Dealer/importer partnerships.",
  "Corporate relationships.",
  "Vehicle demand data.",
  "Customer acquisition data.",
  "Premium brand experience.",
  "Claims and handover SOP.",
  "Repeatable location launch playbook.",
  "Residual value management."
];

const riskData = [
  ["Asset-heavy model", "Small pilot, leasing, dealer partnership, revenue-share, no large fleet purchase before proof."],
  ["Low utilization", "10-car test, dynamic pricing, corporate channels, channel tracking."],
  ["Damage/insurance", "Deposits, protection packages, inspections, telematics, damage reserve."],
  ["Seasonality", "Corporate accounts, flexible fleet, multiple airports, weekend packages."],
  ["Competition", "Premium curation, specific vehicle story, partner value, better experience."],
  ["Airport logistics", "SOP, parking partners, pickup/dropoff tests."],
  ["EV charging", "Mixed fleet: EV, hybrid, selected combustion."],
  ["Residual value", "Select resale-friendly models, leasing/buyback options, dealer support."],
  ["CAC", "Prioritize high-intent search and corporate channels, kill weak channels fast."],
  ["Non-scalability", "Second airport playbook, KPI thresholds, standardized operations."]
];

const mustBeTrue = [
  "Customers must pay for premium, not only discount.",
  "10 cars must get close to base utilization.",
  "Average daily rate must survive real demand testing.",
  "Direct costs must not erase margin.",
  "Damage must be manageable.",
  "At least one acquisition channel must work.",
  "Corporate demand must show repeatability.",
  "Fleet sourcing must be repeatable.",
  "Airport process must not be too messy.",
  "A strategic partner must see value beyond rental revenue."
];

const useOfFunds = [
  "Fleet deposits or leasing support.",
  "Insurance and operational setup.",
  "Booking system and analytics.",
  "Airport handover process.",
  "Marketing tests.",
  "Corporate sales.",
  "Legal and compliance.",
  "Premium content and vehicle presentation.",
  "Working capital buffer.",
  "Data dashboard."
];

const milestoneData = [
  ["Stage 0", "Investment teaser and partner conversations."],
  ["Stage 1", "10-car Warsaw pilot, 90 days."],
  ["Stage 2", "25 to 50 cars, second airport or corporate accounts."],
  ["Stage 3", "100+ cars, 3 airports, positive unit economics."],
  ["Stage 4", "Strategic investment, acquisition, roll-up or CEE expansion."]
];

const exitBuyerData = [
  "Traditional car rental group.",
  "Dealer group.",
  "Automotive importer.",
  "Leasing company.",
  "Fleet management company.",
  "Airport service provider.",
  "Mobility platform.",
  "Corporate mobility operator."
];

const exitTriggers = [
  "100+ cars.",
  "3+ airports.",
  "Repeatable CAC.",
  "Positive contribution margin.",
  "Stable utilization.",
  "Corporate accounts.",
  "Dealer/importer partnership.",
  "Low claims ratio.",
  "Strong SOP.",
  "Data proving vehicle demand."
];

const finalInvestorDecision = [
  "The market is large enough to test.",
  "Warsaw is the right first pilot.",
  "The model is risky but measurable.",
  "The biggest risk is capital intensity.",
  "The first pilot can reduce that risk.",
  "Scaling should be conditional, not emotional.",
  "Strategic exit exists only if airport economics are proven."
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
          Investment thesis
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

function StickyNav({ homeHref }: { homeHref: string }) {
  const links = [
    ["Teza", "#thesis"],
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
            MotionPort Investor
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
      <p className="text-sm font-semibold text-electric">Objection {index + 1}</p>
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
            Airport traffic 2024 vs 2025
          </h3>
          <p className="mt-2 text-sm text-mist/[0.55]">
            Pasażerowie rocznie, źródło: ULC. Dane do potwierdzenia przed
            wysyłką do funduszu.
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

function ScenarioChart() {
  const max = Math.max(...scenarioData.map((scenario) => scenario.monthlyRevenue));

  return (
    <div className="glass-card rounded-lg p-6">
      <h3 className="text-2xl font-semibold text-white">
        Scenario monthly revenue comparison
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
              {scenario.cars} aut, {scenario.days} dni/mies., {scenario.adr} PLN/day
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
        Cars vs monthly revenue
      </h3>
      <p className="mt-2 text-sm text-mist/[0.55]">
        Base case: 350 PLN/day, 18 rental days/month, 6 300 PLN revenue per car/month.
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
              <p className="text-[0.68rem] text-mist/[0.45]">cars</p>
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
    ["Fleet size", fleetSize, setFleetSize, 1, 250],
    ["Average daily rate", adr, setAdr, 100, 900],
    ["Rental days per car/month", rentalDays, setRentalDays, 1, 30],
    ["Monthly lease/financing cost per car", leaseCost, setLeaseCost, 0, 9000],
    ["Insurance per car", insurance, setInsurance, 0, 3000],
    ["Service/cleaning cost per rental", cleaningCost, setCleaningCost, 0, 500],
    ["Damage reserve per car", damageReserve, setDamageReserve, 0, 3000],
    ["CAC per booking", cac, setCac, 0, 700],
    ["Average bookings per car", bookings, setBookings, 1, 30]
  ] as const;

  return (
    <section id="calculator" className="section-shell py-16 sm:py-20">
      <SectionHeader
        eyebrow="Investor calculator"
        title="Kalkulator ma pokazać wrażliwość, nie obiecać wynik."
        text="Wartości są edytowalnymi założeniami w kodzie i interfejsie. Decyzja o skali powinna wynikać z marży kontrybucyjnej, a nie z samego przychodu."
      />
      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="glass-card grid gap-4 rounded-lg p-5 sm:p-7">
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
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            ["Monthly revenue", `${formatCurrency(output.monthlyRevenue)} PLN`],
            ["Annualized revenue", `${formatCurrency(output.annualizedRevenue)} PLN`],
            ["Cost per car", `${formatCurrency(output.costPerCar)} PLN`],
            ["Estimated contribution margin", `${formatCurrency(output.contributionMargin)} PLN`],
            ["Break-even rental days", `${output.breakEvenDays} dni`],
            ["Revenue per vehicle", `${formatCurrency(output.revenuePerVehicle)} PLN`],
            ["Contribution per vehicle", `${formatCurrency(output.contributionPerVehicle)} PLN`]
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
    </section>
  );
}

function RiskTable() {
  return (
    <section id="risks" className="section-shell py-16 sm:py-20">
      <SectionHeader
        eyebrow="Risk table"
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
            Publiczny opis raportu wskazuje USD 22,37B w 2026, USD 30,91B w
            2031 oraz CAGR 6,68%.
          </p>
          <p>
            <a
              href="https://www.researchandmarkets.com/reports/6210547/poland-car-rental-and-mobility-solutions-market"
              className="font-semibold text-electric hover:text-white"
            >
              Ken Research: Poland Car Rental & Mobility Solutions Market.
            </a>{" "}
            Źródła dystrybucyjne raportu wskazują wartość rynku około USD 1,2B.
          </p>
          <p>
            <a
              href="https://ulc.gov.pl/aktualnosci/przewozy-w-polskich-portach-lotniczych-w-2025-roku"
              className="font-semibold text-electric hover:text-white"
            >
              ULC: airport traffic statistics.
            </a>{" "}
            Dane lotniskowe 2024/2025 użyte w materiale: do potwierdzenia przed
            wysyłką do funduszu.
          </p>
          <p>
            Internal assumptions: ADR, utilization, fleet size, scenario revenue,
            koszty w kalkulatorze i progi skali.
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
          Final investor decision
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
    document.title = "MotionPort | Investor teaser";
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
                Investor teaser / Warsaw pilot
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
                  href="#exit"
                  className="rounded-md border border-limepulse/[0.35] px-5 py-3 text-center text-sm font-semibold text-limepulse transition hover:bg-limepulse/10"
                >
                  Zobacz ryzyka i exit
                </a>
              </div>
            </motion.div>
            <PremiumVehicleRender compact priority />
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {heroMetrics.map((metric) => (
              <MetricCard key={metric.label} {...metric} />
            ))}
          </div>
        </section>

        <MemoCard />

        <section className="section-shell py-16 sm:py-20">
          <SectionHeader
            eyebrow="Investor objection wall"
            title="Co inwestor pomyśli w pierwszych 5 minutach"
            text="Te pytania trzeba odpowiedzieć przed rozmową, nie po niej."
          />
          <div className="grid gap-5 lg:grid-cols-2">
            {objectionsData.map((item, index) => (
              <ObjectionCard key={item.objection} index={index} {...item} />
            ))}
          </div>
        </section>

        <section className="section-shell py-16 sm:py-20">
          <SectionHeader
            eyebrow="Why now"
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
            eyebrow="Market proof"
            title="Rynek jest wystarczająco duży, ale pilot ma sprawdzić lokalną ekonomię."
          />
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            <MetricCard
              value="USD 22,37B"
              label="Europe rental market 2026"
              detail="USD 30,91B by 2031, CAGR 6,68%."
              source="Mordor Intelligence"
            />
            <MetricCard
              value="USD 1,2B"
              label="Poland mobility market"
              detail="Szacowana wartość rynku car rental & mobility solutions."
              source="Ken Research"
            />
            <MetricCard
              value="24,1M"
              label="Warsaw Chopin 2025"
              detail="13,3% r/r. Dane do potwierdzenia przed wysyłką."
              source="ULC"
            />
            <MetricCard
              value={`${(topSixTraffic2025 / 1000000).toFixed(1)}M`}
              label="Top 6 Polish airports"
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
            eyebrow="Airport rollout"
            title="Ekspansja lotnisko po lotnisku wymaga playbooka, nie tylko floty."
          />
          <div className="overflow-x-auto rounded-lg border border-white/10">
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
            eyebrow="Business model"
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
            eyebrow="10-car pilot economics"
            title="Model założeń. Nie wynik historyczny."
            text="Base case: 10 aut, ADR 350 PLN, 18 dni najmu na auto miesięcznie."
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
                  {scenario.cars} cars, {scenario.days} days/month, {scenario.adr} PLN/day.
                </p>
              </div>
            ))}
          </div>
          <div className="mt-6 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-lg border border-white/10 bg-white/[0.035] p-6">
              <p className="text-sm uppercase tracking-[0.16em] text-mist/50">
                Base outputs
              </p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {[
                  ["Revenue per car/month", "6 300 PLN"],
                  ["Revenue for 10 cars/month", "63 000 PLN"],
                  ["Annualized revenue", "756 000 PLN"],
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
            eyebrow="Real economics"
            title="Przychód bez kosztów nie wystarcza."
            text="Decyzja o skalowaniu powinna zależeć od marży kontrybucyjnej na aucie, a nie od samego obrotu."
          />
          <div className="grid gap-5 lg:grid-cols-2">
            <div className="glass-card rounded-lg p-6">
              <p className="text-sm uppercase tracking-[0.16em] text-electric">
                Monthly revenue per car
              </p>
              <p className="mt-5 text-3xl font-semibold text-white">
                ADR x rental days
              </p>
            </div>
            <div className="glass-card rounded-lg p-6">
              <p className="text-sm uppercase tracking-[0.16em] text-limepulse">
                Contribution margin per car
              </p>
              <p className="mt-5 leading-8 text-mist/75">
                Revenue per car minus financing/leasing, insurance, cleaning,
                service, parking, damage reserve, payment costs, direct CAC and
                operating handling cost.
              </p>
            </div>
          </div>
        </section>

        <InvestorCalculator />

        <section className="section-shell py-16 sm:py-20">
          <SectionHeader
            eyebrow="Scale model"
            title="Skala robi wrażenie tylko wtedy, gdy jednostka ekonomiczna działa."
          />
          <ScaleChart />
        </section>

        <section id="pilot-plan" className="section-shell py-16 sm:py-20">
          <SectionHeader
            eyebrow="90-day pilot plan"
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
            eyebrow="Kill / scale criteria"
            title="Kiedy skalować, a kiedy zabić projekt"
            text="Ta sekcja jest celowo twarda. Pokazuje, że skala ma być warunkowa, nie emocjonalna."
          />
          <div className="grid gap-5 lg:grid-cols-2">
            <div className="rounded-lg border border-limepulse/20 bg-limepulse/[0.045] p-6">
              <h3 className="text-2xl font-semibold text-white">Scale if</h3>
              <div className="mt-6 space-y-3">
                {scaleCriteria.map((item) => (
                  <p key={item} className="leading-7 text-mist/75">
                    {item}
                  </p>
                ))}
              </div>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/[0.035] p-6">
              <h3 className="text-2xl font-semibold text-white">Do not scale if</h3>
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
            eyebrow="Customer segments"
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
            title="Current moat: weak until validated."
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
            eyebrow="What must be true"
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
            eyebrow="Funding logic"
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
            eyebrow="Milestones"
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
            eyebrow="Exit logic"
            title="Exit nie będzie za stronę internetową ani za samą flotę."
            text="Exit może być za powtarzalny kanał popytu, dane, partnerstwa i udowodnioną ekonomię pojazdu."
          />
          <div className="grid gap-5 lg:grid-cols-2">
            <div className="glass-card rounded-lg p-6">
              <h3 className="text-2xl font-semibold text-white">
                Potential buyers
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
              <h3 className="text-2xl font-semibold text-white">Exit triggers</h3>
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
