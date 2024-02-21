export const swapCharsInStr = (str: string, pos1: number, pos2: number) => {
  const char1 = str[pos1];
  const char2 = str[pos2];
  return (
    str.slice(0, pos1) +
    char2 +
    str.slice(pos1 + 1, pos2) +
    char1 +
    str.slice(pos2 + 1)
  );
};
