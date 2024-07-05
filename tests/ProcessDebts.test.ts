import request from "supertest";
import path from "path";
import { DefaultFactory, Factory } from "../src/api/factory.js";
import { getApp } from "../src/api/app.js";
import {
  BoletoGateway,
  DebtGateway,
  EmailGateway,
  SendEmailInput,
} from "../src/core/gateway/index.js";
import {
  DefaultProcessDebts,
  ProcessDebts,
} from "../src/core/usecase/ProcessDebts.js";
import { DebtService } from "../src/provider/debt/DebtService.js";
import { BoletoService } from "../src/provider/boleto/BoletoService.js";

describe("ProcessDebts", () => {
  it("should upload a file successfully", async () => {
    // Arrange
    const mockedSendEmail = jest.fn();

    const sendEmail = jest
      .fn()
      .mockImplementation((input: SendEmailInput) => mockedSendEmail(input.to));

    const debtGateway: DebtGateway = new DebtService();
    const boletoGateway: BoletoGateway = new BoletoService();
    const emailGateway: EmailGateway = {
      sendEmail,
    };

    const processDebts: ProcessDebts = new DefaultProcessDebts(
      debtGateway,
      boletoGateway,
      emailGateway
    );
    const factory: Factory = {
      getProcessDebts: () => processDebts,
    };
    const app = getApp(factory);

    //Act
    const response = await request(app)
      .post("/debts")
      .attach("input", path.join(__dirname, "test-file.csv"));

    expect(response.statusCode).toBe(200);
    expect(mockedSendEmail).toHaveBeenCalledWith("janet95@example.com");
    expect(mockedSendEmail).toHaveBeenCalledWith("linmichael@example.com");
  });

  it("should return 400 if no file is uploaded", async () => {
    // Arrange
    const app = getApp(new DefaultFactory());

    // Act
    const response = await request(app).post("/debts");

    // Assert
    expect(response.statusCode).toBe(400);
    expect(response.text).toBe("No file uploaded");
  });
});
