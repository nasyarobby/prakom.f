import React from "react";
import { useParams } from "react-router-dom";
import { decode } from "jsonwebtoken";
import QRCode from "qrcode.react";
import Skeleton from "react-loading-skeleton";
import useGetAntrian from "../services/useGetAntrian";
import { useState } from "react";
import moment from "moment";
import "moment/locale/id";
moment.locale("id");

export function pad(n, width, z) {
  z = z || "0";
  n = n + "";
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}
export function formatAntrianNumber(id) {
  return "2020" + pad(id, 7);
}

export default function AntrianDetail() {
  const { jwt } = useParams();
  const data = decode(jwt);
  const { id, npwp, kode, kpp } = data;
  const { data: dataGetAntrian, getAntrian } = useGetAntrian();
  const [flag, setFlag] = useState(false);

  if (!flag) {
    getAntrian(jwt);
    setFlag(true);
  }

  if (dataGetAntrian) {
    return (
      <KartuAntrian
        qr={jwt}
        nomor={"2020" + pad(id, 7)}
        kode={kode}
        npwp={npwp}
        kodeKpp={kpp}
        {...dataGetAntrian.data}
        jadwal={
          moment(dataGetAntrian.data.jadwalMulai).format(
            "dddd, DD MMMM YYYY HH:mm"
          ) +
          " s.d. " +
          moment(dataGetAntrian.data.jadwalSelesai).format("HH:mm")
        }
      />
    );
  }
  return <KartuAntrian qr={jwt} loading />;
}

export function KartuAntrian({
  loading = false,
  qr,
  nomor,
  kode,
  namaWp,
  npwp,
  nama,
  nik,
  layanan,
  jadwal,
  kpp,
}) {
  return (
    <div className="p-5 rounded shadow-lg">
      <h1 className="text-center mb-5">Nomor Antrian Kunjungan Wajib Pajak</h1>
      <div className="flex flex-col md:flex-row">
        <div className="mt-2 text-center mx-auto">
          <QRCode value={qr} />
          <div>Nomor: {loading ? <Skeleton width="20200000000" /> : nomor}</div>
          <div>Kode: {loading ? <Skeleton width="10" /> : kode}</div>
        </div>
        <div className="pl-5 text-center w-full">
          {loading ? (
            <>
              <div>
                <Skeleton count={1} height={40} />
                <Skeleton count={3} />
              </div>
              <div className="my-2">
                <Skeleton count={2} />
              </div>
              <div>
                <Skeleton count={2} />
              </div>
            </>
          ) : (
            <>
              <div>
                <h2 className="text-xl font-bold">{namaWp}</h2>
                <h3 className="text">{npwp}</h3>
                <h2 className="text">{nama}</h2>
                <h3 className="text">No ID: {nik}</h3>
              </div>
              <div className="my-2">
                <h2 className="text-lg">{layanan.nama}</h2>
                <h3 className="text-">{jadwal}</h3>
              </div>
              <div>
                <h2 className="text-lg">
                  {kpp.nama} / {kpp.kode}
                </h2>
                <h3 className="text">{kpp.alamat}</h3>
                <h3 className="text">{kpp.kota}</h3>
                <h3 className="text">{kpp.telepon}</h3>
              </div>
            </>
          )}
        </div>
      </div>
      <div class="border border-gray-600 p-2 text-xs my-2">
        Harap datang 10 menit sebelum waktu kunjungan, dan membawa kartu
        identitas sesuai data yang telah didaftarkan. Apabila anda merupakan
        kuasa wajib pajak, siapkan dan bawa surat kuasa.
      </div>
    </div>
  );
}
