import React, { useEffect, useState } from 'react'
import './main.css'
import Weather from './Weather'
function Search() {
    const [search, setSearch] = useState('mumbai')
    const [tempInfo, setTempInfo] = useState({})

    const getweatherInfo = () => {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=6affc7340c0d1599bb615e8fc3568265`)
      .then(res => res.json())
      .then((data) => {
        const {temp, humidity, pressure} = data.main
        const {main: weatherType} = data.weather[0];
        const {name} = data
        const {speed} = data.wind
        const {country, sunset} = data.sys

        const myNewWeatherInfo = {
            temp,
            humidity, 
            pressure,
            weatherType,
            name,
            speed,
            country,
            sunset
        }
        setTempInfo(myNewWeatherInfo)
     })
     .catch(err => console.log(err))
     
    }
    useEffect(() => {
        getweatherInfo()
    }, [])
  return (
    <>
    <div className='wrap'>
        <div className="search">
            <input 
            type="search"
             placeholder='Search City..'
             id='search'
             value ={search}
             onChange={(e) => setSearch(e.target.value)}/>
        <button className="searchButton" onClick={getweatherInfo}>Search  </button>
        </div>
    </div>
    {/* This the the weather details page */}
    <Weather {...tempInfo}/>
    </>
  )
}

export default Search