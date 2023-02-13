// fe8d2d2216ecda2cbec213d949527af5;

const input = document.querySelector('input');
const button = document.querySelector('button');
const p = document.querySelector('p');


async function celciusData(location) {
    const response = await fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&APPID=fe8d2d2216ecda2cbec213d949527af5&units=metric",
        { mode: "cors" });
    const data = await response.json();
    const name = await data.name;
    const celcius = await data.main.feels_like;
    const temperature = await data.main.temp;
    const weatherDescription = await data.weather[0].main;
    console.log(data);
    return {name, celcius, temperature, weatherDescription};
}

function run() {
    Promise.all([values])
    .then((data) => {
        p.textContent = data.name;
    })
}
button.addEventListener('click', ()=> {
    const city = input.value;
    const values = celciusData;
    console.log(values(city));
})

celciusData('welkom')