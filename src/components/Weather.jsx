import react, { useEffect, useRef, useState } from 'react'
import './Weather.scss'; // Assuming you have a Weather.scss for styles
import searchIcon from '../assets/search.png'; // Adjust the path as necessary
import clear from '../assets/clear.png'; // Adjust the path as necessary
import cloudy from '../assets/cloud.png'; // Adjust the path as necessary
import drizzle from '../assets/drizzle.png'; // Adjust the path as necessary
import humidity from '../assets/humidity.png'; // Adjust the path as necessary
import rain from '../assets/rain.png'; // Adjust the path as necessary
import snow from '../assets/snow.png'; // Adjust the path as necessary
import wind from '../assets/wind.png'; // Adjust the path as necessary



const Weather = () => {
    const inputRef = useRef(null); // Create a ref for the input field
   
    // State to hold weather data
    // Initialize with default values to avoid undefined errors
    const [weatherData, setWeatherData] = useState(false);
    // Define all weather icons based on OpenWeatherMap icon codes
    // You can add more icons as needed based on the OpenWeatherMap documentation
    const allIcons = {
        '01d': clear,
        '01n': clear,
        '02d': cloudy,
        '02n': cloudy,
        '03d': cloudy,
        '03n': cloudy,
        '04d': drizzle,
        '04n': drizzle,
        '09d': rain,
        '09n': rain,
        '10d': rain,
        '10n': rain,
        '13d': snow,
        '13n': snow,
    }
 
    const search = async (city) => {
        if (!city || city === "") { // Check if the city is empty
            alert("Please enter a city name"); // Alert the user if no city is entered  
            return;
        }
        try { // Fetch weather data from the API 
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            console.log(url);
            const icon = allIcons[data.weather[0].icon] || clear; // Default to clear icon if not found
            // Set the weather data state with the fetched data
            setWeatherData({
                humidity: data.main.humidity,              
                windSpeed: data.wind.speed,
                temprature: Math.floor(data.main.temp), // Convert Kelvin to Celsius
                location: data.name,
                weatherIcon: icon,
            })
        } catch (error) {
            console.error("Error fetching weather data:", error);
            alert("Error fetching weather data. Please try again later."); // Alert the user in case of an error
            setWeatherData({    
                humidity: 0,
                windSpeed: 0,
                temprature: 0,
                location: "Not Found",
                weatherIcon: clear, // Default icon in case of error
            });// Set default values in case of an error
        }
    };

    
    // You can add more functionality here, like handling the search input and displaying the weather data
    useEffect(() => {
        // You can call the search function here with a default city or based on user input
        search("Pune"); // Example default city

    },[])
    

    return (
        <div className='weather'>
            <div className='search-bar'>
                <input type='text' ref={inputRef}   placeholder="Enter city name" />
                <img src={searchIcon} alt=' search icon' onClick={()=> search(inputRef.current.value)}/>
            </div>

            <img src={weatherData.weatherIcon} alt='clear icon' className='weather-icon' />
            <p className='temperature'>{weatherData.temprature}° C </p>
            <p className='location'>{weatherData.location}</p>
{weatherData? <>

            <div className='weather-data'>
                <div className='col'>
                    <img src={humidity} alt='humidity icon' className='humidity-icon' />
                    <div className=''>
                        <p>{weatherData.humidity}%</p>
                        <span>Humidity</span>
                    </div>
                </div>

                <div className='col'>
                    <img src={wind} alt='humidity icon' className='humidity-icon' />
                    <div className=''>
                        <p className='Humidity'>{weatherData.windSpeed}km/h</p>
                          <span>wind speed</span>
                    </div>
                </div>
            </div>
</>: <></>}

        </div>
    )
}

export default Weather
