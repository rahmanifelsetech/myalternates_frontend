import React from 'react';
import PageMeta from "@shared/components/common/PageMeta";
import AuthPageLayout from "../layout/AuthPageLayout";
import SignUpForm from '../components/SignUpForm';

const SignUp: React.FC = () => {
  return (
    <>
      <PageMeta
        title="React.js SignUp | TailAdmin"
        description="Sign up for TailAdmin dashboard"
      />
      <AuthPageLayout>
        <SignUpForm />
      </AuthPageLayout>
    </>
  );
};

export default SignUp;
