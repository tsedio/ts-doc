"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
/**
 *
 * @param genericLabels
 * @param genericTypes
 */
function getGenericsMap(genericLabels, genericTypes) {
  return genericLabels.reduce((map, item, index) => map.set(item, genericTypes[index]), new Map());
}
exports.getGenericsMap = getGenericsMap;
/**
 *
 * @param options
 */
function mapGenericsOptions(options) {
  if (options.genericLabels && options.genericTypes) {
    const {genericLabels, genericTypes, ...ops} = options;
    return {
      ...ops,
      generics: getGenericsMap(genericLabels, genericTypes)
    };
  }
  return options;
}
exports.mapGenericsOptions = mapGenericsOptions;
/**
 *
 * @param value
 */
function popGenerics(value) {
  const [genericTypes, ...out] = value.nestedGenerics;
  return {
    genericTypes,
    nestedGenerics: out
  };
}
exports.popGenerics = popGenerics;
//# sourceMappingURL=generics.js.map
