/**
 *
 * @param str
 * @private
 */
export const stripsTags = (str: string): string => {
  const tags = str
    .replace(/declare /g, "")
    .replace(/private (.*);\n/g, "\n")
    .replace(/\/\/\/ <reference(.*)\n/g, "")
    .split("/** */");

  return tags[tags.length - 1];
};
/**
 *
 * @param str
 * @private
 */
export const stripsComments = (str: any) => str.replace(/\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*+\//g, "");
/**
 *
 * @param str
 * @private
 */
export const stripsMembersComments = (str: any) => str.replace(/\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*+\/\n([^class|^interface])/g, "");
