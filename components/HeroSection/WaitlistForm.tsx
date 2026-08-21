'use client';

import { useEffect, useMemo, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { useLocale, useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { addEmailToWaitlist } from '@/app/[locale]/actions';
import CustomDialog from '@/components/CustomDialog';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { countries } from '@/lib/countries';
import { createRegistrySchema, registryForm } from '@/schemas/registrySchema';
import { ArrowRight, ChevronRight, X } from 'lucide-react';
import { cn } from '@/lib/utils';

type WaitlistFormProps = {
  tone?: 'light' | 'dark';
};

function sanitizeReferral(value: string) {
  return value.replace(/[^a-zA-Z0-9]/g, '').slice(0, 12);
}

export default function WaitlistForm({ tone = 'dark' }: WaitlistFormProps) {
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogMessage, setDialogMessage] = useState('');
  const [referralOpen, setReferralOpen] = useState(false);
  const isDark = tone === 'dark';
  const searchParams = useSearchParams();

  const tForm = useTranslations('HomePage.Form');
  const tValidation = useTranslations('HomePage.Form.Validation');
  const tErrors = useTranslations('HomePage.Form.Errors');
  const tSuccessDialog = useTranslations('HomePage.Form.SuccessDialog');
  const locale = useLocale();

  const registrySchema = createRegistrySchema(tValidation);

  const defaultNationality = useMemo(() => {
    return (
      countries.find((country) => country.name === 'El Salvador' || country.nameEs === 'El Salvador')
        ?.code ?? ''
    );
  }, []);

  const presetReferral = useMemo(() => {
    const raw = searchParams.get('ref') ?? searchParams.get('referral') ?? '';
    return sanitizeReferral(raw);
  }, [searchParams]);

  const form = useForm<registryForm>({
    defaultValues: {
      email: '',
      nationality: defaultNationality || '',
      wasReferred: Boolean(presetReferral),
      referralCode: presetReferral,
    },
    mode: 'onSubmit',
  });

  useEffect(() => {
    if (presetReferral) {
      form.setValue('wasReferred', true);
      form.setValue('referralCode', presetReferral);
      setReferralOpen(true);
    }
  }, [form, presetReferral]);

  useEffect(() => {
    if (defaultNationality && !form.getValues('nationality')) {
      form.setValue('nationality', defaultNationality);
    }
  }, [defaultNationality, form]);

  function onSubmit(data: registryForm) {
    startTransition(async () => {
      form.clearErrors();
      const referralCode = sanitizeReferral(data.referralCode ?? '');
      const parsed = registrySchema.safeParse({
        ...data,
        referralCode,
        wasReferred: Boolean(referralCode),
      });

      if (!parsed.success) {
        for (const issue of parsed.error.issues) {
          const field = issue.path[0];
          if (typeof field === 'string' && (field === 'email' || field === 'nationality' || field === 'referralCode')) {
            form.setError(field, { message: issue.message });
          }
        }
        return;
      }

      const result = await addEmailToWaitlist(parsed.data, locale);

      if (result.success) {
        setDialogTitle(tSuccessDialog('title'));
        setDialogMessage(tSuccessDialog('message'));
        setIsOpen(true);
        form.reset({
          email: '',
          nationality: defaultNationality || '',
          wasReferred: false,
          referralCode: '',
        });
        if (!presetReferral) {
          setReferralOpen(false);
        }
        return;
      }

      if (result.error?.type === 'email') {
        setDialogTitle(tErrors('emailAlreadyExists.title'));
        setDialogMessage(tErrors('emailAlreadyExists.message'));
        setIsOpen(true);
        return;
      }

      if (result.error?.type === 'referral') {
        setDialogTitle(tErrors('invalidReferralCode.title'));
        setDialogMessage(tErrors('invalidReferralCode.message'));
        setIsOpen(true);
        return;
      }

      toast.error(tErrors('waitlistError'));
    });
  }

  const fieldBase = cn(
    'h-11 w-full rounded-[10px] px-4 py-3 text-sm outline-none transition-all duration-200 sm:h-12',
    isDark ? 'dark-eq-input eq-neon-field' : 'eq-input',
  );
  const quietField = cn(
    'h-10 w-full rounded-[10px] px-4 py-2 text-sm outline-none transition-all duration-200',
    isDark
      ? 'border border-white/10 bg-transparent text-white/80 placeholder:text-white/35'
      : 'border border-eq-line bg-transparent text-eq-ink placeholder:text-eq-muted',
  );

  return (
    <>
      <div
        className={cn(
          'p-4 sm:p-6',
          isDark ? 'eq-glass-neon' : 'rounded-2xl border border-eq-line bg-white shadow-[0_2px_8px_rgba(9,8,13,0.06)]',
        )}
      >
        <p className="eq-text-small text-eq-brand">{tForm('cardEyebrow')}</p>
        <h2 className={cn('mt-2 text-lg font-semibold sm:text-xl', isDark ? 'text-white' : 'text-eq-ink')}>{tForm('cardTitle')}</h2>
        <p className={cn('mt-1 mb-4 text-sm sm:mb-5', isDark ? 'text-[#d7cfc7]' : 'text-eq-muted')}>{tForm('cardDescription')}</p>

        <Form {...form}>
          <form className="w-full space-y-3.5" onSubmit={form.handleSubmit(onSubmit)} aria-label="Join waitlist form">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <label htmlFor="waitlist-email" className={cn('eq-text-small', isDark ? 'text-white/55' : 'text-eq-muted')}>
                    {tForm('emailLabel')}
                  </label>
                  <FormControl>
                    <Input
                      {...field}
                      id="waitlist-email"
                      type="email"
                      placeholder={tForm('emailPlaceholder')}
                      className={fieldBase}
                      aria-label={tForm('emailLabel')}
                      aria-describedby="email-error"
                      autoComplete="email"
                      required
                    />
                  </FormControl>
                  <FormMessage className="text-left text-xs" id="email-error" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="nationality"
              render={({ field }) => (
                <FormItem>
                  <label htmlFor="waitlist-nationality" className={cn('eq-text-small', isDark ? 'text-white/55' : 'text-eq-muted')}>
                    {tForm('nationalityLabel')}
                  </label>
                  <FormControl>
                    <div className="relative">
                      <select
                        {...field}
                        id="waitlist-nationality"
                        className={`${fieldBase} appearance-none pr-12`}
                        aria-label={tForm('nationalityLabel')}
                        aria-describedby="nationality-error"
                        required
                      >
                        <option value="" disabled className={isDark ? 'bg-[#09080d] text-white/60' : 'bg-white text-eq-muted'}>
                          {tForm('nationalityPlaceholder')}
                        </option>
                        {countries.map((country) => (
                          <option
                            key={country.code}
                            value={country.code}
                            className={isDark ? 'bg-[#09080d] text-white' : 'bg-white text-eq-ink'}
                          >
                            {locale === 'es' ? country.nameEs : country.name}
                          </option>
                        ))}
                      </select>
                      <svg
                        className={cn(
                          'pointer-events-none absolute top-1/2 right-4 h-5 w-5 -translate-y-1/2',
                          isDark ? 'text-white/50' : 'text-eq-muted',
                        )}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </FormControl>
                  <FormMessage className="text-left text-xs" id="nationality-error" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="referralCode"
              render={({ field }) => {
                const applied = Boolean(presetReferral && field.value === presetReferral);
                return (
                  <FormItem className="space-y-1">
                    {applied ? (
                      <div
                        className={cn(
                          'flex min-h-9 items-center justify-between gap-3 rounded-lg px-1',
                          isDark ? 'text-white/70' : 'text-eq-ink',
                        )}
                      >
                        <p className="truncate text-xs">{tForm('referralApplied', { code: presetReferral })}</p>
                        <button
                          type="button"
                          onClick={() => {
                            field.onChange('');
                            form.setValue('wasReferred', false);
                            setReferralOpen(true);
                          }}
                          className={cn(
                            'rounded-full p-1 transition',
                            isDark ? 'text-white/40 hover:text-white' : 'text-eq-muted hover:text-eq-ink',
                          )}
                          aria-label={tForm('clearReferral')}
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex min-h-9 flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-3">
                        <button
                          type="button"
                          onClick={() => setReferralOpen((open) => !open)}
                          className={cn(
                            'inline-flex shrink-0 items-center gap-1 text-left text-xs transition',
                            isDark ? 'text-white/40 hover:text-eq-brand' : 'text-eq-muted hover:text-eq-brand',
                          )}
                          aria-expanded={referralOpen}
                          aria-controls="waitlist-referral"
                        >
                          <ChevronRight
                            className={cn('h-3.5 w-3.5 transition-transform duration-200', referralOpen && 'rotate-90')}
                          />
                          {tForm('referralTrigger')}
                        </button>
                        {referralOpen ? (
                          <FormControl>
                            <Input
                              {...field}
                              id="waitlist-referral"
                              type="text"
                              value={field.value ?? ''}
                              onChange={(event) => field.onChange(sanitizeReferral(event.target.value))}
                              placeholder={tForm('referralCodePlaceholder')}
                              className={`${quietField} h-8 w-full min-w-0 px-3 text-xs uppercase sm:flex-1`}
                              aria-label={tForm('referralOptionalLabel')}
                              aria-describedby="referral-code-error"
                              autoComplete="off"
                              maxLength={12}
                            />
                          </FormControl>
                        ) : null}
                      </div>
                    )}
                    <FormMessage className="text-left text-xs" id="referral-code-error" />
                  </FormItem>
                );
              }}
            />

            <Button
              className="eq-neon-cta flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-eq-brand font-semibold text-white transition hover:bg-eq-brand-strong"
              type="submit"
              disabled={isPending}
              aria-label={isPending ? 'Submitting...' : tForm('button')}
            >
              {isPending ? <Spinner className="mr-2 h-5 w-5" aria-hidden="true" /> : null}
              <span className="flex items-center gap-2">
                <span>{tForm('button')}</span>
                <ArrowRight className="h-4 w-4" />
              </span>
            </Button>

            <p className={cn('text-center text-xs', isDark ? 'text-white/50' : 'text-eq-muted')}>{tForm('microcopy')}</p>
          </form>
        </Form>
      </div>

      <CustomDialog open={isOpen} setOpen={setIsOpen} title={dialogTitle} message={dialogMessage} />
    </>
  );
}
