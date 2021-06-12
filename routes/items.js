const express = require("express");
const router = express.Router();
const Item = require("../models/items");

//@route  Get api/numbers
//@desc   Get All numbers
//@access Public
router.get("/", (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then((items) => res.json(items));
});

//@route  Delete api/numbers
//@desc   Delete an numbers
//@access Public
router.delete("/:id", (req, res) => {
  Item.findById(req.params.id)
    .then((item) => item.remove().then(() => res.json({ Success: true })))
    .catch((err) => res.status(404).json({ Success: false }));
});

//@route  POST api/numbers
//@desc   Create an numbers
//@access Public
router.post("/", (req, res) => {
  const newItem = new Item({
    name: req.body.name,
    question: req.body.question,
    answer: req.body.answer,
  });
  newItem.save().then((item) => res.json(item));
});

module.exports = router;
