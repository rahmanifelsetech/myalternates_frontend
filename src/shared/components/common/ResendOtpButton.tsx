import React, { useState, useEffect } from 'react';
import Button from '../ui/button/Button';

interface ResendOtpButtonProps {
  onResend: () => void;
  timerDuration?: number; // in seconds
}

export const ResendOtpButton: React.FC<ResendOtpButtonProps> = ({ onResend, timerDuration = 30 }) => {
  const [timer, setTimer] = useState(timerDuration);
  const [isTimerActive, setIsTimerActive] = useState(true);

  useEffect(() => {
    let interval: ReturnType<typeof setTimeout>;
    if (isTimerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timer]);

  const handleResend = () => {
    setTimer(timerDuration);
    setIsTimerActive(true);
    onResend();
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div className="text-center">
      {isTimerActive ? (
        <p className="text-sm text-gray-500 mt-3">
          Resend OTP in {formatTime(timer)}
        </p>
      ) : (
        <Button variant="link" onClick={handleResend}>
          Resend OTP
        </Button>
      )}
    </div>
  );
};