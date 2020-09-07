import { useHttpGet } from "./useAxios";

export default function useGetAntrian() {
  const { data, error, loading, send } = useHttpGet();
  return {
    data,
    error,
    loading,
    getAntrian: (token, kode = null, kpp = null) => {
      if (token && kode && kpp)
        return send("/api/antrian", {
          params: {
            id: token,
            kode,
            kpp,
          },
        });
      else return send("/api/antrian?token=" + token);
    },
    getAntrianUpcoming: () => {
      return send("/api/antrian/upcoming");
    },
    getAntrianPast: () => {
      return send("/api/antrian/past");
    },
    getAntrianSlot: (kpp, tanggal) => {
      return send("/api/antrian/slot", {
        params: {
          tanggal,
          kpp,
        },
      });
    },
  };
}
