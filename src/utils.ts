export function getGSIInstance() {
  return typeof window !== "undefined" ? window?.google?.accounts : null;
}
