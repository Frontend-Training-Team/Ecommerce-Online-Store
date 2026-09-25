import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { postRegisterVerifyOtp, postRegisterSendOtp } from '../api/auth.api';
import OtpInput from '../components/ui/auth/OtpInput';
import { motion } from 'framer-motion';

export default function VerifyOtpDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || 'your email';

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const [isResending, setIsResending] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

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
      const response = await postRegisterVerifyOtp({ email, otp: code });
      toast.success(response.data?.message || 'OTP verified successfully!');
      setTimeout(() => navigate('/Login'), 1500);
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
      await postRegisterSendOtp({ email });
      toast.success('A new verification code has been sent.');
      setTimer(60);
      setOtp(['', '', '', '', '', '']);
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
    </motion.div>
  );
}