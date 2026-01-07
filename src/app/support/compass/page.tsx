import Link from "next/link";

export default function CompassSupport() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-cyan-500 to-teal-400 bg-clip-text text-transparent">
          Compass - SLOX
        </h1>
        <h2 className="text-2xl font-semibold mb-6">Support</h2>
        
        <div className="space-y-6 text-gray-300">
          <section>
            <h3 className="text-xl font-semibold text-white mb-2">About the App</h3>
            <p>Compass - SLOX is a beautiful and accurate digital compass that helps you find your direction anywhere. Perfect for hiking, camping, navigation, and everyday use.</p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-white mb-2">Features</h3>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>Real-time compass heading (0° - 360°)</li>
              <li>Cardinal directions (N, E, S, W)</li>
              <li>Intercardinal directions (NE, SE, SW, NW)</li>
              <li>Beautiful rotating compass dial</li>
              <li>Direction indicator cards</li>
              <li>Smooth animations</li>
              <li>Dark theme for easy viewing</li>
              <li>Works offline - no internet required</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-white mb-2">FAQ</h3>
            <div className="space-y-4">
              <div>
                <p className="font-medium text-white">Q: Why is my compass not accurate?</p>
                <p className="text-gray-400">A: Try calibrating your device by moving it in a figure-8 pattern. Also, stay away from metal objects and electronic devices that can interfere with the magnetometer.</p>
              </div>
              <div>
                <p className="font-medium text-white">Q: Does the app work without internet?</p>
                <p className="text-gray-400">A: Yes! The compass uses your device&apos;s built-in magnetometer and works completely offline.</p>
              </div>
              <div>
                <p className="font-medium text-white">Q: Why does the app need location permission?</p>
                <p className="text-gray-400">A: Location permission may be requested to help calibrate the compass more accurately. We do not collect or store your location data.</p>
              </div>
              <div>
                <p className="font-medium text-white">Q: The compass is spinning erratically. What should I do?</p>
                <p className="text-gray-400">A: This usually indicates magnetic interference. Move away from electronic devices, metal objects, or magnetic sources. Try recalibrating by moving your phone in a figure-8 motion.</p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-white mb-2">Contact Us</h3>
            <p>If you have any questions, feedback, or issues, please contact us:</p>
            <div className="mt-4 space-y-2">
              <p>Email: <a href="mailto:namurobori@gmail.com" className="text-cyan-400 hover:text-cyan-300">namurobori@gmail.com</a></p>
              <p>Website: <a href="https://slox.co.kr" className="text-cyan-400 hover:text-cyan-300">https://slox.co.kr</a></p>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-white mb-2">Privacy Policy</h3>
            <p>Read our <Link href="/privacy/compass" className="text-cyan-400 hover:text-cyan-300">Privacy Policy</Link></p>
          </section>

          <section className="pt-4 border-t border-gray-700">
            <p className="text-sm text-gray-500">Version 1.0.0 | Last updated: January 2026</p>
          </section>
        </div>
      </div>
    </main>
  );
}
