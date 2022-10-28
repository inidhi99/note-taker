const router = require('express').Router();
const path = require('path');

// GET Route for home page 
router.get('/notes', (req, res,) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'))
  })
  
// GET Route for index page
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname,  '../public/index.html'))
  })
  

module.exports = router;