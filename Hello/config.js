var dbObject;
module.exports.Connect=function()
{
   var MongoClient = require('mongodb').MongoClient;
    MongoClient.connect("mongodb://localhost:27017/Valuemomentum", function(err, db) {
        if(err) {
        console.dir('Connection error');    
        }
        else
        {
            console.dir('Connection successful');
            dbObject= db;
        }
    });

    return dbObject;
}
