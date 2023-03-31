const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/", function(req,res){
    const query = (req.body.city);
    const apiKey = "<--YOUR_API_KEY-->";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ apiKey +"&units="+ unit;

    https.get(url, function(response){

        response.on("data", function (data) { 
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDiscription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imgURL = "https://openweathermap.org/img/wn/"+ icon +"@2x.png";

            res.write("<p>The weather is currently "+ weatherDiscription +".</p>");
            res.write("<h1>The tempteture in "+ query +" is "+ temp +" degree Celcius.</h1>");
            res.write("<img src="+imgURL+">");
            res.send();
         });
    });
});

app.listen(3000, function(){
    console.log("Server running on Port:3000.");
});
