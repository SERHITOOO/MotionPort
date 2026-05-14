import { motion } from "framer-motion";

const partners = [
  {
    title: "Importer / dealer / partner flotowy",
    need: "Ekspozycja, feedback i kontrolowany test popytu.",
    value: "Projekt może dać realny kontakt klienta z autem i dane z użycia.",
    confirm: "Warunki floty, dostępność modeli i odpowiedzialność za szkody."
  },
  {
    title: "Lotnisko / parking",
    need: "Lepsze wykorzystanie lokalizacji i przewidywalny proces.",
    value: "Projekt może uporządkować odbiór i zwrot bez dużej infrastruktury.",
    confirm: "Zasady współpracy, koszty parkingu i wymagania operacyjne."
  },
  {
    title: "Operator rentalowy",
    need: "Proces, który można powtarzać między lokalizacjami.",
    value: "Projekt może dać standard wydania auta, raportowania i obsługi.",
    confirm: "Koszt obsługi, reklamacje, szkody i gotowość zespołu."
  },
  {
    title: "Inwestor",
    need: "Hipotezy możliwe do walidacji przed większym finansowaniem.",
    value: "Pilotaż powinien pokazać popyt, koszty i bariery skalowania.",
    confirm: "Rentowność pilotażu i kryteria decyzji po 90 dniach."
  },
  {
    title: "Partner reklamowy",
    need: "Kontakt z klientem w podróży i kontekst lokalny.",
    value: "Tablet może być kanałem ofert hoteli, usług, atrakcji i ubezpieczeń.",
    confirm: "Akceptacja użytkownika, zasady emisji i realna konwersja."
  }
];

export default function Differentiators() {
  return (
    <section id="partners" className="section-shell py-20 sm:py-24">
      <motion.div
        initial={{ y: 32, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: false, amount: 0.25 }}
        transition={{ duration: 0.65 }}
      >
        <p className="eyebrow mb-4 border-electric/20 bg-electric/10 text-electric">
          Wartość dla partnerów
        </p>
        <h2 className="max-w-4xl text-3xl font-semibold tracking-tight sm:text-5xl">
          Wiarygodność projektu zależy od tego, co da każdej stronie i co
          trzeba potwierdzić.
        </h2>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {partners.map((partner, index) => (
            <motion.article
              key={partner.title}
              initial={{ y: 24, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.55, delay: index * 0.05 }}
              className="glass-card rounded-lg p-6"
            >
              <div className="mb-7 h-1 w-14 rounded-full bg-gradient-to-r from-electric to-limepulse" />
              <h3 className="text-xl font-semibold text-white">
                {partner.title}
              </h3>
              <p className="mt-4 leading-7 text-mist/70">
                <span className="font-semibold text-white">Potrzebuje: </span>
                {partner.need}
              </p>
              <p className="mt-3 leading-7 text-mist/70">
                <span className="font-semibold text-white">Projekt może: </span>
                {partner.value}
              </p>
              <p className="mt-3 leading-7 text-limepulse/85">
                <span className="font-semibold text-limepulse">
                  Do potwierdzenia:{" "}
                </span>
                {partner.confirm}
              </p>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
