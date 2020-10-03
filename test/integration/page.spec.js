const { expect } = require('chai')
const { getSnapshot } = require('../utils')
const { compilePage } = require('../utils')

describe('Page', () => {
  describe('MaxLength example', () => {
    it('should render a page', async () => {
      const symbols = await compilePage(__dirname + '/data/*')
      const symbol = symbols.get('MaxLength')

      expect(symbol.content).to.equal(getSnapshot(symbol))
    })
  })

  describe('ReturnsChainedDecorators example', () => {
    it('should render a page', async () => {
      const symbols = await compilePage(__dirname + '/data/*')
      const symbol = symbols.get('ReturnsChainedDecorators')

      expect(symbol.symbolType).to.equal('interface')
      expect(symbol.content).to.equal(getSnapshot(symbol))
    })
  })

  describe('RequestContext example', () => {
    it('should render a page', async () => {
      const symbols = await compilePage(__dirname + '/data/*')
      const symbol = symbols.get('RequestContext')

      expect(symbol.symbolType).to.equal('class')
      expect(symbol.content).to.equal(getSnapshot(symbol))
    })
  })

  describe('Ignore example', () => {
    it('should render a page', async () => {
      const symbols = await compilePage(__dirname + '/data/*')
      const symbol = symbols.get('Ignore')

      expect(symbol.symbolType).to.equal('decorator')
      expect(symbol.content).to.equal(getSnapshot(symbol))
    })
  })
})
