import React from 'react';
import { Link } from 'react-router-dom';
import { PageHeader } from '@/src/components/ui';

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="space-y-3">
    <h2 className="text-lg font-semibold text-primary">{title}</h2>
    <div className="text-secondary text-sm leading-relaxed space-y-3">{children}</div>
  </section>
);

export const TermsOfServicePage = () => (
  <div className="max-w-3xl mx-auto px-8 md:px-12 pb-24">
    <PageHeader
      title="Terms of Service"
      subtitle="These terms govern your use of Prodlog’s websites and services. By using Prodlog, you agree to them."
    />

    <div className="space-y-10 text-left">
      <p className="text-xs text-muted">
        Last updated: March 26, 2025
      </p>

      <Section title="1. Agreement">
        <p>
          These Terms of Service (“Terms”) form a binding agreement between you and Prodlog Inc.
          (“Prodlog,” “we,” “us,” or “our”) regarding your access to and use of our websites, apps,
          and related services (collectively, the “Service”). If you do not agree to these Terms, do
          not use the Service.
        </p>
      </Section>

      <Section title="2. The Service">
        <p>
          Prodlog provides tools to help you document and communicate your professional work. We may
          modify, suspend, or discontinue features or the Service as a whole with reasonable notice
          where practicable. We do not guarantee that the Service will be uninterrupted or error-free.
        </p>
      </Section>

      <Section title="3. Eligibility and accounts">
        <p>
          You must be able to form a binding contract in your jurisdiction to use the Service. You
          are responsible for maintaining the confidentiality of your account credentials and for all
          activity under your account. You agree to provide accurate registration information and to
          update it as needed.
        </p>
      </Section>

      <Section title="4. Acceptable use">
        <p>You agree not to:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Violate applicable laws or third-party rights.</li>
          <li>Attempt to probe, scan, or test the vulnerability of the Service or breach security.</li>
          <li>Interfere with or disrupt the Service or servers or networks connected to it.</li>
          <li>Use the Service to distribute malware, spam, or unsolicited communications.</li>
          <li>Reverse engineer, decompile, or attempt to extract source code except where permitted by law.</li>
          <li>Use the Service to build a competing product or service or scrape data without permission.</li>
        </ul>
      </Section>

      <Section title="5. Your content">
        <p>
          You retain ownership of content you submit to the Service (“Your Content”). You grant Prodlog
          a worldwide, non-exclusive license to host, store, process, and display Your Content solely
          to operate, improve, and provide the Service to you. You represent that you have the rights
          needed to grant this license and that Your Content does not violate these Terms or third-party
          rights.
        </p>
      </Section>

      <Section title="6. Privacy">
        <p>
          Our collection and use of personal information is described in our{' '}
          <Link to="/privacy-policy" className="text-deep-ink-blue underline hover:opacity-80">
            Privacy Policy
          </Link>
          . By using the Service, you acknowledge that we may process information as described there.
        </p>
      </Section>

      <Section title="7. Intellectual property">
        <p>
          The Service, including its design, software, branding, and documentation, is owned by
          Prodlog or its licensors and is protected by intellectual property laws. Except for the
          limited rights expressly granted in these Terms, no rights are granted to you.
        </p>
      </Section>

      <Section title="8. Third-party services">
        <p>
          The Service may integrate with or link to third-party services. Those services are governed
          by their own terms and policies. Prodlog is not responsible for third-party services.
        </p>
      </Section>

      <Section title="9. Disclaimers">
        <p>
          THE SERVICE IS PROVIDED “AS IS” AND “AS AVAILABLE,” WITHOUT WARRANTIES OF ANY KIND, WHETHER
          EXPRESS OR IMPLIED, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
          PURPOSE, AND NON-INFRINGEMENT, TO THE FULLEST EXTENT PERMITTED BY LAW.
        </p>
      </Section>

      <Section title="10. Limitation of liability">
        <p>
          TO THE MAXIMUM EXTENT PERMITTED BY LAW, PRODLOG AND ITS AFFILIATES, OFFICERS, DIRECTORS,
          EMPLOYEES, AND AGENTS WILL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL,
          OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS, DATA, OR GOODWILL, ARISING FROM OR RELATED TO
          YOUR USE OF THE SERVICE.
        </p>
        <p>
          TO THE MAXIMUM EXTENT PERMITTED BY LAW, OUR TOTAL LIABILITY FOR ANY CLAIM ARISING OUT OF OR
          RELATING TO THESE TERMS OR THE SERVICE WILL NOT EXCEED THE GREATER OF (A) THE AMOUNTS YOU PAID
          TO PRODLOG FOR THE SERVICE IN THE TWELVE (12) MONTHS BEFORE THE CLAIM, OR (B) ONE HUNDRED U.S.
          DOLLARS ($100).
        </p>
        <p>
          Some jurisdictions do not allow certain limitations; in those cases, our liability is limited
          to the fullest extent permitted by law.
        </p>
      </Section>

      <Section title="11. Indemnification">
        <p>
          You will defend, indemnify, and hold harmless Prodlog and its affiliates from claims,
          damages, losses, and expenses (including reasonable attorneys’ fees) arising from Your Content,
          your use of the Service, or your violation of these Terms or applicable law.
        </p>
      </Section>

      <Section title="12. Term and termination">
        <p>
          These Terms apply for as long as you use the Service. You may stop using the Service at any
          time. We may suspend or terminate your access if you materially breach these Terms or if we
          are required to do so by law. Provisions that by their nature should survive will survive
          termination (including ownership, disclaimers, limitations of liability, and indemnity).
        </p>
      </Section>

      <Section title="13. Changes">
        <p>
          We may update these Terms from time to time. We will post the effective date at the top of
          this page. If changes are material, we will provide reasonable notice where required by law.
          Continued use after the effective date constitutes acceptance of the updated Terms.
        </p>
      </Section>

      <Section title="14. General">
        <p>
          These Terms constitute the entire agreement between you and Prodlog regarding the Service
          and supersede prior agreements on this subject. If any provision is held invalid, the
          remaining provisions remain in effect. Failure to enforce a provision is not a waiver.
        </p>
        <p>
          These Terms are governed by the laws of the State of Delaware, USA, without regard to
          conflict-of-law principles, except where prohibited by law. The United Nations Convention on
          Contracts for the International Sale of Goods does not apply.
        </p>
        <p>
          For questions about these Terms, contact us at{' '}
          <a href="mailto:support@prodlog.app" className="text-deep-ink-blue underline hover:opacity-80">
            support@prodlog.app
          </a>
          .
        </p>
      </Section>
    </div>
  </div>
);
