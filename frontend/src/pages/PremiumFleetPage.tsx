import { useEffect } from "react";
import { motion } from "framer-motion";

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

function PremiumCarVisual() {
  return (
    <motion.div
      initial={{ y: 36, opacity: 0, scale: 0.98 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      className="relative overflow-hidden rounded-lg border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.10),rgba(255,255,255,0.035)),radial-gradient(circle_at_50%_0%,rgba(45,226,255,0.14),transparent_38%),linear-gradient(180deg,#0B1020_0%,#050816_100%)] p-5 shadow-[0_32px_110px_rgba(0,0,0,0.52)] backdrop-blur-xl sm:p-8 lg:p-10"
    >
      <motion.div
        aria-hidden="true"
        animate={{ x: ["-120%", "130%"] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 h-full w-1/3 rotate-12 bg-gradient-to-r from-transparent via-white/15 to-transparent mix-blend-screen"
      />
      <div className="absolute left-6 top-6 z-10 flex flex-wrap gap-3">
        {["Premium Asian Fleet", "Warsaw Chopin Pilot", "EV / Hybrid / Selected ICE"].map(
          (label) => (
            <span
              key={label}
              className="rounded-full border border-white/10 bg-night/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-mist/80 backdrop-blur"
            >
              {label}
            </span>
          )
        )}
      </div>

      <div className="pt-20 sm:pt-16">
        <svg
          className="mx-auto w-full max-w-6xl"
          viewBox="0 0 1220 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Premium 3D inspired Asian crossover fleet render"
        >
          <defs>
            <linearGradient id="floorGlow" x1="100" y1="420" x2="1100" y2="510">
              <stop stopColor="#2DE2FF" stopOpacity="0" />
              <stop offset="0.45" stopColor="#2DE2FF" stopOpacity="0.28" />
              <stop offset="0.72" stopColor="#B6FF4D" stopOpacity="0.12" />
              <stop offset="1" stopColor="#2DE2FF" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="paint" x1="178" y1="166" x2="1045" y2="430">
              <stop stopColor="#060913" />
              <stop offset="0.16" stopColor="#132239" />
              <stop offset="0.42" stopColor="#26324A" />
              <stop offset="0.63" stopColor="#0B1221" />
              <stop offset="1" stopColor="#05070D" />
            </linearGradient>
            <linearGradient id="paintHighlight" x1="207" y1="185" x2="1001" y2="321">
              <stop stopColor="#FFFFFF" stopOpacity="0.04" />
              <stop offset="0.45" stopColor="#2DE2FF" stopOpacity="0.28" />
              <stop offset="0.7" stopColor="#FFFFFF" stopOpacity="0.07" />
              <stop offset="1" stopColor="#B6FF4D" stopOpacity="0.12" />
            </linearGradient>
            <linearGradient id="glass" x1="363" y1="108" x2="739" y2="255">
              <stop stopColor="#E8FCFF" stopOpacity="0.52" />
              <stop offset="0.34" stopColor="#2DE2FF" stopOpacity="0.19" />
              <stop offset="1" stopColor="#050816" stopOpacity="0.82" />
            </linearGradient>
            <radialGradient id="tire" cx="0" cy="0" r="1" gradientTransform="translate(0.5 0.5) rotate(90) scale(0.5)">
              <stop stopColor="#19202C" />
              <stop offset="0.54" stopColor="#080B10" />
              <stop offset="1" stopColor="#000000" />
            </radialGradient>
            <radialGradient id="rim" cx="0" cy="0" r="1" gradientTransform="translate(0.46 0.38) rotate(90) scale(0.72)">
              <stop stopColor="#F6FBFF" />
              <stop offset="0.28" stopColor="#90A1B4" />
              <stop offset="0.55" stopColor="#293340" />
              <stop offset="1" stopColor="#070A0F" />
            </radialGradient>
            <filter id="softShadow" x="-20%" y="-20%" width="140%" height="160%">
              <feGaussianBlur stdDeviation="24" />
            </filter>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="7" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <ellipse
            cx="610"
            cy="504"
            rx="470"
            ry="58"
            fill="url(#floorGlow)"
            opacity="0.75"
            filter="url(#softShadow)"
          />
          <ellipse cx="610" cy="502" rx="420" ry="28" fill="#000000" opacity="0.36" />

          <g transform="translate(16 4)">
            <path
              d="M168 379C183 300 252 251 360 229C420 152 513 111 628 124C729 135 808 181 869 254C948 263 1019 290 1063 330C1094 359 1078 414 1035 418L233 420C181 420 159 408 168 379Z"
              fill="url(#paint)"
              stroke="rgba(255,255,255,0.28)"
              strokeWidth="2"
            />
            <path
              d="M264 288C347 250 478 231 707 240C785 243 889 262 997 328C861 316 700 306 493 315C380 319 303 310 264 288Z"
              fill="url(#paintHighlight)"
              opacity="0.92"
            />
            <path
              d="M386 225C435 160 525 132 628 144C713 154 775 196 830 258L334 250C347 241 363 232 386 225Z"
              fill="url(#glass)"
              stroke="rgba(255,255,255,0.22)"
              strokeWidth="2"
            />
            <path
              d="M480 152C529 136 594 134 657 152L626 249H411C428 205 451 171 480 152Z"
              fill="rgba(255,255,255,0.08)"
            />
            <path
              d="M665 154C729 173 778 209 815 255L645 250L677 159C673 157 669 155 665 154Z"
              fill="rgba(45,226,255,0.10)"
            />
            <path
              d="M361 253C466 270 695 263 864 265"
              stroke="rgba(255,255,255,0.36)"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d="M223 337C335 316 567 317 777 329C877 335 972 348 1048 377"
              stroke="rgba(45,226,255,0.42)"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <path
              d="M892 304C954 305 1001 316 1043 344C1010 360 953 360 906 342C891 336 885 316 892 304Z"
              fill="rgba(182,255,77,0.52)"
              filter="url(#glow)"
            />
            <path
              d="M214 329C248 303 292 293 352 295"
              stroke="rgba(45,226,255,0.92)"
              strokeWidth="8"
              strokeLinecap="round"
              filter="url(#glow)"
            />
            <path
              d="M518 333C547 328 573 328 600 335"
              stroke="rgba(255,255,255,0.24)"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <path
              d="M754 336C780 332 807 333 832 341"
              stroke="rgba(255,255,255,0.22)"
              strokeWidth="5"
              strokeLinecap="round"
            />

            <g transform="translate(320 417)">
              <circle r="78" fill="url(#tire)" stroke="rgba(255,255,255,0.16)" strokeWidth="10" />
              <circle r="49" fill="url(#rim)" />
              <circle r="14" fill="#101722" />
              {[0, 60, 120, 180, 240, 300].map((rotation) => (
                <path
                  key={rotation}
                  d="M0 -12L13 -43L-13 -43Z"
                  fill="rgba(230,240,248,0.55)"
                  transform={`rotate(${rotation})`}
                />
              ))}
            </g>

            <g transform="translate(838 417)">
              <circle r="82" fill="url(#tire)" stroke="rgba(255,255,255,0.16)" strokeWidth="10" />
              <circle r="52" fill="url(#rim)" />
              <circle r="15" fill="#101722" />
              {[0, 60, 120, 180, 240, 300].map((rotation) => (
                <path
                  key={rotation}
                  d="M0 -13L14 -46L-14 -46Z"
                  fill="rgba(230,240,248,0.55)"
                  transform={`rotate(${rotation})`}
                />
              ))}
            </g>

            <path
              d="M225 425C354 472 721 470 1017 426"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="20"
              strokeLinecap="round"
            />
          </g>
        </svg>
      </div>

      <p className="mt-6 max-w-3xl text-sm leading-6 text-mist/60">
        Model poglądowy. Pojazd inspirowany segmentem premium Asian EV /
        hybrid. Bez użycia znaków towarowych producentów.
      </p>
    </motion.div>
  );
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
            <PremiumCarVisual />
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
