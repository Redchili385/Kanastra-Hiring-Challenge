import { parseDebtsFile } from "../parseDebtsFile.js";

describe("parseDebtsFile", () => {
  it("should parse a CSV file content into an array of DebtInput", () => {
    // Arrange
    const fileContent = `name,governmentId,email,debtAmount,debtDueDate,debtId
Elijah Santos,9558,janet95@example.com,7811,2024-01-19,ea23f2ca-663a-4266-a742-9da4c9f4fcb3
Samuel Orr,5486,linmichael@example.com,5662,2023-02-25,acc1794e-b264-4fab-8bb7-3400d4c4734d`;
    const expectedDebtInput = [
      {
        name: "Elijah Santos",
        governmentId: "9558",
        email: "janet95@example.com",
        debtAmount: "7811",
        debtDueDate: "2024-01-19",
        debtId: "ea23f2ca-663a-4266-a742-9da4c9f4fcb3",
      },
      {
        name: "Samuel Orr",
        governmentId: "5486",
        email: "linmichael@example.com",
        debtAmount: "5662",
        debtDueDate: "2023-02-25",
        debtId: "acc1794e-b264-4fab-8bb7-3400d4c4734d",
      },
    ];

    // Act
    const result = parseDebtsFile(fileContent);

    // Assert
    expect(result).toStrictEqual(expectedDebtInput);
  });
});
