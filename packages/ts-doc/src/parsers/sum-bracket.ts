export function sumBracket(line: any) {
  return line
    .trim()
    .split("")
    .reduce((count: any, char: any) => {
      if (char === "{") {
        return count + 1;
      }

      if (char === "}") {
        return count - 1;
      }

      return count;
    }, 0);
}
