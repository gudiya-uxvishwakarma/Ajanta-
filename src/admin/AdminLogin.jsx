import { useState } from "react";

const ADMIN_CREDENTIALS ={
     email: "admin@ajanta.com", 
    password: "admin123" 
};

export default function AdminLogin({ onLogin }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.email === ADMIN_CREDENTIALS.email && form.password === ADMIN_CREDENTIALS.password) {
      localStorage.setItem("ajanta_admin", "true");
      onLogin();
    } else {
      setError("Invalid credentials.");
    }
  };




  return (
    <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-sm shadow-md p-8">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 bg-[#cf2127] rounded flex items-center justify-center">
            <span className="text-white text-xs font-black">A</span>
          </div>
          <span className="text-[13px] font-black tracking-widest uppercase text-[#1a1a1a]">Admin Panel</span>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-[11px] font-bold tracking-widest uppercase text-gray-500 block mb-1">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
              className="w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-[#cf2127]"
              required
            />
          </div>
          <div>
            <label className="text-[11px] font-bold tracking-widest uppercase text-gray-500 block mb-1">Password</label>
            <input
              type="password"
              value={form.password}
              onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
              className="w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-[#cf2127]"
              required
            />
          </div>
          {error && <p className="text-[#cf2127] text-xs">{error}</p>}
          <button type="submit" className="bg-[#cf2127] text-white text-[11px] font-black tracking-widest uppercase py-3 hover:bg-[#a01a1f] transition-colors">
            Sign In
          </button>
        </form>
        <p className="text-[10px] text-gray-400 mt-4 text-center">admin@ajanta.com / admin123</p>
      </div>
    </div>
  );
}
