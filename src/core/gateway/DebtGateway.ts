import { Debt } from "../entity/Debt.js";

export interface DebtGateway {
  getDebtById(id: string): Promise<Debt | null>;

  saveDebt(debt: Debt): Promise<void>;
}
