import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - BMI Calculator | SLOX',
  description: 'Privacy Policy for BMI Calculator - SLOX, a simple body mass index calculator.',
};

export default function BmiCalculatorPrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
          Privacy Policy - BMI Calculator - SLOX
        </h1>

        <div className="text-gray-300 space-y-6">
          <p className="text-sm text-gray-500">Last updated: June 6, 2026</p>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">1. Introduction</h2>
            <p>
              This Privacy Policy explains how BMI Calculator - SLOX (&quot;we&quot;,
              &quot;our&quot;, or &quot;the App&quot;) handles information when you use our
              mobile application. BMI Calculator - SLOX is a simple offline calculator that
              computes the Body Mass Index (BMI) from a user-entered height and weight. It is
              NOT a medical device and does NOT provide medical advice.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. Information We Collect</h2>
            <p className="mb-2">
              <strong>No Account Required:</strong> BMI Calculator - SLOX does not require
              sign-up, sign-in, or any user account. We do not collect names, email addresses,
              phone numbers, or any other personally identifiable information.
            </p>
            <p className="mb-2">
              <strong>No Server Communication:</strong> The App itself does not transmit any
              personal data to our servers. All calculation runs entirely on your device.
            </p>
            <p>
              <strong>Local Storage Only:</strong> The App stores the following data locally on
              your device using standard iOS/Android preference storage:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Your last height and weight inputs (so the app remembers them next time)</li>
              <li>Your selected unit system (metric cm/kg or imperial ft/lb)</li>
              <li>Your selected language and theme</li>
            </ul>
            <p className="mt-2">
              This data never leaves your device and can be cleared by uninstalling the App.
              The App does NOT integrate with Apple Health, HealthKit, Google Fit, or any
              other health platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. Third-Party Services (Advertising)</h2>
            <p className="mb-2">
              BMI Calculator - SLOX displays advertisements through <strong>Google AdMob</strong>,
              a service operated by Google LLC. AdMob may collect and process the following
              information to deliver and measure advertisements:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Advertising identifier (IDFA on iOS, AAID on Android)</li>
              <li>IP address (used for approximate, country-level location)</li>
              <li>Device information (model, operating system, language)</li>
              <li>Coarse interaction data with ads (impressions, clicks)</li>
            </ul>
            <p className="mt-2">
              The App does not actively request App Tracking Transparency permission, which
              means the device advertising identifier is returned as a zeroed value and AdMob
              will only serve non-personalized ads. Google&apos;s privacy practices are described
              at{' '}
              <a
                href="https://policies.google.com/privacy"
                className="text-teal-400 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://policies.google.com/privacy
              </a>
              . Your height and weight inputs are NEVER shared with AdMob or any other
              advertising network.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. Health Disclaimer (Important)</h2>
            <p>
              BMI Calculator - SLOX is a general lifestyle utility, NOT a medical device. The
              Body Mass Index is a generic statistic and does not account for muscle mass,
              bone density, body composition, age, ethnicity or any individual condition.
              The App is for entertainment and informational purposes only and does NOT
              provide medical advice, diagnosis or treatment. For any health concern, please
              consult a qualified healthcare professional.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">5. Children&apos;s Privacy</h2>
            <p>
              BMI Calculator - SLOX is rated 4+ and is safe for users of all ages, but it is
              not specifically targeted at children. We do not knowingly collect personal
              information from children. Because advertisements are delivered by Google
              AdMob, the App is not suitable for designated &quot;Kids Category&quot;
              distribution.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">6. Data Security</h2>
            <p>
              Because BMI Calculator - SLOX does not collect, transmit, or store personal data
              on our servers, there is no personal data on our side to secure. Locally stored
              data is protected by the standard sandbox of your operating system.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">7. Your Rights</h2>
            <p>
              Because we do not hold any personal information about you, there is no data for
              us to access, correct, or delete on your behalf. For data processed by Google
              AdMob, you may exercise your rights directly with Google through the link
              provided in Section 3.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">8. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Material changes will be
              posted on this page with an updated revision date.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">9. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at:</p>
            <p className="mt-2">
              <strong>Email:</strong> namurobori@gmail.com
              <br />
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
