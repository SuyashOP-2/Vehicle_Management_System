import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

type Status = "green" | "red" | "yellow";

interface Vehicle {
  id: number;
  vehicleNumber: string;
  vehicleType: string;
  model: string;
  rcNumber: string;
  rcValidFrom: string;
  rcValidTo: string;
  insuranceNumber: string;
  insuranceExpiry: string;
  pucNumber: string;
  pucExpiry: string;
  permitExpiry: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  vehicles: Vehicle[];
}

const getStatus = (date: string) => {
  if (!date) return { label: "Unknown", color: "yellow" as Status };

  const diff =
    (new Date(date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24);

  if (diff < 0) return { label: "Expired", color: "red" as Status };
  if (diff <= 30) return { label: "Expiring Soon", color: "yellow" as Status };
  return { label: "Active", color: "green" as Status };
};

export default function VehicleDashboard() {
  const { userId } = useParams();
  const [users, setUsers] = useState<User[]>([]);
  const [vehicle, setVehicle] = useState<Vehicle>({
    id: 0,
    vehicleNumber: "",
    vehicleType: "",
    model: "",
    rcNumber: "",
    rcValidFrom: "",
    rcValidTo: "",
    insuranceNumber: "",
    insuranceExpiry: "",
    pucNumber: "",
    pucExpiry: "",
    permitExpiry: "",
  });

  useEffect(() => {
    setUsers(JSON.parse(localStorage.getItem("users") || "[]"));
  }, []);

  const user = users.find((u) => u.id === Number(userId));
  console.log(users);
  if (!user) return <div className="text-white p-10">User not found</div>;

  const addVehicle = () => {
    const newVehicle = { ...vehicle, id: Date.now() };
    console.log(newVehicle);

    const updatedUsers = users.map((u) =>
      u.id === user.id
        ? { ...u, vehicles: [...(u.vehicles || []), newVehicle] }
        : u
    );

    console.log(updatedUsers);

    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    setVehicle({
      id: 0,
      vehicleNumber: "",
      vehicleType: "",
      model: "",
      rcNumber: "",
      rcValidFrom: "",
      rcValidTo: "",
      insuranceNumber: "",
      insuranceExpiry: "",
      pucNumber: "",
      pucExpiry: "",
      permitExpiry: "",
    });
  };

//   const downloadReport = () => {
//     const blob = new Blob([JSON.stringify(user, null, 2)], {
//       type: "application/json",
//     });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = `${user.name}-vehicle-report.json`;
//     a.click();
//   };

  const downloadPdfReport = (user: User) => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Vehicle Compliance Report", 14, 15);

    doc.setFontSize(11);
    doc.text(`Name: ${user.name}`, 14, 25);
    doc.text(`Phone: ${user.phone}`, 14, 32);
    doc.text(`Email: ${user.email}`, 14, 39);

    let startY = 50;

    user.vehicles.forEach((v, index) => {
      const insurance = getStatus(v.insuranceExpiry);
      const puc = getStatus(v.pucExpiry);
      const permit = getStatus(v.permitExpiry);

      doc.setFontSize(14);
      doc.text(
        `Vehicle ${index + 1}: ${v.vehicleNumber} (${v.vehicleType})`,
        14,
        startY
      );

      autoTable(doc, {
        startY: startY + 5,
        head: [["Field", "Value"]],
        body: [
          ["Model", v.model],
          ["RC Number", v.rcNumber],
          ["RC Valid From", v.rcValidFrom],
          ["RC Valid To", v.rcValidTo],

          [
            "Insurance",
            `${insurance.label} (Expiry: ${v.insuranceExpiry || "N/A"})`,
          ],
          ["Insurance No.", v.insuranceNumber],

          ["PUC", `${puc.label} (Expiry: ${v.pucExpiry || "N/A"})`],
          ["PUC No.", v.pucNumber],

          ["Permit", `${permit.label} (Expiry: ${v.permitExpiry || "N/A"})`],
        ],
        theme: "grid",
        styles: { fontSize: 10 },
        headStyles: { fillColor: [30, 64, 175] },
      });

      startY = (doc as any).lastAutoTable.finalY + 15;
    });

    doc.save(`${user.name}_Vehicle_Compliance_Report.pdf`);
  };

  return (
    <div className="min-h-screen bg-[#0B0F1A]  text-white px-6 py-10">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="bg-[#111827] p-6 rounded-2xl border border-[#1F2937]">
          <h1 className="text-3xl font-bold">{user.name}</h1>
          <p className="text-gray-400">
            {user.phone} • {user.email}
          </p>
        </div>

        <div className="bg-[#111827] p-8 rounded-2xl border border-[#1F2937]">
          <h2 className="text-2xl font-semibold mb-6">Vehicle Details</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="label">Vehicle Number</label>
              <input
                className="input-lg"
                value={vehicle.vehicleNumber}
                onChange={(e) =>
                  setVehicle({ ...vehicle, vehicleNumber: e.target.value })
                }
              />
            </div>

            <div>
              <label className="label">Vehicle Type</label>
              <select
                className="input-lg"
                value={vehicle.vehicleType}
                onChange={(e) =>
                  setVehicle({ ...vehicle, vehicleType: e.target.value })
                }
              >
                <option value="">Select Type</option>
                <option>Two Wheeler</option>
                <option>Four Wheeler</option>
                <option>Commercial</option>
              </select>
            </div>

            <div>
              <label className="label">Model</label>
              <input
                className="input-lg"
                value={vehicle.model}
                onChange={(e) =>
                  setVehicle({ ...vehicle, model: e.target.value })
                }
              />
            </div>

            <div>
              <label className="label">RC Number</label>
              <input
                className="input-lg"
                value={vehicle.rcNumber}
                onChange={(e) =>
                  setVehicle({ ...vehicle, rcNumber: e.target.value })
                }
              />
            </div>

            {[
              ["RC Valid From", "rcValidFrom"],
              ["RC Valid To", "rcValidTo"],
              ["Insurance Expiry", "insuranceExpiry"],
              ["PUC Expiry", "pucExpiry"],
              ["Permit Expiry", "permitExpiry"],
            ].map(([label, key]) => (
              <div key={key}>
                <label className="label">{label}</label>
                <input
                  type="date"
                  className="input-lg"
                  onChange={(e) =>
                    setVehicle({ ...vehicle, [key]: e.target.value } as Vehicle)
                  }
                />
              </div>
            ))}
          </div>

          <button
            onClick={addVehicle}
            className="mt-8 px-10 py-4 bg-blue-600 hover:bg-blue-700 rounded-xl text-lg font-bold cursor-pointer"
          >
            Save Vehicle
          </button>
        </div>

        <div className="space-y-6">
          {user.vehicles?.map((v) => {
            const insurance = getStatus(v.insuranceExpiry);
            const puc = getStatus(v.pucExpiry);
            const permit = getStatus(v.permitExpiry);

            return (
              <div
                key={v.id}
                className="bg-[#111827] p-6 rounded-2xl border border-[#1F2937]"
              >
                <h3 className="text-xl font-bold mb-4">
                  🚗 {v.vehicleNumber} ({v.vehicleType})
                </h3>

                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    ["Insurance", insurance, v.insuranceExpiry],
                    ["PUC", puc, v.pucExpiry],
                    ["Permit", permit, v.permitExpiry],
                  ].map(([label, status, date]: any) => (
                    <div key={label} className="bg-[#0B1220] p-4 rounded-xl">
                      <p className="text-gray-400 text-sm">{label}</p>
                      <p className={`badge-${status.color} inline-block mt-2`}>
                        {status.label}
                      </p>
                      <p className="text-sm mt-2 text-gray-400">
                        Expiry: {date || "N/A"}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={() => downloadPdfReport(user)}
          className="w-full py-4 bg-green-600 hover:bg-green-700 rounded-xl text-lg font-bold cursor-pointer"
        >
          📄 Download Vehicle Compliance PDF
        </button>
      </div>
    </div>
  );
}
