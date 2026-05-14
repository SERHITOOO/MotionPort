import { motion } from "framer-motion";

const problems = [
  {
    title: "Dla klienta",
    text: "Po przylocie wynajem auta często oznacza kolejkę, niejasne warunki, stres przy odbiorze, nieznane auto i słabe wsparcie po wydaniu pojazdu."
  },
  {
    title: "Dla importera / dealera",
    text: "Klasyczna jazda próbna jest krótka i sztuczna. Marka nie wie, jak klient realnie odbiera auto po kilku godzinach lub dniach użytkowania."
  },
  {
    title: "Dla partnera / inwestora",
    text: "Trudno ocenić, które modele, segmenty i lokalizacje mają realny potencjał bez małego, mierzalnego pilotażu."
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
          Problem nie leży tylko w aucie. Leży w procesie, danych i ryzyku
          decyzji.
        </h2>
        <p className="mt-7 max-w-4xl text-lg leading-8 text-mist/75">
          MotionPort celuje w moment po przylocie: klient chce szybko odebrać
          auto i ruszyć dalej, a partner potrzebuje sprawdzić popyt oraz koszty
          bez budowania od razu dużej organizacji.
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
