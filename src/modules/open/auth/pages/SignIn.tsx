import PageMeta from "@shared/components/common/PageMeta";
import AuthPageLayout from "../layout/AuthPageLayout";
import SignInForm from "@/modules/open/auth/components/SignInForm";

export default function SignIn() {
  return (
    <>
      <PageMeta
        title="React.js SignIn Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js SignIn Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <AuthPageLayout>
        <SignInForm />
      </AuthPageLayout>
    </>
  );
}
