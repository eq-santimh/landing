import Image from 'next/image';

type ProductFrameProps = {
  src: string;
  alt: string;
  url?: string;
  priority?: boolean;
  className?: string;
};

export default function ProductFrame({
  src,
  alt,
  url = 'equitty.app/marketplace',
  priority = false,
  className,
}: ProductFrameProps) {
  return (
    <figure className={`product-frame ${className ?? ''}`}>
      <div className="product-frame-bar">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 truncate rounded-full bg-white/10 px-3 py-1 text-[11px] text-eq-muted">
          {url}
        </span>
      </div>
      <Image
        src={src}
        alt={alt}
        width={1440}
        height={900}
        priority={priority}
        className="h-auto w-full object-cover object-top"
      />
    </figure>
  );
}
