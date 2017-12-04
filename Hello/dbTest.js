var connection=require('./config');
var db=connection.Connect();
var query={name:"asha"};
    db.collection("Login").find(query).toArray(function(err, result) {
      if (err) throw err;
      console.log(result[0].name);
      db.close();
    });

// var MongoClient = require('mongodb').MongoClient;

// // Connect to the db
// MongoClient.connect("mongodb://localhost:27017/Valuemomentum", function(err, db) {
//   if(err) {
//     return console.dir(err);
//   }
//   else
//   {  
//     var query={name:"asha"};
//     db.collection("Login").find(query).toArray(function(err, result) {
//       if (err) throw err;
//       console.log(result[0].name);
//       db.close();
//     });
//   }
// });