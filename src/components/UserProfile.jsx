import React from "react";
import { formatNpwp } from "../libs/formatter";

export default function Userprofile({ user }) {
  return (
    <div>
      <h1 className="font-bold text-xl">{user.nama}</h1>
      <ul>
        <li>
          <span className="">{formatNpwp(user.npwp)}</span>
        </li>
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
