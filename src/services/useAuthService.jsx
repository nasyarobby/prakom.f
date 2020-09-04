import { useHttpPost } from "./useAxios";

export default function useAuthService() {
  const { data, error, loading, send } = useHttpPost();
  return {
    data,
    error,
    loading,
    login: (username, password) => {
      return send("/api/login", { npwp: username, password });
    },
  };
}
