import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Mail, ChevronRight } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { postForgotPasswordSendOtp } from '../api/auth.api'

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
    },
  })

  const handleForgotPasswordSubmit = async (formData) => {
    setIsLoading(true)

    try {
      await postForgotPasswordSendOtp(formData)
      toast.success('Reset code sent to your email!')

      navigate('/forgot-password-verify-otp', { state: { email: formData.email } })
    } catch (error) {
      const message =
        error.response?.data?.message || 'Failed to send reset code. Please try again.'
      toast.error(message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#12141A] flex flex-col justify-center items-center px-4 py-12 transition-colors duration-200 font-sans">

      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-[#1F2937] dark:text-white mb-2">
          Forgot Password?
        </h1>
        <p className="text-sm text-[#828282] dark:text-[#9CA3AF]">
          Please enter your email to receive a reset code
        </p>
      </div>


      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit(handleForgotPasswordSubmit)} className="space-y-5">

          {/* Email Field */}
          <div>
            <label className="block mb-1.5 text-sm font-medium text-[#1F2937] dark:text-[#E5E7EB]">
              Email
            </label>
            <div className="relative flex items-center">
              <Mail className="absolute left-4 h-5 w-5 text-[#828282] dark:text-[#9CA3AF]" />
              <input
                type="email"
                placeholder="username@mail.com"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
                className="w-full pl-12 pr-4 py-3.5 bg-transparent rounded-xl border border-[#8E4726] dark:border-[#B25B32] text-[#1F2937] dark:text-white placeholder-[#828282] dark:placeholder-[#6B7280] font-semibold focus:outline-none focus:ring-1 focus:ring-[#8E4726] dark:focus:ring-[#B25B32] transition-all text-sm"
              />
            </div>
            {errors.email && (
              <span className="text-xs text-[#8E4726] dark:text-[#E57373] mt-1 block px-1 font-medium">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 px-4 bg-[#8E4726] hover:bg-[#75391E] dark:bg-[#A3522C] dark:hover:bg-[#8E4726] text-white font-medium rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 text-sm disabled:opacity-50 shadow-sm cursor-pointer mt-2"
          >
            <span>Send Reset Code</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-[#EAECF0] dark:border-[#282D37] flex items-center justify-between text-sm">
          <span className="text-[#475467] dark:text-[#9CA3AF]">
            Remembered your password?
          </span>
          <Link
            to="/login"
            className="font-semibold text-[#8E4726] dark:text-[#C86D43] hover:underline transition-colors"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
