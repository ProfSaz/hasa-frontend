'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Mock API call for login
    try {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (email === 'admin@hasa.com' && password === 'password123') {
        // Simulate successful login, store a mock token
        localStorage.setItem('admin_token', 'mock-jwt-token');
        router.push('/platform-admin');
      } else {
        setError('Invalid credentials. Please try again.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-6">
      <div className="bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-md border border-green-700">
        <h1 className="text-4xl font-extrabold text-green-400 text-center mb-8">
          Admin Login
        </h1>
        <form onSubmit={handleLogin}>
          <div className="mb-6">
            <label htmlFor="email" className="block text-gray-300 text-sm font-semibold mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-3 bg-gray-700 border border-green-700 rounded-md text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="admin@hasa.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-8">
            <label htmlFor="password" className="block text-gray-300 text-sm font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-3 bg-gray-700 border border-green-700 rounded-md text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="password123"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && (
            <p className="text-red-500 text-center mb-4 text-sm">{error}</p>
          )}
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 ease-in-out transform hover:scale-105"
            disabled={loading}
          >
            {loading ? 'Logging In...' : 'Login'}
          </button>
        </form>
        <p className="mt-6 text-center text-gray-400 text-sm">
          Forgot your password?{' '}
          <Link href="#" className="text-green-500 hover:underline">
            Reset it
          </Link>
        </p>
      </div>
    </div>
  );
}