import { useHttpGet } from "./useAxios";

export default function useGetLoket() {
  const { data, error, loading, send } = useHttpGet();
  return {
    data,
    error,
    loading,
    getLoket: (kpp, loket = null) => {
      if (loket) return send("/api/loket/" + kpp + "/" + loket);
      else return send("/api/loket/" + kpp);
    },
  };
}
