import { useHttpGet } from "./useAxios";

export default function useLayananService() {
  const { data, error, loading, send } = useHttpGet();
  return {
    data,
    error,
    loading,
    getLayanan: () => {
      return send("/api/layanan");
    },
  };
}
