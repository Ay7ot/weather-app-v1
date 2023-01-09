import { ChangeEvent, useState } from 'react'
import { optionType } from './index'

function App() {
  //http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}

  const [term, setTerm] = useState<string>('')
  const [options, setOptions] = useState<[]>([])
  const [city, setCity] = useState<optionType | null>()
  
  const runChange = (value: string) => {
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=5&appid=${import.meta.env.VITE_OPEN_WEATHER_MAP_API_KEY}`)
      .then(res=>res.json())
      .then(data=>setOptions(data))
  }
  
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => { 
    const value = e.target.value
    setTerm(value)
    if (value === '') return 
     
    runChange(value)
  }
  
  function chooseLocation(info: optionType){
    setTerm(`${info.name}, ${info.state !== undefined ? info.state : ''} ${info.country}`)
    setOptions([])
    setCity(info)
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${info.lat}&lon=${info.lon}&appid=${import.meta.env.VITE_OPEN_WEATHER_MAP_API_KEY}`)
      .then(res=>res.json())
      .then(data=>console.log(data))
  }

  return (
    <main className='font-Inter bg-gradient-to-bl from-blue-700 via-red-400 to-yellow-500 h-[100vh] flex items-center justify-center'>
      <section className='flex flex-col justify-center px-5 bg-white bg-opacity-20 backdrop-blur-md h-screen w-full max-w-[500px] drop-shadow-lg rounded-md'>
        <h1 className='text-[2rem] text-zinc-600 text-center'>
          Weather <span className='font-bold text-zinc-800'>Forecast</span>
        </h1>
        <p className='text-black text-center'>
            Enter a place below you want to know the weather of and select an option from the dropdown menu
        </p>
        <div className='flex mt-6 md:mt-4 bg-white p-1 mx-2 justify-between rounded-l-lg rounded-r-md'>
          <input 
            type='text'
            value={term}
            onChange={handleOnChange}
            className='p-2 border-2 border-white active:border-0 focus:border-0 w-[300px] min-[300px]:w-[300px]'
          />
          <button className='bg-red-500 p-2 rounded-r-md text-white text-[1.1rem] tracking-wide'>
            Search
          </button>
        </div>
        <div className={`flex flex-col  bg-white p-2 w-[250px] mx-2 rounded-lg mt-[5px] ${options.length !== 0 ? '' : 'hidden'}`}>
          {options.map((option: optionType, index) => (<p className='p-1 text-black hover:bg-red-300 hover:text-white text-[1.1rem]' onClick={()=>chooseLocation(option)} key={`${option.name}, ${index}`}>{option.name}, {option.country}</p>))}
        </div>
      </section>
    </main>
  )
}

export default App
