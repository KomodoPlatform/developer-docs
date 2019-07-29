// Replace true|false

console.log("starting")

const fs = require('fs')
const path = require('path')

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

      console.log("Current Line: \n\n", data.slice(0, 100))

    let wipText = data
    let unsortedArr = []
    let sortedArr = []
    let finalText = ''

    // load in the unsortedArr

    while (wipText.length > 0) {

        // Find the first h2 heading
        
        let posTitleStart = wipText.indexOf("## ") + 3
        console.log(`posTitleStart: ${posTitleStart}\n\n`)
        let posTitleEnd = wipText.indexOf("\n")
        let currentTitle = wipText.slice(posTitleStart, posTitleEnd)

        console.log(`currentTitle: ${currentTitle}\n\n`)
        // Build the array object to later insert
        // Only place the first line for now, will add the rest in a moment

        let currentObject = {
            title: currentTitle,
            body: wipText.slice(0, posTitleEnd),
        }

        console.log(`currentObject.body (not finished): ${currentObject.body}\n\n`)
        // Cut out the title, since that's in currentObject

        wipText = wipText.slice(posTitleEnd)

        console.log("wipText so far: ", wipText.slice(0, 100))
            console.log("\n")

        // Check that we're not at the end yet

        if (wipText.indexOf("\n## ") !== -1) {

            // Find the end of this h2 heading's section

            let posNextBreak = wipText.indexOf("\n## ") + 1

            console.log(`posNextBreak: ${posNextBreak}\n\n`)

            // Add everything up to that point to the current object's full body
            
            currentObject.body = currentObject.body.concat(wipText.slice(0, posNextBreak))

            console.log(`currentObject.body: ${currentObject.body}\n\n`)
            // Cut off everything in wipText that is now added to currentObject

            wipText = wipText.slice(posNextBreak)

            // Add the object to the array 
            
            unsortedArr.push(currentObject)

            // That's it for now. Let's the cycle repeat

            console.log(`Finished while loop here.\n\n**\n\n`)

        } else if (wipText.indexOf("\n## ") === -1) {

            // We must be at the end. Add everything else as a part of the currentObject

            currentObject.body = currentObject.body.concat(wipText)

            wipText = ''

            // Add the object to the array 
            
            unsortedArr.push(currentObject)


        } else {

            // Must have made a mistake. Report error and exit.

            console.error("Error in breaking up wipText")

            process.exit()
        }

    }

    // Sort the array

    console.log(`\n\n**\n\nMade it through the array. Time to add it to the file.\n\n**\n\n`)
    
    unsortedArr.sort((a, b) => (a.title > b.title) ? 1 : -1)

      // Compress the array to a single string

      for (let i = 0; i < unsortedArr.length; i++) {
          console.log(`working through unsortedArr[${i}].body:\n\n${unsortedArr[i].body.slice(0, 30)}\n\n...\n\n`)
        finalText = finalText.concat(unsortedArr[i].body)
      }

      // Place the string in a final file

    fs.appendFileSync(path.join(__dirname + '/post-composite.md'), finalText)

    process.exit()

  })

})
