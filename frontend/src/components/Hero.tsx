import { motion } from "framer-motion";

const readiness = [
  { label: "Proces", value: "do testu" },
  { label: "Segmenty", value: "EV / hybryda / spalinowe / premium" },
  { label: "Lokalizacje", value: "2-4 do walidacji" },
  { label: "Ekonomia", value: "do potwierdzenia" }
];

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden pt-20"
    >
      <motion.div
        aria-hidden="true"
        animate={{ x: ["-20%", "120%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/3 h-px w-1/2 bg-gradient-to-r from-transparent via-electric to-transparent opacity-50"
      />

      <div className="section-shell grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.02fr_0.98fr]">
        <div>
          <motion.p
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.55 }}
            className="eyebrow mb-5 border-electric/20 bg-electric/10 text-electric"
          >
            Najpierw test procesu, później decyzja o skalowaniu.
          </motion.p>

          <motion.h1
            initial={{ y: 28, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.65, delay: 0.08 }}
            className="max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            MotionPort
          </motion.h1>

          <motion.p
            initial={{ y: 28, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.65, delay: 0.16 }}
            className="mt-7 max-w-2xl text-lg leading-8 text-mist/75 sm:text-xl"
          >
            Cyfrowy model wynajmu aut marek azjatyckich przy lotniskach,
            testowany najpierw na wybranych lokalizacjach. Projekt zakłada
            prostszy odbiór po przylocie, parking operacyjny, kiosk, tablet w
            aucie i pilotaż, który powinien sprawdzić popyt na EV, hybrydy,
            auta spalinowe i segment premium.
          </motion.p>

          <motion.div
            initial={{ y: 28, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.65, delay: 0.24 }}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <a
              href="#pilot"
              className="rounded-md bg-white px-6 py-4 text-center text-sm font-semibold text-night transition hover:bg-electric"
            >
              Zobacz model pilotażu
            </a>
            <a
              href="#contact"
              className="rounded-md border border-white/15 px-6 py-4 text-center text-sm font-semibold text-white transition hover:border-limepulse hover:bg-limepulse/10"
            >
              Porozmawiajmy o inwestycji / partnerstwie
            </a>
          </motion.div>

          <motion.div
            initial={{ y: 28, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.65, delay: 0.32 }}
            className="mt-8 grid gap-3 sm:grid-cols-2"
          >
            {readiness.map((item) => (
              <div
                key={item.label}
                className="rounded-lg border border-white/10 bg-white/[0.035] p-4"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-mist/45">
                  {item.label}
                </p>
                <p className="mt-2 text-sm font-semibold text-white">
                  {item.value}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ scale: 0.96, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="relative min-h-[430px]"
        >
          <div className="car-stage relative overflow-hidden p-5 sm:p-8">
            <motion.div
              aria-hidden="true"
              animate={{ x: ["-20%", "120%"] }}
              transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
              className="absolute left-0 top-14 h-px w-2/3 bg-gradient-to-r from-transparent via-electric to-transparent opacity-70"
            />
            <motion.div
              aria-hidden="true"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute right-4 top-4 z-10 max-w-[210px] rounded-lg border border-white/10 bg-night/75 p-4 backdrop-blur sm:right-6 sm:top-6"
            >
              <p className="text-xs uppercase tracking-[0.24em] text-mist/50">
                Pilot readiness
              </p>
              <p className="mt-2 text-xl font-semibold text-limepulse">
                Do potwierdzenia
              </p>
            </motion.div>

            <svg
              className="car-light mx-auto mt-8 w-full max-w-[620px]"
              viewBox="0 0 700 320"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="Sylwetka auta w modelu mobility"
            >
              <path
                d="M92 211C128 156 199 121 278 116C358 111 430 128 497 174C551 176 595 191 622 220C637 236 628 262 606 262H100C71 262 63 235 92 211Z"
                fill="url(#body)"
                stroke="rgba(255,255,255,0.28)"
              />
              <path
                d="M214 124C250 78 331 70 400 103C431 118 459 141 484 172H166C176 151 192 137 214 124Z"
                fill="rgba(45,226,255,0.08)"
                stroke="rgba(45,226,255,0.38)"
              />
              <path
                d="M134 211H560"
                stroke="#2DE2FF"
                strokeWidth="5"
                strokeLinecap="round"
              />
              <path
                d="M516 201H611"
                stroke="#B6FF4D"
                strokeWidth="6"
                strokeLinecap="round"
              />
              <circle
                cx="188"
                cy="260"
                r="38"
                fill="#050816"
                stroke="rgba(255,255,255,0.28)"
                strokeWidth="10"
              />
              <circle
                cx="509"
                cy="260"
                r="38"
                fill="#050816"
                stroke="rgba(255,255,255,0.28)"
                strokeWidth="10"
              />
              <circle cx="188" cy="260" r="13" fill="#2DE2FF" />
              <circle cx="509" cy="260" r="13" fill="#2DE2FF" />
              <defs>
                <linearGradient
                  id="body"
                  x1="86"
                  y1="116"
                  x2="620"
                  y2="278"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#0E162B" />
                  <stop offset="0.5" stopColor="#13213B" />
                  <stop offset="1" stopColor="#07101E" />
                </linearGradient>
              </defs>
            </svg>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {["Airport", "Fleet", "Process"].map((item) => (
                <div
                  key={item}
                  className="rounded-lg border border-white/10 bg-white/[0.04] p-5"
                >
                  <p className="text-sm text-mist/50">Moduł</p>
                  <p className="mt-1 text-lg font-semibold text-white">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
