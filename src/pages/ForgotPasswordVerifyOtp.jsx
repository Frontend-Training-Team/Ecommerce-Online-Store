import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { postForgotPasswordVerifyOtp, postForgotPasswordSendOtp } from '../api/auth.api';
import ResetPasswordCard from '../components/Ui/auth/ResetPasswordCard';

export default function ForgotPasswordVerifyOtp() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || 'your email';

  const [otpArray, setOtpArray] = useState(['', '', '', '', '', '']);
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const [isResending, setIsResending] = useState(false);
  // Guard clause: Redirect back if no email was passed in route state
  useEffect(() => {
    if (!email) {
      toast.error('Session expired or invalid email. Please start over.');
      navigate('/forgot-password');
    }
  }, [email, navigate]);

  // Countdown timer effect
  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleVerifyOtp = async () => {
    const code = otpArray.join('');
    if (code.length < 6) {
      toast.error('Please enter the complete 6-digit code.');
      return;
    }

    setIsVerifying(true);
    setErrorMsg('');
    try {
      const response = await postForgotPasswordVerifyOtp({ email, otp: code });
      toast.success(response.data?.message || 'OTP verified successfully! Please enter your new password.');
      setIsOtpVerified(true);
    } catch (error) {
      const errorMsgText = error.response?.data?.message || 'Invalid OTP. Please try again.';
      setErrorMsg(errorMsgText);
      toast.error(errorMsgText);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!password) {
      toast.error('Please enter a new password.');
      return;
    }

    setIsLoading(true);
    try {
      toast.success('Password reset successfully!');
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (error) {
      const errorMsgText = error.response?.data?.message || 'Failed to reset password. Please try again.';
      toast.error(errorMsgText);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    try {
      await postForgotPasswordSendOtp({ email });
      toast.success('A new verification code has been sent.');
      setTimer(60);
      setOtpArray(['', '', '', '', '', '']);
      setIsOtpVerified(false);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to resend code.');
    } finally {
      setIsResending(false);
    }
  };
  return (
    <>
      <Toaster position="top-center" />
      <ResetPasswordCard
      otpArray={otpArray}
      setOtpArray={setOtpArray}
      password={password}
      setPassword={setPassword}
      setErrorMsg={setErrorMsg}
      isOtpVerified={isOtpVerified}
      onVerifyOtp={handleVerifyOtp}
      onResetPassword={handleResetPassword}
      isLoading={isLoading}
      isVerifying={isVerifying}
      email={email}
      timer={timer}
      onResend={handleResend}
      isResending={isResending}
    />
    </>
  );
}