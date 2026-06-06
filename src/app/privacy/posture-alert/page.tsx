import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - Posture Alert | SLOX',
  description: 'Privacy Policy for Posture Alert - SLOX, a simple posture reminder timer.',
};

export default function PostureAlertPrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-sky-400 to-emerald-400 bg-clip-text text-transparent">
          Privacy Policy - Posture Alert - SLOX
        </h1>

        <div className="text-gray-300 space-y-6">
          <p className="text-sm text-gray-500">Last updated: June 7, 2026</p>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">1. Introduction</h2>
            <p>
              This Privacy Policy explains how Posture Alert - SLOX (&quot;we&quot;,
              &quot;our&quot;, or &quot;the App&quot;) handles information when you use our
              mobile application. Posture Alert - SLOX is a simple repeating timer that
              reminds you to check and correct your sitting posture at user-configurable
              intervals. It is NOT a medical device and does NOT provide medical advice
              or diagnosis.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. Information We Collect</h2>
            <p className="mb-2">
              <strong>No Account Required:</strong> Posture Alert - SLOX does not require
              sign-up, sign-in, or any user account. We do not collect names, email
              addresses, phone numbers, or any other personally identifiable information.
            </p>
            <p className="mb-2">
              <strong>No Server Communication:</strong> The App itself does not transmit
              any personal data to our servers. The reminder timer runs entirely on your
              device.
            </p>
            <p>
              <strong>Local Storage Only:</strong> The App stores the following data
              locally on your device using standard iOS/Android preference storage:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Your selected reminder interval (e.g. 30 / 45 / 60 minutes)</li>
              <li>Whether sound and vibration are enabled</li>
              <li>Your selected language and theme</li>
            </ul>
            <p className="mt-2">
              This data never leaves your device and can be cleared by uninstalling the App.
              The App does NOT integrate with Apple Health, HealthKit, Google Fit, motion
              sensors or any other health platform, and does NOT estimate or evaluate your
              actual posture.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. Third-Party Services (Advertising)</h2>
            <p className="mb-2">
              Posture Alert - SLOX displays advertisements through <strong>Google AdMob</strong>,
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
              means the device advertising identifier is returned as a zeroed value and
              AdMob will only serve non-personalized ads. Google&apos;s privacy practices are
              described at{' '}
              <a
                href="https://policies.google.com/privacy"
                className="text-sky-400 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://policies.google.com/privacy
              </a>
              . Your reminder settings are NEVER shared with AdMob or any other
              advertising network.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. Health Disclaimer (Important)</h2>
            <p>
              Posture Alert - SLOX is a general productivity / wellness reminder, NOT a
              medical device. The App simply rings a configurable interval reminder and
              shows generic posture tips for motivational purposes only. It does NOT
              measure your spine angle, detect your real-world posture, diagnose any
              musculoskeletal condition, or replace professional medical advice. For
              persistent back, neck or shoulder pain, please consult a qualified
              healthcare professional.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">5. Children&apos;s Privacy</h2>
            <p>
              Posture Alert - SLOX is rated 4+ on iOS. We do not knowingly collect
              personal information from children. Because advertisements are delivered
              by Google AdMob, the App is not suitable for designated &quot;Kids
              Category&quot; distribution.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">6. Data Security</h2>
            <p>
              Because Posture Alert - SLOX does not collect, transmit, or store personal
              data on our servers, there is no personal data on our side to secure.
              Locally stored data is protected by the standard sandbox of your operating
              system.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">7. Your Rights</h2>
            <p>
              Because we do not hold any personal information about you, there is no data
              for us to access, correct, or delete on your behalf. For data processed by
              Google AdMob, you may exercise your rights directly with Google through the
              link provided in Section 3.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">8. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Material changes will
              be posted on this page with an updated revision date.
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
