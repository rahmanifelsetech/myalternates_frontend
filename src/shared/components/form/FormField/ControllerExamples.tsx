import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import DynamicFormField from "./DynamicFormField";

/**
 * Example 1: Investment Calculator with Computed Field
 * Shows how to use Controller + watch() to create dependent fields
 */

const InvestmentSchema = z.object({
  investmentAmount: z.number().positive("Must be positive"),
  returnRate: z.number().positive("Must be positive"),
  projectedReturn: z.number(), // Computed field (read-only)
});

type InvestmentFormData = z.infer<typeof InvestmentSchema>;

export function InvestmentCalculatorExample() {
  const { control, handleSubmit, watch, formState: { errors } } = useForm<InvestmentFormData>({
    resolver: zodResolver(InvestmentSchema),
    defaultValues: {
      investmentAmount: 1000,
      returnRate: 5,
      projectedReturn: 0,
    },
  });

  // Watch the investment amount to compute projected return
  const investmentAmount = watch("investmentAmount");
  const returnRate = watch("returnRate");
  const computedReturn = investmentAmount * (returnRate / 100);

  const onSubmit = (data: InvestmentFormData) => {
    console.log("Form submitted:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto space-y-4">
      <h2 className="text-xl font-bold">Investment Calculator</h2>

      {/* Controlled: Investment Amount */}
      <Controller
        name="investmentAmount"
        control={control}
        render={({ field }) => (
          <DynamicFormField
            type="currency"
            label="Investment Amount"
            error={errors.investmentAmount}
            {...field}
          />
        )}
      />

      {/* Controlled: Return Rate */}
      <Controller
        name="returnRate"
        control={control}
        render={({ field }) => (
          <DynamicFormField
            type="number"
            label="Return Rate (%)"
            error={errors.returnRate}
            {...field}
          />
        )}
      />

      {/* Controlled: Computed Field (Read-only) */}
      <Controller
        name="projectedReturn"
        control={control}
        render={({ field }) => (
          <DynamicFormField
            type="currency"
            label="Projected Return"
            disabled
            {...field}
            value={computedReturn}  // Auto-computed from watched fields
          />
        )}
      />

      <button
        type="submit"
        className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Calculate
      </button>
    </form>
  );
}

/**
 * Example 2: Dependent Dropdown Fields
 * Shows how to conditionally render fields based on watched values
 */

const AddressSchema = z.object({
  country: z.string().min(1, "Country is required"),
  state: z.string().optional(),
  city: z.string().optional(),
});

type AddressFormData = z.infer<typeof AddressSchema>;

const countryOptions = [
  { label: "Select a country", value: "" },
  { label: "United States", value: "US" },
  { label: "Canada", value: "CA" },
  { label: "Mexico", value: "MX" },
];

const stateOptions = [
  { label: "California", value: "CA" },
  { label: "Texas", value: "TX" },
  { label: "Florida", value: "FL" },
];

export function AddressFormExample() {
  const { control, handleSubmit, watch, formState: { errors } } = useForm<AddressFormData>({
    resolver: zodResolver(AddressSchema),
    defaultValues: {
      country: "",
      state: "",
      city: "",
    },
  });

  // Watch country to conditionally show state field
  const selectedCountry = watch("country");

  const onSubmit = (data: AddressFormData) => {
    console.log("Address submitted:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto space-y-4">
      <h2 className="text-xl font-bold">Address Form</h2>

      {/* Controlled: Country Select */}
      <Controller
        name="country"
        control={control}
        render={({ field }) => (
          <DynamicFormField
            type="select"
            label="Country"
            options={countryOptions}
            error={errors.country}
            {...field}
          />
        )}
      />

      {/* Conditional: Only show state field for US */}
      {selectedCountry === "US" && (
        <Controller
          name="state"
          control={control}
          render={({ field }) => (
            <DynamicFormField
              type="select"
              label="State"
              options={stateOptions}
              error={errors.state}
              {...field}
            />
          )}
        />
      )}

      {/* Conditional: City field for US and Canada */}
      {(selectedCountry === "US" || selectedCountry === "CA") && (
        <Controller
          name="city"
          control={control}
          render={({ field }) => (
            <DynamicFormField
              type="text"
              label="City"
              placeholder="Enter city"
              error={errors.city}
              {...field}
            />
          )}
        />
      )}

      <button
        type="submit"
        className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
}

/**
 * Example 3: Mixed Pattern - Some fields with register(), some with Controller
 * Shows hybrid approach for complex forms
 */

const MixedSchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  agreedToTerms: z.boolean(),
  referralCode: z.string().optional(),
});

type MixedFormData = z.infer<typeof MixedSchema>;

export function MixedPatternExample() {
  const { register, control, handleSubmit, watch, formState: { errors } } = useForm<MixedFormData>({
    resolver: zodResolver(MixedSchema),
  });

  // Only watch specific fields that need it
  const agreedToTerms = watch("agreedToTerms");

  const onSubmit = (data: MixedFormData) => {
    console.log("Form submitted:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto space-y-4">
      <h2 className="text-xl font-bold">Registration Form</h2>

      {/* Uncontrolled: Simple text field with register() */}
      <DynamicFormField
        type="text"
        label="Username"
        placeholder="Enter username"
        error={errors.username}
        {...register("username")}
      />

      {/* Uncontrolled: Email field with register() */}
      <DynamicFormField
        type="email"
        label="Email"
        placeholder="Enter email"
        error={errors.email}
        {...register("email")}
      />

      {/* Controlled: Terms checkbox that affects visibility of another field */}
      <Controller
        name="agreedToTerms"
        control={control}
        render={({ field }) => (
          <DynamicFormField
            type="checkbox"
            label="I agree to the terms"
            error={errors.agreedToTerms}
            {...field}
          />
        )}
      />

      {/* Conditional: Show referral code only if terms agreed */}
      {agreedToTerms && (
        <DynamicFormField
          type="text"
          label="Referral Code (Optional)"
          placeholder="Enter referral code"
          error={errors.referralCode}
          {...register("referralCode")}
        />
      )}

      <button
        type="submit"
        className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Register
      </button>
    </form>
  );
}

/**
 * Example 4: Complex Form with Multiple Watchers
 * Shows advanced usage with multiple dependent calculations
 */

const PropertySchema = z.object({
  purchasePrice: z.number().positive(),
  downPaymentPercent: z.number().positive(),
  downPaymentAmount: z.number(), // Computed
  loanAmount: z.number(), // Computed
  interestRate: z.number().positive(),
  monthlyPayment: z.number(), // Computed
});

type PropertyFormData = z.infer<typeof PropertySchema>;

export function PropertyCalculatorExample() {
  const { control, handleSubmit, watch, formState: { errors } } = useForm<PropertyFormData>({
    resolver: zodResolver(PropertySchema),
    defaultValues: {
      purchasePrice: 300000,
      downPaymentPercent: 20,
      downPaymentAmount: 0,
      loanAmount: 0,
      interestRate: 6.5,
      monthlyPayment: 0,
    },
  });

  // Watch multiple fields
  const purchasePrice = watch("purchasePrice");
  const downPaymentPercent = watch("downPaymentPercent");
  const interestRate = watch("interestRate");

  // Calculate dependent values
  const downPaymentAmount = purchasePrice * (downPaymentPercent / 100);
  const loanAmount = purchasePrice - downPaymentAmount;
  
  // Simplified monthly payment calculation
  const monthlyRate = interestRate / 100 / 12;
  const numPayments = 360; // 30 years
  const monthlyPayment =
    monthlyRate === 0
      ? loanAmount / numPayments
      : (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) /
        (Math.pow(1 + monthlyRate, numPayments) - 1);

  const onSubmit = (data: PropertyFormData) => {
    console.log("Property form submitted:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto space-y-4">
      <h2 className="text-xl font-bold">Property Calculator</h2>

      {/* Input Fields */}
      <Controller
        name="purchasePrice"
        control={control}
        render={({ field }) => (
          <DynamicFormField
            type="currency"
            label="Purchase Price"
            error={errors.purchasePrice}
            {...field}
          />
        )}
      />

      <Controller
        name="downPaymentPercent"
        control={control}
        render={({ field }) => (
          <DynamicFormField
            type="number"
            label="Down Payment (%)"
            error={errors.downPaymentPercent}
            {...field}
          />
        )}
      />

      <Controller
        name="interestRate"
        control={control}
        render={({ field }) => (
          <DynamicFormField
            type="number"
            label="Interest Rate (%)"
            step="0.1"
            error={errors.interestRate}
            {...field}
          />
        )}
      />

      {/* Calculated/Read-only Fields */}
      <Controller
        name="downPaymentAmount"
        control={control}
        render={({ field }) => (
          <DynamicFormField
            type="currency"
            label="Down Payment Amount"
            disabled
            {...field}
            value={downPaymentAmount}
          />
        )}
      />

      <Controller
        name="loanAmount"
        control={control}
        render={({ field }) => (
          <DynamicFormField
            type="currency"
            label="Loan Amount"
            disabled
            {...field}
            value={loanAmount}
          />
        )}
      />

      <Controller
        name="monthlyPayment"
        control={control}
        render={({ field }) => (
          <DynamicFormField
            type="currency"
            label="Monthly Payment"
            disabled
            {...field}
            value={monthlyPayment}
          />
        )}
      />

      <button
        type="submit"
        className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Calculate
      </button>
    </form>
  );
}

export default {
  InvestmentCalculatorExample,
  AddressFormExample,
  MixedPatternExample,
  PropertyCalculatorExample,
};
