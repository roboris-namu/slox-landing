import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - 정비도사 (Jeongbidosa) | SLOX',
  description: 'Privacy Policy for 정비도사 - AI Car Maintenance Assistant by SLOX',
};

export default function JeongbidosaPrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
          Privacy Policy - 정비도사 (Jeongbidosa) - SLOX
        </h1>

        <div className="text-gray-300 space-y-6">
          <p className="text-sm text-gray-500">Last updated: May 10, 2026</p>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">1. Introduction</h2>
            <p>
              This Privacy Policy explains how 정비도사 (Jeongbidosa) - SLOX (&quot;we&quot;, &quot;our&quot;, or
              &quot;the App&quot;) collects, uses, and protects your information when you use our AI car
              maintenance assistant mobile application.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. Information We Collect</h2>
            <p className="mb-2">
              <strong>Microphone Access:</strong> The App requests access to your device&apos;s microphone
              and speech recognition services to convert your spoken questions into text. The audio is
              processed by the operating system&apos;s built-in speech recognition (Apple Speech
              Recognition on iOS, Google Speech Recognizer on Android) and is not stored or transmitted
              by us.
            </p>
            <p className="mb-2">
              <strong>Question Text:</strong> The text of your car maintenance questions is sent to our
              backend server (slox.co.kr) and forwarded to the OpenAI API to generate answers. We do not
              store your questions or answers on our servers; they are processed in memory and discarded
              after the response is delivered.
            </p>
            <p className="mb-2">
              <strong>Local Settings:</strong> Your in-app preferences (such as text-to-speech on/off)
              are stored locally on your device using SharedPreferences and never leave your device.
            </p>
            <p>
              <strong>No Personal Data:</strong> We do not collect, store, or share personal information
              such as your name, email address, phone number, location, contacts, photos, or device
              identifiers (other than what is required by AdMob for advertising; see Section 5).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. How We Use Information</h2>
            <p>
              The microphone audio is used solely to convert your speech into text on your device. The
              question text is used solely to generate an AI response from a knowledge base of car
              maintenance information. No data is used for profiling, advertising targeting beyond
              standard AdMob behavior, or shared with any party other than OpenAI for the sole purpose
              of generating answers.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. Data Storage and Retention</h2>
            <p>
              Question text sent to our backend is processed transiently and is not persisted in our
              databases. OpenAI&apos;s data handling policy applies to the API request and is described
              at{' '}
              <a
                href="https://openai.com/policies/privacy-policy"
                className="text-emerald-400 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://openai.com/policies/privacy-policy
              </a>
              . App preferences are stored only on your device and are deleted when you uninstall the
              App.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">5. Third-Party Services</h2>
            <p className="mb-2">
              <strong>OpenAI:</strong> Used to generate AI responses to your maintenance questions. Only
              the question text is sent. See OpenAI&apos;s Privacy Policy linked above.
            </p>
            <p className="mb-2">
              <strong>Google AdMob:</strong> The App displays banner and interstitial advertisements
              provided by Google AdMob. AdMob may collect device identifiers (such as the Advertising
              Identifier) to deliver and measure advertisements. You can manage tracking preferences in
              your device settings (Settings &gt; Privacy &amp; Security &gt; Tracking on iOS;
              Settings &gt; Google &gt; Ads on Android). For details, see{' '}
              <a
                href="https://policies.google.com/technologies/ads"
                className="text-emerald-400 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://policies.google.com/technologies/ads
              </a>
              .
            </p>
            <p>
              <strong>Apple / Google Speech Recognition:</strong> Voice input may be processed by the
              operating system&apos;s speech recognition service, which may transmit short audio
              segments to Apple or Google for transcription. We do not control or have access to this
              process; please refer to your device manufacturer&apos;s privacy policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">6. Children&apos;s Privacy</h2>
            <p>
              The App is intended for general audiences and is not directed to children under the age of
              13. We do not knowingly collect any personal information from children. AdMob may serve
              non-personalized ads when applicable.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">7. Disclaimer of AI Answers</h2>
            <p>
              The car maintenance information provided by the App is generated by an AI system and is
              for general reference only. It does not constitute professional advice. Always consult a
              qualified automotive technician before performing repairs or making maintenance decisions.
              We are not liable for any damage, injury, or loss arising from reliance on the App&apos;s
              output.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">8. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Any changes will be posted on this
              page with an updated revision date.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">9. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at:</p>
            <p className="mt-2">
              <strong>Email:</strong> namurobori@gmail.com
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
