// Replace true|false

const fs = require('fs')
const path = require('path')

const countLines = function(currentText) {
  return (currentText.match(/\n/g)||[]).length
}

const processCurrentLine = function(before) {
  let during = before
    console.log('in processCurrentLine: ', during)

  // Processing into three chunks
  during = during.trim()

  let endOfChunk = during.indexOf(' ')
  let firstChunk

  if (endOfChunk === -1) {
    firstChunk = during
  } else {
    firstChunk = during.slice(0, endOfChunk)
    during = during.slice(endOfChunk)
    during = during.trim()
    endOfChunk = during.indexOf(' ')
  }

  let secondChunk = ''

  if (during.charAt(0) === '(') {
    endOfSecondChunk = during.indexOf(')')

    if (endOfSecondChunk === -1) {
      secondChunk = '|'
    } else {
      secondChunk = during.slice(0, endOfSecondChunk + 1)
      during = during.slice(endOfSecondChunk + 1)
      during = during.trim()
    }

  } else {
    during = ''
  }

  let thirdChunk = '|' + during + '\n'

  // Adding the | pipes to the first and second chunks

  secondChunk = '|' + secondChunk

  // Adding some spacing, for readability

  while (firstChunk.length < 45) {
    firstChunk = firstChunk + ' '
  }

  while (secondChunk.length < 30) {
    secondChunk = secondChunk + ' '
  }

  // Return the result

  return firstChunk + secondChunk + thirdChunk

}

const fd = fs.openSync(path.join(__dirname + '/post-composite.md'), 'r+')

fs.ftruncate(fd, 0, (err) => {
  if (err) {
    console.err(err)
    process.exit()
  }

  fs.readFile(path.join(__dirname + '/pre-composite.txt'), 'utf8', (err, data) => {

    if (err) {
      console.error(err);
      process.exit();
    }

    const precompiled = data
    let wipText = precompiled

    while (wipText.length > 0) {

    // for (let i = 0; i < 1; i++) {

      let nextLineLoc = wipText.indexOf('\n')
      let currentLine

      console.log('nextLineLoc: ', nextLineLoc)

      if (nextLineLoc === -1) {
          currentLine = wipText
          wipText = ''
      } else {
        currentLine = wipText.slice(0, nextLineLoc)
        wipText = wipText.slice(nextLineLoc + 1)
      }

      console.log(`\n\ncurrentLine: ${currentLine}\n\n`)

      currentLine = processCurrentLine(currentLine)

        fs.appendFileSync(path.join(__dirname + '/post-composite.md'), currentLine)
    }

    process.exit()

  })

})
