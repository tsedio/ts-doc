module.exports = {
  name: "dropdown",
  trim: true,
  method(label, items) {
    return {
      label,
      items
    };
  }
};