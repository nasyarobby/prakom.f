import React, { useContext, useEffect } from "react";
import { AppContext } from "../../App";
import { Switch, Route, Redirect, Link } from "react-router-dom";

import Registrasiulangwp from "../../components/RegistrasiUlangWp";
import LoketPage from "./LoketPage";
import useGetPegawai from "../../services/useGetPegawai";
import { useState } from "react";
import Loading from "../../components/Loading";
import Statisticpage from "./StatisticPage";

function mapRole(role) {
  if (role === "admin") {
    return "Administrator";
  } else if (role === "admin_kpp") return "Administrator Lokal";
  else if (role === "pegawai") return "Pegawai";
}

export default function Mainpage() {
  const { user } = useContext(AppContext);
  const { data, getByNip } = useGetPegawai();
  const [loket, setLoket] = useState(null);

  useEffect(() => {
    getByNip(user.nipPendek);
  }, []);

  useEffect(() => {
    if (data && data.data && data.data.loket) {
      setLoket(data.data.loket.nomor);
    }
  }, [data]);

  if (data)
    return (
      <>
        <Menu user={user} />
        <ProfilePegawai user={data.data} />
        <Switch>
          <Route exact path="/siap">
            <Redirect to="/siap/loket" />
          </Route>
          <Route exact path="/siap/statistik">
            <Statisticpage user={user} />
          </Route>
          <Route exact path="/siap/statistik/:kpp">
            <Statisticpage user={user} />
          </Route>
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
                <Registrasiulangwp user={data.data} setLoket={setLoket} />
              </div>
            </div>
          </Route>
          <Route path="/siap/loket">
            <LoketPage user={data.data} setLoket={setLoket} loket={loket} />
          </Route>
        </Switch>
      </>
    );
  else return <Loading />;
}

function ProfilePegawai({ user }) {
  return (
    <div className="p-2 bg-gray-200 my-2">
      {user.nama} / {user.nipPanjang} ({mapRole(user.role)}) - KPP{" "}
      {user.kpp.nama} ({user.kppKode})
    </div>
  );
}

function Menu({ user }) {
  return (
    <div className="flex flex-row py-2 px-4 bg-blue-800 text-white rounded-b-lg items-center justify-between">
      <div className="flex flex-row items-center">
        <div className="font-bold text-2xl mr-5">SIAP</div>
        {[
          { label: "Registrasi Ulang", url: "/siap/registrasi-ulang" },
          { label: "Aplikasi Loket", url: "/siap/loket" },
          {
            label: "Statistik",
            url: "/siap/statistik",
            onlyFor: ["admin", "admin_kpp"],
          },
        ].map((menu) => (
          <Menuitem user={user} menu={menu}>
            {menu.label}
          </Menuitem>
        ))}
      </div>
      <div
        className="cursor-pointer"
        onClick={(e) => {
          localStorage.removeItem("token");
          window.location.replace("/");
        }}
      >
        Logout
      </div>
    </div>
  );
}

function Menuitem({ menu, children, user }) {
  if (menu.onlyFor ? menu.onlyFor.includes(user.role) : true)
    return (
      <Link className="mx-2 " to={menu.url}>
        {children}
      </Link>
    );
  else return null;
}
