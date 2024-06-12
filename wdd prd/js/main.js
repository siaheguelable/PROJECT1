document.addEventListener('DOMContentLoaded', () => {
    const citySelect = document.getElementById('citySelected');
    const form = document.getElementById('query-form');
    const forecastDiv = document.getElementById('forecast');

    const cities = [
        { name: 'Amsterdam', lat: '52.367', lon: '4.904' },
        { name: 'Ankara', lat: '39.933', lon: '32.859' },
        { name: 'Åstorp', lat: '56.134', lon: '12.945' },
        { name: 'Athens', lat: '37.983', lon: '23.727' },
        { name: 'Belfast', lat: '54.597', lon: '-5.930' },
        { name: 'Barcelona', lat: '41.387', lon: '2.168' },
        { name: 'Berlin', lat: '52.520', lon: '13.405' },
        { name: 'Bern', lat: '46.948', lon: '7.447' },
        { name: 'Bilbao', lat: '43.263', lon: '-2.935' },
        { name: 'Brussels', lat: '50.847', lon: '4.357' },
        { name: 'Bucharest', lat: '47.497', lon: '19.040' },
        { name: 'Budapest', lat: '59.329', lon: '18.068' },
        { name: 'Cardiff', lat: '51.483', lon: '-3.168' },
        { name: 'Cologne', lat: '50.937', lon: '6.96' },
        { name: 'Copenhagen', lat: '55.676', lon: '12.568' },
        { name: 'Cork', lat: '51.898', lon: '-8.475' },
        { name: 'Dublin', lat: '53.349', lon: '-6.260' },
        { name: 'Edinburgh', lat: '55.953', lon: '-3.188' },
        { name: 'Florence', lat: '43.7696', lon: '11.255' },
        { name: 'Frankfurt', lat: '50.110', lon: '8.682' },
        { name: 'French Riviera', lat: '43.254', lon: '6.637' },
        { name: 'Funchal', lat: '32.650', lon: '-16.908' },
        { name: 'Gibraltar', lat: '36.140', lon: '-5.353' },
        { name: 'Gothenburg', lat: '57.708', lon: '11.974' },
        { name: 'Hamburg', lat: '53.548', lon: '9.987' },
        { name: 'Helsinki', lat: '60.169', lon: '24.938' },
        { name: 'Ibiza', lat: '39.020', lon: '1.482' },
        { name: 'Kyiv', lat: '50.450', lon: '30.523' },
        { name: 'Lillehammer', lat: '61.115', lon: '10.466' },
        { name: 'Lisbon', lat: '38.722', lon: '-9.139' },
        { name: 'London', lat: '51.507', lon: '-0.127' },
        { name: 'Madrid', lat: '40.416', lon: '-3.703' },
        { name: 'Mallorca', lat: '39.695', lon: '3.017' },
        { name: 'Manchester', lat: '53.480', lon: '-2.242' },
        { name: 'Marseille', lat: '43.296', lon: '5.369' },
        { name: 'Maspalomas', lat: '27.760', lon: '-15.586' },
        { name: 'Milan', lat: '45.464', lon: '9.190' },
        { name: 'Munich', lat: '48.135', lon: '11.582' },
        { name: 'Naples', lat: '40.851', lon: '14.268' },
        { name: 'Oñati', lat: '43.034', lon: '-2.417' },
        { name: 'Oslo', lat: '59.913', lon: '10.752' },
        { name: 'Paris', lat: '48.856', lon: '2.352' },
        { name: 'Prague', lat: '50.075', lon: '14.437' },
        { name: 'Reykjavík', lat: '64.146', lon: '-21.942' },
        { name: 'Riga', lat: '56.879', lon: '24.603' },
        { name: 'Rome', lat: '41.902', lon: '12.496' },
        { name: 'Santa Cruz das Flores', lat: '39.453', lon: '-31.127' },
        { name: 'Santa Cruz de Tenerife', lat: '28.463', lon: '-16.251' },
        { name: 'Skye', lat: '57.273', lon: '-6.215' },
        { name: 'Sofia', lat: '42.697', lon: '23.321' },
        { name: 'Stockholm', lat: '59.329', lon: '18.068' },
        { name: 'Tallinn', lat: '59.437', lon: '24.753' },
        { name: 'Vienna', lat: '48.208', lon: '16.373' },
        { name: 'Warsaw', lat: '52.229', lon: '21.012' },
        { name: 'York', lat: '53.961', lon: '-1.07' },
        { name: 'Zurich', lat: '47.376', lon: '8.541' }
    ];

    cities.forEach(city => {
        const option = document.createElement('option');
        option.value = JSON.stringify({ lat: city.lat, lon: city.lon });
        option.textContent = city.name;
        citySelect.appendChild(option);
    });

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        const selectedOption = citySelect.options[citySelect.selectedIndex].value;
        if (selectedOption) {
            const cityData = JSON.parse(selectedOption);
            const weatherData = await getWeather(cityData.lat, cityData.lon);
            displayForecast(weatherData);
        }
    });

    async function getWeather(lat, lon) {
        const apiKey = 'a398e59b8f368677884e9ada6de5784e'; // Replace with your OpenWeatherMap API key
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`);
        return response.json();
    }

    function displayForecast(data) {
        forecastDiv.innerHTML = `
            <h2>Weather Forecast for ${data.name}</h2>
            <p>Temperature: ${(data.main.temp - 273.15).toFixed(2)}°C</p>
            <p>Weather: ${data.weather[0].description}</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
        `;
    }
});
