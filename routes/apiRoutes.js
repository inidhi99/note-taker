const router = require('express').Router();
const store = require('../db/store');

// getting the notes 
router.get('/notes', (req, res) => {
    store
    // getting notes 
        .getNotes()
        .then((notes)=> { 
            return res.json(notes)
        })
        //catching errots 
        .catch((err)=> res.status(500).json(err))
    })
  
  //adding notes to the file (json)
router.post('/notes', (req, res) => {
    store 
    // passing the note througth json data
        .addNote(req.body)
        // adding a new note 
        .then((note)=> res.json(note))
        //catching errots 
        .catch((err)=> res.status(500).json(err))
})

  // delete 
router.delete('/notes/:id', (req, res)=> {
    store 
    // only passing ID throught the function
        .removenote(req.params.id)
        // return json response after removing the ID (withouut throught errors )
        .then(()=> res.json({ ok:true}))
         //catching errots 
         .catch((err)=> res.status(500).json(err))
})

module.exports = router;