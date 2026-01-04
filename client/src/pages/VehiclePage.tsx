import { useParams } from "react-router-dom";
import { useState } from "react";

interface Vehicle {
  id: number;
  number: string;
  type: string;
  model: string;
}

interface User {
  id: number;
  name: string;
  phone: string;
}

export default function VehiclePage() {
  const { userId } = useParams();
  console.log(userId, "UserId..")

  const users: User[] =
    JSON.parse(localStorage.getItem("users") || "[]");

  const user = users.find(
    (u) => u.id === Number(userId)
  );

  const [vehicle, setVehicle] = useState<Vehicle>({
    id: 0,
    number: "",
    type: "",
    model: "",
  });

  const vehiclesKey = `vehicles_${userId}`;

  const vehicles: Vehicle[] =
    JSON.parse(localStorage.getItem(vehiclesKey) || "[]");

  const addVehicle = () => {
    const newVehicle = {
      ...vehicle,
      id: Date.now(),
    };

    localStorage.setItem(
      vehiclesKey,
      JSON.stringify([...vehicles, newVehicle])
    );

    setVehicle({ id: 0, number: "", type: "", model: "" });
  };

  if (!user) {
    return <div className="p-8 text-white">User not found</div>;
  }

  return (
    <div className="p-8 bg-black text-white min-h-screen">
      <div className="bg-white/10 p-6 rounded-2xl mb-6">
        <h2 className="text-2xl font-bold">
          {user.name}
        </h2>
        <p className="text-gray-300">
          Phone: {user.phone}
        </p>
      </div>

      <div className="bg-white/5 p-6 rounded-2xl mb-6">
        <h3 className="text-xl font-bold mb-4">
          Add Vehicle
        </h3>

        <input
          className="input-lg mb-3"
          placeholder="Vehicle Number"
          onChange={(e) =>
            setVehicle({ ...vehicle, number: e.target.value })
          }
        />

        <input
          className="input-lg mb-3"
          placeholder="Vehicle Type"
          onChange={(e) =>
            setVehicle({ ...vehicle, type: e.target.value })
          }
        />

        <input
          className="input-lg mb-4"
          placeholder="Model"
          onChange={(e) =>
            setVehicle({ ...vehicle, model: e.target.value })
          }
        />

        <button
          onClick={addVehicle}
          className="bg-green-600 px-6 py-3 rounded-xl"
        >
          Save Vehicle
        </button>
      </div>

      <div className="bg-white/5 p-6 rounded-2xl">
        <h3 className="text-xl font-bold mb-4">
          Registered Vehicles
        </h3>

        {vehicles.map((v) => (
          <div
            key={v.id}
            className="border-b border-white/10 py-2"
          >
            {v.number} — {v.type} ({v.model})
          </div>
        ))}
      </div>
    </div>
  );
}
