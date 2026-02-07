/**
 * Build SEO-friendly monument URL with slug
 * @param id - Monument ID
 * @param slugEn - English slug
 * @param slugAr - Arabic slug
 * @param locale - Current locale (en or ar)
 * @returns URL path like /en/sites/21-memphis-mit-rahina
 */
export function buildMonumentUrl(
  id: number | string,
  slugEn?: string | null,
  slugAr?: string | null,
  locale: string = 'en'
): string {
  const slug = locale === 'en' ? slugEn : slugAr;
  
  // If no slug available, fall back to ID-only format
  if (!slug) {
    return `/${locale}/sites/${id}`;
  }
  
  // Return ID-slug format
  return `/${locale}/sites/${id}-${slug}`;
}
