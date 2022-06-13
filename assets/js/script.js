var baseUrl = "https://api.openweathermap.org/data/2.5/weather?"
var apiKey = "ca2963db17af18af45304b6b90b9de79"
var today = moment().format("L")
var searchHistoryList = []


async function getWeather (cityName) {

    var url = baseUrl + "q=" + cityName + "&" + "appid=" + apiKey
    console.log(url)

    var response = await fetch(url)

    var weatherData = await response.json()

    console.log(weatherData)
}

function searchCityWeather () {
    var cityName = $("#cityname").val()

    var weatherData = getWeather(cityName)


} 

$("#search-city").on("click", searchCityWeather)
