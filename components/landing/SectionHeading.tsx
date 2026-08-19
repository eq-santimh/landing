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
      <h2 className="mt-3 text-3xl tracking-tight text-eq-ink sm:text-4xl lg:text-5xl">{title}</h2>
      {subtitle ? <p className="eq-text-body mt-4 text-eq-muted">{subtitle}</p> : null}
    </div>
  );
}
