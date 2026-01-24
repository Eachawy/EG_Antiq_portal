// Image URL construction utilities

/**
 * Construct full image URL from path
 * @param path - Relative path from uploads directory or absolute URL
 * @returns Full URL or empty string if path is invalid
 */
export function getImageUrl(path?: string): string {
  if (!path) return '';

  // If path is already an absolute URL (http:// or https://), return as-is
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  const baseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api/v1';

  // Remove /api/v1 suffix if present, as uploads are served from root
  const cleanBaseUrl = baseUrl.replace(/\/api\/v1\/?$/, '');

  // Ensure path starts without slash
  let cleanPath = path.startsWith('/') ? path.slice(1) : path;

  // Check if path already starts with 'uploads/' - if so, don't add it again
  if (cleanPath.startsWith('uploads/')) {
    return `${cleanBaseUrl}/${cleanPath}`;
  }

  return `${cleanBaseUrl}/uploads/${cleanPath}`;
}

/**
 * Validate if image URL is accessible
 * @param url - Image URL to validate
 * @returns Promise<boolean> indicating if image is accessible
 */
export async function validateImageUrl(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
}
