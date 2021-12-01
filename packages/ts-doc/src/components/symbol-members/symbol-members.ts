export const symbolMembers = {
  name: "symbol-members",
  trim: false,
  method(symbol: any) {
    const flattenMembers = symbol.getMembers();
    const construct = flattenMembers.filter((member: any) => member.overview.match("constructor"))[0];
    const hasConstructor = construct && (construct.description || !construct.overview.match("constructor()"));
    let hasConstructorOverview = hasConstructor && construct.overview.match("constructor()");
    const members = flattenMembers.filter((member: any) => !member.overview.match("constructor"));

    return {
      hasConstructor,
      hasConstructorOverview,
      members,
      construct
    };
  }
};
