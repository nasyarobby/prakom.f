import React, { useState } from "react";
import Input from "./Input";
import { decode } from "jsonwebtoken";
import moment from "moment";
import "moment/locale/id";
import useGetAntrian from "../services/useGetAntrian";
import { formatAntrianNumber } from "./AntrianDetail";
import Card from "./Card";
import { useParams, Switch, Route, useHistory } from "react-router-dom";
import { useEffect } from "react";
import useUpdateAntrian from "../services/useUpdateAntrian";
import QrReader from "react-qr-reader";
moment.locale("id");

export default function Registrasiulangwp({ user }) {
  const [id, setId] = useState("");
  const [kode, setKode] = useState("");
  const [qrData, setQrData] = useState("");
  const [camera, setCamera] = useState("environment");
  const [readyToCheck, setReadyToCheck] = useState(true);
  const history = useHistory();
  const toggleCamera = () => {
    setCamera((cam) => (cam === "environment" ? "user" : "environment"));
  };

  const handleScan = (data) => {
    if (data) {
      const decoded = decode(data);
      console.log(decoded);
      setQrData(data);
      setId(decoded.id);
      setKode(decoded.kode);
      history.push("/siap/registrasi-ulang/" + id + "/" + kode);
    }
  };
  const handleError = (err) => {
    console.error(err);
  };

  const onChangeId = (e) => {
    setId(e.target.value.trim());
  };
  const onChangeKode = (e) => {
    const value = e.target.value;
    if (value.length <= 6) setKode(value);
  };

  if (kode.length === 6 && id.length > 0 && readyToCheck) {
    setReadyToCheck(false);
    console.log("hello");
    history.push("/siap/registrasi-ulang/" + id + "/" + kode);
  }

  if (kode.length < 6 && readyToCheck === false) {
    setReadyToCheck(true);
  }

  return (
    <div className="flex">
      <div className="w-1/3">
        <QrReader
          delay={100}
          onError={handleError}
          onScan={handleScan}
          style={{ width: "100%" }}
          facingMode={camera || "environment"}
        />
        <button onClick={() => toggleCamera()} className="p-2 w-full">
          Ganti Kamera
        </button>
        <Input
          type="number"
          label="Nomor antrian"
          name="id"
          onChange={onChangeId}
          value={id}
        />
        <Input
          type="number"
          label="Kode"
          name="kode"
          onChange={onChangeKode}
          value={kode}
        />
      </div>
      <div className="w-2/3 p-5">
        <Switch>
          <Route path="/siap/registrasi-ulang/:id/:kode">
            <DataAntrianFetcher kodeKpp={user.kppKode} />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

function DataAntrianFetcher({ kodeKpp }) {
  const { id, kode } = useParams();
  const { loading, data, getAntrian } = useGetAntrian();
  const { data: dataUpdate, update } = useUpdateAntrian();

  useEffect(() => {
    getAntrian(
      id.startsWith("2020") && id.length === 11 ? id.substr(5) : id,
      kode,
      kodeKpp
    );
  }, [id, kode]);

  useEffect(() => {
    if (dataUpdate && dataUpdate.status === "success") {
      getAntrian(id, kode, kodeKpp);
    }
  }, [dataUpdate]);

  return (
    <div>
      {data &&
        (data.data ? (
          <>
            {data.data.waktuKedatangan && (
              <div className="p-2 border border-green-800 bg-green-200 my-2">
                Nomor antrian telah berhasil diregistrasi ulang. Persilakan
                Wajib Pajak untuk menunggu giliran untuk dipanggil ke loket yang
                akan ditentukan.
              </div>
            )}
            <div className="shadow p-2 border border-gray-400">
              <h1 className="text-2xl">Data Antrian</h1>
              {[
                {
                  label: "Nomor Antrian",
                  fn: (data) => {
                    return formatAntrianNumber(data.id);
                  },
                },
                { label: "NPWP", name: "npwp" },
                { label: "Nama Wajib Pajak", name: "namaWp" },
                { label: "Nama Tamu", name: "nama" },
                { label: "Nomor Identitas", name: "nik" },
                { label: "Email", name: "email" },
                { label: "Nomor Telepon", name: "telepon" },
                {
                  label: "Jadwal Kunjungan",
                  fn: (data) =>
                    moment(data.jadwalMulai).format("dddd, DD MMMM YYYY HH:mm"),
                },
                {
                  label: "Jadwal Kunjungan Selesai",
                  fn: (data) =>
                    moment(data.jadwalSelesai).format(
                      "dddd, DD MMMM YYYY HH:mm"
                    ),
                },
                {
                  label: "Detil Layanan",
                  name: "layanan",
                  name2: "nama",
                },
                { label: "Nama KPP", name: "kpp", name2: "nama" },
                { label: "Alamat KPP", name: "kpp", name2: "alamat" },
                { label: "Kota KPP", name: "kpp", name2: "kota" },
                { label: "Kode KPP", name: "kpp", name2: "kode" },
                {
                  label: "Waktu Kedatangan",
                  fn: (data) =>
                    data.waktuKedatangan ? (
                      moment(data.waktuKedatangan).format(
                        "dddd, DD MMMM YYYY HH:mm"
                      )
                    ) : (
                      <em>Belum tercatat</em>
                    ),
                },
              ].map((prop) => {
                return (
                  <Card
                    label={prop.label}
                    value={
                      prop.fn
                        ? prop.fn(data.data)
                        : prop.name2
                        ? data.data[prop.name][prop.name2] || (
                            <em>Tidak tersedia</em>
                          )
                        : data.data[prop.name] || <em>Tidak tersedia</em>
                    }
                  />
                );
              })}
            </div>
            <div className="my-2">
              {data.data.waktuKedatangan ? null : (
                <button
                  className="p-2 bg-orange-600 text-white rounded"
                  onClick={(e) => {
                    update(id, kode, {
                      waktuKedatangan: moment().toISOString(),
                    });
                  }}
                >
                  Registrasi Kedatangan
                </button>
              )}
            </div>
          </>
        ) : (
          <div className="p-2 border border-red-800 bg-yellow-200">
            Data antrian tidak dapat ditemukan atau kode verifikasi salah.
          </div>
        ))}
    </div>
  );
}
