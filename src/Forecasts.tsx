import React from 'react'
import { forecastType } from './index'

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
    <div className='flex flex-col justify-center items-center pt-5 px-10'> 
     <div className=''>
        <h1 className='text-center  text-[2rem] font-bold text-black'>
          {forecasts.city.name}, 
          <span className='font-extralight text-zinc-600'> {forecasts.city.country}</span>
          <br />
          <Degree temp={Math.round(today[0].main.temp)} />
        </h1>
        <p className='text-sm'>{today[0].weather[0].main} : {today[0].weather[0].description}</p>
     </div>
     <section className='flex overflow-x-scroll w-full py-3'>
        {today.map((item, index)=>{
          return (
            <div key={index} className='w-[50px] flex flex-col items-center flex-shrink-0'>
              <p className='font-semibold'>{index === 0 ? 'Now': new Date(item.dt * 1000).getHours()}</p>
              <img alt={item.weather[0].description} src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}/>
              <p><Degree temp={Math.round(item.main.temp)}/></p>
            </div>
          )
        })}
     </section>
      <button onClick={goBack} className='bg-red-400 p-3 rounded-lg text-white w-[200px] tracking-wider font-light'>Go Back</button>
    </div>
  )
}
