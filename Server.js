
// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 8001;
const MONGOBD_URL = process.env.MONGODB_URL;

mongoose
  .connect(MONGOBD_URL, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
  })
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log(err));

mongoose.connection.on("connected", () => {
  console.log("DB connected");
});

app.use(cors());
app.use(bodyParser.json());

app.use(require("./routes/user_route"));
// app.use(require("./routes/quiz_route"));

// app.get("/getQuestion", async (req, res) => {
//   try {
//     const questions = await QuestionModel.find();
//     res.json(questions);
//   } catch (error) {
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

app.get('/Signin', (req, res) => {
    res.send('Signin page is working!');
});

// });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
