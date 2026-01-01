// import GridShape from '@/components/common/GridShape';
import ThemeTogglerTwo from '@shared/components/common/ThemeTogglerTwo';
import React from 'react';
import { Link } from 'react-router';

interface AuthLayoutProps {
  children: React.ReactNode;
}


const AuthPageLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="relative p-6 bg-white z-1 dark:bg-gray-900 sm:p-0">
      <div className="relative flex flex-col justify-center w-full h-screen lg:flex-row dark:bg-gray-900 sm:p-0">
        {/* <div className="fixed z-50 hidden bottom-6 left-6 sm:block">
          <ThemeTogglerTwo />
        </div> */}
        <div
            className="items-center hidden w-full h-full lg:w-1/2 bg-brand-950 dark:bg-white/5 lg:grid p-0 sm:px-10 md:px-14"
            style={{ background: 'linear-gradient(135deg, #000000 0%, rgba(0, 0, 0, 0.95) 50%, rgba(205, 164, 60, 0.90) 100%)'}}
        >
        
            <div className="tracking-wider flex flex-col items-start">
              <Link to="/" className="block">
                <img
                  width={243}
                  height={38}
                  src="/images/logo/auth-logo.svg"
                  alt="Logo"
                />
              </Link>
              <h2 className="text-left text-title-sm text-gray-25 dark:text-white/60 mb-2">
                Welcome back to your alternate future.
              </h2>
              <p className="text-left text-lg  text-gray-400 dark:text-white/60">
                Seamless access. Smarter growth. One login away.
              </p>
            </div>
        </div>
        
        {children}
      
      </div>
    </div>
  );
};

export default AuthPageLayout;
