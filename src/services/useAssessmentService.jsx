import { useHttpGet, useHttpPost } from "./useAxios";

export function useGetAssessment() {
  const { data, error, loading, send } = useHttpGet();
  return {
    data,
    error,
    loading,
    get: (nik, date) => {
      return send("/api/assessment/" + nik, {
        params: {
          date,
        },
      });
    },
  };
}

export function usePostAssessment() {
  const { data, error, loading, send } = useHttpPost();
  return {
    data,
    error,
    loading,
    post: (nik, data, hasil) => {
      return send("/api/assessment", { nik, data, hasil });
    },
  };
}
