import React from "react";
import { formatNpwp } from "../libs/formatter";

export default function Stepreview({
  namaWp,
  npwp,
  pengunjung,
  sak,
  kpp,
  layanan,
  detilLayanan,
  jadwalKunjungan,
  onClickNextStep,
  onClickPrevStep,
}) {
  return (
    <div className="mt-5">
      <h1 className="text-xl">Review</h1>
      <div className="p-2 shadow-md ">
        <Card label="Nama Wajib Pajak" value={namaWp} />
        <Card label="NPWP" value={formatNpwp(npwp)} />
        <Card label="Nama Pengunjung" value={pengunjung.nama} />
        <Card label="Nomor Identitas Pengunjung" value={pengunjung.nik} />
        <Card label="Email Pengunjung" value={pengunjung.email} />
        <Card label="Nomor Telepon / Handphone" value={pengunjung.telp} />
        <Card label="Hasil Penilaian Kesehatan Mandiri" value={sak} />
        <Card label="KPP" value={kpp.nama} />
        <Card label="Alamat KPP" value={kpp.alamat} />
        <Card label="Tujuan Kunjungan" value={layanan} />
        <Card label="Detil Kunjungan" value={detilLayanan} />
        <Card label="Jadwal Kunjungan" value={jadwalKunjungan} />
      </div>
      <div className="mt-10">
        <button
          className="py-2 px-4 rounded border border-gray-400"
          onClick={(e) => {
            e.preventDefault();
            onClickPrevStep();
          }}
        >
          Kembali: Pilih Tanggal Kunjungan
        </button>
        <button
          className="py-2 ml-2 px-4 rounded bg-orange-500 text-white shadow"
          onClick={(e) => {
            e.preventDefault();
            onClickNextStep();
          }}
        >
          Buat Jadwal Kunjungan
        </button>
      </div>
    </div>
  );
}

function Card({ label, value }) {
  return (
    <div className="my-2">
      <div className="text-sm text-gray-600">{label}</div>
      <div className="font-semibold text-gray-800">{value}</div>
    </div>
  );
}
