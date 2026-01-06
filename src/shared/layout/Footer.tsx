import React from 'react';
import { Link } from 'react-router';

const Footer: React.FC = () => {
  return (
    <footer className="pt-4 px-6 mt-10">
      {/* <div className="container mx-auto text-center text-sm text-gray-500 dark:text-gray-400">
        <p>&copy; {new Date().getFullYear()} MyAlternates App. All Rights Reserved.</p>
        <div className="flex justify-center space-x-4 mt-2">
          <Link to="/privacy-policy" className="hover:text-brand-500">Privacy Policy</Link>
          <Link to="/terms-of-service" className="hover:text-brand-500">Terms of Service</Link>
          <Link to="/contact" className="hover:text-brand-500">Contact Us</Link>
        </div>
      </div> */}
      <div className="flex items-center justify-between flex-auto w-full text-sm text-gray-500 dark:text-gray-400">
            <span>
                &copy; {`${new Date().getFullYear()}`}{' '}
                <span className="font-semibold"> MyAlternates App </span> All
                rights reserved.
            </span>
            <div className="flex items-center space-x-4">
                <Link to="/privacy-policy" className="hover:text-brand-500">Privacy Policy</Link>
                <Link to="/terms-of-service" className="hover:text-brand-500">Terms of Service</Link>
                <Link to="/contact" className="hover:text-brand-500">Contact Us</Link>
            </div>
        </div>
    </footer>
  );
};

export default Footer;