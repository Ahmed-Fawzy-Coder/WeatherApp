let myAlert = $(".my-alert"),
  weatherIcon = $(".weather-icon"),
  tempEle = $(".temp-value"),
  tempDesc = $(".temp-description p"),
  locationP = $(".location p");

const weather = {
  temp: {
    value: 18,
    unit: "celsius",
  },
  desc: "few clouds",
  iconId: "01d",
  city: "London",
  country: "EG",
};

let displayWeather = () => {
    weatherIcon.innerHTML = `<img src="dist/icons/${weather.iconId}.svg" alt="${weather.desc}">`;

    tempEle.innerHTML = `<span>${weather.temp.value} ° </span><span class="temp-unit"><sub>C</sub></span>`;

    tempDesc.innerHTML = weather.desc;

    locationP.innerHTML = `${weather.city}, ${weather.country}`;
  },
  cToF = (temp) => {
    return (temp * 9) / 5 + 32;
  };

tempEle.addEventListener("click", () => {
  if (weather.temp.unit == "celsius") {
    let unitInF = cToF(weather.temp.value);
    unitInF = Math.round(unitInF);

    tempEle.innerHTML = `<span>${unitInF} ° </span><span class="temp-unit"><sub>F</sub></span>`;
    weather.temp.unit = "fahrenheit";
  } else {
    tempEle.innerHTML = `<span>${weather.temp.value} ° </span><span class="temp-unit"><sub>C</sub></span>`;
    weather.temp.unit = "celsius";
  }
});

let setPosition = (pos) => {
    let lati = pos.coords.latitude,
      long = pos.coords.longitude;

    getWeather(lati, long);
  },
  showError = () => {
    myAlert.style.display = "block";
    myAlert.innerHTML = `Browser Doesn't Support GeoLocation`;
  };

if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
  myAlert.style.display = "block";
  myAlert.innerHTML = `Browser Doesn't Support GeoLocation`;
}

let getWeather = (lati, long) => {
  const kelven = 273,
    appKey = "your__Api__Key__Here",
    api = `http://api.openweathermap.org/data/2.5/weather?lat=${lati}&lon=${long}&appid=${appKey}`;

  fetch(api)
    .then((resp) => {
      return resp.json();
    })
    .then((jsonData) => {
      weather.temp.value = Math.round(jsonData.main.temp - kelven);
      weather.desc = jsonData.weather[0].description;
      weather.iconId = jsonData.weather[0].icon;
      weather.city = jsonData.name;
      weather.country = jsonData.sys.country;
    })
    .then(() => {
      displayWeather();
    })
    .catch(() => {
      myAlert.style.display = "block";
      myAlert.innerHTML = `Error Fetching The Data`;
    });
};
