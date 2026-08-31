"use client";

import { track } from "@vercel/analytics";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import {
  businessOptions,
  contactMethods,
  getContactMethod,
  getRecommendation,
  getScopeSelection,
  scopeOptions,
  timeOptions,
  validateContact,
} from "@/data/contact";
import { site, whatsappLink } from "@/data/site";

type Brief = {
  business: string;
  timeline: string;
  scope: string;
  name: string;
  method: string;
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
  method: "Email",
  contact: "",
  message: "",
};

const stepTitles = [
  "What kind of business is this for?",
  "When would you like to launch?",
  "What does the website need?",
  "Where should we follow up?",
];

const stepLabels = ["Business", "Timing", "Scope", "Details"];

const controlClass =
  "field-control w-full rounded-xl border-[1.5px] border-paper/20 bg-paper/4 px-4 py-3.5 text-base text-paper outline-none focus:border-accent";

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

function Field({
  label,
  htmlFor,
  hint,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={htmlFor} className="font-mono text-xs tracking-[0.08em] text-paper/55">
        {label}
      </label>
      {children}
      {hint && !error && <p className="m-0 text-xs leading-[1.5] text-paper/55">{hint}</p>}
      {error && (
        <p className="m-0 text-xs leading-[1.5] text-accent" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export function ProjectForm({ initialScope = "" }: { initialScope?: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const headingId = useId();
  const fieldId = useId();
  const [step, setStep] = useState(0);
  const [reached, setReached] = useState(0);
  const [brief, setBrief] = useState<Brief>({ ...emptyBrief, scope: initialScope });
  const [restored, setRestored] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [done, setDone] = useState<false | "submitted" | "whatsapp" | "email">(false);
  const [submitting, setSubmitting] = useState(false);
  const [sendError, setSendError] = useState("");
  const [attempted, setAttempted] = useState(false);
  const [copied, setCopied] = useState(false);

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
        setBrief((current) => ({
          ...current,
          ...parsed.brief,
          scope: initialScope || parsed.brief?.scope || current.scope,
        }));
      }
      if (typeof parsed.step === "number" && parsed.step >= 0 && parsed.step < STEPS) {
        setStep(parsed.step);
        setReached(parsed.step);
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
  const method = getContactMethod(brief.method);
  const selectedScope = getScopeSelection(
    initialScope === "One focused page"
      ? "focused"
      : initialScope === "A multi-page website"
        ? "business"
        : initialScope === "Commerce or custom functionality"
          ? "commerce"
          : undefined,
  );

  const contactError = validateContact(brief.method, brief.contact);
  const nameError = brief.name.trim().length >= 2 ? "" : "Add the name we should use.";
  const stepError = [
    brief.business ? "" : "Pick the closest description of the business.",
    brief.timeline ? "" : "Pick a rough timeline.",
    brief.scope ? "" : "Pick the closest scope, or choose “Help me decide”.",
    nameError || contactError,
  ][step];
  const valid = !stepError;

  const update = (key: keyof Brief, value: string) => {
    setBrief((current) => ({ ...current, [key]: value }));
    setSendError("");
    setAttempted(false);
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
    setReached((current) => Math.max(current, nextStep));
    setAttempted(false);
    scrollToForm();
  };
  const clearStorage = () => {
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // Nothing to clean up if storage was never available.
    }
  };

  const summary = [
    ["TYPE", brief.business],
    ["TIMELINE", brief.timeline],
    ["SCOPE", brief.scope],
  ];

  /**
   * One brief, one wording. Both hand-off channels and the copy button read
   * from here so the studio receives the same fields however it arrives.
   */
  const composeMessage = useMemo(
    () =>
      (channel: "whatsapp" | "email") => {
        const dash = "—";
        const lines = [
          channel === "whatsapp" ? "*New project brief — Vanto*" : "New project brief",
          "",
          `Name: ${brief.name.trim() || dash}`,
          `Preferred contact: ${brief.method}`,
          `${brief.method}: ${brief.contact.trim() || dash}`,
          "",
          `Business type: ${brief.business || dash}`,
          `Timeline: ${brief.timeline || dash}`,
          `Scope needed: ${brief.scope || dash}`,
          `Likely fit: ${recommendation.title}`,
        ];
        if (brief.message.trim()) lines.push("", "Notes:", brief.message.trim());
        lines.push("", `Sent from ${site.url}/contact`);
        return lines.join("\n");
      },
    [brief, recommendation.title],
  );

  // Fire-and-forget: the studio still gets a copy even if the client never
  // presses send in WhatsApp or their mail client.
  const notifyStudio = () => {
    void fetch("/api/inquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...brief, likelyFit: recommendation.title, website: honeypot }),
      keepalive: true,
    }).catch(() => undefined);
  };

  const openWhatsApp = () => {
    track("WhatsApp Handoff", {
      location: "contact form",
      scope: recommendation.title,
    });
    // Opened synchronously inside the click so the popup blocker allows it.
    window.open(whatsappLink(composeMessage("whatsapp")), "_blank", "noopener,noreferrer");
    notifyStudio();
    setDone("whatsapp");
    clearStorage();
    scrollToForm();
  };
  const openEmailApp = () => {
    track("Email Handoff", {
      location: "contact form",
      scope: recommendation.title,
    });
    const subject = encodeURIComponent(`Project brief — ${brief.name.trim() || "new enquiry"}`);
    window.location.assign(`mailto:${site.email}?subject=${subject}&body=${encodeURIComponent(composeMessage("email"))}`);
    notifyStudio();
    setDone("email");
    clearStorage();
  };
  const copyBrief = async () => {
    try {
      await navigator.clipboard.writeText(composeMessage("email"));
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      setSendError("Copying is blocked in this browser. Use WhatsApp or email instead.");
    }
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
      // Never a dead end. mailto: still navigates after an await, unlike
      // window.open, so email is the safe automatic fallback; WhatsApp needs a
      // fresh click and is offered as a button instead.
      if (brief.method === "Email") {
        setSendError("Direct sending is unavailable, so your email app is opening with the brief ready.");
        openEmailApp();
      } else {
        setSendError("Direct sending is unavailable. Send the brief on WhatsApp — it is already written for you.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  // Enter anywhere in the form advances a step, or sends on the last one.
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting) return;
    if (!valid) {
      setAttempted(true);
      return;
    }
    if (step < STEPS - 1) changeStep(step + 1);
    else if (brief.method === "WhatsApp") openWhatsApp();
    else void submitBrief();
  };

  if (done) {
    const first = brief.name.trim().split(" ")[0];
    const heading =
      done === "submitted"
        ? `Thanks, ${first}. We have your brief.`
        : done === "whatsapp"
          ? "Finish sending in WhatsApp."
          : "Finish sending from your email app.";
    return (
      <div className="step-in flex scroll-mt-[110px] flex-col items-start gap-[22px]">
        <span data-check className="font-mono text-xs tracking-[0.12em] text-sage">
          {done === "submitted" ? "( BRIEF RECEIVED )" : "( ONE LAST STEP )"}
        </span>
        <h2 className="m-0 max-w-[14ch] font-serif text-[clamp(34px,5vw,68px)] leading-none tracking-[-0.03em]">
          {heading}
        </h2>
        <p className="m-0 max-w-[46ch] text-[clamp(16px,1.5vw,19px)] leading-[1.6] text-paper/75">
          {done === "submitted"
            ? `Every answer you gave was delivered with it. We reply on ${brief.method} within two business days, usually with a question or a clear next step.`
            : "Your full brief is written and waiting — it is not sent until you press send. We reply within two business days."}
        </p>
        <div className="mt-2 flex flex-wrap gap-3">
          {done === "whatsapp" && (
            <button type="button" data-cursor="Send" onClick={openWhatsApp} className="rounded-[10px] bg-accent-fill px-7 py-[13px] text-[15px] font-semibold text-ink">
              Reopen WhatsApp
            </button>
          )}
          {done === "email" && (
            <button type="button" data-cursor="Send" onClick={openEmailApp} className="rounded-[10px] bg-accent-fill px-7 py-[13px] text-[15px] font-semibold text-ink">
              Reopen email app
            </button>
          )}
          <button type="button" data-cursor="Copy" onClick={copyBrief} className="rounded-[10px] border-[1.5px] border-paper/30 px-7 py-[13px] text-[15px] font-semibold hover:border-paper">
            {copied ? "Copied" : "Copy the brief"}
          </button>
          <button
            type="button"
            data-cursor="Edit"
            onClick={() => {
              setDone(false);
              setStep(STEPS - 1);
              scrollToForm();
            }}
            className="rounded-[10px] border-[1.5px] border-paper/30 px-7 py-[13px] text-[15px] font-semibold hover:border-paper"
          >
            Edit the brief
          </button>
        </div>
        <p aria-live="polite" className="sr-only">{copied ? "Brief copied to the clipboard." : ""}</p>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      aria-labelledby={headingId}
      data-analytics-form="Project brief"
      data-analytics-location="contact page"
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
            onClick={() => {
              setBrief({ ...emptyBrief, scope: initialScope });
              setStep(0);
              setReached(0);
              setRestored(false);
              clearStorage();
            }}
            className="border-b border-paper/40 pb-0.5 font-medium text-paper/85"
          >
            Start over
          </button>
        </div>
      )}
      <div className="mb-[clamp(28px,4vw,44px)] flex items-center justify-between gap-4 font-mono text-xs tracking-[0.08em] text-paper/50">
        <span>( PROJECT BRIEF )</span>
        <span className="text-right">
          STEP {step + 1} / {STEPS}
        </span>
      </div>
      {/* Segmented rather than a single bar: each completed step is a button,
          so changing an earlier answer is one click instead of four Backs. */}
      <div
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={STEPS}
        aria-valuenow={step + 1}
        aria-valuetext={`Step ${step + 1} of ${STEPS}: ${stepTitles[step]}`}
        className="mb-[clamp(20px,4vw,52px)] grid grid-cols-4 gap-1.5"
      >
        {stepLabels.map((label, index) => {
          const reachable = index <= reached;
          return (
            <button
              key={label}
              type="button"
              disabled={!reachable}
              aria-current={index === step ? "step" : undefined}
              onClick={() => reachable && changeStep(index)}
              className="group flex flex-col gap-2 border-0 bg-transparent p-0 pb-5 text-left disabled:cursor-default"
            >
              <span
                className={`h-[3px] w-full rounded-full transition-colors duration-300 ${
                  index <= step ? "bg-accent-fill" : reachable ? "bg-paper/30" : "bg-paper/12"
                }`}
              />
              <span
                className={`font-mono text-[10px] tracking-[0.08em] transition-colors ${
                  index === step ? "text-paper/85" : reachable ? "text-paper/55 group-hover:text-paper/85" : "text-paper/35"
                }`}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Announces the step change to screen readers, which a visual-only swap would not. */}
      <p aria-live="polite" className="sr-only">
        Step {step + 1} of {STEPS}: {stepTitles[step]}
      </p>

      <div key={step} className="step-in">
        <h2
          id={headingId}
          className={`m-0 font-serif leading-[1.02] tracking-[-0.03em] ${step === 3 ? "text-[clamp(30px,4.4vw,54px)]" : "text-[clamp(32px,4.8vw,62px)]"}`}
        >
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
              <Field label="YOUR NAME" htmlFor={`${fieldId}-name`} error={attempted ? nameError : ""}>
                <input
                  id={`${fieldId}-name`}
                  type="text"
                  name="name"
                  autoComplete="name"
                  value={brief.name}
                  onChange={(event) => update("name", event.target.value)}
                  placeholder="Jane Wanjiru"
                  className={controlClass}
                />
              </Field>
              {/* Asking for the channel first lets the field below use the
                  right keyboard, autofill token, and validation — one guess
                  fewer than a combined "email or phone" box. */}
              <Field label="HOW SHOULD WE REPLY?" htmlFor={`${fieldId}-method`}>
                <select
                  id={`${fieldId}-method`}
                  name="method"
                  value={brief.method}
                  onChange={(event) => update("method", event.target.value)}
                  className={controlClass}
                >
                  {contactMethods.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </Field>
              <Field
                label={method.field.toUpperCase()}
                htmlFor={`${fieldId}-contact`}
                error={attempted ? contactError : ""}
              >
                <input
                  id={`${fieldId}-contact`}
                  type={brief.method === "WhatsApp" ? "tel" : "email"}
                  name="contact"
                  inputMode={method.inputMode}
                  autoComplete={method.autoComplete}
                  value={brief.contact}
                  onChange={(event) => update("contact", event.target.value)}
                  placeholder={method.placeholder}
                  className={controlClass}
                />
              </Field>
              <Field label="ANYTHING ELSE? (OPTIONAL)" htmlFor={`${fieldId}-message`}>
                <textarea
                  id={`${fieldId}-message`}
                  rows={3}
                  name="message"
                  autoComplete="off"
                  value={brief.message}
                  onChange={(event) => update("message", event.target.value)}
                  placeholder="A link, a deadline, a rough idea…"
                  className={controlClass}
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
                  <span className="font-mono text-[11px] tracking-[0.06em] text-paper/50">{key}</span>
                  <span className="text-right text-sm font-medium">{value || "—"}</span>
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
        <button
          type="button"
          data-cursor="Back"
          disabled={step === 0}
          onClick={() => changeStep(Math.max(0, step - 1))}
          className="-my-2.5 border-0 bg-transparent py-2.5 text-[15px] font-medium text-paper/60 disabled:opacity-0"
        >
          ← Back
        </button>
        {step < STEPS - 1 ? (
          // Enabled even when incomplete: a disabled button gives no reason,
          // so pressing it explains what is missing instead of doing nothing.
          <button
            type="submit"
            data-magnetic
            data-cursor="Next"
            aria-describedby={attempted && stepError ? `${fieldId}-stepError` : undefined}
            className={`rounded-[10px] bg-accent-fill px-8 py-[15px] text-base font-semibold text-ink transition-transform duration-300 ${valid ? "" : "opacity-45"}`}
          >
            Continue
          </button>
        ) : (
          <div className="flex flex-wrap gap-2.5">
            <button
              type="submit"
              data-magnetic
              data-cursor="Send"
              disabled={submitting}
              className={`rounded-[10px] bg-accent-fill px-[26px] py-[15px] text-base font-semibold text-ink disabled:opacity-55 max-sm:w-full ${valid ? "" : "opacity-45"}`}
            >
              {submitting ? "Sending…" : brief.method === "WhatsApp" ? "Send brief on WhatsApp" : "Send project brief"}
            </button>
            <button
              type="button"
              data-cursor="Send"
              onClick={() => {
                if (!valid) {
                  setAttempted(true);
                  return;
                }
                if (brief.method === "WhatsApp") openEmailApp();
                else openWhatsApp();
              }}
              className="rounded-[10px] border border-sage bg-sage/8 px-[26px] py-[15px] text-base font-semibold text-sage max-sm:w-full"
            >
              {brief.method === "WhatsApp" ? "Send by email instead" : "Send on WhatsApp instead"}
            </button>
          </div>
        )}
      </div>
      {/* Choice steps have nowhere else to put the reason. The details step
          already shows the message under the offending field, so repeating it
          here would announce the same problem twice. */}
      {attempted && stepError && step < STEPS - 1 && (
        <p id={`${fieldId}-stepError`} role="alert" className="mt-4 text-sm text-accent">
          {stepError}
        </p>
      )}
      <p aria-live="polite" className="sr-only">{submitting ? "Sending your brief." : ""}</p>
      {step === STEPS - 1 && (
        <div className="mt-5 max-w-[62ch] text-xs leading-[1.6] text-paper/45">
          <p>
            Every answer you have given travels with the brief — business type, timing, scope, and your notes — whichever way you
            send it. It is used only to reply to this enquiry.
          </p>
          {sendError && (
            <div role="alert" className="mt-4 rounded-xl border border-accent/35 bg-accent-fill/8 p-4 text-paper/78">
              <p className="m-0">{sendError}</p>
              <div className="mt-3 flex flex-wrap gap-4">
                <button type="button" onClick={openWhatsApp} className="border-b border-accent pb-0.5 font-semibold text-accent">
                  Open WhatsApp
                </button>
                <button type="button" onClick={openEmailApp} className="border-b border-accent pb-0.5 font-semibold text-accent">
                  Open your email app
                </button>
                <button type="button" onClick={copyBrief} className="border-b border-accent pb-0.5 font-semibold text-accent">
                  {copied ? "Copied" : "Copy the brief"}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </form>
  );
}
