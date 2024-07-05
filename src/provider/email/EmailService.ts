import {
  EmailGateway,
  SendEmailInput,
} from "../../core/gateway/EmailGateway.js";

export class EmailService implements EmailGateway {
  async sendEmail(input: SendEmailInput): Promise<void> {
    console.log(`Email to ${input.to} sent`);
  }
}
