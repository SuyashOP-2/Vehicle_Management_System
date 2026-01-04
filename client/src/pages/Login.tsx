import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === "admin" && password === "1234") {
      localStorage.setItem("loggedIn", "true");
      navigate("/master-user");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
  <div className="min-h-screen flex items-center justify-center bg-[#0B0F1A] text-white relative overflow-hidden">

    <div
      className="absolute inset-0 bg-cover bg-center opacity-20"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2)",
      }}
    />

    <div className="absolute inset-0" />

    <div className="absolute top-20 left-20 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl" />
    <div className="absolute bottom-20 right-20 w-72 h-72 bg-indigo-600/20 rounded-full blur-3xl" />

    <div className="relative z-10 w-[420px] backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-10">

      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight">
          Vehicle Registration
        </h1>
        <p className="text-gray-300 mt-2">
          Secure Administrative Access
        </p>
      </div>

      <div className="mb-5">
        <label className="block text-sm text-gray-300 mb-1">
          Username
        </label>
        <input
          className="w-full px-5 py-3 rounded-xl bg-black/40 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          placeholder="Enter admin username"
          onChange={(e) => {
            setUsername(e.target.value);
            setError("");
          }}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm text-gray-300 mb-1">
          Password
        </label>
        <input
          type="password"
          className="w-full px-5 py-3 rounded-xl bg-black/40 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          placeholder="Enter secure password"
          onChange={(e) => {
            setPassword(e.target.value);
            setError("");
          }}
        />
      </div>

      {error && (
        <div className="mb-4 text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-2">
          {error}
        </div>
      )}

      <button
        onClick={handleLogin}
        className="w-full mt-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-[1.02] active:scale-95 transition-all font-bold shadow-lg cursor-pointer"
      >
        Login to Dashboard
      </button>

      <p className="text-xs text-gray-400 text-center mt-6">
        © {new Date().getFullYear()} Vehicle Registration Management System
      </p>
    </div>
  </div>
);

}
