import React from 'react'
import Feels from './Icons/Feels'
import Humidity from './Icons/Humidity'
import Pop from './Icons/Pop'
import Pressure from './Icons/Pressure'
import Visibility from './Icons/Visibility'
import Wind from './Icons/Wind'

type Props = {
  icon: 'wind' | 'feels' | 'humidity' | 'visibility' | 'visibility' | 'pop'
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
    <article>
        <div className='flex items-center text-lg'>
          <Icon />
          <h4 className='ml-3 font-bold'>{title}</h4>
        </div>
        <p>{info}</p>
        <p>{description}</p>
    </article>
  )
}
