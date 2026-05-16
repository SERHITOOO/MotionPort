import { useEffect } from "react";
import { motion } from "framer-motion";
import PremiumVehicleRender from "../components/PremiumVehicleRender";

const fleetSegments = [
  {
    title: "Business",
    text: "For airport to city transfers, meetings and executive travel."
  },
  {
    title: "Weekend",
    text: "For short premium rentals and lifestyle use around the city."
  },
  {
    title: "EV Experience",
    text: "For customers who want to test Asian EV models before buying."
  },
  {
    title: "Corporate",
    text: "For recurring company rentals, partners and concierge channels."
  }
];

const investorLogic = [
  "Premium car presentation increases perceived value.",
  "Curated fleet is easier to differentiate than generic rental classes.",
  "Airport customer has immediate travel intent.",
  "Asian brands can use rental as test drive and lead generation channel.",
  "Better vehicle storytelling can support higher average daily rate."
];

const pilotAssumptions = [
  {
    value: "10",
    label: "cars"
  },
  {
    value: "Warsaw Chopin",
    label: "airport pilot"
  },
  {
    value: "90",
    label: "day pilot"
  }
];

const revenueAssumptions = [
  "Average daily rental assumption: 350 PLN",
  "Base utilization assumption: 18 rental days per month",
  "Base monthly revenue potential: 63,000 PLN for 10 cars"
];

function getHomeHref() {
  const routeIndex = window.location.pathname.indexOf("/premium-fleet");
  if (routeIndex < 0) {
    return "./";
  }

  const basePath = window.location.pathname.slice(0, routeIndex);
  return `${basePath || ""}/`;
}

export default function PremiumFleetPage() {
  const homeHref = getHomeHref();

  useEffect(() => {
    document.title = "MotionPort | Premium fleet visual concept";
  }, []);

  return (
    <div className="min-h-screen overflow-hidden bg-night text-white">
      <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:44px_44px]" />
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(45,226,255,0.18),transparent_30%),radial-gradient(circle_at_85%_22%,rgba(182,255,77,0.10),transparent_28%),linear-gradient(180deg,#050816_0%,#080D18_48%,#03050B_100%)]" />
      <div className="relative z-10">
        <header className="border-b border-white/10 bg-night/74 backdrop-blur-xl">
          <nav className="section-shell flex h-16 items-center justify-between gap-4 sm:h-20">
            <a href={homeHref} className="flex min-w-0 items-center gap-3">
              <span className="h-2.5 w-2.5 rounded-full bg-electric shadow-glow" />
              <span className="truncate text-xs font-semibold uppercase tracking-[0.22em] text-white sm:text-sm">
                MotionPort
              </span>
            </a>
            <a
              href={homeHref}
              className="rounded-md border border-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:border-electric hover:bg-electric/10"
            >
              Back to main model
            </a>
          </nav>
        </header>

        <main>
          <section className="section-shell py-16 sm:py-20 lg:py-24">
            <motion.div
              initial={{ y: 28, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.65 }}
              className="grid items-end gap-10 lg:grid-cols-[1.05fr_0.95fr]"
            >
              <div>
                <p className="eyebrow mb-5 border-electric/20 bg-electric/10 text-electric">
                  Visual concept / pilot ready
                </p>
                <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
                  Premium airport mobility visual concept
                </h1>
              </div>
              <div>
                <p className="text-lg leading-8 text-mist/75 sm:text-xl">
                  Realistyczna wizualizacja floty premium dla modelu
                  airport-first: azjatyckie EV, hybrydy i wybrane modele
                  spalinowe dla klientów biznesowych, turystów i segmentu
                  corporate.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={homeHref}
                    className="rounded-md bg-white px-5 py-3 text-center text-sm font-semibold text-night transition hover:bg-electric"
                  >
                    Back to main model
                  </a>
                  <a
                    href="#pilot-assumptions"
                    className="rounded-md border border-limepulse/35 px-5 py-3 text-center text-sm font-semibold text-limepulse transition hover:bg-limepulse/10"
                  >
                    View pilot assumptions
                  </a>
                </div>
              </div>
            </motion.div>
          </section>

          <section className="section-shell pb-16 sm:pb-24">
            <PremiumVehicleRender priority />
          </section>

          <section className="section-shell py-16 sm:py-20">
            <div className="mb-10 max-w-3xl">
              <p className="eyebrow mb-4 border-limepulse/20 bg-limepulse/10 text-limepulse">
                Fleet positioning
              </p>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-5xl">
                One fleet direction, four use cases.
              </h2>
            </div>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {fleetSegments.map((item, index) => (
                <motion.article
                  key={item.title}
                  initial={{ y: 24, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: false, amount: 0.28 }}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.5, delay: index * 0.04 }}
                  className="glass-card rounded-lg p-6"
                >
                  <span className="text-sm font-semibold text-electric">
                    0{index + 1}
                  </span>
                  <h3 className="mt-5 text-xl font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-4 leading-7 text-mist/70">{item.text}</p>
                </motion.article>
              ))}
            </div>
          </section>

          <section className="section-shell py-16 sm:py-20">
            <motion.div
              initial={{ y: 28, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: false, amount: 0.25 }}
              transition={{ duration: 0.6 }}
              className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]"
            >
              <div>
                <p className="eyebrow mb-4 border-electric/20 bg-electric/10 text-electric">
                  Investor logic
                </p>
                <h2 className="text-3xl font-semibold tracking-tight sm:text-5xl">
                  Why the visual direction matters.
                </h2>
              </div>
              <div className="grid gap-3">
                {investorLogic.map((item, index) => (
                  <div
                    key={item}
                    className="flex gap-4 rounded-lg border border-white/10 bg-white/[0.035] p-5"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-limepulse/10 text-sm font-semibold text-limepulse">
                      {index + 1}
                    </span>
                    <p className="leading-7 text-mist/75">{item}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </section>

          <section id="pilot-assumptions" className="section-shell py-16 sm:py-20">
            <div className="rounded-lg border border-limepulse/20 bg-limepulse/[0.045] p-6 sm:p-8 lg:p-10">
              <div className="max-w-4xl">
                <p className="eyebrow mb-4 border-limepulse/20 bg-limepulse/10 text-limepulse">
                  Assumption model, not historical result
                </p>
                <h2 className="text-3xl font-semibold tracking-tight sm:text-5xl">
                  Pilot assumptions mini model.
                </h2>
              </div>

              <div className="mt-10 grid gap-5 md:grid-cols-3">
                {pilotAssumptions.map((item) => (
                  <motion.div
                    key={item.label}
                    initial={{ y: 24, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.5 }}
                    className="rounded-lg border border-white/10 bg-night/40 p-6"
                  >
                    <p className="text-4xl font-semibold tracking-tight text-white">
                      {item.value}
                    </p>
                    <p className="mt-3 text-sm font-semibold uppercase tracking-[0.18em] text-mist/55">
                      {item.label}
                    </p>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 grid gap-3 md:grid-cols-3">
                {revenueAssumptions.map((item) => (
                  <p
                    key={item}
                    className="rounded-lg border border-limepulse/15 bg-limepulse/[0.055] p-4 leading-7 text-mist/80"
                  >
                    {item}
                  </p>
                ))}
              </div>
            </div>
          </section>
        </main>

        <footer className="border-t border-white/10 py-10">
          <div className="section-shell flex flex-col gap-4 text-sm text-mist/55 sm:flex-row sm:items-center sm:justify-between">
            <p>MotionPort premium visual concept</p>
            <a
              href={homeHref}
              className="w-fit rounded-md border border-electric/35 px-5 py-3 font-semibold text-electric transition hover:bg-electric/10"
            >
              Wróć do modelu inwestycyjnego
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
