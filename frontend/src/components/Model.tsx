import { motion } from "framer-motion";

const flow = [
  "Rezerwacja",
  "Weryfikacja",
  "Wybór auta i segmentu",
  "Instrukcja odbioru",
  "Parking operacyjny",
  "Jazda",
  "Tablet / wsparcie",
  "Zwrot",
  "Raport danych"
];

const confirmations = [
  "warunki najmu floty",
  "dostępność marek azjatyckich",
  "dostępność EV, hybryd, aut spalinowych i premium",
  "koszt parkingów, ładowania, paliwa, kiosku i tabletów",
  "koszt systemu IT, serwisu, ubezpieczeń i szkód",
  "zasady współpracy z lotniskiem",
  "popyt na poszczególne segmenty aut",
  "rentowność pilotażu"
];

export default function Model() {
  return (
    <section id="model" className="section-shell py-20 sm:py-24">
      <motion.div
        initial={{ y: 32, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: false, amount: 0.25 }}
        transition={{ duration: 0.65 }}
        className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]"
      >
        <div className="glass-card rounded-lg p-7 sm:p-10">
          <p className="eyebrow mb-4 border-electric/20 bg-electric/10 text-electric">
            Model operacyjny
          </p>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-5xl">
            Oś procesu ma pokazać, gdzie projekt zarabia, gdzie traci czas i
            gdzie powstaje ryzyko.
          </h2>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {flow.map((item, index) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.035] p-4"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-electric/10 text-sm font-semibold text-electric">
                  {index + 1}
                </span>
                <p className="text-sm font-medium text-mist/85">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-limepulse/20 bg-limepulse/[0.045] p-7 sm:p-10">
          <h3 className="text-2xl font-semibold text-white">
            Co jest do potwierdzenia
          </h3>
          <div className="mt-7 space-y-4">
            {confirmations.map((item, index) => (
              <div key={item} className="flex gap-4">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-limepulse/15 text-sm font-semibold text-limepulse">
                  {index + 1}
                </span>
                <p className="leading-7 text-mist/75">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
