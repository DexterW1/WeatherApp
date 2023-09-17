const apiKey = '0b36dbb17bfa775ceb8149f2441436db';
let userSearchInput = '';
let lon;
let lat;
const searchField= document.querySelector('.searchField');
const searchBtn = document.querySelector('.search button .search-button-icon');
const updateCity = document.querySelector('.city');
const updateTemp = document.querySelector('.temp');
const updateHumidity = document.querySelector('.humidity');
const updateWind = document.querySelector('.wind');
const updateWeatherIcon = document.querySelector('.weather-icon');
const myLocationButton = document.querySelector('.mylocation-button');
searchField.addEventListener('keydown',(event)=>{
    if(event.key=='Enter'){
        userSearchInput=event.target.value;
        checkWeather(false);
    }
})
searchBtn.addEventListener('click',()=>{
    userSearchInput=searchField.value;
    checkWeather(false);
})

myLocationButton.addEventListener('click', async () => {
    // Check if Geolocation is available in the user's browser
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            lat = position.coords.latitude;
            lon = position.coords.longitude;
            await checkWeather(true);
        }, (error) => {
            console.error('Error getting location:', error);
        });
    } else {
        console.error('Geolocation is not available in this browser.');
    }
});

async function checkWeather(geolocation){
    console.log(geolocation);
    try {
        if(geolocation==true){
            var currentWeatherUrl= `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`
        }
        else{
            var currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${userSearchInput}&appid=${apiKey}&units=imperial`;
        }
        const response = await fetch(currentWeatherUrl);
        const data = await response.json();
        updateCity.innerHTML=data.name;
        updateTemp.innerHTML=Math.round(data.main.temp) + '&degf';
        updateHumidity.innerHTML=data.main.humidity +"%";
        updateWind.innerHTML=data.wind.speed + " mph";
        if(data.weather[0].main=="Clouds"){
            updateWeatherIcon.src="images/clouds.png";
        }
        else if(data.weather[0].main==="Clear"){
            updateWeatherIcon.src="images/clear.png";
        }
        else if(data.weather[0].main==="Rain"){
            updateWeatherIcon.src="images/rain.png";
        }
        else if(data.weather[0].main==="Drizzle"){
            updateWeatherIcon.src="images/drizzle.png";
        }
        else if(data.weather[0].main==="Snow"){
            updateWeatherIcon.src="images/snow.png";
        }
        else if(data.weather[0].main==="Mist"){
            updateWeatherIcon.src="images/mist.png";
        }
        console.log(data);
    } catch (error) {
        console.log(error)
    }
}