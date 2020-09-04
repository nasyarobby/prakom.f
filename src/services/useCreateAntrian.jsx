import { antrianConfig } from "./useAssessmentService";
import { useHttpPost } from "./useAxios";

function useCreateAntrian(props) {
  const { data, error, loading, send } = useHttpPost(antrianConfig);
  return {
    data,
    error,
    loading,
    post: (
      namaWp,
      npwp,
      nik,
      nama,
      telepon,
      email,
      kodeKpp,
      jadwalMulai,
      jadwalSelesai,
      layananId,
      detilLayanan
    ) => {
      return send("/antrian", {
        namaWp,
        npwp,
        nik,
        nama,
        telepon,
        email,
        kodeKpp,
        jadwalMulai,
        jadwalSelesai,
        layananId,
        detilLayanan,
      });
    },
  };
}

export default useCreateAntrian;
