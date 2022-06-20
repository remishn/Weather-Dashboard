var baseUrl = "https://api.openweathermap.org/data/2.5/weather?"
var apiKey = "ca2963db17af18af45304b6b90b9de79"
var today = moment().format("L")
var searchHistoryList = []


async function getWeather (cityName) {

    var url = baseUrl + "q=" + cityName + "&" + "appid=" + apiKey
    console.log(url)

    var response = await fetch(url)

    var weatherData = await response.json()

    return weatherData
}

async function searchCityWeather () {
    var cityName = $("#cityname").val()

    var weatherData = await getWeather(cityName)
    console.log(weatherData)

    var d = new Date(weatherData.dt * 1000) 
    var month = d.getMonth() + 1
    var date = d.getDate()
    var year = d.getFullYear()

    
    var currentCityName = weatherData.name
    var currentDate = month + "/" + date + "/" + year

    var temp = weatherData.main.temp 
    var wind = weatherData.wind.speed
    var humidity = weatherData.main.humidity

    $("#current-city-name").html(currentCityName + " " + currentDate)

    $("#temp").html("temp: " + temp)
    $("#wind").html("wind: " + wind)
    $("#humidity").html("humidity: " + humidity)
   
    // 
} 

$("#search-city").on("click", searchCityWeather)
