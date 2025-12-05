export type FilterOption<Value extends string> = {
  label: string;
  value: Value;
};

const toLabelMap = <Value extends string>(
  options: readonly FilterOption<Value>[],
) =>
  Object.fromEntries(
    options.map(({ value, label }) => [value, label]),
  ) as Record<Value, string>;

export const countryOptions = [
  { label: '모든 국가', value: 'all' },
  { label: '한국', value: 'kr' },
  { label: '미국', value: 'us' },
  { label: '일본', value: 'jp' },
  { label: '독일', value: 'de' },
  { label: '싱가포르', value: 'sg' },
  { label: '태국', value: 'th' },
  { label: '프랑스', value: 'fr' },
] as const satisfies readonly FilterOption<string>[];

export const fieldOptions = [
  { label: '모든 분야', value: 'all' },
  { label: '교통', value: 'traffic' },
  { label: '노동', value: 'labor' },
  { label: '금융', value: 'finance' },
  { label: 'IT · 데이터', value: 'it' },
] as const satisfies readonly FilterOption<string>[];

export type CountryValue = (typeof countryOptions)[number]['value'];
export type FieldValue = (typeof fieldOptions)[number]['value'];

export const countryLabels: Record<CountryValue, string> =
  toLabelMap<CountryValue>(countryOptions);
export const fieldLabels: Record<FieldValue, string> =
  toLabelMap<FieldValue>(fieldOptions);
