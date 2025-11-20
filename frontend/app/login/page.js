'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Eye, EyeOff, Leaf } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

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
      // TODO: Implement authentication logic with next-auth
      console.log('Form data:', data)
      // Redirect to dashboard after successful login/register
      router.push('/dashboard')
    } catch (error) {
      console.error('Authentication error:', error)
    }
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col">
      {/* Header */}
      <header className="absolute top-0 left-0 w-full p-6 lg:p-8 z-10">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 flex items-center justify-center text-dark-green dark:text-accent-green">
            <Leaf className="h-8 w-8" />
          </div>
          <h1 className="text-xl font-bold text-dark-green dark:text-gray-100">
            Turkcell GreenConnect
          </h1>
        </div>
      </header>

      <main className="flex h-full min-h-screen grow flex-col">
        <div className="flex flex-1 items-stretch">
          <div className="flex-1 lg:grid lg:grid-cols-2">
            {/* Left Visual Panel */}
            <div className="relative hidden lg:flex flex-col items-center justify-center bg-dark-green/5 dark:bg-dark-green/10 p-12">
              <div
                className="absolute inset-0 bg-cover bg-center opacity-10 dark:opacity-5"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDVE8g_SF1R_wlnqY-6E2x80snddGpfy1MQ4cFUBC_1lHRR2tJNF3cHLCAYw4NOIQgMby8pzGk6gZwCR7HB7SrMi7cUomnkmcZwwXqtxHwKSZlpiMVyrjw4mYNz-fnBsV0qWLH9m46ASz83jt5m_MnzWLTSuB5hpzi0uxk2u8Oz54Oq8Vd-O17_AXLZkzG2gentqCfhbWIKFkGaLhUl1tAHVoQpHv4IavIO74eWCe5L27NmhBWKsmVl8m6ZaBllvDcxbLmK12pK9WfZ')",
                }}
              />
              <div className="relative z-10 flex flex-col items-center text-center max-w-md">
                <Leaf className="text-6xl text-dark-green dark:text-accent-green mb-4 h-16 w-16" />
                <h2 className="text-4xl font-black leading-tight tracking-tight text-dark-green dark:text-gray-100">
                  Dijital Alışkanlıklarınla Fark Yarat.
                </h2>
                <p className="mt-4 text-lg text-medium-gray dark:text-gray-300">
                  Karbon ayak izini keşfet, azalt ve yeşil bir geleceğe katkıda bulun.
                </p>
              </div>
            </div>

            {/* Right Form Panel */}
            <div className="flex flex-1 flex-col items-center justify-center bg-background-light dark:bg-background-dark p-6 sm:p-8">
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
                <div className="flex h-12 w-full items-center justify-center rounded-lg bg-gray-200 dark:bg-gray-800 p-1.5">
                  <label className="flex h-full flex-1 cursor-pointer items-center justify-center overflow-hidden rounded-md px-2 text-center transition-all has-[:checked]:bg-white has-[:checked]:text-dark-green has-[:checked]:shadow-sm dark:has-[:checked]:bg-gray-700 dark:has-[:checked]:text-white text-medium-gray text-sm font-bold leading-normal">
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
                  <label className="flex h-full flex-1 cursor-pointer items-center justify-center overflow-hidden rounded-md px-2 text-center transition-all has-[:checked]:bg-white has-[:checked]:text-dark-green has-[:checked]:shadow-sm dark:has-[:checked]:bg-gray-700 dark:has-[:checked]:text-white text-medium-gray text-sm font-bold leading-normal">
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
                        className="text-sm font-semibold text-primary hover:text-primary/80 hover:underline"
                      >
                        Şifremi Unuttum
                      </Link>
                    </div>
                  )}

                  {/* CTA Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex h-12 min-w-[84px] w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-primary px-5 text-base font-bold leading-normal text-white shadow-sm transition-all hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
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

                {/* Social Login */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300 dark:border-gray-600" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-background-light dark:bg-background-dark px-2 text-medium-gray dark:text-gray-400">
                      Veya şununla devam et
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="inline-flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                    <span>Google</span>
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="inline-flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12.01,2.02c-1.28,0-2.48,0.48-3.41,1.31L7.1,1.83C7.09,1.82,7.07,1.82,7.06,1.83c-1.3,0.92-2.31,2.2-2.86,3.67 c-0.5,1.33-0.65,2.78-0.42,4.18c0.21,1.26,0.76,2.45,1.59,3.46c0.55,0.67,1.22,1.23,1.96,1.66c0.75,0.43,1.57,0.72,2.42,0.83 c0.21,0.03,0.42,0.04,0.63,0.04c0.8,0,1.58-0.19,2.29-0.54c0.74-0.36,1.4-0.88,1.95-1.51c0.01-0.01,0.02-0.02,0.02-0.03 c-1.51,0-2.92-0.6-3.96-1.58c-1.29-1.23-2.1-2.91-2.1-4.71c0-1.79,0.81-3.46,2.1-4.7c1.03-0.97,2.44-1.56,3.95-1.56 c0.02,0,0.05,0,0.07,0c-0.2-0.48-0.47-0.93-0.79-1.34C14.49,2.5,13.28,2.02,12.01,2.02z M17.9,5.78 c-0.58,0-1.13,0.11-1.63,0.3c-0.52,0.2-1,0.49-1.4,0.85c-0.01,0.01-0.01,0.02-0.02,0.02c0.01-0.01,0.01-0.02,0.02-0.02 c-0.78-0.7-1.8-1.12-2.88-1.12c-0.95,0-1.83,0.32-2.54,0.88c-1.2,0.95-1.93,2.38-1.93,3.97c0,1.59,0.73,3.02,1.93,3.97 c1.05,0.83,2.41,1.31,3.87,1.31c0.08,0,0.15,0,0.23,0c0.03,0,0.06,0,0.09-0.01c0.03,0,0.07-0.01,0.1-0.01 c1.45-0.12,2.8-0.79,3.74-1.85c0.85-0.95,1.35-2.18,1.35-3.52C21.46,7.91,19.89,5.78,17.9,5.78z" />
                    </svg>
                    <span>Apple</span>
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="inline-flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="#00A3E0"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm3.71,12.29a1,1,0,0,1-1.42,0L12,12.41l-2.29,2.3a1,1,0,0,1-1.42-1.42L10.59,11,8.29,8.71A1,1,0,0,1,9.71,7.29L12,9.59l2.29-2.3a1,1,0,1,1,1.42,1.42L13.41,11Z" />
                    </svg>
                    <span>Turkcell</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

