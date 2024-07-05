import { Debt } from "../entity/Debt.js";

export interface BoletoGateway {
  generateBoleto(debt: Debt): Promise<Blob>;
}
