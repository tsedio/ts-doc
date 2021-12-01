export function trim(str: any) {
  return str
    .split("\n")
    .map((s: any) => s.trim())
    .join("");
}
