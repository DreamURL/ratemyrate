import { useTranslation } from 'react-i18next';
import MetaTags from '@/components/seo/meta-tags';

export default function PrivacyPolicyPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <MetaTags 
        title="Privacy Policy"
        description="Privacy Policy for the Competitiveness Assessment Service. We do not collect or store personal data."
        canonical="/privacy-policy"
      />
      
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Privacy Policy
          </h1>
          
          <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                1. Information Collection
              </h2>
              <p>
                This service collects minimal information necessary to provide the 
                assessment functionality. The information you provide through the 
                assessment forms is used solely for generating your personalized results.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                2. Use of User Input
              </h2>
              <p>
                <strong>User input and responses are NOT used for statistics, data analysis, 
                marketing, research, or any other purpose beyond providing you with your 
                immediate assessment results.</strong>
              </p>
              <p>
                Your answers and personal information are not stored, analyzed, or used 
                to improve the service or for any commercial purposes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                3. Data Storage
              </h2>
              <p>
                This service operates as a client-side application. Your responses and 
                assessment results are processed locally in your browser and are not 
                transmitted to or stored on our servers.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                4. Third-Party Services
              </h2>
              <p>
                This service may use third-party services for basic functionality 
                (such as hosting). These services do not have access to your assessment 
                responses or personal information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                5. Cookies and Tracking
              </h2>
              <p>
                This service may use minimal cookies or local storage for basic 
                functionality such as language preferences. No tracking or analytics 
                cookies are used to monitor your behavior or collect personal data.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                6. Your Rights
              </h2>
              <p>
                Since no personal data is stored or transmitted, there is no personal 
                information to access, modify, or delete. Each session is independent 
                and your responses are not retained after you close the application.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                7. Changes to This Policy
              </h2>
              <p>
                This Privacy Policy may be updated from time to time. Any changes will 
                be reflected on this page. We encourage you to review this policy 
                periodically.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                8. Contact Information
              </h2>
              <p>
                If you have any questions about this Privacy Policy or our data 
                practices, please note that this service is provided for entertainment 
                purposes only and operates with minimal data collection as described above.
              </p>
            </section>
          </div>

          <div className="mt-8 text-center">
            <button 
              onClick={() => window.history.back()} 
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
