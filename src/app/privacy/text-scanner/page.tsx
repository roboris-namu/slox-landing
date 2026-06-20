import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - Text Scanner | SLOX',
  description: 'Privacy Policy for Text Scanner - SLOX, a camera and photo OCR app.',
};

export default function TextScannerPrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Privacy Policy - Text Scanner - SLOX
        </h1>

        <div className="text-gray-300 space-y-6">
          <p className="text-sm text-gray-500">Last updated: June 21, 2026</p>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">1. Introduction</h2>
            <p>
              This Privacy Policy explains how Text Scanner - SLOX (&quot;we&quot;,
              &quot;our&quot;, or &quot;the App&quot;) handles information when you use our
              mobile application. Text Scanner - SLOX uses on-device OCR to recognize
              text from camera scans and photos.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. Camera, Photos &amp; On-Device Processing</h2>
            <p className="mb-2">
              <strong>On-Device OCR:</strong> Images you capture or select are processed locally
              on your device using Google ML Kit text recognition. Recognized text is shown in the
              app for copy and share. We do not upload your images or extracted text to our servers.
            </p>
            <p className="mb-2">
              <strong>Camera Access:</strong> With your permission, the App uses the camera to scan
              documents, signs, and other printed text.
            </p>
            <p>
              <strong>Photo Library Access:</strong> With your permission, the App reads photos
              you choose to extract text from existing images.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. Information We Collect</h2>
            <p className="mb-2">
              <strong>No Account Required:</strong> Text Scanner - SLOX does not require sign-up
              or sign-in.
            </p>
            <p>
              <strong>Local Storage Only:</strong> The App may store language preference and OCR
              script settings on your device. This data is not uploaded to our servers.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. Third-Party Services (Advertising)</h2>
            <p className="mb-2">
              Text Scanner - SLOX displays advertisements through <strong>Google AdMob</strong>,
              operated by Google LLC. AdMob may collect device information, coarse location (IP-based),
              and ad interaction data to deliver and measure ads.
            </p>
            <p>
              The App does not request App Tracking Transparency permission.
              <strong> Your photos and recognized text are never shared with AdMob.</strong> See{' '}
              <a href="https://policies.google.com/privacy" className="text-cyan-400 underline" target="_blank" rel="noopener noreferrer">
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
