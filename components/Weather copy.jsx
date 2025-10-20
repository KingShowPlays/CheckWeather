'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import bgL from '@/public/assets/svg/bg-today-large.svg'
import bgS from '@/public/assets/svg/bg-today-small.svg'
import Lightning from '@/public/assets/images/icon-storm.webp'
import Sun from '@/public/assets/images/icon-sunny.webp'
import Snow from '@/public/assets/images/icon-snow.webp'
import Rain from '@/public/assets/images/icon-rain.webp'
import Partly from '@/public/assets/images/icon-partly-cloudy.webp'
import Drop from '@/public/assets/svg/icon-dropdown.svg'
import Check from '@/public/assets/svg/icon-checkmark.svg'
import { useStateContext } from '@/context/requestContext'
const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
const Weather = () => {
    const [day, setCurrentDay] = useState('monday')
    const [open, setOpen] = useState(false)
    const {
        currentDeg,
        setCurrentDeg,
        currentWind,
        setWind,
        currentPrec,
        setCurrentPrec
    } = useStateContext()

    const openDays = () => {
        setOpen(prev => !prev)
    }
    const toFah = (x) => {
        return (x * 9 / 5) + 32
    }
    const toMph = (x) => {
        return x * 120
    }
    const toIn = (x) => {
        return x / 120
    }

    return (
        <section id='weather' className='container flex max-lg:flex-col !mt-8 gap-4 text-white'>
            <div className='flex-[0.7] flex flex-col justify-between'>
                <div className='flex max-sm:flex-col relative z-10 items-center w-full h-[220px] justify-around rounded-lg overflow-hidden'>
                    <Image src={bgL} alt='showcase' width={0} height={0} className='absolute top-0 h-[100%] object-cover hidden sm:block' />
                    <Image src={bgS} alt='showcase' width={0} height={0} className='absolute top-0 w-full h-[100%] object-cover block sm:hidden' />

                    <div className='z-10 text-center'>
                        <h3>Berlin, Germany</h3>
                        <p className='text-Neutral-300'>Tuesday, Aug 5,2025</p>
                    </div>
                    <div className='z-10 flex items-center max-sm:w-full max-sm:justify-center gap-4'>
                        <Image src={Sun} alt='sun' width={0} height={0} className='h-[100px] w-[100px]' />
                        <h1 className='font-semibold text-6xl relative '>20<span className='text-[25px] absolute self-start -right-4 top-0'>o</span></h1>
                    </div>
                </div>
                <div className='grid grid-cols-4 max-sm:grid-cols-2 mt-4 gap-3'>
                    <div className='flex flex-col bg-Neutral-800 p-2 rounded-lg'>
                        <p className='text-Neutral-300'>Feels Like</p>
                        <p className='flex text-2xl relative'>{currentDeg === 'celcius' ? 18 : toFah(18)}<span className='text-sm absolute self-start left-7 -top-0.5'>o</span></p>
                    </div>
                    <div className='flex flex-col bg-Neutral-800 p-2 rounded-lg'>
                        <p className='text-Neutral-300'>Humidity</p>
                        <p className='flex text-2xl'>46<span>%</span></p>
                    </div>
                    <div className='flex flex-col bg-Neutral-800 p-2 rounded-lg'>
                        <p className='text-Neutral-300'>Wind</p>
                        <p className='flex text-2xl'>14&nbsp;<span>{currentWind === 'km/h' ? ' km/h' : ' mph'}</span></p>
                    </div>
                    <div className='flex flex-col bg-Neutral-800 p-2 rounded-lg'>
                        <p className='text-Neutral-300'>Precipation</p>
                        <p className='flex text-2xl'>0&nbsp;<span> {currentPrec === 'mm' ? ' mm' : ' in'}</span></p>
                    </div>
                </div>
                <div className='mt-4'>
                    <h3>Daily forecast</h3>
                    <div className='grid grid-cols-7 max-sm:grid-cols-3 mt-1 gap-3'>
                        <div className='flex flex-col bg-Neutral-800 p-2 rounded-lg'>
                            <p className='text-center'>Tue</p>
                            <Image src={Lightning} alt='icon' width={0} height={0} className='w-15 h-15 self-center' />
                            <div className='flex justify-around'>
                                <span className='relative'>{currentDeg === 'celcius' ? 15 : toFah(15)}<span className='text-[7px] absolute self-start left-5 top-0'>o</span></span>
                                <span className='relative'>{currentDeg === 'celcius' ? 18 : toFah(18)}<span className='text-[7px] absolute self-start left-5 top-0'>o</span></span>
                            </div>
                        </div>
                        <div className='flex flex-col bg-Neutral-800 p-2 rounded-lg'>
                            <p className='text-center'>Wed</p>
                            <Image src={Rain} alt='icon' width={0} height={0} className='w-15 h-15 self-center' />
                            <div className='flex justify-around'>
                                <span className='relative'>{currentDeg === 'celcius' ? 21 : toFah(21)}<span className='text-[7px] absolute self-start left-5 top-0'>o</span></span>
                                <span className='relative'>{currentDeg === 'celcius' ? 25 : toFah(25)}<span className='text-[7px] absolute self-start left-5 top-0'>o</span></span>
                            </div>
                        </div>
                        <div className='flex flex-col bg-Neutral-800 p-2 rounded-lg'>
                            <p className='text-center'>Thu</p>
                            <Image src={Snow} alt='icon' width={0} height={0} className='w-15 h-15 self-center' />
                            <div className='flex justify-around'>
                                <span className='relative'>{currentDeg === 'celcius' ? 19 : toFah(19)}<span className='text-[7px] absolute self-start left-5 top-0'>o</span></span>
                                <span className='relative'>{currentDeg === 'celcius' ? 18 : toFah(18)}<span className='text-[7px] absolute self-start left-5 top-0'>o</span></span>
                            </div>
                        </div>
                        <div className='flex flex-col bg-Neutral-800 p-2 rounded-lg'>
                            <p className='text-center'>Fri</p>
                            <Image src={Partly} alt='icon' width={0} height={0} className='w-15 h-15 self-center' />
                            <div className='flex justify-around'>
                                <span className='relative'>{currentDeg === 'celcius' ? 18 : toFah(18)}<span className='text-[7px] absolute self-start left-5 top-0'>o</span></span>
                                <span className='relative'>{currentDeg === 'celcius' ? 22 : toFah(22)}<span className='text-[7px] absolute self-start left-5 top-0'>o</span></span>
                            </div>
                        </div>
                        <div className='flex flex-col bg-Neutral-800 p-2 rounded-lg'>
                            <p className='text-center'>Sat</p>
                            <Image src={Sun} alt='icon' width={0} height={0} className='w-15 h-15 self-center' />
                            <div className='flex justify-around'>
                                <span className='relative'>{currentDeg === 'celcius' ? 23 : toFah(23)}<span className='text-[7px] absolute self-start left-5 top-0'>o</span></span>
                                <span className='relative'>{currentDeg === 'celcius' ? 25 : toFah(25)}<span className='text-[7px] absolute self-start left-5 top-0'>o</span></span>
                            </div>
                        </div>
                        <div className='flex flex-col bg-Neutral-800 p-2 rounded-lg'>
                            <p className='text-center'>Sun</p>
                            <Image src={Lightning} alt='icon' width={0} height={0} className='w-15 h-15 self-center' />
                            <div className='flex justify-around'>
                                <span className='relative'>{currentDeg === 'celcius' ? 20 : toFah(20)}<span className='text-[7px] absolute self-start left-5 top-0'>o</span></span>
                                <span className='relative'>{currentDeg === 'celcius' ? 23 : toFah(23)}<span className='text-[7px] absolute self-start left-5 top-0'>o</span></span>
                            </div>
                        </div>
                        <div className='flex flex-col bg-Neutral-800 p-2 rounded-lg'>
                            <p className='text-center'>Mon</p>
                            <Image src={Rain} alt='icon' width={0} height={0} className='w-15 h-15 self-center' />
                            <div className='flex justify-around'>
                                <span className='relative'>{currentDeg === 'celcius' ? 15 : toFah(15)}<span className='text-[7px] absolute self-start left-5 top-0'>o</span></span>
                                <span className='relative'>{currentDeg === 'celcius' ? 19 : toFah(19)}<span className='text-[7px] absolute self-start left-5 top-0'>o</span></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex-[0.3] bg-Neutral-800 p-2 rounded-lg'>
                <div className='flex relative justify-between items-center mb-2'>
                    <h3>Hourly forecast</h3>
                    <button className='flex text-white gap-2 items-center bg-Neutral-600 p-2 rounded-md cursor-pointer' onClick={openDays}>
                        <span className='capitalize'>{day}</span>
                        <Image src={Drop} alt='icon' width={0} height={0} />
                    </button>
                    <div className={`bg-Neutral-800 shadow-sm shadow-Neutral-600 ${open ? 'flex' : 'hidden'} absolute right-5 bottom-0 translate-y-[102%] z-30 py-1 w-[190px] border border-Neutral-700 rounded-md`}>
                        <ul className='flex flex-col drop w-full p-2'>
                            {days.map((days, id) => (
                                <li className='py-[5px] px-[10px] capitalize rounded-md cursor-pointer transition hover:bg-Neutral-600' key={id} onClick={() => { setCurrentDay(days); setOpen(false) }}><span className='flex justify-between'> {days}{days === day && <Image src={Check} alt='check' width={0} height={0} />}</span></li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className='flex flex-col gap-2'>
                    <div className='flex items-center justify-between bg-Neutral-700 p-2 rounded-md'>
                        <div className='flex items-center gap-2'>
                            <Image src={Rain} alt='icon' width={0} height={0} className='w-7.5 h-7.5' />
                            <span>3 PM</span>
                        </div>
                        <p className='flex relative pr-3'>20 <span className='text-[7px] absolute self-start left-5 top-0'>o</span></p>
                    </div>
                    <div className='flex items-center justify-between bg-Neutral-700 p-2 rounded-md'>
                        <div className='flex items-center gap-2'>
                            <Image src={Snow} alt='icon' width={0} height={0} className='w-7.5 h-7.5' />
                            <span>3 PM</span>
                        </div>
                        <p className='flex relative pr-3'>20 <span className='text-[7px] absolute self-start left-5 top-0'>o</span></p>
                    </div>
                    <div className='flex items-center justify-between bg-Neutral-700 p-2 rounded-md'>
                        <div className='flex items-center gap-2'>
                            <Image src={Lightning} alt='icon' width={0} height={0} className='w-7.5 h-7.5' />
                            <span>3 PM</span>
                        </div>
                        <p className='flex relative pr-3'>20 <span className='text-[7px] absolute self-start left-5 top-0'>o</span></p>
                    </div>
                    <div className='flex items-center justify-between bg-Neutral-700 p-2 rounded-md'>
                        <div className='flex items-center gap-2'>
                            <Image src={Partly} alt='icon' width={0} height={0} className='w-7.5 h-7.5' />
                            <span>3 PM</span>
                        </div>
                        <p className='flex relative pr-3'>20 <span className='text-[7px] absolute self-start left-5 top-0'>o</span></p>
                    </div>
                    <div className='flex items-center justify-between bg-Neutral-700 p-2 rounded-md'>
                        <div className='flex items-center gap-2'>
                            <Image src={Sun} alt='icon' width={0} height={0} className='w-7.5 h-7.5' />
                            <span>3 PM</span>
                        </div>
                        <p className='flex relative pr-3'>20 <span className='text-[7px] absolute self-start left-5 top-0'>o</span></p>
                    </div>
                    <div className='flex items-center justify-between bg-Neutral-700 p-2 rounded-md'>
                        <div className='flex items-center gap-2'>
                            <Image src={Rain} alt='icon' width={0} height={0} className='w-7.5 h-7.5' />
                            <span>3 PM</span>
                        </div>
                        <p className='flex relative pr-3'>20 <span className='text-[7px] absolute self-start left-5 top-0'>o</span></p>
                    </div>
                    <div className='flex items-center justify-between bg-Neutral-700 p-2 rounded-md'>
                        <div className='flex items-center gap-2'>
                            <Image src={Partly} alt='icon' width={0} height={0} className='w-7.5 h-7.5' />
                            <span>3 PM</span>
                        </div>
                        <p className='flex relative pr-3'>20 <span className='text-[7px] absolute self-start left-5 top-0'>o</span></p>
                    </div>
                    <div className='flex items-center justify-between bg-Neutral-700 p-2 rounded-md'>
                        <div className='flex items-center gap-2'>
                            <Image src={Lightning} alt='icon' width={0} height={0} className='w-7.5 h-7.5' />
                            <span>3 PM</span>
                        </div>
                        <p className='flex relative pr-3'>20 <span className='text-[7px] absolute self-start left-5 top-0'>o</span></p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Weather