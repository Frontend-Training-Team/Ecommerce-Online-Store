import { useRef } from 'react';

export default function ResetPasswordCard({
  otpArray,
  setOtpArray,
  password,
  setPassword,
  setErrorMsg,
  onResetPassword,
  isLoading,
  email,
  timer,
  onResend,
  isResending,
}) {
  const inputRefs = useRef([]);
  const handleChange = (value, index) => {
    if (isNaN(value)) return;

    const newOtp = [...otpArray];
    newOtp[index] = value.substring(value.length - 1);
    setOtpArray(newOtp);
    setErrorMsg?.('');

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      if (!otpArray[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      } else {
        const newOtp = [...otpArray];
        newOtp[index] = '';
        setOtpArray(newOtp);
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').trim();
    if (/^\d{6}$/.test(pasteData)) {
      const newOtp = pasteData.split('');
      setOtpArray(newOtp);
      inputRefs.current[5]?.focus();
    }
  };
  const isOtpComplete = otpArray.every((digit) => digit !== '' && digit !== null && digit !== undefined);
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-50 dark:bg-noir-900 p-4 transition-colors duration-300">

      <style>{`
        @keyframes spinnerRotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes floatAnimation {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        .lock-float {
          animation: floatAnimation 3s ease-in-out infinite;
        }
        .form-spinning-border {
          position: relative;
          overflow: hidden;
          border-radius: 1.50rem;
          -webkit-mask-image: -webkit-radial-gradient(white, black);
          transform: translateZ(0);
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
        .input-spinning-border {
          position: relative;
          overflow: hidden;
          border-radius: 0.75rem;
          transform: translateZ(0);
        }
        .input-spinning-border.completed::before {
          display: none;
        }

      `}</style>

      <div className="form-spinning-border p-0.5 mt-18 shadow-2xl dark:shadow-none max-w-lg w-full">
        <div className="relative bg-white dark:bg-noir-800 p-6 sm:p-8 rounded-[calc(1.5rem-2px)] w-full flex flex-col items-center text-center z-10 transition-colors duration-300">

          <div className="w-12 h-12 bg-[#D88D68]/15 dark:bg-copper-400/15 text-[#D88D68] dark:text-copper-400 rounded-2xl flex items-center justify-center mb-3 text-xl shadow-sm border border-[#D88D68]/20 dark:border-copper-500/20 lock-float">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-fg mb-1">Reset Password</h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-fg-tertiary mb-6">
            Enter the code sent to <span className="text-gray-800 dark:text-fg font-medium">{email}</span> to unlock and reset your password.
          </p>

          <form onSubmit={onResetPassword} className="w-full space-y-5 text-start">

            <div>
              <label className="text-s font-semibold text-gray-600 dark:text-fg-secondary block mb-2">
                Verification Code
              </label>

              <div className="flex justify-center gap-2 sm:gap-3 my-2" onPaste={handlePaste}>
                {otpArray.map((digit, index) => (
                  <div
                    key={index}
                    className={`input-spinning-border p-0.5 shadow-sm border ${isOtpComplete ? 'completed border-[#D88D68] dark:border-copper-400' : 'border-[#D88D68]/60 dark:border-copper-500/60'
                      }`}
                  >
                    <input
                      ref={(el) => (inputRefs.current[index] = el)}
                      type="text"
                      inputMode="numeric"
                      autoComplete='one-time-code'
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleChange(e.target.value, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      className="relative w-10 h-11 sm:w-11 sm:h-12 text-center text-xl font-bold bg-gray-50 dark:bg-noir-750 rounded-[calc(0.75rem-2px)] text-gray-800 dark:text-fg focus:outline-none z-10 block transition-colors duration-200 disabled:opacity-60"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-1.5 text-start pt-2">
              <label className="text-s font-semibold text-gray-600 dark:text-fg-secondary">
                New Password
              </label>
              <input
                type="password"
                placeholder="Enter new password"
                autoComplete='new-password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3.5 mt-3 text-sm rounded-xl border-2 border-gray-200 dark:border-line-control bg-white dark:bg-noir-750 text-gray-800 dark:text-fg dark:placeholder-fg-placeholder focus:outline-none focus:border-[#D88D68] dark:focus:border-copper-400 shadow-sm transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={!isOtpComplete || !password || isLoading}
              className="w-full py-3.5 px-6 bg-[#D88D68] hover:bg-[#B67352] dark:bg-copper-500 dark:hover:bg-copper-400 text-white dark:text-fg-on-accent font-semibold text-base rounded-xl transition-all duration-200 shadow-lg shadow-[#D88D68]/25 dark:shadow-none cursor-pointer disabled:opacity-50 mt-2"
            >
              {isLoading ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>

          <div className="text-center mt-6 pt-2 w-full text-sm text-gray-500 dark:text-fg-tertiary">
            {timer > 0 ? (
              <span>
                Didn't receive the code? Resend in <span className="font-semibold text-gray-700 dark:text-copper-400">{timer}s</span>
              </span>
            ) : (
              <button
                type="button"
                onClick={onResend}
                disabled={isResending}
                className="font-semibold text-[#D88D68] dark:text-copper-400 hover:underline dark:hover:text-copper-300 focus:outline-none disabled:opacity-50 cursor-pointer"
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
