import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - QR Scanner App | SLOX',
  description: 'Privacy Policy for QR Scanner - SLOX app',
};

export default function QRScannerPrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-emerald-500 to-cyan-400 bg-clip-text text-transparent">
          Privacy Policy - QR Scanner - SLOX
        </h1>
        
        <div className="text-gray-300 space-y-6">
          <p className="text-sm text-gray-500">Last updated: December 22, 2025</p>
          
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">1. Introduction</h2>
            <p>
              This Privacy Policy explains how QR Scanner - SLOX (&quot;we&quot;, &quot;our&quot;, or &quot;the App&quot;) 
              collects, uses, and protects your information when you use our mobile application.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. Information We Collect</h2>
            <p className="mb-2">
              <strong>Camera Access:</strong> The App requires access to your device&apos;s camera 
              to scan QR codes and barcodes. Camera data is processed locally on your device and is NOT 
              recorded, stored, or transmitted to any server.
            </p>
            <p className="mb-2">
              <strong>Scan History:</strong> The App stores your scan history locally on your device 
              using local storage. This data never leaves your device and is not transmitted to any server.
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
              The camera data is used solely to scan and decode QR codes and barcodes in 
              real-time. All processing occurs locally on your device. No camera data or scanned 
              content leaves your device unless you choose to share it.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. Data Storage</h2>
            <p>
              QR Scanner stores scan history locally on your device for your convenience. You can 
              clear this history at any time from within the app. We do not use cloud storage or 
              external servers to store your data.
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

