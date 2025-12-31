import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - Unit Converter App | SLOX',
  description: 'Privacy Policy for Unit Converter - SLOX app',
};

export default function UnitConverterPrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-green-500 to-cyan-400 bg-clip-text text-transparent">
          Privacy Policy - Unit Converter
        </h1>
        
        <div className="text-gray-300 space-y-6">
          <p className="text-sm text-gray-500">Last updated: December 24, 2025</p>
          
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">1. Introduction</h2>
            <p>
              This Privacy Policy explains how Unit Converter - SLOX (&quot;we&quot;, &quot;our&quot;, or &quot;the App&quot;) 
              handles your information when you use our mobile application.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. Information We Collect</h2>
            <p className="mb-2">
              <strong>No Data Collection:</strong> Unit Converter does not collect, store, or transmit 
              any personal information. The app works entirely offline and does not require any 
              special permissions.
            </p>
            <p>
              <strong>No Personal Data:</strong> We do not collect, store, or share any personal 
              information, including but not limited to names, email addresses, location data, or 
              device identifiers.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. How the App Works</h2>
            <p>
              Unit Converter performs all calculations locally on your device. When you convert units, 
              the input values and results are processed entirely within the app and are never sent 
              to any external server.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. Data Storage</h2>
            <p>
              Unit Converter does not store any conversion history or user preferences on external 
              servers. All data remains on your device and is cleared when you close the app.
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
              © 2025 SLOX. All rights reserved.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}


