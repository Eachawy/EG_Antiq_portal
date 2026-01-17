// Contact API DTOs

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

export interface CreateContactMessageDto {
  name: string;
  email: string;
  message: string;
}

export interface ContactMessageResponse {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}
