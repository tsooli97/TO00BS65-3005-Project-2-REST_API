const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const apiRouter = require("./routes/apiRouter");

app.use(express.json());
app.use(
  cors({
    origin: "https://to00bs65-3005-project-3-react-front-end.onrender.com",
  })
);

app.use("/api", apiRouter);

app.use((err, req, res, next) => {
  console.log(err);
  if (err.name === "CastError") {
    return res
      .status(400)
      .json({ message: "Provided ID is of invalid format" });
  }

  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ message: "Bad JSON" });
  }
  res.status(500).json({ message: "Server Error" });
});

app.use((req, res) => {
  res.status(404).json({ message: "False route" });
});

const mongoDB = process.env.DB_CONNECT_STRING;

main();
async function main() {
  try {
    await mongoose.connect(mongoDB);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log("Error:", err);
  }
}

app.listen(3000, () => {
  console.log("Listening in on port 3000..");
});
