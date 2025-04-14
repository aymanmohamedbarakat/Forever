import React from 'react'
import Banner from '../../components/Home/Banner/Banner'
import LatestCollection from '../../components/Home/LatestCollection/LatestCollection'
import BestSeller from '../../components/Home/BestSeller/BestSeller'
import NewsLetterBox from '../../components/Global/NewsLetterBox/NewsLetterBox'
import OurPolicy from '../../components/Home/OurPolicy/OurPolicy'

export default function Home() {
  return (
    <div>
      <Banner />
      <LatestCollection />
      <BestSeller />
      <OurPolicy />
      <NewsLetterBox />
    </div>
  )
}
