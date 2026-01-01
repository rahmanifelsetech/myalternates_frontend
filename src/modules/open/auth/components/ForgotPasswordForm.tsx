import React from 'react';
import { useForm } from '@shared/hooks/useForm';
import { DynamicFormField } from '@shared/components/form/FormField';
import Button from '@shared/components/ui/button/Button';
import { Link, useNavigate } from 'react-router';
import { IdentifierSchema, OtpSchema, SetNewPasswordSchema } from '../schema/auth.schemas';
import { IdentifierPayload, OtpPayload, SetNewPasswordFormData } from '../types/auth';
import { useAuth } from '../hooks/useAuth';
import { ResendOtpButton } from '@shared/components/common/ResendOtpButton';
import appConfig from '@/shared/config/app.config';

export const ForgotPasswordForm: React.FC = () => {
  const [step, setStep] = React.useState(1);
  const [resetToken, setResetToken] = React.useState('');
  const navigate = useNavigate();
  const { sendOtp, verifyOtp, resetPassword, loading, error } = useAuth();

  const identifierForm = useForm(IdentifierSchema);
  const otpForm = useForm(OtpSchema);
  const newPasswordForm = useForm(SetNewPasswordSchema);

  const onIdentifierSubmit = async (data: IdentifierPayload) => {
    const result = await sendOtp(data);
    if (result.success) {
      setStep(2);
    }
  };

  const onOtpSubmit = async (data: OtpPayload) => {
    const identifier = identifierForm.getValues('identifier');
    const result = await verifyOtp({ ...data, identifier });
    if (result.success) {
      setResetToken(result.data?.reset_token || '');
      setStep(3);
    }
  };

  const onNewPasswordSubmit = async (data: SetNewPasswordFormData) => {
    data.reset_token = resetToken
    const result = await resetPassword(data);
    if (result.success) {
      // Handle success
      navigate(appConfig.unAuthenticatedEntryPath);
    }
  };

  return (
    <div className="flex flex-col flex-1 items-center justify-center w-full">
      <div className="shadow-sm p-10 rounded-lg bg-white dark:bg-gray-800 w-96">
        <div className="text-center mb-5 sm:mb-8">
          <h1 className="font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
            Forgot Password
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {step === 1 && 'Enter your email or phone to reset your password'}
            {step === 2 && 'Enter the OTP sent to your email or phone'}
            {step === 3 && 'Enter your new password'}
          </p>
        </div>
        {step === 1 && (
          <form onSubmit={identifierForm.handleSubmit(onIdentifierSubmit)} className="space-y-6">
            <DynamicFormField
              type="text"
              label="Email or Phone"
              placeholder="Enter your email or phone"
              error={identifierForm.formState.errors.identifier}
              required
              {...identifierForm.register('identifier')}
            />
            <Button type="submit" className="w-full" loading={loading}>
              {loading ? "Sending OTP..." : "Send OTP"}
            </Button>
          </form>
        )}
        {step === 2 && (
          <form onSubmit={otpForm.handleSubmit(onOtpSubmit)} className="space-y-6">
            <DynamicFormField
              type="otp"
              label="Enter OTP"
              otpLength={6}
              name="otp"
              control={otpForm.control}
              onComplete={() => otpForm.handleSubmit(onOtpSubmit)()}
            />
            <Button type="submit" className="w-full" loading={loading}>
              {loading ? "Verifying..." : "Verify OTP"}
            </Button>
            {error && (
              <p className="p-3 text-sm text-error-500 bg-error-50 dark:bg-error-900/20 rounded-lg">
                {error}
              </p>
            )}
            <ResendOtpButton onResend={() => onIdentifierSubmit(identifierForm.getValues())} />
          </form>
        )}
        {step === 3 && (
          <form onSubmit={newPasswordForm.handleSubmit(onNewPasswordSubmit)} className="space-y-6">
            {error && (
              <p className="p-3 text-sm text-error-500 bg-error-50 dark:bg-error-900/20 rounded-lg">
                {error}
              </p>
            )}
            <DynamicFormField
              type="password"
              label="New Password"
              placeholder="Enter your new password"
              error={newPasswordForm.formState.errors.password}
              required
              {...newPasswordForm.register('password')}
            />
            <DynamicFormField
              type="password"
              label="Confirm New Password"
              placeholder="Confirm your new password"
              error={newPasswordForm.formState.errors.confirmPassword}
              required
              {...newPasswordForm.register('confirmPassword')}
            />
            <Button type="submit" className="w-full" loading={loading}>
              {loading ? "Resetting Password..." : "Reset Password"}
            </Button>
          </form>
        )}
        <div className="mt-5">
          <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400">
            Remember your password?{' '}
            <Link
              to="/auth/signin"
              className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};