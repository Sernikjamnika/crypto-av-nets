const express = require("express");
const router = express.Router();
const newGroup = require('../controllers/Group');


/* GET home page. */
router.post("/", async (req, res, next) => {
  console.log(req.body)
  const {body} = req;
  const {question, n} = body;

  const group = await newGroup(question, n);
  
  res.json(group)
});

module.exports = router;
