
var apiKey = "ca2963db17af18af45304b6b90b9de79"
var today = moment().format("L")
var searchHistoryList = []


async function getLocation (cityName) {
    var baseLocationURL = "https://api.openweathermap.org/geo/1.0/direct"

    var URL = baseLocationURL + "?q=" + cityName + "&" + "appid=" + apiKey

    var response = await fetch(URL)

    var locationDataList = await response.json()

    return locationDataList[0]
}


async function getWeather (lat, lon) {

    var baseUrl = "https://api.openweathermap.org/data/2.5/onecall?"

    var url = baseUrl + "lat=" + lat + "&" + "lon=" + lon + "&" + "units=imperial" + "&" + "appid=" + apiKey
    console.log(url)

    var response = await fetch(url)

    var weatherData = await response.json()

    return weatherData
    

}

function createWeatherEL(dailyWeather) {
    var weatherCardEl = $("<div>").addClass("weather-card")
    
    var date = new Date(dailyWeather.dt * 1000)
    var m = date.getMonth() + 1
    var d = date.getDate()
    var y = date.getFullYear()

    var iconCode = dailyWeather.weather[0].icon
    var iconURl = "https://openweathermap.org/img/w/" + iconCode + ".png"

    var weatherDateEl = $("<div>").addClass("weather-card-date").html(m + "/" + d + "/" + y)
    var weatherIconEl = $("<img>").addClass("weather-card-icon").attr("src", iconURl)

    var weatherTempEl = $("<div>")
        .addClass("weather-card-temp")
        .html("Temp: " + dailyWeather.temp.day)

    var weatherWindEl = $("<div>")
        .addClass("weather-card-wind")
        .html("Wind: " + dailyWeather.wind_speed)

    var weatherHumidityEl = $("<div>")
        .addClass("weather-card-humidity")
        .html("Humidity: " + dailyWeather.humidity + "%")    

    $(weatherCardEl)
        .append(weatherDateEl)
        .append(weatherIconEl)
        .append(weatherTempEl)
        .append(weatherWindEl)
        .append(weatherHumidityEl)

    return weatherCardEl
    
}

async function renderWeatherDashboard(cityName) {
    var locationData = await getLocation(cityName)

    var weatherData = await getWeather(locationData.lat, locationData.lon)
    console.log(weatherData)

    var iconCode = weatherData.current.weather[0].icon
    var iconURL = "https://openweathermap.org/img/w/" + iconCode + ".png"
    
    var temp = weatherData.current.temp 
    var wind = weatherData.current.wind_speed
    var humidity = weatherData.current.humidity
    var uvIndex = weatherData.current.uvi




    $("#current-city-name").html(cityName + " " + today)

    $("#current-weather-icon").attr("src", iconURL)

    $("#temp").html("Temp: " + temp + " °F" )
    $("#wind").html("Wind: " + wind + " MPH")
    $("#humidity").html("Humidity: " + humidity + " %")
    $("#uv-index").html("UV Index: " + uvIndex)

    if (uvIndex >= 0 && uvIndex <= 2) {
        $("#uv-index").css("background-color" ,"green")
    }
    else if (uvIndex >= 3 && uvIndex <= 7) {
        $("#uv-index").css("background-color" , "orange")
    }
    else {
        $("#uv-index").css("background-color" , "red")
    }


    for (var i = 1; i < 6; i++) {
        var dailyWeather = weatherData.daily[i]
        var dailyWeatherEl = createWeatherEL(dailyWeather)
    
        $("#five-day").append(dailyWeatherEl)
               
    }
}

function searchCityWeatherHistory(event) {
    renderWeatherDashboard(event.target.dataset.cityname)
    
    $("#five-day").empty();
}

async function searchCityWeather () {
    var cityName = $("#cityname").val()

    if (!searchHistoryList.includes(cityName)) {
        searchHistoryList.push(cityName)

        var newBtn = $("<button>")
            .addClass("search-history-button")
            .click(searchCityWeatherHistory)
            .attr("data-cityname", cityName)
            .html(cityName)

        $("#search-history").append(newBtn)

        localStorage.setItem("city name", JSON.stringify(searchHistoryList));
        
        $("#five-day").empty();
    }

    renderWeatherDashboard(cityName)  
    $("#five-day").empty()    
        
} 

$("#search-city").on("click", searchCityWeather)
