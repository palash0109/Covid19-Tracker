var request = require("request");
var express = require("express");
var app = express();
app.set("view engine","ejs");
app.use(express.static("public"));
//=========
//ROUTES
//=========
app.get("/", function(req, res){
    request("https://api.rootnet.in/covid19-in/unofficial/covid19india.org/statewise", function(error, response, body){
        if(!error && response.statusCode==200)
        {
            parsedData = JSON.parse(body);
            res.render("home",{data: parsedData});
        }
        else{
            res.redirect("/");
        }
    })
});

app.get("/city/:id", function(req, res){
    var state = req.params.id;

    request("https://api.covid19india.org/state_district_wise.json", function(error, response, body){
        if(!error && response.statusCode==200)
        {
            parsedData = JSON.parse(body);
            // console.log(Object.keys(parsedData[state]["districtData"]).length);
            res.render("city",{data: parsedData, state: state});
        }
        else{
            res.redirect("/");
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
          if(!error && response.statusCode==200){
            parsedData = JSON.parse(body);
            res.render("country",{data: parsedData});
          }
          else{
              res.redirect("/");
          }
      });
});

app.get("/guidelines",function(req, res){
    res.render("guidelines");
});


app.listen(process.env.PORT || 3000, function(){
    console.log("server started!");
})