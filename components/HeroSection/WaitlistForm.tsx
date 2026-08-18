'use client';

import { useEffect, useMemo, useState, useTransition } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useLocale, useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { addEmailToWaitlist } from '@/app/[locale]/actions';
import CustomDialog from '@/components/CustomDialog';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { countries } from '@/lib/countries';
import { createRegistrySchema, registryForm } from '@/schemas/registrySchema';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

type WaitlistFormProps = {
  tone?: 'light' | 'dark';
};

export default function WaitlistForm({ tone = 'dark' }: WaitlistFormProps) {
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogMessage, setDialogMessage] = useState('');
  const isDark = tone === 'dark';

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

  const form = useForm<registryForm>({
    defaultValues: {
      email: '',
      nationality: defaultNationality || '',
      wasReferred: false,
      referralCode: '',
    },
    mode: 'onSubmit',
  });

  const wasReferred = useWatch({
    control: form.control,
    name: 'wasReferred',
    defaultValue: false,
  });

  useEffect(() => {
    if (defaultNationality && !form.getValues('nationality')) {
      form.setValue('nationality', defaultNationality);
    }
  }, [defaultNationality, form]);

  useEffect(() => {
    if (!wasReferred) {
      form.setValue('referralCode', '');
      form.clearErrors('referralCode');
    }
  }, [form, wasReferred]);

  function onSubmit(data: registryForm) {
    startTransition(async () => {
      form.clearErrors();
      const parsed = registrySchema.safeParse(data);

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

  const labelNationality = locale === 'es' ? 'NACIONALIDAD' : 'NATIONALITY';
  const labelEmail = locale === 'es' ? 'CORREO ELECTRONICO *' : 'EMAIL ADDRESS *';
  const labelReferral = locale === 'es' ? 'CODIGO DE REFERIDO' : 'REFERRAL CODE';
  const fieldBase = cn(
    'h-12 w-full rounded-[10px] px-4 py-3 text-sm outline-none transition-all duration-200',
    isDark ? 'dark-eq-input' : 'eq-input'
  );

  return (
    <>
      <div className={cn('rounded-2xl border p-5 sm:p-6', isDark ? 'border-white/10 bg-white/5' : 'border-eq-line bg-white shadow-[0_2px_8px_rgba(9,8,13,0.06)]')}>
        <p className="eq-text-small text-eq-brand">{tForm('cardEyebrow')}</p>
        <h2 className={cn('mt-2 text-xl font-semibold', isDark ? 'text-white' : 'text-eq-ink')}>{tForm('cardTitle')}</h2>
        <p className={cn('mt-1 mb-5 text-sm', isDark ? 'text-[#d7cfc7]' : 'text-eq-muted')}>{tForm('cardDescription')}</p>

        <Form {...form}>
          <form className="w-full space-y-4" onSubmit={form.handleSubmit(onSubmit)} aria-label="Join waitlist form">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder={tForm('emailPlaceholder')}
                      className={fieldBase}
                      aria-label={labelEmail}
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
                  <FormControl>
                    <div className="relative">
                      <select
                        {...field}
                        className={`${fieldBase} appearance-none pr-12`}
                        aria-label={labelNationality}
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
                          isDark ? 'text-white/50' : 'text-eq-muted'
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
              name="wasReferred"
              render={({ field }) => (
                <FormItem>
                  <label
                    className={cn(
                      'flex cursor-pointer items-start gap-3 rounded-[10px] border px-4 py-3 text-sm',
                      isDark ? 'border-white/10 bg-white/5 text-white/85' : 'border-eq-line bg-eq-canvas text-eq-ink'
                    )}
                  >
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={(event) => field.onChange(event.target.checked)}
                      className="mt-0.5 h-4 w-4 rounded border-eq-line accent-[#00B4C4]"
                    />
                    <span>{tForm('wasReferredLabel')}</span>
                  </label>
                </FormItem>
              )}
            />

            {wasReferred ? (
              <FormField
                control={form.control}
                name="referralCode"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        placeholder={tForm('referralCodePlaceholder')}
                        className={`${fieldBase} uppercase`}
                        aria-label={labelReferral}
                        aria-describedby="referral-code-error"
                        autoComplete="off"
                        maxLength={12}
                      />
                    </FormControl>
                    <FormMessage className="text-left text-xs" id="referral-code-error" />
                  </FormItem>
                )}
              />
            ) : null}

            <Button
              className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-eq-brand font-semibold text-white shadow-none transition hover:bg-eq-brand-strong"
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
