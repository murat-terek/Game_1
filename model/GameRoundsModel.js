import { BaseModel } from 'startupjs/orm'

export const ROUND_RESULT = {
  STONE: 1,
  PAPER: 2,
  SCISSORS: 3,
}

export default class GameRoundsModel extends BaseModel {
  async addSelf() {
    await this.root.add(this.getCollection(), {
      id: this.id(),
      results: [],
    })
  }

  async addResult({ playerId, result }) {
    this.push(playerId, result)
  }
}
