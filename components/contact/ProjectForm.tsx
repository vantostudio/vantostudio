"use client";

import { cloneElement, useRef, useState, type ReactElement } from "react";
import {
  businessOptions,
  getRecommendation,
  getScopeSelection,
  scopeOptions,
  timeOptions,
} from "@/data/contact";

type Brief = {
  business: string;
  timeline: string;
  scope: string;
  name: string;
  contact: string;
  message: string;
};

function Options({ options, value, onChange }: { options: readonly string[]; value: string; onChange: (value: string) => void }) {
  return (
    <div className="flex flex-wrap gap-3">
      {options.map((option) => (
        <button
          type="button"
          data-cursor="Pick"
          key={option}
          onClick={() => onChange(option)}
          className={`rounded-full border-[1.5px] px-[26px] py-[15px] text-[clamp(15px,1.5vw,18px)] font-medium transition ${
            value === option ? "border-paper bg-paper text-ink" : "border-paper/22 bg-transparent text-paper/85"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export function ProjectForm({ initialScope = "" }: { initialScope?: string }) {
  const formRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const [brief, setBrief] = useState<Brief>({
    business: "",
    timeline: "",
    scope: initialScope,
    name: "",
    contact: "",
    message: "",
  });
  const [honeypot, setHoneypot] = useState("");
  const [done, setDone] = useState<false | "submitted" | "whatsapp">(false);
  const [submitting, setSubmitting] = useState(false);
  const [sendError, setSendError] = useState("");
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
  const valid = [brief.business, brief.timeline, brief.scope, brief.name && brief.contact][step];
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
    const text = encodeURIComponent(composeMessage());
    window.open(`https://wa.me/254708184850?text=${text}`, "_blank", "noopener,noreferrer");
    setDone("whatsapp");
    scrollToForm();
  };
  const openEmailApp = () => {
    const text = encodeURIComponent(composeMessage());
    window.location.href = `mailto:justmogen@gmail.com?subject=${encodeURIComponent(`Project inquiry — ${brief.name}`)}&body=${text}`;
  };
  const submitBrief = async () => {
    setSubmitting(true);
    setSendError("");
    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...brief,
          likelyFit: recommendation.title,
          website: honeypot,
        }),
      });
      if (!response.ok) throw new Error("Delivery failed");
      setDone("submitted");
      scrollToForm();
    } catch {
      setSendError("The form could not send just now. Continue on WhatsApp or open your email app instead.");
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    const submitted = done === "submitted";
    return (
      <div ref={formRef} className="step-in flex scroll-mt-[110px] flex-col items-start gap-[22px]">
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
            <button type="button" data-cursor="Send" onClick={openWhatsApp} className="rounded-full bg-accent px-7 py-[13px] text-[15px] font-semibold text-ink">
              Reopen WhatsApp
            </button>
          )}
          <button type="button" data-cursor="Edit" onClick={() => { setDone(false); scrollToForm(); }} className="rounded-full border-[1.5px] border-paper/30 px-7 py-[13px] text-[15px] font-semibold hover:border-paper">
            Edit the brief
          </button>
        </div>
      </div>
    );
  }

  return (
    <div ref={formRef} className="scroll-mt-[110px]">
      {selectedScope && (
        <div className="mb-6 flex flex-wrap items-center gap-2 rounded-xl border border-sage/25 bg-sage/8 px-4 py-3 text-sm text-paper/72">
          <span className="font-mono text-[10px] tracking-[0.1em] text-sage">SELECTED STARTING POINT</span>
          <span>{selectedScope.title}</span>
        </div>
      )}
      <div className="mb-[clamp(28px,4vw,44px)] flex items-center justify-between gap-4 font-mono text-xs tracking-[0.08em] text-paper/50">
        <span>( PROJECT BRIEF )</span>
        <span className="text-right">
          STEP {step + 1} / 4
        </span>
      </div>
      <div className="mb-[clamp(40px,6vw,72px)] h-[3px] overflow-hidden rounded-full bg-paper/12">
        <div className="h-full rounded-full bg-accent transition-[width] duration-500" style={{ width: `${((step + (valid ? 1 : 0)) / 4) * 100}%` }} />
      </div>
      <div key={step} className="step-in">
        {step === 0 && (
          <div className="flex flex-col gap-[clamp(24px,3vw,36px)]">
            <h2 className="m-0 font-serif text-[clamp(32px,4.8vw,62px)] leading-[1.02] tracking-[-0.03em]">What kind of business is this for?</h2>
            <Options options={businessOptions} value={brief.business} onChange={(value) => update("business", value)} />
          </div>
        )}
        {step === 1 && (
          <div className="flex flex-col gap-[clamp(24px,3vw,36px)]">
            <h2 className="m-0 font-serif text-[clamp(32px,4.8vw,62px)] leading-[1.02] tracking-[-0.03em]">When would you like to launch?</h2>
            <Options options={timeOptions} value={brief.timeline} onChange={(value) => update("timeline", value)} />
          </div>
        )}
        {step === 2 && (
          <div className="flex flex-col gap-[clamp(24px,3vw,36px)]">
            <h2 className="m-0 font-serif text-[clamp(32px,4.8vw,62px)] leading-[1.02] tracking-[-0.03em]">What does the website need?</h2>
            <p className="m-0 max-w-[46ch] text-[15px] text-paper/60">Choose the closest option. The exact scope is confirmed after we talk.</p>
            <Options options={scopeOptions} value={brief.scope} onChange={(value) => update("scope", value)} />
          </div>
        )}
        {step === 3 && (
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(280px,100%),1fr))] items-start gap-[clamp(28px,4vw,56px)]">
            <div className="flex flex-col gap-[22px]">
              <h2 className="m-0 font-serif text-[clamp(30px,4.4vw,54px)] leading-[1.02] tracking-[-0.03em]">Where should I follow up?</h2>
              <Field label="YOUR NAME"><input value={brief.name} onChange={(event) => update("name", event.target.value)} placeholder="Jane Wanjiru" /></Field>
              <Field label="EMAIL OR WHATSAPP"><input value={brief.contact} onChange={(event) => update("contact", event.target.value)} placeholder="you@example.com" /></Field>
              <Field label="ANYTHING ELSE? (OPTIONAL)"><textarea rows={3} value={brief.message} onChange={(event) => update("message", event.target.value)} placeholder="A link, a deadline, a rough idea…" /></Field>
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
        {step < 3 ? (
          <button type="button" data-magnetic data-cursor="Next" disabled={!valid} onClick={() => changeStep(step + 1)} className="rounded-full bg-accent px-8 py-[15px] text-base font-semibold text-ink transition-transform duration-300 disabled:pointer-events-none disabled:opacity-35">Continue</button>
        ) : (
          <div className={`flex flex-wrap gap-2.5 ${valid ? "" : "pointer-events-none opacity-35"}`}>
            <button type="button" data-magnetic data-cursor="Send" disabled={submitting} onClick={submitBrief} className="rounded-full bg-accent px-[26px] py-[15px] text-base font-semibold text-ink disabled:opacity-55 max-sm:w-full">
              {submitting ? "Sending…" : "Send project brief"}
            </button>
            <button type="button" data-cursor="Send" onClick={openWhatsApp} className="rounded-full border border-sage bg-sage/8 px-[26px] py-[15px] text-base font-semibold text-sage max-sm:w-full">
              Continue on WhatsApp
            </button>
          </div>
        )}
      </div>
      {step === 3 && (
        <div className="mt-5 max-w-[62ch] text-xs leading-[1.6] text-paper/45">
          <p>Your brief is used only to respond to this enquiry. WhatsApp opens with the same project summary ready for you to review.</p>
          {sendError && (
            <div role="alert" className="mt-4 rounded-xl border border-accent/35 bg-accent/8 p-4 text-paper/78">
              <p className="m-0">{sendError}</p>
              <button type="button" onClick={openEmailApp} className="mt-2 border-b border-accent pb-0.5 font-semibold text-accent">
                Open your email app
              </button>
            </div>
          )}
        </div>
      )}
    </div>
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
