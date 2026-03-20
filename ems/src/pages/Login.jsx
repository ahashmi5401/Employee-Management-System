import { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (err) {
      setError('Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen bg-zinc-950 flex items-center justify-center p-4'>
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-10">
        
        <h2 className="text-white text-3xl font-semibold text-center mb-8">Sign In</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          
          <div className="flex flex-col gap-1.5">
            <label className="text-zinc-400 text-xs font-semibold tracking-widest uppercase">Email</label>
            <input
              type="email"
              value={email}
              autoComplete='current-email'
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@smart-ems.com"
              className="w-full bg-zinc-800 border border-zinc-700 text-white text-sm rounded-xl px-4 py-3.5 placeholder-zinc-600 outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-zinc-400 text-xs font-semibold tracking-widest uppercase">Password</label>
            <input
              type="password"
              value={password}
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full bg-zinc-800 border border-zinc-700 text-white text-sm rounded-xl px-4 py-3.5 placeholder-zinc-600 outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all"
            />
          </div>

          {error && <p className="text-red-500 text-xs">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-500 active:scale-[0.98] text-white font-semibold text-sm py-3.5 rounded-xl transition-all mt-2"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>

        </form>
      </div>
    </div>
  )
}

export default Login