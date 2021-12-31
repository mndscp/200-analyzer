const fs = require('graceful-fs')

const layoutChars = `abcdefghijklmnopqrstuvwxyz,./'`
const layoutCharsByFrequency = `etaoinsrhldcumfpgywb.v,k'xjqz/`
const disallowedBigrams = {
  'a': 'bcdefghijklmnprstuvw',
  'b': 'aeiour',
  'c': 'aehiklorsu',
  'd': 'aegilnoru',
  'e': 'abcdfghijklmnprstuvwz',
  'f': 'aeilortu',
  'g': 'aehilnoru',
  'h': 'acegiorstuwy',
  'i': 'abcdefghiklnoprstw',
  'j': 'aeiou',
  'k': 'aceilorsu',
  'l': 'abcdefgikmnoprtuvy',
  'm': 'abeiloprsu',
  'n': 'abdegilorstuy',
  'o': 'bcdfghijklmnprstuvw',
  'p': 'aeilmorsu',
  'q': '',
  'r': 'abcdefghiklmnopstu',
  's': 'acehilmnoprtuw',
  't': 'aefhilnorsu',
  'u': 'abcdefghijklmnoprstwz',
  'v': 'aelou',
  'w': 'aehinostu',
  'x': '',
  'y': 'bdhlnrt',
  'z': 'enotuw',
  ',': '',
  '.': '',
  '/': '',
  '\'': '',
}

const generateColumnsForChar = ((char1) => {
  const columns = []

  for (let i = 0; i < layoutChars.length; i++) {
    for (let j = 0; j < layoutChars.length; j++) {
      let column = char1

      const char2 = layoutChars[i]
      const char2allowed = char1 !== char2 && !disallowedBigrams[char1].includes(char2)
      if (!char2allowed) continue

      column += char2

      const char3 = layoutChars[j]
      const char3allowed = !column.includes(char3) && !disallowedBigrams[char1].includes(char3) && !disallowedBigrams[char2].includes(char3)
      if (!char3allowed) continue

      column += char3
      column = [...column].sort().join('')
      columns.push(column)
    }
  }

  return columns.sort()
})

const generateAllColumns = (chars) => {
  const columns = []

  chars.split('').forEach((char) => {
    columns.push(generateColumnsForChar(char))
  })

  return columns.flat()
}

const writeJson = (name, data) => {
  fs.writeFile(`${name}.json`, data, (error) => {
    if (error) throw error
  })
}

const generate = (() => {
  const columns = [...new Set(generateAllColumns(layoutCharsByFrequency))].sort()

  writeJson('columns', JSON.stringify(columns))
  console.table(columns)
})()
