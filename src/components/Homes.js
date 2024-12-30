import React from 'react'
import HeroSection from './HeroSection'
import ScrollingText from './ScrollingText'
import StayingProduct from './StayingProduct'
import CategoryHighlights from './CategoryHighlights'
import UpToProduct from './UpToProduct'
import OurCollection from './OurCollection'

function Homes() {
  return (
    <div>
    <HeroSection></HeroSection>
    <ScrollingText ></ScrollingText>
    <StayingProduct></StayingProduct>
    <CategoryHighlights></CategoryHighlights>
    <UpToProduct></UpToProduct>
    <OurCollection></OurCollection>
    </div>
  )
}

export default Homes