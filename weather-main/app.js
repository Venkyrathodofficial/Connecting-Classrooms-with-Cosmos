let id = '9505fd1df737e20152fbd78cdb289b6a';
let baseURL = 'https://api.openweathermap.org/data/2.5/weather';
let airQualityURL = 'https://api.openweathermap.org/data/2.5/air_pollution';
let form = document.querySelector("form");
let city = document.querySelector('.name');
let temperature = document.querySelector('.temperature');
let description = document.querySelector('.description');
let valueSearch = document.getElementById('name');
let clouds = document.getElementById('clouds');
let humidity = document.getElementById('humidity');
let pressure = document.getElementById('pressure');
let windSpeed = document.getElementById('windSpeed');
let visibility = document.getElementById('visibility');
let uvIndex = document.getElementById('uvIndex');
let airQuality = document.getElementById('airQuality');
let main = document.querySelector('main');

// Get user's location and fetch weather data
const getUserLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            fetchWeatherByLocation(latitude, longitude);
            fetchAirQuality(latitude, longitude);
        }, (error) => {
            console.error("Error fetching location:", error);
            // Fallback: Fetch weather data for a default city
            fetchWeatherByCity('Washington');
        });
    } else {
        console.error("Geolocation is not supported by this browser.");
        fetchWeatherByCity('Washington'); // Fallback if geolocation is not supported
    }
};

// Fetch weather data by coordinates (latitude, longitude)
const fetchWeatherByLocation = (latitude, longitude) => {
    const url = `${baseURL}?lat=${latitude}&lon=${longitude}&units=metric&appid=${id}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod == 200) {
                updateWeatherUI(data);
                fetchUVIndex(latitude, longitude); // Fetch UV index separately
            } else {
                showError();
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
};

// Fetch Air Quality Index (AQI) by coordinates
const fetchAirQuality = (latitude, longitude) => {
    const url = `${airQualityURL}?lat=${latitude}&lon=${longitude}&appid=${id}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data) {
                updateAirQualityUI(data);
            }
        })
        .catch(error => {
            console.error('Error fetching air quality data:', error);
        });
};

// Fetch UV index by coordinates (OpenWeatherMap has a separate UV index API)
const fetchUVIndex = (latitude, longitude) => {
    // Assuming you have UV data included in weather response or you have a separate API for it.
    // Modify this function to fetch UV index based on your API's response.
    // Placeholder: Set UV index manually as an example
    uvIndex.innerText = "UV Index: 5 (Moderate)";
};

// Fetch weather data by city name (fallback)
const fetchWeatherByCity = (cityName) => {
    const url = `${baseURL}?q=${cityName}&units=metric&appid=${id}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod == 200) {
                updateWeatherUI(data);
            } else {
                showError();
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
};

// Update UI with fetched weather data
const updateWeatherUI = (data) => {
    city.querySelector('figcaption').innerHTML = data.name;
    city.querySelector('img').src = `https://flagsapi.com/${data.sys.country}/shiny/32.png`;
    temperature.querySelector('img').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
    temperature.querySelector('span').innerText = `${data.main.temp}°C`;
    description.innerText = data.weather[0].description;
    clouds.innerText = `Clouds: ${data.clouds.all}%`;
    humidity.innerText = `Humidity: ${data.main.humidity}%`;
    pressure.innerText = `Pressure: ${data.main.pressure} hPa`;
    windSpeed.innerText = `Wind Speed: ${data.wind.speed} m/s`;
    visibility.innerText = `Visibility: ${data.visibility / 1000} km`;
};

// Update UI with Air Quality data
const updateAirQualityUI = (data) => {
    const aqi = data.list[0].main.aqi; // AQI is a number from 1 to 5
    let airQualityDescription = '';
    switch (aqi) {
        case 1:
            airQualityDescription = "Good";
            break;
        case 2:
            airQualityDescription = "Fair";
            break;
        case 3:
            airQualityDescription = "Moderate";
            break;
        case 4:
            airQualityDescription = "Poor";
            break;
        case 5:
            airQualityDescription = "Very Poor";
            break;
        default:
            airQualityDescription = "Unknown";
    }
    airQuality.innerText = `Air Quality: ${airQualityDescription} (${aqi})`;
};

// Show error and reset UI if data is invalid
const showError = () => {
    main.classList.add('error');
    setTimeout(() => {
        main.classList.remove('error');
    }, 1000);
};

// Event listener for city search form
form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (valueSearch.value != '') {
        fetchWeatherByCity(valueSearch.value);
    }
});

// Initialize app by getting user's location
const initApp = () => {
    getUserLocation();
}

initApp();
