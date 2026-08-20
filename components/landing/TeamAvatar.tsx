'use client';

import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils';

type TeamAvatarProps = {
  name: string;
  src?: string;
  size?: 'md' | 'sm' | 'xs' | 'card';
  objectPosition?: string;
  className?: string;
};

const sizeClasses = {
  md: 'h-40 w-40 rounded-2xl sm:h-48 sm:w-48',
  sm: 'h-20 w-20 rounded-2xl sm:h-24 sm:w-24',
  xs: 'h-16 w-16 rounded-2xl sm:h-[4.5rem] sm:w-[4.5rem]',
  card: 'h-full w-full min-h-[6.25rem] rounded-2xl',
} as const;

const sizePixels = {
  md: 192,
  sm: 96,
  xs: 72,
  card: 224,
} as const;

const initialsTextClasses = {
  md: 'text-3xl sm:text-4xl',
  sm: 'text-xl sm:text-2xl',
  xs: 'text-base sm:text-lg',
  card: 'text-2xl sm:text-3xl',
} as const;

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? '')
    .join('');
}

export default function TeamAvatar({
  name,
  src,
  size = 'md',
  objectPosition = 'center',
  className,
}: TeamAvatarProps) {
  const [errored, setErrored] = useState(false);
  const initials = getInitials(name);
  const dimension = sizePixels[size];
  const showImage = Boolean(src) && !errored;

  return (
    <div
      className={cn(
        'relative overflow-hidden border border-white/10 bg-linear-to-br from-white/8 to-white/0 shadow-[0_0_0_1px_rgba(var(--eq-page-accent-rgb,0,180,196),0.08)]',
        sizeClasses[size],
        className,
      )}
    >
      {showImage ? (
        <Image
          src={src as string}
          alt={name}
          width={dimension}
          height={dimension}
          sizes={size === 'card' ? '(min-width: 640px) 112px, 84px' : `${dimension}px`}
          onError={() => setErrored(true)}
          style={{ objectPosition }}
          className="h-full w-full object-cover transition-[filter,transform] duration-500 ease-out group-hover/card:scale-[1.04]"
        />
      ) : (
        <div
          className={cn(
            'flex h-full w-full items-center justify-center font-semibold tracking-wide text-white/55 transition-colors duration-500 group-hover/card:text-[rgb(var(--eq-page-accent-rgb,0,180,196))]',
            initialsTextClasses[size],
          )}
          aria-hidden
        >
          {initials}
        </div>
      )}
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/10 transition-shadow duration-500 group-hover/card:shadow-[inset_0_0_0_1px_rgba(var(--eq-page-accent-rgb,0,180,196),0.45)]"
        aria-hidden
      />
    </div>
  );
}
