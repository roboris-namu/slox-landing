import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - Multi Timer | SLOX',
  description: 'Privacy Policy for Multi Timer - SLOX, a multiple concurrent timers app.',
};

export default function MultiTimerPrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">
          Privacy Policy - Multi Timer - SLOX
        </h1>

        <div className="text-gray-300 space-y-6">
          <p className="text-sm text-gray-500">Last updated: June 27, 2026</p>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">1. Introduction</h2>
            <p>
              This Privacy Policy explains how Multi Timer - SLOX (&quot;we&quot;,
              &quot;our&quot;, or &quot;the App&quot;) handles information when you use our
              mobile application. Multi Timer - SLOX lets you run multiple countdown
              timers at the same time for cooking, workouts, and daily tasks.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. Information We Collect</h2>
            <p className="mb-2">
              <strong>No Account Required:</strong> Multi Timer - SLOX does not require sign-up
              or sign-in.
            </p>
            <p>
              <strong>Local Storage Only:</strong> The App may store language preference and
              sound/vibration settings on your device. Timer data during a session is kept in
              memory and is not uploaded to our servers.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. Third-Party Services (Advertising)</h2>
            <p className="mb-2">
              Multi Timer - SLOX displays advertisements through <strong>Google AdMob</strong>,
              operated by Google LLC. AdMob may collect device information, coarse location (IP-based),
              and ad interaction data to deliver and measure ads.
            </p>
            <p>
              The App does not request App Tracking Transparency permission.
              See{' '}
              <a href="https://policies.google.com/privacy" className="text-sky-400 underline" target="_blank" rel="noopener noreferrer">
                Google&apos;s Privacy Policy
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. Children&apos;s Privacy</h2>
            <p>
              The App is not specifically targeted at children. Because ads are delivered by Google
              AdMob, it is not suitable for the Kids Category.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">5. Contact Us</h2>
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
