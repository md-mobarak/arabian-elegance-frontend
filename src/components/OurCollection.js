import React from 'react'
import { GiBeveledStar } from "react-icons/gi";

function OurCollection() {

const productFilter =()=>{

}
  return (
    <div className='my-12 px-12'>

<div className='grid grid-cols-2 gap-5' >
<div >
<div className='flex  items-center'>
    <p><GiBeveledStar /></p>
    <p className='font-serif font-semibold text-pink-700'>Feature Products</p>
</div>
<h2 className='text-4xl font-bold font-serif '>Our Features Collection</h2>
</div>
<div className='grid grid-cols-3 border gap-2 font-semibold border-black rounded-full px-3 py-2'>
    <button className=' rounded-full hover:bg-[#13172B] hover:text-white transition-all duration-500'>New Products</button>
    <button className=' rounded-full hover:bg-[#13172B] hover:text-white transition-all duration-500'>Sale Products</button>
    <button className=' rounded-full hover:bg-[#13172B] hover:text-white transition-all duration-500'>Best Sellers</button>
</div>
</div>
{/* card map  */}
<div>

</div>
    </div>
  )
}

export default OurCollection