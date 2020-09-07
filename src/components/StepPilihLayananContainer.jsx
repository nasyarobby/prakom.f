import React, { useState } from "react";
import useKppService from "../services/useKppService";
import { useEffect } from "react";
import Loading from "./Loading";
import StepPilihLayanan from "./StepPilihLayanan";
import useLayananService from "../services/useLayananService";

export default function Steppilihlayanancontainer({
  kpp,
  setKpp,
  kodeKpp,
  setSelectedLayanan,
  selectedLayanan,
  onClickNextStep,
  onClickPrevStep,
  setDetilLayanan,
  detilLayanan,
}) {
  const [isFetchingLayanan, setIsFetchingLayanan] = useState(false);
  const { data, getKpp } = useKppService();
  const { data: layanan, getLayanan } = useLayananService();
  useEffect(() => {
    if (data && !kpp) {
      setKpp(data.data.kpp);
    } else if (!data) {
      getKpp(kodeKpp);
    }
  }, [data, kpp, setKpp, getKpp, kodeKpp]);

  useEffect(() => {
    if (!isFetchingLayanan) {
      getLayanan();
      setIsFetchingLayanan(true);
    }
  }, [isFetchingLayanan, setIsFetchingLayanan, getLayanan]);

  if (data && kpp && layanan) {
    return (
      <StepPilihLayanan
        kpp={kpp}
        setSelectedLayanan={setSelectedLayanan}
        selectedLayanan={selectedLayanan}
        daftarLayanan={layanan.data.layanan}
        onClickNextStep={onClickNextStep}
        onClickPrevStep={onClickPrevStep}
        setDetilLayanan={setDetilLayanan}
        detilLayanan={detilLayanan}
      />
    );
  }

  return (
    <>
      <Loading />
    </>
  );
}
