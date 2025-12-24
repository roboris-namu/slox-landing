import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - Mirror App | SLOX',
  description: 'Privacy Policy for Mirror - SLOX app',
};

export default function MirrorPrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          Privacy Policy - Mirror
        </h1>
        
        <div className="text-gray-300 space-y-6">
          <p className="text-sm text-gray-500">Last updated: December 24, 2025</p>
          
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">1. Introduction</h2>
            <p>
              This Privacy Policy explains how Mirror - SLOX (&quot;we&quot;, &quot;our&quot;, or &quot;the App&quot;) 
              handles your information when you use our mobile application.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. Information We Collect</h2>
            <p className="mb-2">
              <strong>No Data Collection:</strong> Mirror does not collect, store, or transmit 
              any personal information.
            </p>
            <p>
              <strong>No Personal Data:</strong> We do not collect, store, or share any personal 
              information, including but not limited to names, email addresses, location data, or 
              device identifiers.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. Camera Permission</h2>
            <p>
              Mirror requires access to your device&apos;s camera to provide the mirror functionality. 
              The camera feed is displayed in real-time on your screen and is never recorded, stored, 
              or transmitted to any external servers. All camera processing occurs entirely on your device.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. How the App Works</h2>
            <p>
              Mirror uses your device&apos;s camera to display a real-time mirror view. You can switch 
              between front and back cameras and use zoom functionality. All features work locally 
              on your device without any internet connection required.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">5. Data Storage</h2>
            <p>
              Mirror does not store any images, recordings, or user data. The camera feed is only 
              displayed in real-time and is not saved anywhere. When you close the app, no data remains.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">6. Third-Party Services</h2>
            <p>
              The App does not integrate with any third-party analytics, advertising, or tracking 
              services. We do not share any information with third parties.
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

