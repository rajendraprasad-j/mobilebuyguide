var express=require('express');
var app=express();
var routes=require('./routes/routes.js');


routes(app);

var port = process.env.PORT || 8085;

app.listen(port,function(err){
  if(err){
      console.log(err);
  }else{
    console.log("Server runing");
  }
});
