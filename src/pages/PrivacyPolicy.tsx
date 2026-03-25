import React from 'react';
import { Link } from 'react-router-dom';
import { PageHeader } from '@/src/components/ui';

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="space-y-3">
    <h2 className="text-lg font-semibold text-primary">{title}</h2>
    <div className="text-secondary text-sm leading-relaxed space-y-3">{children}</div>
  </section>
);

export const PrivacyPolicyPage = () => (
  <div className="max-w-3xl mx-auto px-8 md:px-12 pb-24">
    <PageHeader
      title="Privacy Policy"
      subtitle="This policy describes how Prodlog Inc. collects, uses, and shares information when you use our websites and services."
    />

    <div className="space-y-10 text-left">
      <p className="text-xs text-muted">Last updated: March 26, 2025</p>

      <Section title="1. Who we are">
        <p>
          Prodlog Inc. (“Prodlog,” “we,” “us,” or “our”) operates the Prodlog websites, applications,
          and related services (collectively, the “Service”). This Privacy Policy explains how we handle
          personal information when you use the Service. For contractual terms, see our{' '}
          <Link to="/terms" className="text-deep-ink-blue underline hover:opacity-80">
            Terms of Service
          </Link>
          .
        </p>
      </Section>

      <Section title="2. Information we collect">
        <p>
          <strong className="text-primary font-medium">Information you provide.</strong> We collect
          information you submit when you create an account, use the Service, contact us, or otherwise
          communicate with us. This may include your name, email address, password or authentication
          credentials, profile details, and any content you choose to enter into the Service (such as
          notes, logs, summaries, or attachments).
        </p>
        <p>
          <strong className="text-primary font-medium">Information collected automatically.</strong> We
          may collect device and usage information such as IP address, browser type, operating system,
          approximate location derived from IP, pages viewed, referring URLs, and timestamps. We may
          use cookies and similar technologies as described below.
        </p>
        <p>
          <strong className="text-primary font-medium">Information from third parties.</strong> If you
          sign in through a third-party identity provider or connect integrations, we may receive
          information from those services as permitted by your settings and their policies.
        </p>
      </Section>

      <Section title="3. How we use information">
        <p>We use personal information to:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Provide, operate, maintain, and improve the Service.</li>
          <li>Create and manage your account and authenticate you.</li>
          <li>Communicate with you about the Service, support requests, and security notices.</li>
          <li>Monitor usage, troubleshoot issues, and help protect against fraud, abuse, and security risks.</li>
          <li>Comply with legal obligations and enforce our rights and agreements.</li>
          <li>With your consent where required, send you product updates or marketing (you may opt out).</li>
        </ul>
      </Section>

      <Section title="4. Legal bases (EEA, UK, and similar regions)">
        <p>
          Where required by law, we rely on one or more of the following legal bases: performance of a
          contract with you; legitimate interests that are not overridden by your rights (such as
          securing and improving the Service); compliance with legal obligations; and consent where
          applicable.
        </p>
      </Section>

      <Section title="5. How we share information">
        <p>
          We do not sell your personal information. We may share information in the following
          circumstances:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong className="text-primary font-medium">Service providers.</strong> With vendors who
            help us host, analyze, secure, or operate the Service, subject to appropriate safeguards.
          </li>
          <li>
            <strong className="text-primary font-medium">Legal and safety.</strong> When required by
            law, legal process, or government request, or to protect the rights, safety, and security of
            Prodlog, our users, or others.
          </li>
          <li>
            <strong className="text-primary font-medium">Business transfers.</strong> In connection
            with a merger, acquisition, financing, or sale of assets, subject to appropriate safeguards.
          </li>
          <li>
            <strong className="text-primary font-medium">With your direction.</strong> When you choose
            to share content or visibility settings (for example, with collaborators or via a link you
            configure).
          </li>
        </ul>
      </Section>

      <Section title="6. Cookies and similar technologies">
        <p>
          We use cookies and similar technologies to remember preferences, maintain sessions, understand
          how the Service is used, and improve performance. You can control cookies through your browser
          settings. Disabling certain cookies may limit some functionality.
        </p>
      </Section>

      <Section title="7. Retention">
        <p>
          We retain personal information for as long as needed to provide the Service, fulfill the
          purposes described in this policy, comply with legal obligations, resolve disputes, and enforce
          our agreements. Retention periods may vary based on the type of data and context.
        </p>
      </Section>

      <Section title="8. Security">
        <p>
          We implement technical and organizational measures designed to protect personal information.
          No method of transmission or storage is completely secure, and we cannot guarantee absolute
          security.
        </p>
      </Section>

      <Section title="9. International transfers">
        <p>
          We may process and store information in the United States and other countries where we or our
          service providers operate. Those countries may have different data protection laws than your
          country. Where required, we use appropriate safeguards (such as standard contractual clauses)
          for cross-border transfers.
        </p>
      </Section>

      <Section title="10. Your rights and choices">
        <p>
          Depending on where you live, you may have rights to access, correct, delete, or export
          personal information; object to or restrict certain processing; withdraw consent where
          processing is consent-based; and lodge a complaint with a supervisory authority. You may
          manage some account settings through the Service. To exercise other rights, contact us using the
          details below. We may need to verify your request before responding.
        </p>
      </Section>

      <Section title="11. Children’s privacy">
        <p>
          The Service is not directed to children under 13 (or the age required by your jurisdiction),
          and we do not knowingly collect personal information from children. If you believe we have
          collected information from a child, please contact us and we will take appropriate steps.
        </p>
      </Section>

      <Section title="12. Third-party services">
        <p>
          The Service may contain links to third-party websites or integrations. Their privacy practices
          are governed by their own policies. We encourage you to review them.
        </p>
      </Section>

      <Section title="13. Changes to this policy">
        <p>
          We may update this Privacy Policy from time to time. We will post the updated version on this
          page and update the “Last updated” date. Material changes may be communicated through the
          Service or by email where appropriate.
        </p>
      </Section>

      <Section title="14. Contact us">
        <p>
          For questions about this Privacy Policy or our privacy practices, contact us at{' '}
          <a href="mailto:support@prodlog.app" className="text-deep-ink-blue underline hover:opacity-80">
            support@prodlog.app
          </a>
          .
        </p>
        <p>
          You may also reach Prodlog Inc. at the address listed on our website or in correspondence
          related to your account.
        </p>
      </Section>
    </div>
  </div>
);
