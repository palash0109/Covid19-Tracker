var request = require("request");
var express = require("express");
var app = express();
app.set("view engine","ejs");


//=========
//ROUTES
//=========
app.get("/", function(req, res){
    request("https://api.rootnet.in/covid19-in/stats/latest", function(error, response, body){
        if(!error && response.statusCode==200)
        {
            parsedData = JSON.parse(body);
            res.render("home",{data: parsedData});
        }
    })
});

app.get("/city/:id", function(req, res){
    var state = req.params.id;
    request("https://api.covid19india.org/state_district_wise.json", function(error, response, body){
        if(!error && response.statusCode==200)
        {
            parsedData = JSON.parse(body)
            // console.log(Object.keys(parsedData[state]["districtData"]).length);
            res.render("city",{data: parsedData, state: state});
        }
    })
})

app.get("/country",function(req, res){
    var options = {
        method: 'GET',
        url: 'https://covid-193.p.rapidapi.com/statistics',
        headers: {
          'x-rapidapi-host': 'covid-193.p.rapidapi.com',
          'x-rapidapi-key': '9e186cd79fmshb9131e922592491p13682djsnaaa5b7cd2850',
          useQueryString: true
        }
      };
      
      request(options, function (error, response, body) {
          if (error) throw new Error(error);
          parsedData = JSON.parse(body);
          res.render("country",{data: parsedData});
      });
})


app.listen(3000, function(){
    console.log("server started!")
})