import React, { useContext } from "react";
import { AppContext } from "../../App";
import { Switch, Route } from "react-router-dom";

import Registrasiulangwp from "../../components/RegistrasiUlangWp";
import LoketPage from "./LoketPage";

export default function Mainpage() {
  const { user } = useContext(AppContext);

  return (
    <>
      <Menu />
      <ProfilePegawai user={user} />
      <Switch>
        <Route path="/siap/registrasi-ulang">
          <div className="p-2">
            <div className="flex">
              <div className="p-2 rounded-t border-t border-l border-r">
                Registrasi Ulang
              </div>
              <div className="p-2 rounded-t border">Daftar WP</div>
              <div className="flex-grow border-b"></div>
            </div>
            <div className="">
              <Registrasiulangwp user={user} />
            </div>
          </div>
        </Route>
        <Route path="/siap/loket">
          <LoketPage user={user} />
        </Route>
      </Switch>
    </>
  );
}

function ProfilePegawai({ user }) {
  return (
    <div className="p-2 bg-gray-200 my-2">
      {user.nama} / {user.nipPanjang} - KPP {user.kppKode}
    </div>
  );
}

function Menu() {
  return (
    <div className="flex flex-row py-2 px-4 bg-blue-800 text-white rounded-b-lg items-center justify-between">
      <div className="flex flex-row items-center">
        <div className="font-bold text-2xl mr-5">SIAP</div>
        {[
          { label: "Registrasi Ulang" },
          { label: "Aplikasi Loket" },
          { label: "Statistik" },
        ].map((menu) => (
          <Menuitem>{menu.label}</Menuitem>
        ))}
      </div>
      <div>Logout</div>
    </div>
  );
}

function Menuitem({ children }) {
  return <div className="mx-2">{children}</div>;
}
