import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | SLOX',
  description: 'Terms of Service for SLOX apps and services.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-purple-500 to-cyan-400 bg-clip-text text-transparent">
          Terms of Service - SLOX
        </h1>

        <div className="text-gray-300 space-y-6">
          <p className="text-sm text-gray-500">Last updated: May 30, 2026</p>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">1. Acceptance of Terms</h2>
            <p>
              By downloading, installing, or using any application or website operated by SLOX
              (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;), you agree to be bound by these
              Terms of Service (&quot;Terms&quot;). If you do not agree, please discontinue use
              of our apps and services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. Description of Service</h2>
            <p>
              SLOX provides a portfolio of mobile and web applications including utilities,
              timers, health tools, productivity tools, entertainment, and educational apps.
              Most of our apps are free to use and may be supported by third-party advertising.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. License</h2>
            <p>
              SLOX grants you a limited, non-exclusive, non-transferable, revocable license to
              use our applications strictly for personal, non-commercial purposes, subject to
              these Terms and any applicable platform store rules (Apple App Store, Google Play).
              You may not copy, modify, reverse engineer, redistribute, or create derivative
              works of any SLOX application or service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. Advertising</h2>
            <p>
              Our apps may display advertisements delivered by third-party advertising networks
              such as Google AdMob. We do not endorse and are not responsible for the content,
              accuracy, legality, or privacy practices of advertisers or the products and
              services they promote.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">5. User Conduct</h2>
            <p>You agree not to:</p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Use the apps for any unlawful purpose or in violation of any local, state, national, or international law</li>
              <li>Attempt to bypass advertising, in-app purchase systems, or other revenue mechanisms</li>
              <li>Reverse engineer, decompile, or attempt to extract the source code of any SLOX app</li>
              <li>Use the apps to harass, abuse, or harm another person</li>
              <li>Impersonate SLOX or misrepresent your affiliation with SLOX</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">6. Intellectual Property</h2>
            <p>
              All content provided through SLOX apps and services — including app design, source
              code, graphics, text, icons, logos, audio, and the SLOX brand — is the property of
              SLOX or its licensors and is protected by applicable copyright, trademark, and
              other intellectual property laws.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">7. Third-Party Services</h2>
            <p>
              Our apps integrate or interoperate with third-party services such as Google AdMob,
              Apple App Store, and Google Play. Your use of those services is governed by the
              respective terms and privacy policies of those third parties. SLOX is not
              responsible for the practices of any third-party service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">8. Disclaimer of Warranties</h2>
            <p>
              SLOX applications and services are provided &quot;as is&quot; and &quot;as
              available&quot; without warranties of any kind, whether express or implied,
              including but not limited to implied warranties of merchantability, fitness for a
              particular purpose, or non-infringement. We do not warrant that the apps will be
              uninterrupted, error-free, or free from harmful components.
            </p>
            <p className="mt-2">
              SLOX apps are not medical, legal, financial, or professional advice tools. Any
              measurements, calculations, or recommendations provided by our apps (e.g., timers,
              health calculators, BMI, fasting, heart rate, breathing exercises) are for general
              informational and entertainment purposes only and should not be relied upon as a
              substitute for professional advice or diagnosis.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">9. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by applicable law, SLOX and its affiliates shall
              not be liable for any indirect, incidental, special, consequential, or punitive
              damages, or any loss of profits, revenue, data, or use, arising out of or in
              connection with your use of, or inability to use, the apps or services. Our total
              cumulative liability for any claim arising out of these Terms shall not exceed the
              greater of (a) the total amount you have paid us in the past twelve months, or
              (b) USD 10.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">10. Termination</h2>
            <p>
              We may suspend or terminate your access to our apps and services at any time, with
              or without notice, for conduct that we believe violates these Terms or is harmful
              to other users, to SLOX, or to third parties. You may stop using the apps and
              uninstall them at any time.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">11. Changes to the Terms</h2>
            <p>
              We may update these Terms from time to time. Material changes will be posted on
              this page with an updated revision date. Continued use of the apps after such
              changes constitutes acceptance of the updated Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">12. Governing Law</h2>
            <p>
              These Terms are governed by the laws of the Republic of Korea, without regard to
              its conflict of law principles. Any dispute arising out of or in connection with
              these Terms shall be submitted to the exclusive jurisdiction of the competent
              courts in Seoul, Republic of Korea, subject to mandatory consumer protection laws
              that may apply in your country of residence.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">13. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at:
            </p>
            <p className="mt-2">
              <strong>Email:</strong> contact@slox.co.kr
              <br />
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
