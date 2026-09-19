import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Mail, Lock, ChevronRight } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import AuthSkeleton from '../components/Skeleton/loginSkeleton'
import { postLogin } from '../api/auth.api'

const Login = () => {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const handleLoginSubmit = async (formData) => {
    setIsLoading(true)

    try {
      const response = await postLogin(formData)
      const data = response.data

      if (data?.token) {
        localStorage.setItem('authToken', data.token)
      }

      toast.success('Logged in successfully!')
      //home
      navigate('/')
    } catch (error) {
      const message =
        error.response?.data?.message || 'Invalid email or password. Please create an account.'
      toast.error(message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="h-screen overflow-hidden bg-white dark:bg-[#12141A] flex flex-col justify-center items-center px-4 transition-colors duration-200 font-sans">      
    
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-[#1F2937] dark:text-[#F5F1EA] mb-2">
          Login
        </h1>
        <p className="text-sm text-[#828282] dark:text-[#A1A1A1]">
          Please fill your information below
        </p>
      </div>

      {/* Skeleton Loader */}
      {isLoading ? (
        <AuthSkeleton />
      ) : (
        <div className="w-full max-w-md">
          <form onSubmit={handleSubmit(handleLoginSubmit)} className="space-y-6">
            
            {/* Email Field */}
            <div className="relative">
              <label className="absolute -top-2.5 left-4 bg-white dark:bg-[#12141A] px-1 text-xs text-[#828282] dark:text-[#A1A1A1] z-10">
                Email
              </label>
              <div className="relative flex items-center">
                <Mail className="absolute left-4 h-5 w-5 text-[#828282]" />
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
                  className="w-full pl-12 pr-4 py-3.5 bg-transparent rounded-xl border border-[#8E4726] text-[#1F2937] dark:text-white placeholder-[#1F2937] dark:placeholder-gray-400 font-semibold focus:outline-none focus:ring-1 focus:ring-[#8E4726] transition-all text-sm"
                />
              </div>
              {errors.email && (
                <span className="text-xs text-[#8E4726] mt-1 block px-1 font-medium">
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* Password Field */}
            <div className="relative">
              <label className="absolute -top-2.5 left-4 bg-white dark:bg-[#12141A] px-1 text-xs text-[#828282] dark:text-[#A1A1A1] z-10">
                Password
              </label>
              <div className="relative flex items-center">
                <Lock className="absolute left-4 h-5 w-5 text-[#828282]" />
                <input
                  type="password"
                  placeholder="••••••••"
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters',
                    },
                  })}
                  className="w-full pl-12 pr-4 py-3.5 bg-transparent rounded-xl border border-[#8E4726] text-[#1F2937] dark:text-white placeholder-[#828282] font-semibold focus:outline-none focus:ring-1 focus:ring-[#8E4726] transition-all text-sm"
                />
              </div>
              {errors.password && (
                <span className="text-xs text-[#8E4726] mt-1 block px-1 font-medium">
                  {errors.password.message}
                </span>
              )}
              
              <div className="flex justify-end mt-2">
                <Link
                  to="/forgot-password"
                  className="text-xs text-[#8E4726] hover:underline transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-4 bg-[#8E4726] hover:bg-[#75391E]
               text-white font-medium rounded-xl transition-all duration-200 flex 
               items-center justify-center space-x-2 text-sm disabled:opacity-50 
               shadow-sm cursor-pointer"
            >
              <span>Login</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-[#EAECF0] dark:border-[#282D37] flex items-center justify-between text-sm">
            <span className="text-[#475467] dark:text-[#98A2B3]">
              Don't have an account?
            </span>
            <Link
              to="/register"
              className="font-semibold text-[#8E4726] hover:underline transition-colors"
            >
              Sign up
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default Login