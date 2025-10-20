import React from 'react'

const Footer = () => {
    return (
        <div className='h-[70px]'>
            <code className='text-white h-full text-center flex items-center justify-center gap-1'>© {new Date().getFullYear()}  <a href="https://kingsworks.vercel.app">KingShowPlays</a></code>
        </div>
    )
}

export default Footer