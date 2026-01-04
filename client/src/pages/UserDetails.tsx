import { useParams } from "react-router-dom";
import { useState } from "react";

interface Vehicle {
  id: number;
  vehicleNumber: string;
  vehicleType: string;
  model: string;
  rcNumber: string;
  insuranceNumber: string;
  pucNumber: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  address: string;
  dob: string;
  phone: string;
  vehicles: Vehicle[];
}

export default function UserDetails() {
  const { userId } = useParams();

  const [users, setUsers] = useState<User[]>(
    JSON.parse(localStorage.getItem("users") || "[]")
  );

  const userIndex = users.findIndex(
    (u) => u.id === Number(userId)
  );

  if (userIndex === -1) {
    return <div className="p-8 text-white">User not found</div>;
  }

  const user = users[userIndex];

  const [vehicle, setVehicle] = useState<Vehicle>({
    id: 0,
    vehicleNumber: "",
    vehicleType: "",
    model: "",
    rcNumber: "",
    insuranceNumber: "",
    pucNumber: "",
  });

  const addVehicle = () => {
    const updatedUsers = [...users];

    updatedUsers[userIndex].vehicles.push({
      ...vehicle,
      id: Date.now(),
    });

    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    setVehicle({
      id: 0,
      vehicleNumber: "",
      vehicleType: "",
      model: "",
      rcNumber: "",
      insuranceNumber: "",
      pucNumber: "",
    });
  };

  return (
    <div className="bg-black text-white min-h-screen p-8">
      <div className="bg-white/10 p-6 rounded-2xl mb-6">
        <h2 className="text-3xl font-bold">{user.name}</h2>
        <p>Email: {user.email}</p>
        <p>Phone: {user.phone}</p>
        <p>DOB: {user.dob}</p>
        <p>Address: {user.address}</p>
      </div>

      <div className="bg-white/5 p-6 rounded-2xl mb-6">
        <h3 className="text-xl font-bold mb-4">Add Vehicle</h3>

        {[
          ["Vehicle Number", "vehicleNumber"],
          ["Vehicle Type", "vehicleType"],
          ["Model", "model"],
          ["RC Number", "rcNumber"],
          ["Insurance Number", "insuranceNumber"],
          ["PUC Number", "pucNumber"],
        ].map(([label, key]) => (
          <input
            key={key}
            className="input-lg mb-3"
            placeholder={label}
            value={(vehicle as any)[key]}
            onChange={(e) =>
              setVehicle({ ...vehicle, [key]: e.target.value })
            }
          />
        ))}

        <button
          onClick={addVehicle}
          className="bg-green-600 px-6 py-3 rounded-xl cursor-pointer"
        >
          Save Vehicle
        </button>
      </div>

      <div className="bg-white/5 p-6 rounded-2xl">
        <h3 className="text-xl font-bold mb-4">
          Registered Vehicles
        </h3>

        {user.vehicles.length === 0 ? (
          <p className="text-gray-400">No vehicles added</p>
        ) : (
          user.vehicles.map((v) => (
            <div
              key={v.id}
              className="border-b border-white/10 py-2"
            >
              🚗 {v.vehicleNumber} — {v.vehicleType}  
              <div className="text-sm text-gray-300">
                Model: {v.model} | RC: {v.rcNumber} | INS:{" "}
                {v.insuranceNumber} | PUC: {v.pucNumber}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
