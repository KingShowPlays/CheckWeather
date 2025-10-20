'use client'
import React, { useState } from 'react'
import Search from '@/public/assets/svg/icon-search.svg'
import Image from 'next/image'

const cityList = ['USA', 'Nigeria', 'Canada']

const Hero = ({ onSearch }) => {
    const [open, setOpen] = useState(false)
    const [search, setSearch] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        if (search.trim()) {
            onSearch(search.trim())
        }
    }

    return (
        <section id='search'>
            <h1 className='text-4xl text-white text-center font-extrabold max-sm:w-[90%] max-sm:m-auto'>
                How&apos;s the sky looking today?
            </h1>
            <form
                onSubmit={handleSubmit}
                className='flex max-sm:flex-col max-sm:w-[90%] justify-center items-center w-[70%] m-auto mt-4 gap-2'
            >
                <div className='flex relative w-[70%] max-sm:w-[100%] items-center'>
                    <Image src={Search} alt='icon' width={0} height={0} className='absolute left-4' />
                    <input
                        type="text"
                        placeholder='Search for a place..'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onFocus={() => setOpen(true)}
                        onBlur={() => setTimeout(() => setOpen(false), 150)}
                        className='bg-Neutral-800 p-2 pl-11 rounded-md text-white placeholder:text-Neutral-300 w-full'
                    />

                    {/* Dropdown */}
                    <div className={`bg-Neutral-800 ${open ? 'flex' : 'hidden'} flex-col absolute right-0 bottom-0 translate-y-[103%] z-30 py-1 w-full border border-Neutral-700 rounded-md`}>
                        <ul className='flex flex-col drop w-full text-white px-2'>
                            {cityList.map((deg, id) => (
                                <li
                                    key={id}
                                    className='py-[5px] px-2 capitalize rounded-md cursor-pointer transition hover:bg-Neutral-600 relative'
                                    onClick={() => {
                                        setSearch(deg)
                                        onSearch(deg)
                                        setOpen(false)
                                    }}
                                >
                                    {deg}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <button
                    type='submit'
                    className='text-white bg-Blue-500 p-2 px-5 rounded-md w-fit max-sm:w-[100%]'
                >
                    Search
                </button>
            </form>
        </section>
    )
}

export default Hero
