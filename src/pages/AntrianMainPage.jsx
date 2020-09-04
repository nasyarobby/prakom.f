import React from "react";
import WizardAntrian from "../components/WizardAntrian";
import { Switch, Route, useRouteMatch, Link } from "react-router-dom";
import Antrianwpfiles from "../components/AntrianWpFiles";

export default function Antrianmainpage() {
  let { path } = useRouteMatch();
  console.log(path);

  return (
    <>
      <div className="p-4 border border-gray-300 shadow-md">
        <h1 className="text-2xl">Buat Janji Kunjungan Ke KPP</h1>
        <Switch>
          <Route path={`${path}/buat-baru`}>
            <WizardAntrian />
          </Route>
          <Route path={path}>
            <>
              <p>
                Ingin berkunjung ke kantor pelayanan pajak? Dalam masa pandemi,
                DJP berupaya memberikan layanan terbaik kepada wajib pajak
                dengan mengutamakan kesehatan kita semua.
              </p>
              <p>
                Untuk itu DJP memberikan kesempatan kepada wajib pajak yang
                ingin berkunjung untuk membuat jadwal kunjungan secara online.
              </p>
              <div className="mt-5">
                <Link
                  className="py-2 px-4 rounded bg-orange-500 text-white shadow"
                  to={`${path}/buat-baru`}
                >
                  Buat Jadwal Kunjungan
                </Link>
              </div>
            </>
          </Route>
        </Switch>
      </div>
      <Switch>
        <Route exact path={path}>
          <Antrianwpfiles />
        </Route>
      </Switch>
    </>
  );
}
