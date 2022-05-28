const express = require('express');
const router = express.Router();

// Should support query params as well for filtering and sorting

// GET - /tutorials/ - Tutorial list
router.get('/', (req, res) => {
  res.send('GET /tutorials');
});

// GET - /tutorials/:id - Tutorial show
router.get('/:uuid', (req, res) => {
  res.send('GET /tutorials/:uuid');
});

// PUT - /tutorials/:id - Tutorial update
router.put('/:uuid', (req, res) => {
  res.send('PUT /tutorials/:uuid');
});

// POST - /tutorials/ - Tutorial create
router.post('/', (req, res) => {
  res.send('POST /tutorials');
});

// DELETE - /tutorials/mass_delete - Delete all tutorials
router.delete('/mass_delete', (req, res) => {
  res.send('DELETE /tutorials/mass_delete');
});

// DELETE - /tutorials/:id - Tutorial delete
router.delete('/:uuid', (req, res) => {
  res.send('DELETE /tutorials/:uuid');
});

module.exports = router;
