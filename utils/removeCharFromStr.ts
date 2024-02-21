export default function removeCharFromStr(str: string, pos: number) {
  return str.slice(0, pos) + str.slice(pos + 1);
}
