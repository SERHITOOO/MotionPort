import { motion } from "framer-motion";

const process = [
  "Rezerwacja online",
  "Kiosk lub szybka ścieżka",
  "Weryfikacja danych",
  "Wybór auta i segmentu",
  "Instrukcja odbioru",
  "Parking operacyjny",
  "Tablet / wsparcie",
  "Zwrot i raport danych"
];

export default function Solution() {
  return (
    <section className="section-shell py-20 sm:py-24">
      <motion.div
        initial={{ y: 32, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: false, amount: 0.25 }}
        transition={{ duration: 0.65 }}
      >
        <p className="eyebrow mb-4 border-limepulse/20 bg-limepulse/10 text-limepulse">
          Rozwiązanie
        </p>
        <h2 className="max-w-4xl text-3xl font-semibold tracking-tight sm:text-5xl">
          Jeden standard procesu od rezerwacji do raportu z pilotażu.
        </h2>
        <p className="mt-7 max-w-4xl text-lg leading-8 text-mist/75">
          Model zakłada cyfrowy odbiór auta, ale nie usuwa człowieka z miejsc,
          gdzie wymaga tego bezpieczeństwo, szkoda, reklamacja albo zasady
          lotniska.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {process.map((step, index) => (
            <motion.article
              key={step}
              initial={{ y: 24, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.55, delay: index * 0.04 }}
              className="glass-card rounded-lg p-5"
            >
              <span className="text-sm font-semibold text-electric">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-white">{step}</h3>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
