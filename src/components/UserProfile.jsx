import React from "react";
import { formatNpwp } from "../libs/formatter";

function mapRole(role) {
  if (role === "admin") {
    return "Administrator";
  } else if (role === "admin_kpp") return "Administrator Lokal";
  else if (role === "pegawai") return "Pegawai";
}

export default function Userprofile({ user }) {
  return (
    <div>
      <h1 className="font-bold text-xl">{user.nama}</h1>
      <ul>
        {user.npwp && (
          <li>
            <span className="">{formatNpwp(user.npwp)}</span>
          </li>
        )}
        {["pegawai", "admin", "admin_kpp"].includes(user.role) && (
          <li>
            <span className="">{mapRole(user.role)}</span>
          </li>
        )}
        {user.nipPanjang && (
          <li>
            <span className="">NIP.{user.nipPanjang}</span>
          </li>
        )}
        <li className="mt-4">
          <span className="mt-2">{user.alamat}</span>
        </li>
      </ul>
      <div className="pt-12">
        <button
          className="w-full rounded bg-white text-blue-800 p-2 shadow-lg"
          onClick={(e) => {
            localStorage.removeItem("token");
            window.location.replace("/");
          }}
        >
          Keluar
        </button>
      </div>
    </div>
  );
}
