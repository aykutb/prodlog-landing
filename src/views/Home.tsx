import React from 'react';
import {
  HeroSection,
  ProblemSection,
  ThreePillarsSection,
  LogFromAnywhereSection,
  ValidationSection,
  SummariesSection,
  PortfolioSection,
  FinalCTASection,
} from '@/src/components/sections';

export const HomePage = () => (
  <>
    <HeroSection />
    <ProblemSection />
    <ThreePillarsSection />
    <LogFromAnywhereSection />
    <ValidationSection />
    {/* <UseCasesSection /> */}
    <SummariesSection />
    <PortfolioSection />
    {/* <SocialProofSection /> */}
    {/* <DifferentiationSection /> */}
    <FinalCTASection />
  </>
);
