import React from "react";
import Loading from "./Loading";

export default function Overlayloading({ label }) {
  return (
    <div
      className="w-screen h-screen fixed top-0 right-0 left-0 bottom-0 flex justify-center items-center flex-col"
      style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
    >
      <div className="w-56 p-4 bg-white rounded-md">
        <Loading label={label} />
      </div>
    </div>
  );
}
