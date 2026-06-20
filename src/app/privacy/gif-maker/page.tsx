import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - GIF Maker | SLOX',
  description: 'Privacy Policy for GIF Maker - SLOX, a photo-to-GIF animation app.',
};

export default function GifMakerPrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent">
          Privacy Policy - GIF Maker - SLOX
        </h1>

        <div className="text-gray-300 space-y-6">
          <p className="text-sm text-gray-500">Last updated: June 21, 2026</p>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">1. Introduction</h2>
            <p>
              This Privacy Policy explains how GIF Maker - SLOX (&quot;we&quot;,
              &quot;our&quot;, or &quot;the App&quot;) handles information when you use our
              mobile application. GIF Maker - SLOX combines multiple photos into an
              animated GIF with adjustable speed, size, and loop settings.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. Photos &amp; On-Device Processing</h2>
            <p className="mb-2">
              <strong>On-Device Processing:</strong> Photos you select are processed locally on
              your device to create GIF files. We do not upload your photos or GIFs to our servers.
            </p>
            <p className="mb-2">
              <strong>Photo Library Access:</strong> With your permission, the App reads photos
              you choose and may save created GIFs back to your library.
            </p>
            <p>
              <strong>No Cloud Storage:</strong> We do not operate a cloud backup or sync service
              for your images or GIFs.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. Information We Collect</h2>
            <p className="mb-2">
              <strong>No Account Required:</strong> GIF Maker - SLOX does not require sign-up
              or sign-in.
            </p>
            <p>
              <strong>Local Storage Only:</strong> The App may store language preference and
              default FPS/size settings on your device. This data is not uploaded to our servers.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. Third-Party Services (Advertising)</h2>
            <p className="mb-2">
              GIF Maker - SLOX displays advertisements through <strong>Google AdMob</strong>,
              operated by Google LLC. AdMob may collect device information, coarse location (IP-based),
              and ad interaction data to deliver and measure ads.
            </p>
            <p>
              The App does not request App Tracking Transparency permission.
              <strong> Your photos and GIFs are never shared with AdMob.</strong> See{' '}
              <a href="https://policies.google.com/privacy" className="text-violet-400 underline" target="_blank" rel="noopener noreferrer">
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
