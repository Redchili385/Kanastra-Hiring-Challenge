import { Debt } from "../entity/Debt.js";
import { BoletoGateway } from "../gateway/BoletoGateway.js";
import { DebtGateway } from "../gateway/DebtGateway.js";
import { EmailGateway } from "../gateway/EmailGateway.js";

export interface ProcessDebtsInput {
  debts: DebtInput[];
}

export interface DebtInput {
  name: string;
  governmentId: string;
  email: string;
  debtAmount: string;
  debtDueDate: string;
  debtId: string;
}

export interface ProcessDebts {
  execute(input: ProcessDebtsInput): Promise<void>;
}

export class DefaultProcessDebts {
  constructor(
    private readonly debtGateway: DebtGateway,
    private readonly boletoGateway: BoletoGateway,
    private readonly emailGateway: EmailGateway
  ) {}

  async execute(input: ProcessDebtsInput): Promise<void> {
    const debts = input.debts.map(this.getDebtByDebtInput);

    for (const debt of debts) {
      await this.processDebt(debt);
    }
  }

  private async processDebt(debt: Debt): Promise<void> {
    if (await this.debtGateway.getDebtById(debt.id)) {
      return;
    }

    const boletoBlob = await this.boletoGateway.generateBoleto(debt);
    await this.emailGateway.sendEmail({
      to: debt.clientEmail,
      subject: "Your boleto",
      body: "Here is your boleto",
      attachments: [boletoBlob],
    });

    await this.debtGateway.saveDebt(debt);
  }

  private getDebtByDebtInput(debtInput: DebtInput): Debt {
    return {
      id: debtInput.debtId,
      clientName: debtInput.name,
      clientGovernmentId: debtInput.governmentId,
      clientEmail: debtInput.email,
      ammount: Number(debtInput.debtAmount),
      dueDate: new Date(debtInput.debtDueDate),
    };
  }
}
