const express = require("express");
const router = express.Router();

const Store = require("../controllers/Store");
const Room = require("../controllers/Room");

router.post("/", async (req, res) => {
  try {
    const { body } = req;
    const { question, n } = body;

    const room = await Room.create(n, question);
    Store.save(room.id, room);

    res.json(room);
  } catch (error) {
    console.error(error);
    res.status(400).send(error.message);
  }
});

router.get("/:id", (req, res) => {
  try {
    const id = req.params.id;
    res.json(Store.get(id));
  } catch (error) {
    console.error(error);
    res.status(400).send(error.message);
  }
});

router.post("/:id/join", (req, res) => {
  try {
    const id = req.params.id;
    const pubKey = parseInt(req.body.pubKey); // g^{x_i}
    const room = Room.join(id, pubKey);
    res.json(room);
  } catch (error) {
    console.error(error);
    res.status(400).send(error.message);
  }
});

router.post("/:id/vote", (req, res) => {
  try {
    const id = req.params.id;
    const vote = parseInt(req.body.vote); // g^{c_i * y_i}
    const room = Room.vote(id, vote);
    res.json(room);
  } catch (error) {
    console.error(error);
    res.status(400).send(error.message);
  }
});

module.exports = router;
