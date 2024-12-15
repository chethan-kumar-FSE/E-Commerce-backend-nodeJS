const express = require("express");
const router = express.Router();

router.post("/products", async (req, res) => {
  console.log("new route -added");
});
