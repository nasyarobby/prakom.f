export function formatNpwp(npwp) {
  const _npwp = npwp.trim();
  return (
    _npwp.substring(0, 2) +
    "." +
    _npwp.substring(2, 5) +
    "." +
    _npwp.substring(5, 8) +
    "." +
    _npwp.substring(8, 9) +
    "-" +
    _npwp.substring(9, 12) +
    "." +
    _npwp.substring(12, 15)
  );
}
