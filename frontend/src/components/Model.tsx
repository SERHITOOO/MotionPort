import { motion } from "framer-motion";

const searchAreas = [
  "Czy model ma sens z perspektywy dużego ekosystemu mobilności, energii lub flot.",
  "Jak ustawić pilotaż, żeby nie przepalić kapitału na zbyt dużej strukturze.",
  "Jakie partnerstwa są kluczowe: flota, parking, lotnisko, importer, dealer, ubezpieczenie.",
  "Jakie dane byłyby najbardziej wartościowe dla inwestora lub partnera strategicznego.",
  "Czy projekt powinien iść w stronę rentalu, test-drive'u, ekspozycji marek, danych, czy modelu mieszanego."
];

const partnerFit = [
  {
    title: "Fundusz / inwestor",
    text: "Mały pilot może dać materiał do decyzji: popyt, koszt obsługi, ryzyka i scenariusz skalowania."
  },
  {
    title: "Ekosystem mobilności i energii",
    text: "Projekt dotyka floty, parkingu, ładowania lub paliwa, obsługi klienta i danych z użytkowania."
  },
  {
    title: "Importer / dealer",
    text: "Rental przy lotnisku może być kanałem realnego testu aut i leadów sprzedażowych, jeśli klient wyrazi zainteresowanie."
  },
  {
    title: "Lotnisko / parking",
    text: "Model może zacząć się przy lokalizacji okołolotniskowej, zanim pojawi się cięższa integracja z lotniskiem."
  }
];

export default function Model() {
  return (
    <section id="validation" className="section-shell py-20 sm:py-24">
      <motion.div
        initial={{ y: 32, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: false, amount: 0.25 }}
        transition={{ duration: 0.65 }}
        className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]"
      >
        <div className="glass-card rounded-lg p-7 sm:p-10">
          <p className="eyebrow mb-4 border-electric/20 bg-electric/10 text-electric">
            Czego szukamy
          </p>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-5xl">
            Na tym etapie potrzebna jest mądra walidacja, nie duży budżet na
            start.
          </h2>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {searchAreas.map((item, index) => (
              <div
                key={item}
                className="flex gap-3 rounded-lg border border-white/10 bg-white/[0.035] p-4"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-electric/10 text-sm font-semibold text-electric">
                  {index + 1}
                </span>
                <p className="text-sm leading-6 text-mist/80">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-limepulse/20 bg-limepulse/[0.045] p-7 sm:p-10">
          <h3 className="text-2xl font-semibold text-white">
            Dlaczego to może być ciekawe dla partnera
          </h3>
          <div className="mt-7 space-y-4">
            {partnerFit.map((item, index) => (
              <div key={item.title} className="flex gap-4">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-limepulse/15 text-sm font-semibold text-limepulse">
                  {index + 1}
                </span>
                <div>
                  <h4 className="font-semibold text-white">{item.title}</h4>
                  <p className="mt-2 leading-7 text-mist/75">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
