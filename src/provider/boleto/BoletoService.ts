import { Debt } from "../../core/entity/Debt.js";
import { BoletoGateway } from "../../core/gateway/BoletoGateway.js";

export class BoletoService implements BoletoGateway {
  async generateBoleto(debt: Debt): Promise<Blob> {
    console.log(`Boleto generated for debt ${debt.id}`);
    return new Blob();
  }
}
