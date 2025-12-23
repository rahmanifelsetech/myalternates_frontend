import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { DynamicFormField } from "@shared/components/form/FormField";
import { useAuth } from "@/modules/open/auth/hooks/useAuth";
import { useForm } from "@shared/hooks/useForm";
import { SignUpStep1Schema, SignUpStep2Schema, SignUpStep1Data, SignUpStep2Data } from "@/modules/open/auth/schema/auth.schemas";
import { useToast } from "@shared/hooks/useToast";
import { setFormErrors } from "@/shared/utils/formUtils";

export default function SignUpForm() {
  const navigate = useNavigate();
  const { error: toastError, success } = useToast()
  const { registerStep1, registerStep2, loading, error: formError } = useAuth();
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const [userId, setUserId] = useState<string | null>(null);

  // Step 1 form
  const {
    register: registerForm1,
    control: control1,
    setValue: setValue1,
    getValues: getValues1,
    handleSubmit: handleSubmit1,
    formState: { errors: errors1 },
  } = useForm(SignUpStep1Schema, {
    role: "investor",
    countryCode: "91",
    // firstName: "John",
    // lastName: "Doe",
    // email: "admin@abc.com",
    // phone: "919876543210"
  });

  // Step 2 form
  const {
    register: registerForm2,
    control: control2,    
    setError: setError2,
    handleSubmit: handleSubmit2,
    formState: { errors: errors2 },
  } = useForm(SignUpStep2Schema, {
    // username: "johndoe",
    // password: "password123",
    // confirmPassword: "password123",
    terms: true,
  });

  const onSubmitStep1 = async (data: SignUpStep1Data) => {
    console.log('Step 1 Data:', data);
    
    // console.log({
    //   countryCode: data.countryCode, // "91"
    //   phone: data.phone,             // "918232432432"
    // });
    
    const { data: resData, error: registerError } = await registerStep1(data);

    if(registerError){
      toastError(`Step 1 Registration Failed: ${registerError}`);
      return;
    }
    
    if(resData?.userId){
      setUserId(resData.userId);
      success('Step 1 Registration Successful! Please proceed to Step 2.');
      setCurrentStep(2);
    }
  };

  const onSubmitStep2 = async (data: SignUpStep2Data) => {
    
    if (!userId) return toastError('User ID is missing from Step 1. Please complete Step 1 first.');

    const result = await registerStep2(data, userId);


    if (result.error) {
      console.log('Registration Step 2 Error Details:', result.details);
      if (result.details) {
        setFormErrors<SignUpStep2Data>(
          result,
          setError2,
          ['username', 'password', 'confirmPassword', 'terms'],
          {
            onError: (msg) => toastError(msg),
          }
        );
      } else {
        toastError(`Step 2 Registration Failed: ${result.error}`);
      }
      return;
    }

    if (result.success) {
      success('Registration Successful! You can now sign in.');
      setTimeout(() => {
        navigate("/");
      }, 500);
    }
  };

  const handleBackStep = () => {
    setCurrentStep(1);
  };

  const termsLabel = (
    <span>
      I agree to the{" "}
      <Link to="/terms" className="text-brand-500 hover:text-brand-600 dark:text-brand-400">
        Terms and Conditions
      </Link>
      {" "}and{" "}
      <Link to="/terms" className="text-brand-500 hover:text-brand-600 dark:text-brand-400">
        Privacy Policy
      </Link>
  </span>
  );

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col flex-1 items-center justify-center w-full">
        <div className="shadow-sm p-10 rounded-lg bg-white dark:bg-gray-800 w-96">
          <div className="text-center mb-5 sm:mb-8">
            <div className="flex items-center justify-center gap-2 mb-2">
              <h1 className="font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
                Sign Up
              </h1>
              <span className="text-xs font-medium text-gray-500 bg-gray-100 dark:bg-gray-700 dark:text-gray-400 px-2 py-1 rounded">
                Step {currentStep}/2
              </span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {currentStep === 1
                ? "Enter your personal information"
                : "Create your account credentials"}
            </p>
          </div>
          <div>
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <form onSubmit={handleSubmit1(onSubmitStep1)}>
                <div className="space-y-6">
                  {formError && (
                    <div className="p-3 text-sm text-error-500 bg-error-50 dark:bg-error-900/20 rounded-lg">
                      {formError}
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-4">
                    <DynamicFormField
                      type="text"
                      label="First Name"
                      placeholder="John"
                      error={errors1.firstName}
                      required
                      disabled={loading}
                      {...registerForm1("firstName")}
                    />
                    <DynamicFormField
                      type="text"
                      label="Last Name"
                      placeholder="Doe"
                      error={errors1.lastName}
                      required
                      disabled={loading}
                      {...registerForm1("lastName")}
                    />
                  </div>
                  <DynamicFormField
                    type="email"
                    label="Email"
                    placeholder="john@example.com"
                    error={errors1.email}
                    required
                    disabled={loading}
                    {...registerForm1("email")}
                  />
                  <DynamicFormField
                    type="select"
                    label="Role"
                    // name="role"
                    control={control1}
                    options={[
                      { label: "Investor", value: "investor" },
                      { label: "Distributor", value: "distributor" },
                    ]}
                    error={errors1.role}
                    {...registerForm1("role")}
                  />

                  <DynamicFormField
                    type="phone-input"
                    label="Phone Number"
                    name="phone"
                    control={control1}
                    setValue={setValue1}
                    getValues={getValues1}
                    countryCodeName="countryCode"
                    placeholder="8551234567"
                    error={errors1.phone}
                    required
                    disabled={loading}
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full px-4 py-3 text-sm font-medium text-white transition bg-brand-500 rounded-lg hover:bg-brand-600 disabled:bg-brand-300 disabled:cursor-not-allowed"
                  >
                    {loading ? "Continuing..." : "Continue to Step 2"}
                  </button>
                </div>
              </form>
            )}

            {/* Step 2: Account Credentials */}
            {currentStep === 2 && (
              <form onSubmit={handleSubmit2(onSubmitStep2)}>
                <div className="space-y-5">
                  {formError && (
                    <div className="p-3 text-sm text-error-500 bg-error-50 dark:bg-error-900/20 rounded-lg">
                      {formError}
                    </div>
                  )}
                  <DynamicFormField
                    type="text"
                    label="Username"
                    placeholder="john_doe"
                    error={errors2.username}
                    required
                    disabled={loading}
                    {...registerForm2("username")}
                  />
                  <DynamicFormField
                    type="password"
                    label="Password"
                    placeholder="**********"
                    error={errors2.password}
                    required
                    disabled={loading}
                    {...registerForm2("password")}
                  />
                  <DynamicFormField
                    type="password"
                    label="Confirm Password"
                    placeholder="**********"
                    error={errors2.confirmPassword}
                    required
                    disabled={loading}
                    {...registerForm2("confirmPassword")}
                  />

                  <DynamicFormField
                    type="checkbox"
                    label={termsLabel}
                    error={errors2.terms}
                    control={control2}
                    required
                    disabled={loading}
                    {...registerForm2("terms")}
                  />
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={handleBackStep}
                      disabled={loading}
                      className="flex-1 px-4 py-3 text-sm font-medium text-gray-700 transition border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 flex items-center justify-center px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300 disabled:cursor-not-allowed"
                    >
                      {loading ? "Creating Account..." : "Sign Up"}
                    </button>
                  </div>
                </div>
              </form>
            )}

            <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400">
                Already have an account? {""}
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
      </div>
    </div>
  );
}
