import { optionType } from './index'
import { ChangeEvent } from 'react'
type Props = {
    term: string
    options: []
    handleOnChange: (e: ChangeEvent<HTMLInputElement>) => void
    chooseLocation: (option: optionType) => void
    onSubmit: () => void
}

export default function Search({term, options, handleOnChange, chooseLocation, onSubmit}: Props): JSX.Element {

  return (
    <section className='flex flex-col px-5 bg-white bg-opacity-20 backdrop-blur-md min-h-screen w-full max-w-[500px] drop-shadow-lg rounded-md pb-[100px] pt-[250px]'>
      <h1 className='text-[2rem] text-zinc-600 text-center'>
          Weather <span className='font-bold text-zinc-800'>Forecast</span>
        </h1>
        <p className='text-black text-center'>
            Enter a place below you want to know the weather of and select an option from the dropdown menu
        </p>
        <div className='flex mt-6 md:mt-4 bg-white p-1 mx-1 justify-between rounded-l-lg rounded-r-md'>
          <input 
            type='text'
            value={term}
            onChange={handleOnChange}
            className='p-2 border-2 border-white active:border-0 focus:border-0 w-[300px] min-[300px]:w-[300px]'
          />
          <button className='bg-red-500 p-2 rounded-r-md text-white text-[1.1rem] tracking-wide' onClick={onSubmit}>
            Search
          </button>
        </div>
        <div className={`flex flex-col  bg-white p-2 w-[250px] mx-2 rounded-lg mt-[5px] ${options.length === 0 || term ==='' ? 'hidden' : ''}`}>
          {options.map((option: optionType, index: number) => (<p className='p-1 text-black hover:bg-red-300 hover:text-white text-[1.1rem]' onClick={()=>chooseLocation(option)} key={`${option.name}, ${index}`}>{option.name}, {option.country}</p>))}
        </div>
    </section>
  )
}
