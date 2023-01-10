import { useState, useEffect, ChangeEvent } from "react"
import { optionType, forecastType } from "./../index"


export const useForecasts = () => {
    const [term, setTerm] = useState<string>('')
    const [options, setOptions] = useState<[]>([])
    const [city, setCity] = useState<optionType | null>()
    const [forecasts, setForecasts] = useState<forecastType | null>(null)
    
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
    }
    
    function onSubmit(){
      if (!city) return
      
      fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&units=metric&appid=${import.meta.env.VITE_OPEN_WEATHER_MAP_API_KEY}`)
        .then(res=>res.json())
        .then(data=>setForecasts({
          ...data, 
          list: data.list.splice(0, 15)
        }))
    }
    
    function goBack(){
      if (!forecasts) return
      setTerm('')
      setOptions([])
      setCity(null)
      setForecasts(null)
    }
    
    console.log(forecasts)
    
    return {
      term,
      options,
      city,
      forecasts,
      handleOnChange,
      chooseLocation,
      onSubmit,
      goBack
    }
}