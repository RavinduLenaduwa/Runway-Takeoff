import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useDocumentMeta } from "@/hooks/use-document-meta";
import { PageBreadcrumb } from "@/components/PageBreadcrumb";
import { container, ink, shell } from "@/lib/theme";

const fieldLabel = "block text-sm text-white/60 mb-2";
const stepLabel = "text-sm text-white/50";
const inputBase = "w-full bg-transparent border px-4 py-4 text-white outline-none transition-colors focus:border-white";
const choiceBase = "cursor-pointer border border-white/15 px-4 py-4 text-sm text-white/70 transition-colors has-[:checked]:border-white has-[:checked]:text-white";

export default function WorkWithUs() {
  useDocumentMeta({
    title: "Work With Us | Casta",
    description: "Tell Casta what you're building. Get a clear quote and a realistic timeline before any work begins.",
    path: "work-with-us",
  });
  const [hasExistingProduct, setHasExistingProduct] = useState("no");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  function toggleService(service: string) {
    setSelectedServices((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
    );
    setErrors((prev) => ({ ...prev, services: "" }));
  }

  function clearError(field: string) {
    setErrors((prev) => (prev[field] ? { ...prev, [field]: "" } : prev));
  }

  function handleWorkWithUsSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const nextErrors: Record<string, string> = {};

    if (!formData.get("name")?.toString().trim()) nextErrors.name = "Tell us your name.";
    if (!formData.get("email")?.toString().trim()) nextErrors.email = "Tell us your email.";
    if (selectedServices.length === 0) nextErrors.services = "Pick at least one service.";
    if (!formData.get("project")?.toString().trim()) nextErrors.project = "Tell us what you're building.";
    if (!formData.get("goal")?.toString().trim()) nextErrors.goal = "Tell us your goal.";
    if (hasExistingProduct === "yes" && !formData.get("url")?.toString().trim()) nextErrors.url = "Add the URL.";
    if (!formData.get("budget")) nextErrors.budget = "Pick a budget range.";

    if (Object.values(nextErrors).some(Boolean)) {
      setErrors(nextErrors);
      return;
    }
    setErrors({});

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

    window.location.href = `mailto:hello@casta.dev?subject=${encodeURIComponent("New Casta project inquiry")}&body=${encodeURIComponent(details)}`;
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black font-sans">
      <Navbar />

      <main className={shell}>
        <section className="pt-32 md:pt-44 pb-24 md:pb-32">
          <div className={container}>
            <div className="max-w-3xl">
              <PageBreadcrumb label="Work With Us" path="work-with-us" />
              <h1 className="text-3xl md:text-5xl font-semibold tracking-tight">Work with us</h1>
              <p className={`mt-5 text-base md:text-lg ${ink.supporting} leading-relaxed`}>
                Tell us what you're building. We'll map the shortest path from idea to launch.
              </p>

              <form onSubmit={handleWorkWithUsSubmit} noValidate className="mt-16 space-y-14">
                <div className="space-y-6">
                  <div className={stepLabel}>01 / Basics</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <label className="block">
                      <span className={fieldLabel}>Name *</span>
                      <input
                        required
                        name="name"
                        type="text"
                        onChange={() => clearError("name")}
                        aria-invalid={!!errors.name}
                        className={`${inputBase} ${errors.name ? "border-white" : "border-white/15"}`}
                      />
                      {errors.name && <div className={`mt-2 text-sm ${ink.faint}`}>{errors.name}</div>}
                    </label>
                    <label className="block">
                      <span className={fieldLabel}>Email *</span>
                      <input
                        required
                        name="email"
                        type="email"
                        onChange={() => clearError("email")}
                        aria-invalid={!!errors.email}
                        className={`${inputBase} ${errors.email ? "border-white" : "border-white/15"}`}
                      />
                      {errors.email && <div className={`mt-2 text-sm ${ink.faint}`}>{errors.email}</div>}
                    </label>
                  </div>
                  <label className="block">
                    <span className={fieldLabel}>Company / project name</span>
                    <input name="company" type="text" className={`${inputBase} border-white/15`} />
                  </label>
                </div>

                <div className="space-y-6">
                  <div className={stepLabel}>02 / Services</div>
                  <fieldset className="space-y-4">
                    <legend className={fieldLabel}>Which service(s) are you interested in? *</legend>
                    <div className="grid grid-cols-2 gap-4">
                      {["Web Apps", "Website", "SEO", "AI Automations"].map((service) => (
                        <label key={service} className={choiceBase}>
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
                    {errors.services && <div className={`text-sm ${ink.faint}`}>{errors.services}</div>}
                  </fieldset>
                </div>

                <div className="space-y-6">
                  <div className={stepLabel}>03 / Project</div>
                  <label className="block">
                    <span className={fieldLabel}>What are you building? *</span>
                    <textarea
                      required
                      name="project"
                      rows={4}
                      onChange={() => clearError("project")}
                      aria-invalid={!!errors.project}
                      className={`${inputBase} resize-none ${errors.project ? "border-white" : "border-white/15"}`}
                    />
                    {errors.project && <div className={`mt-2 text-sm ${ink.faint}`}>{errors.project}</div>}
                  </label>
                  <label className="block">
                    <span className={fieldLabel}>Goal *</span>
                    <textarea
                      required
                      name="goal"
                      rows={3}
                      onChange={() => clearError("goal")}
                      aria-invalid={!!errors.goal}
                      placeholder="What are you trying to achieve?"
                      className={`${inputBase} resize-none ${errors.goal ? "border-white" : "border-white/15"}`}
                    />
                    {errors.goal && <div className={`mt-2 text-sm ${ink.faint}`}>{errors.goal}</div>}
                  </label>
                </div>

                <div className="space-y-6">
                  <div className={stepLabel}>04 / Product context</div>
                  <fieldset className="space-y-4">
                    <legend className={fieldLabel}>Do you have an existing website or product?</legend>
                    <div className="grid grid-cols-2 gap-4">
                      {["yes", "no"].map((option) => (
                        <label key={option} className={`${choiceBase} capitalize`}>
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
                      <span className={fieldLabel}>URL *</span>
                      <input
                        required
                        name="url"
                        type="url"
                        onChange={() => clearError("url")}
                        aria-invalid={!!errors.url}
                        placeholder="https://"
                        className={`${inputBase} ${errors.url ? "border-white" : "border-white/15"}`}
                      />
                      {errors.url && <div className={`mt-2 text-sm ${ink.faint}`}>{errors.url}</div>}
                    </motion.label>
                  )}
                </div>

                <div className="space-y-6">
                  <div className={stepLabel}>05 / Budget</div>
                  <fieldset>
                    <legend className={fieldLabel}>Budget range *</legend>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {["<$2k", "$2k–$5k", "$5k–$10k", "$10k+"].map((budget) => (
                        <label key={budget} className={choiceBase}>
                          <input required type="radio" name="budget" value={budget} onChange={() => clearError("budget")} className="sr-only" />
                          {budget}
                        </label>
                      ))}
                    </div>
                    {errors.budget && <div className={`mt-4 text-sm ${ink.faint}`}>{errors.budget}</div>}
                  </fieldset>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                  <button type="submit" className="border border-white bg-white px-10 py-5 text-sm font-semibold text-black transition-colors duration-200 hover:bg-black hover:text-white">
                    Send inquiry
                  </button>
                  {submitted && (
                    <div className={`text-sm ${ink.supporting}`}>
                      Draft created. Send it from your email client.
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
