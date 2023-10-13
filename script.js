// Get element by ID
const containerMain = document.getElementById("containerMain");
const currentTemperature = document.getElementById("currentTemperature");
const currentCity = document.getElementById("currentCity");
const currentWeatherType = document.getElementById("currentWeatherType");
const sunTime = document.getElementById("sunTime");

// API URL
const url = "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=903ddcd89f258c2d7a183180e626b811";

const fetchWeatherData = () => {
    fetch(url)

        .then((response) => {
            return response.json()
        })
        .then((weatherData) => {
            // Save data in variables
            const cityTemp = Math.round(weatherData.main.temp * 10) / 10;
            const cityName = weatherData.name;
            const weatherType = weatherData.weather.map((weatherType) => weatherType.description);
            const weatherTypeById = weatherData.weather.map((weatherType) => weatherType.id);
            const sunRise = new Date(weatherData.sys.sunrise * 1000);
            const sunSet = new Date(weatherData.sys.sunset * 1000);
            console.log("weathertyp", weatherTypeById)
            // Display values in HTML
            currentTemperature.textContent = cityTemp;
            currentCity.textContent = cityName;
            currentWeatherType.textContent = weatherType;
            sunTime.innerHTML = `<p>sunrise</p>
            <p>${sunRise.getHours()}:${sunRise.getMinutes()}</p>
            <p>sunset</p><p>${sunSet.getHours()}:${sunSet.getMinutes()}</p>`;



            /*--CURRENT WEATHER ICON--*/
            const currentWeather = ((weatherType) => {
                let addImage = document.createElement("img");
                if (weatherType == 800) {
                    addImage.src = "./design/design1/img/sun.png";
                    addImage.alt = "sun";
                    addImage.className = "sun"
                    containerMain.appendChild(addImage);
                } else if (weatherType >= 801 && weatherType <= 802) {
                    addImage.src = "./design/design1/img/sun-cloud.png";
                    addImage.alt = "sun and clouds";
                    addImage.className = "sun-cloud"
                    containerMain.appendChild(addImage);
                } else if (weatherType >= 803 && weatherType <= 804) {
                    addImage.src = "./design/design1/img/cloud.png";
                    addImage.alt = "clouds";
                    addImage.className = "cloud"
                    containerMain.appendChild(addImage);
                } else if (weatherType >= 701 && weatherType <= 781) {
                    addImage.src = "./design/design1/img/mist.png";
                    addImage.alt = "mist";
                    addImage.className = "mist"
                    containerMain.appendChild(addImage);
                } else if (weatherType >= 600 && weatherType <= 622) {
                    addImage.src = "./design/design1/img/snow.png";
                    addImage.alt = "snow";
                    addImage.className = "snow"
                    containerMain.appendChild(addImage);
                } else if (weatherType >= 500 && weatherType <= 531) {
                    addImage.src = "./design/design1/img/rain.png";
                    addImage.alt = "rain";
                    addImage.className = "rain"
                    containerMain.appendChild(addImage);
                } else if (weatherType >= 300 && weatherType <= 321) {
                    addImage.src = "./design/design1/img/light-rain.png";
                    addImage.alt = "drizzle";
                    addImage.className = "light-rain"
                    containerMain.appendChild(addImage);
                } else if (weatherType >= 200 && weatherType <= 232) {
                    addImage.src = "./design/design1/img/thunder.png";
                    addImage.alt = "thunderstorm";
                    addImage.className = "thunderstorm"
                    containerMain.appendChild(addImage);
                }
            });

            currentWeather(weatherTypeById)
        })
        .catch((error) => {
            console.log("Caught Error", error);
            containerMain.innerHTML = "<p>Failed to load, please try again.</p>"
        })
}

fetchWeatherData();
