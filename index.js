const apiKey = "ee379cd22b814240895121924230107";
const h1 = document.querySelector("#outInCelcius");
const locationName = document.querySelector("#location-name");
const localtime = document.querySelector("#localtime");
const conditionText = document.querySelector("#condition-text");
const imgElement = document.querySelector("#iconWether");
const country = document.querySelector("#country");
const region = document.querySelector("#region");

// select the input field - 1
const queryCityInput = document.querySelector("input");

// catch the value input when it changes - 3
queryCityInput.addEventListener("change", fetchingData);

function updateTheUI(data) {
  if (!data || !data.current || !data.location) {
    console.error("Invalid API Response:", data);
  }

  h1.innerText = data.current.temp_c + "°";
  imgElement.src = data.current.condition.icon;
  locationName.innerText = data.location.name;
  conditionText.innerText = data.current.condition.text;
  country.innerText = data.location.country;
  region.innerText = data.location.region;
  // getCurrentDateAndTime(data.location.tz_id);

  // changes the time

  getCurrentDateAndTime(data.location.tz_id);

  const shades = ["black", "white"];

  function updateTextshade(shade) {
    h1.style.color = shade;
    locationName.style.color = shade;
    localtime.style.color = shade;
    conditionText.style.color = shade;
    country.style.color = shade;
    region.style.color = shade;
  }
  const backgroundImgs = [
    "./imgs/sunny.jpg",
    "./imgs/rain.jpg",
    "./imgs/overcast.jpg",
    "./imgs/mist.jpg",
    "./imgs/nightclear.jpg",
    "./imgs/thunder.jpg",
  ];

  // updating the UI
  function changeBackgroundimg(img) {
    const myDiv = document.getElementById("container");
    myDiv.style.backgroundImage = `url('${img}')`;
  }

  if (data.current.condition.text === "Sunny") {
    changeBackgroundimg(backgroundImgs[0]);
    updateTextshade(shades[0]); // to black
  } else if (
    data.current.condition.text === "Moderate rain at times" ||
    data.current.condition.text === "Moderate rain" ||
    data.current.condition.text === "Light rain" ||
    data.current.condition.text === "Light rain shower"
  ) {
    changeBackgroundimg(backgroundImgs[1]);
    updateTextshade(shades[1]);
  } else if (
    data.current.condition.text === "Overcast" ||
    data.current.condition.text === "Partly cloudy"
  ) {
    changeBackgroundimg(backgroundImgs[2]);
    updateTextshade(shades[1]);
  } else if (data.current.condition.text === "Mist") {
    changeBackgroundimg(backgroundImgs[3]);
    updateTextshade(shades[0]); // to black
  } else if (data.current.condition.text === "Clear") {
    changeBackgroundimg(backgroundImgs[4]);
    updateTextshade(shades[1]); // to white
  } else if (
    data.current.condition.text === "Moderate or heavy rain with thunder"
  ) {
    changeBackgroundimg(backgroundImgs[5]);
    updateTextshade(shades[1]); // to white
  }
}

// fetching the data
async function fetchingData() {
  // catch the value of the input - 2 - unless it's falsy, in which case it defaults to "Hamburg"
  let queryCity = queryCityInput.value || "Hamburg";

  let url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${queryCity}&aqi=no`;

  try {
    let response = await fetch(url);
    let data = await response.json();

    updateTheUI(data);
  } catch (err) {
    console.error("Error fetching data:", err);
  }
}

fetchingData();
