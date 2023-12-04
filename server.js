/* Config */
require("dotenv").config({ path: "./.env" });

const { createInitAdmin } = require("./Utils/dataInit");

/* MongoDb */
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_DEV, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("MongoDb Connected");
    createInitAdmin();
  })
  .catch((err) => console.log("MondoDb Connection Error", err));

/* App */
const app = require("./app");

const PORT = process.env.PORT || 5050;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("UNHANDLED ERROR ");
  // server.close(() => {
  //   process.exit(1);
  // });
});
