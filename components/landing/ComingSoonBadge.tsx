type ComingSoonBadgeProps = {
  label: string;
};

export default function ComingSoonBadge({ label }: ComingSoonBadgeProps) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-eq-brand/30 bg-eq-brand/10 px-3 py-1.5 text-xs font-semibold tracking-[0.14em] text-eq-brand uppercase">
      <span className="h-1.5 w-1.5 rounded-full bg-eq-brand" />
      {label}
    </span>
  );
}
