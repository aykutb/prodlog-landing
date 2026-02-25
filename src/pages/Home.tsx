import React from 'react';
import {
  HeroSection,
  ProblemSection,
  ThreePillarsSection,
  LogFromAnywhereSection,
  UseCasesSection,
  SummariesSection,
  PortfolioSection,
  SocialProofSection,
  ValidationSection,
  DifferentiationSection,
  FinalCTASection,
} from '@/src/components/sections';

export const HomePage = () => (
  <>
    <HeroSection />
    <ProblemSection />
    <ThreePillarsSection />
    <LogFromAnywhereSection />
    {/* <UseCasesSection /> */}
    <SummariesSection />
    <PortfolioSection />
    {/* <SocialProofSection /> */}
    <ValidationSection />
    {/* <DifferentiationSection /> */}
    <FinalCTASection />
  </>
);
