import React, { useState } from "react";
import StepIsiBiodata from "./StepIsiBiodata";
import StepPilihTanggal from "./StepPilihTanggal";
import StepSAK from "./StepSAK2";
import Stepreview from "./StepReview";
import { useContext } from "react";
import { AppContext } from "../App";
import moment from "moment";
import "moment/locale/id";
import Steppilihlayanancontainer from "./StepPilihLayananContainer";
import useCreateAntrian from "../services/useCreateAntrian";
import Loading from "./Loading";
import Overlayloading from "./OverlayLoading";
import { Redirect } from "react-router-dom";
moment.locale("id");

export default function WizardAntrian() {
  const { user } = useContext(AppContext);

  const [step, setStep] = useState(0);

  const [selectedLayanan, setSelectedLayanan] = useState();
  const [detilLayanan, setDetilLayanan] = useState("");
  const [pengunjung, setPengunjung] = useState({
    status: "pengurus",
    nama: "",
    nik: "",
    telp: "",
    email: "",
  });
  const [dataSak, setDataSak] = useState({});
  const [selectedVisitTime, setSelectedVisitTime] = useState({});
  const [kpp, setKpp] = useState(null);
  const { data, loading, post } = useCreateAntrian();

  if (data) {
    return <Redirect to={"/antrian/result/" + data.data.qr} />;
  }

  if (loading) {
    return <Overlayloading label="Memproses data..." />;
  }

  return (
    <>
      {step === 0 && (
        <Steppilihlayanancontainer
          setSelectedLayanan={setSelectedLayanan}
          selectedLayanan={selectedLayanan}
          onClickNextStep={() => setStep(1)}
          setDetilLayanan={setDetilLayanan}
          detilLayanan={detilLayanan}
          kpp={kpp}
          setKpp={setKpp}
          kodeKpp={user.kodeKppAdm}
        />
      )}
      {step === 1 && (
        <StepIsiBiodata
          onClickNextStep={() => setStep(2)}
          onClickPrevStep={() => setStep(0)}
          pengunjung={pengunjung}
          setPengunjung={setPengunjung}
        />
      )}

      {step === 2 && (
        <StepSAK
          onClickNextStep={() => setStep(3)}
          onClickPrevStep={() => setStep(1)}
          setDataSak={(risk, data) => {
            setDataSak({ risk, data });
          }}
          dataSak={dataSak}
          nik={pengunjung.nik}
          onFillingDone={(risk, data) => setDataSak({ risk, data })}
        />
      )}
      {step === 3 && (
        <StepPilihTanggal
          setSelectedVisitTime={setSelectedVisitTime}
          selectedVisitTime={selectedVisitTime}
          onClickNextStep={() => setStep(4)}
          onClickPrevStep={() => setStep(2)}
        />
      )}
      {step === 4 && (
        <Stepreview
          onClickNextStep={() => {
            post(
              user.nama,
              user.npwp,
              pengunjung.nik,
              pengunjung.nama,
              pengunjung.telp,
              pengunjung.email,
              user.kodeKppAdm,
              selectedVisitTime.start,
              selectedVisitTime.end,
              1,
              detilLayanan
            );
          }}
          onClickPrevStep={() => setStep(3)}
          pengunjung={pengunjung}
          layanan={selectedLayanan.label}
          detilLayanan={detilLayanan}
          sak={`Risiko ${dataSak.risk}`}
          kpp={{ ...kpp, alamat: kpp.alamat + " Kota " + kpp.kota }}
          jadwalKunjungan={
            moment(selectedVisitTime.start).format(
              "dddd, DD MMMM YYYY HH:mm:ss"
            ) +
            " s.d." +
            moment(selectedVisitTime.end).format("HH:mm:ss")
          }
          npwp={user.npwp}
          namaWp={user.nama}
        />
      )}
    </>
  );
}
