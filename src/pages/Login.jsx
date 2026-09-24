import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Mail, Lock, ChevronRight } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { postLogin } from '../api/auth.api'
import { useAuth } from '../context/AuthContext'

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { fetchUser } = useAuth()

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
        localStorage.setItem('token', data.token)
        await fetchUser()
      }
      toast.success('Logged in successfully!')
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
    <div className="h-screen overflow-hidden bg-white dark:bg-noir-900 flex flex-col justify-center items-center px-4 transition-colors duration-200 font-sans">

      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-[#1F2937] dark:text-fg mb-2">
          Login
        </h1>
        <p className="text-sm text-[#828282] dark:text-fg-tertiary">
          Please fill your information below
        </p>
      </div>


      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit(handleLoginSubmit)} className="space-y-5">

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
                className="w-full pl-12 pr-4 py-3.5 bg-transparent dark:bg-noir-750 rounded-xl border border-[#8E4726] dark:border-copper-600 text-[#1F2937] dark:text-fg placeholder-[#828282] dark:placeholder-fg-placeholder font-semibold focus:outline-none focus:ring-1 focus:ring-[#8E4726] dark:focus:border-copper-400 dark:focus:ring-copper-400/25 transition-all text-sm"
              />
            </div>
            {errors.email && (
              <span className="text-xs text-[#8E4726] dark:text-state-danger mt-1 block px-1 font-medium">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label className="block mb-1.5 text-sm font-medium text-[#1F2937] dark:text-fg-secondary">
              Password
            </label>
            <div className="relative flex items-center">
              <Lock className="absolute left-4 h-5 w-5 text-[#828282] dark:text-fg-tertiary" />
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
                className="w-full pl-12 pr-4 py-3.5 bg-transparent dark:bg-noir-750 rounded-xl border border-[#8E4726] dark:border-copper-600 text-[#1F2937] dark:text-fg placeholder-[#828282] dark:placeholder-fg-placeholder font-semibold focus:outline-none focus:ring-1 focus:ring-[#8E4726] dark:focus:border-copper-400 dark:focus:ring-copper-400/25 transition-all text-sm"
              />
            </div>
            {errors.password && (
              <span className="text-xs text-[#8E4726] dark:text-state-danger mt-1 block px-1 font-medium">
                {errors.password.message}
              </span>
            )}

            <div className="flex justify-end mt-2">
              <Link
                to="/forgot-password"
                className="text-xs text-[#8E4726] dark:text-copper-400 hover:underline dark:hover:text-copper-300 transition-colors">
                Forgot password?
              </Link>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 px-4 bg-[#8E4726] hover:bg-[#75391E] dark:bg-copper-500 dark:hover:bg-copper-400 text-white dark:text-fg-on-accent font-medium rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 text-sm disabled:opacity-50 shadow-sm dark:shadow-noir-sm cursor-pointer mt-2"
          >
            <span>Login</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-[#EAECF0] dark:border-line-subtle flex items-center justify-between text-sm">
          <span className="text-[#475467] dark:text-fg-secondary">
            Don't have an account?
          </span>
          <Link
            to="/register"
            className="font-semibold text-[#8E4726] dark:text-copper-400 hover:underline dark:hover:text-copper-300 transition-colors"
          >
            Sign up
          </Link>
        </div>
      </div>

    </div>
  )
}

export default LoginPage