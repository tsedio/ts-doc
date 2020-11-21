"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
function mapAliasedProperties(value, alias) {
  return Object.entries(value).reduce((properties, [key, value]) => {
    key = alias.get(key) || key;
    properties[key] = value;
    return properties;
  }, {});
}
exports.mapAliasedProperties = mapAliasedProperties;
//# sourceMappingURL=JsonAliasMap.js.map
