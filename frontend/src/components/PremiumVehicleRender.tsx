import { useState } from "react";
import { motion } from "framer-motion";
import premiumAsianSuvRender from "../assets/vehicles/premium-asian-suv-render.webp";

type PremiumVehicleRenderProps = {
  className?: string;
  compact?: boolean;
  priority?: boolean;
  showHotspots?: boolean;
};

const visualLabels = [
  "GOTOWOŚĆ PILOTAŻU",
  "Model pilotażu",
  "Założenie: 10 aut przy Lotnisku Chopina"
];

const vehicleHotspots = [
  {
    label: "Digital passport",
    text: "QR / tablet w aucie: instrukcja, zasady zwrotu, zgłoszenie szkody i szybki kontakt.",
    x: "28%",
    y: "45%"
  },
  {
    label: "Smart handover",
    text: "Pre-check, zdjęcia auta, depozyt i czytelny standard odbioru przy lotnisku.",
    x: "58%",
    y: "37%"
  },
  {
    label: "Fleet data",
    text: "Obłożenie, ADR, szkody, feedback klienta i popyt na segmenty floty.",
    x: "73%",
    y: "57%"
  }
];

export default function PremiumVehicleRender({
  className = "",
  compact = false,
  priority = false,
  showHotspots = false
}: PremiumVehicleRenderProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState(0);

  return (
    <motion.figure
      initial={{ y: 30, opacity: 0, scale: 0.985 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      transition={{ duration: 0.75, ease: "easeOut" }}
      className={`relative overflow-hidden rounded-lg border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.10),rgba(255,255,255,0.035)),radial-gradient(circle_at_50%_0%,rgba(45,226,255,0.13),transparent_38%),linear-gradient(180deg,#0B1020_0%,#050816_100%)] shadow-[0_34px_120px_rgba(0,0,0,0.55)] backdrop-blur-xl ${className}`}
    >
      <div className="pointer-events-none absolute inset-x-6 top-8 h-32 rounded-full bg-electric/15 blur-3xl" />
      <div className="pointer-events-none absolute bottom-10 left-1/2 h-24 w-[72%] -translate-x-1/2 rounded-full bg-black/55 blur-2xl" />
      <motion.div
        aria-hidden="true"
        animate={{ x: ["-140%", "140%"] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute top-0 z-20 h-full w-1/3 rotate-12 bg-gradient-to-r from-transparent via-white/[0.14] to-transparent mix-blend-screen"
      />

      <div className="absolute left-5 top-5 z-30 flex max-w-[92%] flex-wrap gap-2">
        {visualLabels.map((label) => (
          <span
            key={label}
            className="rounded-full border border-white/10 bg-night/75 px-3 py-2 text-[0.64rem] font-semibold uppercase tracking-[0.14em] text-mist/80 backdrop-blur"
          >
            {label}
          </span>
        ))}
      </div>

      <div className={compact ? "p-4 pt-24 sm:p-6 sm:pt-20" : "p-5 pt-28 sm:p-8 sm:pt-24"}>
        {imageFailed ? (
          <div className="flex min-h-[330px] items-center justify-center rounded-lg border border-dashed border-electric/25 bg-night/55 p-6 text-center">
            <div>
              <p className="text-lg font-semibold text-white">
                Dodaj render auta:
              </p>
              <p className="mt-3 break-all text-sm text-electric">
                src/assets/vehicles/premium-asian-suv-render.webp
              </p>
              <p className="mt-5 max-w-xl text-sm leading-6 text-mist/60">
                Zalecany asset: realistyczny render 3D no-brand premium electric
                SUV / Asian crossover.
              </p>
            </div>
          </div>
        ) : (
          <div className="relative">
            <img
              src={premiumAsianSuvRender}
              alt="Realistyczny render 3D no-brand premium Asian electric SUV"
              loading={priority ? "eager" : "lazy"}
              decoding="async"
              onError={() => setImageFailed(true)}
              className="relative z-10 mx-auto aspect-[3/2] w-full object-contain drop-shadow-[0_28px_70px_rgba(0,0,0,0.70)]"
            />

            {showHotspots && (
              <>
                <div className="absolute inset-0 z-30 hidden sm:block">
                  {vehicleHotspots.map((hotspot, index) => {
                    const isActive = activeHotspot === index;

                    return (
                      <button
                        key={hotspot.label}
                        type="button"
                        onMouseEnter={() => setActiveHotspot(index)}
                        onFocus={() => setActiveHotspot(index)}
                        onClick={() => setActiveHotspot(index)}
                        className="group absolute -translate-x-1/2 -translate-y-1/2"
                        style={{ left: hotspot.x, top: hotspot.y }}
                        aria-label={hotspot.label}
                      >
                        <span
                          className={`absolute left-1/2 top-1/2 h-11 w-11 -translate-x-1/2 -translate-y-1/2 rounded-full border ${
                            isActive
                              ? "border-limepulse/60 bg-limepulse/15"
                              : "border-electric/35 bg-electric/10"
                          } blur-[1px] transition`}
                        />
                        <span className="relative flex h-4 w-4 items-center justify-center rounded-full bg-white shadow-[0_0_26px_rgba(45,226,255,0.85)]">
                          <span
                            className={`h-2 w-2 rounded-full ${
                              isActive ? "bg-limepulse" : "bg-electric"
                            }`}
                          />
                        </span>
                      </button>
                    );
                  })}
                </div>

                <motion.div
                  key={vehicleHotspots[activeHotspot].label}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.25 }}
                  className="relative z-30 mt-4 rounded-lg border border-white/10 bg-night/70 p-4 backdrop-blur sm:absolute sm:bottom-5 sm:left-5 sm:mt-0 sm:max-w-[330px]"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-electric">
                    {vehicleHotspots[activeHotspot].label}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-mist/75">
                    {vehicleHotspots[activeHotspot].text}
                  </p>
                  <div className="mt-4 flex gap-2 sm:hidden">
                    {vehicleHotspots.map((hotspot, index) => (
                      <button
                        key={hotspot.label}
                        type="button"
                        onClick={() => setActiveHotspot(index)}
                        className={`h-2 flex-1 rounded-full ${
                          activeHotspot === index ? "bg-electric" : "bg-white/15"
                        }`}
                        aria-label={hotspot.label}
                      />
                    ))}
                  </div>
                </motion.div>
              </>
            )}
          </div>
        )}
      </div>

      <figcaption className="relative z-20 border-t border-white/10 px-5 py-4 text-sm leading-6 text-mist/60 sm:px-8">
        Render poglądowy. Kierunek floty: premium Asian EV / hybrid / selected
        ICE. Bez użycia znaków towarowych producentów.
      </figcaption>
    </motion.figure>
  );
}
