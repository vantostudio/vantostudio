"use client";

import { cloneElement, useEffect, useId, useRef, useState, type ReactElement } from "react";
import {
  businessOptions,
  getRecommendation,
  getScopeSelection,
  scopeOptions,
  timeOptions,
} from "@/data/contact";
import { site, whatsappLink } from "@/data/site";

type Brief = {
  business: string;
  timeline: string;
  scope: string;
  name: string;
  contact: string;
  message: string;
};

const STEPS = 4;
const STORAGE_KEY = "vanto:brief";

const emptyBrief: Brief = {
  business: "",
  timeline: "",
  scope: "",
  name: "",
  contact: "",
  message: "",
};

const stepTitles = [
  "What kind of business is this for?",
  "When would you like to launch?",
  "What does the website need?",
  "Where should I follow up?",
];

/**
 * Native radios rather than buttons: a real radiogroup gives arrow-key
 * navigation, single-choice semantics, and required validation for free.
 * The input stays focusable (sr-only, not hidden) so focus rings still land.
 */
function Options({
  name,
  legend,
  options,
  value,
  onChange,
}: {
  name: string;
  legend: string;
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <fieldset className="m-0 border-0 p-0">
      <legend className="sr-only">{legend}</legend>
      <div className="flex flex-wrap gap-3">
        {options.map((option) => {
          const active = value === option;
          return (
            <label
              key={option}
              data-cursor="Pick"
              className={`cursor-pointer rounded-[10px] border-[1.5px] px-[26px] py-[15px] text-[clamp(15px,1.5vw,18px)] font-medium transition has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-4 has-[:focus-visible]:outline-sage ${
                active ? "border-paper bg-paper text-ink" : "border-paper/22 bg-transparent text-paper/85"
              }`}
            >
              <input
                type="radio"
                name={name}
                value={option}
                checked={active}
                required
                onChange={() => onChange(option)}
                className="sr-only"
              />
              {option}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

export function ProjectForm({ initialScope = "" }: { initialScope?: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const headingId = useId();
  const [step, setStep] = useState(0);
  const [brief, setBrief] = useState<Brief>({ ...emptyBrief, scope: initialScope });
  const [restored, setRestored] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [done, setDone] = useState<false | "submitted" | "whatsapp">(false);
  const [submitting, setSubmitting] = useState(false);
  const [sendError, setSendError] = useState("");

  // Restore an in-progress brief. This has to run after mount rather than in a
  // lazy initialiser: reading storage during render would make the client's
  // first paint disagree with the server's and break hydration — which is
  // precisely the case set-state-in-effect exists to allow.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (!saved) return;
      const parsed = JSON.parse(saved) as { brief?: Partial<Brief>; step?: number };
      if (parsed.brief) {
        setBrief((current) => ({ ...current, ...parsed.brief, scope: initialScope || parsed.brief?.scope || current.scope }));
      }
      if (typeof parsed.step === "number" && parsed.step >= 0 && parsed.step < STEPS) {
        setStep(parsed.step);
        setRestored(true);
      }
    } catch {
      // Private mode or corrupt payload — start clean rather than fail.
    }
  }, [initialScope]);
  /* eslint-enable react-hooks/set-state-in-effect */

  // Persist on every change so a refresh mid-brief costs nothing.
  useEffect(() => {
    if (done) return;
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ brief, step }));
    } catch {
      // Storage unavailable — persistence is a convenience, not a requirement.
    }
  }, [brief, step, done]);

  const recommendation = getRecommendation(brief.scope);
  const selectedScope = getScopeSelection(
    initialScope === "One focused page"
      ? "focused"
      : initialScope === "A multi-page website"
        ? "business"
        : initialScope === "Commerce or custom functionality"
          ? "commerce"
          : undefined,
  );
  const valid = Boolean([brief.business, brief.timeline, brief.scope, brief.name && brief.contact][step]);
  const update = (key: keyof Brief, value: string) => {
    setBrief((current) => ({ ...current, [key]: value }));
    setSendError("");
  };
  const scrollToForm = () =>
    requestAnimationFrame(() =>
      formRef.current?.scrollIntoView({
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        block: "start",
      }),
    );
  const changeStep = (nextStep: number) => {
    setStep(nextStep);
    scrollToForm();
  };
  const clearStorage = () => {
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // Nothing to clean up if storage was never available.
    }
  };
  const summary = [["TYPE", brief.business], ["TIMELINE", brief.timeline], ["SCOPE", brief.scope]];
  const composeMessage = () =>
    [
      "Hi Vanto, I’d like to discuss a website project.",
      "",
      `Name: ${brief.name || "—"}`,
      `Contact: ${brief.contact || "—"}`,
      `Type: ${brief.business || "—"}`,
      `Timeline: ${brief.timeline || "—"}`,
      `Scope: ${brief.scope || "—"}`,
      `Likely fit: ${recommendation.title}`,
      brief.message ? `\nNotes: ${brief.message}` : "",
    ].join("\n");
  const openWhatsApp = () => {
    window.open(whatsappLink(composeMessage()), "_blank", "noopener,noreferrer");
    setDone("whatsapp");
    clearStorage();
    scrollToForm();
  };
  const openEmailApp = () => {
    const text = encodeURIComponent(composeMessage());
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(`Project inquiry — ${brief.name}`)}&body=${text}`;
  };
  const submitBrief = async () => {
    setSubmitting(true);
    setSendError("");
    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...brief, likelyFit: recommendation.title, website: honeypot }),
      });
      if (!response.ok) throw new Error("Delivery failed");
      setDone("submitted");
      clearStorage();
      scrollToForm();
    } catch {
      setSendError("The form could not send just now. Continue on WhatsApp or open your email app instead.");
    } finally {
      setSubmitting(false);
    }
  };

  // Enter anywhere in the form advances a step, or sends on the last one.
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!valid || submitting) return;
    if (step < STEPS - 1) changeStep(step + 1);
    else void submitBrief();
  };

  if (done) {
    const submitted = done === "submitted";
    return (
      <div className="step-in flex scroll-mt-[110px] flex-col items-start gap-[22px]">
        <span data-check className="font-mono text-xs tracking-[0.12em] text-sage">
          {submitted ? "( BRIEF RECEIVED )" : "( ONE LAST STEP )"}
        </span>
        <h2 className="m-0 max-w-[14ch] font-serif text-[clamp(34px,5vw,68px)] leading-none tracking-[-0.03em]">
          {submitted ? `Thanks, ${brief.name.split(" ")[0]}. I have your brief.` : "Finish sending in WhatsApp."}
        </h2>
        <p className="m-0 max-w-[46ch] text-[clamp(16px,1.5vw,19px)] leading-[1.6] text-paper/75">
          {submitted
            ? "Your selected scope and project details were delivered securely. I usually reply within two business days with questions or a clear next step."
            : "Your project summary has been prepared, but it is not sent until you press Send in WhatsApp. I usually reply within two business days."}
        </p>
        <div className="mt-2 flex flex-wrap gap-3">
          {!submitted && (
            <button type="button" data-cursor="Send" onClick={openWhatsApp} className="rounded-[10px] bg-accent-fill px-7 py-[13px] text-[15px] font-semibold text-ink">
              Reopen WhatsApp
            </button>
          )}
          <button type="button" data-cursor="Edit" onClick={() => { setDone(false); scrollToForm(); }} className="rounded-[10px] border-[1.5px] border-paper/30 px-7 py-[13px] text-[15px] font-semibold hover:border-paper">
            Edit the brief
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      aria-labelledby={headingId}
      className="scroll-mt-[110px]"
    >
      {selectedScope && (
        <div className="mb-6 flex flex-wrap items-center gap-2 rounded-xl border border-sage/25 bg-sage/8 px-4 py-3 text-sm text-paper/72">
          <span className="font-mono text-[10px] tracking-[0.1em] text-sage">SELECTED STARTING POINT</span>
          <span>{selectedScope.title}</span>
        </div>
      )}
      {restored && (
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-paper/14 bg-paper/4 px-4 py-3 text-sm text-paper/70">
          <span>Picked up where you left off.</span>
          <button
            type="button"
            onClick={() => { setBrief({ ...emptyBrief, scope: initialScope }); setStep(0); setRestored(false); clearStorage(); }}
            className="border-b border-paper/40 pb-0.5 font-medium text-paper/85"
          >
            Start over
          </button>
        </div>
      )}
      <div className="mb-[clamp(28px,4vw,44px)] flex items-center justify-between gap-4 font-mono text-xs tracking-[0.08em] text-paper/50">
        <span>( PROJECT BRIEF )</span>
        <span className="text-right">STEP {step + 1} / {STEPS}</span>
      </div>
      <div
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={STEPS}
        aria-valuenow={step + 1}
        aria-valuetext={`Step ${step + 1} of ${STEPS}: ${stepTitles[step]}`}
        className="mb-[clamp(40px,6vw,72px)] h-[3px] overflow-hidden rounded-full bg-paper/12"
      >
        <div className="h-full rounded-full bg-accent-fill transition-[width] duration-500" style={{ width: `${((step + (valid ? 1 : 0)) / STEPS) * 100}%` }} />
      </div>

      {/* Announces the step change to screen readers, which a visual-only swap would not. */}
      <p aria-live="polite" className="sr-only">
        Step {step + 1} of {STEPS}: {stepTitles[step]}
      </p>

      <div key={step} className="step-in">
        <h2 id={headingId} className={`m-0 font-serif leading-[1.02] tracking-[-0.03em] ${step === 3 ? "text-[clamp(30px,4.4vw,54px)]" : "text-[clamp(32px,4.8vw,62px)]"}`}>
          {stepTitles[step]}
        </h2>
        {step === 0 && (
          <div className="mt-[clamp(24px,3vw,36px)]">
            <Options name="business" legend={stepTitles[0]} options={businessOptions} value={brief.business} onChange={(value) => update("business", value)} />
          </div>
        )}
        {step === 1 && (
          <div className="mt-[clamp(24px,3vw,36px)]">
            <Options name="timeline" legend={stepTitles[1]} options={timeOptions} value={brief.timeline} onChange={(value) => update("timeline", value)} />
          </div>
        )}
        {step === 2 && (
          <div className="mt-[clamp(24px,3vw,36px)] flex flex-col gap-[clamp(24px,3vw,36px)]">
            <p className="m-0 max-w-[46ch] text-[15px] text-paper/60">Choose the closest option. The exact scope is confirmed after we talk.</p>
            <Options name="scope" legend={stepTitles[2]} options={scopeOptions} value={brief.scope} onChange={(value) => update("scope", value)} />
          </div>
        )}
        {step === 3 && (
          <div className="mt-[clamp(24px,3vw,36px)] grid grid-cols-[repeat(auto-fit,minmax(min(280px,100%),1fr))] items-start gap-[clamp(28px,4vw,56px)]">
            <div className="flex flex-col gap-[22px]">
              <Field label="YOUR NAME">
                <input
                  type="text"
                  name="name"
                  autoComplete="name"
                  required
                  value={brief.name}
                  onChange={(event) => update("name", event.target.value)}
                  placeholder="Jane Wanjiru"
                />
              </Field>
              {/* Accepts an email or a phone number, so it stays type="text";
                  inputMode still gets the right mobile keyboard. */}
              <Field label="EMAIL OR WHATSAPP">
                <input
                  type="text"
                  name="contact"
                  inputMode="email"
                  autoComplete="email"
                  required
                  minLength={5}
                  value={brief.contact}
                  onChange={(event) => update("contact", event.target.value)}
                  placeholder="you@example.com"
                />
              </Field>
              <Field label="ANYTHING ELSE? (OPTIONAL)">
                <textarea
                  rows={3}
                  name="message"
                  autoComplete="off"
                  value={brief.message}
                  onChange={(event) => update("message", event.target.value)}
                  placeholder="A link, a deadline, a rough idea…"
                />
              </Field>
              <input
                aria-hidden="true"
                autoComplete="off"
                className="absolute -left-[9999px]"
                tabIndex={-1}
                name="website"
                value={honeypot}
                onChange={(event) => setHoneypot(event.target.value)}
              />
            </div>
            <aside className="flex flex-col gap-[18px] rounded-[20px] border border-paper/12 bg-paper/4 p-[clamp(22px,3vw,30px)] lg:sticky lg:top-[100px]">
              <span className="font-mono text-[11px] tracking-[0.12em] text-accent">( YOUR SUMMARY )</span>
              {summary.map(([key, value]) => (
                <div key={key} className="flex justify-between gap-3 border-b border-paper/10 pb-3">
                  <span className="font-mono text-[11px] tracking-[0.06em] text-paper/50">{key}</span><span className="text-right text-sm font-medium">{value || "—"}</span>
                </div>
              ))}
              <div>
                <span className="font-mono text-[11px] tracking-[0.1em] text-paper/50">LIKELY FIT</span>
                <p className="mt-2 font-serif text-[clamp(22px,2.4vw,30px)] leading-[1.1] text-accent">{recommendation.title}</p>
                <p className="mt-2 text-xs leading-[1.55] text-paper/52">{recommendation.note}</p>
              </div>
            </aside>
          </div>
        )}
      </div>
      <div className="mt-[clamp(40px,6vw,72px)] flex flex-wrap items-center justify-between gap-4">
        <button type="button" data-cursor="Back" disabled={step === 0} onClick={() => changeStep(Math.max(0, step - 1))} className="border-0 bg-transparent text-[15px] font-medium text-paper/60 disabled:opacity-0">← Back</button>
        {step < STEPS - 1 ? (
          <button type="submit" data-magnetic data-cursor="Next" disabled={!valid} className="rounded-[10px] bg-accent-fill px-8 py-[15px] text-base font-semibold text-ink transition-transform duration-300 disabled:pointer-events-none disabled:opacity-35">Continue</button>
        ) : (
          <div className={`flex flex-wrap gap-2.5 ${valid ? "" : "pointer-events-none opacity-35"}`}>
            <button type="submit" data-magnetic data-cursor="Send" disabled={submitting || !valid} className="rounded-[10px] bg-accent-fill px-[26px] py-[15px] text-base font-semibold text-ink disabled:opacity-55 max-sm:w-full">
              {submitting ? "Sending…" : "Send project brief"}
            </button>
            <button type="button" data-cursor="Send" onClick={openWhatsApp} className="rounded-[10px] border border-sage bg-sage/8 px-[26px] py-[15px] text-base font-semibold text-sage max-sm:w-full">
              Continue on WhatsApp
            </button>
          </div>
        )}
      </div>
      <p aria-live="polite" className="sr-only">{submitting ? "Sending your brief." : ""}</p>
      {step === STEPS - 1 && (
        <div className="mt-5 max-w-[62ch] text-xs leading-[1.6] text-paper/45">
          <p>Your brief is used only to respond to this enquiry. WhatsApp opens with the same project summary ready for you to review.</p>
          {sendError && (
            <div role="alert" className="mt-4 rounded-xl border border-accent/35 bg-accent-fill/8 p-4 text-paper/78">
              <p className="m-0">{sendError}</p>
              <button type="button" onClick={openEmailApp} className="mt-2 border-b border-accent pb-0.5 font-semibold text-accent">
                Open your email app
              </button>
            </div>
          )}
        </div>
      )}
    </form>
  );
}

function Field({ label, children }: { label: string; children: ReactElement<{ className?: string }> }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="font-mono text-xs tracking-[0.08em] text-paper/55">{label}</span>
      {cloneElement(children, {
        className: "rounded-xl border-[1.5px] border-paper/20 bg-paper/4 px-4 py-3.5 text-base text-paper outline-none placeholder:text-paper/35 focus:border-accent",
      })}
    </label>
  );
}
