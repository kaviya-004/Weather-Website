const form=document.getElementById("weather-form");
const cityInput=document.getElementById("city-input");
const result=document.getElementById("result");
const errorEl=document.getElementById("error");
const loc=document.getElementById("location");
const temp=document.getElementById("temp");
const desc=document.getElementById("description");
const feels=document.getElementById("feels");
const hum=document.getElementById("humidity");
const icon=document.getElementById("icon");

form.addEventListener("submit",async(e)=>{
 e.preventDefault();
 const city=cityInput.value.trim();
 if(!city) return;

 errorEl.textContent="";
 result.classList.add("hidden");

 try{
   const res=await fetch(`/api/weather?city=${city}`);
   const d=await res.json();
   if(!res.ok) throw new Error(d.error);

   loc.textContent=d.city+", "+d.country;
   temp.textContent=d.temp+"°C";
   desc.textContent=d.description;
   feels.textContent="Feels like "+d.feels_like+"°C";
   hum.textContent="Humidity "+d.humidity+"%";
   icon.src=`https://openweathermap.org/img/wn/${d.icon}@2x.png`;

   result.classList.remove("hidden");
 }catch(err){
   errorEl.textContent=err.message;
 }
});