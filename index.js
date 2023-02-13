// fe8d2d2216ecda2cbec213d949527af5;

async function weatherData(location) {
    const response = await fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&APPID=fe8d2d2216ecda2cbec213d949527af5&units=metric",
        { mode: "cors" });
    const data = await response.json();
    console.log(data);

}

weatherData('Welkom');