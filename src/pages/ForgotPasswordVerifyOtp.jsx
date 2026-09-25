import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { postForgotPasswordVerifyOtp, postForgotPasswordSendOtp } from '../api/auth.api';
import ResetPasswordCard from '../components/ui/auth/ResetPasswordCard';
import { motion } from 'framer-motion';

export default function ForgotPasswordVerifyOtp() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || '';

  const [otpArray, setOtpArray] = useState(['', '', '', '', '', '']);
  const [password, setPassword] = useState('');
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

  // Handle final submission (Sends OTP and Password together)
  const handleResetPassword = async (e) => {
    e.preventDefault();
    const otpCode = otpArray.join('');

    if (otpCode.length < 6) {
      toast.error('Please enter a valid 6-digit verification code.');
      return;
    }

    if (!password) {
      toast.error('Please enter your new password.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await postForgotPasswordVerifyOtp({
        email,
        otp: otpCode,
        newPassword: password,
      });

      toast.success(response.data?.message || 'Password reset successfully!');
      setTimeout(() => {
        navigate('/Login');
      }, 1500);
    } catch (error) {
      const errorMsgText = error.response?.data?.message || 'Invalid OTP Or Failed to reset password. Please try again.';
      toast.error(errorMsgText);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Resend Code
  const handleResend = async () => {
    setIsResending(true);
    try {
      await postForgotPasswordSendOtp({ email });
      toast.success('A new verification code has been sent.');
      setTimer(60);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to resend code.');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <ResetPasswordCard
        otpArray={otpArray}
        setOtpArray={setOtpArray}
        password={password}
        setPassword={setPassword}
        setErrorMsg={() => {}}
        onResetPassword={handleResetPassword}
        isLoading={isLoading}
        email={email}
        timer={timer}
        onResend={handleResend}
        isResending={isResending}
      />
    </motion.div>
  );
}