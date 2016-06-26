var express = require('express');
var app=express();
var path = require('path');
var bodyParser = require('body-parser');
app.use( bodyParser.json() );
var mongoose = require('mongoose');

mongoose.connect('localhost:27017/petDB');

var petSchema = new mongoose.Schema( {
  name: String,
  animal: String,
  age: String,
  url: String,
});

var petModels = mongoose.model( 'petModels', petSchema);

// server up
app.listen( 8080, 'localhost', function( req, res ){
  console.log( 'server listening on 8080' );
});

// base url
app.get( '/', function ( req, res ){
  console.log( 'at base url' );
  res.sendFile( path.resolve( 'views/index.html') );
});

// static folder
app.use( express.static( 'public' ) );


app.post( '/postPet', function( req, res ){
  console.log( 'in postPet assignment ' + req.body.name );
  var petAdded = {
    name: req.body.name,
    animal: req.body.animal,
    age: req.body.age,
    url: req.body.url,
   };
   console.log( 'petAdded: ' + petAdded );
//here's the magic
 var petOut = petModels( petAdded );
 console.log( 'petOut: ' + petOut.name + " " + petOut.animal );
 petOut.save();
});

//-----------------------------------

app.get( '/getPet', function( req, res ){
  petModels.find()
  .then( function( data ){
    res.send( data );
  });
});
//-----------------------------------
app.delete( '/deletePet', function ( req, res ){
  console.log( ' in delete pet, deletedPet ' );
  petSchema.remove( { _id: 'deletedPet' });
});
