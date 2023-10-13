// Get element by ID
const containerSub = document.getElementById("containerSub")
const weekdays = document.getElementById("weekdays");
const weatherIcon = document.getElementById("image");
const temperatures = document.getElementById("temperatures");

// API URL
const urlWeatherData = "https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=903ddcd89f258c2d7a183180e626b811";

const fetchForecast = () => {
    fetch(urlWeatherData)
        .then((response) => {
            return response.json()
        })
        .then((weatherData) => {
            console.log("console", weatherData)

            // Get today's day
            const currentDate = new Date();
            const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            const currentDay = weekday[currentDate.getDay()];
            // console.log("Today is:", currentDay)


            // Filter the weatherdata to display data only at 12:00
            const dayTime = weatherData.list.filter((data) => {
                const dateTime = new Date(data.dt_txt);
                const hours = dateTime.getHours();
                return hours === 12;
            });
            console.log("dayTime", dayTime)

            // Filter the weatherdata to display data only at 00:00
            const nightTime = weatherData.list.filter((data) => {
                const dateTime = new Date(data.dt_txt);
                const hours = dateTime.getHours();
                return hours === 0;
            });
            console.log("nightTime", nightTime)

            /*--TEMPERATURES--*/
            //Get the temperatures in the day and night with one decimal
            let dailyTemps = dayTime.map((temperature) => Math.round(temperature.main.temp * 10) / 10);
            let nightlyTemps = nightTime.map((temperature) => Math.round(temperature.main.temp * 10) / 10);

            /*--WEEKDAYS--*/
            //Create an array to contain the upcoming 5 days
            const upcomingDays = [];

            //Create a loop to fetch the upcoming five days
            for (let i = 0; i < 5; i++) {
                const nextDate = new Date(currentDate);
                //Get the date for the next day in the loop
                nextDate.setDate(currentDate.getDate() + i);
                //Get the name of that day
                const nextDayName = weekday[nextDate.getDay()];
                //Add the following days to the array
                upcomingDays.push(nextDayName);
            }

            /*--WEATHER TYPE--*/
            // Fetch weather type by ID
            const dailyWeather = dayTime.map((weather) => {
                return weather.weather.map((type) => type.id);
            })
            //Flatten the array and create a new one
            const upcomingWeather = dailyWeather.flat();
            // console.log(upcomingWeather)


            /*--DISPLAY WEATHER DATA IN HTML--*/

            /*--WEEKDAYS--*/
            //Clear any previous content in the weekday div
            weekdays.innerHTML = "";
            //Add each day in the array
            upcomingDays.forEach((day) => {
                const addParagraph = document.createElement("p");
                //Add the respective days to the textcontent 
                addParagraph.textContent = day;
                //Add a paragraph with the text for each day
                weekdays.appendChild(addParagraph);
            });

            /*--WEATHER TYPE / WEATHER ICONS--*/
            // Add weather icons to their respective ID:s
            upcomingWeather.forEach((weatherType) => {
                let addImage = document.createElement("img");
                if (weatherType === 800) {
                    addImage.src = "./design/design1/img/sun.png";
                    addImage.alt = "sun";
                    weatherIcons.appendChild(addImage);
                } else if (weatherType >= 801 && weatherType <= 802) {
                    addImage.src = "./design/design1/img/sun-cloud.png";
                    addImage.alt = "sun and clouds";
                    weatherIcons.appendChild(addImage);
                } else if (weatherType >= 803 && weatherType <= 804) {
                    addImage.src = "./design/design1/img/cloud.png";
                    addImage.alt = "clouds";
                    weatherIcons.appendChild(addImage);
                } else if (weatherType >= 701 && weatherType <= 781) {
                    addImage.src = "./design/design1/img/mist.png";
                    addImage.alt = "mist";
                    weatherIcons.appendChild(addImage);
                } else if (weatherType >= 600 && weatherType <= 622) {
                    addImage.src = "./design/design1/img/snow.png";
                    addImage.alt = "snow";
                    weatherIcons.appendChild(addImage);
                } else if (weatherType >= 500 && weatherType <= 531) {
                    addImage.src = "./design/design1/img/rain.png";
                    addImage.alt = "rain";
                    weatherIcons.appendChild(addImage);
                } else if (weatherType >= 300 && weatherType <= 321) {
                    addImage.src = "./design/design1/img/light-rain.png";
                    addImage.alt = "drizzle";
                    weatherIcons.appendChild(addImage);
                } else if (weatherType >= 200 && weatherType <= 232) {
                    addImage.src = "./design/design1/img/thunder.png";
                    addImage.alt = "thunderstorm";
                    weatherIcons.appendChild(addImage);
                }
            });


            /*--TEMPERATURES--*/
            //Clear any previous content in the weekday div
            temperatures.innerHTML = "";

            // Add temperatures at 12:00 and 00:00 for the following 5 days
            for (let i = 0; i < 5; i++) {
                const addTemperature = document.createElement("p");
                addTemperature.textContent = `${dailyTemps[i]}° / ${nightlyTemps[i]} °C`;
                temperatures.appendChild(addTemperature);
            }

        })
        .catch((error) => {
            console.log("Caught Error", error);
            containerMain.innerHTML = "<h1>Failed to load, please try again.</h1>"
        })
}

fetchForecast();
