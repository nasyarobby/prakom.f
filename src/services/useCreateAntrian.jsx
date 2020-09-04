import { useHttpPost } from "./useAxios";

function useCreateAntrian(props) {
  const { data, error, loading, send } = useHttpPost();
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
      return send("/api/antrian", {
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
