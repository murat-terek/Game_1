import { BaseModel } from 'startupjs/orm'
import { getRoundResult } from '../const'

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

    let lastResult = results.length ? results[results.length - 1] : {}

    if (Object.keys(lastResult).length < 2) {
      results.pop()
    }

    this.set('results', results)
  }
}
