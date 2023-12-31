const apiKey = "69d052cf9568072312ddaa6fc7450571";
const apiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=";
const limits = "&limit=1&appid=";


const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");


const test = ""

async function checkWeather(city){
    const response = await fetch(apiUrl + city + limits + apiKey);
    var data = await response.json();

   console.log(response);

   if(typeof(data[0]) == 'undefined'){

    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
    //alert("Invalid city name")
    console.log("another message")
}
else{

    let lon = data[0].lon;
    let lat = data[0].lat;
    let units = "metric";

    let locationUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=`
    let pollutionApi = `http://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`

    const responseCity = await fetch(locationUrl +  apiKey);
    var dataFromCity = await responseCity.json();

    const responsePoluution = await fetch(pollutionApi);
    var pollutionIndex = await responsePoluution.json();

        console.log(pollutionIndex.list[0].components);

        document.querySelector(".city").innerHTML = dataFromCity.name;
        document.querySelector(".temp").innerHTML = Math.round(dataFromCity.main.temp, 0) + "°C";
        document.querySelector(".humidity").innerHTML = dataFromCity.main.humidity + " %";
        document.querySelector(".wind").innerHTML = dataFromCity.wind.speed + " m/s";
        document.querySelector(".polution").innerHTML = pollutionIndex.list[0].components.no2 + " NO2";

        let weatherCondition = dataFromCity.weather[0].main.toLowerCase();
        if (weatherCondition == "clouds"){
            weatherIcon.src = "img/clouds.png"
        }
        else if(weatherCondition == "clear"){
            weatherIcon.src = "img/clear.png"
        }
        else if(weatherCondition == "rain"){
            weatherIcon.src = "img/rain.png"
        }
        else if(weatherCondition == "drizzle"){
            weatherIcon.src = "img/drizzle.png"
        }
        else if(weatherCondition == "mist"){
            weatherIcon.src = "img/mist.png"
        }
        else if(weatherCondition == "snow"){
            weatherIcon.src = "img/snow.png"
        }


        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";

    }
}

searchBtn.addEventListener('click', ()=>{
    checkWeather(searchBox.value)
})
