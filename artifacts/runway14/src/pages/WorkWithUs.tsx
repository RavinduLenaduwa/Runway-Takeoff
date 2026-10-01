import { useState, type FormEvent } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageBreadcrumb } from "@/components/PageBreadcrumb";
import { useDocumentMeta } from "@/hooks/use-document-meta";
import { pageMeta } from "@/content/site";
import { reveal } from "@/lib/reveal";

const SERVICES = ["Website", "Web Apps", "SEO", "AI Automations"];

export default function WorkWithUs() {
  useDocumentMeta(pageMeta.workWithUs);
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

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const nextErrors: Record<string, string> = {};

    if (!formData.get("name")?.toString().trim()) nextErrors.name = "Tell us your name.";
    if (!formData.get("email")?.toString().trim()) nextErrors.email = "Tell us your email.";
    if (selectedServices.length === 0) nextErrors.services = "Pick at least one service.";
    if (!formData.get("project")?.toString().trim()) nextErrors.project = "Tell us what you're building.";
    if (!formData.get("goal")?.toString().trim()) nextErrors.goal = "Tell us your goal.";
    if (hasExistingProduct === "yes" && !formData.get("url")?.toString().trim()) nextErrors.url = "Add the URL.";
    if (!formData.get("budget")?.toString().trim()) nextErrors.budget = "Tell us a rough budget, in any currency.";

    if (Object.values(nextErrors).some(Boolean)) {
      setErrors(nextErrors);
      const first = Object.keys(nextErrors)[0];
      document.getElementById(`field-${first}`)?.scrollIntoView({ block: "center" });
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

    window.location.href = `mailto:hello@runway14.com?subject=${encodeURIComponent("Project brief for Runway 14")}&body=${encodeURIComponent(details)}`;
    setSubmitted(true);
  }

  const error = (field: string) =>
    errors[field] ? <p id={`${field}-error`} className="err">{errors[field]}</p> : null;
  const describedBy = (field: string) => (errors[field] ? `${field}-error` : undefined);

  return (
    <>
      <Navbar />

      <main className="wrap page">
        <div className="intro">
          <PageBreadcrumb label="Start a project" path="work-with-us" />
          <span className="loc" {...reveal(0)}><b>14</b>Project brief</span>
          <h1 {...reveal(80)}>Start a project</h1>
          <p {...reveal(160)}>
            A few lines on what you need, about ten minutes. You get a written plan and a fixed price, <span className="hl">free</span>, before you commit to anything.
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="brief">
          <div className="group" {...reveal()}>
            <p className="group-label">About you</p>
            <div className="two">
              <label className="field" id="field-name">
                <span className="field-label">Name</span>
                <input
                  className="input"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  onChange={() => clearError("name")}
                  aria-invalid={!!errors.name}
                  aria-describedby={describedBy("name")}
                />
                {error("name")}
              </label>
              <label className="field" id="field-email">
                <span className="field-label">Email</span>
                <input
                  className="input"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  onChange={() => clearError("email")}
                  aria-invalid={!!errors.email}
                  aria-describedby={describedBy("email")}
                />
                {error("email")}
              </label>
            </div>
            <label className="field">
              <span className="field-label">Company or project name <span className="opt">(optional)</span></span>
              <input className="input" name="company" type="text" autoComplete="organization" />
            </label>
          </div>

          <div className="group" {...reveal()}>
            <p className="group-label">What you need</p>
            <fieldset className="field" id="field-services" aria-describedby={describedBy("services")}>
              <legend className="field-label mb-2">Which services? Pick any that apply.</legend>
              <div className="choices">
                {SERVICES.map((service) => (
                  <label key={service} className="choice">
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
              {error("services")}
            </fieldset>
          </div>

          <div className="group" {...reveal()}>
            <p className="group-label">The project</p>
            <label className="field" id="field-project">
              <span className="field-label">What are you building?</span>
              <textarea
                className="input"
                name="project"
                rows={4}
                required
                onChange={() => clearError("project")}
                aria-invalid={!!errors.project}
                aria-describedby={describedBy("project")}
              />
              {error("project")}
            </label>
            <label className="field" id="field-goal">
              <span className="field-label">What should it achieve?</span>
              <textarea
                className="input"
                name="goal"
                rows={3}
                required
                placeholder="More bookings, less manual work, a first version to show investors..."
                onChange={() => clearError("goal")}
                aria-invalid={!!errors.goal}
                aria-describedby={describedBy("goal")}
              />
              {error("goal")}
            </label>
          </div>

          <div className="group" {...reveal()}>
            <p className="group-label">What exists already</p>
            <fieldset className="field">
              <legend className="field-label mb-2">Do you have an existing website or product?</legend>
              <div className="choices">
                {[{ value: "yes", label: "Yes" }, { value: "no", label: "No" }].map((option) => (
                  <label key={option.value} className="choice">
                    <input
                      type="radio"
                      name="existingProduct"
                      value={option.value}
                      checked={hasExistingProduct === option.value}
                      onChange={() => setHasExistingProduct(option.value)}
                      className="sr-only"
                    />
                    {option.label}
                  </label>
                ))}
              </div>
            </fieldset>
            {hasExistingProduct === "yes" && (
              <label className="field" id="field-url">
                <span className="field-label">Where can we see it?</span>
                <input
                  className="input"
                  name="url"
                  type="url"
                  required
                  placeholder="https://"
                  onChange={() => clearError("url")}
                  aria-invalid={!!errors.url}
                  aria-describedby={describedBy("url")}
                />
                {error("url")}
              </label>
            )}
          </div>

          <div className="group" {...reveal()}>
            <p className="group-label">Budget</p>
            <label className="field" id="field-budget">
              <span className="field-label">Roughly what have you set aside? <span className="opt">(any currency)</span></span>
              <input
                className="input"
                name="budget"
                type="text"
                required
                placeholder="For example $5,000 or LKR 1,500,000"
                onChange={() => clearError("budget")}
                aria-invalid={!!errors.budget}
                aria-describedby={describedBy("budget")}
              />
              {error("budget")}
            </label>
          </div>

          <div className="submit-row">
            <button type="submit" className="btn">Send brief <span className="arrow">&rarr;</span></button>
            {submitted && (
              <p className="sent" role="status">
                Your email app should have opened with the brief filled in. Send it from there, or write to hello@runway14.com.
              </p>
            )}
          </div>
        </form>
      </main>

      <Footer />
    </>
  );
}
