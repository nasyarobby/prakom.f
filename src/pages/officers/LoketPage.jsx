import React from "react";
import {
  useHistory,
  useParams,
  Switch,
  Route,
  useLocation,
  Redirect,
} from "react-router-dom";
import { useEffect } from "react";
import useGetLoket from "./../../services/useGetLoket";
import useGetLoketFree from "./../../services/useGetLoketFree";
import Skeleton from "react-loading-skeleton";
import DataTable from "../../components/DataTable";
import moment from "moment";
import "moment/locale/id";
import { formatAntrianNumber } from "../../components/AntrianDetail";
import Card from "../../components/Card";
import Dialog from "../../components/Dialog";
import { useState } from "react";
import usePostLoket from "../../services/usePostLoket";
import Timer from "../../components/Timer";
moment.locale("id");

export default function LoketPage({ user }) {
  const history = useHistory();
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/siap/loket" && user.kppKode)
      history.push("/siap/loket/" + user.kppKode);
  }, []);

  return (
    <>
      <div className="p-2">
        <div className="flex">
          <div className="p-2 rounded-t border-t border-l border-r">
            Daftar Loket
          </div>
          <div className="p-2 rounded-t border">Loket Aktif</div>
          <div className="flex-grow border-b"></div>
        </div>
      </div>
      <div>
        <Switch>
          <Route exact path="/siap/loket/:kpp">
            <LoketMonitor user={user} />
          </Route>
          <Route exact path="/siap/loket/:kpp/:nomor">
            <LoketApp user={user} />
          </Route>
        </Switch>
      </div>
    </>
  );
}

function LoketApp({ user }) {
  const { data, getLoket } = useGetLoket();
  const { kpp, nomor } = useParams();
  useEffect(() => {
    getLoket(kpp, nomor);
  }, []);

  if (data && data.data && data.data.loket) {
    if (
      data.data.loket.pegawai &&
      data.data.loket.pegawai.nipPendek === user.nipPendek
    ) {
      if (data.data.loket.antrian) {
        return (
          <ProsesAntrian
            kpp={kpp}
            nomorLoket={nomor}
            antrian={data.data.loket.antrian}
          />
        );
      } else {
        return (
          <div>
            Pilih Nomor Antrian
            <SelectAntrian kpp={kpp} nomor={nomor} />
          </div>
        );
      }
    } else return <Redirect to={"/siap/loket/" + user.kppKode} />;
  } else return <Skeleton count={5} />;
}

function ProsesAntrian({ kpp, nomorLoket, user, antrian }) {
  const [showKembaliWpDialog, setShowKembali] = useState(false);
  const kembalikanAntrian = usePostLoket();

  if (kembalikanAntrian.data) {
    window.location.reload();
  }

  return (
    <div className="flex">
      {
        <Dialog
          show={showKembaliWpDialog}
          title="Konfirmasi"
          body="Kembalikan Wajib Pajak ke antrian?"
          leftBtnLabel="Ya"
          rightBtnLabel="Batal"
          onClickLeftBtn={() =>
            kembalikanAntrian.kembalikanAntrian(kpp, nomorLoket)
          }
          onClickRightBtn={() => setShowKembali(false)}
        />
      }
      <div className="w-1/3">
        <div className="p-2">
          <button className="p-2 rounded shadow-md bg-blue-800 text-white w-full">
            Panggil
          </button>
        </div>
        <div className="p-2">
          <LayananControl
            kpp={kpp}
            nomorLoket={nomorLoket}
            waktuMulai={antrian.realMulai}
            waktuSelesai={antrian.realSelesai}
          />
        </div>
        <div className="p-2">
          <button
            className="p-2 rounded shadow-xl bg-orange-500 text-white w-full"
            onClick={(e) => {
              e.preventDefault();
              setShowKembali(true);
            }}
          >
            Kembalikan WP Ke Antrian
          </button>
        </div>
      </div>
      <div className="w-2/3">
        <div className="shadow p-2 border border-gray-400">
          <h1 className="text-2xl">Data Antrian</h1>
          {[
            {
              label: "Nomor Antrian",
              fn: (data) => {
                return formatAntrianNumber(data.id);
              },
            },
            {
              label: "NPWP",
              fn: (data) => {
                return data.npwp;
              },
            },
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
                moment(data.jadwalSelesai).format("dddd, DD MMMM YYYY HH:mm"),
            },
            {
              label: "Nama Layanan",
              name: "layanan",
              name2: "nama",
            },
            {
              label: "Detil Layanan",
              name: "detilLayanan",
            },
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
                    ? prop.fn(antrian)
                    : prop.name2
                    ? antrian[prop.name][prop.name2] || <em>Tidak tersedia</em>
                    : antrian[prop.name] || <em>Tidak tersedia</em>
                }
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

function LayananControl({ kpp, nomorLoket, waktuMulai, waktuSelesai }) {
  const { data: dataMulai, mulai } = usePostLoket();
  const { data: dataSelesai, selesai } = usePostLoket();
  const { data: dataBaru, pilihBaru } = usePostLoket();
  const [showDialogMulai, setShowDialogMulai] = useState(false);
  const [showDialogSelesai, setShowDialogSelesai] = useState(false);
  const [showDialogBaru, setShowDialogBaru] = useState(false);
  const [_waktuMulai, setWaktuMulai] = useState(waktuMulai);
  const [_waktuSelesai, setWaktuSelesai] = useState(waktuSelesai);

  useEffect(() => {
    if (dataMulai) {
      setWaktuMulai(dataMulai.data.loket.antrian.realMulai);
    }
  }, [dataMulai]);

  useEffect(() => {
    if (dataSelesai) {
      setWaktuSelesai(dataSelesai.data.loket.antrian.realSelesai);
    }
  }, [dataSelesai]);

  if (dataBaru) {
    window.location.reload();
  }

  if (_waktuMulai && _waktuSelesai) {
    return (
      <>
        <Dialog
          show={showDialogBaru}
          title="Konfirmasi"
          body="Pilih antrian baru?"
          rightBtnLabel="Batal"
          leftBtnLabel="Ya"
          onClickLeftBtn={(e) => pilihBaru(kpp, nomorLoket)}
          onClickRightBtn={(e) => setShowDialogBaru(false)}
        />
        <Card
          label={"Waktu Mulai"}
          value={
            moment(_waktuMulai).format("dddd, DD MMMM YYYY HH:mm") ||
            "Belum mulai"
          }
        />
        <Card
          label={"Waktu Selesai"}
          value={
            moment(_waktuSelesai).format("dddd, DD MMMM YYYY HH:mm") ||
            "Belum mulai"
          }
        />
        <Card
          label={"Durasi"}
          value={
            <Timer
              seconds={
                moment(_waktuSelesai).unix() - moment(_waktuMulai).unix()
              }
              start={false}
            />
          }
        />
        <button
          className="p-2 rounded shadow-md bg-blue-800 text-white w-full"
          onClick={(e) => setShowDialogBaru(true)}
        >
          Pilih Antrian Lain
        </button>
      </>
    );
  } else if (_waktuMulai) {
    return (
      <>
        <Dialog
          show={showDialogSelesai}
          title="Konfirmasi"
          body="Apakah anda ingin menyelesaikan layanan?"
          rightBtnLabel="Batal"
          leftBtnLabel="Selesai"
          onClickLeftBtn={(e) => selesai(kpp, nomorLoket)}
          onClickRightBtn={(e) => setShowDialogSelesai(false)}
        />
        <Card
          label={"Waktu Mulai"}
          value={
            moment(_waktuMulai).format("dddd, DD MMMM YYYY HH:mm") ||
            "Belum mulai"
          }
        />
        <Card
          label={"Durasi"}
          value={
            <Timer seconds={moment().unix() - moment(_waktuMulai).unix()} />
          }
        />
        <button
          className="p-2 rounded shadow-md bg-orange-500 text-white w-full"
          onClick={(e) => setShowDialogSelesai(true)}
        >
          Selesai
        </button>
      </>
    );
  } else {
    return (
      <>
        <Dialog
          show={showDialogMulai}
          title="Konfirmasi"
          body="Mulai layanan?"
          rightBtnLabel="Batal"
          leftBtnLabel="Mulai"
          onClickLeftBtn={(e) => mulai(kpp, nomorLoket)}
          onClickRightBtn={(e) => setShowDialogMulai(false)}
        />
        <button
          className="p-2 rounded shadow-md bg-blue-800 text-white w-full"
          onClick={(e) => setShowDialogMulai(true)}
        >
          Mulai Layanan
        </button>
      </>
    );
  }
}

function SelectAntrian({ kpp, nomor }) {
  const { data, getLoket } = useGetLoketFree();
  const [antrian, setAntrian] = useState(null);

  const ambilAntrian = usePostLoket();

  useEffect(() => {
    getLoket();
  }, []);

  if (ambilAntrian.data) {
    window.location.reload();
  }

  if (data) {
    return (
      <>
        <Dialog
          show={antrian}
          title="Konfirmasi"
          body="Pilih antrian untuk diproses di loket?"
          leftBtnLabel="Pilih"
          rightBtnLabel="Batal"
          onClickLeftBtn={(e) =>
            antrian ? ambilAntrian.takeAntrian(kpp, nomor, antrian.id) : false
          }
          onClickRightBtn={(e) => setAntrian(null)}
        />

        {data.data.antrian
          .reduce((arr, ant) => {
            const find = arr.filter(
              (a) => a.waktu === moment(ant.jadwalMulai).unix()
            );
            if (find.length > 0) {
              find[0].jadwalMulai = ant.jadwalMulai;
              find[0].jadwalSelesai = ant.jadwalSelesai;
              find[0].data.push(ant);
            } else {
              arr.push({
                waktu: moment(ant.jadwalMulai).unix(),
                jadwalMulai: ant.jadwalMulai,
                jadwalSelesai: ant.jadwalSelesai,
                data: [ant],
              });
            }
            return arr;
          }, [])
          .sort((a, b) => a.waktu - b.waktu)
          .map((data) => {
            return (
              <div className="my-5">
                <h1>
                  {moment(data.jadwalMulai).format("dddd, DD MMMM YYYY HH:mm") +
                    " s.d. " +
                    moment(data.jadwalSelesai).format("HH:mm")}
                </h1>
                <DataTable
                  tableClassName="withborder w-full"
                  headers={[
                    "Nomor",
                    "NPWP",
                    "Wajib Pajak",
                    "Nama Tamu",
                    "NIK",
                    "Layanan",
                    "Waktu Datang",
                    "Aksi",
                  ]}
                  src={data.data.map((ant) => {
                    return [
                      ant.id,
                      ant.npwp,
                      ant.namaWp,
                      ant.nama,
                      ant.nik,
                      ant.layanan.nama,
                      {
                        rawValue: moment(ant.waktuKedatangan).unix(),
                        value: moment(ant.waktuKedatangan).format(
                          "dddd, DD MMMM YYYY HH:mm"
                        ),
                      },
                      {
                        sortable: false,
                        value: (
                          <button
                            className="p-1 px-3 text-sm bg-orange-600 text-white shadow-xl rounded"
                            onClick={(e) => setAntrian(ant)}
                          >
                            Pilih
                          </button>
                        ),
                      },
                    ];
                  })}
                />
              </div>
            );
          })}
      </>
    );
  } else {
    return <Skeleton count={5} />;
  }
}

function LoketMonitor({ user }) {
  const { data, getLoket } = useGetLoket();
  const { kpp, loket } = useParams();

  useEffect(() => {
    getLoket(kpp);
  }, []);

  if (data)
    return (
      <div className="p-5">
        {data.data.loket.filter((loket) => loket.nip === user.nipPendek)
          .length ? (
          <div className="p-2 bg-green-200 border border-green-800">
            Anda saat ini berada di loket{" "}
            {data.data.loket
              .filter((loket) => loket.nip === user.nipPendek)
              .map((loket) => loket.nomor)
              .join(", ")}
            . Klik tab Loket Aktif untuk membuka menu loket.
          </div>
        ) : (
          <div className="p-2 bg-green-200 border border-green-800">
            Anda saat ini tidak berada di loket manapun.
          </div>
        )}
        {data.data.loket.map((loket) => {
          return <Loket nomor={loket.nomor} pegawai={loket.pegawai} />;
        })}
      </div>
    );
  return <Skeleton count={5} />;
}

function Loket({ nomor, pegawai }) {
  return (
    <div className="my-2 py-5 px-4 shadow-xl flex items-center">
      <div className="text-3xl rounded-full w-12 h-12 bg-blue-800 text-white text-center">
        {nomor}
      </div>
      <div className="flex items-center flex-grow justify-between">
        <div className="pl-5">
          <div>
            Status:{" "}
            <span className="font-semibold">
              {pegawai ? "Sedang melayani" : "Tutup"}
            </span>
          </div>
        </div>
        <div className="pl-5 ">
          {pegawai ? (
            <div>
              {pegawai.nama} / {pegawai.nipPanjang}
            </div>
          ) : (
            <button className="rounded px-5 py-2 bg-orange-600 text-white">
              Tempati Loket
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
