import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { postForgotPasswordVerifyOtp, postForgotPasswordSendOtp } from '../api/auth.api';
import OtpInput from '../components/Ui/auth/OtpInput';

export default function ForgotPasswordVerifyOtp() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || 'your email';

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const [isResending, setIsResending] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const code = otp.join('');

    if (code.length < 6) {
      toast.error('Please enter the complete 6-digit code.');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');
    try {

      const response = await postForgotPasswordVerifyOtp({ email, otp: code });
      toast.success(response.data?.message || 'OTP verified successfully!');
      setTimeout(() => {
        navigate('/');
      }, 1500);

    } catch (error) {
      const errorMsgText = error.response?.data?.message || 'Invalid OTP. Please try again.';
      setErrorMsg(errorMsgText);
      toast.error(errorMsgText);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    try {
      await postForgotPasswordSendOtp({ email });
      toast.success('A new recovery code has been sent.');
      setTimer(60);
      setOtp(['', '', '', '', '', '']);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to resend code.');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <>
      <Toaster position="top-center" />
      <OtpInput
        otp={otp}
        setOtp={setOtp}
        errorMsg={errorMsg}
        setErrorMsg={setErrorMsg}
        onSubmit={handleSubmit}
        isLoading={isLoading}
        email={email}
        timer={timer}
        onResend={handleResend}
        isResending={isResending}
      />
    </>
  );
}