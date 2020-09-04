import React from "react";

export default function Input({
  label,
  error,
  hint = undefined,
  ...inputProps
}) {
  return (
    <div className="md-input-main my-6 w-full">
      <div className="md-input-box">
        <input
          type="text"
          className="md-input"
          placeholder=" "
          {...inputProps}
        />
        <label
          htmlFor={inputProps.name}
          className={`md-label ${error && `error`}`}
        >
          {label || ""}
        </label>
        <div className={`md-input-underline ${error && `error`}`} />
      </div>
      {hint !== undefined && (
        <div className={`text-xs italic ${error && `text-red-600`}`}>
          {hint}
        </div>
      )}
    </div>
  );
}
