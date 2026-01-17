// Contact API endpoints

import { httpClient } from '../http';
import {
  CreateContactMessageDto,
  ContactMessageResponse,
} from '../types/contact.dto';
import { ApiResponse } from '../types/common';

export const contactEndpoints = {
  /**
   * Submit a contact form message
   */
  async submit(
    data: CreateContactMessageDto
  ): Promise<ContactMessageResponse> {
    const response = await httpClient.post<ApiResponse<ContactMessageResponse>>(
      '/portal/contact',
      data
    );
    return response.data.data;
  },
};
