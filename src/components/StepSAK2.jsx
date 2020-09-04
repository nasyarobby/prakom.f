import React, { useState } from "react";
import { useGetAssessment } from "../services/useAssessmentService";
import { useEffect } from "react";
import Loading from "./Loading";
import StepSAK from "./StepSAK";

export default function Stepsak({
  nik,
  onClickPrevStep,
  onClickNextStep,
  setDataSak,
  dataSak,
  onFillingDone,
}) {
  const { data, get } = useGetAssessment();
  const [requested, setRequested] = useState(false);

  useEffect(() => {
    if (!requested) {
      get(nik);
      setRequested(true);
    }
  }, [requested, get, nik]);

  useEffect(() => {
    if (data && data.data.assessment.length > 0 && !dataSak) {
      const { hasil, data: dataSak } = data.data.assessment[0];
      setDataSak(hasil, dataSak);
    }
  });

  if (data) {
    if (data.data.assessment.length > 0) {
      return (
        <SudahIsiSak
          risiko={data.data.assessment[0].hasil}
          onClickPrevStep={onClickPrevStep}
          onClickNextStep={onClickNextStep}
        />
      );
    } else {
      return (
        <StepSAK
          onFillingDone={onFillingDone}
          onClickNextStep={onClickNextStep}
          onClickPrevStep={onClickPrevStep}
          nik={nik}
        />
      );
    }
  }

  return (
    <div className="my-16">
      <Loading label="Memuat data" />
    </div>
  );
}

export function SudahIsiSak({ onClickNextStep, onClickPrevStep, risiko }) {
  return (
    <>
      <div>
        SAK telah diisi. Hasil assessment kesehatan anda:{" "}
        <span className="font-bold">Risiko {risiko}</span>
      </div>
      {risiko !== "Rendah" && (
        <div>
          Anda belum dapat melakukan kunjungan ke KPP. Silakan gunakan Kring
          Pajak 1500200 atau layanan online di website www.pajak.go.id untuk
          mendapatkan layanan perpajakan.
        </div>
      )}

      {risiko === "Rendah" && (
        <div className="my-4">
          <button
            className="py-2 px-4 rounded border border-gray-400 underline text-blue-800"
            onClick={(e) => {
              e.preventDefault();
              onClickPrevStep();
            }}
          >
            Sebelumnya
          </button>
          <button
            className="py-2 ml-2 px-4 rounded bg-orange-500 text-white shadow"
            onClick={(e) => {
              e.preventDefault();
              onClickNextStep();
            }}
          >
            Langkah Selanjutya
          </button>
        </div>
      )}
    </>
  );
}
