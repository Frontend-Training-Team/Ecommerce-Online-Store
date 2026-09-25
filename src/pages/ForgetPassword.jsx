import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Mail, ChevronRight } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { postForgotPasswordSendOtp } from '../api/auth.api'
import { motion } from 'framer-motion'

const ForgotPasswordPage = () => {
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

      navigate('/forgot-password-verify-otp', { 
        state: { email: formData.email } 
      })
    } catch (error) {
      const message =
        error.response?.data?.message || 'Failed to send reset code. Please try again.'
      toast.error(message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-noir-900 flex flex-col justify-center items-center px-4 py-12 
    transition-colors duration-200 font-sans">

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center mb-8">
        <h1 className="text-3xl font-bold text-[#1F2937] dark:text-fg mb-2">
          Forgot Password?
        </h1>
        <p className="text-sm text-[#828282] dark:text-fg-tertiary">
          Please enter your email to receive a reset code
        </p>
      </motion.div>


      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
        className="w-full max-w-md">
        <form onSubmit={handleSubmit(handleForgotPasswordSubmit)} className="space-y-5">

          {/* Email Field */}
          <div>
            <label className="block mb-1.5 text-sm font-medium text-[#1F2937] dark:text-fg-secondary">
              Email
            </label>
            <div className="relative flex items-center">
              <Mail className="absolute left-4 h-5 w-5 text-[#828282] dark:text-fg-tertiary" />
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
                className="w-full pl-12 pr-4 py-3.5 bg-transparent dark:bg-noir-750 rounded-xl border border-[#8E4726] 
                dark:border-copper-600 text-[#1F2937] dark:text-fg placeholder-[#828282] dark:placeholder-fg-placeholder 
                font-semibold focus:outline-none focus:ring-1 focus:ring-[#8E4726] dark:focus:border-copper-400 
                dark:focus:ring-copper-400/25 transition-all text-sm"
              />
            </div>
            {errors.email && (
              <span className="text-xs text-[#8E4726] dark:text-state-danger mt-1 block px-1 font-medium">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 px-4 bg-[#8E4726] hover:bg-[#75391E] dark:bg-copper-500 
            dark:hover:bg-copper-400 text-white dark:text-fg-on-accent font-medium rounded-xl transition-all 
            duration-200 flex items-center justify-center space-x-2 text-sm disabled:opacity-50 shadow-sm 
            dark:shadow-noir-sm cursor-pointer mt-2"
          >
            <span>Send Reset Code</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-[#EAECF0] dark:border-line-subtle flex items-center 
        justify-between text-sm">
          <span className="text-[#475467] dark:text-fg-secondary">
            Remembered your password?
          </span>
          <Link
            to="/Login"
            className="font-semibold text-[#8E4726] dark:text-copper-400 hover:underline 
            dark:hover:text-copper-300 transition-colors"
          >
            Login
          </Link>
        </div>
      </motion.div>
    </div>
  )
}

export default ForgotPasswordPage
