import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - Magnifier App | SLOX',
  description: 'Privacy Policy for Magnifier - SLOX app',
};

export default function MagnifierPrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-purple-500 to-indigo-400 bg-clip-text text-transparent">
          Privacy Policy - Magnifier - SLOX
        </h1>
        
        <div className="text-gray-300 space-y-6">
          <p className="text-sm text-gray-500">Last updated: January 8, 2026</p>
          
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">1. Introduction</h2>
            <p>
              This Privacy Policy explains how Magnifier - SLOX (&quot;we&quot;, &quot;our&quot;, or &quot;the App&quot;) 
              collects, uses, and protects your information when you use our mobile application.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. Information We Collect</h2>
            <p className="mb-2">
              <strong>Camera Access:</strong> Magnifier - SLOX requires camera access to function as a digital 
              magnifying glass. The camera feed is processed entirely on your device and is never recorded, 
              stored, or transmitted to any external servers.
            </p>
            <p className="mb-2">
              <strong>No Data Collection:</strong> We do not collect, store, or transmit any personal 
              data or device information. The app operates entirely offline and locally on your device.
            </p>
            <p className="mb-2">
              <strong>No Location Data:</strong> We do not access or collect any location information.
            </p>
            <p>
              <strong>No Personal Data:</strong> We do not collect, store, or share any personal 
              information, including but not limited to names, email addresses, location data, or 
              device identifiers.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. How We Use Information</h2>
            <p>
              Magnifier - SLOX uses your device&apos;s camera solely to display a magnified view of 
              objects in real-time. The camera feed is:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Displayed only on your screen</li>
              <li>Never recorded or saved</li>
              <li>Never transmitted to external servers</li>
              <li>Processed entirely on your device</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. Data Storage</h2>
            <p>
              The app stores only your preferences (such as zoom level settings) locally on your 
              device using standard iOS preferences. No other data is stored. This preference data 
              never leaves your device and can be cleared by uninstalling the app.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">5. Third-Party Services</h2>
            <p>
              The App does not integrate with any third-party analytics, advertising, or tracking 
              services. We do not share any information with third parties.
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
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <p className="mt-2">
              <strong>Email:</strong> contact@slox.co.kr<br />
              <strong>Website:</strong> https://www.slox.co.kr
            </p>
          </section>

          <section className="pt-8 border-t border-gray-800">
            <p className="text-sm text-gray-500">
              © 2026 SLOX. All rights reserved.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
