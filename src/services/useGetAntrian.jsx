import { useHttpGet } from "./useAxios";

export default function useGetAntrian() {
  const { data, error, loading, send } = useHttpGet();
  return {
    data,
    error,
    loading,
    getAntrian: (token) => {
      return send("/api/antrian?token=" + token);
    },
    getAntrianUpcoming: () => {
      return send("/api/antrian/upcoming");
    },
    getAntrianPast: () => {
      return send("/api/antrian/past");
    },
  };
}
