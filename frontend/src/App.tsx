import { useState } from 'react'
import type { FormEvent } from 'react'
import { Navbar } from './components/Navbar'
import { RideHero } from './components/RideHero'

type AuthMode = 'login' | 'signup'

type LoginForm = {
  identifier: string
  password: string
}

type SignupForm = {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  password: string
  role: 'RIDER' | 'DRIVER'
}

type AuthResult = {
  accessToken: string
  refreshToken: string
  userId: number
  email: string
  role: string
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080'
const navItems = ['Ride', 'Drive', 'Business', 'About']
const rideTabs = ['Request a ride', 'Reserve a ride', 'See prices', 'Explore ride options', 'Airport rides']

function App() {
  const [mode, setMode] = useState<AuthMode>('signup')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loginForm, setLoginForm] = useState<LoginForm>({
    identifier: '',
    password: '',
  })
  const [signupForm, setSignupForm] = useState<SignupForm>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    role: 'RIDER',
  })

  async function submitRequest<T>(path: string, payload: T) {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    const data = await response.json().catch(() => null)

    if (!response.ok) {
      const serverMessage =
        data?.message ?? data?.error ?? 'QRide request failed. Try again.'
      throw new Error(serverMessage)
    }

    return data as AuthResult
  }

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setError('')
    setMessage('')

    try {
      const result = await submitRequest('/api/auth/login', loginForm)
      localStorage.setItem('qride.auth', JSON.stringify(result))
      setMessage(`Welcome back to QRide, ${result.email}.`)
    } catch (requestError) {
      setError(
        requestError instanceof Error ? requestError.message : 'Login failed.',
      )
    } finally {
      setLoading(false)
    }
  }

  async function handleSignup(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setError('')
    setMessage('')

    try {
      const result = await submitRequest('/api/auth/register', signupForm)
      localStorage.setItem('qride.auth', JSON.stringify(result))
      setMessage(`QRide account created for ${result.email}.`)
      setLoginForm({
        identifier: signupForm.email,
        password: signupForm.password,
      })
      setMode('login')
    } catch (requestError) {
      setError(
        requestError instanceof Error ? requestError.message : 'Signup failed.',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#f6f6f1] text-ink">
      <Navbar
        navItems={navItems}
        onLoginClick={() => setMode('login')}
        onSignupClick={() => setMode('signup')}
      />
      <RideHero rideTabs={rideTabs} />

      <section className="border-t border-black/10 bg-white">
        <div className="mx-auto grid w-full max-w-[1280px] gap-10 px-5 py-10 md:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:py-16">
          <div className="space-y-8">
            <div className="space-y-5">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">
                QRide everyday mobility
              </p>
              <h2 className="max-w-3xl text-4xl font-semibold tracking-[-0.04em] text-black md:text-6xl">
                Go anywhere with QRide.
              </h2>
              <p className="max-w-xl text-lg leading-8 text-slate-600">
                Book rides, drive on your schedule, and manage your account from
                one QRide experience. Login and signup are connected directly to
                the Spring Boot backend.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <article className="rounded-[28px] bg-black px-5 py-6 text-white">
                <p className="text-3xl font-semibold">24/7</p>
                <p className="mt-2 text-sm text-white/70">QRide account access</p>
              </article>
              <article className="rounded-[28px] border border-black/10 bg-[#f3f3ee] px-5 py-6">
                <p className="text-3xl font-semibold text-black">API</p>
                <p className="mt-2 text-sm text-slate-600">Connected to `/api/auth/*`</p>
              </article>
              <article className="rounded-[28px] border border-black/10 bg-[#dff3ea] px-5 py-6">
                <p className="text-3xl font-semibold text-[#0d6b4d]">Live</p>
                <p className="mt-2 text-sm text-[#275848]">Frontend to backend requests</p>
              </article>
            </div>

          </div>

          <div className="self-start rounded-[32px] border border-black/10 bg-white p-6 shadow-[0_30px_90px_-45px_rgba(0,0,0,0.45)] md:p-8">
            <div className="flex rounded-full bg-[#f3f3ee] p-1">
              <button
                className={`flex-1 rounded-full px-4 py-3 text-sm font-semibold transition ${
                  mode === 'login' ? 'bg-black text-white' : 'text-slate-600'
                }`}
                type="button"
                onClick={() => setMode('login')}
              >
                Log in
              </button>
              <button
                className={`flex-1 rounded-full px-4 py-3 text-sm font-semibold transition ${
                  mode === 'signup' ? 'bg-black text-white' : 'text-slate-600'
                }`}
                type="button"
                onClick={() => setMode('signup')}
              >
                Sign up
              </button>
            </div>

            <div className="mt-7 space-y-2">
              <h2 className="text-3xl font-semibold tracking-tight text-black">
                {mode === 'login' ? 'Welcome back to QRide' : 'Create your QRide account'}
              </h2>
              <p className="text-sm leading-6 text-slate-500">
                {mode === 'login'
                  ? 'Use your email or phone number to continue.'
                  : 'Register as a rider or driver and start using QRide immediately.'}
              </p>
            </div>

            {message ? (
              <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                {message}
              </div>
            ) : null}

            {error ? (
              <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            ) : null}

            {mode === 'login' ? (
              <form className="mt-7 space-y-4" onSubmit={handleLogin}>
                <label className="block space-y-2">
                  <span className="text-sm font-medium text-slate-700">Email or phone</span>
                  <input
                    className="w-full rounded-2xl border border-black/10 bg-[#f8f8f4] px-4 py-4 outline-none transition focus:border-black"
                    value={loginForm.identifier}
                    onChange={(event) =>
                      setLoginForm((current) => ({
                        ...current,
                        identifier: event.target.value,
                      }))
                    }
                    placeholder="name@example.com"
                    required
                  />
                </label>
                <label className="block space-y-2">
                  <span className="text-sm font-medium text-slate-700">Password</span>
                  <input
                    className="w-full rounded-2xl border border-black/10 bg-[#f8f8f4] px-4 py-4 outline-none transition focus:border-black"
                    type="password"
                    value={loginForm.password}
                    onChange={(event) =>
                      setLoginForm((current) => ({
                        ...current,
                        password: event.target.value,
                      }))
                    }
                    placeholder="Enter your password"
                    required
                  />
                </label>
                <button
                  className="w-full rounded-full bg-black px-5 py-4 text-base font-semibold text-white transition hover:bg-[#1f1f1f] disabled:cursor-not-allowed disabled:bg-black/60"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? 'Logging in...' : 'Log in to QRide'}
                </button>
              </form>
            ) : (
              <form className="mt-7 space-y-4" onSubmit={handleSignup}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block space-y-2">
                    <span className="text-sm font-medium text-slate-700">First name</span>
                    <input
                      className="w-full rounded-2xl border border-black/10 bg-[#f8f8f4] px-4 py-4 outline-none transition focus:border-black"
                      value={signupForm.firstName}
                      onChange={(event) =>
                        setSignupForm((current) => ({
                          ...current,
                          firstName: event.target.value,
                        }))
                      }
                      placeholder="Aarav"
                      required
                    />
                  </label>
                  <label className="block space-y-2">
                    <span className="text-sm font-medium text-slate-700">Last name</span>
                    <input
                      className="w-full rounded-2xl border border-black/10 bg-[#f8f8f4] px-4 py-4 outline-none transition focus:border-black"
                      value={signupForm.lastName}
                      onChange={(event) =>
                        setSignupForm((current) => ({
                          ...current,
                          lastName: event.target.value,
                        }))
                      }
                      placeholder="Sharma"
                      required
                    />
                  </label>
                </div>

                <label className="block space-y-2">
                  <span className="text-sm font-medium text-slate-700">Email</span>
                  <input
                    className="w-full rounded-2xl border border-black/10 bg-[#f8f8f4] px-4 py-4 outline-none transition focus:border-black"
                    type="email"
                    value={signupForm.email}
                    onChange={(event) =>
                      setSignupForm((current) => ({
                        ...current,
                        email: event.target.value,
                      }))
                    }
                    placeholder="name@example.com"
                    required
                  />
                </label>

                <label className="block space-y-2">
                  <span className="text-sm font-medium text-slate-700">Phone number</span>
                  <input
                    className="w-full rounded-2xl border border-black/10 bg-[#f8f8f4] px-4 py-4 outline-none transition focus:border-black"
                    value={signupForm.phoneNumber}
                    onChange={(event) =>
                      setSignupForm((current) => ({
                        ...current,
                        phoneNumber: event.target.value,
                      }))
                    }
                    placeholder="+919876543210"
                    required
                  />
                </label>

                <div className="grid gap-4 sm:grid-cols-[1fr_180px]">
                  <label className="block space-y-2">
                    <span className="text-sm font-medium text-slate-700">Password</span>
                    <input
                      className="w-full rounded-2xl border border-black/10 bg-[#f8f8f4] px-4 py-4 outline-none transition focus:border-black"
                      type="password"
                      value={signupForm.password}
                      onChange={(event) =>
                        setSignupForm((current) => ({
                          ...current,
                          password: event.target.value,
                        }))
                      }
                      placeholder="Create a strong password"
                      required
                    />
                  </label>
                  <label className="block space-y-2">
                    <span className="text-sm font-medium text-slate-700">Role</span>
                    <select
                      className="w-full rounded-2xl border border-black/10 bg-[#f8f8f4] px-4 py-4 outline-none transition focus:border-black"
                      value={signupForm.role}
                      onChange={(event) =>
                        setSignupForm((current) => ({
                          ...current,
                          role: event.target.value as SignupForm['role'],
                        }))
                      }
                    >
                      <option value="RIDER">Rider</option>
                      <option value="DRIVER">Driver</option>
                    </select>
                  </label>
                </div>

                <button
                  className="w-full rounded-full bg-black px-5 py-4 text-base font-semibold text-white transition hover:bg-[#1f1f1f] disabled:cursor-not-allowed disabled:bg-black/60"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? 'Creating account...' : 'Sign up for QRide'}
                </button>
              </form>
            )}

            <div className="mt-6 rounded-[28px] bg-[#f3f3ee] p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                Backend connection
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Requests are sent to{' '}
                <code className="rounded bg-white px-2 py-1">{API_BASE_URL}</code>
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Signup hits{' '}
                <code className="rounded bg-white px-2 py-1">/api/auth/register</code>{' '}
                and login hits{' '}
                <code className="rounded bg-white px-2 py-1">/api/auth/login</code>.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f6f6f1]">
        <div className="mx-auto grid w-full max-w-[1280px] gap-5 px-5 py-8 md:px-8 lg:grid-cols-4">
          <article className="rounded-[28px] bg-white p-6">
            <h3 className="text-lg font-semibold text-black">Ride with QRide</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Fast booking for city trips, airport runs, and daily commuting.
            </p>
          </article>
          <article className="rounded-[28px] bg-white p-6">
            <h3 className="text-lg font-semibold text-black">Drive on your time</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Create a QRide account and switch to driver mode when you are ready.
            </p>
          </article>
          <article className="rounded-[28px] bg-white p-6">
            <h3 className="text-lg font-semibold text-black">Business travel</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Centralize employee travel and trip visibility under one QRide flow.
            </p>
          </article>
          <article className="rounded-[28px] bg-white p-6">
            <h3 className="text-lg font-semibold text-black">Built for API-first delivery</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              React frontend and Spring Boot backend stay connected across local development and Docker.
            </p>
          </article>
        </div>
      </section>
    </main>
  )
}

export default App
