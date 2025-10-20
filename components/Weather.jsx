'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import bgL from '@/public/assets/svg/bg-today-large.svg';
import bgS from '@/public/assets/svg/bg-today-small.svg';
import Lightning from '@/public/assets/images/icon-storm.webp';
import Sun from '@/public/assets/images/icon-sunny.webp';
import Snow from '@/public/assets/images/icon-snow.webp';
import Rain from '@/public/assets/images/icon-rain.webp';
import Partly from '@/public/assets/images/icon-partly-cloudy.webp';
import Drop from '@/public/assets/svg/icon-dropdown.svg';
import Check from '@/public/assets/svg/icon-checkmark.svg';
import { useStateContext } from '@/context/requestContext';

const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

const getWeatherIcon = (code) => {
    if (code === undefined || code === null) return Sun;

    // Open-Meteo WMO Weather Interpretation Codes
    // https://open-meteo.com/en/docs
    if ([0, 1].includes(code)) return Sun; // clear
    if ([2, 3].includes(code)) return Partly; // partly cloudy
    if ([45, 48].includes(code)) return Partly; // fog
    if ([51, 53, 55, 56, 57].includes(code)) return Rain; // drizzle
    if ([61, 63, 65, 66, 67].includes(code)) return Rain; // rain
    if ([71, 73, 75, 77, 85, 86].includes(code)) return Snow; // snow
    if ([80, 81, 82].includes(code)) return Rain; // rain showers
    if ([95, 96, 99].includes(code)) return Lightning; // thunderstorm
    return Sun;
};


const Weather = ({ city }) => {
    const [day, setCurrentDay] = useState('monday');
    const [open, setOpen] = useState(false);
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const { currentDeg, currentWind, currentPrec } = useStateContext();

    const toFah = (x) => (x * 9) / 5 + 32;
    const toMph = (x) => x * 1.609;
    const toIn = (x) => x / 25.4;

    const openDays = () => setOpen((p) => !p);

    // 🧭 fetch weather data
    useEffect(() => {
        if (!city) return;

        const fetchWeather = async () => {
            setLoading(true);
            setError('');
            try {
                const geoRes = await fetch(`/api/location?location=${encodeURIComponent(city)}`);
                const geoText = await geoRes.text();
                if (!geoText) throw new Error('No response from location API');
                const geoData = JSON.parse(geoText);
                if (!geoRes.ok || !geoData.lat) throw new Error(geoData.error || 'Failed to locate city');

                const weatherRes = await fetch(`/api/weather?lat=${geoData.lat}&lon=${geoData.lon}`);
                const weatherText = await weatherRes.text();
                if (!weatherText) throw new Error('No response from weather API');
                const weatherData = JSON.parse(weatherText);
                if (!weatherRes.ok) throw new Error(weatherData.error || 'Failed to fetch weather');

                setWeather(weatherData);
            } catch (err) {
                console.error(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchWeather();
    }, [city]);

    const dayIndex = days.indexOf(day.toLowerCase());
    const currentIcon =
        weather?.daily?.weathercode && weather.daily.weathercode[dayIndex] !== undefined
            ? getWeatherIcon(weather.daily.weathercode[dayIndex])
            : Sun;

    if (loading) {
        return (
            <section className="flex justify-center items-center h-[300px] text-white">
                <div className="animate-pulse text-center">
                    <p className="text-lg">Fetching weather for {city}...</p>
                    <p className="text-sm text-Neutral-400">Please wait</p>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="text-center text-red-400 mt-10">
                <p>⚠️ {error}</p>
            </section>
        );
    }
    console.log("hey", weather?.daily?.weathercode);

    return (
        <section id="weather" className="container flex max-lg:flex-col !mt-8 gap-4 text-white">
            {/* LEFT SIDE */}
            <div className="flex-[0.7] flex flex-col justify-between">

                {/* CURRENT WEATHER CARD */}
                <div className="flex max-sm:flex-col relative z-10 items-center w-full h-[220px] justify-around rounded-lg overflow-hidden">
                    <Image src={bgL} alt="bg" className="absolute top-0 h-full w-full object-cover hidden sm:block" />
                    <Image src={bgS} alt="bg" className="absolute top-0 w-full h-full object-cover block sm:hidden" />

                    <div className="z-10 text-center">
                        <h3>{city}</h3>
                        <p className="text-Neutral-300">
                            {new Date().toLocaleDateString('en-US', {
                                weekday: 'long',
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                            })}
                        </p>
                    </div>

                    <div className="z-10 flex items-center max-sm:w-full max-sm:justify-center gap-4">
                        <Image src={currentIcon} alt="weather icon" className="h-[100px] w-[100px]" />
                        <h1 className="font-semibold text-6xl relative">
                            {weather ? Math.round(weather.daily?.temperature_2m_max?.[dayIndex] ?? 20) : 20}
                            <span className="text-[25px] absolute self-start -right-4 top-0">°</span>
                        </h1>
                    </div>
                </div>

                {/* BASIC STATS */}
                <div className="grid grid-cols-4 max-sm:grid-cols-2 mt-4 gap-3">
                    <div className="flex flex-col bg-Neutral-800 p-2 rounded-lg">
                        <p className="text-Neutral-300">Feels Like</p>
                        <p className="flex text-2xl relative">
                            {currentDeg === 'celcius'
                                ? Math.round(weather?.daily?.temperature_2m_max?.[dayIndex] ?? 18)
                                : Math.round(toFah(weather?.daily?.temperature_2m_max?.[dayIndex] ?? 18))}
                            <span className="text-sm absolute self-start left-7 -top-0.5">°</span>
                        </p>
                    </div>

                    <div className="flex flex-col bg-Neutral-800 p-2 rounded-lg">
                        <p className="text-Neutral-300">Humidity</p>
                        <p className="flex text-2xl">
                            {Math.round(weather?.hourly?.relative_humidity_2m?.[dayIndex * 24] ?? 46)}%
                        </p>
                    </div>

                    <div className="flex flex-col bg-Neutral-800 p-2 rounded-lg">
                        <p className="text-Neutral-300">Wind</p>
                        <p className="flex text-2xl">
                            {Math.round(currentWind === 'km/h'
                                ? weather?.hourly?.wind_speed_10m?.[dayIndex * 24] ?? 14
                                : toMph(weather?.hourly?.wind_speed_10m?.[dayIndex * 24] ?? 14))}
                            &nbsp;<span>{currentWind}</span>
                        </p>
                    </div>

                    <div className="flex flex-col bg-Neutral-800 p-2 rounded-lg">
                        <p className="text-Neutral-300">Precipitation</p>
                        <p className="flex text-2xl">
                            {Math.round(currentPrec === 'mm'
                                ? weather?.daily?.precipitation_sum?.[dayIndex] ?? 0
                                : toIn(weather?.daily?.precipitation_sum?.[dayIndex] ?? 0))}
                            &nbsp;<span>{currentPrec}</span>
                        </p>
                    </div>
                </div>

                {/* DAILY FORECAST */}
                <div className="mt-4">
                    <h3>Daily forecast</h3>
                    <div className="grid grid-cols-7 max-sm:grid-cols-3 mt-1 gap-3">
                        {weather?.daily?.time?.slice(0, 7)?.map((t, i) => (
                            <div key={i} className="flex flex-col bg-Neutral-800 p-2 rounded-lg">
                                <p className="text-center">
                                    {new Date(t).toLocaleDateString('en-US', { weekday: 'short' })}
                                </p>
                                <Image
                                    src={getWeatherIcon(weather.daily.weathercode?.[i])}
                                    alt="icon"
                                    className="w-15 h-15 self-center"
                                />
                                <div className="flex justify-around">
                                    <span className="relative">
                                        {Math.round(weather.daily.temperature_2m_min?.[i] ?? 0)}
                                        <span className="text-[7px] absolute self-start left-5 top-0">°</span>
                                    </span>
                                    <span className="relative">
                                        {Math.round(weather.daily.temperature_2m_max?.[i] ?? 0)}
                                        <span className="text-[7px] absolute self-start left-5 top-0">°</span>
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* RIGHT SIDE (Hourly forecast) */}
            <div className="flex-[0.3] bg-Neutral-800 p-2 rounded-lg">
                <div className="flex relative justify-between items-center mb-2">
                    <h3>Hourly forecast</h3>
                    <button
                        className="flex text-white gap-2 items-center bg-Neutral-600 p-2 rounded-md cursor-pointer"
                        onClick={openDays}
                    >
                        <span className="capitalize">{day}</span>
                        <Image src={Drop} alt="icon" width={0} height={0} />
                    </button>

                    {open && (
                        <div className="bg-Neutral-800 shadow-sm shadow-Neutral-600 absolute right-5 bottom-0 translate-y-[102%] z-30 py-1 w-[190px] border border-Neutral-700 rounded-md">
                            <ul className="flex flex-col w-full p-2">
                                {days.map((d, id) => (
                                    <li
                                        key={id}
                                        className="py-[5px] px-[10px] capitalize rounded-md cursor-pointer transition hover:bg-Neutral-600"
                                        onClick={() => {
                                            setCurrentDay(d);
                                            setOpen(false);
                                        }}
                                    >
                                        <span className="flex justify-between">
                                            {d}
                                            {d === day && <Image src={Check} alt="check" width={0} height={0} />}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                {/* HOURLY LIST */}
                <div className="flex flex-col gap-2">
                    {weather?.hourly?.time ? (
                        weather.hourly.time
                            .slice(dayIndex * 24, dayIndex * 24 + 8)
                            .map((t, i) => (
                                <div
                                    key={i}
                                    className="flex items-center justify-between bg-Neutral-700 p-2 rounded-md"
                                >
                                    <div className="flex items-center gap-2">
                                        <Image
                                            src={getWeatherIcon(weather.hourly.weathercode?.[dayIndex * 24 + i])}
                                            alt="icon"
                                            className="w-7.5 h-7.5"
                                        />
                                        <span>{new Date(t).getHours()}:00</span>
                                    </div>
                                    <p className="flex relative pr-3">
                                        {Math.round(weather.hourly.temperature_2m?.[dayIndex * 24 + i] ?? 0)}
                                        <span className="text-[7px] absolute self-start left-5 top-0">°</span>
                                    </p>
                                </div>
                            ))
                    ) : (
                        <p className="text-center text-gray-400">Loading hourly forecast...</p>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Weather;
