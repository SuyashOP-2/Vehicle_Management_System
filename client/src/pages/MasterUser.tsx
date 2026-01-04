import { useState } from "react";
import { useNavigate } from "react-router-dom";

export interface User {
  id: number;
  name: string;
  email: string;
  address: string;
  dob: string;
  phone: string;
}

export default function MasterUser() {
  const navigate = useNavigate();

  const [form, setForm] = useState<User>({
    id: 0,
    name: "",
    email: "",
    address: "",
    dob: "",
    phone: "",
  });

  const addUser = () => {
    const newUser = {
      ...form,
      id: Date.now(),
      vehicles: [],
    };

    const existing = JSON.parse(localStorage.getItem("users") || "[]");
    localStorage.setItem("users", JSON.stringify([...existing, newUser]));

    navigate("/select-user");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#0d1117] to-black text-white flex items-center justify-center p-6 relative overflow-hidden">
        <div
      className="absolute inset-0 bg-cover bg-center opacity-20"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1542362567-b07e54358753)",
      }}
    />

      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-3xl"></div>

      <div className="relative z-10 w-full max-w-xl backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-10">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold mb-2">
            User Registration
          </h1>
          <p className="text-gray-300">
            Create a new user profile before assigning vehicles
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Full Name
            </label>
            <input
              className="input-premium"
              placeholder="Enter full name"
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Email Address
            </label>
            <input
              className="input-premium"
              placeholder="Enter email"
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Phone Number
            </label>
            <input
              className="input-premium"
              placeholder="Enter phone number"
              onChange={(e) =>
                setForm({ ...form, phone: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Date of Birth
            </label>
            <input
              type="date"
              className="input-premium"
              onChange={(e) =>
                setForm({ ...form, dob: e.target.value })
              }
            />
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm text-gray-300 mb-1">
            Address
          </label>
          <textarea
            rows={3}
            className="input-premium resize-none"
            placeholder="Enter full address"
            onChange={(e) =>
              setForm({ ...form, address: e.target.value })
            }
          />
        </div>

        <div className="mt-10 flex justify-center">
          <button
            onClick={addUser}
            className="px-10 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 font-bold shadow-lg hover:scale-[1.03] active:scale-95 transition-all cursor-pointer"
          >
            Save & Continue →
          </button>
        </div>
      </div>
    </div>
  );
}
