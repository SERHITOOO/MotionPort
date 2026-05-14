import { motion } from "framer-motion";

const scope = [
  "1 lokalizacja startowa lub lokalizacja okołolotniskowa",
  "5-10 aut w pierwszym wariancie testowym",
  "Flota mieszana: EV, hybryda, benzyna, SUV lub segment premium",
  "Czas trwania: 60-90 dni",
  "Prosty system rezerwacji i obsługi, bez budowania ciężkiej platformy IT",
  "Raport końcowy po pilotażu"
];

const kpis = [
  "Liczba rezerwacji",
  "Wykorzystanie floty",
  "Średni czas odbioru auta",
  "Koszt obsługi jednej rezerwacji",
  "Liczba reklamacji i problemów",
  "Satysfakcja klienta",
  "Najczęściej wybierane segmenty aut",
  "Udział klientów zainteresowanych dłuższym testem lub zakupem",
  "Koszt pozyskania klienta",
  "Przychód na auto"
];

const nextVariants = [
  {
    title: "Lean pilot",
    text: "Minimalny test popytu i procesu na jednej lokalizacji."
  },
  {
    title: "Standard pilot",
    text: "Test operacyjny i partnerski z raportem kosztów oraz KPI."
  },
  {
    title: "Strategic pilot",
    text: "Test pod inwestora lub dużego partnera flotowego, z szerszym zakresem danych."
  }
];

export default function Pilot() {
  return (
    <section id="pilot" className="section-shell py-20 sm:py-24">
      <motion.div
        initial={{ y: 32, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: false, amount: 0.25 }}
        transition={{ duration: 0.65 }}
        className="glass-card rounded-lg p-7 sm:p-10"
      >
        <p className="eyebrow mb-4 border-limepulse/20 bg-limepulse/10 text-limepulse">
          Pilot i dane
        </p>
        <h2 className="max-w-4xl text-3xl font-semibold tracking-tight sm:text-5xl">
          Proponowany pierwszy pilot ma odpowiedzieć, czy model warto skalować.
        </h2>
        <p className="mt-7 max-w-4xl text-lg leading-8 text-mist/75">
          Cel: sprawdzić, czy MotionPort ma sens jako model operacyjny i
          partnerski przy lotniskach. To zakres roboczy, nie finalna deklaracja:
          dokładna skala zależy od partnera flotowego, lokalizacji, kosztów i
          dostępności aut.
        </p>

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h3 className="text-2xl font-semibold text-white">
              Zakres roboczy
            </h3>
            <div className="mt-6 grid gap-3">
              {scope.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ y: 18, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: false, amount: 0.35 }}
                  transition={{ duration: 0.5, delay: index * 0.04 }}
                  className="rounded-lg border border-white/10 bg-white/[0.04] p-4"
                >
                  <span className="text-sm text-electric">0{index + 1}</span>
                  <p className="mt-3 font-semibold text-white">{item}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-white">
              Co mierzymy w pilotażu?
            </h3>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {kpis.map((item) => (
                <motion.div
                  key={item}
                  initial={{ y: 18, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: false, amount: 0.35 }}
                  transition={{ duration: 0.5 }}
                  className="rounded-lg border border-limepulse/15 bg-limepulse/[0.045] p-4"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-limepulse">
                    KPI
                  </p>
                  <p className="mt-3 leading-7 text-mist/80">{item}</p>
                </motion.div>
              ))}
            </div>
            <p className="mt-5 rounded-lg border border-white/10 bg-white/[0.035] p-4 leading-7 text-mist/75">
              Najważniejszym wynikiem pilotażu nie jest sama sprzedaż, tylko
              odpowiedź: czy model warto skalować.
            </p>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8">
          <h3 className="text-2xl font-semibold text-white">
            Proponowany następny krok
          </h3>
          <p className="mt-4 max-w-4xl leading-7 text-mist/75">
            Pierwsza rozmowa nie ma na celu decyzji inwestycyjnej. Celem jest
            ocena, czy warto przygotować krótkie założenia pilotażu:
            lokalizacja, flota, koszty, partnerzy, KPI i harmonogram.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {nextVariants.map((item) => (
              <article
                key={item.title}
                className="rounded-lg border border-white/10 bg-white/[0.035] p-5"
              >
                <h4 className="font-semibold text-white">{item.title}</h4>
                <p className="mt-3 leading-7 text-mist/75">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
