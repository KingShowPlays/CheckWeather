'use client'
import React, { useState } from 'react'
import Logo from '@/public/assets/svg/logo.svg'
import Units from '@/public/assets/svg/icon-units.svg'
import Drop from '@/public/assets/svg/icon-dropdown.svg'
import Check from '@/public/assets/svg/icon-checkmark.svg'
import Image from 'next/image'
import { useStateContext } from '@/context/requestContext'
const degree = ['celcius', 'fahrenheit']
const wind = ['km/h', 'mph']
const prec = ['mm', 'in']
const Header = () => {
  const [open, setOpen] = useState(false)
  const openUnits = () => {
    setOpen(prev => !prev)
  }
  const {
    currentDeg,
    setCurrentDeg,
    currentWind,
    setWind,
    currentPrec,
    setCurrentPrec
  } = useStateContext()

  return (
    <header className='h-[70px]'>
      <div className='container h-full flex justify-between items-center relative'>
        <div><Image src={Logo} alt='icon' width={0} height={0} priority /></div>
        <button onClick={openUnits} className='flex text-white gap-2 cursor-pointer items-center bg-Neutral-800 p-2 rounded-sm '>
          <Image src={Units} alt='icon' width={0} height={0} />
          Units
          <Image src={Drop} alt='icon' width={0} height={0} />
        </button>
        <div className={`bg-Neutral-800 shadow-sm shadow-Neutral-600 ${open ? 'flex' : 'hidden'}  flex-col absolute right-0 bottom-0 translate-y-[100%] z-30 py-1 w-[190px] border border-Neutral-700 rounded-md`}>
          <button className='text-white text-left px-4'>Switch to imperial</button>
          <p className='text-Neutral-300 text-sm pt-2 px-4'>Temperature</p>
          <ul className='flex flex-col drop w-full text-white px-2'>
            {degree.map((deg, id) => (
              <li key={id} className='py-[5px] px-2 capitalize rounded-md cursor-pointer transition hover:bg-Neutral-600 relative' onClick={() => { setCurrentDeg(deg) }}><span className='flex justify-between'> <span>{deg === 'celcius' ? 'Celcius' : 'Fahrenheit'} <span className='relative'><span className='text-[7px] absolute self-start left-1.5 top-0'>o</span>(&nbsp;{deg === 'celcius' ? ' C' : ' F'})</span></span> {currentDeg === deg && <Image src={Check} alt='check' width={0} height={0} />} </span></li>
            ))}
            <hr className='text-Neutral-300 mt-1' />
          </ul>
          <p className='text-Neutral-300 text-sm pt-2 px-4'>Wind Speed</p>
          <ul className='flex flex-col drop w-full text-white px-2'>
            {wind.map((deg, id) => (
              <li key={id} className='py-[5px] px-2 capitalize rounded-md cursor-pointer transition hover:bg-Neutral-600 relative' onClick={() => { setWind(deg) }}><span className='flex justify-between'> <span>{deg === 'km/h' ? 'km/h' : 'mph'} </span> {currentWind === deg && <Image src={Check} alt='check' width={0} height={0} />} </span></li>
            ))}
            <hr className='text-Neutral-300 mt-1' />
          </ul>
          <p className='text-Neutral-300 text-sm pt-2 px-4'>Precipitation</p>
          <ul className='flex flex-col drop w-full text-white px-2'>
            {prec.map((deg, id) => (
              <li key={id} className='py-[5px] px-2 capitalize rounded-md cursor-pointer transition hover:bg-Neutral-600 relative' onClick={() => { setCurrentPrec(deg) }}><span className='flex justify-between'> <span>{deg === 'mm' ? 'millimeters' : 'inches'} (&nbsp;{deg === 'mm' ? 'mm' : 'in'})</span>{currentPrec === deg && <Image src={Check} alt='check' width={0} height={0} />} </span></li>
            ))}
          </ul>
        </div>
      </div>
    </header >
  )
}

export default Header