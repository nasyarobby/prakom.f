import { useHttpGet } from "./useAxios";

export default function useGetLoketFree() {
  const { data, error, loading, send } = useHttpGet();
  return {
    data,
    error,
    loading,
    getLoket: () => {
      return send("/api/antrian-kpp");
    },
  };
}
