import { en } from '@/locales/en';
import { vn } from '@/locales/vn';

const dictionaries = {
  en,
  vn,
} as const;

export type Locale = keyof typeof dictionaries;

const DEFAULT_LOCALE: Locale = 'vn';

type TranslationTree = Record<string, string | TranslationTree>;

function getValueByPath(tree: TranslationTree, key: string): string {
  const value = key.split('.').reduce<string | TranslationTree | undefined>((current, segment) => {
    if (!current || typeof current === 'string') {
      return undefined;
    }

    return current[segment];
  }, tree);

  if (typeof value !== 'string') {
    return key;
  }

  return value;
}

function interpolate(template: string, params: Record<string, string | number>): string {
  return Object.entries(params).reduce((result, [name, value]) => {
    return result.replaceAll(`{{${name}}}`, String(value));
  }, template);
}

export function translate(
  key: string,
  params: Record<string, string | number> = {},
  locale: Locale = DEFAULT_LOCALE
): string {
  const template = getValueByPath(dictionaries[locale] as TranslationTree, key);

  if (Object.keys(params).length === 0) {
    return template;
  }

  return interpolate(template, params);
}

export function useI18n(locale: Locale = DEFAULT_LOCALE) {
  return {
    locale,
    t: (key: string, params: Record<string, string | number> = {}) => translate(key, params, locale),
  };
}
