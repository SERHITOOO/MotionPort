const express = require("express");
const cors = require("cors");
const fs = require("fs/promises");
const path = require("path");
const { randomUUID } = require("crypto");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 4000;
const HOST = process.env.HOST || "127.0.0.1";
const DEFAULT_ALLOWED_ORIGINS = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:5174",
  "http://127.0.0.1:5174"
];
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGIN
  ? process.env.ALLOWED_ORIGIN.split(",")
  : DEFAULT_ALLOWED_ORIGINS
)
  .map((origin) => origin.trim())
  .filter(Boolean);
const SUBMISSIONS_FILE = path.join(__dirname, "submissions.json");
const ALLOWED_ROLES = [
  "Inwestor",
  "Operator rentalowy",
  "Importer / dealer",
  "Lotnisko / parking",
  "Partner flotowy",
  "Partner reklamowy",
  "Inny"
];

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || ALLOWED_ORIGINS.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Origin niedozwolony przez CORS."));
    },
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"]
  })
);

app.use(express.json({ limit: "32kb" }));

app.use((error, req, res, next) => {
  if (error instanceof SyntaxError && "body" in error) {
    return res.status(400).json({
      error: "Nieprawidłowy JSON w treści żądania."
    });
  }

  return next(error);
});

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function cleanString(value) {
  if (typeof value !== "string") return "";
  return value.trim();
}

async function readSubmissions() {
  try {
    const file = await fs.readFile(SUBMISSIONS_FILE, "utf8");
    const parsed = JSON.parse(file);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed;
  } catch (error) {
    if (error.code === "ENOENT") {
      await fs.writeFile(SUBMISSIONS_FILE, "[]", "utf8");
      return [];
    }

    throw error;
  }
}

async function writeSubmissions(submissions) {
  await fs.writeFile(
    SUBMISSIONS_FILE,
    JSON.stringify(submissions, null, 2),
    "utf8"
  );
}

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.post("/api/contact", async (req, res) => {
  try {
    const name = cleanString(req.body?.name);
    const email = cleanString(req.body?.email);
    const company = cleanString(req.body?.company);
    const role = cleanString(req.body?.role);
    const message = cleanString(req.body?.message);

    if (!name && !email && !company && !role && !message) {
      return res.status(400).json({
        error: "Formularz jest pusty. Uzupełnij dane i spróbuj ponownie."
      });
    }

    if (!name) {
      return res.status(400).json({
        error: "Pole imię i nazwisko jest wymagane."
      });
    }

    if (!email) {
      return res.status(400).json({
        error: "Pole email jest wymagane."
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        error: "Podaj poprawny adres email."
      });
    }

    if (!company) {
      return res.status(400).json({
        error: "Pole firma jest wymagane."
      });
    }

    if (!role) {
      return res.status(400).json({
        error: "Pole rola jest wymagane."
      });
    }

    if (!ALLOWED_ROLES.includes(role)) {
      return res.status(400).json({
        error: "Wybierz poprawną rolę z listy."
      });
    }

    if (!message) {
      return res.status(400).json({
        error: "Pole wiadomość jest wymagane."
      });
    }

    if (message.length < 10) {
      return res.status(400).json({
        error: "Wiadomość powinna mieć minimum 10 znaków."
      });
    }

    const submissions = await readSubmissions();

    const submission = {
      id: randomUUID(),
      name,
      email,
      company,
      role,
      message,
      createdAt: new Date().toISOString()
    };

    submissions.push(submission);

    await writeSubmissions(submissions);

    return res.status(201).json({
      message:
        "Dziękujemy. Zgłoszenie zostało zapisane. W kolejnym kroku warto omówić zakres pilotażu i dane do potwierdzenia.",
      submission: {
        id: submission.id,
        createdAt: submission.createdAt
      }
    });
  } catch (error) {
    console.error("Contact form error:", error);

    return res.status(500).json({
      error: "Wystąpił błąd serwera. Spróbuj ponownie później."
    });
  }
});

app.use((req, res) => {
  res.status(404).json({
    error: "Nie znaleziono endpointu."
  });
});

app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  return res.status(500).json({
    error: error.message || "Wystąpił błąd serwera."
  });
});

app.listen(PORT, HOST, () => {
  console.log(`MotionPort API działa na http://${HOST}:${PORT}`);
});
