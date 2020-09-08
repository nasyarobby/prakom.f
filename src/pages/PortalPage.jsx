import React from "react";
import { useContext } from "react";
import { AppContext } from "../App";

export default function Portalpage(props) {
  const { user, isLoggedIn } = useContext(AppContext);

  return (
    <div>
      <div className="text-lg rounded-b-lg bg-blue-800 w-full text-white px-10 p-2 flex justify-between">
        <div>Portal DJP Online</div>
        <div className={`flex ${!isLoggedIn && `invisible`}`}>
          <div className="mx-2">{user.nama}</div>
          <div
            className="mx-2 cursor-pointer"
            onClick={(e) => {
              localStorage.removeItem("token");
            }}
          >
            Logout
          </div>
        </div>
      </div>
      <div className="md:flex p-5 flex-wrap">
        {[
          {
            label: "Antrian Online",
            login:
              process.env.REACT_APP_SSO_REDIRECT ||
              "http://localhost:8080?token=",
            target:
              process.env.REACT_APP_HOST ||
              "http://localhost:8080/daftar-antrian",
          },
          { label: "e-Billing", login: "https://ebilling.pajak.go.id/?token=" },
          { label: "e-Filing", login: "https://efiling.pajak.go.id/?token=" },
          { label: "e-Norma", login: "https://enorma.pajak.go.id/?token=" },
          { label: "Pajak.go.id", login: "https://www.pajak.go.id" },
        ].map((x) => {
          return (
            <div className="p-2 w-full md:w-1/3">
              <a
                href={
                  isLoggedIn
                    ? x.target
                    : `${
                        process.env.REACT_APP_SSO_HOST ||
                        "http://localhost:3000/?redirect_uri="
                      }${x.login}`
                }
              >
                <div className="rounded shadow p-10 py-5 border-l-8 border-orange-500 bg-blue-800 text-white text-xl uppercase cursor-pointer">
                  {x.label}
                </div>
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
