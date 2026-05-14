import { motion } from "framer-motion";

const risks = [
  {
    risk: "Za mały popyt",
    mitigation: "Ograniczamy przez mały pilot, szybkie KPI i decyzję po 60-90 dniach."
  },
  {
    risk: "Zbyt wysokie koszty floty",
    mitigation: "Wymaga partnerstwa flotowego, dealerskiego albo elastycznej dostępności aut."
  },
  {
    risk: "Problemy z lokalizacją lotniskową",
    mitigation: "Można zacząć od parkingu okołolotniskowego i dopiero potem rozmawiać o pełnej integracji."
  },
  {
    risk: "Zbyt skomplikowana obsługa",
    mitigation: "Start od prostego procesu, małej floty i ręcznego wsparcia tam, gdzie jest potrzebne."
  },
  {
    risk: "Niska adopcja EV",
    mitigation: "Flota nie jest zamknięta na EV. Może obejmować hybrydy i auta spalinowe."
  },
  {
    risk: "Brak jasnej marży",
    mitigation: "Pilot ma policzyć realny koszt i przychód na auto, zamiast przyjmować marżę z góry."
  }
];

export default function Differentiators() {
  return (
    <section id="risks" className="section-shell py-20 sm:py-24">
      <motion.div
        initial={{ y: 32, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: false, amount: 0.25 }}
        transition={{ duration: 0.65 }}
      >
        <p className="eyebrow mb-4 border-electric/20 bg-electric/10 text-electric">
          Ryzyka
        </p>
        <h2 className="max-w-4xl text-3xl font-semibold tracking-tight sm:text-5xl">
          Najważniejsze ryzyka są operacyjne i ekonomiczne. Dlatego projekt
          powinien zaczynać się od pilotażu.
        </h2>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {risks.map((item, index) => (
            <motion.article
              key={item.risk}
              initial={{ y: 24, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.55, delay: index * 0.05 }}
              className="glass-card rounded-lg p-6"
            >
              <div className="mb-7 h-1 w-14 rounded-full bg-gradient-to-r from-electric to-limepulse" />
              <h3 className="text-xl font-semibold text-white">
                {item.risk}
              </h3>
              <p className="mt-4 leading-7 text-mist/70">
                <span className="font-semibold text-limepulse">
                  Ograniczenie ryzyka:{" "}
                </span>
                {item.mitigation}
              </p>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
