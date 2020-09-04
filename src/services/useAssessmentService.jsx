import { useHttpGet, useHttpPost } from "./useAxios";
export const antrianConfig = {
  baseURL: "http://localhost:8181",
};

export function useGetAssessment() {
  const { data, error, loading, send } = useHttpGet(antrianConfig);
  return {
    data,
    error,
    loading,
    get: (nik, date) => {
      return send("/assessment/" + nik, {
        params: {
          date,
        },
      });
    },
  };
}

export function usePostAssessment() {
  const { data, error, loading, send } = useHttpPost(antrianConfig);
  return {
    data,
    error,
    loading,
    post: (nik, data, hasil) => {
      return send("/assessment", { nik, data, hasil });
    },
  };
}
