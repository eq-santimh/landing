'use client';

import { useEffect, useId, useLayoutEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react';
import { createPortal } from 'react-dom';
import { Check, ChevronDown, Search } from 'lucide-react';
import { countries } from '@/lib/countries';
import { cn } from '@/lib/utils';

type CountrySelectProps = {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  locale: string;
  placeholder: string;
  searchPlaceholder: string;
  emptyLabel: string;
  isDark?: boolean;
  className?: string;
  'aria-label'?: string;
  'aria-describedby'?: string;
};

function normalize(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

export default function CountrySelect({
  id,
  value,
  onChange,
  onBlur,
  locale,
  placeholder,
  searchPlaceholder,
  emptyLabel,
  isDark = true,
  className,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
}: CountrySelectProps) {
  const reactId = useId();
  const listId = `${id ?? 'country-select'}-list`;
  const searchId = `${id ?? 'country-select'}-search`;
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [highlighted, setHighlighted] = useState(0);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const selected = countries.find((country) => country.code === value);
  const selectedLabel = selected ? (locale === 'es' ? selected.nameEs : selected.name) : '';

  const filtered = useMemo(() => {
    const needle = normalize(query.trim());
    if (!needle) return countries;
    return countries.filter((country) => {
      const label = locale === 'es' ? country.nameEs : country.name;
      return normalize(label).includes(needle) || normalize(country.code).includes(needle);
    });
  }, [locale, query]);

  function closeMenu() {
    setQuery('');
    setOpen(false);
  }

  function openMenu() {
    const selectedIndex = countries.findIndex((country) => country.code === value);
    setQuery('');
    setHighlighted(selectedIndex >= 0 ? selectedIndex : 0);
    setOpen(true);
  }

  function selectCountry(code: string) {
    onChange(code);
    closeMenu();
    triggerRef.current?.focus();
  }

  useLayoutEffect(() => {
    if (!open) return;
    const menu = menuRef.current;
    const trigger = triggerRef.current;
    if (!menu || !trigger) return;

    const place = () => {
      const rect = trigger.getBoundingClientRect();
      const width = rect.width;
      const top = rect.bottom + 8;
      const left = Math.min(Math.max(8, rect.left), window.innerWidth - width - 8);
      const available = Math.max(160, window.innerHeight - top - 16);
      const maxHeight = Math.min(304, available);
      const search = menu.querySelector<HTMLElement>('[data-country-search]');
      const list = menu.querySelector<HTMLElement>('.eq-select-options');
      const searchHeight = search?.offsetHeight ?? 52;

      menu.style.position = 'fixed';
      menu.style.top = `${top}px`;
      menu.style.left = `${left}px`;
      menu.style.width = `${width}px`;
      menu.style.zIndex = '70';
      menu.style.opacity = '1';
      if (list) {
        list.style.maxHeight = `${Math.max(120, maxHeight - searchHeight)}px`;
      }
    };

    place();
    searchRef.current?.focus();
    window.addEventListener('resize', place);
    window.addEventListener('scroll', place, true);
    return () => {
      window.removeEventListener('resize', place);
      window.removeEventListener('scroll', place, true);
    };
  }, [open, filtered.length]);

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: PointerEvent) {
      const target = event.target as Node;
      if (triggerRef.current?.contains(target) || menuRef.current?.contains(target)) return;
      setQuery('');
      setOpen(false);
      onBlur?.();
    }

    function onKey(event: globalThis.KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault();
        setQuery('');
        setOpen(false);
        triggerRef.current?.focus();
      }
    }

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [onBlur, open]);

  useLayoutEffect(() => {
    if (!open) return;
    const active = menuRef.current?.querySelector<HTMLElement>('[data-active="true"]');
    active?.scrollIntoView({ block: 'nearest' });
  }, [highlighted, open]);

  function onTriggerKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (open) return;
      openMenu();
    }
  }

  function onSearchKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setHighlighted((current) => Math.min(current + 1, Math.max(filtered.length - 1, 0)));
      return;
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setHighlighted((current) => Math.max(current - 1, 0));
      return;
    }
    if (event.key === 'Enter') {
      event.preventDefault();
      const country = filtered[highlighted];
      if (country) selectCountry(country.code);
    }
  }

  const menu = open ? (
    <div
      ref={menuRef}
      id={listId}
      role="listbox"
      aria-labelledby={id}
      className={cn(
        'eq-select-menu flex flex-col overflow-hidden rounded-xl border opacity-0 shadow-[0_18px_48px_rgba(0,0,0,0.45),0_0_28px_rgba(0,180,196,0.12)]',
        isDark
          ? 'border-eq-brand/35 bg-[#0c0c16]/96 text-eq-ink backdrop-blur-xl'
          : 'border-eq-line bg-white text-eq-ink',
      )}
    >
      <div data-country-search className={cn('shrink-0 border-b p-2', isDark ? 'border-white/8' : 'border-eq-line')}>
        <label className="relative block" htmlFor={searchId}>
          <Search
            className={cn(
              'pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2',
              isDark ? 'text-eq-brand/80' : 'text-eq-muted',
            )}
          />
          <input
            ref={searchRef}
            id={searchId}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setHighlighted(0);
            }}
            onKeyDown={onSearchKeyDown}
            placeholder={searchPlaceholder}
            autoComplete="off"
            className={cn(
              'h-10 w-full rounded-lg py-2 pr-3 pl-10 text-sm outline-none',
              isDark
                ? 'border border-white/10 bg-white/5 text-white placeholder:text-white/35 focus:border-eq-brand/60'
                : 'border border-eq-line bg-white text-eq-ink placeholder:text-eq-muted focus:border-eq-brand/50',
            )}
          />
        </label>
      </div>
      <ul className="eq-select-options overflow-y-auto p-1.5">
        {filtered.length === 0 ? (
          <li className="px-3 py-4 text-center text-sm text-eq-muted">{emptyLabel}</li>
        ) : (
          filtered.map((country, index) => {
            const label = locale === 'es' ? country.nameEs : country.name;
            const active = index === highlighted;
            const selectedCountry = country.code === value;
            return (
              <li key={country.code} role="none">
                <button
                  type="button"
                  id={`${reactId}-${country.code}`}
                  role="option"
                  aria-selected={selectedCountry}
                  data-active={active}
                  onMouseEnter={() => setHighlighted(index)}
                  onClick={() => selectCountry(country.code)}
                  className={cn(
                    'flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors',
                    active
                      ? 'bg-eq-brand/18 text-eq-brand'
                      : isDark
                        ? 'text-white/85 hover:bg-white/5'
                        : 'text-eq-ink hover:bg-black/5',
                  )}
                >
                  <span>{label}</span>
                  {selectedCountry ? <Check className="h-4 w-4 shrink-0 text-eq-brand" /> : null}
                </button>
              </li>
            );
          })
        )}
      </ul>
    </div>
  ) : null;

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        id={id}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedBy}
        onClick={() => (open ? closeMenu() : openMenu())}
        onKeyDown={onTriggerKeyDown}
        onBlur={() => {
          if (!open) onBlur?.();
        }}
        className={cn(
          'flex w-full items-center justify-between gap-3 text-left',
          className,
          open && 'border-eq-brand/70',
        )}
      >
        <span className={cn('truncate', selectedLabel ? (isDark ? 'text-white' : 'text-eq-ink') : isDark ? 'text-white/40' : 'text-eq-muted')}>
          {selectedLabel || placeholder}
        </span>
        <ChevronDown
          className={cn(
            'h-5 w-5 shrink-0 transition-transform duration-200',
            open && 'rotate-180',
            isDark ? 'text-eq-brand/80' : 'text-eq-muted',
          )}
        />
      </button>
      {menu && typeof document !== 'undefined' ? createPortal(menu, document.body) : null}
    </>
  );
}
