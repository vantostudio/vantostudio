import Link from "next/link";
import { Tag } from "@/components/ui/Tag";
import { plans } from "@/data/services";

export function PricingCards() {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(min(260px,100%),1fr))] gap-[clamp(16px,2vw,24px)]">
      {plans.map((plan) => (
        <article
          data-fade
          key={plan.name}
          className={`flex flex-col gap-4 rounded-[22px] border p-[clamp(24px,2.8vw,36px)] ${
            plan.dark
              ? "border-paper/12 bg-ink-soft text-paper"
              : plan.featured
                ? "border-accent bg-paper-card text-ink"
                : "border-paper-line bg-paper-card text-ink"
          }`}
        >
          <div className="flex items-center justify-between gap-2.5">
            <h3 className="m-0 text-[15px] font-semibold">{plan.name}</h3>
            {plan.badge && (
              <Tag tone="solidSage">{plan.badge}</Tag>
            )}
          </div>
          <div className="font-serif text-[clamp(24px,2.4vw,32px)] leading-[1.05]">{plan.price}</div>
          <p className={`m-0 text-[13px] leading-[1.5] ${plan.dark ? "text-paper/55" : "text-[#6f675a]"}`}>{plan.who}</p>
          <ul className="mt-1 flex list-none flex-col gap-[9px] p-0 text-[13px]">
            {plan.features.map((feature) => (
              <li key={feature} className="flex gap-[9px]">
                <span className={plan.dark ? "text-sage" : "text-accent"}>—</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          <Link
            href={`/contact?scope=${plan.scope}`}
            data-cursor="Start"
            className={`mt-auto rounded-[10px] border-[1.5px] p-3 text-center text-sm font-semibold ${
              plan.dark
                ? "border-sage bg-sage text-ink"
                : plan.featured
                  ? "border-ink bg-ink text-paper"
                  : "border-ink bg-transparent text-ink"
            }`}
          >
            Discuss this scope
          </Link>
        </article>
      ))}
    </div>
  );
}
