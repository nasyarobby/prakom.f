import { useHttpPost } from "./useAxios";

export default function usePostLoket() {
  const { data, error, loading, send } = useHttpPost();
  return {
    data,
    error,
    loading,
    takeAntrian: (kpp, loket, nomorAntrian) => {
      return send(`/api/loket/${kpp}/${loket}/pilih-antrian`, {
        nomorAntrian,
      });
    },
    mulai: (kpp, loket) => {
      return send(`/api/loket/${kpp}/${loket}/mulai`);
    },
    selesai: (kpp, loket) => {
      return send(`/api/loket/${kpp}/${loket}/selesai`);
    },
    pilihBaru: (kpp, loket) => {
      return send(`/api/loket/${kpp}/${loket}/selesai2`);
    },
    kembalikanAntrian: (kpp, loket) => {
      return send(`/api/loket/${kpp}/${loket}/kembalikan-wp`);
    },
  };
}
