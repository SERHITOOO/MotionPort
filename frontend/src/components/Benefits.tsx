import { motion } from "framer-motion";

const clientNeeds = [
  "szybki odbiór po przylocie",
  "prosty proces i jasne koszty",
  "minimum formalności",
  "instrukcje obsługi auta",
  "płatność bez chaosu",
  "wsparcie w razie problemu",
  "łatwy zwrot auta",
  "wybór segmentu: budżet, biznes, premium, EV, hybryda albo spalinowe"
];

const projectCanGive = [
  "rezerwację online",
  "kiosk lub szybką ścieżkę odbioru",
  "tablet w aucie",
  "instrukcje i wsparcie zdalne",
  "czytelny standard procesu",
  "test nowego auta w realnym użyciu",
  "różne segmenty floty",
  "w przyszłości pakiety business i premium"
];

export default function Benefits() {
  return (
    <section id="benefits" className="section-shell py-20 sm:py-24">
      <motion.div
        initial={{ y: 32, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: false, amount: 0.25 }}
        transition={{ duration: 0.65 }}
      >
        <p className="eyebrow mb-4 border-limepulse/20 bg-limepulse/10 text-limepulse">
          Klient i produkt
        </p>
        <h2 className="max-w-4xl text-3xl font-semibold tracking-tight sm:text-5xl">
          Klient potrzebuje przewidywalności, a projekt może dać prostszy
          standard odbioru.
        </h2>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <motion.div
            initial={{ y: 24, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: false, amount: 0.28 }}
            transition={{ duration: 0.55 }}
            className="glass-card rounded-lg p-6 sm:p-8"
          >
            <h3 className="text-2xl font-semibold text-white">
              Klient potrzebuje
            </h3>
            <div className="mt-6 grid gap-3">
              {clientNeeds.map((item) => (
                <p
                  key={item}
                  className="rounded-lg border border-white/10 bg-white/[0.035] p-4 leading-7 text-mist/75"
                >
                  {item}
                </p>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 24, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: false, amount: 0.28 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="rounded-lg border border-limepulse/20 bg-limepulse/[0.045] p-6 sm:p-8"
          >
            <h3 className="text-2xl font-semibold text-white">
              Projekt może dać
            </h3>
            <div className="mt-6 grid gap-3">
              {projectCanGive.map((item) => (
                <p
                  key={item}
                  className="rounded-lg border border-limepulse/15 bg-night/35 p-4 leading-7 text-mist/80"
                >
                  {item}
                </p>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
