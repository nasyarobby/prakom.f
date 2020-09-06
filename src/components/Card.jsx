import React from "react";

export default function Card({ label, value }) {
  return (
    <div className="my-2">
      <div className="text-sm text-gray-600">{label}</div>
      <div className="font-semibold text-gray-800">{value}</div>
    </div>
  );
}
