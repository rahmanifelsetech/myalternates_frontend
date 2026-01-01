import React from 'react';
import AuthPageLayout from "../layout/AuthPageLayout";
import SignUpForm from '../components/SignUpForm';

const SignUp: React.FC = () => {
  return (
    <>
      <AuthPageLayout>
        <SignUpForm />
      </AuthPageLayout>
    </>
  );
};

export default SignUp;
