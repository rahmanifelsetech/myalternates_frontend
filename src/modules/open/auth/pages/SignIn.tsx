import AuthPageLayout from "../layout/AuthPageLayout";
import { Tabs } from "@shared/components/common/Tabs";
import { SignInWithPasswordForm } from '../components/SignInWithPasswordForm';
import { SignInWithOtpForm } from '../components/SignInWithOtpForm';

export default function SignIn() {
  const tabs = [
    {
      label: 'Password',
      content: <SignInWithPasswordForm />,
    },
    {
      label: 'OTP',
      content: <SignInWithOtpForm />,
    },
  ];

  return (
    <AuthPageLayout>
      <div className="flex flex-col flex-1">
        <div className="flex flex-col flex-1 items-center justify-center w-full ">
          <div className="shadow-sm p-10 rounded-lg bg-white dark:bg-gray-800 w-96">
            <div className="text-center mb-5 sm:mb-8">
              <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
                Welcome Back!
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Sign-in to continue your journey.
              </p>
            </div>
            <Tabs tabs={tabs} variant="full-width" />
          </div>
        </div>
      </div>
    </AuthPageLayout>
  );
}
