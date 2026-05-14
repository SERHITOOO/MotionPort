import { motion } from "framer-motion";

const fleetReasons = [
  {
    title: "Szeroki zakres segmentów",
    text: "Marki azjatyckie obejmują auta ekonomiczne, biznesowe, hybrydowe, elektryczne, spalinowe i premium."
  },
  {
    title: "Kontakt z realnym użytkownikiem",
    text: "Rental przy lotnisku może być kanałem testowania aut w normalnej podróży, nie tylko podczas krótkiej prezentacji."
  },
  {
    title: "Ekspozycja i feedback",
    text: "Projekt może wspierać budowanie zaufania, zbieranie opinii i porównanie zainteresowania segmentami."
  },
  {
    title: "Kierunek do walidacji",
    text: "Warunki floty, marki, koszty i popyt wymagają potwierdzenia przed większą inwestycją."
  }
];

export default function Audience() {
  return (
    <section id="fleet" className="section-shell py-20 sm:py-24">
      <motion.div
        initial={{ y: 32, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.65 }}
      >
        <p className="eyebrow mb-4 border-electric/20 bg-electric/10 text-electric">
          Dlaczego marki azjatyckie
        </p>
        <h2 className="max-w-4xl text-3xl font-semibold tracking-tight sm:text-5xl">
          Pierwszy możliwy kierunek floty, ale bez zamykania modelu tylko na EV.
        </h2>
        <p className="mt-7 max-w-4xl text-lg leading-8 text-mist/75">
          Model nie powinien być zamknięty na jeden typ napędu. Jeśli dane z
          pilotażu pokażą popyt na auta premium, hybrydowe albo spalinowe, flota
          może zostać rozszerzona zgodnie z ekonomią i dostępnością.
        </p>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {fleetReasons.map((item, index) => (
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
