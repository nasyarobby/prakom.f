import React from "react";
import "./../assets/loading.css";
export default function Loading({ label }) {
  return (
    <div className="w-full flex content-center flex-col items-center">
      <div className="lds-dual-ring"></div>
      <div>{label === undefined ? "Loading..." : label}</div>
    </div>
  );
}
