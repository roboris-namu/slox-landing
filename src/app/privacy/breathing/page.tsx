import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - Breathing App | SLOX',
  description: 'Privacy Policy for Breathing - SLOX app',
};

export default function BreathingPrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
          Privacy Policy - Breathing - SLOX
        </h1>

        <div className="text-gray-300 space-y-6">
          <p className="text-sm text-gray-500">Last updated: January 21, 2026</p>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">1. Introduction</h2>
            <p>
              This Privacy Policy explains how Breathing - SLOX (&quot;we&quot;, &quot;our&quot;,
              or &quot;the App&quot;) collects, uses, and protects your information when you
              use our mobile application.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. Information We Collect</h2>
            <p className="mb-2">
              <strong>No Personal Data:</strong> Breathing - SLOX does not collect, store,
              or transmit any personal data or device identifiers.
            </p>
            <p className="mb-2">
              <strong>Local Preferences Only:</strong> The App stores your settings (such as
              breathing pattern and cycle count) locally on your device for your convenience.
            </p>
            <p>
              <strong>No Health Data:</strong> The App does not collect, store, or share any
              health-related data. All guidance is provided for general wellness and is not medical advice.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. How We Use Information</h2>
            <p>
              The App uses your local settings only to personalize the breathing session experience.
              All functionality runs on your device, and no data is transmitted to external servers.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. Data Storage</h2>
            <p>
              Breathing - SLOX stores only app settings locally on your device. You can reset or
              change these settings at any time within the app.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">5. Third-Party Services</h2>
            <p>
              The App does not integrate with third-party analytics or tracking services. We do not
              share any information with third parties.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">6. Children&apos;s Privacy</h2>
            <p>
              Our App does not collect personal information from anyone, including children under
              the age of 13. The App is safe for users of all ages.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">7. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Any changes will be posted on
              this page with an updated revision date.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">8. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at:</p>
            <p className="mt-2">
              <strong>Email:</strong> contact@slox.co.kr<br />
              <strong>Website:</strong> https://www.slox.co.kr
            </p>
          </section>

          <section className="pt-8 border-t border-gray-800">
            <p className="text-sm text-gray-500">© 2026 SLOX. All rights reserved.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
