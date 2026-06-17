import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - Currency Convert | SLOX',
  description: 'Privacy Policy for Currency Convert - SLOX, a currency conversion app.',
};

export default function CurrencyConvertPrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
          Privacy Policy - Currency Convert - SLOX
        </h1>

        <div className="text-gray-300 space-y-6">
          <p className="text-sm text-gray-500">Last updated: June 18, 2026</p>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">1. Introduction</h2>
            <p>
              This Privacy Policy explains how Currency Convert - SLOX (&quot;we&quot;,
              &quot;our&quot;, or &quot;the App&quot;) handles information when you use our
              mobile application. Currency Convert - SLOX helps you convert amounts between
              170+ world currencies using live exchange rates.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. Exchange Rate Data</h2>
            <p className="mb-2">
              <strong>Network Access:</strong> The App fetches public exchange-rate data over
              the internet to calculate conversions. Requests are made to third-party rate
              providers; we do not send your name, email, or account information with these
              requests.
            </p>
            <p>
              <strong>Offline Cache:</strong> Recently fetched rates may be cached locally on
              your device so conversions still work when the network is unavailable. Cached
              rates are stored only on your device.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. Information We Collect</h2>
            <p className="mb-2">
              <strong>No Account Required:</strong> Currency Convert - SLOX does not require
              sign-up or sign-in. We do not collect names, email addresses, or phone numbers
              through the App itself.
            </p>
            <p>
              <strong>Local Storage Only:</strong> The App stores the following on your device:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Your favorite currency pairs</li>
              <li>Your selected default currencies and language</li>
              <li>Cached exchange rates for offline use</li>
            </ul>
            <p className="mt-2">
              This data is not uploaded to our servers and can be cleared by uninstalling the App.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. Third-Party Services (Advertising)</h2>
            <p className="mb-2">
              Currency Convert - SLOX displays advertisements through <strong>Google AdMob</strong>,
              operated by Google LLC. AdMob may collect device information, coarse location (IP-based),
              and ad interaction data to deliver and measure ads.
            </p>
            <p>
              The App does not request App Tracking Transparency permission.
              <strong> Your conversion amounts and favorite currency pairs are never shared with
              AdMob.</strong> See{' '}
              <a href="https://policies.google.com/privacy" className="text-orange-400 underline" target="_blank" rel="noopener noreferrer">
                Google&apos;s Privacy Policy
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">5. Children&apos;s Privacy</h2>
            <p>
              The App is not specifically targeted at children. Because ads are delivered by Google
              AdMob, it is not suitable for the Kids Category.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">6. Contact Us</h2>
            <p>
              <strong>Email:</strong> namurobori@gmail.com<br />
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
