require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const { port } = require("./config/key");
const routes = require("./routes");
const cors = require("cors");
const passport = require("passport");

const url =
  "mongodb+srv://sprung:D9LgCkLBVM4UFfED@cluster0.0wtbb.mongodb.net/?retryWrites=true&w=majority";
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(passport.initialize());

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected!"))
  .catch((err) => console.log(err));

require("./config/passport");
app.use(routes);

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
