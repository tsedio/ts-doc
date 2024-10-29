const snakeCase = require("lodash/snakeCase");

module.exports.dashCase = function dashCase(str) {
  return snakeCase(str).replace(/_/g, "-");
};
