export default function AnimalScanPrivacy() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-green-500 to-emerald-400 bg-clip-text text-transparent">
          Animal Scan - SLOX
        </h1>
        <h2 className="text-2xl font-semibold mb-6">Privacy Policy</h2>
        
        <div className="space-y-6 text-gray-300">
          <section>
            <h3 className="text-xl font-semibold text-white mb-2">Data Collection</h3>
            <p>Animal Scan - SLOX does not collect, store, or transmit any personal data. All animal analysis is performed locally on your device using on-device machine learning. Your photos are never uploaded to external servers.</p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-white mb-2">Permissions</h3>
            <ul className="list-disc list-inside space-y-1">
              <li><strong>Camera:</strong> Used to take photos for animal scanning. Photos are processed locally and not stored or shared.</li>
              <li><strong>Photo Library:</strong> Used to select existing photos for analysis. Selected photos are processed locally only.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-white mb-2">Third-Party Services</h3>
            <p>This app uses Google AdMob to display advertisements. AdMob may collect device identifiers and usage data in accordance with Google&apos;s privacy policy. No personal information is shared by the app itself.</p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-white mb-2">On-Device Processing</h3>
            <p>All animal recognition and analysis is performed entirely on your device using Google ML Kit. No images or analysis results are transmitted to any server.</p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-white mb-2">Data Storage</h3>
            <p>Language preferences are stored locally on your device and are never transmitted to external servers.</p>
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
