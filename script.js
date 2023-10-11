// Get element by ID
const containerMain = document.getElementById("containerMain");
const currentTemperature = document.getElementById("currentTemperature");
const currentCity = document.getElementById("currentCity");
const currentWeatherType = document.getElementById("currentWeatherType");

// API URL
const url = "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=903ddcd89f258c2d7a183180e626b811";

const fetchWeatherData = () => {
    fetch(url)

        .then((response) => {
            return response.json()
        })
        .then((weatherData) => {
            console.log("console", weatherData)

            // Save data in variables
            const cityTemp = Math.round(weatherData.main.temp * 10) / 10;
            const cityName = weatherData.name;
            const weatherType = weatherData.weather.map((weatherType) => weatherType.description);

            // Display values in HTML
            currentTemperature.textContent = cityTemp;
            currentCity.textContent = cityName;
            currentWeatherType.textContent = weatherType;



        })
        .catch((error) => {
            console.log("Caught Error", error);
            containerMain.innerHTML = "<h1>Failed to load, please try again.</h1>"
        })
}

fetchWeatherData();
