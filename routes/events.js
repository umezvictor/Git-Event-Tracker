//This file contains all routes
const express = require('express');
const router = express.Router();

//nedb for data persistence
const Datastore = require('nedb');

//init nedb. database.db is the database file
const db = new Datastore({filename: 'database.db', timestampData: true});

//load database
db.loadDatabase();


//Route for adding new events
//note -- an actor can create more than one event, but has to assign different event ids to them
router.post('/events', (req, res) => {

    const data = req.body;
    //check if event id exists
    db.findOne({ id: data[0].id }, (err, doc) => {
        if(!doc){
            //if event does not exist -- add new event
            db.insert(data);
            res.status(201).json({msg: "Event added successfully"});
        }else{
            //if event exists
            res.status(400).json({msg: "Event already exists"});
        }
      });
});


//Route for erasing all the events
router.delete('/erase', (req, res) => {

    db.count({}, (err, count) => {
      //check if any event exists in the database
        if(count <= 0){
            res.status(204).json({msg: "No event found"});
          }else{
              //delete all events from db
              db.remove({}, { multi: true }, (err, numRemoved) => {
              res.status(200).json({msg: `All ${numRemoved} events have been deleted`});
                });
          }
      });   
});


//Route for returning all the events: 
router.get('/events', (req, res) => {

    db.find({}, (err, docs) => {
      //Check if any data was returned
      if(docs.length === 0){
        res.status(204).json({msg: "No event found"});
      }else{
        //docs (json array) is sorted in ascending order of event id
        res.status(200).send(docs.sort((a, b) => (a.id > b.id) ? 1 : -1));//id here refers to the event id
      }
    });
});


//Route for returning the event records filtered by the actor ID: 
router.get('/events/actors/:id', (req, res) => {

    const actorId = req.params.id;
    //req.params.id is of type string, hence the conversion to number, else won't fetch records
    const convertedActorId = parseInt(actorId);
  
    db.find({ "actor.id" : convertedActorId}, (err, docs) => {
      if(docs.length === 0){
        res.status(404).json({msg: "Actor not found"});
      }else{
       // return events in ascending order of event id
        res.status(200).send(docs.sort((a, b) => (a.id > b.id) ? 1 : -1));//id here refers to the event id
      }
    });
 
});


//Route for updating the avatar URL of the actor
router.put('/actors', (req, res) => {
  
    const data = req.body;
    
    const actorId = data[0].actor.id;
    const convertedActorId = parseInt(actorId);//convert to number
      
    //check if actor with the actor id exists
    db.find({ "actor.id" : convertedActorId}, (err, docs) => {
        if(docs.length === 0){
            res.status(404).json({msg: "Actor not found"});

        }else if(Object.keys(data[0].actor).length > 2){
            //if there are other fields being updated 
            //only two fields are allowed in the actor json: id and avatar_url
            res.status(400).json({msg: "Sorry, you can not update more than one field"});
        }else{
            //all ok
            //note: if multi is set to false, it will update only document
            db.update({ "actor.id": data[0].actor.id}, { $set: { 'actor.avatar_url': data[0].actor.avatar_url } }, { multi: true }, function (err, numReplaced) {
              res.status(200).json({msg: "Avatar url updated successfully"});
            });
        }
    });
});


//Route for Returning the actor records ordered by the total number of events -- see Readme.md for more info 
//status -- incomplete
router.get('/actors', (req, res) => {

    // You can mix normal queries, comparison queries and logical operators
    db.find({}, (err, docs) => {
        //sort by descending number of event id for each actors records
    const data = docs.sort((a, b) => (a.id < b.id) ? 1 : -1);//returns descending of event id 
    const newdata = data.sort((a, b) => (a.actor.id > b.actor.id) ? 1 : -1);//returns events associated with each actor

    res.status(200).send(newdata);
  });
});


//Route for returning the actor records ordered by the maximum streak: 
//status -- incomplete
router.get('/actors/streak', (req, res) => {
    db.find({}, (err, docs) => {
      const data = docs.sort((a, b) => (a.createdAt < b.createdAt) ? 1 : -1);//returns descending of event id 
     
      res.status(200).send(data);
    });
});


module.exports = router;

