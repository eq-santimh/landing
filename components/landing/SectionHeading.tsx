type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
};

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'left',
}: SectionHeadingProps) {
  return (
    <div className={align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      <p className="eq-text-small text-eq-brand">{eyebrow}</p>
      <h2 className="mt-3 text-2xl tracking-tight text-eq-ink sm:text-3xl lg:text-4xl">{title}</h2>
      {subtitle ? <p className="eq-text-body mt-3 max-w-2xl text-sm text-eq-muted sm:mt-4 sm:text-base">{subtitle}</p> : null}
    </div>
  );
}
