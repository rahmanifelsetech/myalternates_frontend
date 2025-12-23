import { useForm as useReactHookForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

/**
 * Custom useForm Hook
 * Wraps react-hook-form with Zod validation
 * Provides an easy API for form management with automatic error handling
 *
 * Usage:
 * const { register, handleSubmit, formState: { errors }, watch } = useForm(SignInSchema);
 *
 * const onSubmit = async (data: SignInFormData) => {
 *   const result = await signIn(data);
 * };
 */
export function useForm(schema: any,   defaultValues?: any) {
  return useReactHookForm({
    resolver: zodResolver(schema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: defaultValues || ({} as any),
  });
}
