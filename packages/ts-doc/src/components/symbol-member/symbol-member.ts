export const symbolMember = {
  name: "symbol-member",
  method(member: any) {
    let deprecated = false;
    const hasParams = member.params.length && member.overview.match(/\((.*)\):/);

    if (member.labels) {
      if (member.labels.find((k: any) => k.key === "deprecated")) {
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
