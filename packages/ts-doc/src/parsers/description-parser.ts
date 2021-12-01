/**
 *
 * @param content
 * @returns {{content: string, labels: Array}}
 */
export function descriptionParser(content: string = ""): { content: string, labels: { key: string, value: string }[] } {
  let description = content.replace(/^(\/\*\*| \*\/| \* )/gm, "");
  const labels: any = [];
  let catchLabels = true;

  description = description
    .split("\n")
    .filter((line) => {
      if (line.match(/```/)) {
        catchLabels = !catchLabels;
      }

      if (catchLabels && line.match(/^@/gi)) {
        const key = line.split(" ")[0].replace("@", "");
        const value = line.replace("@" + key, "").trim();

        labels.push({key, value: value === "" ? key : value});
        return false;
      }
      return true;
    })
    .map((line) => line.replace(/\*\\\//gi, "*/"))
    .join("\n");

  return {content: description.trim() === "/" ? "" : description, labels};
}

/**
 *
 * @param symbol
 * @param symbolType
 */
export const regExpTargetDescription = (symbol: any, symbolType: any) =>
  new RegExp("\\/\\*\\*([^*]|[\\r\\n]|(\\*+([^*/]|[\\r\\n])))*\\*\\/\\n" + symbolType + " " + symbol + " ", "");
