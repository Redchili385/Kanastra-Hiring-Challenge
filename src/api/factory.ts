import { BoletoGateway } from "../core/gateway/BoletoGateway.js";
import { DebtGateway } from "../core/gateway/DebtGateway.js";
import { EmailGateway } from "../core/gateway/EmailGateway.js";
import {
  DefaultProcessDebts,
  ProcessDebts,
} from "../core/usecase/ProcessDebts.js";
import { BoletoService } from "../provider/boleto/BoletoService.js";
import { DebtService } from "../provider/debt/DebtService.js";
import { EmailService } from "../provider/email/EmailService.js";

export interface Factory {
  getProcessDebts(): ProcessDebts;
}

export class DefaultFactory implements Factory {
  readonly processDebts: ProcessDebts;

  constructor() {
    const emailGateway: EmailGateway = new EmailService();
    const debtGateway: DebtGateway = new DebtService();
    const boletoGateway: BoletoGateway = new BoletoService();
    this.processDebts = new DefaultProcessDebts(
      debtGateway,
      boletoGateway,
      emailGateway
    );
  }

  getProcessDebts(): ProcessDebts {
    return this.processDebts;
  }
}
