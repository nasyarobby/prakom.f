import { useHttpGet } from "./useAxios";
import { antrianConfig } from "./useAssessmentService";

export default function useLayananService() {
  const { data, error, loading, send } = useHttpGet(antrianConfig);
  return {
    data,
    error,
    loading,
    getLayanan: () => {
      return send("/layanan");
    },
  };
}
