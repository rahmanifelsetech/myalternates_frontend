import React from 'react';
import { ForgotPasswordForm } from '../components/ForgotPasswordForm';
import AuthPageLayout from '../layout/AuthPageLayout';

const ForgotPasswordPage: React.FC = () => {
  return (
    <AuthPageLayout>
        <ForgotPasswordForm />
    </AuthPageLayout>
  )
};

export default ForgotPasswordPage;