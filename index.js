require("dotenv").config();
const { PORT } = require("./utils/config");
const { connectToDatabase } = require("./utils/db");
const app = require("./app");

const start = async () => {
  await connectToDatabase();

  app.listen(PORT, () => {
    console.log(`app listening port ${PORT}`);
  });
};

start();
