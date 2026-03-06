export default function SleepTrackerPrivacy() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-500 to-indigo-400 bg-clip-text text-transparent">
          Sleep Tracker - SLOX
        </h1>
        <h2 className="text-2xl font-semibold mb-6">Privacy Policy</h2>
        
        <div className="space-y-6 text-gray-300">
          <section>
            <h3 className="text-xl font-semibold text-white mb-2">Data Collection</h3>
            <p>Sleep Tracker - SLOX does not collect, store, or transmit any personal data to external servers. All sleep records (bedtime, wake time, duration, and quality) are stored locally on your device only.</p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-white mb-2">Permissions</h3>
            <p>This app does not require any special permissions. No camera, microphone, location, or health data access is required or requested.</p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-white mb-2">Third-Party Services</h3>
            <p>This app uses Google AdMob for displaying advertisements. AdMob may collect device identifiers and usage data for ad personalization. You can opt out of personalized ads in your device settings. For more information, please refer to Google&apos;s Privacy Policy.</p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-white mb-2">Data Storage</h3>
            <p>Your sleep records and preferences (language settings) are stored locally on your device using local storage. This data is never transmitted to external servers and remains entirely under your control.</p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-white mb-2">Data Deletion</h3>
            <p>You can delete individual sleep records within the app at any time. Uninstalling the app will permanently remove all stored data from your device.</p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-white mb-2">Contact</h3>
            <p>If you have any questions about this Privacy Policy, please contact us at: namurobori@gmail.com</p>
          </section>

          <section className="pt-4 border-t border-gray-700">
            <p className="text-sm text-gray-500">Last updated: March 2026</p>
          </section>
        </div>
      </div>
    </main>
  );
}
