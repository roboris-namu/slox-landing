import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - Tip Calculator App | SLOX',
  description: 'Privacy Policy for Tip Calculator - SLOX app',
};

export default function TipCalculatorPrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-green-500 to-emerald-400 bg-clip-text text-transparent">
          Privacy Policy - Tip Calculator - SLOX
        </h1>
        
        <div className="text-gray-300 space-y-6">
          <p className="text-sm text-gray-500">Last updated: January 8, 2026</p>
          
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">1. Introduction</h2>
            <p>
              This Privacy Policy explains how Tip Calculator - SLOX (&quot;we&quot;, &quot;our&quot;, or &quot;the App&quot;) 
              collects, uses, and protects your information when you use our mobile application.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. Information We Collect</h2>
            <p className="mb-2">
              <strong>No Data Collection:</strong> Tip Calculator - SLOX does not collect, store, or transmit 
              any personal data or device information. All calculations are performed entirely on your device.
            </p>
            <p className="mb-2">
              <strong>No Personal Data:</strong> We do not collect, store, or share any personal 
              information, including but not limited to names, email addresses, financial information, 
              or device identifiers.
            </p>
            <p>
              <strong>No Calculation History:</strong> The app does not save or store any of your 
              bill amounts, tip calculations, or split results. All data is cleared when you close the app.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. How We Use Information</h2>
            <p>
              Tip Calculator - SLOX uses the values you enter solely to calculate tips and split bills 
              in real-time. All calculations are:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Processed only on your device</li>
              <li>Never recorded or saved</li>
              <li>Never transmitted to external servers</li>
              <li>Used only for displaying calculation results</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. Data Storage</h2>
            <p>
              The app does not store any user data. All bill amounts, tip percentages, and calculation 
              results are displayed in real-time and are not saved. No data is stored on your device 
              or transmitted elsewhere.
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
