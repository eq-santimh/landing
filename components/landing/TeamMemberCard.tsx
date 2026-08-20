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
    <article className="group/card marketplace-card flex overflow-hidden p-3 sm:p-3.5">
      <div className={cn('shrink-0 self-stretch', isFounder ? 'w-[5.25rem] sm:w-28' : 'w-[4.5rem] sm:w-24')}>
        <TeamAvatar
          name={name}
          src={photo}
          size="card"
          objectPosition={objectPosition}
          className="h-full min-h-[6.25rem]"
        />
      </div>
      <div className="min-w-0 flex-1 px-3 py-1 sm:px-4 sm:py-2">
        <div className="flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:items-baseline sm:gap-x-2">
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
