'use client';
import { useState, useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      router.push('/');
    }
  }, [session, router]);

  if (session) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    setLoading(false);

    if (res?.error) {
      setError(res.error);
    } else {
      router.push('/');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-10 bg-white rounded-3xl shadow-xl">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-8">
          Sign In
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-semibold text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-semibold text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="********"
              required
            />
          </div>
          {error && <div className="text-red-600 text-sm font-medium">{error}</div>}
          <button
            type="submit"
            className="w-full py-3 bg-black text-white font-semibold rounded-xl shadow hover:bg-gray-800 transition disabled:opacity-70 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
        <div className="mt-6 text-center text-sm text-gray-600">
          Don&apos;t have an account?{' '}
          <a
            href="/auth/signup"
            className="font-semibold text-green-600 hover:text-green-700 hover:underline"
          >
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
}
