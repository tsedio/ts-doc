function sumBracket(line) {
  return line
    .trim()
    .split("")
    .reduce((count, char) => {
      if (char === "{") {
        return count + 1;
      }

      if (char === "}") {
        return count - 1;
      }

      return count;
    }, 0);
}

exports.sumBracket = sumBracket;
