import React from 'react'
import { getHumidityValue, getSunTime, getWindDirection, getPop, getVisibilityValue } from './helpers';
import Sunrise from './Icons/Sunrise';
import Sunset from './Icons/Sunset';
import { forecastType } from './index'
import Tile from './Tile';
import { FaArrowLeft } from 'react-icons/fa'

type Props = {
  goBack: () => void;
  forecasts: forecastType;
}

function Degree({temp}: {temp: number}): JSX.Element {
 return (
  <p>{temp}<span><sup>o</sup></span></p>
 )
}

export default function Forecasts({goBack, forecasts}: Props): JSX.Element {
  const today = forecasts.list
  
  return (
    <section className='flex flex-col px-7 pt-[100px] bg-white bg-opacity-20 backdrop-blur-md min-h-screen w-full max-w-[500px] drop-shadow-lg rounded-md pb-[100px]'>
     <i onClick={goBack} className='text-[2rem] absolute top-7 left-[10%]'><FaArrowLeft /></i>
     <div className=''>
        <h1 className='text-center  text-[2rem] font-bold text-black'>
          {forecasts.city.name}, 
          <span className='font-extralight text-zinc-600'> {forecasts.city.country}</span>
          <br />
          <Degree temp={Math.round(today[0].main.temp)} />
        </h1>
        <p className='text-sm text-center'>{today[0].weather[0].main} : {today[0].weather[0].description}</p>
        <p className='text-sm font-bold text-center flex justify-center'>High: (<Degree temp={Math.ceil(today[0].main.temp_max)}/>)</p>
        <p className='text-sm font-bold text-center flex justify-center'>low: (<Degree temp={Math.floor(today[0].main.temp_min)}/>)</p>
     </div>
     <section className='flex overflow-x-scroll w-full py-3'>
        {today.map((item, index)=>{
          return (
            <div key={index} className='w-[50px] flex flex-col items-center flex-shrink-0'>
              <p className='font-semibold'>{index === 0 ? 'Now': new Date(item.dt * 1000).getHours()}</p>
              <img alt={item.weather[0].description} src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}/>
              <p className='font-bold'><Degree temp={Math.round(item.main.temp)}/></p>
            </div>
          )
        })}
     </section>
     <section className='flex justify-between w-full mt-10'>
        <div className='bg-white flex flex-col items-center justify-center h-[100px] w-[47.5%] opacity-40 rounded-lg p-2'>
          <Sunrise />
          <p className='font-bold mt-3 text-lg'>{getSunTime(forecasts.city.sunrise)}</p>
        </div>
        <div className='bg-white flex flex-col items-center justify-center h-[100px] w-[47.5%] opacity-40 rounded-lg p-2'>
          <Sunset />
          <p className='font-bold mt-3 text-lg'>{getSunTime(forecasts.city.sunset)}</p>
        </div>
     </section>
     <section className='grid grid-cols-2 gap-[5%] w-full mt-3'>
        <Tile 
          icon='wind'
          title='Wind'
          info= {`${Math.round(today[0].wind.speed)} km/h`}
          description = {`${getWindDirection(Math.round(today[0].wind.deg))}, gust ${today[0].wind.gust.toFixed(1)} km/h`}
        />
        <Tile 
          icon='feels'
          title='Feels Like'
          info= {<Degree temp={Math.round(today[0].main.feels_like)}/>}
          description={`Feels ${Math.round(today[0].main.feels_like) < Math.round(today[0].main.temp) ? 'Colder' : 'Warmer'}`}
        />
        <Tile 
          icon = 'humidity'
          title= 'Humidity'
          info= {`${Math.round(today[0].main.humidity)}%`}
          description={getHumidityValue(Math.round(today[0].main.humidity))}
        />
        <Tile 
          icon='pop'
          title='Precipitation'
          info={`${Math.round(today[0].pop)}%`}
          description={`${(getPop(today[0].pop))}, clouds at ${today[0].clouds.all}`}
        />
        <Tile 
          icon = 'visibility'
          title= 'Visibility'
          info={`${(today[0].visibility)/1000} km/h`}
          description= {getVisibilityValue(today[0].visibility)}
        />
        <Tile 
          icon = 'pressure'
          title= 'Pressure'
          info={`${today[0].main.pressure} hPa`}
          description= {`${Math.round(today[0].main.pressure) < 1013 ? 'Lower' : 'Higher'} than standard`}
        />
     </section>
    </section>
  )
}
