'use strict'
const { context } = require('../context')
const { DocSymbolParser } = require('./DocSymbolParser')

const {
  stripsComments,
  stripsTags
} = require('../utils/strips')

const EXPORT_PATTERN = /^export /

function isClosedBracket (line) {
  return line.trim().match(/}$|\};$/)
}

function isOpenedBracket (line) {
  return line.trim().match(/{$/)
}

function isOpenedComment (line) {
  return line.trim() === '/**'
}

function isClosedComment (line) {
  return line.trim() === '*/'
}

function isExportedSymbol (line) {
  return line.match(EXPORT_PATTERN)
}

function isNotFunctionSymbol (line) {
  return line.match(/{$/) && line.indexOf('function') === -1
}

class DocParser {
  constructor (docFile) {
    this.docFile = docFile
    this.contents = docFile.contents
  }

  /**
   *
   * @param str
   * @returns {string}
   */
  overview (str = '') {
    return stripsTags(stripsComments(str))
      .split('\n')
      .filter(o => !!o.trim())
      .join('\n')
      .trim()
  }

  /**
   *
   */
  parse () {
    this.currentSymbol = undefined
    this.tabLevel = 0
    this.currentComment = []
    this.inComment = 0
    let content = this.contents.split('/** */')
    content = stripsTags(content[content.length - 1])

    content
      .split('\n')
      .map((line, index, map) => this.parseLine(line, index, map))
      .join('\n')

    return this
  }

  /**
   *
   * @param line
   * @param index
   * @param map
   */
  parseLine (line, index, map) {
    if (line.trim() === '') {
      return
    }

    if (line.trim().match(/export \* from/)) {
      return
    }

    if (isOpenedComment(line)) {
      if (this.inComment === 0) {
        this.currentComment = []
      }
      this.inComment++
      return
    }

    if (isClosedComment(line)) {
      this.inComment--
      return
    }

    if (this.inComment > 0) {
      this.currentComment.push(line.trim().replace(/^\* |^\*/, ''))
      return
    }

    if (isOpenedBracket(line)) {
      this.tabLevel--
    }

    if (line.match(/}$/) && this.tabLevel === 0 && this.currentSymbol) {
      this.currentSymbol.overview.push(line)
      this.currentSymbol.overview = this.currentSymbol.overview.join('\n')
      this.setSymbol(this.currentSymbol)
      this.currentSymbol = undefined
    }

    if (this.tabLevel >= 1 && this.currentSymbol) {
      this.currentSymbol.appendMember(this.tabLevel, line, this.currentComment.join('\n'))
      this.currentComment = []
      this.currentSymbol.overview.push(line.replace(EXPORT_PATTERN, ''))
    }

    if (this.tabLevel === 0 && isNotFunctionSymbol(line)) {
      const symbolParser = new DocSymbolParser(line, this.currentComment.join('\n'), this.contents)
      symbolParser.parse()
      this.currentComment = []

      this.currentSymbol = symbolParser.symbol
      this.currentSymbol.overview = [line.replace(EXPORT_PATTERN, '')]
    }

    if (isClosedBracket(line)) {
      this.tabLevel++
    }

    if (isExportedSymbol(line) && this.currentSymbol === undefined) {
      if (line.match(/;$/)) {
        const symbolParser = new DocSymbolParser(line, this.currentComment.join('\n'), this.contents)
        symbolParser.parse()
        symbolParser.symbol.overview = line.replace(EXPORT_PATTERN, '')
        this.setSymbol(symbolParser.symbol)
        return
      }

      const nextContent = map.slice(index, map.length)
      let otherExportFound = -1
      const overview = nextContent.filter((l) => {
        if (isExportedSymbol(l)) {
          otherExportFound++
        }
        return otherExportFound <= 0
      })
      const symbolParser = new DocSymbolParser(line, this.currentComment.join('\n'), this.contents)
      symbolParser.parse()
      symbolParser.symbol.overview = overview.join('\n').replace(EXPORT_PATTERN, '')
      this.setSymbol(symbolParser.symbol)
      return
    }

    return line
  }


  setSymbol (symbol) {
    if (symbol.symbolName === '' || symbol.symbolName === 'let') {
      return
    }

    symbol.setDocFile(this.docFile)
    this.docFile.symbols.set(symbol.symbolName, context.symbols.push(symbol))
  }
}

module.exports.DocParser = DocParser
