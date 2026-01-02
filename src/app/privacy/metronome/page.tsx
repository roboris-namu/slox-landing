export default function MetronomePrivacy() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
          Metronome - SLOX
        </h1>
        <h2 className="text-2xl font-semibold mb-6">Privacy Policy</h2>
        
        <div className="space-y-6 text-gray-300">
          <section>
            <h3 className="text-xl font-semibold text-white mb-2">Data Collection</h3>
            <p>Metronome - SLOX does not collect, store, or transmit any personal data. All settings and preferences are stored locally on your device.</p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-white mb-2">Permissions</h3>
            <p>This app only requires audio playback permission to play metronome sounds. No microphone access is required or requested.</p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-white mb-2">Third-Party Services</h3>
            <p>This app does not use any third-party analytics, advertising, or tracking services.</p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-white mb-2">Data Storage</h3>
            <p>Only your preferences (BPM, time signature, language settings) are stored locally on your device. This data is never transmitted to external servers.</p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-white mb-2">Audio</h3>
            <p>All metronome click sounds are generated locally within the app. No external audio streaming or downloads are required.</p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-white mb-2">Contact</h3>
            <p>If you have any questions about this Privacy Policy, please contact us at: namurobori@gmail.com</p>
          </section>

          <section className="pt-4 border-t border-gray-700">
            <p className="text-sm text-gray-500">Last updated: January 2026</p>
          </section>
        </div>
      </div>
    </main>
  );
}
