import { Debt } from "../../core/entity/Debt.js";
import { DebtGateway } from "../../core/gateway/DebtGateway.js";

export class DebtService implements DebtGateway {
  async getDebtById(id: string): Promise<Debt | null> {
    console.log(`Debt ${id} not found`);
    return null;
  }

  async saveDebt(debt: Debt): Promise<void> {
    console.log(`Debt ${debt.id} saved`);
  }
}
