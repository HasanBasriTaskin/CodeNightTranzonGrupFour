'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Eye, EyeOff, Leaf, Check } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { api } from '@/lib/api'

const loginSchema = z.object({
  email: z.string().email('Geçerli bir e-posta adresi giriniz'),
  password: z.string().min(6, 'Şifre en az 6 karakter olmalıdır'),
  rememberMe: z.boolean().optional(),
})

const registerSchema = z.object({
  email: z.string().email('Geçerli bir e-posta adresi giriniz'),
  password: z.string().min(6, 'Şifre en az 6 karakter olmalıdır'),
  confirmPassword: z.string().min(6, 'Şifre en az 6 karakter olmalıdır'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Şifreler eşleşmiyor',
  path: ['confirmPassword'],
})

export default function LoginPage() {
  const router = useRouter()
  const [authMode, setAuthMode] = useState('login') // 'login' or 'register'
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState(null)

  const schema = authMode === 'login' ? loginSchema : registerSchema
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      rememberMe: false,
    },
  })

  const onSubmit = async (data) => {
    try {
      setError(null)
      
      let response
      if (authMode === 'login') {
        response = await api.login(data.email, data.password)
      } else {
        response = await api.register(data.email, data.password)
      }

      // Store auth data
      if (data.rememberMe && typeof window !== 'undefined') {
        localStorage.setItem('remember_me', 'true')
      }

      // Redirect to dashboard after successful login/register
      router.push('/dashboard')
    } catch (error) {
      console.error('Authentication error:', error)
      setError(error.message || 'Bir hata oluştu. Lütfen tekrar deneyin.')
    }
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col border-2 border-primary">
      <main className="flex h-full min-h-screen grow flex-col">
        <div className="flex flex-1 items-stretch">
          <div className="flex-1 lg:grid lg:grid-cols-2">
            {/* Left Visual Panel */}
            <div className="relative hidden lg:flex flex-col bg-gradient-to-br from-green-50 to-green-100 dark:from-dark-green/20 dark:to-dark-green/30 p-12">
              {/* Background Image with Blur */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&q=80')",
                  filter: 'blur(2px)',
                  opacity: 0.3,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-green-50/80 to-green-100/80 dark:from-dark-green/40 dark:to-dark-green/50" />
              
              {/* Header with Checkmark */}
              <div className="relative z-10 mb-auto">
                <div className="flex items-center gap-2">
                  <Check className="h-6 w-6 text-dark-green" strokeWidth={3} />
                  <h1 className="text-lg font-bold text-dark-green">
                    Turkcell GreenConnect
                  </h1>
                </div>
              </div>

              {/* Center Content */}
              <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-md mx-auto flex-1">
                <Leaf className="text-6xl text-dark-green mb-6 h-20 w-20" strokeWidth={1.5} />
                <h2 className="text-4xl font-black leading-tight tracking-tight text-dark-green mb-4">
                  Dijital Alışkanlıklarınla Fark Yarat.
                </h2>
                <p className="text-lg text-medium-gray">
                  Karbon ayak izini keşfet, azalt ve yeşil bir geleceğe katkıda bulun.
                </p>
              </div>
            </div>

            {/* Right Form Panel */}
            <div className="flex flex-1 flex-col items-center justify-center bg-white dark:bg-gray-900 p-6 sm:p-8 lg:p-12">
              <div className="w-full max-w-md space-y-8">
                <div className="text-center lg:text-left">
                  <h2 className="text-3xl font-extrabold text-dark-green dark:text-gray-100">
                    Yeşil Bir Geleceğe Hoş Geldiniz
                  </h2>
                  <p className="mt-2 text-medium-gray dark:text-gray-400">
                    Hesabınıza giriş yapın veya yeni bir hesap oluşturun.
                  </p>
                </div>

                {/* Segmented Buttons */}
                <div className="flex h-12 w-full items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800 p-1">
                  <label className={`flex h-full flex-1 cursor-pointer items-center justify-center overflow-hidden rounded-md px-2 text-center transition-all text-sm font-bold ${
                    authMode === 'login' 
                      ? 'bg-white text-gray-800 shadow-sm' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}>
                    <span className="truncate">Giriş Yap</span>
                    <input
                      checked={authMode === 'login'}
                      onChange={() => setAuthMode('login')}
                      className="invisible h-0 w-0"
                      name="auth-toggle"
                      type="radio"
                      value="Giriş Yap"
                    />
                  </label>
                  <label className={`flex h-full flex-1 cursor-pointer items-center justify-center overflow-hidden rounded-md px-2 text-center transition-all text-sm font-bold ${
                    authMode === 'register' 
                      ? 'bg-white text-gray-800 shadow-sm' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}>
                    <span className="truncate">Kayıt Ol</span>
                    <input
                      checked={authMode === 'register'}
                      onChange={() => setAuthMode('register')}
                      className="invisible h-0 w-0"
                      name="auth-toggle"
                      type="radio"
                      value="Kayıt Ol"
                    />
                  </label>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Error Message */}
                  {error && (
                    <div className="rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-3">
                      <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                    </div>
                  )}

                  {/* Email Field */}
                  <div className="flex flex-col min-w-40 flex-1">
                    <label className="pb-2 text-sm font-semibold text-dark-green dark:text-gray-200">
                      E-posta
                    </label>
                    <Input
                      {...register('email')}
                      type="email"
                      placeholder="ornek@eposta.com"
                      className="h-12 w-full rounded-lg"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-destructive">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Password Field */}
                  <div className="flex flex-col min-w-40 flex-1">
                    <label className="pb-2 text-sm font-semibold text-dark-green dark:text-gray-200">
                      Şifre
                    </label>
                    <div className="flex w-full flex-1 items-stretch rounded-lg">
                      <Input
                        {...register('password')}
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Şifrenizi girin"
                        className="h-12 w-full rounded-l-lg rounded-r-none border-r-0"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="flex items-center justify-center rounded-r-lg border border-l-0 border-input bg-background px-3 text-medium-gray hover:text-dark-green dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:hover:text-white"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="mt-1 text-sm text-destructive">
                        {errors.password.message}
                      </p>
                    )}
                  </div>

                  {/* Confirm Password Field (only for register) */}
                  {authMode === 'register' && (
                    <div className="flex flex-col min-w-40 flex-1">
                      <label className="pb-2 text-sm font-semibold text-dark-green dark:text-gray-200">
                        Şifre Tekrar
                      </label>
                      <div className="flex w-full flex-1 items-stretch rounded-lg">
                        <Input
                          {...register('confirmPassword')}
                          type={showConfirmPassword ? 'text' : 'password'}
                          placeholder="Şifrenizi tekrar girin"
                          className="h-12 w-full rounded-l-lg rounded-r-none border-r-0"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="flex items-center justify-center rounded-r-lg border border-l-0 border-input bg-background px-3 text-medium-gray hover:text-dark-green dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:hover:text-white"
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                      {errors.confirmPassword && (
                        <p className="mt-1 text-sm text-destructive">
                          {errors.confirmPassword.message}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Remember Me & Forgot Password (only for login) */}
                  {authMode === 'login' && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <input
                          {...register('rememberMe')}
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary/50 dark:bg-gray-600 dark:border-gray-500"
                          id="remember-me"
                          type="checkbox"
                        />
                        <label
                          className="ml-2 block text-sm text-medium-gray dark:text-gray-300"
                          htmlFor="remember-me"
                        >
                          Beni Hatırla
                        </label>
                      </div>
                      <Link
                        href="#"
                        className="text-sm font-semibold text-[#00A3E0] hover:text-[#0088C0] hover:underline"
                      >
                        Şifremi Unuttum
                      </Link>
                    </div>
                  )}

                  {/* CTA Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex h-12 min-w-[84px] w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-[#00A3E0] px-5 text-base font-bold leading-normal text-white shadow-sm transition-all hover:bg-[#0088C0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00A3E0]"
                  >
                    <span className="truncate">
                      {isSubmitting
                        ? 'İşleniyor...'
                        : authMode === 'login'
                          ? 'Giriş Yap'
                          : 'Kayıt Ol'}
                    </span>
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

