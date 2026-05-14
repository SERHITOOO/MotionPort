/** @type {import("tailwindcss").Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        night: "#050816",
        graphite: "#0B1020",
        ink: "#111827",
        electric: "#2DE2FF",
        limepulse: "#B6FF4D",
        mist: "#D7E1EA"
      },
      boxShadow: {
        glow: "0 0 40px rgba(45, 226, 255, 0.20)",
        limeglow: "0 0 36px rgba(182, 255, 77, 0.16)"
      },
      backgroundImage: {
        "radial-blue": "radial-gradient(circle at top, rgba(45, 226, 255, 0.18), transparent 34%)",
        "radial-lime": "radial-gradient(circle at 80% 20%, rgba(182, 255, 77, 0.12), transparent 28%)"
      }
    }
  },
  plugins: []
};