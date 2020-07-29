const { readFileSync } = require('fs')
const { expect } = require('chai')
const { DocParser } = require('./DocParser')

describe('DocParser', () => {
  describe('Interface and decorators', () => {
    it('should parse content and return all symbols', () => {
      // GIVEN
      const contents = readFileSync(__dirname + '/data/scenario1.txt', { encoding: 'utf8' })

      // WHEN
      const doc = new DocParser(contents).parse()

      // THEN
      const symbol1 = doc.symbols.get('ReturnsChainedDecorators')
      expect(!!symbol1).to.eq(true)
      expect(symbol1.overview).to.not.contains('Add responses documentation for a specific status code.')
      expect(symbol1.overview).to.contains('interface ReturnsChainedDecorators extends MethodDecorator')
      expect(symbol1.overview).to.contains('Set a Content-Type for the current response')
      expect(symbol1.overview).to.contains('ContentType(value: string): this;')
      expect(symbol1.symbolType).to.equal('interface')
      expect(symbol1.extends).to.equal('MethodDecorator')
      expect(symbol1.members).to.deep.equal([
        {
          'description': 'Set a Content-Type for the current response',
          'labels': [],
          'overview': [
            'ContentType(value: string): this;'
          ]
        }
      ])
      expect(symbol1.description).to.equal('Interface comment')
      expect(symbol1.exported).to.equal(true)

      const symbol2 = doc.symbols.get('Returns')

      expect(!!symbol2).to.eq(true)
      expect(symbol2.symbolName).to.contains('Returns')
      expect(symbol2.labels).to.deep.eq([
        {
          key: 'decorator',
          value: 'decorator'
        }
      ])
      expect(symbol2.overview).to.contains('function Returns')
      expect(symbol2.description).to.eq('Add responses documentation for a specific status code.\n')
      expect(symbol2.symbolType).to.eq('decorator')
    })
  })
  describe('Decorator with example comments, depreciation and ignore', () => {
    it('should parse content and return all symbols', () => {
      // GIVEN
      const contents = readFileSync(__dirname + '/data/scenario2.txt', { encoding: 'utf8' })

      // WHEN
      const doc = new DocParser(contents).parse()

      // THEN
      expect(Array.from(doc.symbols.keys())).to.deep.eq([
        'IHeaderOptions',
        'IHeadersOptions',
        'Header'
      ])


      const symbol1 = doc.symbols.get('Header')

      expect(!!symbol1).to.eq(true)
      expect(symbol1.symbolType).to.equal('decorator')
      expect(symbol1.labels).to.deep.equal([
        {
          'key': 'returns',
          'value': '{Function}'
        },
        {
          'key': 'decorator',
          'value': 'decorator'
        },
        {
          'key': 'endpoint',
          'value': 'endpoint'
        },
        {
          'key': 'param',
          'value': 'headers'
        },
        {
          'key': 'param',
          'value': 'value'
        },
        {
          'key': 'deprecated',
          'value': 'Use @Returns(200).Header("header", "value")'
        }
      ])
    })
  })
  describe('Decorator with multiple signature definition', () => {
    it('should parse content and return all symbols', () => {
      // GIVEN
      const contents = readFileSync(__dirname + '/data/scenario3.txt', { encoding: 'utf8' })

      // WHEN
      const doc = new DocParser(contents).parse()

      // THEN
      expect(Array.from(doc.symbols.keys())).to.deep.eq([
        'BodyParams'
      ])


      const symbol1 = doc.symbols.get('BodyParams')

      expect(!!symbol1).to.eq(true)
      expect(symbol1.symbolType).to.equal('decorator')
      expect(symbol1.labels).to.deep.equal([
        {
          'key': 'param',
          'value': 'expression The path of the property to get.'
        },
        {
          'key': 'param',
          'value': 'useType The type of the class that to be used to deserialize the data.'
        },
        {
          'key': 'decorator',
          'value': 'decorator'
        },
        {
          'key': 'returns',
          'value': '{Function}'
        }
      ])

      expect(symbol1.overview).to.contains('BodyParams(expression: string, useType: Type<any>): ParameterDecorator;')
      expect(symbol1.overview).to.contains('BodyParams(useType: Type<any>): ParameterDecorator;')
      expect(symbol1.overview).to.contains('BodyParams(options: IParamOptions<any>): ParameterDecorator;')
      expect(symbol1.overview).to.contains('BodyParams(): ParameterDecorator;')
      expect(symbol1.startLine).to.deep.eq(38)
      expect(symbol1.endLine).to.deep.eq(42)
    })
  })
  describe('Class with method', () => {
    it('should parse content and return all symbols', () => {
      // GIVEN
      const contents = readFileSync(__dirname + '/data/scenario4.txt', { encoding: 'utf8' })

      // WHEN
      const doc = new DocParser(contents).parse()

      // THEN
      expect(Array.from(doc.symbols.keys())).to.deep.eq([
        'EndpointConstructorOptions',
        'EndpointMetadata'
      ])

      const symbol1 = doc.symbols.get('EndpointConstructorOptions')
      expect(symbol1.symbolType).to.equal('interface')
      expect(symbol1.members).to.deep.equal([
        {
          'description': '',
          'labels': [],
          'overview': [
            'beforeMiddlewares?: Function[];'
          ]
        },
        {
          'description': '',
          'labels': [],
          'overview': [
            'middlewares?: Function[];'
          ]
        },
        {
          'description': '',
          'labels': [],
          'overview': [
            'afterMiddlewares?: Function[];'
          ]
        }
      ])
      expect(symbol1.extends).to.eq('JsonEntityStoreOptions')

      const symbol2 = doc.symbols.get('EndpointMetadata')
      expect(symbol2.symbolType).to.equal('class')
      expect(symbol2.startLine).to.equal(24)
      expect(symbol2.endLine).to.not.equal(24)
      expect(symbol2.members.length).to.eq(26)
    })
  })
  describe('Interface with inline signature', () => {
    it('should parse content and return all symbols', () => {
      // GIVEN
      const contents = readFileSync(__dirname + '/data/scenario5.txt', { encoding: 'utf8' })

      // WHEN
      const doc = new DocParser(contents).parse()

      // THEN
      expect(Array.from(doc.symbols.keys())).to.deep.eq([
        'ReturnsChainedDecorators'
      ])

      const symbol1 = doc.symbols.get('ReturnsChainedDecorators')
      expect(symbol1.symbolType).to.equal('interface')
      expect(symbol1.members).to.deep.equal([
        {
          'description': 'Add header.',
          'labels': [
            {
              'key': 'param',
              'value': 'key'
            },
            {
              'key': 'param',
              'value': 'value'
            }
          ],
          'overview': [
            'Header(key: string, value: number | string | (JsonHeader & {',
            '     value?: string | number;',
            ' })): this;'
          ]
        },
        {
          'description': 'Add headers',
          'labels': [],
          'overview': [
            'Headers(headers: JsonHeaders): this;'
          ]
        }
      ])
    })
  })
  describe('Enum', () => {
    it('should parse content and return all symbols', () => {
      // GIVEN
      const contents = readFileSync(__dirname + '/data/scenario6.txt', { encoding: 'utf8' })

      // WHEN
      const doc = new DocParser(contents).parse()

      // THEN
      expect(Array.from(doc.symbols.keys())).to.deep.eq([
        'JsonFormatTypes'
      ])

      const symbol1 = doc.symbols.get('JsonFormatTypes')
      expect(symbol1.symbolType).to.equal('enum')
      expect(symbol1.members).to.deep.equal([
        {
          'description': '',
          'labels': [],
          'overview': [
            'DATE_TIME = "date-time",'
          ]
        },
        {
          'description': '',
          'labels': [],
          'overview': [
            'DATE = "date",'
          ]
        },
        {
          'description': '',
          'labels': [],
          'overview': [
            'TIME = "time",'
          ]
        },
        {
          'description': '',
          'labels': [],
          'overview': [
            'EMAIL = "email",'
          ]
        },
        {
          'description': '',
          'labels': [],
          'overview': [
            'HOSTNAME = "hostname",'
          ]
        },
        {
          'description': '',
          'labels': [],
          'overview': [
            'IPV4 = "ipv4",'
          ]
        },
        {
          'description': '',
          'labels': [],
          'overview': [
            'IPV6 = "ipv6",'
          ]
        },
        {
          'description': '',
          'labels': [],
          'overview': [
            'URI = "uri",'
          ]
        },
        {
          'description': '',
          'labels': [],
          'overview': [
            'URL = "url",'
          ]
        },
        {
          'description': '',
          'labels': [],
          'overview': [
            'URI_REF = "uri-reference",'
          ]
        },
        {
          'description': '',
          'labels': [],
          'overview': [
            'URI_TEMPLATE = "uri-template",'
          ]
        },
        {
          'description': '',
          'labels': [],
          'overview': [
            'JSON_POINTER = "json-pointer",'
          ]
        },
        {
          'description': '',
          'labels': [],
          'overview': [
            'RELATIVE_JSON_POINTER = "relative-json-pointer",'
          ]
        },
        {
          'description': '',
          'labels': [],
          'overview': [
            'UUID = "uuid",'
          ]
        },
        {
          'description': '',
          'labels': [],
          'overview': [
            'REGEX = "regex"'
          ]
        }
      ])
    })
  })
})
