import React, { useState, useRef, ChangeEvent } from 'react';

interface OtpInputProps {
  length: number;
  onChange: (otp: string) => void;
  onComplete?: (otp: string) => void;
}

export const OtpInput: React.FC<OtpInputProps> = ({ length, onChange, onComplete }) => {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    const otpString = newOtp.join('');
    onChange(otpString);

    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    if (otpString.length === length && onComplete) {
      onComplete(otpString);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text/plain').trim();
    const otpDigits = pasteData.split('').filter(char => !isNaN(Number(char))).slice(0, length);

    const newOtp = [...otp];
    let completeOtp = '';

    otpDigits.forEach((digit, i) => {
      if (inputRefs.current[i]) {
        newOtp[i] = digit;
        inputRefs.current[i]!.value = digit; // Directly set value to update visual
        completeOtp += digit;
      }
    });

    setOtp(newOtp);
    onChange(completeOtp);

    if (completeOtp.length === length && onComplete) {
      onComplete(completeOtp);
      inputRefs.current[length - 1]?.focus(); // Focus on the last input if complete
    } else if (otpDigits.length > 0 && otpDigits.length < length) {
      inputRefs.current[otpDigits.length]?.focus(); // Focus on the next empty input
    }
  };

  return (
    <div className="flex justify-center space-x-2">
      {otp.map((digit, index) => (
        <input
          key={index}
          ref={(el: HTMLInputElement | null) => {
            if (el) {
              inputRefs.current[index] = el;
            }
          }}
          type="text"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          className="w-12 h-12 text-center text-xl font-semibold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500"
        />
      ))}
    </div>
  );
};