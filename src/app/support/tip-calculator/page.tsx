import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Support - Tip Calculator App | SLOX',
  description: 'Support page for Tip Calculator - SLOX app',
};

export default function TipCalculatorSupportPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-green-500 to-emerald-400 bg-clip-text text-transparent">
          Support - Tip Calculator - SLOX
        </h1>
        
        <div className="text-gray-300 space-y-8">
          {/* App Description */}
          <section className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
            <h2 className="text-xl font-semibold text-white mb-3">About Tip Calculator - SLOX</h2>
            <p>
              Tip Calculator - SLOX is a fast, easy-to-use tip calculator that helps you 
              calculate tips and split bills with friends. Perfect for dining out at restaurants, 
              cafes, bars, or anywhere you need to quickly figure out gratuity.
            </p>
          </section>

          {/* Features */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">Features</h2>
            <div className="grid gap-4">
              <div className="bg-gray-900/30 rounded-lg p-4 border border-gray-800">
                <h3 className="font-semibold text-green-400 mb-1">💵 Easy Bill Entry</h3>
                <p className="text-sm">Simply enter your bill amount to start calculating.</p>
              </div>
              <div className="bg-gray-900/30 rounded-lg p-4 border border-gray-800">
                <h3 className="font-semibold text-green-400 mb-1">📊 Preset Tip Options</h3>
                <p className="text-sm">Quick selection of common tip percentages: 10%, 15%, 18%, 20%, 25%.</p>
              </div>
              <div className="bg-gray-900/30 rounded-lg p-4 border border-gray-800">
                <h3 className="font-semibold text-green-400 mb-1">🎚️ Custom Tip Slider</h3>
                <p className="text-sm">Adjust tip percentage from 0% to 50% with precise control.</p>
              </div>
              <div className="bg-gray-900/30 rounded-lg p-4 border border-gray-800">
                <h3 className="font-semibold text-green-400 mb-1">👥 Bill Splitting</h3>
                <p className="text-sm">Split the total between 1-50 people to see per-person amounts.</p>
              </div>
              <div className="bg-gray-900/30 rounded-lg p-4 border border-gray-800">
                <h3 className="font-semibold text-green-400 mb-1">⚡ Real-Time Calculations</h3>
                <p className="text-sm">See tip, total, and per-person amounts update instantly.</p>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div className="bg-gray-900/30 rounded-lg p-4 border border-gray-800">
                <h3 className="font-semibold text-white mb-2">How do I calculate a tip?</h3>
                <p className="text-sm">
                  Enter your bill amount in the input field, select or adjust your desired tip 
                  percentage, and the app will instantly show you the tip amount and total.
                </p>
              </div>
              <div className="bg-gray-900/30 rounded-lg p-4 border border-gray-800">
                <h3 className="font-semibold text-white mb-2">How do I split the bill?</h3>
                <p className="text-sm">
                  Use the + and - buttons in the &quot;Split the Bill&quot; section to adjust the number 
                  of people. The per-person amount will update automatically.
                </p>
              </div>
              <div className="bg-gray-900/30 rounded-lg p-4 border border-gray-800">
                <h3 className="font-semibold text-white mb-2">Can I use a custom tip percentage?</h3>
                <p className="text-sm">
                  Yes! Use the slider to set any tip percentage from 0% to 50%, or tap the 
                  preset buttons for common amounts.
                </p>
              </div>
              <div className="bg-gray-900/30 rounded-lg p-4 border border-gray-800">
                <h3 className="font-semibold text-white mb-2">Does the app save my calculations?</h3>
                <p className="text-sm">
                  No. For your privacy, the app does not save any data. All calculations are 
                  cleared when you close the app. Use the reset button to clear values while using.
                </p>
              </div>
              <div className="bg-gray-900/30 rounded-lg p-4 border border-gray-800">
                <h3 className="font-semibold text-white mb-2">Does the app work offline?</h3>
                <p className="text-sm">
                  Yes! Tip Calculator works completely offline. No internet connection is required.
                </p>
              </div>
            </div>
          </section>

          {/* Contact */}
          <section className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
            <h2 className="text-xl font-semibold text-white mb-3">Contact Us</h2>
            <p className="mb-4">
              Have questions, feedback, or need help? We&apos;d love to hear from you!
            </p>
            <p>
              <strong>Email:</strong> contact@slox.co.kr<br />
              <strong>Website:</strong> https://www.slox.co.kr
            </p>
          </section>

          {/* Links */}
          <section className="flex flex-col sm:flex-row gap-4">
            <Link 
              href="/privacy/tip-calculator" 
              className="flex-1 text-center bg-green-600/20 hover:bg-green-600/30 text-green-400 py-3 px-6 rounded-lg border border-green-600/30 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link 
              href="/" 
              className="flex-1 text-center bg-gray-800 hover:bg-gray-700 text-white py-3 px-6 rounded-lg border border-gray-700 transition-colors"
            >
              Back to SLOX Home
            </Link>
          </section>

          <section className="pt-8 border-t border-gray-800">
            <p className="text-sm text-gray-500">
              © 2026 SLOX. All rights reserved.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
