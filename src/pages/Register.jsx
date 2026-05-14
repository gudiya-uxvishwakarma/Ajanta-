import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiPhone, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import SEOHead from '../components/SEOHead';

export default function Register() {
  const navigate = useNavigate();
  const { register, login } = useAuth();

  const [form, setForm] = useState({ name: '', email: '', mobile: '', password: '', cpassword: '' });
  const [showPwd, setShowPwd] = useState(false);
  const [showCPwd, setShowCPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.cpassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      await register(form);
      // Auto-login after register
      await login({ email: form.email, password: form.password });
      navigate('/account', { replace: true });
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <SEOHead title="Create Account" noIndex={true} />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/">
            <img src="/Ajanta logo.png" alt="Ajanta" className="h-12 mx-auto mb-4" />
          </Link>
          <h1 className="text-2xl font-black text-gray-900">Create account</h1>
          <p className="text-gray-500 text-sm mt-1">Join Ajanta for exclusive deals</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600 font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name</label>
              <div className="relative">
                <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  name="name"
                  required
                  value={form.name}
                  onChange={handle}
                  placeholder="Rahul Sharma"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#cc0000] focus:ring-1 focus:ring-[#cc0000] transition-all"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handle}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#cc0000] focus:ring-1 focus:ring-[#cc0000] transition-all"
                />
              </div>
            </div>

            {/* Mobile */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Mobile Number</label>
              <div className="relative">
                <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="tel"
                  name="mobile"
                  required
                  value={form.mobile}
                  onChange={handle}
                  placeholder="10-digit mobile number"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#cc0000] focus:ring-1 focus:ring-[#cc0000] transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type={showPwd ? 'text' : 'password'}
                  name="password"
                  required
                  value={form.password}
                  onChange={handle}
                  placeholder="Create a strong password"
                  className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#cc0000] focus:ring-1 focus:ring-[#cc0000] transition-all"
                />
                <button type="button" onClick={() => setShowPwd(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  {showPwd ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Confirm Password</label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type={showCPwd ? 'text' : 'password'}
                  name="cpassword"
                  required
                  value={form.cpassword}
                  onChange={handle}
                  placeholder="Repeat your password"
                  className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#cc0000] focus:ring-1 focus:ring-[#cc0000] transition-all"
                />
                <button type="button" onClick={() => setShowCPwd(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  {showCPwd ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#cc0000] text-white py-3 rounded-xl font-bold text-sm tracking-wide hover:bg-[#b30000] transition-colors disabled:opacity-60 mt-2"
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-[#cc0000] font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
