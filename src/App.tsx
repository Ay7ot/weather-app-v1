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
      
        {forecasts ? (
          <Forecasts goBack={goBack} forecasts={forecasts}/>
        ): (
          <Search term={term} handleOnChange={handleOnChange} chooseLocation={chooseLocation} options={options} onSubmit={onSubmit}/>
        )}
      
    </main>
  )
}

export default App
