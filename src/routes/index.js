const express = require("express");
const router = express.Router();

const Task = require("../models/task");

router.get("/", async (req, res) => {
  const task = await Task.find();
  res.render("index", {
    tasks: task
  });
});

router.post("/add", async (req, res) => {
  const task = new Task(req.body);
  await task.save();
  res.redirect("/");
});

router.get("/turn/:id", async (req, res) => {
  const id = req.params.id;
  const task = await Task.findById(id);
  task.status = !task.status;
  await task.save();
  res.redirect("/");
});

router.get("/edit/:id", async (req, res) => {
  const id = req.params.id;
  const task = await Task.findById(id);
  res.render("edit", {
    task: task
  });
});

router.get("/delete/:id", async (req, res) => {
  const id = req.params.id;
  await Task.remove({ _id: id });
  res.redirect("/");
});

module.exports = router;
