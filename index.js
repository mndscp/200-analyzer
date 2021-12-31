const fs = require('graceful-fs')
const fsExtra = require('fs-extra')

const allChars = [...`abcdefghijklmnopqrstuvwxyz,./'`]

const template = `
Insane
x l d * * * w o u .
s r t n * * m e i a
z j * h * * g ' , /
0 1 2 3 3 4 4 5 6 7
0 1 2 3 3 4 4 5 6 7
0 1 2 3 3 4 4 5 6 7
`

const templateName = template.match(/[a-zA-Z0-9-_.:]+/)[0]
const folderName = `permutations`

if (!fs.existsSync(folderName)){
  fs.mkdirSync(folderName)
} else {
  // Empty output folder
  fsExtra.emptyDirSync(folderName)
}

// From Stack Overflow
const allPermutations = (items) => {
  let results = []

  const permute = (arr, memo) => {
    var cur, memo = memo || []

    for (let i = 0; i < arr.length; i++) {
      cur = arr.splice(i, 1)

      if (arr.length === 0) {
        results.push(memo.concat(cur))
      }

      permute(arr.slice(), memo.concat(cur))
      arr.splice(i, 0, cur[0])
    }

    return results
  }

  permute(items)
  return results
}

const missingChars = (() => {
  const result = []

  allChars.forEach((char) => {
    if (!template.includes(char)) {
      result.push(char)
    }
  })

  return result
})()

const missingCharCount = missingChars.length
console.log({ missingChars })
console.log({ missingCharCount })

const permutations = allPermutations(missingChars)
console.log({ permutations: permutations.length })

const layouts = (() => {
  const result = []

  for (let p = 0; p < permutations.length; p++) {
    const permutation = permutations[p]
    let layout = template

    for (let i = 0; i < missingCharCount; i++) {
      layout = layout.replace('*', permutation[i])
    }

    const permutationCountLength = String(permutations.length).length
    const layoutWithoutSpaces = layout.replace(/^\s*/gm, '')
    const layoutName = `${templateName}-${String(p + 1).padStart(permutationCountLength, '0')}-${permutation.join('')}`
    const namedLayout = layoutWithoutSpaces.replace(templateName, layoutName)

    result.push(namedLayout)

    fs.writeFile(`${folderName}/${layoutName}`, namedLayout, (error) => {
      if (error) throw error
    })
  }
})()

console.table(layouts)
