'use strict'

const fs = require('graceful-fs')

let once = true

const layoutCharsByFrequency = `etaoinsrhldcumfpgywb.v,k'xjqz/`.split('')

const writeJson = (name, data) => {
  fs.writeFileSync(`${name}.json`, JSON.stringify(data), (error) => {
    if (error) throw error
  })
}

const columns = require('./columns.js')
const allColumns = columns.getColumns()
const disallowedBigrams = columns.disallowedBigrams
const testCols = allColumns
  // .slice(0, 800)

let every = 1
let success = 0
let all = 0
const startTime = new Date()
let failCount = 0
let progress
const fails = {
  col5: 0,
  col6: 0,
  col7: 0,
  col8: 0,
  col9: 0,
  // col10: 0,
}

let survivingLayouts = []

// col1
// for (let i = 0; i < testCols.length; i++) {
  // let col1 = testCols[i]
  const col1 = '\'a/'

  // col2
  // for (let j = 0; j < testCols.length; j++) {
    // const col2 = testCols[j]
    // const col2ok = ![...col2].some((char) => col1.includes(char))
    const col2 = 'ui.'
    // const col2ok = true

    // if (col2ok) {
      // col3

      // const col4to2 = ['\'a/', 'ui.']

      // for (let k = 0; k < testCols.length; k++) {
        // const col3 = testCols[k]
        // const col3ok = ![...col3].some((char) => col4to2.includes(char))
        const col3 = 'oe,'
        // const col3ok = true

        // if (col3ok) {
          // col4

          // const col4to3 = '\'a/ui.oe,'

          for (let l = 0; l < testCols.length; l++) {
            const col4 = testCols[l]
            progress = Math.round(testCols.findIndex((i) => i === col4) / testCols.length) + '%'
            // const col4ok = ![...col4].some((char) => col4to3.includes(char))

            // if (col4ok) {
              // col5

              const col4to4 = col4

              for (let m = 0; m < testCols.length; m++) {
                const col5 = testCols[m]
                // console.log(col4)
                // const col5ok =
                //   ![...col5].some((char) => col4to4.includes(char)) &&
                const col5ok = String([...new Set([...col4to4, ...col5])].sort()) === String([...col4to4, ...col5].sort()) &&
                  !col5.includes('r') &&
                  !col5.includes('s') &&
                  !col5.includes('n') &&
                  !col5.includes('t') &&
                  !disallowedBigrams[col4[0]].includes(col5[0]) &&
                  !disallowedBigrams[col4[0]].includes(col5[1]) &&
                  !disallowedBigrams[col4[0]].includes(col5[2]) &&
                  !disallowedBigrams[col4[1]].includes(col5[0]) &&
                  !disallowedBigrams[col4[1]].includes(col5[1]) &&
                  !disallowedBigrams[col4[1]].includes(col5[2]) &&
                  !disallowedBigrams[col4[2]].includes(col5[0]) &&
                  !disallowedBigrams[col4[2]].includes(col5[1]) &&
                  !disallowedBigrams[col4[2]].includes(col5[2]) &&
                  !disallowedBigrams[col5[0]].includes(col4[0]) &&
                  !disallowedBigrams[col5[0]].includes(col4[1]) &&
                  !disallowedBigrams[col5[0]].includes(col4[2]) &&
                  !disallowedBigrams[col5[1]].includes(col4[0]) &&
                  !disallowedBigrams[col5[1]].includes(col4[1]) &&
                  !disallowedBigrams[col5[1]].includes(col4[2]) &&
                  !disallowedBigrams[col5[2]].includes(col4[0]) &&
                  !disallowedBigrams[col5[2]].includes(col4[1]) &&
                  !disallowedBigrams[col5[2]].includes(col4[2])

                if (!col5ok) {
                  fails.col5++
                  failCount++
                  all++
                } else {
                  // col6

                  const col4to5 = col4to4 + col5

                  for (let n = 0; n < testCols.length; n++) {
                    const col6 = testCols[n]
                    // const col6ok = ![...col6].some((char) => col4to5.includes(char))
                    const col6ok = String([...new Set([...col4to5, ...col6])].sort()) === String([...col4to5, ...col6].sort()) &&
                    !col6.includes('r') &&
                    !col6.includes('s') &&
                    !col6.includes('n') &&
                    !col6.includes('t')

                    if (!col6ok) {
                      fails.col6++
                      failCount++
                      all++
                    } else {
                      // col7

                      const col4to6 = col4to5 + col6

                      for (let o = 0; o < testCols.length; o++) {
                        const col7 = testCols[o]
                        const col7ok =
                          String([...new Set([...col4to6, ...col7])].sort()) === String([...col4to6, ...col7].sort()) &&
                          !disallowedBigrams[col6[0]].includes(col7[0]) &&
                          !disallowedBigrams[col6[0]].includes(col7[1]) &&
                          !disallowedBigrams[col6[0]].includes(col7[2]) &&
                          !disallowedBigrams[col6[1]].includes(col7[0]) &&
                          !disallowedBigrams[col6[1]].includes(col7[1]) &&
                          !disallowedBigrams[col6[1]].includes(col7[2]) &&
                          !disallowedBigrams[col6[2]].includes(col7[0]) &&
                          !disallowedBigrams[col6[2]].includes(col7[1]) &&
                          !disallowedBigrams[col6[2]].includes(col7[2]) &&
                          !disallowedBigrams[col7[0]].includes(col6[0]) &&
                          !disallowedBigrams[col7[0]].includes(col6[1]) &&
                          !disallowedBigrams[col7[0]].includes(col6[2]) &&
                          !disallowedBigrams[col7[1]].includes(col6[0]) &&
                          !disallowedBigrams[col7[1]].includes(col6[1]) &&
                          !disallowedBigrams[col7[1]].includes(col6[2]) &&
                          !disallowedBigrams[col7[2]].includes(col6[0]) &&
                          !disallowedBigrams[col7[2]].includes(col6[1]) &&
                          !disallowedBigrams[col7[2]].includes(col6[2])

                          if (!col7ok) {
                            fails.col7++
                            failCount++
                            all++
                          } else {
                          // col8

                          const col4to7 = col4to6 + col7

                          for (let p = 0; p < testCols.length; p++) {
                            const col8 = testCols[p]
                            const col8ok = String([...new Set([...col4to7, ...col8])].sort()) === String([...col4to7, ...col8].sort())

                            if (!col8ok) {
                              fails.col8++
                              failCount++
                              all++
                            } else {
                              // col9

                              const col4to8 = col4to7 + col8

                              for (let q = 0; q < testCols.length; q++) {
                                const col9 = testCols[q]
                                const col9ok = String([...new Set([...col4to8, ...col9])].sort()) === String([...col4to8, ...col9].sort())
                                all++

                                if (!col9ok) {
                                  fails.col9++
                                  failCount++
                                } else {
                                  // col10

                                  // const col4to9 = col4to8 + col9

                                  // for (let r = 0; r < testCols.length; r++) {
                                    // const col10 = testCols[r]
                                    const col10 = 'xsz'
                                    // const col10ok =
                                    // String([...new Set([...col4to9, ...col10])].sort()) === String([...col4to9, ...col10].sort()) &&
                                    //   !col10.includes('l') &&
                                    //   !col10.includes('n') &&
                                    //   !col10.includes('d') &&
                                    //   !col10.includes('f') &&
                                    //   !col10.includes('y') &&
                                    //   !col10.includes('v') &&
                                    //   !col10.includes('w') &&
                                    //   !col10.includes('k') &&
                                    //   !col10.includes('h') &&
                                    //   !col10.includes('b') &&
                                    //   !col10.includes('g') &&
                                    //   !col10.includes('m') &&
                                    //   !col10.includes('j') &&
                                    //   !col10.includes('c') &&
                                    //   !col10.includes('p')

                                    // if (!col10ok) {
                                    //   fails.col10++
                                    //   failCount++
                                    //   all++
                                    // } else {
                                      const layout = [col1, col2, col3, col4, col5, col6, col7, col8, col9, col10]
                                      success++
                                      every++
                                      const timeDifference = new Date() - startTime

                                      if (every > 87) {
                                        console.clear()
                                        console.log(' ')
                                        console.log('Latest layout:', layout.join(' '))
                                        console.log('Layouts found:', survivingLayouts.length)
                                        console.log('Minutes elapsed:', Math.round(timeDifference / 1000 / 60))
                                        console.log('Progress:', progress)
                                        console.log('Layouts per second:', Math.round(all / (timeDifference / 1000)))
                                        console.log('Layouts tried:', all)
                                        console.log('Failed tries:', failCount)
                                        console.log('Fails per column:')
                                        console.table(fails)
// console.log(`
// Latest layout: ${layout.join('')}
// Layouts tried: ${all}
// Layouts found: ${survivingLayouts.length}
// Time elapsed: ${Math.round(timeDifference / 1000 / 60)}m
// Layouts per second: ${Math.round(all / (timeDifference / 1000))}
// Fails:`)
//                                         console.table(fails)
                                        every = 0
                                      }

                                      survivingLayouts.push(layout)
                                      // if (once) {
                                        // console.log({survivingLayouts})
                                        // writeJson(`layout-${success}`, [col1, col2, col3, col4, col5, col6, col7, col8, col9, col10])
                                        writeJson(`survivingLayouts-${Math.round(success / 100000)}`, survivingLayouts)
                                        // once = false
                                      // }
                                    // }
                                  // }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          // }
        // }
      // }
    // }
  // }
// }

console.log({ survivingLayouts })
