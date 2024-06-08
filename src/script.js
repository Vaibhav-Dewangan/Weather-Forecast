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
const nextDay5 = document.querySelectorAll('.nextDay5');

const recentCitiesDropdown = document.getElementById('recentCities');

//Weather API key

const apiKey = '8fe7a48524528f4907583a6a7017cb9b';

//Functions to fetch weather data by city name.

function fetchCurrentWeather(location){
        const fetchData = fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&APPID=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            displayCurrentWeather(data);
            saveDataToSessionStorage (location ,data);

        })
        .catch(error =>{
            alert(`Enter valid location or check network`);
            console.log(`Error in fetching data : ${error.message}`);
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
        })
    console.log(fetchData);

}
function fetchForecastWeather(location){
        const fetchData = fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&APPID=${apiKey}`)
        .then(response => response.json())
        .then(data =>{
            console.log(data);
            displayForecastWeather(data)
            saveDataToSessionStorage (location ,data);
        })
        .catch(error =>{
            console.log(`Error in fetching data : ${error.message}`);
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
        const dayIndex = (index +1) * 8;
        const day = data.list[dayIndex];
        dayElements.querySelector('.date').textContent = new Date(day.dt_txt).toLocaleDateString();
        dayElements.querySelector('.weather-icon').src = ` https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`;
        dayElements.querySelector('.temp').textContent = `Temp: ${day.main.temp}°C`;
        dayElements.querySelector('.humidity').textContent = `Humidity: ${day.main.humidity}%`;
        dayElements.querySelector('.wind').textContent = `Wind: ${day.wind.speed}m/s`;
    })
    nextDay5.forEach((dayElements, index) =>{
        const dayIndex = (index + 1)*39;
        const day = data.list[dayIndex];
        dayElements.querySelector('.date').textContent = new Date(day.dt_txt).toLocaleDateString();
        dayElements.querySelector('.weather-icon').src = ` https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`;
        dayElements.querySelector('.temp').textContent = `Temp: ${day.main.temp}°C`;
        dayElements.querySelector('.humidity').textContent = `Humidity: ${day.main.humidity}%`;
        dayElements.querySelector('.wind').textContent = `Wind: ${day.wind.speed}m/s`;
    })
}

//To save recent search data to session Storage and to show in dropdownmenu.

function saveDataToSessionStorage(cityName2, data) {
    cityName2.trim();
    sessionStorage.setItem(cityName2, JSON.stringify(data));
    let recentCities = JSON.parse(sessionStorage.getItem('recentCities')) || [];
    if (!recentCities.includes(cityName2)) {
        recentCities.push(cityName2);
        sessionStorage.setItem('recentCities', JSON.stringify(recentCities));
    }
    updateRecentCitiesDropdown();
}
function updateRecentCitiesDropdown() {
    let recentCities = JSON.parse(sessionStorage.getItem('recentCities')) || [];
    const recentCitiesDropdown = document.getElementById('recentCities');
    console.log(recentCities);
    if (recentCities.length > 0) {
        recentCitiesDropdown.classList = 'visible text-black  rounded-xl h-7 p-1 backdrop:blur-sm bg-white/20 text-center text-md';
        recentCitiesDropdown.style.display = 'block';
        recentCitiesDropdown.innerHTML = '<option value=""> Recently Searched</option>';
        recentCities.forEach(city => {
            recentCitiesDropdown.innerHTML += `<option value="${city}">${city}</option>`;
        });

    } else {
        recentCitiesDropdown.style.display = 'none';
    }
}

//Event listeners.

const fetchWeather = (location) => {
    fetchCurrentWeather(location);
    fetchForecastWeather(location);
}

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

recentCitiesDropdown.addEventListener('change', function() {
    const selectedCity = recentCitiesDropdown.value;
    fetchCurrentWeather(selectedCity);
    fetchForecastWeather(selectedCity);
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

