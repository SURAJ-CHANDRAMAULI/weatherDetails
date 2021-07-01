const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));


app.get("/", function(req,res){
  res.sendFile(__dirname+"/index.html");
})

app.post("/", function(req,res){

var cityname= req.body.cityName;
const url = "https://api.openweathermap.org/data/2.5/weather?q="+cityname+"&appid=659ac9832157d0be1a0082d2dbfdf9ea&units=metric";

https.get(url, function(response){


response.on("data", function(data){
const weatherData = JSON.parse(data);
const weatherDescription = weatherData.weather[0].description;
const temp = weatherData.main.temp
res.write("<p>The weather is currently "+weatherDescription+"</p>")
res.write("<h1>The temperature in "+cityname+"is "+temp+"</h1>")
const icon = weatherData.weather[0].icon;
const imgUrl = "https://openweathermap.org/img/wn/"+icon+"@2x.png";
res.write("<img src="+imgUrl+">");
  res.send();
})


})


});







app.listen(3000, function(){
  console.log("server is running on port 3000");
});
