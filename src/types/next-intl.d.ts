// Type definitions for next-intl
// This enables TypeScript autocompletion for translation keys

type Messages = {
  [key: string]: unknown;
};

declare global {
  interface IntlMessages extends Messages {}
}
