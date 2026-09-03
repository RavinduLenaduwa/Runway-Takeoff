import { useState, type FormEvent } from "react";
import { motion, useScroll } from "framer-motion";
import { Link } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useDocumentTitle } from "@/hooks/use-document-title";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function WorkWithUs() {
  useDocumentTitle("Work With Us | Runway 14");
  const { scrollYProgress } = useScroll();
  const [hasExistingProduct, setHasExistingProduct] = useState("no");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [servicesError, setServicesError] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function toggleService(service: string) {
    setSelectedServices((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
    );
    setServicesError(false);
  }

  function handleWorkWithUsSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (selectedServices.length === 0) {
      setServicesError(true);
      return;
    }

    const formData = new FormData(event.currentTarget);
    const services = formData.getAll("services");
    const details = [
      `Name: ${formData.get("name")}`,
      `Email: ${formData.get("email")}`,
      `Company / Project: ${formData.get("company") || "Not provided"}`,
      "",
      `Services: ${services.join(", ")}`,
      "",
      "What are you building?",
      `${formData.get("project")}`,
      "",
      "Goal:",
      `${formData.get("goal")}`,
      "",
      `Existing website or product: ${formData.get("existingProduct")}`,
      formData.get("existingProduct") === "yes" ? `URL: ${formData.get("url")}` : "",
      "",
      `Budget: ${formData.get("budget")}`
    ].filter(Boolean).join("\n");

    window.location.href = `mailto:hello@runway14.com?subject=${encodeURIComponent("New RWY14 project inquiry")}&body=${encodeURIComponent(details)}`;
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black overflow-hidden font-sans">
      <Navbar />
      <motion.div
        className="fixed top-0 left-0 right-0 z-[60] h-px origin-left bg-white"
        style={{ scaleX: scrollYProgress }}
      />

      <main className="px-6 md:px-12 lg:px-24">
        <section className="pt-40 md:pt-48 pb-32">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-7xl mx-auto"
          >
            <motion.div variants={fadeUp} className="mb-16">
              <Link href="/" className="inline-block text-xs tracking-[0.25em] uppercase text-white/40 hover:text-white transition-colors mb-10">
                Back to runway
              </Link>
              <div className="text-xs tracking-[0.3em] uppercase text-white/50 mb-8">Project Intake</div>
              <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-none mb-8">
                WORK WITH<br />US.
              </h1>
              <p className="text-lg md:text-xl text-white/50 font-light max-w-2xl">
                Tell us what you’re building. We’ll map the shortest path from idea to launch.
              </p>
            </motion.div>

            <motion.form variants={fadeUp} onSubmit={handleWorkWithUsSubmit} className="max-w-4xl ml-auto space-y-12">
              <div className="space-y-6">
                <div className="text-xs tracking-[0.25em] uppercase text-white/40">01 / Basics</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <label className="block">
                    <span className="block text-xs tracking-[0.2em] uppercase text-white/40 mb-3">Name *</span>
                    <input required name="name" type="text" className="w-full bg-transparent border border-white/15 px-4 py-4 text-white outline-none transition-colors focus:border-white" />
                  </label>
                  <label className="block">
                    <span className="block text-xs tracking-[0.2em] uppercase text-white/40 mb-3">Email *</span>
                    <input required name="email" type="email" className="w-full bg-transparent border border-white/15 px-4 py-4 text-white outline-none transition-colors focus:border-white" />
                  </label>
                </div>
                <label className="block">
                  <span className="block text-xs tracking-[0.2em] uppercase text-white/40 mb-3">Company / Project Name</span>
                  <input name="company" type="text" className="w-full bg-transparent border border-white/15 px-4 py-4 text-white outline-none transition-colors focus:border-white" />
                </label>
              </div>

              <div className="space-y-6">
                <div className="text-xs tracking-[0.25em] uppercase text-white/40">02 / Services</div>
                <fieldset className="space-y-4">
                  <legend className="text-xs tracking-[0.2em] uppercase text-white/40 mb-3">Which service(s) are you interested in? *</legend>
                  <div className="grid grid-cols-2 gap-4">
                    {["Web Apps", "Website", "SEO", "AI Automations"].map((service) => (
                      <label key={service} className="cursor-pointer border border-white/15 px-4 py-4 text-sm tracking-[0.18em] uppercase text-white/60 transition-colors has-[:checked]:border-white has-[:checked]:text-white">
                        <input
                          type="checkbox"
                          name="services"
                          value={service}
                          checked={selectedServices.includes(service)}
                          onChange={() => toggleService(service)}
                          className="sr-only"
                        />
                        {service}
                      </label>
                    ))}
                  </div>
                  {servicesError && (
                    <div className="text-sm text-white/50">Pick at least one service.</div>
                  )}
                </fieldset>
              </div>

              <div className="space-y-6">
                <div className="text-xs tracking-[0.25em] uppercase text-white/40">03 / Project</div>
                <label className="block">
                  <span className="block text-xs tracking-[0.2em] uppercase text-white/40 mb-3">What are you building? *</span>
                  <textarea required name="project" rows={4} className="w-full resize-none bg-transparent border border-white/15 px-4 py-4 text-white outline-none transition-colors focus:border-white" />
                </label>
                <label className="block">
                  <span className="block text-xs tracking-[0.2em] uppercase text-white/40 mb-3">Goal *</span>
                  <textarea required name="goal" rows={3} className="w-full resize-none bg-transparent border border-white/15 px-4 py-4 text-white outline-none transition-colors focus:border-white" placeholder="What are you trying to achieve?" />
                </label>
              </div>

              <div className="space-y-6">
                <div className="text-xs tracking-[0.25em] uppercase text-white/40">04 / Product Context</div>
                <fieldset className="space-y-4">
                  <legend className="text-xs tracking-[0.2em] uppercase text-white/40 mb-3">Do you have an existing website or product?</legend>
                  <div className="grid grid-cols-2 gap-4">
                    {["yes", "no"].map((option) => (
                      <label key={option} className="cursor-pointer border border-white/15 px-4 py-4 text-sm tracking-[0.18em] uppercase text-white/60 transition-colors has-[:checked]:border-white has-[:checked]:text-white">
                        <input
                          required
                          type="radio"
                          name="existingProduct"
                          value={option}
                          checked={hasExistingProduct === option}
                          onChange={() => setHasExistingProduct(option)}
                          className="sr-only"
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                </fieldset>
                {hasExistingProduct === "yes" && (
                  <motion.label initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="block">
                    <span className="block text-xs tracking-[0.2em] uppercase text-white/40 mb-3">URL *</span>
                    <input required name="url" type="url" className="w-full bg-transparent border border-white/15 px-4 py-4 text-white outline-none transition-colors focus:border-white" placeholder="https://" />
                  </motion.label>
                )}
              </div>

              <div className="space-y-6">
                <div className="text-xs tracking-[0.25em] uppercase text-white/40">05 / Budget</div>
                <fieldset>
                  <legend className="text-xs tracking-[0.2em] uppercase text-white/40 mb-3">Budget Range *</legend>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {["<$2k", "$2k–$5k", "$5k–$10k", "$10k+"].map((budget) => (
                      <label key={budget} className="cursor-pointer border border-white/15 px-4 py-4 text-sm tracking-[0.18em] uppercase text-white/60 transition-colors has-[:checked]:border-white has-[:checked]:text-white">
                        <input required type="radio" name="budget" value={budget} className="sr-only" />
                        {budget}
                      </label>
                    ))}
                  </div>
                </fieldset>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                <button type="submit" className="border border-white bg-white px-10 py-5 text-sm font-bold tracking-[0.2em] uppercase text-black transition-all duration-300 hover:bg-black hover:text-white">
                  Send Inquiry
                </button>
                {submitted && (
                  <div className="text-sm text-white/50">
                    Draft created. Send it from your email client.
                  </div>
                )}
              </div>
            </motion.form>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}