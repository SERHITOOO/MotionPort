import { FormEvent, useState } from "react";
import { motion } from "framer-motion";

type FormState = {
  name: string;
  email: string;
  company: string;
  role: string;
  message: string;
};

const roleOptions = [
  "Inwestor",
  "Operator rentalowy",
  "Importer / dealer",
  "Lotnisko / parking",
  "Partner flotowy",
  "Partner reklamowy",
  "Inny"
];

const initialState: FormState = {
  name: "",
  email: "",
  company: "",
  role: "",
  message: ""
};

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const apiUrl = (import.meta.env.VITE_API_URL || "http://localhost:4000").replace(
    /\/$/,
    ""
  );

  function updateField(field: keyof FormState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSuccess("");
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch(`${apiUrl}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Nie udało się wysłać formularza.");
      }

      setForm(initialState);
      setSuccess(
        "Dziękujemy. Zgłoszenie zostało zapisane. W kolejnym kroku warto omówić zakres pilotażu i dane do potwierdzenia."
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Wystąpił błąd podczas wysyłania formularza."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="contact" className="section-shell py-20 sm:py-24">
      <motion.div
        initial={{ y: 32, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: false, amount: 0.25 }}
        transition={{ duration: 0.65 }}
        className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]"
      >
        <div>
          <p className="eyebrow mb-4 border-electric/20 bg-electric/10 text-electric">
            Kontakt
          </p>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-5xl">
            Porozmawiajmy o pilotażu, inwestycji albo partnerstwie.
          </h2>
          <p className="mt-6 text-lg leading-8 text-mist/75">
            Napisz, czy interesuje Cię rola inwestora, operatora rentalowego,
            importera, dealera, lotniska, parkingu, partnera flotowego albo
            reklamowego.
          </p>

          <div className="mt-8 rounded-lg border border-limepulse/20 bg-limepulse/[0.045] p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-limepulse">
              Do potwierdzenia
            </p>
            <p className="mt-3 leading-7 text-mist/75">
              Lokalizacja, flota, segmenty aut, parking, ładowanie lub paliwo,
              kiosk, tablet, odpowiedzialność za szkody i format raportu.
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="glass-card rounded-lg p-6 sm:p-8"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block" htmlFor="contact-name">
              <span className="mb-2 block text-sm text-mist/70">
                Imię i nazwisko
              </span>
              <input
                id="contact-name"
                className="input-field"
                value={form.name}
                onChange={(event) => updateField("name", event.target.value)}
                placeholder="Jan Kowalski"
                autoComplete="name"
                required
              />
            </label>

            <label className="block" htmlFor="contact-email">
              <span className="mb-2 block text-sm text-mist/70">Email</span>
              <input
                id="contact-email"
                type="text"
                inputMode="email"
                className="input-field"
                value={form.email}
                onChange={(event) => updateField("email", event.target.value)}
                placeholder="jan@firma.pl"
                autoComplete="email"
                required
              />
            </label>
          </div>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <label className="block" htmlFor="contact-company">
              <span className="mb-2 block text-sm text-mist/70">Firma</span>
              <input
                id="contact-company"
                className="input-field"
                value={form.company}
                onChange={(event) => updateField("company", event.target.value)}
                placeholder="Nazwa firmy"
                autoComplete="organization"
                required
              />
            </label>

            <label className="block" htmlFor="contact-role">
              <span className="mb-2 block text-sm text-mist/70">Rola</span>
              <select
                id="contact-role"
                className="input-field"
                value={form.role}
                onChange={(event) => updateField("role", event.target.value)}
                required
              >
                <option value="">Wybierz rolę</option>
                {roleOptions.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className="mt-5 block" htmlFor="contact-message">
            <span className="mb-2 block text-sm text-mist/70">Wiadomość</span>
            <textarea
              id="contact-message"
              className="input-field min-h-36 resize-none"
              value={form.message}
              onChange={(event) => updateField("message", event.target.value)}
              placeholder="Napisz, jaki zakres pilotażu, inwestycji albo partnerstwa chcesz omówić."
              required
            />
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-6 w-full rounded-md bg-electric px-7 py-4 text-sm font-semibold text-night transition hover:bg-limepulse disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Wysyłanie..." : "Wyślij zapytanie"}
          </button>

          {success && (
            <p className="mt-5 rounded-lg border border-limepulse/30 bg-limepulse/10 p-4 text-sm leading-6 text-limepulse">
              {success}
            </p>
          )}

          {error && (
            <p className="mt-5 rounded-lg border border-red-400/30 bg-red-500/10 p-4 text-sm leading-6 text-red-200">
              {error}
            </p>
          )}
        </form>
      </motion.div>
    </section>
  );
}
