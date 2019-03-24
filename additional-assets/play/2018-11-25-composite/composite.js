const fs = require('fs')
const path = require('path')
const fd = fs.openSync(path.join(__dirname + '/post-composite.md'), 'r+')

// File functions

const processChunks = function(array) {
  let final = ''

  if (!array[0].includes('```')) {
    final = final + array.shift()
  }

  for (let i = 0; i < array.length; i++) {
    array[i] = '\n## ' + array[i]
  }

  for (let i = 0; i < array.length; i++) {

    let currStr = ''

    let firstMarker = array[i].indexOf('>')

    let secondMarker = array[i].indexOf('**')

    currVal = array[i].substr(0, firstMarker)

    currVal = currVal + array[i].slice(secondMarker, array[i].length)

    currVal = currVal + '\n### Examples:\n\n'+ array[i].slice(firstMarker, secondMarker)

    currVal = currVal.trim()

    final = final + '\n' + currVal + '\n'

  }

  final = final.trim()

  return final
}

const organizeExamples = function(wip) {
  let final = ''

  wip = wip.split('\n## ')

  final = processChunks(wip)

  console.log('final: ', final)

  return final

}

// Activity starts here

fs.ftruncate(fd, 0, (err) => {
  if (err) {
    console.error(err)
    process.exit()
  }

  fs.readFile(path.join(__dirname + '/pre-composite.txt'), 'utf8', (err, data) => {

    if (err) {
      console.error(err);
      process.exit();
    }

    let wip = data

    let res = organizeExamples(wip)

    fs.appendFileSync(path.join(__dirname + '/post-composite.md'), res)

  })

})
