"use strict"

const weatherBlock = document.querySelector('#weather');

async function loadWeather(e) {
   weatherBlock.innerHTML = `
<div class="weather__loading">
   <img src="img/gif/loading-weather.gif" alt="Loading...">
</div>`;

   const server = 'https://api.openweathermap.org/data/2.5/weather?units=metric&lang=ua,uk&q=Kyiv&appid=7433041543b9ae030e2e245d17e21a9e';
   const response = await fetch(server, {
      method: 'GET',
   });
   const responseResult = await response.json();
   if (response.ok) {
      getWeather(responseResult);
   } else {
      weatherBlock.innerHTML = responseResult.message;
   }
}

function getWeather(data) {
   const location = data.name;
   const temp = Math.round(data.main.temp);
   const feelsLike = Math.round(data.main.feels_like);
   //const weatherStatus = data.weather[0].main;
   const weatherIcon = data.weather[0].icon;

   const template = `
   <div class="weather__header">
			<div class="weather__main">
				<div class="weather__city">${location}</div>

			</div>
				<div class="weather__icon">
            <img src="http://openweathermap.org/img/w/${weatherIcon}.png" alt="">
				</div>
	</div>
		<div class="weather__temp">${temp}&deg</div>
		<div class="weather__feels-like">Відчувається як: ${feelsLike}&deg</div>`;


   weatherBlock.innerHTML = template;
}

if (weatherBlock) {
   loadWeather();
}