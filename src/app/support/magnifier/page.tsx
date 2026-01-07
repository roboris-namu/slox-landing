import Link from "next/link";

export default function MagnifierSupport() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-500 to-indigo-400 bg-clip-text text-transparent">
          Magnifier - SLOX
        </h1>
        <h2 className="text-2xl font-semibold mb-6">Support</h2>
        
        <div className="space-y-6 text-gray-300">
          <section>
            <h3 className="text-xl font-semibold text-white mb-2">About the App</h3>
            <p>Magnifier - SLOX transforms your smartphone into a powerful digital magnifying glass. Perfect for reading small text, medicine labels, fine print, and examining small objects with ease.</p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-white mb-2">Features</h3>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>High zoom magnification (1x to max optical zoom)</li>
              <li>Quick zoom buttons (1x, 2x, 4x, Max)</li>
              <li>Built-in LED flashlight for dark environments</li>
              <li>Freeze frame to capture and examine details</li>
              <li>Color filters (Normal, Inverted, High Contrast, Grayscale)</li>
              <li>Senior-friendly large buttons and controls</li>
              <li>Simple and intuitive interface</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-white mb-2">FAQ</h3>
            <div className="space-y-4">
              <div>
                <p className="font-medium text-white">Q: Does the app save photos?</p>
                <p className="text-gray-400">A: No, the app only displays a live magnified view. The freeze feature pauses the view temporarily but does not save any images.</p>
              </div>
              <div>
                <p className="font-medium text-white">Q: What are the color filters for?</p>
                <p className="text-gray-400">A: Color filters help people with visual impairments. Inverted and High Contrast modes can make text easier to read for those with low vision.</p>
              </div>
              <div>
                <p className="font-medium text-white">Q: Why is my camera not working?</p>
                <p className="text-gray-400">A: Please ensure you have granted camera permission to the app in your device settings.</p>
              </div>
              <div>
                <p className="font-medium text-white">Q: Does the flashlight drain battery?</p>
                <p className="text-gray-400">A: Yes, using the LED flashlight will consume additional battery. Turn it off when not needed to save power.</p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-white mb-2">Contact Us</h3>
            <p>If you have any questions, feedback, or issues, please contact us:</p>
            <div className="mt-4 space-y-2">
              <p>Email: <a href="mailto:namurobori@gmail.com" className="text-purple-400 hover:text-purple-300">namurobori@gmail.com</a></p>
              <p>Website: <a href="https://slox.co.kr" className="text-purple-400 hover:text-purple-300">https://slox.co.kr</a></p>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-white mb-2">Privacy Policy</h3>
            <p>Read our <Link href="/privacy/magnifier" className="text-purple-400 hover:text-purple-300">Privacy Policy</Link></p>
          </section>

          <section className="pt-4 border-t border-gray-700">
            <p className="text-sm text-gray-500">Version 1.0.0 | Last updated: January 2026</p>
          </section>
        </div>
      </div>
    </main>
  );
}
