import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../src/App.css';

function App() {
  const url =
    'https://api.weatherapi.com/v1/current.json?key=d433f6fa64aa476c81d53521220204&q=Manila&aqi=no';

  const [condition, setCondition] = useState('Calculating Weather');
  const [icon, setIcon] = useState('icon');
  const [time, setTime] = useState('time');
  const [location, setLocation] = useState('location');
  const [temp, setTemp] = useState('Temp');
  const [input, setInput] = useState('');

  const inputNewValue = async () => {
    const newValue = `https://api.weatherapi.com/v1/current.json?key=d433f6fa64aa476c81d53521220204&q=${input}&aqi=no`;

    const { data } = await axios.get(newValue);

    setCondition(data.current?.condition?.text);
    setIcon(data.current?.condition?.icon);
    setTime(data.current?.last_updated);
    setLocation(data.location?.name);
    setTemp(data.current?.feelslike_c);

    // console.log(data);
  };

  useEffect(async () => {
    const { data } = await axios.get(url);

    setCondition(data.current?.condition?.text);
    setIcon(data.current?.condition?.icon);
    setTime(data.current?.last_updated);
    setLocation(data.location?.name);
    setTemp(data.current?.feelslike_c);

    // console.log(data);
  }, []);

  return (
    <div className="app">
      <main>
        <header>Weather App</header>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search"
            value={input}
            onChange={(event) => {
              setInput(event.target.value);
            }}
          />
          <div className="separator">
            <button onClick={inputNewValue}>Enter</button>
          </div>
        </div>
        <div className="location-box">
          <div className="location">{location}</div>
          <div className="dateAndTime">{time}</div>
        </div>
        <div className="weather-box">
          <div className="temp">{`${temp}°c`}</div>
          <div className="weather">{condition}</div>
          <img src={icon} alt="icon" />
        </div>
      </main>
    </div>
  );
}

export default App;
