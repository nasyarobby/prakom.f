import React from "react";

export default function Dialog({
  show,
  title,
  body,
  leftBtnLabel,
  onClickLeftBtn,
  rightBtnLabel,
  onClickRightBtn,
}) {
  if (show && title && body) {
    return (
      <div className="">
        <div
          className="w-screen h-screen fixed top-0 right-0 left-0 bottom-0 flex justify-center items-center flex-col"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div>
            <div
              className="rounded-t-lg bg-blue-800 p-2 text-white"
              style={{ minWidth: "300px" }}
            >
              {title}
            </div>
            <div
              className="rounded-b-lg p-2 bg-white shadow-xl"
              style={{ minHeight: "80px" }}
            >
              <div>{body}</div>
              <div className="text-right mt-10">
                <button
                  className="py-2 px-5 rounded shadow-lg bg-blue-800 text-white mr-2"
                  onClick={onClickLeftBtn || (() => false)}
                >
                  {leftBtnLabel || "OK"}
                </button>{" "}
                <button
                  className="py-2 px-5 rounded shadow-lg bg-gray-200"
                  onClick={onClickRightBtn || (() => false)}
                >
                  {rightBtnLabel || "Cancel"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return null;
}
