//Input & Search 

const formForInput = document.querySelector('#formForInput');
const searchBtn = document.querySelector('#searchBtn');
const autoSearchBtn = document.querySelector('#autoSearchBtn');
const cityName = document.querySelector('#cityName');
const locateMe = document.querySelector('#locateMe');

//Todays weather data

const todaysWeather = document.querySelector('#todaysWeather');
const locationName = todaysWeather.querySelector('.locationName');
const date = todaysWeather.querySelector('.date');
const temperature = todaysWeather.querySelector('.temperature');
const humidity = todaysWeather.querySelector('.humidity');
const wind = todaysWeather.querySelector('.wind');
const weatherIcon = todaysWeather.querySelector('.weather-icon');

//Nextdays weather data

const nextDays = document.querySelectorAll('.nextDays');

//Weather API key

const apiKey = '8fe7a48524528f4907583a6a7017cb9b';

//To save recent search data to local Storage and to show in dropdownmenu.

function saveToLocalStorage (){
    insertToDropdownMenu();
}
function  insertToDropdownMenu (){

}

//Functions to fetch weather data by city name.

function fetchCurrentWeather(location){
        const fetchData = fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&APPID=${apiKey}`)
        .then(response => response.json())
        .then(data => displayCurrentWeather(data))
        .catch(error =>{
            alert(`Error in fetching data : ${error.message}`);
        })
    console.log(fetchData);

}
function fetchForecastWeather(location){
        const fetchData = fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&APPID=${apiKey}`)
        .then(response => response.json())
        .then(data => displayForecastWeather(data))
        .catch(error =>{
            alert(`Error in fetching data : ${error.message}`);
        })
    console.log(fetchData);
}

//Functions to fetch weather data by coords.

const fetchCurrentWeatherByCoords = (lat,lon) => {
    const fetchData = fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&APPID=${apiKey}`)
    .then(response => response.json())
    .then(data => displayCurrentWeather(data))
    .catch(error =>{
        alert(`Error in fetching data : ${error.message}`);
    })
console.log(fetchData);
}
const fetchForecastWeatherByCoords = (lat, lon) => {
    const fetchData = fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&APPID=${apiKey}`)
    .then(response => response.json())
    .then(data => displayForecastWeather(data))
    .catch(error =>{
        alert(`Error in fetching data : ${error.message}`);
    })
console.log(fetchData);
}

//Functions to display weather data.

function displayCurrentWeather(data){
    locationName.innerHTML = `${data.name} &nbsp <i class="fa-solid fa-location-dot ">`;
    date.textContent = new Date(data.dt * 1000).toLocaleDateString();
    weatherIcon.src = ` https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    temperature.textContent = `Temp: ${data.main.temp}°C`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    wind.textContent = `Wind: ${data.wind.speed}m/s`;
}
function displayForecastWeather(data){
    nextDays.forEach((dayElements, index) =>{
        const day = data.list[index * 8];
        dayElements.querySelector('.date').textContent = new Date(day.dt_txt).toLocaleDateString();
        dayElements.querySelector('.weather-icon').src = ` https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`;
        dayElements.querySelector('.temp').textContent = `Temp: ${day.main.temp}°C`;
        dayElements.querySelector('.humidity').textContent = `Humidity: ${day.main.humidity}%`;
        dayElements.querySelector('.wind').textContent = `Wind: ${day.wind.speed}m/s`;
    })
}

const fetchWeather = (location) => {
    fetchCurrentWeather(location);
    fetchForecastWeather(location);
}

//Event listeners.

searchBtn.addEventListener('click', () => {
    const location = cityName.value;
    if(location == ''){
        alert('Please Enter Your City Name');
        return;
       
    }else{
        fetchWeather(location);
    }
   
});

autoSearchBtn.addEventListener('click', () => {
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position) =>{
            const { latitude, longitude } = position.coords;
            fetchCurrentWeatherByCoords(latitude, longitude);
            fetchForecastWeatherByCoords(latitude, longitude);
        })
    }else{
        alert('Geolocation is not supported by this browser.');
    }
});

locateMe.addEventListener('click', () => {
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position) =>{
            const { latitude, longitude } = position.coords;
            fetchCurrentWeatherByCoords(latitude, longitude);
            fetchForecastWeatherByCoords(latitude, longitude);
        })
    }else{
        alert('Geolocation is not supported by this browser.');
    }
});

//Function auto run at the time of load.
(function autoLocateAtStarting(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position) =>{
            const { latitude, longitude } = position.coords;
            fetchCurrentWeatherByCoords(latitude, longitude);
            fetchForecastWeatherByCoords(latitude, longitude);
        })
    }else{
        alert('Geolocation is not supported by this browser.');
    }
})();

