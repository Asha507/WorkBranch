var express=require("express");
var bodyParser=require('body-parser');
var app = express();

var authenticateController=require('./controllers/authenticate-controller');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.post('/api/authenticate',authenticateController.authenticate);
app.listen(8012);