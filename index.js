const input = document.querySelector('input');
const button = document.querySelector('button');
const loc = document.querySelector('.location');
const weatherImg = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const todayDay = document.querySelector('.today-day');
const todayDate = document.querySelector('.today-date');
const updatedTime = document.querySelector('.updated-time');
const feelsNum = document.querySelector('.feels-num');
const windNum = document.querySelector('.wind');
const visibilityNum = document.querySelector('.visibility');

//Possible weather descriptions [rain, clouds, sun, clear]

async function celciusData(location) {
    const response = await fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&APPID=fe8d2d2216ecda2cbec213d949527af5&units=metric",
        { mode: "cors" });
    const data = await response.json();
    const name = await data.name;
    const feelsLike = await data.main.feels_like;
    const temp = await data.main.temp;
    const weatherDescrip = await data.weather[0].description;
    console.log(data);
    return {name, feelsLike, temp, weatherDescrip};
}

function displayInfo(info) {
    info.then((data) => {
        loc.textContent = data.name;
        temperature.textContent = Math.round(data.temp);
        weatherDescription.textContent = data.weatherDescrip;
        console.log(data.name)
    })
}



//////////// DATE
function getCurrentDate() {
    let currentDate = new Date;
    let day = currentDate.getDate().toString();
    let mon = currentDate.getMonth() + 1;
    let month = mon.toString();
    let year = currentDate.getFullYear();
    let hour = currentDate.getUTCHours() + 2;
    hour = hour % 12;
    hour = hour ? hour : 12; // the hour '0' to be '12'
    let hours = hour.toString();
    let minutes = currentDate.getMinutes().toString(); 
    
    if (day.length < 2) { day = "0" + day}
    if (month.length < 2) { month = "0" + month}
    if (hours.length < 2) { hours = "0" + hours}
    if (minutes.length < 2) { minutes = "0" + minutes}
    let fullDate = day + "/" + month + "/" + year;
    let fullTime = hours + ":" + minutes;

    let today;
    switch (new Date().getDay()) {
        case 0:
          today = "Sun";
          break;
        case 1:
          today = "Mon";
          break;
        case 2:
           today = "Tue";
          break;
        case 3:
          today = "Wed";
          break;
        case 4:
          today = "Thur";
          break;
        case 5:
          today = "Fri";
          break;
        case 6:
          today = "Sat";
    }

    // am/pm format
    let ampm = hours < 12 ? 'AM' : 'PM';

    todayDay.textContent = `${today}, `;
    todayDate.textContent = `${fullDate} `;
    updatedTime.textContent = `${fullTime} ${ampm} GMT +2`;
    console.log(today, fullDate, fullTime);
    
}

getCurrentDate();


// EVENT LISTERNERS

button.addEventListener('click', ()=> {
    const city = input.value;
    const values = celciusData(city);
    // values.then(data => {
    //     console.log(data)
    // })
    displayInfo(values);
})



// set the default weather search

function defaultSearch() {
    const defaultWeather = celciusData('welkom');
    displayInfo(defaultWeather);
}

defaultSearch();