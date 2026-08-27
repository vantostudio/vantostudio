export function WordReveal({ children, className = "" }: { children: string; className?: string }) {
  return (
    <p className={className}>
      {children.split(" ").map((word, index) => (
        <span key={`${word}-${index}`} className="inline-block overflow-hidden align-top">
          <span data-word className="inline-block">{word}&nbsp;</span>
        </span>
      ))}
    </p>
  );
}
