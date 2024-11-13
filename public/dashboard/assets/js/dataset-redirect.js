const express = require('express');
const router = express.Router();
const datasets = require('./datasets');

router.get('/:dataset', (req, res) => {
  const datasetName = req.params.dataset;
  const dataset = datasets[datasetName];
  if (dataset) {
    res.render('dataset', { dataset });
  } else {
    res.status(404).send('Dataset not found');
  }
});

module.exports = router;