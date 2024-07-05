import { parse } from "csv-parse/sync";
import { DebtInput } from "../../core/usecase/ProcessDebts.js";

export function parseDebtsFile(fileContent: string): DebtInput[] {
  return parse(fileContent, { columns: true });
}
