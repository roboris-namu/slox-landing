import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - Memory Test | SLOX',
  description: 'Privacy Policy for Memory Test - SLOX, a number memorization challenge game.',
};

export default function MemoryPrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Privacy Policy - Memory Test - SLOX
        </h1>

        <div className="text-gray-300 space-y-6">
          <p className="text-sm text-gray-500">Last updated: June 5, 2026</p>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">1. Introduction</h2>
            <p>
              This Privacy Policy explains how Memory Test - SLOX (&quot;we&quot;,
              &quot;our&quot;, or &quot;the App&quot;) handles information when you use our
              mobile application. Memory Test - SLOX is a number-memorization game: a number
              is shown briefly on the screen and the player must reproduce it exactly. The
              number of digits grows as levels progress.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. Information We Collect</h2>
            <p className="mb-2">
              <strong>No Account Required:</strong> Memory Test - SLOX does not require sign-up,
              sign-in, or any user account. We do not collect names, email addresses, phone
              numbers, or any other personally identifiable information.
            </p>
            <p className="mb-2">
              <strong>Optional Score Submission:</strong> If you choose to submit your score to
              the global ranking, the App sends only the following to a SLOX-operated server:
              a freely-chosen public nickname, the score (highest level reached, time), and
              the language code. No device identifier, email, or personal information is sent.
            </p>
            <p>
              <strong>Local Storage Only (default):</strong> Apart from the optional submission
              above, the App stores the following data locally on your device:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Your best level and recent records</li>
              <li>Your selected language</li>
              <li>Your sound/vibration preferences</li>
            </ul>
            <p className="mt-2">
              Local data never leaves your device and can be cleared by uninstalling the App.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. Third-Party Services (Advertising)</h2>
            <p className="mb-2">
              Memory Test - SLOX displays advertisements through <strong>Google AdMob</strong>,
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
              The App does not actively request App Tracking Transparency permission, which means
              the device advertising identifier is returned as a zeroed value and AdMob will only
              serve non-personalized ads. Google&apos;s privacy practices are described at{' '}
              <a
                href="https://policies.google.com/privacy"
                className="text-purple-400 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://policies.google.com/privacy
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. Children&apos;s Privacy</h2>
            <p>
              Memory Test - SLOX is rated 4+ and is safe for users of all ages, but it is not
              specifically targeted at children. We do not knowingly collect personal information
              from children. Because advertisements are delivered by Google AdMob, the App is not
              suitable for designated &quot;Kids Category&quot; distribution.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">5. Data Security</h2>
            <p>
              Optional score submissions are stored on a SLOX-operated server for the sole
              purpose of displaying the public global ranking. Because no identifiers or
              contact information are collected, individual submissions cannot be tied back to
              a specific person.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">6. Your Rights</h2>
            <p>
              If you would like a submitted ranking entry removed, contact us at the email
              below and we will delete it once the entry is identified by the displayed
              nickname and approximate submission time. For data processed by Google AdMob,
              you may exercise your rights directly with Google through the link provided in
              Section 3.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">7. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Material changes will be
              posted on this page with an updated revision date.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">8. Contact Us</h2>
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
