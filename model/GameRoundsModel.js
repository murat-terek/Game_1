import { BaseModel } from 'startupjs/orm'

export const ROUND_RESULT = {
  STONE: 1,
  SCISSORS: 2,
  PAPER: 3,
}

export const roundToName = new Map([
  [ROUND_RESULT.STONE, 'Stone'],
  [ROUND_RESULT.SCISSORS, 'Scissors'],
  [ROUND_RESULT.PAPER, 'Paper'],
])

export const getRoundResult = (result1, result2) => {
  if (result1 === result2) {
    return 0
  }
  if (
    result1 === ROUND_RESULT.STONE && result2 === ROUND_RESULT.SCISSORS ||
    result1 === ROUND_RESULT.SCISSORS && result2 === ROUND_RESULT.PAPER ||
    result1 === ROUND_RESULT.PAPER && result2 === ROUND_RESULT.STONE 
  ) {
    return 1
  }

  return -1
}

export default class GameRoundsModel extends BaseModel {
  async addSelf() {
    const id = this.id()
    await this.root.add(this.getCollection(), {
      id,
      results: [],
      lastWinId: ''
    })
    return id
  }

  async addResult({ playerId, result }) {
    const results = this.getCopy('results')
    let lastResult = results.length ? results[results.length - 1] : {}

    if (Object.keys(lastResult).length === 2) {
      lastResult = {}
    }

    if (lastResult[playerId] !== undefined) {
      return
    }

    lastResult[playerId] = { result }
    const ids = Object.keys(lastResult)
    if (ids.length === 1) {
      results.push(lastResult)
    }

    if (ids.length === 2) {
      const predLastResult = results.length >= 2 ? results[results.length - 2] : {}
      const lastPoints = results.length >= 2 ? {
        [ids[0]]: predLastResult[ids[0]].points,
        [ids[1]]: predLastResult[ids[1]].points
      } : {
        [ids[0]]: 0,
        [ids[1]]: 0,
      }

      const roundResult = getRoundResult(lastResult[ids[0]].result, lastResult[ids[1]].result)
      const winId = roundResult === 1 ? ids[0] : roundResult === -1 ? ids[1] : undefined

      const lastWinId = this.getCopy('lastWinId');
      const points = {
        [ids[0]]: ids[0] === winId ? (ids[0] === lastWinId ? lastPoints[ids[0]] * 2 : lastPoints[ids[0]] + 1) : lastPoints[ids[0]],
        [ids[1]]: ids[1] === winId ? (ids[1] === lastWinId ? lastPoints[ids[1]] * 2 : lastPoints[ids[1]] + 1) : lastPoints[ids[1]],
      }

      lastResult[ids[0]].points = points[ids[0]]
      lastResult[ids[1]].points = points[ids[1]]

      if (winId !== undefined) {
        this.set('lastWinId', winId)
      }
    }

    this.set('results', results)
  }

  complete() {
    const results = this.getCopy('results')
    console.log('results', results)

    let lastResult = results.length ? results[results.length - 1] : {}

    if (Object.keys(lastResult).length < 2) {
      results.pop()
    }

    this.set('results', results)
  }
}

// const a = {
//   id,
//   results: [
//     {
//       'Anzar': {
//         result: ROUND_RESULT.STONE,
//         points: 0
//       },
//       'Murat': {
//         result: ROUND_RESULT.PAPER,
//         points: 1
//       },
//     },
//     {
//       'Anzar': {
//         result: ROUND_RESULT.STONE,
//         points: 0
//       },
//       'Murat': {
//         result: ROUND_RESULT.STONE,
//         points: 1
//       },
//     },
//     {
//       'Anzar': {
//         result: ROUND_RESULT.STONE,
//         points: 0
//       },
//       'Murat': {
//         result: ROUND_RESULT.PAPER,
//         points: 2
//       },
//     },
//   ],
//   lastWinId: 'Anzar',
// }
