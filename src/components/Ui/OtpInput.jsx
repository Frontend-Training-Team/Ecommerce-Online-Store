import React, { useRef } from 'react';

export default function OtpInput({ value = '', onChange, length = 6 }) {
  const inputRefs = useRef([]);
  const otpArray = value.padEnd(length, '').split('').slice(0, length);
  const isComplete = value.length === length; // التحقق مما إذا تم إكمال الأرقام الستة

  const focusInput = (index) => {
    if (inputRefs.current[index]) {
      inputRefs.current[index].focus();
    }
  };

  const handleChange = (e, index) => {
    const val = e.target.value;
    if (val && !/^\d+$/.test(val)) return;

    const newOtpArray = [...otpArray];
    newOtpArray[index] = val ? val[val.length - 1] : '';
    onChange(newOtpArray.join(''));

    if (val && index < length - 1) {
      focusInput(index + 1);
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      if (!otpArray[index] && index > 0) {
        const newOtpArray = [...otpArray];
        newOtpArray[index - 1] = '';
        onChange(newOtpArray.join(''));
        focusInput(index - 1);
      } else if (otpArray[index]) {
        const newOtpArray = [...otpArray];
        newOtpArray[index] = '';
        onChange(newOtpArray.join(''));
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      focusInput(index - 1);
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      focusInput(index + 1);
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').trim();
    if (/^\d+$/.test(pasteData)) {
      const truncated = pasteData.slice(0, length);
      onChange(truncated);
      const nextIndex = Math.min(truncated.length, length - 1);
      focusInput(nextIndex);
    }
  };

  return (
    <>
      <style>{`
        @keyframes spinnerRotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .spinning-border-wrapper {
          position: relative;
          overflow: hidden;
          border-radius: 1rem;
        }
        .spinning-border-wrapper::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: conic-gradient(transparent, transparent, transparent,#7E4A2D );
          animation: spinnerRotate 4s linear infinite;
          z-index: 0;
        }
      `}</style>

      <div className="flex justify-center gap-2 sm:gap-3" onPaste={handlePaste}>
        {Array.from({ length }).map((_, index) => {
          const isFilled = Boolean(otpArray[index]);
          return (
            <div key={index} className="relative w-11 h-12 sm:w-14 sm:h-14">
              {/* التعديل هنا: تتوقف الحركة وتصبح بوضع ثابت إذا اكتملت الأرقام */}
              {isFilled && !isComplete ? (
                <div className="w-full h-full spinning-border-wrapper shadow-lg shadow-orange-500/25">
                  <input
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={otpArray[index] || ''}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="absolute inset-[2px] w-[calc(100%-4px)] h-[calc(100%-4px)] text-center text-xl sm:text-2xl font-bold rounded-[calc(1rem-2px)] outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white z-10"
                  />
                </div>
              ) : (
                <input
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={otpArray[index] || ''}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className={`w-full h-full text-center text-xl sm:text-2xl font-bold rounded-2xl outline-none transition-all duration-300 z-10 ${
                    isComplete
                      ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-orange-500 shadow-md shadow-orange-500/20'
                      : 'bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 hover:border-copper-400 dark:hover:border-copper-500'
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}