import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Problem from "./components/Problem";
import Solution from "./components/Solution";
import Audience from "./components/Audience";
import Benefits from "./components/Benefits";
import Model from "./components/Model";
import Differentiators from "./components/Differentiators";
import Pilot from "./components/Pilot";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";
import PremiumFleetPage from "./pages/PremiumFleetPage";
import InvestorPage from "./pages/InvestorPage";

export default function App() {
  const routePath = window.location.pathname.replace(/\/$/, "");
  const isPremiumFleetRoute = routePath.endsWith("/premium-fleet");
  const isInvestorRoute = routePath.endsWith("/investor");

  if (isPremiumFleetRoute) {
    return <PremiumFleetPage />;
  }

  if (isInvestorRoute) {
    return <InvestorPage />;
  }

  return (
    <div className="min-h-screen overflow-hidden bg-night text-white">
      <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:44px_44px]" />
      <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(135deg,rgba(45,226,255,0.10),transparent_34%),linear-gradient(215deg,rgba(182,255,77,0.08),transparent_38%),linear-gradient(180deg,#050816_0%,#080D18_42%,#03050B_100%)]" />
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(3,5,11,0.28)_58%,rgba(3,5,11,0.88)_100%)]" />

      <Navbar />

      <main className="relative z-10">
        <Hero />
        <Audience />
        <Problem />
        <Solution />
        <Benefits />
        <Model />
        <Pilot />
        <Differentiators />
        <ContactForm />
      </main>

      <Footer />
    </div>
  );
}
