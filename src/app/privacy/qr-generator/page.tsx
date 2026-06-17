import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - QR Generator | SLOX',
  description: 'Privacy Policy for QR Generator - SLOX, a QR code creation app.',
};

export default function QrGeneratorPrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
          Privacy Policy - QR Generator - SLOX
        </h1>

        <div className="text-gray-300 space-y-6">
          <p className="text-sm text-gray-500">Last updated: June 18, 2026</p>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">1. Introduction</h2>
            <p>
              This Privacy Policy explains how QR Generator - SLOX (&quot;we&quot;,
              &quot;our&quot;, or &quot;the App&quot;) handles information when you use our
              mobile application. QR Generator - SLOX lets you create QR codes from text, URLs,
              Wi-Fi credentials, email, phone numbers, SMS messages, and contact cards.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. QR Content &amp; Permissions</h2>
            <p className="mb-2">
              <strong>No Camera Required:</strong> QR Generator creates QR codes from information
              you type or paste. The App does not access your camera, photo library, contacts
              list, or location.
            </p>
            <p className="mb-2">
              <strong>On-Device Processing:</strong> Your input is converted into a QR code
              entirely on your device. <strong>We do not upload your QR content to our
              servers.</strong>
            </p>
            <p>
              <strong>Share Sheet:</strong> When you share a QR image, you choose the destination
              through your device&apos;s standard iOS share sheet. We do not control or receive
              data from third-party apps you may share to.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. Information We Collect</h2>
            <p className="mb-2">
              <strong>No Account Required:</strong> QR Generator - SLOX does not require sign-up,
              sign-in, or any user account. We do not collect names, email addresses, phone
              numbers, or other personally identifiable information through the App itself.
            </p>
            <p className="mb-2">
              <strong>No Server Communication:</strong> The App does not transmit your QR input,
              generated codes, or history to our servers.
            </p>
            <p>
              <strong>Local Storage Only:</strong> The App stores the following data locally on
              your device using standard iOS preference storage:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Your recent QR generation history (optional)</li>
              <li>Your selected language and display preferences</li>
              <li>Your chosen QR color and error-correction settings</li>
            </ul>
            <p className="mt-2">
              This data never leaves your device and can be cleared by uninstalling the App.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. Third-Party Services (Advertising)</h2>
            <p className="mb-2">
              QR Generator - SLOX displays advertisements through <strong>Google AdMob</strong>,
              a service operated by Google LLC. AdMob may collect and process the following
              information to deliver and measure advertisements:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Device information (model, operating system, language)</li>
              <li>IP address (used for approximate, country-level location)</li>
              <li>Coarse interaction data with ads (impressions, clicks)</li>
            </ul>
            <p className="mt-2">
              The App does not request App Tracking Transparency permission.
              <strong> Your QR input, generated codes, and history are never shared with
              AdMob.</strong> Google&apos;s privacy practices are described at{' '}
              <a
                href="https://policies.google.com/privacy"
                className="text-cyan-400 underline"
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
              QR Generator - SLOX is safe for users of all ages, but it is not specifically
              targeted at children. We do not knowingly collect personal information from
              children. Because advertisements are delivered by Google AdMob, the App is not
              suitable for designated &quot;Kids Category&quot; distribution.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">6. Data Security</h2>
            <p>
              Because QR Generator - SLOX does not collect or store personal data on our servers,
              there is no personal data on our side to secure. Locally stored preferences and
              history are protected by the standard sandbox of your operating system.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">7. Your Rights</h2>
            <p>
              Because we do not hold personal information about you on our servers, there is no
              data for us to access, correct, or delete on your behalf. You can clear all locally
              stored data at any time by deleting the App. For data processed by Google AdMob, you
              may exercise your rights directly with Google through the link provided in Section 4.
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
