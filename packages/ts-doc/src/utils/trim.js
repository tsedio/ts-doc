module.exports = {
  trim(str) {
    return str
      .split("\n")
      .map((s) => s.trim())
      .join("");
  }
};
