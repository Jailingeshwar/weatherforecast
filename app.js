const express=require("express");
const https=require("https");
const bodyparser=require("body-parser");
const app=express();
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));


app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");


})
app.post("/",function(req,res){
  const query =req.body.cityName;
  const apid="df200bd1955c747e1f5c7bbe34a69dc4";
  const url="https://api.openweathermap.org/data/2.5/weather?appid="+apid+"&q="+query+"&units=metric"
  https.get(url,function(response){
    console.log(response.statusCode);
    response.on('data',function(noob){
      const weatherData=JSON.parse(noob);
      const temp=weatherData.main.temp;
      const des=weatherData.weather[0].description;
      const icon=weatherData.weather[0].icon
      const imageUrl="http://openweathermap.org/img/wn/"+icon+"@2x.png";
      console.log(temp);
      console.log(des);
      console.log(icon);
      res.write("<p>The Weather is currently "+des+"</p>");
      res.write("<h1>The temperature in "+query+" is "+temp+"c</h1>");
      res.write("<img src="+imageUrl+">");
      res.send();

    })

  })
})

app.listen(3000,function(){
   console.log("server is running on port 3000");
})
