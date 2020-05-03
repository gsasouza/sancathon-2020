import * as React from 'react';

import LadingPageHeader from './components/LadingPageHeader';
import HeroBanner from './components/HeroBanner';
import LearnMoreSection from './components/LearnMoreSection';
import ContactSection from './components/ContactSection';

const LandingPage = () => {
  return (
    <main>
      <LadingPageHeader />
      <HeroBanner />
      <LearnMoreSection />
      <ContactSection />
    </main>
  );
};

export default LandingPage;
