import { motion } from "framer-motion";

const problems = [
  {
    title: "Klient po przylocie chce prostego odbioru",
    text: "Kolejki, formalności, niejasne koszty i brak instrukcji przy nowych modelach zwiększają stres po podróży."
  },
  {
    title: "Operator płaci za ręczną obsługę",
    text: "Stanowisko, parking, wydania, zwroty, reklamacje i szkody tworzą kosztowny proces trudny do kopiowania."
  },
  {
    title: "Potrzeby klientów są różne",
    text: "Biznes, turystyka, budżet, premium, EV, hybryda i auta spalinowe wymagają segmentacji zamiast jednej floty."
  }
];

export default function Problem() {
  return (
    <section id="problem" className="section-shell py-20 sm:py-24">
      <motion.div
        initial={{ y: 32, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.65 }}
      >
        <p className="eyebrow mb-4 border-electric/20 bg-electric/10 text-electric">
          Problem
        </p>
        <h2 className="max-w-4xl text-3xl font-semibold tracking-tight sm:text-5xl">
          Lotniskowy rental jest wygodny w teorii, ale często ciężki w procesie.
        </h2>
        <p className="mt-7 max-w-4xl text-lg leading-8 text-mist/75">
          Projekt celuje w moment po przylocie: klient chce odebrać auto,
          zrozumieć zasady i ruszyć dalej. Operator potrzebuje procesu, który da
          się mierzyć, porównywać i skalować bez budowania od razu dużej
          struktury.
        </p>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {problems.map((problem, index) => (
            <motion.article
              key={problem.title}
              initial={{ y: 24, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: false, amount: 0.32 }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              className="glass-card rounded-lg p-6"
            >
              <span className="text-sm font-semibold text-electric">
                0{index + 1}
              </span>
              <h3 className="mt-5 text-xl font-semibold text-white">
                {problem.title}
              </h3>
              <p className="mt-4 leading-7 text-mist/70">{problem.text}</p>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
