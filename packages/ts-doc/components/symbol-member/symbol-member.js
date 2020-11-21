module.exports = {
  name: "symbolMember",
  method(member) {
    let deprecated = false;
    const hasParams = member.params.length && member.overview.match(/\((.*)\):/);

    if (member.labels) {
      if (member.labels.find((k) => k.key === "deprecated")) {
        deprecated = true;
      }
    }

    return {
      member,
      deprecated,
      hasParams
    };
  }
};
