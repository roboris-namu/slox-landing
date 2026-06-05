import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - Step Counter | SLOX',
  description: 'Privacy Policy for Step Counter - SLOX, a daily step counting app.',
};

export default function StepCounterPrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent">
          Privacy Policy - Step Counter - SLOX
        </h1>

        <div className="text-gray-300 space-y-6">
          <p className="text-sm text-gray-500">Last updated: June 5, 2026</p>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">1. Introduction</h2>
            <p>
              This Privacy Policy explains how Step Counter - SLOX (&quot;we&quot;,
              &quot;our&quot;, or &quot;the App&quot;) handles information when you use our
              mobile application. Step Counter - SLOX is a simple pedometer that counts your
              daily steps, estimates calories and distance, and shows weekly trends.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. Motion / Activity Data</h2>
            <p className="mb-2">
              The App uses your device&apos;s motion sensor (Core Motion on iOS, equivalent
              sensors on Android) to count steps. When the App is opened, it requests the
              system permission required to read step data:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li><strong>iOS:</strong> Motion &amp; Fitness permission (Core Motion / CMPedometer)</li>
              <li><strong>Android:</strong> Activity Recognition permission</li>
            </ul>
            <p className="mt-2">
              Step counts, calorie estimates, and distance values are processed entirely
              on-device. <strong>The App never uploads your motion or activity data to any
              server.</strong>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. Information We Collect</h2>
            <p className="mb-2">
              <strong>No Account Required:</strong> Step Counter - SLOX does not require sign-up,
              sign-in, or any user account. We do not collect names, email addresses, phone
              numbers, or any other personally identifiable information.
            </p>
            <p className="mb-2">
              <strong>No Server Communication:</strong> The App itself does not transmit any
              personal data to our servers. Step counting and statistics run entirely on
              your device.
            </p>
            <p>
              <strong>Local Storage Only:</strong> The App stores the following data locally on
              your device using standard iOS/Android preference storage:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Your daily step counts and weekly history</li>
              <li>Your selected daily step goal and language</li>
              <li>Your body weight (used only to estimate calories; stays on-device)</li>
              <li>Your sound/vibration preferences</li>
            </ul>
            <p className="mt-2">
              This data never leaves your device and can be cleared by uninstalling the App.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. Third-Party Services (Advertising)</h2>
            <p className="mb-2">
              Step Counter - SLOX displays advertisements through <strong>Google AdMob</strong>,
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
              serve non-personalized ads. <strong>Your step counts, weight, and health metrics
              are never shared with AdMob.</strong> Google&apos;s privacy practices are
              described at{' '}
              <a
                href="https://policies.google.com/privacy"
                className="text-teal-400 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://policies.google.com/privacy
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">5. Children&apos;s Privacy</h2>
            <p>
              Step Counter - SLOX is rated 4+ and is safe for users of all ages, but it is not
              specifically targeted at children. We do not knowingly collect personal information
              from children. Because advertisements are delivered by Google AdMob, the App is not
              suitable for designated &quot;Kids Category&quot; distribution.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">6. Data Security</h2>
            <p>
              Because Step Counter - SLOX does not collect, transmit, or store personal data on
              our servers, there is no personal data on our side to secure. Locally stored
              preferences and step history are protected by the standard sandbox of your
              operating system.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">7. Your Rights</h2>
            <p>
              Because we do not hold any personal information about you, there is no data for us
              to access, correct, or delete on your behalf. You can clear all locally stored
              data at any time by deleting the App. For data processed by Google AdMob, you may
              exercise your rights directly with Google through the link provided in Section 4.
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
