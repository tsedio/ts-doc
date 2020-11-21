const fs = require('fs');
const path = require('path');
const { DocFile } = require('./DocFile');
const context = require('../context/context');
const { Sinon, expect } = require('../test/tools');

describe('DocFile', () => {
  before(() => {
    context.set({
      rootDir: path.join(process.cwd()),
      packagesDir: 'packages/',
      scanPatterns: [
        '<rootDir>/packages/**/lib/**/*.d.ts',
        '!node_modules'
      ],
      outputDir: '<rootDir>/docs/api',
      baseUrl: '/api',
      jsonOutputDir: '<rootDir>/docs/.vuepress/public',
      scope: '@scope',
      modules: {
        'core': 'core',
        'common': {
          'di': 'common/di'
        }
      }
    });

    Sinon.stub(fs, 'readFileSync').returns('content file');
    this.docFile = new DocFile(path.join(process.cwd(), '/packages/common/di/lib/file.d.ts'));
  });

  after(() => {
    fs.readFileSync.restore();
  });

  it('should return the file', () => {
    expect(this.docFile.file).to.eq(path.join(process.cwd(), '/packages/common/di/lib/file.d.ts'));
  });

  it('should return the path', () => {
    expect(this.docFile.path).to.eq(path.join(process.cwd(), '/packages/common/di/lib/file.ts'));
  });

  it('should return the srcPath', () => {
    expect(this.docFile.srcPath).to.eq(path.join(process.cwd(), '/packages/common/di/src/file.ts'));
  });

  it('should return the relativePackagePath', () => {
    expect(this.docFile.relativePackagePath).to.eq('/common/di/src/file.ts');
  });

  it('should return the relativePath', () => {
    expect(this.docFile.relativePath).to.eq('packages/common/di/src/file.ts');
  });

  it('should return the module description', () => {
    expect(this.docFile.module).to.deep.eq({
      'importFrom': '@scope/common',
      'moduleName': '@scope/common/di',
      'modulePath': path.join(process.cwd(), '/packages/common'),
      'pkgName': 'common',
      'subPkgName': 'di'
    });
  });


});