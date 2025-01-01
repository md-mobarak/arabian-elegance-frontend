/* eslint-disable @next/next/no-img-element */
import React from 'react'
import FlipClockCountdown from '@leenguyen/react-flip-clock-countdown';
import '@leenguyen/react-flip-clock-countdown/dist/index.css';

function OfferCard() {
  return (
<div className='px-12 lg:my-20 my-10'>
<div className='grid  flex-col-reverse lg:grid-cols-2 border-2 rounded-3xl border-gray-600 pt-6 pr-4'>

<section className='flex justify-center items-center'>
    <div>
        <div className='my-6'>
            <h1 className='text-center text-4xl font-serif font-bold'>Hurry Up! Offer ends in. <br/> Get
            UP TO 80% OFF</h1>
        </div>
    <FlipClockCountdown to={new Date().getTime() + 24 * 3600 * 1000 + 5000} />
    <div className='flex justify-center'>
    <button className="mt-4 px-6 md:px-8 py-2 md:py-3 bg-black text-white rounded-full hover:bg-pink-600">
                Shop Now
     </button>
    </div>
    </div>
     
    </section>
    <section>
<img src="https://html.pixelfit.agency/pesco/assets/images/banner/deal-1.png" alt=""/>
    </section>
   </div>
</div>
  )
}

export default OfferCard