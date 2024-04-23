import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IoSunnyOutline } from "react-icons/io5";

interface DataType {
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
  pressure: number;
  windgust: number;
  Visibility: number;
  realfeel: number;
  minTemp: number;
  maxTemp: number;
}

const WeatherPage: React.FC = () => {
  const { cityName } = useParams<{ cityName: string }>();
  const [weatherData, setWeatherData] = useState<DataType | null>(null);

  useEffect(() => {
    fetchWeatherData();
  }, [cityName]);

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          cityName
        )}&appid=bf95ea75473b68bd223abfea061ec13e&units=metric`
      );
      const data = await response.json();
      console.log(data);

      const weatherData = {
        temperature: data.main.temp,
        description: data.weather[0].description,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        pressure: data.main.pressure,
        windgust: data.wind.gust,
        Visibility: data.visibility,
        realfeel: data.main.feels_like,
        minTemp: data.main.temp_min,
        maxTemp: data.main.temp_max,
      };
      setWeatherData(weatherData);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="weathermain">
      <h1 className="text-center mt-2">Weather Forecast Web Application</h1>
      <div className="Cardcontainer">
        <h1 id="location" className="cityname">
          City : {cityName} Weather
        </h1>
        <div className="weather-info">
          <IoSunnyOutline className="sunImg" />
          <h1 id="temperature">
            Temp - {weatherData.temperature}
            <sup>o</sup> C
          </h1>
          <p>
            Min-Temp {weatherData.minTemp}
            <sup>o</sup> C
          </p>
          <p>
            Max-Temp {weatherData.maxTemp}
            <sup>o</sup> C
          </p>
          <h5 id="description">{weatherData.description}</h5>
        </div>
        <div className="content">
          <table className="table">
            <tr>
              <td> Humdity</td>
              <td>{weatherData.humidity} %</td>
            </tr>
            <tr>
              <td> Wind-Speed</td>
              <td>{weatherData.windSpeed} km/h</td>
            </tr>
            <tr>
              <td>Wind-Gusts</td>
              <td>{weatherData.windgust} km/h</td>
            </tr>
            <tr>
              <td>Pressure</td>
              <td>{weatherData.pressure} mb</td>
            </tr>
            <tr>
              <td>Visibility</td>
              <td>{weatherData.Visibility} km</td>
            </tr>
            <tr>
              <td>Real Feel</td>
              <td>
                {weatherData.realfeel}
                <sup>o</sup> C
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
};

export default WeatherPage;
