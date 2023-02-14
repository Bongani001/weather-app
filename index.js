// fe8d2d2216ecda2cbec213d949527af5;

const input = document.querySelector('input');
const button = document.querySelector('button');
const loc = document.querySelector('.location');

async function celciusData(location) {
    const response = await fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&APPID=fe8d2d2216ecda2cbec213d949527af5&units=metric",
        { mode: "cors" });
    const data = await response.json();
    const name = await data.name;
    const feelsLike = await data.main.feels_like;
    const temperature = await data.main.temp;
    const weatherDescription = await data.weather[0].main;
    // console.log(data);
    return {name, feelsLike, temperature, weatherDescription};
}

function run(info) {
    info.then((data) => {
        loc.textContent = data.name;
        console.log(data.name)
    })
}

button.addEventListener('click', ()=> {
    const city = input.value;
    const values = celciusData(city);
    // values.then(data => {
    //     console.log(data)
    // })
    run(values);
})

function getCurrentDate() {
    let currentDate = new Date;
    let day = currentDate.getDate().toString();
    let mon = currentDate.getMonth() + 1;
    let month = mon.toString();
    let year = currentDate.getFullYear();
    let hours = currentDate.getUTCHours().toString();
    let minutes = currentDate.getMinutes().toString();
    if (day.length < 2) { day = "0" + day}
    if (month.length < 2) { month = "0" + month}
    if (hours.length < 2) { hours = "0" + hours}
    if (minutes.length < 2) { minutes = "0" + minutes}
    let fullDate = day + "/" + month + "/" + year;
    let fullTime = hours + ":" + minutes;
    console.log(fullDate, fullTime);
}

getCurrentDate();





// set the default weather search

function defaultSearch() {
    const defaultWeather = celciusData('welkom');
    run(defaultWeather);
}

defaultSearch();