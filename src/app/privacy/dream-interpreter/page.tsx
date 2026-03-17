import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - Dream Interpreter | SLOX',
  description: 'Privacy Policy for Dream Interpreter - SLOX app',
};

export default function DreamInterpreterPrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-yellow-400 bg-clip-text text-transparent">
          Privacy Policy - Dream Interpreter - SLOX
        </h1>

        <div className="text-gray-300 space-y-6">
          <p className="text-sm text-gray-500">Last updated: March 17, 2026</p>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">1. Introduction</h2>
            <p>
              This Privacy Policy explains how Dream Interpreter - SLOX (&quot;we&quot;, &quot;our&quot;,
              or &quot;the App&quot;) collects, uses, and protects your information when you
              use our mobile application.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. Information We Collect</h2>
            <p className="mb-2">
              <strong>No Personal Data:</strong> Dream Interpreter - SLOX does not collect, store,
              or transmit any personal data or device identifiers.
            </p>
            <p className="mb-2">
              <strong>Dream Keywords:</strong> The dream symbols you select for interpretation are
              processed entirely on your device and are never sent to any server.
            </p>
            <p>
              <strong>Local Preferences Only:</strong> The App stores your settings (such as
              language preference) locally on your device for your convenience.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. How We Use Information</h2>
            <p>
              The App uses your selected dream symbols to generate interpretations, lucky scores,
              and advice. All calculations run entirely on your device, and no data is transmitted
              to external servers.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. Data Storage</h2>
            <p>
              Dream Interpreter - SLOX stores only app settings (language preference) locally on your
              device. Dream selections are not stored permanently. You can reset or change settings
              at any time within the app.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">5. Third-Party Services</h2>
            <p className="mb-2">
              <strong>Advertising:</strong> The App uses Google AdMob to display advertisements.
              Google AdMob may collect certain device information and use advertising identifiers
              to serve personalized ads. You can opt out of personalized advertising through your
              device settings. For more information, see{' '}
              <a href="https://policies.google.com/privacy" className="text-purple-400 hover:text-purple-300 underline" target="_blank" rel="noopener noreferrer">
                Google&apos;s Privacy Policy
              </a>.
            </p>
            <p>
              <strong>No Other Tracking:</strong> Apart from the advertising SDK, the App does not
              integrate with any other third-party analytics or tracking services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">6. Sharing Feature</h2>
            <p>
              When you use the share feature, the App generates a text summary of your dream
              interpretation result. This content is shared through your device&apos;s native
              sharing functionality, and we do not collect or store any shared data.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">7. Children&apos;s Privacy</h2>
            <p>
              Our App does not collect personal information from anyone, including children under
              the age of 13. The App is safe for users of all ages.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">8. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Any changes will be posted on
              this page with an updated revision date.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">9. Contact Us</h2>
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
