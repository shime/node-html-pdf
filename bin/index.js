#!/usr/bin/env node

var fs = require('fs')
var pdf = require('../')
var path = require('path')

var args = process.argv.slice(2)

var parseArgs = require('minimist')(args)

if (args.length >= 2) {
  htmlpdf(parseArgs._[0], parseArgs._[1])
} else {
  help()
}

function help () {
  var help = [
    'Usage: html-pdf [options] <source> <destination>\n',
    'Example: html-pdf source.html destination.pdf\n',
    'Options:\n',
    '  --base',
    '  --border    the border to use',
    '  --directory the directory to use'
  ].join('\n')

  console.log(help)
}

function htmlpdf (source, destination) {
  var html = fs.readFileSync(source, 'utf8')
  var options = {
    base: parseArgs.base || 'file://' + path.resolve(source),
    border: parseArgs.border,
    directory: parseArgs.directory,
  }
  pdf.create(html, options).toFile(destination, function (err, res) {
    if (err) throw err
  })
}
