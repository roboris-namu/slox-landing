import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - Eye Test | SLOX',
  description: 'Privacy Policy for Eye Test - SLOX, a self-check visual acuity and color vision app.',
};

export default function EyeTestPrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
          Privacy Policy - Eye Test - SLOX
        </h1>

        <div className="text-gray-300 space-y-6">
          <p className="text-sm text-gray-500">Last updated: June 6, 2026</p>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">1. Introduction</h2>
            <p>
              This Privacy Policy explains how Eye Test - SLOX (&quot;we&quot;, &quot;our&quot;, or
              &quot;the App&quot;) handles information when you use our mobile application. Eye Test
              - SLOX is an entertainment / educational self-check tool featuring a Tumbling E
              visual acuity screen and an Ishihara-style color vision quiz. It is NOT a medical
              device and does not provide diagnoses.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. Information We Collect</h2>
            <p className="mb-2">
              <strong>No Account Required:</strong> Eye Test - SLOX does not require sign-up,
              sign-in, or any user account. We do not collect names, email addresses, phone
              numbers, or any other personally identifiable information.
            </p>
            <p className="mb-2">
              <strong>No Server Communication:</strong> The App itself does not transmit any
              personal data to our servers. All test logic runs entirely on your device.
            </p>
            <p>
              <strong>Local Storage Only:</strong> The App stores the following data locally on
              your device using standard iOS/Android preference storage:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Your last test results (acuity score, color quiz score)</li>
              <li>Your selected language and theme</li>
              <li>Your sound/vibration preferences</li>
            </ul>
            <p className="mt-2">
              This data never leaves your device and can be cleared by uninstalling the App.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. Third-Party Services (Advertising)</h2>
            <p className="mb-2">
              Eye Test - SLOX displays advertisements through <strong>Google AdMob</strong>, a
              service operated by Google LLC. AdMob may collect and process the following
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
                className="text-emerald-400 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://policies.google.com/privacy
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. Medical Disclaimer (Important)</h2>
            <p>
              Eye Test - SLOX is an <strong>entertainment / self-check</strong> tool only. It is
              <strong> NOT a medical device</strong>, does not perform clinical examinations, and
              does not provide diagnoses or treatment recommendations. Mobile screen size, screen
              brightness, ambient lighting, viewing distance, and individual head position will
              materially affect results. Do not use this App to make any health decision. For
              concerns about your vision, please consult a licensed ophthalmologist or optometrist.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">5. Children&apos;s Privacy</h2>
            <p>
              Eye Test - SLOX is rated 4+ and is safe for users of all ages, but it is not
              specifically targeted at children. We do not knowingly collect personal information
              from children. Because advertisements are delivered by Google AdMob, the App is not
              suitable for designated &quot;Kids Category&quot; distribution.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">6. Data Security</h2>
            <p>
              Because Eye Test - SLOX does not collect, transmit, or store personal data on our
              servers, there is no personal data on our side to secure. Locally stored data is
              protected by the standard sandbox of your operating system.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">7. Your Rights</h2>
            <p>
              Because we do not hold any personal information about you, there is no data for us
              to access, correct, or delete on your behalf. For data processed by Google AdMob,
              you may exercise your rights directly with Google through the link provided in
              Section 3.
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
