import { BaseModel } from 'startupjs/orm'

export default class GameModel extends BaseModel {
  async addSelf({ name, professorId }) {
    const $gamerounds = this.root.scope('gamerounds.*')
    const gameRoundId = await $gamerounds.addSelf()
    await this.root.add(this.getCollection(), {
      id: this.id(),
      name,
      professorId,
      gameRoundId,
      playerIds: [],
      playerCount: 0,
      createdOn: (new Date()).toString(),
      complete: false,
    })
  }

  async addPlayer(playerId) {
    const playerIds = this.get('playerIds');
    if (!playerIds.includes(playerId)) {
      await this.push('playerIds', playerId)
      await this.increment('playerCount', 1)
    }
  }

  async addResult(playerId, result) {
    const gameRoundId = this.get('gameRoundId')
    const gameRound = this.root.scope(`gamerounds.${gameRoundId}`)
    gameRound.addResult({ playerId, result })
  }
}
