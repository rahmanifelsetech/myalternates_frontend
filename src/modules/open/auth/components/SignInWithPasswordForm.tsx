import React from 'react';
import { useForm } from '@shared/hooks/useForm';
import { DynamicFormField } from '@shared/components/form/FormField';
import Button from '@shared/components/ui/button/Button';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import { SignInWithPasswordSchema } from '../schema/auth.schemas';
import { SignInWithPasswordData } from '../types/auth';

export const SignInWithPasswordForm: React.FC = () => {
  const navigate = useNavigate();
  const { signInWithPassword, loading, error } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(SignInWithPasswordSchema);

  const onSubmit = async (data: SignInWithPasswordData) => {
    const result = await signInWithPassword(data);
    if (result.success) {
      setTimeout(() => {
        if (result.data?.requiresPasswordChange) {
          navigate("/auth/change-password");
        } else {
          navigate("/");
        }
      }, 500);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error && (
        <div className="p-3 text-sm text-error-500 bg-error-50 dark:bg-error-900/20 rounded-lg">
          {error}
        </div>
      )}
      <DynamicFormField
        type="text"
        label="PAN, Email or Phone"
        placeholder="Enter your PAN, email or phone"
        error={errors.identifier}
        required
        {...register('identifier')}
      />
      <DynamicFormField
        type="password"
        label="Password"
        placeholder="Enter your password"
        error={errors.password}
        required
        {...register('password')}
      />
      <div className="flex items-center justify-between">
        <Link
          to="/auth/forgot-password"
          className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
        >
          Forgot Password?
        </Link>
      </div>
      <Button type="submit" className="w-full" loading={loading}>
        {loading ? "Signing in..." : "Sign In"}
      </Button>
    </form>
  );
};