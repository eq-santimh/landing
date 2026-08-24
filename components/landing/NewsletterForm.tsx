'use client';

import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { useLocale, useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { subscribeToNewsletter } from '@/app/[locale]/actions';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import {
  createNewsletterSchema,
  newsletterForm,
  newsletterInterestValues,
} from '@/schemas/newsletterSchema';
import { cn } from '@/lib/utils';

const interestTranslationKeys = {
  futureInvestor: 'interestInvestor',
  assetPartner: 'interestAssetPartner',
  industryObserver: 'interestIndustryObserver',
  other: 'interestOther',
} as const;

export default function NewsletterForm() {
  const [isPending, startTransition] = useTransition();
  const locale = useLocale();
  const t = useTranslations('Newsletter');
  const tValidation = useTranslations('Newsletter.validation');
  const schema = createNewsletterSchema(tValidation);

  const form = useForm<newsletterForm>({
    defaultValues: {
      firstName: '',
      email: '',
      interests: [],
    },
    mode: 'onSubmit',
  });

  const fieldBase =
    'dark-eq-input h-12 w-full rounded-[10px] px-4 py-3 text-sm outline-none transition-all duration-200';

  function onSubmit(values: newsletterForm) {
    startTransition(async () => {
      form.clearErrors();
      const parsed = schema.safeParse(values);
      if (!parsed.success) {
        for (const issue of parsed.error.issues) {
          const field = issue.path[0];
          if (field === 'firstName' || field === 'email' || field === 'interests') {
            form.setError(field, { message: issue.message });
          }
        }
        return;
      }

      const result = await subscribeToNewsletter(parsed.data, locale);
      if (result.success) {
        toast.success(t('successTitle'), { description: t('successMessage') });
        form.reset({ firstName: '', email: '', interests: [] });
        return;
      }

      if (result.error?.type === 'email') {
        toast.error(t('errors.alreadyExists'));
        return;
      }

      toast.error(t('errors.submit'));
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="marketplace-card space-y-6 p-6 sm:p-7">
        <div>
          <p className="eq-text-small text-eq-brand">{t('title')}</p>
          <p className="mt-2 text-sm leading-relaxed text-eq-muted">{t('description')}</p>
        </div>
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="eq-text-small text-white/55">{t('firstNameLabel')}</FormLabel>
              <FormControl>
                <Input {...field} placeholder={t('firstNamePlaceholder')} className={fieldBase} required />
              </FormControl>
              <FormMessage className="text-eq-muted" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="eq-text-small text-white/55">{t('emailLabel')}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  placeholder={t('emailPlaceholder')}
                  className={fieldBase}
                  autoComplete="email"
                  required
                />
              </FormControl>
              <FormMessage className="text-eq-muted" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="interests"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="eq-text-small text-white/55">{t('interestLabel')}</FormLabel>
              <div className="grid gap-3 sm:grid-cols-2">
                {newsletterInterestValues.map((interest) => {
                  const checked = field.value.includes(interest);
                  return (
                    <label
                      key={interest}
                      className={cn(
                        'flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3.5 text-sm transition',
                        checked
                          ? 'border-eq-brand/50 bg-eq-brand/10 text-eq-ink'
                          : 'border-white/12 bg-white/3 text-eq-muted hover:border-white/25',
                      )}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={(event) => {
                          if (event.target.checked) {
                            field.onChange([...field.value, interest]);
                          } else {
                            field.onChange(field.value.filter((value) => value !== interest));
                          }
                        }}
                        className="sr-only"
                      />
                      <span
                        className={cn(
                          'flex h-4 w-4 items-center justify-center rounded-sm border text-[10px]',
                          checked ? 'border-eq-brand bg-eq-brand text-white' : 'border-white/30',
                        )}
                        aria-hidden
                      >
                        {checked ? '✓' : ''}
                      </span>
                      <span className="font-medium">{t(interestTranslationKeys[interest])}</span>
                    </label>
                  );
                })}
              </div>
              <FormMessage className="text-eq-muted" />
            </FormItem>
          )}
        />
        <button
          type="submit"
          disabled={isPending}
          className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-eq-brand font-semibold text-white transition hover:bg-eq-brand-strong disabled:opacity-50"
        >
          {isPending ? <Spinner className="h-4 w-4" /> : null}
          {t('button')}
        </button>
        <p className="text-center text-xs text-white/50">{t('microcopy')}</p>
      </form>
    </Form>
  );
}
