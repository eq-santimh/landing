type ComingSoonBadgeProps = {
  label: string;
};

export default function ComingSoonBadge({ label }: ComingSoonBadgeProps) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-eq-brand/20 bg-[#e6f7f9] px-3 py-1.5 text-xs font-semibold tracking-[0.14em] text-[#0a8490] uppercase">
      <span className="h-1.5 w-1.5 rounded-full bg-eq-brand" />
      {label}
    </span>
  );
}
