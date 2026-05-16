import { motion } from "framer-motion";
import PremiumVehicleRender from "./PremiumVehicleRender";

const readiness = [
  { label: "Status", value: "koncepcja do walidacji" },
  { label: "Flota", value: "EV / hybryda / benzyna / premium" },
  { label: "Pilot", value: "60-90 dni" },
  { label: "Decyzja", value: "skalować, zmienić albo zamknąć" }
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
            Materiał do pierwszej rozmowy inwestorskiej / partnerskiej
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
            transition={{ duration: 0.65, delay: 0.12 }}
            className="mt-5 text-xl font-semibold text-electric sm:text-2xl"
          >
            Airport mobility concept for Asian car brands
          </motion.p>

          <motion.p
            initial={{ y: 28, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.65, delay: 0.18 }}
            className="mt-7 max-w-2xl text-lg leading-8 text-mist/75 sm:text-xl"
          >
            MotionPort to koncepcja pilotażowego modelu wynajmu, test-drive'u i
            ekspozycji marek azjatyckich przy lotniskach. Projekt łączy szybki
            odbiór auta po przylocie, prosty proces obsługi, segmentowaną flotę
            oraz dane z realnego użytkowania pojazdów.
          </motion.p>

          <motion.p
            initial={{ y: 28, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.65, delay: 0.24 }}
            className="mt-5 max-w-2xl rounded-lg border border-limepulse/20 bg-limepulse/[0.045] p-5 leading-7 text-mist/80"
          >
            Na tym etapie celem nie jest sprzedaż gotowego biznesu, tylko
            sprawdzenie, czy model ma sens operacyjny, finansowy i partnerski.
          </motion.p>

          <motion.div
            initial={{ y: 28, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.65, delay: 0.3 }}
            className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap"
          >
            <a
              href="#pilot"
              className="rounded-md bg-white px-6 py-4 text-center text-sm font-semibold text-night transition hover:bg-electric"
            >
              Zobacz model pilotażu
            </a>
            <a
              href="#contact"
              className="rounded-md border border-white/[0.15] px-6 py-4 text-center text-sm font-semibold text-white transition hover:border-limepulse hover:bg-limepulse/10"
            >
              Porozmawiajmy o inwestycji / partnerstwie
            </a>
            <a
              href="./premium-fleet/"
              className="rounded-md border border-electric/[0.35] bg-electric/10 px-6 py-4 text-center text-sm font-semibold text-electric transition hover:border-electric hover:bg-electric/[0.15]"
            >
              Zobacz wizualny koncept floty
            </a>
            <a
              href="./investor/"
              className="rounded-md border border-limepulse/[0.35] bg-limepulse/10 px-6 py-4 text-center text-sm font-semibold text-limepulse transition hover:border-limepulse hover:bg-limepulse/[0.15]"
            >
              Widok dla inwestora
            </a>
          </motion.div>

          <motion.div
            initial={{ y: 28, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.65, delay: 0.38 }}
            className="mt-8 grid gap-3 sm:grid-cols-2"
          >
            {readiness.map((item) => (
              <div
                key={item.label}
                className="rounded-lg border border-white/10 bg-white/[0.035] p-4"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-mist/[0.45]">
                  {item.label}
                </p>
                <p className="mt-2 text-sm font-semibold text-white">
                  {item.value}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        <PremiumVehicleRender compact priority className="min-h-[430px]" />
      </div>
    </section>
  );
}
