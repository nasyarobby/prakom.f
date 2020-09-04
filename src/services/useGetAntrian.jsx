import { useHttpGet } from "./useAxios";

export default function useGetAntrian() {
  const { data, error, loading, send } = useHttpGet();
  return {
    data,
    error,
    loading,
    getAntrian: (token) => {
      return send("/antrian?token=" + token);
    },
    getAntrianUpcoming: () => {
      return send("/antrian/upcoming");
    },
    getAntrianPast: () => {
      return send("/antrian/past");
    },
  };
}
