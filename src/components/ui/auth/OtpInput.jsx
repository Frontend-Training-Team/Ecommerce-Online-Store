import { useRef } from 'react';

export default function VerifyOtp({
  otp,
  setOtp,
  setErrorMsg,
  onSubmit,
  isLoading,
  email,
  timer,
  onResend,
  isResending
}) {
  const inputRefs = useRef([]);

  const handleChange = (value, index) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);
    if (setErrorMsg) setErrorMsg('');

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
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
      inputRefs.current[5]?.focus();
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-950 p-4 transition-colors duration-300">
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
          border-radius: 1.5rem;
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
          animation: spinnerRotate 8s linear infinite;
          z-index: 0;
        }
      `}</style>

      <div className="form-spinning-border p-[2px] shadow-2xl max-w-lg w-full">
        <div className="relative bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-[calc(1.5rem-2px)] w-full flex flex-col items-center text-center z-10 transition-colors duration-300">

          <div className="w-12 h-12 bg-[#D88D68]/15 text-[#D88D68] rounded-2xl flex items-center justify-center mb-3 text-xl shadow-sm border border-[#D88D68]/20 lock-float">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-1">Verify Your Code</h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">
            Enter the 6-digit code sent to <span className="text-gray-800 dark:text-gray-200 font-medium">{email}</span>
          </p>

          <form onSubmit={onSubmit} className="w-full space-y-4 text-start">

            <div className="relative w-full flex items-center justify-center gap-2 sm:gap-3 my-2" onPaste={handlePaste}>
              {otp.map((digit, index) => {
                const isFilled = digit !== '' && digit !== null && digit !== undefined;

                return (
                  <div
                    key={index}
                    className={`relative w-11 h-12 sm:w-12 sm:h-14 rounded-xl transition-all duration-300 border-2 ${isFilled
                      ? 'border-[#D88D68] bg-gray-900 shadow-md'
                      : 'border-gray-700 bg-gray-900/50 hover:border-[#D88D68]/50 focus-within:border-[#D88D68]'
                      }`}
                  >
                    <input
                      ref={(el) => (inputRefs.current[index] = el)}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleChange(e.target.value, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      className="w-full h-full text-center text-xl font-bold bg-transparent text-white focus:outline-none block rounded-xl"
                    />
                  </div>
                );
              })}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 px-6 bg-[#D88D68] hover:bg-[#B67352] text-white font-bold text-base sm:text-lg tracking-wide rounded-xl transition-all duration-300 cursor-pointer disabled:opacity-50 mt-2"
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

          <div className="text-center mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 w-full">
            {timer > 0 ? (
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                Didn't receive code? Resend Code in <span className="font-semibold text-[#D88D68]">{timer}s</span>
              </p>
            ) : (
              <button
                type="button"
                onClick={onResend}
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