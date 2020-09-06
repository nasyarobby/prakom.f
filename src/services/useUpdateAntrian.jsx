import { useHttpPost } from "./useAxios";

export default function useUpdateAntrian() {
  const { data, error, loading, send } = useHttpPost();
  return {
    data,
    error,
    loading,
    update: (id, kode, data) => {
      return send("/api/antrian/update", {
        id,
        kode,
        data,
      });
    },
  };
}
