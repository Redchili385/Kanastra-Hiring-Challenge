import { Debt } from "../../entity/Debt.js";
import { BoletoGateway } from "../../gateway/BoletoGateway.js";
import { DebtGateway } from "../../gateway/DebtGateway.js";
import { EmailGateway, SendEmailInput } from "../../gateway/EmailGateway.js";
import {
  DefaultProcessDebts,
  ProcessDebts,
  ProcessDebtsInput,
} from "../ProcessDebts.js";

describe("ProcessDebts", () => {
  it("should process debts, parsing input and calling all the necessary gateway functions", async () => {
    // Arrange
    const processDebtInput: ProcessDebtsInput = {
      debts: [
        {
          name: "John Doe A.",
          governmentId: "123456789",
          email: "john.doe@mail.com",
          debtAmount: "1000",
          debtDueDate: "2022-12-31",
          debtId: "123",
        },
        {
          name: "John Doe B.",
          governmentId: "123456789",
          email: "john.doe@mail.com",
          debtAmount: "1000",
          debtDueDate: "2022-12-31",
          debtId: "456",
        },
      ],
    };
    const mockedSendEmail = jest.fn();

    const getDebtById = jest.fn().mockResolvedValue(null);
    const saveDebt = jest.fn();
    const generateBoleto = jest.fn().mockResolvedValue(new Blob());
    const sendEmail = jest
      .fn()
      .mockImplementation((input: SendEmailInput) => mockedSendEmail(input.to));

    const debtGateway: DebtGateway = {
      getDebtById,
      saveDebt,
    };
    const boletoGateway: BoletoGateway = {
      generateBoleto,
    };
    const emailGateway: EmailGateway = {
      sendEmail,
    };

    const processDebts: ProcessDebts = new DefaultProcessDebts(
      debtGateway,
      boletoGateway,
      emailGateway
    );

    //Act
    await processDebts.execute(processDebtInput);

    //Assert
    expect(getDebtById).toHaveBeenCalledTimes(2);
    expect(saveDebt).toHaveBeenCalledTimes(2);
    expect(generateBoleto).toHaveBeenCalledTimes(2);
    expect(sendEmail).toHaveBeenCalledTimes(2);
    expect(mockedSendEmail).toHaveBeenCalledWith("john.doe@mail.com");
  });

  it("should not call generateBoleto, sendEmail or saveDebt if the debt was already processed", async () => {
    // Arrange
    const processDebtInput: ProcessDebtsInput = {
      debts: [
        {
          name: "John Doe A.",
          governmentId: "123456789",
          email: "john.doe@mail.com",
          debtAmount: "1000",
          debtDueDate: "2022-12-31",
          debtId: "123",
        },
      ],
    };
    const debt: Debt = {
      id: "123",
      clientName: "John Doe A.",
      clientGovernmentId: "123456789",
      clientEmail: "john.doe@mail.com",
      ammount: 1000,
      dueDate: new Date("2022-12-31"),
    };

    const getDebtById = jest.fn().mockResolvedValue(debt);
    const saveDebt = jest.fn();
    const generateBoleto = jest.fn().mockResolvedValue(new Blob());
    const sendEmail = jest.fn();

    const debtGateway: DebtGateway = {
      getDebtById,
      saveDebt,
    };
    const boletoGateway: BoletoGateway = {
      generateBoleto,
    };
    const emailGateway: EmailGateway = {
      sendEmail,
    };

    const processDebts: ProcessDebts = new DefaultProcessDebts(
      debtGateway,
      boletoGateway,
      emailGateway
    );

    //Act
    await processDebts.execute(processDebtInput);

    //Assert
    expect(getDebtById).toHaveBeenCalledTimes(1);
    expect(generateBoleto).toHaveBeenCalledTimes(0);
    expect(sendEmail).toHaveBeenCalledTimes(0);
    expect(saveDebt).toHaveBeenCalledTimes(0);
  });
});
