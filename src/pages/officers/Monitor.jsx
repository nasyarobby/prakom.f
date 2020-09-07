import React, { useEffect } from "react";
import LogoDjp from "./../../assets/logo-baku-monokromatik-putih.png";
import useGetLoket from "../../services/useGetLoket";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import { formatAntrianNumber } from "../../components/AntrianDetail";
import Timer from "../../components/Timer";
import moment from "moment";
import { ImSad, ImNeutral, ImSmile } from "react-icons/im";
import useUpdateAntrian from "../../services/useUpdateAntrian";
export default function Monitor() {
  const { data, getLoket } = useGetLoket();
  const { kpp, nomorloket } = useParams();
  const { data: dataUpdate, loading, update } = useUpdateAntrian();

  useEffect(() => {
    const interval = setInterval(() => {
      getLoket(kpp, nomorloket);
    }, 1000);
    return (e) => clearInterval(interval);
  });

  if (dataUpdate && data.data.loket.nomorAntrian) {
    return (
      <div className="bg-blue-800 left-0 top-0 w-screen h-screen fixed text-white p-5">
        <div className="flex items-center">
          <div className="mr-5">
            <img src={LogoDjp} width="60" />
          </div>
          <div>
            <div className="uppercase font-semibold text-2xl">
              Direktorat Jenderal Pajak
            </div>
            <div className="uppercase font-semibold text-3xl">
              KPP {data.data.loket.kpp.nama}
            </div>
          </div>
        </div>
        <div className="text-center text-3xl my-10">
          Terima kasih atas penilaian anda.
        </div>
      </div>
    );
  }

  if (data)
    return (
      <div className="bg-blue-800 left-0 top-0 w-screen h-screen fixed text-white p-5">
        <div className="flex items-center">
          <div className="mr-5">
            <img src={LogoDjp} width="60" />
          </div>
          <div>
            <div className="uppercase font-semibold text-2xl">
              Direktorat Jenderal Pajak
            </div>
            <div className="uppercase font-semibold text-3xl">
              KPP {data.data.loket.kpp.nama}
            </div>
          </div>
        </div>
        {data.data.loket.antrian && data.data.loket.antrian.realSelesai && (
          <div className="text-center text-3xl my-10">
            Apakah anda puas
            <br />
            dengan pelayanan kami?
          </div>
        )}

        <div className="flex items-center content-center">
          {data.data.loket.antrian && data.data.loket.antrian.realSelesai ? (
            <>
              <div className="text-6xl flex w-full justify-center">
                <div
                  className="text-center mx-10"
                  onClick={(e) =>
                    update(
                      data.data.loket.nomorAntrian,
                      data.data.loket.antrian.kode,
                      {
                        evaluasi: 1,
                      }
                    )
                  }
                >
                  <ImSad />
                </div>
                <div
                  className="text-center mx-10"
                  onClick={(e) =>
                    update(
                      data.data.loket.nomorAntrian,
                      data.data.loket.antrian.kode,
                      {
                        evaluasi: 2,
                      }
                    )
                  }
                >
                  <ImNeutral />
                </div>
                <div
                  className="text-center mx-10"
                  onClick={(e) =>
                    update(
                      data.data.loket.nomorAntrian,
                      data.data.loket.antrian.kode,
                      {
                        evaluasi: 3,
                      }
                    )
                  }
                >
                  <ImSmile />
                </div>
              </div>
            </>
          ) : (
            <>
              <div
                style={{ fontSize: "24em", lineHeight: "1em" }}
                className="text-orange-400"
              >
                3
              </div>
              <div className="flex-grow text-center">
                {data.data.loket.pegawai ? (
                  <>
                    <div>
                      <div className="text-3xl">Petugas</div>
                      <div className="text-5xl">
                        {data.data.loket.pegawai.nama}
                      </div>
                    </div>
                    <div
                      className={!data.data.loket.nomorAntrian && `invisible`}
                    >
                      <div className="text-3xl">Nomor Antrian</div>
                      <div className="text-5xl">
                        {data.data.loket.nomorAntrian
                          ? formatAntrianNumber(data.data.loket.nomorAntrian)
                          : " "}
                      </div>
                    </div>
                    {data.data.loket.antrian &&
                      data.data.loket.antrian.realMulai && (
                        <div>
                          <div className="text-3xl">Durasi Layanan</div>
                          <div className="text-5xl">
                            <Timer
                              seconds={
                                moment().unix() -
                                moment(data.data.loket.antrian.realMulai).unix()
                              }
                            />
                          </div>
                        </div>
                      )}
                  </>
                ) : (
                  <div className="text-6xl">Tutup</div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    );

  return <Loading />;
}
