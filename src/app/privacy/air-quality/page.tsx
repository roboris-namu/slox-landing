import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - Air Quality | SLOX',
  description: 'Privacy Policy for Air Quality - SLOX, a simple real-time air-quality viewer.',
};

export default function AirQualityPrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-sky-400 to-emerald-400 bg-clip-text text-transparent">
          Privacy Policy - Air Quality - SLOX
        </h1>

        <div className="text-gray-300 space-y-6">
          <p className="text-sm text-gray-500">Last updated: June 8, 2026</p>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">1. Introduction</h2>
            <p>
              This Privacy Policy explains how Air Quality - SLOX (&quot;we&quot;,
              &quot;our&quot;, or &quot;the App&quot;) handles information when you use
              our mobile application. Air Quality - SLOX is a simple viewer that displays
              real-time outdoor air-quality readings (PM2.5, PM10, NO₂, O₃, AQI etc.)
              provided by the public Open-Meteo Air-Quality API. It is NOT a medical
              device and does NOT provide medical advice.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. Information We Collect</h2>
            <p className="mb-2">
              <strong>No Account Required:</strong> Air Quality - SLOX does not require
              sign-up, sign-in, or any user account. We do not collect names, email
              addresses, phone numbers, or any other personally identifiable information.
            </p>
            <p className="mb-2">
              <strong>No SLOX Server:</strong> We do not operate any backend that stores
              your data. The App does not transmit any personal data to any server we
              control.
            </p>
            <p>
              <strong>Local Storage Only:</strong> The App stores the following data
              locally on your device using standard iOS/Android preference storage:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Recently used cities and your default city (if you save one)</li>
              <li>Whether you opted in to using your current location</li>
              <li>Your selected language and theme</li>
            </ul>
            <p className="mt-2">
              This data never leaves your device (other than the API calls described
              below) and can be cleared by uninstalling the App.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. Location &amp; API Calls</h2>
            <p className="mb-2">
              When you grant the &quot;While Using the App&quot; location permission,
              the App reads your current GPS coordinates on the device and sends ONLY
              the coordinates (latitude / longitude) to the following public services to
              fetch air-quality readings and reverse-geocoding (city name):
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>
                Open-Meteo Air-Quality API —{' '}
                <a
                  href="https://open-meteo.com/en/terms"
                  className="text-sky-400 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  open-meteo.com
                </a>
              </li>
              <li>
                Open-Meteo Geocoding API —{' '}
                <a
                  href="https://open-meteo.com/en/terms"
                  className="text-sky-400 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  open-meteo.com
                </a>
              </li>
            </ul>
            <p className="mt-2">
              We do NOT attach your name, email, advertising identifier, or any other
              personal identifier to these requests. Open-Meteo operates these services
              without authentication. Standard request metadata (IP address, user agent)
              may be observed by Open-Meteo as part of normal internet routing, as
              described in their terms.
            </p>
            <p className="mt-2">
              You can search cities manually instead. If you do not grant the location
              permission, the App still works using manual city search only.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. Third-Party Services (Advertising)</h2>
            <p className="mb-2">
              Air Quality - SLOX displays advertisements through <strong>Google AdMob</strong>,
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
              The App does not actively request App Tracking Transparency permission, which
              means the device advertising identifier is returned as a zeroed value and
              AdMob will only serve non-personalized ads. Google&apos;s privacy practices are
              described at{' '}
              <a
                href="https://policies.google.com/privacy"
                className="text-sky-400 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://policies.google.com/privacy
              </a>
              . Your GPS coordinates and saved cities are NEVER shared with AdMob.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">5. Health Disclaimer</h2>
            <p>
              Air Quality - SLOX is a general informational utility, NOT a medical
              device. The pollution readings shown in the app are sourced from a
              third-party public dataset and may differ from official government
              monitoring stations. The App does NOT provide medical advice, diagnosis,
              or treatment. For respiratory or other medical concerns related to air
              quality, please consult a qualified healthcare professional.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">6. Children&apos;s Privacy</h2>
            <p>
              Air Quality - SLOX is rated 4+ on iOS. We do not knowingly collect personal
              information from children. Because advertisements are delivered by Google
              AdMob, the App is not suitable for designated &quot;Kids Category&quot;
              distribution.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">7. Data Security</h2>
            <p>
              Because Air Quality - SLOX does not collect, transmit, or store personal
              data on our servers, there is no personal data on our side to secure.
              Locally stored data is protected by the standard sandbox of your operating
              system, and all third-party requests are sent over HTTPS.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">8. Your Rights</h2>
            <p>
              Because we do not hold any personal information about you, there is no data
              for us to access, correct, or delete on your behalf. For data processed by
              Google AdMob or Open-Meteo, you may exercise your rights directly with
              those providers.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">9. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Material changes will
              be posted on this page with an updated revision date.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">10. Contact Us</h2>
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
