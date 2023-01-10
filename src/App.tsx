import { ChangeEvent, useState } from 'react'
import { optionType } from './index'
import { useForecasts } from './hooks/useForecasts'
import { forecastType } from './index'
import Search from './Search'
import Forecasts from './Forecasts'

function App() {
  //http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}

  const {
    term,
    options,
    city,
    forecasts,
    handleOnChange,
    chooseLocation,
    onSubmit,
    goBack
  } = useForecasts()


  return (
    <main className='font-Inter bg-gradient-to-bl from-blue-700 via-red-400 to-yellow-500 min-h-screen flex items-center justify-center'>
      <section className='flex flex-col px-5 bg-white bg-opacity-20 backdrop-blur-md min-h-screen w-full max-w-[500px] drop-shadow-lg rounded-md pb-[100px]'>
        {forecasts ? (
          <Forecasts goBack={goBack} forecasts={forecasts}/>
        ): (
          <Search term={term} handleOnChange={handleOnChange} chooseLocation={chooseLocation} options={options} onSubmit={onSubmit}/>
        )}
      </section>
    </main>
  )
}

export default App
