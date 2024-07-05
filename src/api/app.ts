import express from "express";
import multer from "multer";
import { Factory } from "./factory.js";
import { parseDebtsFile } from "./util/parseDebtsFile.js";

export function getApp(factory: Factory) {
  const app = express();
  const upload = multer();

  const processDebts = factory.getProcessDebts();

  app.post("/debts", upload.single("input"), async (req, res) => {
    const file = req.file;
    if (!file) {
      res.status(400);
      res.send("No file uploaded");
      return;
    }
    const fileContent = file.buffer.toString("utf-8");
    const debtInputs = parseDebtsFile(fileContent);
    await processDebts.execute({
      debts: debtInputs,
    });
    res.status(200);
    res.end();
  });

  return app;
}
