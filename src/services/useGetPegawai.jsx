import { useHttpGet } from "./useAxios";

export default function useGetPegawai() {
  const { data, error, loading, send } = useHttpGet();
  return {
    data,
    error,
    loading,
    getByNip: (nip) => {
      return send("/api/pegawai/nip/" + nip);
    },
  };
}
