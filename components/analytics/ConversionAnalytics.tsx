"use client";

import { track } from "@vercel/analytics";
import { useEffect } from "react";

const startedForms = new WeakSet<HTMLFormElement>();

function compactProperties(properties: Record<string, string | undefined>) {
  return Object.fromEntries(
    Object.entries(properties).filter((entry): entry is [string, string] => Boolean(entry[1])),
  );
}

/**
 * Keeps conversion tracking declarative so server-rendered links only need
 * data attributes. No contact details or form answers are ever collected.
 */
export function ConversionAnalytics() {
  useEffect(() => {
    const trackClick = (event: MouseEvent) => {
      const element = (event.target as Element | null)?.closest<HTMLElement>("[data-analytics-event]");
      if (!element) return;

      const name = element.dataset.analyticsEvent;
      if (!name) return;

      track(
        name,
        compactProperties({
          location: element.dataset.analyticsLocation,
          label: element.dataset.analyticsLabel,
          project: element.dataset.analyticsProject,
          destination: element.dataset.analyticsDestination,
        }),
      );
    };

    const trackFormStart = (event: Event) => {
      const form = (event.target as Element | null)?.closest<HTMLFormElement>("form[data-analytics-form]");
      if (!form || startedForms.has(form)) return;

      startedForms.add(form);
      track("Enquiry Form Started", {
        form: form.dataset.analyticsForm || "Project brief",
        location: form.dataset.analyticsLocation || "contact",
      });
    };

    document.addEventListener("click", trackClick);
    document.addEventListener("focusin", trackFormStart);
    document.addEventListener("change", trackFormStart);

    return () => {
      document.removeEventListener("click", trackClick);
      document.removeEventListener("focusin", trackFormStart);
      document.removeEventListener("change", trackFormStart);
    };
  }, []);

  return null;
}
