import { motion } from "framer-motion";

const process = [
  {
    title: "Rezerwacja przed podróżą",
    text: "Klient wybiera segment auta i podstawowe usługi jeszcze przed przylotem."
  },
  {
    title: "Odbiór po przylocie",
    text: "Auto czeka w wyznaczonym punkcie lub na parkingu okołolotniskowym."
  },
  {
    title: "Instrukcja w aucie",
    text: "Tablet albo cyfrowa instrukcja pomaga zrozumieć pojazd, zasady i wsparcie."
  },
  {
    title: "Dane z realnego użycia",
    text: "Po zwrocie zbierane są dane o czasie odbioru, satysfakcji, problemach, wykorzystaniu, kosztach i zainteresowaniu."
  },
  {
    title: "Decyzja po pilotażu",
    text: "Po teście zapada decyzja: skalować, zmienić model albo zamknąć temat."
  }
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
          Rozwiązaniem jest prosty, mierzalny proces od rezerwacji do decyzji po
          pilotażu.
        </h2>
        <p className="mt-7 max-w-4xl text-lg leading-8 text-mist/75">
          MotionPort testuje model, w którym rental, ekspozycja marki i dane z
          realnego użytkowania są częścią jednego lekkiego pilotażu.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {process.map((step, index) => (
            <motion.article
              key={step.title}
              initial={{ y: 24, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.55, delay: index * 0.04 }}
              className="glass-card rounded-lg p-5"
            >
              <span className="text-sm font-semibold text-electric">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-white">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-mist/70">{step.text}</p>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
