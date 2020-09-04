import React from "react";
import { useContext } from "react";
import { AppContext } from "../App";

export default function Portalpage(props) {
  const { isLoggedIn } = useContext(AppContext);

  return (
    <div>
      <div className="text-2xl rounded-full bg-blue-800 w-full text-white p-5 px-10">
        Portal DJP Online
      </div>
      <div className="flex p-5 flex-wrap">
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
            <div className="p-2 w-1/3">
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
