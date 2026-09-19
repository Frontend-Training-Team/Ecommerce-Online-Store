import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function VerifyOtp() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || 'your email';

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const [isResending, setIsResending] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  // حالة لإظهار التنبيه المخصص الجميل
  const [notification, setNotification] = useState(null); // { message, type }

  const inputRefs = useRef([]);

  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (value, index) => {
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);
    setErrorMsg('');

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        inputRefs.current[index - 1].focus();
      } else {
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').trim();
    if (/^\d{6}$/.test(pasteData)) {
      const newOtp = pasteData.split('');
      setOtp(newOtp);
      inputRefs.current[5].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const code = otp.join('');
    
    if (code.length < 6) {
      setErrorMsg('Please enter the complete 6-digit code.');
      return;
    }

    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      if (code === '234678') {
        setNotification({
          message: `Verification successful for code: ${code}! Welcome home.`,
          type: 'success'
        });
      } else {
        setErrorMsg('Invalid OTP. Please try again.');
      }
    } catch (error) {
      setErrorMsg('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setNotification({
        message: 'A new verification code has been sent to your email.',
        type: 'info'
      });
      setTimer(60);
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0].focus();
    } catch (error) {
      setErrorMsg('Failed to resend code.');
    } finally {
      setIsResending(false);
    }
  };

  const isComplete = otp.every((digit) => digit !== '' && digit !== null && digit !== undefined);

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4 transition-colors duration-300 relative">
      <style>{`
        @keyframes spinnerRotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes floatAnimation {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        @keyframes circleSpinning {
          0% { transform: rotate(0deg) scale(0.6); opacity: 0; }
          100% { transform: rotate(360deg) scale(1); opacity: 1; }
        }
        @keyframes fadeInPopup {
          0% { opacity: 0; transform: scale(0.9); }
          100% { opacity: 1; transform: scale(1); }
        }
        .lock-float {
          animation: floatAnimation 3s ease-in-out infinite;
        }
        .form-spinning-border {
          position: relative;
          overflow: hidden;
          border-radius: 1.50rem;
        }
        .form-spinning-border::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: conic-gradient(transparent, transparent, transparent, #D88D68);
          animation: spinnerRotate 5s linear infinite;
          z-index: 0;
        }
        .circle-container {
          animation: circleSpinning 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        .popup-overlay {
          animation: fadeInPopup 0.3s ease-out forwards;
        }
      `}</style>

      {/* نافذة التنبيه المخصصة (Custom Toast Notification Popup) */}
      {notification && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="popup-overlay bg-gray-900 border border-[#D88D68] p-6 rounded-2xl shadow-[0_0_30px_rgba(216,141,104,0.3)] max-w-sm w-full text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-[#D88D68]/20 border border-[#D88D68] flex items-center justify-center text-[#D88D68] mb-3 text-2xl shadow-inner">
              ✓
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Success</h3>
            <p className="text-gray-300 text-sm mb-6 leading-relaxed">{notification.message}</p>
            <button
              onClick={() => {
                setNotification(null);
                if (notification.type === 'success') {
                  navigate('/');
                }
              }}
              className="w-full py-3 bg-[#D88D68] hover:bg-[#B67352] text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-[#D88D68]/30 cursor-pointer"
            >
              OK
            </button>
          </div>
        </div>
      )}

      <div className="form-spinning-border p-[2px] shadow-2xl max-w-md w-full">
        <div className="relative bg-white dark:bg-gray-800/90 backdrop-blur-md p-6 sm:p-8 rounded-[calc(1.5rem-2px)] w-full flex flex-col items-center text-center z-10 transition-colors duration-300">
          
          <div className="w-12 h-12 bg-[#D88D68]/15 text-[#D88D68] rounded-2xl flex items-center justify-center mb-3 text-xl shadow-sm border border-[#D88D68]/20 lock-float">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-1">Verify Your Code</h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">
            Enter the 6-digit code sent to <span className="text-gray-800 dark:text-gray-200 font-medium">{email}</span>
          </p>

          <form onSubmit={handleSubmit} className="w-full space-y-4 text-start">
            
            <div className={`relative w-full flex items-center justify-center transition-all duration-500 ${isComplete ? 'h-52 my-4' : 'gap-2 sm:gap-3 my-4'}`} onPaste={handlePaste}>
              {isComplete ? (
                <div className="relative w-48 h-48 flex items-center justify-center circle-container">
                  <div className="absolute inset-0 rounded-full border border-dashed border-[#D88D68]/50 animate-spin" style={{ animationDuration: '15s' }}></div>
                  
                  <div className="w-10 h-10 rounded-full border border-[#D88D68] bg-[#D88D68]/10 flex items-center justify-center text-[#D88D68] shadow-inner z-20">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>

                  {otp.map((digit, index) => {
                    const angle = index * (360 / 6);
                    const radius = 72;
                    const x = radius * Math.cos((angle * Math.PI) / 180);
                    const y = radius * Math.sin((angle * Math.PI) / 180);

                    return (
                      <div
                        key={index}
                        className="absolute w-11 h-12 border-2 border-[#D88D68] rounded-xl bg-white dark:bg-gray-900 shadow-xl flex items-center justify-center text-lg font-bold text-gray-800 dark:text-gray-100"
                        style={{
                          transform: `translate(${x}px, ${y}px)`,
                          zIndex: 30,
                        }}
                      >
                        {digit}
                      </div>
                    );
                  })}
                </div>
              ) : (
                otp.map((digit, index) => (
                  <div key={index} className="relative overflow-hidden rounded-xl border border-[#D88D68] p-[1px] shadow-sm">
                    <input
                      ref={(el) => (inputRefs.current[index] = el)}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleChange(e.target.value, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      className="relative w-10 h-11 sm:w-11 sm:h-12 text-center text-xl font-bold bg-gray-50 dark:bg-gray-900 rounded-[calc(0.75rem-1px)] text-gray-800 dark:text-gray-100 focus:outline-none z-10 block"
                    />
                  </div>
                ))
              )}
            </div>

            {errorMsg && (
              <p className="text-red-500 text-xs text-center font-medium mt-1">{errorMsg}</p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 px-6 bg-[#D88D68] hover:bg-[#B67352] text-white font-bold text-base sm:text-lg tracking-wide rounded-xl transition-all duration-300 shadow-xl shadow-[#D88D68]/30 cursor-pointer disabled:opacity-50 mt-2"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Verifying...</span>
                </div>
              ) : (
                'VERIFY & CONTINUE'
              )}
            </button>
          </form>

          <div className="text-center mt-4 pt-3 border-t border-gray-100 dark:border-gray-700/50 w-full">
            {timer > 0 ? (
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                Didn't receive code? Resend Code in <span className="font-semibold text-[#D88D68]">{timer}s</span>
              </p>
            ) : (
              <button
                type="button"
                onClick={handleResend}
                disabled={isResending}
                className="text-xs sm:text-sm font-medium text-[#D88D68] hover:underline focus:outline-none disabled:opacity-50 cursor-pointer"
              >
                {isResending ? 'Resending...' : 'Resend Code'}
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}