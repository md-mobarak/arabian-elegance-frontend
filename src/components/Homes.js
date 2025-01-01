import React from 'react'
import HeroSection from './HeroSection'
import ScrollingText from './ScrollingText'
import StayingProduct from './StayingProduct'
import CategoryHighlights from './CategoryHighlights'
import UpToProduct from './UpToProduct'
import OurCollection from './OurCollection'
import WorkProcessing from './WorkProcessing'
import TrendingProducts from './TrendingProducts'
import Testimonials from './Testimonials'
import OfferCard from './OfferCard'

function Homes() {
  return (
    <div>
    <HeroSection></HeroSection>
    <ScrollingText ></ScrollingText>
    <StayingProduct></StayingProduct>
    <CategoryHighlights></CategoryHighlights>
    <UpToProduct></UpToProduct>
    <OurCollection></OurCollection>
    <WorkProcessing></WorkProcessing>
    <TrendingProducts></TrendingProducts>
    <OfferCard></OfferCard>
    {/* <Testimonials></Testimonials> */}
    </div>
  )
}

export default Homes