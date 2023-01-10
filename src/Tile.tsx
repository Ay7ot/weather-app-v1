import React from 'react'
import Feels from './Icons/Feels'
import Humidity from './Icons/Humidity'
import Pop from './Icons/Pop'
import Pressure from './Icons/Pressure'
import Visibility from './Icons/Visibility'
import Wind from './Icons/Wind'

type Props = {
  icon: 'wind' | 'feels' | 'humidity' | 'visibility' | 'visibility' | 'pop' | 'pressure'
  title: string 
  info: string | JSX.Element
  description: string
}

const icons = {
  wind: Wind,
  feels: Feels,
  humidity: Humidity,
  visibility: Visibility,
  pressure: Pressure,
  pop: Pop
}

export default function Tile({ icon, title, info, description }: Props): JSX.Element {
 const Icon = icons[icon]  
  return (
    <article className='bg-white opacity-40 rounded-lg p-2'>
        <div className='flex items-center text-[1.05rem] font-bold'>
          <Icon />
          <h4 className='ml-3'>{title}</h4>
        </div>
        <p className='mt-3 font-semibold text-[1.2rem]'>{info}</p>
        <p className='mt-3 font-bold text-[0.8rem]'>{description}</p>
    </article>
  )
}
