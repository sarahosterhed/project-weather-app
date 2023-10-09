fetch('https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=903ddcd89f258c2d7a183180e626b811')

    .then((response) => {
        return response.json()
    })
    .then((json) => {
        console.log(json)
    })

