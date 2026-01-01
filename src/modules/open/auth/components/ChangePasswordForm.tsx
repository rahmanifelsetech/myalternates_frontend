import { useNavigate } from "react-router";
import { DynamicFormField } from "@shared/components/form/FormField";
import { useAuth } from "@/modules/open/auth/hooks/useAuth";
import { useForm } from "@shared/hooks/useForm";
import { ChangePasswordSchema } from "@/modules/open/auth/schema/auth.schemas";
import { useToast } from "@/shared/hooks/useToast";
import appConfig from "@/shared/config/app.config";

export default function ChangePasswordForm() {
  const navigate = useNavigate();
  const { success: toastSuccess } = useToast();
  const { changePassword, loading, error, signOut } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm(ChangePasswordSchema);
  
  const onSubmit = async (data: any) => {
    const result = await changePassword({
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
      confirmNewPassword: data.confirmNewPassword,
    });

    if (result.success) {
      toastSuccess("Password changed successfully!");
      setTimeout(() => {
        navigate(appConfig.authenticatedEntryPath);
      }, 500);
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/auth/signin");
  };
  
  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col flex-1 items-center justify-center w-full ">
        <div className="shadow-sm p-10 rounded-lg bg-white dark:bg-gray-800 w-96">
          <div className="text-center mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Change Password
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Please change your password to continue.
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
                  type="password"
                  label="Current Password"
                  placeholder="**********"
                  required
                  error={errors.oldPassword}
                  {...register("oldPassword")}
                />

                <DynamicFormField
                  type="password"
                  label="New Password"
                  placeholder="**********"
                  required
                  error={errors.newPassword}
                  {...register("newPassword")}
                />

                <DynamicFormField
                  type="password"
                  label="Confirm New Password"
                  placeholder="**********"
                  required
                  error={errors.confirmNewPassword}
                  {...register("confirmNewPassword")}
                />
                
                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full px-4 py-3 text-sm font-medium text-white transition bg-brand-500 rounded-lg hover:bg-brand-600 disabled:bg-brand-300 disabled:cursor-not-allowed"
                  >
                    {loading ? "Changing Password..." : "Change Password"}
                  </button>
                  
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full mt-4 px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition"
                  >
                    Log Out
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}