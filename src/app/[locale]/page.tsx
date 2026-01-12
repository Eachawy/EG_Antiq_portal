'use client';

import { NewHeroSection } from './HomePage-Components/NewHeroSection';
import { HistoricalEras } from './HomePage-Components/HistoricalEras';
// import { BooksSection } from './HomePage-Components/BooksSection';

export default function HomePage() {

  return (
    <div>
      <NewHeroSection />
      <HistoricalEras />
      {/* <BooksSection /> */}
    </div>
  );
}
