// import { useState } from "react";
import { Link, useNavigate } from "react-router";
// import { EyeCloseIcon, EyeIcon } from "../../icons";
import { DynamicFormField } from "@shared/components/form/FormField";
import { typographyClasses } from '@shared/utils/typographyUtils';
import { useAuth } from "@/modules/open/auth/hooks/useAuth";
import { useForm } from "@shared/hooks/useForm";
import { SignInSchema } from "@/modules/open/auth/schema/auth.schemas";
import { useToast } from "@/shared/hooks/useToast";

export default function SignInForm() {
  const navigate = useNavigate();
  const { success: toastSuccess } = useToast();
  const { signIn, loading, error } = useAuth();
  const { register, handleSubmit, formState: { errors }, control } = useForm(SignInSchema, { rememberMe: true});
  
  const onSubmit = async (data: any) => {
    console.log('Form Data:', data);
    const result = await signIn({
      rememberMe: data.rememberMe,
      username: data.username,
      email: data.email,
      password: data.password,
    });

    if (result.success) {
      toastSuccess("Signed in successfully!");
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
    <div className="flex flex-col flex-1">
      <div className="flex flex-col flex-1 items-center justify-center w-full ">
        <div className="shadow-sm p-10 rounded-lg bg-white dark:bg-gray-800 w-96">
          <div className="text-center mb-5 sm:mb-8">
            <h1 className={`mb-2 ${typographyClasses.heading.h4} text-gray-800 dark:text-white/90`}>
              Welcome Back!
            </h1>
            <p className={`${typographyClasses.body.small} text-gray-500 dark:text-gray-400`}>
              Sign-in to continue your journey.
            </p>
          </div>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-6">
                {error && (
                  <div className="p-3 text-sm text-error-500 bg-error-50 dark:bg-error-900/20 rounded-lg">
                    {error}
                  </div>
                )}
                <DynamicFormField
                  type="text"
                  label="Username"
                  placeholder="Enter your username"
                  required
                  error={errors.username}
                  {...register("username")}
                />
                
                <DynamicFormField
                  type="email"
                  label="Email"
                  placeholder="info@gmail.com"
                  required
                  error={errors.email}
                  {...register("email")}
                />
                
                <DynamicFormField
                  type="password"
                  label="Password"
                  placeholder="**********"
                  required
                  error={errors.password}
                  {...register("password")}
                />
                
                <div className="flex items-center justify-between">
                   <DynamicFormField
                    type="checkbox"
                    label="Keep me logged in"
                    error={errors.rememberMe}
                    control={control}
                    required
                    disabled={loading}
                    {...register("rememberMe")}
                  />

                  {/* <FormCheckbox
                    
                    label="Keep me logged in"
                    error={errors.rememberMe}
                    {...register("rememberMe")}
                  /> */}
                  <Link
                    to="/reset-password"
                    className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full px-4 py-3 text-sm font-medium text-white transition bg-brand-500 rounded-lg hover:bg-brand-600 disabled:bg-brand-300 disabled:cursor-not-allowed"
                  >
                    {loading ? "Signing in..." : "Sign in"}
                  </button>
                </div>
              </div>
            </form>

            <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                Don&apos;t have an account? {""}
                <Link
                  to="/auth/signup"
                  className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
