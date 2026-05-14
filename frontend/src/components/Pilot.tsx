import { motion } from "framer-motion";

const scope = [
  "90 dni testu procesu",
  "2 do 4 lokalizacji",
  "ograniczona flota",
  "jeden standard obsługi",
  "kilka segmentów aut do porównania, jeśli dostępność na to pozwala",
  "tygodniowy raport",
  "decyzja go / no go"
];

const kpis = [
  "czas odbioru auta po przylocie",
  "koszt obsługi jednej rezerwacji",
  "wykorzystanie floty",
  "liczba rezerwacji",
  "koszt szkód",
  "koszt ładowania / paliwa",
  "koszt serwisu i parkingu",
  "satysfakcja klienta",
  "liczba reklamacji",
  "gotowość partnerów do skalowania",
  "różnica zainteresowania EV, hybrydami, spalinowymi i premium",
  "różnica zainteresowania markami chińskimi, koreańskimi i japońskimi"
];

const directions = [
  "więcej lotnisk",
  "wejście do dużych miast",
  "segment premium jako dodatkowa linia",
  "pakiety business",
  "partnerstwa z hotelami i parkingami",
  "oferty lokalne w tablecie",
  "kanał demonstracyjny dla importerów",
  "integracja z CRM / systemem rezerwacji"
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
          Minimalny pilotaż ma zebrać dane, nie udowadniać tezę na skróty.
        </h2>
        <p className="mt-7 max-w-4xl text-lg leading-8 text-mist/75">
          Pilotaż powinien sprawdzić popyt, koszty, obsługę, segmenty floty i
          gotowość partnerów przed większą inwestycją.
        </p>

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h3 className="text-2xl font-semibold text-white">
              Minimalny zakres pilotażu
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
              Dane do zebrania w pilotażu
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
                    Do potwierdzenia
                  </p>
                  <p className="mt-3 leading-7 text-mist/80">{item}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8">
          <h3 className="text-2xl font-semibold text-white">
            Kierunki rozwoju po walidacji
          </h3>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {directions.map((item) => (
              <p
                key={item}
                className="rounded-lg border border-white/10 bg-white/[0.035] p-4 leading-7 text-mist/75"
              >
                {item}
              </p>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
