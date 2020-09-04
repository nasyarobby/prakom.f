import { useHttpGet } from "./useAxios";
import { antrianConfig } from "./useAssessmentService";

export default function useKppService() {
  const { data, error, loading, send } = useHttpGet(antrianConfig);
  return {
    data,
    error,
    loading,
    getKpp: (kode) => {
      return send("/kpp/" + kode);
    },
  };
}
