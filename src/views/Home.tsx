import React from 'react';
import {
  HeroSection,
  SocialProofStrip,
  BeforeYouAskSection,
  MomentsSection,
  OneOnOneSection,
  TriggerSection,
  ChangeJobsSection,
  FinalCTASection,
} from '@/src/components/sections';
import { todayIso } from '@/src/content/demo/priya';

export const HomePage = () => (
  <>
    <HeroSection />
    <SocialProofStrip />
    <BeforeYouAskSection />
    <MomentsSection today={todayIso()} />
    <OneOnOneSection />
    <TriggerSection />
    <ChangeJobsSection />
    <FinalCTASection />
  </>
);
