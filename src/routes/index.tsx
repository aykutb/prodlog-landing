import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { HomePage, HowItWorksPage, PrivacyPage, PricingPage, FAQPage, SampleImpactPage } from '@/src/pages';

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/how-it-works" element={<HowItWorksPage />} />
    <Route path="/privacy" element={<PrivacyPage />} />
    <Route path="/pricing" element={<PricingPage />} />
    <Route path="/faq" element={<FAQPage />} />
    <Route path="/sample" element={<SampleImpactPage />} />
  </Routes>
);
