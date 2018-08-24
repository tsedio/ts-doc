const readPkgUp = require('read-pkg-up');

const SYMBOL_TYPES = {
  '@': { value: 'decorator', label: 'Decorator' },
  'T': { value: 'type', label: 'Type alias' },
  'C': { value: 'class', label: 'Class' },
  'S': { value: 'service', label: 'Service' },
  'I': { value: 'interface', label: 'Interface' },
  'K': { value: 'const', label: 'Constant' },
  'E': { value: 'enum', label: 'Enum' },
  'F': { value: 'function', label: 'Function' }
};

const SYMBOL_STATUS = {
  'S': { value: 'stable', label: 'Stable' },
  'D': { value: 'deprecated', label: 'Deprecated' },
  'E': { value: 'experimental', label: 'Experimental' },
  'P': { value: 'private', label: 'Private' },
  'O': { value: 'public', label: 'Public' }
};

const reverseKeys = (obj) => {
  Object.keys(obj).forEach((key) => {
    obj[key].code = key;
    obj[obj[key].value] = obj[key];
  });

  return obj;
};

module.exports = {
  symbolTypes: reverseKeys(SYMBOL_TYPES),
  symbolStatus: SYMBOL_STATUS,
  status: SYMBOL_STATUS,
  symbols: require('./symbols'),
  components: {},
  readPkg() {
    return readPkgUp()
      .then((result) => {
        module.exports.importPkg(result.pkg);
        return result.pkg;
      });
  },
  importPkg(pkg) {
    const { name, repository, version, tsdoc } = pkg;

    this.github = repository.url.replace('.git', '').replace('git+', '');
    this.version = version;
    this.projectName = name;
    this.host = `${this.github}/blob/v${version}/src/`;
    this.modules = tsdoc.modules;
    this.scope = tsdoc.scope;
  }
};
