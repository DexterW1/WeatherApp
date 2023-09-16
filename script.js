const apiKey = '0b36dbb17bfa775ceb8149f2441436db';
let userSearchInput = '';
let currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q={city name}&appid=${apiKey}`;
const searchField= document.querySelector('.searchField');

searchField.addEventListener('keydown',(event)=>{
    if(event.key=='Enter'){
        userSearchInput=event.target.value;
    }
})