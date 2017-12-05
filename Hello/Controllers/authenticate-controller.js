var dbObject;
var MongoClient = require('mongodb').MongoClient;
MongoClient.connect("mongodb://localhost:27017/Valuemomentum", function(err, db) {
    if(err) {
    console.dir('Connection error');    
    }
    else
    {
        console.dir('Connection successful');
        dbObject=db;
    }
});
module.exports.authenticate=function(req,res){
    var userID=req.body.UserID;
    var password=req.body.password;
    var query={name:userID};
    dbObject.collection("Login").find(query).toArray(function(err, result) {
      if (err) {
        res.json({
        status:false,
        message:err
    });
}
      if(result[0].password == password)
      {
        res.json({
            status:true,
            message:'successfully authenticated the user'
        });
      }
      else
      {
        res.json({
            status:false,
            message:'Invalid Password'
        });
      }
      dbObject.close();
    });
}