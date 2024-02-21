export default function addCharToStr(str: string, pos: number, char: string) {
  return str.slice(0, pos) + char + str.slice(pos);
}
