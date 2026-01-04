import { useNavigate } from "react-router-dom";
import { useState } from "react";

export interface User {
  id: number;
  name: string;
  email: string;
  address: string;
  dob: string;
  phone: string;
}

export default function UserSelect() {
  const navigate = useNavigate();
  const users: User[] =
    JSON.parse(localStorage.getItem("users") || "[]");

  const [search, setSearch] = useState("");

  const filtered = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.phone.includes(search)
  );
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#0d1117] to-black text-white p-8 relative overflow-hidden">
      <div className="absolute -top-40 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-extrabold mb-4 tracking-tight">
            Select User
          </h1>
          <p className="text-gray-300 text-lg">
            Choose a user to manage vehicle compliance
          </p>
        </div>

        {users.length === 0 ? (
          <div className="text-center bg-white/5 border border-white/10 rounded-3xl p-12">
            <p className="text-gray-400 text-lg mb-6">
              No users found. Start by creating a user profile.
            </p>
            <button
              onClick={() => navigate("/master-user")}
              className="
                px-10 py-4 rounded-2xl
                bg-gradient-to-r from-blue-500 to-indigo-600
                text-lg font-bold
                shadow-xl
                hover:scale-[1.04]
                active:scale-95
                transition-all
              "
            >
              + Add New User
            </button>
          </div>
        ) : (
          <>
            <div className="max-w-xl mx-auto mb-10">
              <input
                className="input-premium text-lg"
                placeholder="Search by name or phone number"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((u) => (
                <div
                  key={u.id}
                  onClick={() => navigate(`/vehicle/${u.id}`)}
                  className="
                    cursor-pointer
                    bg-white/5 border border-white/15
                    rounded-2xl p-6
                    hover:bg-white/10 hover:border-blue-500
                    hover:shadow-xl hover:scale-[1.03]
                    transition-all
                  "
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold text-lg">
                      {u.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">{u.name}</h3>
                      <p className="text-sm text-gray-400">
                        {u.phone}
                      </p>
                    </div>
                  </div>

                  <div className="text-sm text-gray-300 space-y-1">
                    <p>Email: {u.email}</p>
                    <p>DOB: {u.dob}</p>
                  </div>

                  <div className="mt-4 text-right text-blue-400 font-semibold">
                    Manage Vehicles →
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
