export function ProcessVisual({ step }: { step: string }) {
  if (step === "btb-wireframe") {
    return (
      <div className="grid size-full grid-cols-[.34fr_1fr] gap-3 bg-paper-line p-[12%]">
        <div className="rounded-lg border border-ink/18 bg-paper/45" />
        <div className="flex flex-col gap-3">
          <span className="h-[18%] rounded-md border border-ink/18 bg-paper/55" />
          <span className="h-[42%] rounded-md border border-ink/18 bg-paper/40" />
          <div className="grid flex-1 grid-cols-2 gap-3"><span className="rounded-md border border-ink/18" /><span className="rounded-md border border-ink/18" /></div>
        </div>
      </div>
    );
  }

  if (step === "btb-design") {
    return (
      <div className="relative size-full overflow-hidden bg-accent-case p-[10%] text-paper">
        <span className="font-serif text-[clamp(60px,9vw,110px)] leading-none tracking-[-0.06em]">Aa</span>
        <div className="absolute right-[10%] bottom-[12%] flex gap-2">
          {["bg-ink", "bg-paper", "bg-sage", "bg-accent-fill"].map((color) => <span key={color} className={`size-8 rounded-full border border-paper/25 ${color}`} />)}
        </div>
        <span className="absolute right-[10%] top-[12%] h-[42%] w-px bg-paper/30" />
      </div>
    );
  }

  if (step === "btb-code") {
    return (
      <div className="flex size-full flex-col gap-3 bg-ink p-[11%] font-mono text-[11px] text-paper/60">
        <span className="text-sage">{"<Section>"}</span>
        <span className="ml-[8%] text-paper">{"<Heading />"}</span>
        <span className="ml-[8%] text-accent">{"<ProjectGrid>"}</span>
        <span className="ml-[16%]">{"{work.map(render)}"}</span>
        <span className="ml-[8%] text-accent">{"</ProjectGrid>"}</span>
        <span className="text-sage">{"</Section>"}</span>
        <span className="mt-auto h-1.5 w-[68%] rounded-full bg-paper/12" />
        <span className="h-1.5 w-[44%] rounded-full bg-paper/12" />
      </div>
    );
  }

  return (
    <div className="grid size-full place-items-center bg-paper-edge p-[10%]">
      <div className="w-full overflow-hidden rounded-xl border border-ink/20 bg-paper shadow-[0_20px_45px_rgba(20,17,13,.22)]">
        <div className="flex items-center gap-1.5 border-b border-paper-line px-3 py-2">
          <i className="size-2 rounded-full bg-sage" /><span className="ml-2 font-mono text-[8px] text-paper-muted">yourdomain.com</span>
        </div>
        <div className="grid aspect-[16/8] place-items-center bg-ink text-center">
          <span className="font-serif text-[clamp(22px,3vw,38px)] text-paper">Ready for the world<span className="text-accent">.</span></span>
        </div>
      </div>
    </div>
  );
}
