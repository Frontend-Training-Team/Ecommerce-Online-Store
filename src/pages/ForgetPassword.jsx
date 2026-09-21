import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [notification, setNotification] = useState(null); // حالة التنبيه المنبثق

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email || !email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    setErrorMsg('');
    setIsLoading(true);

    try {
      // محاكاة الاتصال بالخلفية (API Call)
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // إظهار نافذة التنبيه عند النجاح
      setNotification({
        message: `Reset code has been successfully sent to ${email}`,
        type: 'success'
      });
    } catch (error) {
      setErrorMsg('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4 transition-colors duration-300 relative">
      <style>{`
        @keyframes spinnerRotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes fadeInPopup {
          0% { opacity: 0; transform: scale(0.9); }
          100% { opacity: 1; transform: scale(1); }
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
        .popup-overlay {
          animation: fadeInPopup 0.3s ease-out forwards;
        }
      `}</style>

      {/* نافذة التنبيه المنبثقة (Custom Toast Notification Popup) */}
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
                // الانتقال لصفحة إدخال الرمز Verify OTP مع تمرير الإيميل
                navigate('/verify-otp', { state: { email } });
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
          
          <div className="w-12 h-12 bg-[#D88D68]/15 text-[#D88D68] rounded-2xl flex items-center justify-center mb-3 text-xl shadow-sm border border-[#D88D68]/20">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-1">Forgot Password?</h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">
            No worries, enter your registered email address and we will send you reset code.
          </p>

          <form onSubmit={handleSubmit} className="w-full space-y-4 text-start">
            <div>
              <label className="block text-[11px] font-bold tracking-wider text-gray-500 dark:text-gray-400 uppercase mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrorMsg('');
                }}
                placeholder="name@example.com"
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-800 dark:text-gray-100 focus:outline-none focus:border-[#D88D68] focus:ring-2 focus:ring-[#D88D68]/20 transition-all text-sm"
              />
            </div>

            {errorMsg && (
              <p className="text-red-500 text-xs font-medium">{errorMsg}</p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-6 bg-[#D88D68] hover:bg-[#B67352] text-white font-bold text-sm tracking-wide rounded-xl transition-all duration-300 shadow-xl shadow-[#D88D68]/30 cursor-pointer disabled:opacity-50 mt-2"
            >
              {isLoading ? 'Sending...' : 'SEND RESET CODE'}
            </button>
          </form>

          <div className="text-center mt-6 pt-4 border-t border-gray-100 dark:border-gray-700/50 w-full">
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              Remember your password?{' '}
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="font-medium text-[#D88D68] hover:underline cursor-pointer"
              >
                Sign In
              </button>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}