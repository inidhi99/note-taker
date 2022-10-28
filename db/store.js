// declare all the app function 
const util = require('util');
const fs = require('fs');
// find notes by specific id 
const uuid = require('uuid/v1');
// reading the content of the db.json data 
const readFileAsync = util.promisify(fs.readFile);
// writing new notes to the db.json data 
const writeFileAsync = util.promisify(fs.writeFile);


// get note function 
class Store {
    read(){
        // default character types 
        return readFileAsync("db/db.json", "utf8")
    }
    write(note){
        return writeFileAsync("db/db.json", JSON.stringify(note))
    }
    
    getNotes(){
        return this.read().then((notes)=> {
            let parseNotes; 
            // putting all the object notes in one array 
            try{
                parseNotes = [].concat(JSON.parse(notes))
            }
            // Catch an error as the empty array 
            catch(err){
                parseNotes = []
            }
            return parseNotes;
        } )
    }

    // destructing 
    addNote(note){
        const { title, text } = note;
        if (!title || !text ) {
            throw new Error ("title and text cant be blank ")
        }
        // creating unique id for each object 
        const NewNote = { title, text, id: uuid() }
        // adding new notes to the previous list 
        return this.getNotes() 
            .then((notes) => [...notes, NewNote] )
            // rewritting with updated notes 
            .then ((updatedNotes) => this.write(updatedNotes))
            // writting the new notes
            .then (() => NewNote)
    }

    removenote(id){
        return this.getNotes() 
        // filtering out all the notes without iD 
            .then((notes) => notes.filter((note)=> note.id !== id))
            // writting the filtered notes 
            .then((filterNotes)=> this.write(filterNotes))
    }
}


module.exports = new Store();


