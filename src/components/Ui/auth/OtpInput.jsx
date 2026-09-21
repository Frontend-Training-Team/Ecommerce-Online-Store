import React, { useRef } from 'react';

export default function OtpInput({
  otp,
  setOtp,
  errorMsg,
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

  const isComplete = otp.every((digit) => digit !== '' && digit !== null && digit !== undefined);

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4 transition-colors duration-300">
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
          border: 1.5px solid #D88D68;
          -webkit-mask-image: -webkit-radial-gradient(white, black);
          transform: translateZ(0);
        }
        .input-spinning-border::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: conic-gradient(transparent, transparent, transparent, #D88D68);
          animation: spinnerRotate 4s linear infinite;
          z-index: 0;
        }
        .circle-container {
          animation: circleSpinning 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
      `}</style>

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

          <form onSubmit={onSubmit} className="w-full space-y-4 text-start">
            
            <div
              className={`relative w-full flex items-center justify-center transition-all duration-500 ${
                isComplete ? 'h-52 my-4' : 'gap-2 sm:gap-3 my-4'
              }`}
              onPaste={handlePaste}
            >
              {isComplete ? (
                <div className="relative w-48 h-48 flex items-center justify-center circle-container">
                  <div
                    className="absolute inset-0 rounded-full border border-dashed border-[#D88D68]/50 animate-spin"
                    style={{ animationDuration: '15s' }}
                  ></div>

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
                  <div key={index} className="input-spinning-border p-[2px] shadow-sm">
                    <input
                      ref={(el) => (inputRefs.current[index] = el)}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleChange(e.target.value, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      className="relative w-10 h-11 sm:w-11 sm:h-12 text-center text-xl font-bold bg-gray-50 dark:bg-gray-900 rounded-[calc(0.75rem-2px)] text-gray-800 dark:text-gray-100 focus:outline-none z-10 block transition-colors duration-200"
                    />
                  </div>
                ))
              )}
            </div>

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