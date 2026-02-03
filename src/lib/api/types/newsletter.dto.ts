// Newsletter subscription DTOs

/**
 * DTO for subscribing to newsletter
 */
export interface SubscribeNewsletterDto {
  email: string;
}

/**
 * Response after newsletter subscription
 */
export interface NewsletterSubscriptionResponse {
  subscriptionId: string;
  alreadySubscribed: boolean;
}

/**
 * DTO for unsubscribing from newsletter
 */
export interface UnsubscribeNewsletterDto {
  token: string;
}
