const input = document.querySelector('input');
const button = document.querySelector('button');

const loc = document.querySelector('.location');
const longitude = document.querySelector('.longitude');
const latitude = document.querySelector('.latitude');

const weatherImg = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const celcius = document.querySelector('.celcius');
const fahrenheit = document.querySelector('.fahrenheit');
const weatherDescription = document.querySelector('.weather-description');
const todayDay = document.querySelector('.today-day');
const todayDate = document.querySelector('.today-date');
const updatedTime = document.querySelector('.updated-time');

const feelsNum = document.querySelector('.feels-num');
const windNum = document.querySelector('.wind');
const humidityNum = document.querySelector('.humidity');

async function celciusData(location) {
    const response = await fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&APPID=fe8d2d2216ecda2cbec213d949527af5&units=metric",
        { mode: "cors" });
    const data = await response.json();
    const name = await data.name;
    const country = await data.sys.country;
    const long = await data.coord.lon;
    const lat = await data.coord.lat;
    const temp = await data.main.temp;
    const weatherDescrip = await data.weather[0].description;
    const mainWeather = await data.weather[0].main;
    const feelsLike = await data.main.feels_like;
    const wind = await data.wind.speed;
    const humidity = await data.main.humidity;
    console.log(data);
    return {name, feelsLike, temp, weatherDescrip, mainWeather, country, long, lat, wind, humidity};
}

function displayInfo(info) {
    info.then((data) => {
        loc.textContent = `${data.name}, ${data.country}`;
        longitude.textContent = data.long;
        latitude.textContent = data.lat;
        temperature.textContent = Math.round(data.temp);
        weatherDescription.textContent = data.weatherDescrip;
        feelsNum.textContent = Math.round(data.feelsLike);
        let speed = data.wind * 3.6; // convert meter/second to km/h
        speed = Math.round(speed * 10) / 10;
        windNum.textContent = `${speed} km/h`;
        humidityNum.textContent = `${data.humidity}%`;


        // Change to show temperature in celcius or fahrenheit
        celcius.addEventListener('click', () => {
          temperature.textContent = Math.round(data.temp);
          feelsNum.textContent = Math.round(data.feelsLike);
          celcius.classList = 'celcius';
          fahrenheit.classList = 'fahrenheit dim';
        });
        fahrenheit.addEventListener('click', () => {
          temperature.textContent = Math.round(data.temp * 1.8) + 32;
          feelsNum.textContent = Math.round(data.feelsLike * 1.8) + 32;
          fahrenheit.classList = 'fahrenheit';
          celcius.classList = 'celcius dim';
        })

        // display weather icon
        //Possible weather descriptions [rain,clouds, clear, haze]
        if (data.mainWeather === 'Clouds') {
          weatherImg.src = './src/cloud.png';
        } else if (data.mainWeather === 'Rain') {
          weatherImg.src = './src/rain.png';
        } else if (data.mainWeather === 'Clear') {
          weatherImg.src = './src/sun.png';
        } else if (data.mainWeather === 'Rain') {
          weatherImg.src = './src/rain.png';
        }
    }).catch((err) => {
      console.error('Cant read name');
    })
}

function callAllInfo() {
    getCurrentDate();
    const city = input.value;
    const values = celciusData(city)
    .catch((err) => {
      alert('Something went wrong with fetching data from the server \n check whether you got the correct spelling. \n Joburg or JHB (wrong) \n Johannesburg (right)');
      console.error('There\'s an error', err);
      // throw new Error('Can\'t find location');
    });
    displayInfo(values);
}



//////////// DATE
function getCurrentDate() {
    let currentDate = new Date;
    let day = currentDate.getDate().toString();
    let mon = currentDate.getMonth() + 1;
    let month = mon.toString();
    let year = currentDate.getFullYear();
    let hour = currentDate.getUTCHours() + 2;
    // am/pm format
    let ampm = hour < 12 ? 'AM' : 'PM';
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

    todayDay.textContent = `${today}, `;
    todayDate.textContent = `${fullDate} `;
    updatedTime.textContent = `${fullTime} ${ampm} SAST`;
}

// set the default weather search

function defaultSearch() {
    getCurrentDate();
    const defaultWeather = celciusData('welkom')
    .catch((err) => {
      console.error(err);
      alert('Something went wrong with fetching data from the server');
    });
    displayInfo(defaultWeather);
}

defaultSearch();

// EVENT LISTERNERS

button.addEventListener('click', callAllInfo)
