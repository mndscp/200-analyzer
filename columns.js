const fs = require('graceful-fs')

const generateColumnsForChar = ((char1, chars, disallowedBigrams) => {
  const columns = []

  for (let i = 0; i < chars.length; i++) {
    for (let j = 0; j < chars.length; j++) {
      let column = char1

      const char2 = chars[i]
      const char2allowed =
        char1 !== char2 &&
        !disallowedBigrams[char1].includes(char2) &&
        !disallowedBigrams[char2].includes(char1)

      if (!char2allowed) continue

      column += char2

      const char3 = chars[j]
      const char3allowed =
        !column.includes(char3) &&
        !disallowedBigrams[char1].includes(char3) &&
        !disallowedBigrams[char3].includes(char1) &&
        !disallowedBigrams[char2].includes(char3) &&
        !disallowedBigrams[char3].includes(char2)

      if (!char3allowed) continue

      column += char3
      column = [...column].sort().join('')
      columns.push(column)
    }
  }

  return columns.sort()
})

const generateAllColumns = (chars, disallowedBigrams) => {
  const columns = []

  chars.split('').forEach((char) => {
    columns.push(generateColumnsForChar(char, chars, disallowedBigrams))
  })

  return columns.flat()
}

const writeJson = (name, data) => {
  fs.writeFileSync(`${name}.json`, JSON.stringify(data), (error) => {
    if (error) throw error
  })
}

const disallowedBigrams = {
  'a': 'bcdefghijklmnprstuvw',
  'b': 'aeilour',
  'c': 'aehiklorsu',
  'd': 'aeilnoru',
  'e': 'abcdfghijklmnprstuvwz',
  'f': 'aeiloru',
  'g': 'aehilnoru',
  'h': 'acegiorstuwy',
  'i': 'abcdefghklmnoprstw',
  'j': 'aeiou',
  'k': 'aceilorsu',
  'l': 'abcdefgikopstuvy',
  'm': 'aeiorsu',
  'n': 'adegiorstu',
  'o': 'bcdfghijklmnprstuvw',
  'p': 'aeilorsu',
  'q': '',
  'r': 'abcdefghikmnopstuvwz',
  's': 'acehilmnoprtuw',
  't': 'aehilnorsu',
  'u': 'abcdefghjklmnoprstwz',
  'v': 'aeloru',
  'w': 'aehinorsu',
  'x': '',
  'y': 'bdhlrt',
  'z': 'enoru',
  ',': '',
  '.': '',
  '/': '',
  '\'': '',
}

const getColumns = () => {
  // const layoutChars = `abcdefghijklmnopqrstuvwxyz,./'`
  const layoutChars = `bcdfghjklmnpqrtvwy`

  const columns = [...new Set(generateAllColumns(layoutChars, disallowedBigrams))].sort()

  writeJson('columns', columns)
  // console.log(columns)
  return columns
}

module.exports = { getColumns, disallowedBigrams }

// getColumns()
