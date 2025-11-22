const express=require("express");
const axios=require("axios");
const path=require("path");
require("dotenv").config();
const app=express();
const PORT=3000;

app.use(express.static(path.join(__dirname,"public")));

app.get("/api/weather", async (req,res)=>{
  const city=req.query.city;
  if(!city) return res.status(400).json({error:"City required"});

  try{
    const r=await axios.get("https://api.openweathermap.org/data/2.5/weather",{
      params:{ q:city, appid:process.env.OPENWEATHER_API_KEY, units:"metric" }
    });

    const d=r.data;
    res.json({
      city:d.name,
      country:d.sys.country,
      temp:d.main.temp,
      feels_like:d.main.feels_like,
      humidity:d.main.humidity,
      description:d.weather[0].description,
      icon:d.weather[0].icon
    });
  }catch(e){
    res.status(404).json({error:"City not found"});
  }
});

app.listen(PORT,()=>console.log("http://localhost:"+PORT));