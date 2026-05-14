import { motion } from "framer-motion";

const navItems = [
  { label: "Dlaczego teraz", href: "#why-now" },
  { label: "Problem", href: "#problem" },
  { label: "Przychody", href: "#revenue" },
  { label: "Walidacja", href: "#validation" },
  { label: "Pilot", href: "#pilot" },
  { label: "Ryzyka", href: "#risks" },
  { label: "Kontakt", href: "#contact" }
];

export default function Navbar() {
  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-night/72 backdrop-blur-xl"
    >
      <nav className="section-shell flex h-16 items-center justify-between gap-4 sm:h-20">
        <a href="#top" className="group flex min-w-0 items-center gap-3">
          <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-electric shadow-glow transition group-hover:scale-125" />
          <span className="truncate text-xs font-semibold uppercase tracking-[0.22em] text-white sm:text-sm">
            MotionPort
          </span>
        </a>

        <div className="hidden items-center gap-4 xl:flex xl:gap-6">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-mist/70 transition hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </div>

        <a
          href="#contact"
          className="shrink-0 rounded-md border border-electric/40 px-4 py-2 text-sm font-medium text-electric transition hover:border-electric hover:bg-electric/10 sm:px-5"
        >
          Kontakt
        </a>
      </nav>
    </motion.header>
  );
}
