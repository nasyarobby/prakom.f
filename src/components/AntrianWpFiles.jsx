import React from "react";
import { useState } from "react";
import useGetAntrian from "../services/useGetAntrian";
import Skeleton from "react-loading-skeleton";
import moment from "moment";
import "moment/locale/id";
import { Link } from "react-router-dom";
export default function Antrianwpfiles() {
  const [menu, setMenu] = useState(0);

  return (
    <>
      <div className="border border-gray-300 shadow-md my-5">
        <div className="flex">
          <Tab
            label="Hari ini dan Akan Datang"
            selected={menu === 0}
            onClick={() => setMenu(0)}
          />
          <Tab
            label="Sebelumya"
            selected={menu === 1}
            onClick={() => setMenu(1)}
          />
          <div className="bg-gray-600 flex-grow"></div>
        </div>
        <div className="p-5">
          {menu === 0 && <UpcomingTab />}
          {menu === 1 && <HistoryTab />}
        </div>
      </div>
    </>
  );
}

function Tab({ label, selected, ...props }) {
  return (
    <div
      className={`p-2 px-5 ${
        selected
          ? ` font-semibold `
          : ` cursor-pointer bg-gray-600 text-gray-200 underline`
      }`}
      {...props}
    >
      {label}
    </div>
  );
}

function UpcomingTab() {
  const { data, getAntrianUpcoming } = useGetAntrian();
  const [flag, setFlag] = useState(false);

  if (!flag) {
    getAntrianUpcoming();
    setFlag(true);
  }

  if (data) {
    return data.data.map((janji) => {
      return (
        <div
          className={`border-l-8 p-2 my-2 ${
            janji.realSelesai ? ` border-green-700 ` : ` border-gray `
          }`}
        >
          <div className="text-lg font-semibold">
            {moment(janji.jadwalMulai).format("dddd, DD MMMM YYYY")}
          </div>
          <div className="text-lg font-semibold">
            {moment(janji.jadwalMulai).format("HH:mm") +
              " s.d. " +
              moment(janji.jadwalSelesai).format("HH:mm")}
          </div>
          {janji.realSelesai && (
            <div className="text-lg font-semibold">(Telah Selesai)</div>
          )}
          <div>
            KPP {janji.kpp.nama} / {janji.kpp.kode}
          </div>
          <div>
            Layanan: {janji.layanan.nama}
            <br />
            {janji.detilLayanan}
          </div>
          <div className="mt-4">
            <Link
              to={`/antrian/result/${janji.qr}`}
              className="p-1 px-4 bg-orange-500 rounded text-white shadow-lg"
            >
              Detil
            </Link>
          </div>
        </div>
      );
    });
  } else {
    return <Skeleton count={15} />;
  }
}

function HistoryTab() {
  const { data, getAntrianPast } = useGetAntrian();
  const [flag, setFlag] = useState(false);

  if (!flag) {
    getAntrianPast();
    setFlag(true);
  }

  if (data) {
    return data.data.map((janji) => {
      return (
        <div
          className={`border-l-8 p-2 my-2 ${
            janji.realSelesai ? ` border-green-700 ` : ` border-gray `
          }`}
        >
          <div className="text-lg font-semibold">
            {moment(janji.jadwalMulai).format("dddd, DD MMMM YYYY")}
          </div>
          <div className="text-lg font-semibold">
            {moment(janji.jadwalMulai).format("HH:mm") +
              " s.d. " +
              moment(janji.jadwalSelesai).format("HH:mm")}
          </div>
          {janji.realSelesai && (
            <div className="text-lg font-semibold">(Telah Selesai)</div>
          )}
          <div>
            KPP {janji.kpp.nama} / {janji.kpp.kode}
          </div>
          <div>
            Layanan: {janji.layanan.nama}
            <br />
            {janji.detilLayanan}
          </div>
          <div className="mt-4">
            <Link
              to={`/antrian/result/${janji.qr}`}
              className="p-1 px-4 bg-orange-500 rounded text-white shadow-lg"
            >
              Detil
            </Link>
          </div>
        </div>
      );
    });
  } else {
    return <Skeleton count={15} />;
  }
}
