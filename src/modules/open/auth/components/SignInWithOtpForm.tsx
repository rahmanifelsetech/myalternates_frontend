import React, { useState } from 'react';
import { useForm } from '@shared/hooks/useForm';
import { DynamicFormField } from '@shared/components/form/FormField';
import Button from '@shared/components/ui/button/Button';
import { useAuth } from '../hooks/useAuth';
import { IdentifierSchema, OtpSchema } from '../schema/auth.schemas';
import { IdentifierPayload, OtpPayload } from '../types/auth';
import { useNavigate } from 'react-router';
import { ResendOtpButton } from '@shared/components/common/ResendOtpButton';
import appConfig from '@/shared/config/app.config';

export const SignInWithOtpForm: React.FC = () => {
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();
  const { sendOtp, signInWithOtp, loading, error } = useAuth();

  const identifierForm = useForm(IdentifierSchema);
  const otpForm = useForm(OtpSchema);

  const onIdentifierSubmit = async (data: IdentifierPayload) => {
    const result = await sendOtp(data);
    if (result.success) {
      setOtpSent(true);
    }
  };

  const onOtpSubmit = async (data: OtpPayload) => {
    const identifierValues = identifierForm.getValues();
    const result = await signInWithOtp({
      ...data,
      identifier: identifierValues.identifier,
      rememberMe: otpForm.getValues().rememberMe,
    });
    if (result.success) {
      setTimeout(() => {
        if (result.data?.requiresPasswordChange) {
          navigate("/auth/change-password");
        } else {
          navigate(appConfig.authenticatedEntryPath);
        }
      }, 500);
    }
  };

  const onOtpComplete = (otp: string) => {
    otpForm.setValue('otp', otp, { shouldValidate: true });
    otpForm.handleSubmit(onOtpSubmit)();
  };

  return (
    <>
      {!otpSent ? (
        <form onSubmit={identifierForm.handleSubmit(onIdentifierSubmit)} className="space-y-6">
          <DynamicFormField
            type="text"
            label="Email or Phone"
            placeholder="Enter your email or phone"
            error={identifierForm.formState.errors.identifier}
            required
            {...identifierForm.register('identifier')}
          />
          <div className="flex items-center justify-between">
            <DynamicFormField
              type="checkbox"
              label="Remember Me"
              error={identifierForm.formState.errors.rememberMe}
              control={identifierForm.control}
              {...identifierForm.register('rememberMe')}
            />
          </div>
          <Button type="submit" className="w-full" loading={loading}>
            {loading ? "Sending OTP..." : "Send OTP"}
          </Button>
        </form>
      ) : (
        <form onSubmit={otpForm.handleSubmit(onOtpSubmit)} className="space-y-6">
          <DynamicFormField
            type="otp"
            label="Enter OTP"
            error={otpForm.formState.errors.otp}
            required
            otpLength={6}
            name="otp"
            control={otpForm.control}
            onComplete={onOtpComplete}
          />
          <Button type="submit" className="w-full" loading={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
      )}
      {otpSent && <ResendOtpButton onResend={() => onIdentifierSubmit(identifierForm.getValues())} />}
    </>
  );
};