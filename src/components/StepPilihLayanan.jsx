import React, { useState } from "react";

function Layanan({ label, onClick }) {
  return (
    <div
      className="p-2 border border-gray-400 my-2 cursor-pointer"
      onClick={onClick}
    >
      {label}
    </div>
  );
}

function SelectedLayanan({ label }) {
  return <div className="p-2 border bg-gray-500 text-white my-2">{label}</div>;
}

export default function StepPilihLayanan({
  selectedLayanan,
  setSelectedLayanan,
  daftarLayanan,
  onClickNextStep,
  detilLayanan,
  setDetilLayanan,
  kpp,
}) {
  const nextBtnIsDisabled = detilLayanan.trim().length < 10;
  const [errorDetil, setErrorDetil] = useState("");
  return (
    <div className="mt-5">
      <div className="my-5">
        <h2 className="text-lg">KPP {kpp.nama}</h2>
        <p className="text">
          Alamat {kpp.alamat}
          <br />
          {kpp.kota}
          <br />
          Telepon {kpp.telepon}
        </p>
      </div>
      {selectedLayanan ? (
        <>
          <h1 className="text-xl">Layanan yang dipilih</h1>
          <SelectedLayanan label={selectedLayanan.nama} />
          <div>
            <label className={errorDetil && `text-red-500`}>
              Detil kunjungan {errorDetil && `(${errorDetil})`}
            </label>
            <textarea
              className={`border p-2 w-full ${
                errorDetil ? `border-red-600` : `border-gray-200`
              }`}
              autoFocus
              value={detilLayanan}
              onChange={(e) => setDetilLayanan(e.target.value)}
              placeholder="Contoh: Konsultasi tarif pajak penghasilan untuk UMKM."
            />
          </div>
          <button
            className="py-2 px-4 rounded border border-gray-400"
            onClick={(e) => {
              e.preventDefault();
              setSelectedLayanan(null);
            }}
          >
            Pilih Layanan Lain
          </button>
          <button
            className={`py-2 ml-2 px-4 rounded bg-orange-500 text-white shadow `}
            onClick={(e) => {
              e.preventDefault();
              if (nextBtnIsDisabled) {
                setErrorDetil("Belum diisi atau terlalu pendek.");
              } else {
                onClickNextStep();
              }
            }}
          >
            Selanjutnya: Biodata
          </button>
        </>
      ) : (
        <>
          <h1 className="text-xl">Pilih Layanan</h1>
          {daftarLayanan.map((layanan) => (
            <Layanan
              key={layanan.id}
              label={layanan.nama}
              onClick={(e) => {
                e.preventDefault();
                setSelectedLayanan(layanan);
              }}
            />
          ))}
        </>
      )}
    </div>
  );
}
