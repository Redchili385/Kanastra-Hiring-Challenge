export interface SendEmailInput {
  to: string;
  subject: string;
  body: string;
  attachments: Blob[];
}

export interface EmailGateway {
  sendEmail(input: SendEmailInput): Promise<void>;
}
