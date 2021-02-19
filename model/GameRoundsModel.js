import { BaseModel } from 'startupjs/orm'

export const ROUND_RESULT = {
  STONE: 1,
  SCISSORS: 2,
  PAPER: 3,
}

export default class GameRoundsModel extends BaseModel {
  async addSelf() {
    const id = this.id()
    await this.root.add(this.getCollection(), {
      id,
      results: [],
    })
    return id
  }

  async addResult({ playerId, result }) {
    const results = this.get('results');
    const lastResult = results.length ? results[results.length - 1] : undefined;

    if (lastResult[playerId] !== undefined) {
      return
    }

    if (lastResult === undefined) {
      this.push('results', {
        [playerId]: result
      })
    } else if (Object.keys(lastResult).length === 2) {
      this.push('results', {
        [playerId]: result
      })
    } else {
      lastResult[playerId] = result
      this.set('results', results);
    }
  }
}
