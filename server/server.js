const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const API_PORT = 3000;
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const router = express.Router();

const database = ["use to do app", "use it even more"];

// GET request that returns the entire to-do list

router.get("/todo/get/", (req, res) => {
  return res.json({
    success: true,
    data: database
  });
});

// POST request that registers a new to-do

router.post("/todo/post/", (req, res) => {
  console.log("putting data");
  database.push(req.body.todo);
  return res.json({
    success: true
  });
});

// append /api for our http requests
app.use("/api", router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
