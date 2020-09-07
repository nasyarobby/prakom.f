import React, { useEffect, useState } from "react";
import useKppService from "../services/useKppService";
import Skeleton from "react-loading-skeleton";

export default function Steppilihkpp({
  kpp,
  kodeKpp,
  setKpp,
  onClickNextStep,
}) {
  const [errorDetil, setErrorDetil] = useState("");

  return (
    <div className="mt-5">
      <h1>KPP Administrasi</h1>
      <Kpp kodeKpp="028" selectedKpp={kpp} setKpp={setKpp} error={errorDetil} />
      <h1>KPP Terdekat</h1>
      <Kpp kodeKpp="452" selectedKpp={kpp} setKpp={setKpp} error={errorDetil} />
      <Kpp kodeKpp="451" selectedKpp={kpp} setKpp={setKpp} error={errorDetil} />
      <Kpp kodeKpp="411" selectedKpp={kpp} setKpp={setKpp} error={errorDetil} />
      <div className="mt-10">
        <button
          className="py-2 ml-2 px-4 rounded bg-orange-500 text-white shadow"
          onClick={(e) => {
            e.preventDefault();
            if (!kpp) return setErrorDetil("Error");
            onClickNextStep();
          }}
        >
          Selanjutnya
        </button>
      </div>
    </div>
  );
}

function Kpp({ kodeKpp, selectedKpp, setKpp, error = false }) {
  const { data, getKpp } = useKppService();
  useEffect(() => {
    if (data) {
    } else if (!data) {
      getKpp(kodeKpp);
    }
  }, [data, getKpp, kodeKpp]);
  if (data)
    return (
      <div
        onClick={(e) => setKpp(data.data.kpp)}
        className={`cursor-pointer my-2 p-2 rounded ${
          selectedKpp && selectedKpp.kode === kodeKpp
            ? ` bg-gray-800 text-white`
            : error
            ? ` border border-red-600 `
            : ` border border-gray-400 `
        }`}
      >
        <h2 className="">KPP {data.data.kpp.nama}</h2>
        <p className="text-xs">
          Alamat {data.data.kpp.alamat}, {data.data.kpp.kota}
          <br />
          Telepon {data.data.kpp.telepon}
        </p>
      </div>
    );
  return (
    <div className="mb-2">
      <Skeleton count={3} />
    </div>
  );
}
