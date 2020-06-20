const express = require("express");
const router = express.Router();
const newGroup = require("../controllers/Group");

/* GET home page. */
router.post("/", async (req, res, next) => {
  try {
    const { body } = req;
    const { question, n } = body;
    const group = await newGroup(question, n);
    res.json(group);
  } catch (error) {
    console.error(error);
    res.status(400).send(error.message);
  }
});

module.exports = router;
