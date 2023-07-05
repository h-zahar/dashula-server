const express = require("express");
const KPI = require("../models/kpi");

const router = express.Router();

router.get("/kpis", async (req, res) => {
  try {
    const kpis = await KPI.find();
    res.status(200).json(kpis);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
