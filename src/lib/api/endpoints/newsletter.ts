// Newsletter API endpoints

import { httpClient } from '../http';
import {
  SubscribeNewsletterDto,
  NewsletterSubscriptionResponse,
  UnsubscribeNewsletterDto,
} from '../types/newsletter.dto';
import { ApiResponse } from '../types/common';

export const newsletterEndpoints = {
  /**
   * Subscribe to newsletter
   */
  async subscribe(
    data: SubscribeNewsletterDto
  ): Promise<NewsletterSubscriptionResponse> {
    const response = await httpClient.post<
      ApiResponse<NewsletterSubscriptionResponse>
    >('/portal/newsletter/subscribe', data);
    return response.data.data;
  },

  /**
   * Unsubscribe from newsletter
   */
  async unsubscribe(data: UnsubscribeNewsletterDto): Promise<void> {
    await httpClient.post('/portal/newsletter/unsubscribe', data);
  },
};
