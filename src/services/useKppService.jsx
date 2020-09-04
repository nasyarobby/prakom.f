import { useHttpGet } from "./useAxios";

export default function useKppService() {
  const { data, error, loading, send } = useHttpGet();
  return {
    data,
    error,
    loading,
    getKpp: (kode) => {
      return send("/kpp/" + kode);
    },
  };
}
