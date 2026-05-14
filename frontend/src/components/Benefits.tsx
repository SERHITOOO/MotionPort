import { motion } from "framer-motion";

const revenueStreams = [
  "Przychód z wynajmu auta.",
  "Dopłaty za segment premium, SUV, EV, hybrydę lub konkretny model.",
  "Usługi dodatkowe: ubezpieczenie, drugi kierowca, fotelik, odbiór lub zwrot poza godzinami.",
  "Partnerstwa z importerami, dealerami, parkingami, hotelami i lokalnymi usługami.",
  "Dane i raporty z realnego użytkowania aut dla partnerów flotowych, dealerskich i importerskich.",
  "Leady sprzedażowe dla dealerów lub importerów, jeśli klient po wynajmie chce przetestować albo kupić auto."
];

export default function Benefits() {
  return (
    <section id="revenue" className="section-shell py-20 sm:py-24">
      <motion.div
        initial={{ y: 32, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: false, amount: 0.25 }}
        transition={{ duration: 0.65 }}
      >
        <p className="eyebrow mb-4 border-limepulse/20 bg-limepulse/10 text-limepulse">
          Model zarabiania
        </p>
        <h2 className="max-w-4xl text-3xl font-semibold tracking-tight sm:text-5xl">
          Potencjalne źródła przychodu powinny zostać sprawdzone etapami, nie
          założone z góry.
        </h2>
        <p className="mt-7 max-w-4xl text-lg leading-8 text-mist/75">
          Na pierwszym etapie nie zakładamy, że wszystkie strumienie przychodów
          zadziałają od razu. Celem pilotażu jest sprawdzenie, które z nich mają
          największy sens.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {revenueStreams.map((item, index) => (
            <motion.article
              key={item}
              initial={{ y: 24, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: false, amount: 0.28 }}
              transition={{ duration: 0.55, delay: index * 0.04 }}
              className="glass-card rounded-lg p-6"
            >
              <span className="text-sm font-semibold text-limepulse">
                0{index + 1}
              </span>
              <p className="mt-5 leading-7 text-mist/75">{item}</p>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
