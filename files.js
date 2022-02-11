const fs = require('graceful-fs')
const layouts = require('./survivingLayouts-1done.json')

const writeJson = (name, data) => {
  fs.writeFileSync(name, data, (error) => {
    if (error) throw error
  })
}

for (let i = 0; i < layouts.length; i++) {
  const l = layouts[i]

  const formatted =
  `gen-${i}
x ${l[8][0]} ${l[7][0]} ${l[6][0]} ${l[5][0]} ${l[4][0]} ${l[3][0]} o u ,
s ${l[8][1]} ${l[7][1]} ${l[6][1]} ${l[5][1]} ${l[4][1]} ${l[3][1]} e i a
z ${l[8][2]} ${l[7][2]} ${l[6][2]} ${l[5][2]} ${l[4][2]} ${l[3][2]} ' . /
0 1 2 3 3 4 4 5 6 7
0 1 2 3 3 4 4 5 6 7
0 1 2 3 3 4 4 5 6 7`

  writeJson(`gen/gen-${i}`, formatted)
}
