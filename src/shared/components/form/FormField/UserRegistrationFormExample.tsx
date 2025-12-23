import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { DynamicFormField } from "@/components/form/FormField";

/**
 * Example: Complete User Registration Form with DynamicFormField
 * Demonstrates all major field types and patterns
 */

// Define Zod schema for validation
const userRegistrationSchema = z
  .object({
    // Text fields
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    
    // Email field
    email: z.string().email("Please enter a valid email address"),
    
    // Phone field
    phone: z.string().regex(/^\+?[0-9\s\-()]{10,}$/, "Please enter a valid phone number"),
    
    // Password field
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    
    // Date field
    birthDate: z.string().refine((val) => {
      const date = new Date(val);
      const age = new Date().getFullYear() - date.getFullYear();
      return age >= 18;
    }, "You must be at least 18 years old"),
    
    // Select field
    country: z
      .enum(["usa", "canada", "uk", "other"])
      .refine((val) => val, "Please select a country"),
    
    // Number field
    age: z.number().min(18, "Must be 18 or older").max(120, "Invalid age"),
    
    // Textarea field
    bio: z.string().max(500, "Bio must not exceed 500 characters"),
    
    // Checkbox field
    agreeToTerms: z.boolean().refine((val) => val === true, {
      message: "You must agree to the terms and conditions",
    }),
    
    // Multi-select field
    interests: z.array(z.string()).min(1, "Select at least one interest"),
  })
  .strict();

type UserRegistrationData = z.infer<typeof userRegistrationSchema>;

export default function UserRegistrationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
  } = useForm<UserRegistrationData>({
    resolver: zodResolver(userRegistrationSchema),
    mode: "onBlur",
  });

  const selectedCountry = watch("country");

  const onSubmit = async (data: UserRegistrationData) => {
    console.log("✅ Form submitted successfully!", data);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // Submit to your API
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl mx-auto p-6 space-y-8">
      {/* Form Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Create Your Account
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Fill out the form below to get started
        </p>
      </div>

      {/* Personal Information Section */}
      <fieldset className="space-y-6">
        <legend className="text-lg font-semibold text-gray-900 dark:text-white border-b border-gray-300 dark:border-gray-700 pb-3">
          Personal Information
        </legend>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DynamicFormField
            type="text"
            label="First Name"
            placeholder="John"
            required
            error={errors.firstName}
            {...register("firstName")}
          />

          <DynamicFormField
            type="text"
            label="Last Name"
            placeholder="Doe"
            required
            error={errors.lastName}
            {...register("lastName")}
          />
        </div>

        <DynamicFormField
          type="date"
          label="Date of Birth"
          required
          error={errors.birthDate}
          {...register("birthDate")}
        />

        <DynamicFormField
          type="textarea"
          label="Bio"
          placeholder="Tell us about yourself..."
          rows={4}
          error={errors.bio}
          helperText="Maximum 500 characters"
          {...register("bio")}
        />
      </fieldset>

      {/* Contact Information Section */}
      <fieldset className="space-y-6">
        <legend className="text-lg font-semibold text-gray-900 dark:text-white border-b border-gray-300 dark:border-gray-700 pb-3">
          Contact Information
        </legend>

        <DynamicFormField
          type="email"
          label="Email Address"
          placeholder="john@example.com"
          required
          error={errors.email}
          helperText="We'll send you a verification email"
          {...register("email")}
        />

        <DynamicFormField
          type="phone"
          label="Phone Number"
          placeholder="+1 (555) 000-0000"
          required
          countryCode="+1"
          error={errors.phone}
          {...register("phone")}
        />

        <DynamicFormField
          type="select"
          label="Country"
          placeholder="Select your country"
          required
          options={[
            { label: "United States", value: "usa" },
            { label: "Canada", value: "canada" },
            { label: "United Kingdom", value: "uk" },
            { label: "Other", value: "other" },
          ]}
          error={errors.country}
          {...register("country")}
        />

        {/* Conditional field - shows only when USA or Canada is selected */}
        {(selectedCountry === "usa" || selectedCountry === "canada") && (
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              ℹ️ We have special offers for {selectedCountry === "usa" ? "US" : "Canadian"} residents!
            </p>
          </div>
        )}
      </fieldset>

      {/* Account Settings Section */}
      <fieldset className="space-y-6">
        <legend className="text-lg font-semibold text-gray-900 dark:text-white border-b border-gray-300 dark:border-gray-700 pb-3">
          Account Settings
        </legend>

        <DynamicFormField
          type="password"
          label="Password"
          placeholder="Enter a strong password"
          required
          error={errors.password}
          helperText="At least 8 characters, 1 uppercase letter, 1 number"
          {...register("password")}
        />

        <DynamicFormField
          type="number"
          label="Age"
          placeholder="18"
          required
          min="18"
          max="120"
          error={errors.age}
          {...register("age", { valueAsNumber: true })}
        />

        <DynamicFormField
          type="multi-select"
          label="Interests"
          placeholder="Select your interests"
          options={[
            { value: "tech", label: "Technology" },
            { value: "sports", label: "Sports" },
            { value: "music", label: "Music" },
            { value: "art", label: "Art" },
            { value: "travel", label: "Travel" },
            { value: "cooking", label: "Cooking" },
            { value: "reading", label: "Reading" },
            { value: "gaming", label: "Gaming" },
          ]}
          error={errors.interests}
          onChange={(selected: any) => setValue("interests", selected)}
          value={watch("interests")}
        />
      </fieldset>

      {/* Terms Section */}
      <fieldset className="space-y-4">
        <legend className="text-lg font-semibold text-gray-900 dark:text-white border-b border-gray-300 dark:border-gray-700 pb-3">
          Legal
        </legend>

        <DynamicFormField
          type="checkbox"
          label="I agree to the Terms of Service and Privacy Policy"
          required
          error={errors.agreeToTerms}
          {...register("agreeToTerms")}
        />
      </fieldset>

      {/* Form Actions */}
      <div className="flex gap-4 pt-6 border-t border-gray-300 dark:border-gray-700">
        <button
          type="reset"
          className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium"
        >
          Clear Form
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white rounded-lg transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Creating Account..." : "Create Account"}
        </button>
      </div>

      {/* Info Box */}
      <div className="p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          💡 <strong>Tip:</strong> All fields are required. Make sure your password is strong and
          you agree to our terms before submitting.
        </p>
      </div>
    </form>
  );
}
