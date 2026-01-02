import Link from "next/link";

export default function WhiteNoiseSupport() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-indigo-500 to-cyan-400 bg-clip-text text-transparent">
          White Noise - SLOX
        </h1>
        <h2 className="text-2xl font-semibold mb-6">Support</h2>
        
        <div className="space-y-6 text-gray-300">
          <section>
            <h3 className="text-xl font-semibold text-white mb-2">About the App</h3>
            <p>White Noise - SLOX helps you relax, sleep better, and focus with calming natural sounds. Mix 8 ambient sounds including rain, ocean, wind, forest, fire, birds, thunder, and night crickets to create your perfect atmosphere.</p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-white mb-2">Features</h3>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>8 Natural ambient sounds</li>
              <li>Mix multiple sounds together</li>
              <li>Individual volume control for each sound</li>
              <li>Sleep timer (15 min to 8 hours)</li>
              <li>Background playback support</li>
              <li>15 languages supported</li>
              <li>Beautiful dark interface</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-white mb-2">FAQ</h3>
            <div className="space-y-4">
              <div>
                <p className="font-medium text-white">Q: Does the app work offline?</p>
                <p className="text-gray-400">A: Yes! All sounds are included in the app and work without internet connection.</p>
              </div>
              <div>
                <p className="font-medium text-white">Q: Can I play sounds in the background?</p>
                <p className="text-gray-400">A: Yes, sounds will continue playing even when you close the app or lock your device.</p>
              </div>
              <div>
                <p className="font-medium text-white">Q: How do I use the sleep timer?</p>
                <p className="text-gray-400">A: Tap on any timer option (15, 30, 45, 60, or 90 minutes) and the sounds will automatically stop after the selected time.</p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-white mb-2">Contact Us</h3>
            <p>If you have any questions, feedback, or issues, please contact us:</p>
            <div className="mt-4 space-y-2">
              <p>Email: <a href="mailto:namurobori@gmail.com" className="text-indigo-400 hover:text-indigo-300">namurobori@gmail.com</a></p>
              <p>Website: <a href="https://slox.co.kr" className="text-indigo-400 hover:text-indigo-300">https://slox.co.kr</a></p>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-white mb-2">Privacy Policy</h3>
            <p>Read our <Link href="/privacy/whitenoise" className="text-indigo-400 hover:text-indigo-300">Privacy Policy</Link></p>
          </section>

          <section className="pt-4 border-t border-gray-700">
            <p className="text-sm text-gray-500">Version 1.0.0 | Last updated: January 2026</p>
          </section>
        </div>
      </div>
    </main>
  );
}
