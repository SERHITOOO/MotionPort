import { motion } from "framer-motion";

const reasons = [
  {
    title: "Oczekiwanie prostego odbioru",
    text: "Klienci po przylocie oczekują szybkiego, prostego i przewidywalnego odbioru auta."
  },
  {
    title: "Silniejsza konkurencja marek azjatyckich",
    text: "Marki azjatyckie coraz mocniej konkurują ceną, technologią, wyposażeniem i dostępnością."
  },
  {
    title: "Test-drive bliżej realnego użycia",
    text: "Klasyczny test-drive w salonie nie pokazuje, jak auto sprawdza się w podróży, z bagażem i po kilku dniach używania."
  },
  {
    title: "Lotnisko ma naturalny ruch",
    text: "Lotniska i parkingi generują ruch klientów, którzy realnie potrzebują mobilności i często podejmują szybkie decyzje."
  },
  {
    title: "Pilot ogranicza ryzyko",
    text: "Dobrze zaprojektowany pilot może sprawdzić popyt bez budowania od razu dużej struktury operacyjnej."
  }
];

export default function Audience() {
  return (
    <section id="why-now" className="section-shell py-20 sm:py-24">
      <motion.div
        initial={{ y: 32, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.65 }}
      >
        <p className="eyebrow mb-4 border-electric/20 bg-electric/10 text-electric">
          Dlaczego teraz?
        </p>
        <h2 className="max-w-4xl text-3xl font-semibold tracking-tight sm:text-5xl">
          To może mieć sens, jeśli pilot potwierdzi realny popyt i prostą
          ekonomię procesu.
        </h2>
        <p className="mt-7 max-w-4xl text-lg leading-8 text-mist/75">
          Model nie zakłada jednej odpowiedzi z góry. Flota może obejmować EV,
          hybrydy, auta spalinowe, SUV-y albo segment premium, jeśli potwierdzą
          to popyt, dostępność i koszty.
        </p>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {reasons.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ y: 24, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: false, amount: 0.28 }}
              transition={{ duration: 0.55, delay: index * 0.06 }}
              className="glass-card rounded-lg p-6"
            >
              <span className="text-sm font-semibold text-limepulse">
                0{index + 1}
              </span>
              <h3 className="mt-5 text-xl font-semibold text-white">
                {item.title}
              </h3>
              <p className="mt-4 leading-7 text-mist/70">{item.text}</p>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
