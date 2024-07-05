import { getApp } from "./app.js";
import { DefaultFactory } from "./factory.js";

const factory = new DefaultFactory();

const app = getApp(factory);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
