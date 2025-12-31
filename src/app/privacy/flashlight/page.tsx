import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - Flashlight App | SLOX',
  description: 'Privacy Policy for Flashlight - SLOX app',
};

export default function FlashlightPrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-yellow-500 to-orange-400 bg-clip-text text-transparent">
          Privacy Policy - Flashlight - SLOX
        </h1>
        
        <div className="text-gray-300 space-y-6">
          <p className="text-sm text-gray-500">Last updated: January 1, 2026</p>
          
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">1. Introduction</h2>
            <p>
              This Privacy Policy explains how Flashlight - SLOX (&quot;we&quot;, &quot;our&quot;, or &quot;the App&quot;) 
              collects, uses, and protects your information when you use our mobile application.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. Information We Collect</h2>
            <p className="mb-2">
              <strong>No Data Collection:</strong> Flashlight - SLOX does not collect, store, or transmit any personal 
              data or device information. The app operates entirely offline and locally on your device.
            </p>
            <p className="mb-2">
              <strong>No Camera Access:</strong> The app uses only the device&apos;s LED flash/torch functionality, 
              which does not require camera permissions or access to any photos or media.
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
              Flashlight - SLOX does not collect any user data. The app simply controls your device&apos;s 
              LED flash to provide flashlight, strobe, and SOS functionality. All operations occur 
              locally on your device with no data transmission.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. Data Storage</h2>
            <p>
              The app stores only your language preference locally on your device using standard 
              iOS/Android preferences. No other data is stored. This preference data never leaves 
              your device and can be cleared by uninstalling the app.
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
