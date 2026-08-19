'use client';

import TeamAvatar from '@/components/landing/TeamAvatar';
import { cn } from '@/lib/utils';

type TeamMemberCardProps = {
  name: string;
  role: string;
  bio: string;
  signal?: string;
  photo?: string;
  objectPosition?: string;
  variant?: 'founder' | 'advisor';
};

export default function TeamMemberCard({
  name,
  role,
  bio,
  signal,
  photo,
  objectPosition,
  variant = 'founder',
}: TeamMemberCardProps) {
  const isFounder = variant === 'founder';

  return (
    <article
      className={cn(
        'group/card marketplace-card flex gap-4 p-4 sm:gap-5 sm:p-5',
        isFounder ? 'sm:items-start' : 'items-start',
      )}
    >
      <TeamAvatar
        name={name}
        src={photo}
        size={isFounder ? 'sm' : 'xs'}
        objectPosition={objectPosition}
        className="shrink-0"
      />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
          <h4 className={cn('font-semibold text-eq-ink', isFounder ? 'text-base sm:text-lg' : 'text-sm sm:text-base')}>
            {name}
          </h4>
          <p className="eq-text-small text-eq-brand">{role}</p>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-eq-muted">{bio}</p>
        {signal ? (
          <p className="mt-2 text-xs leading-relaxed text-white/40">{signal}</p>
        ) : null}
      </div>
    </article>
  );
}
