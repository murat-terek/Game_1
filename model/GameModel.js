import { BaseModel } from 'startupjs/orm'

export default class GameModel extends BaseModel {
  async addSelf({ name, professorId }) {
    const $gamerounds = this.root.scope('gamerounds.*')
    console.log('$gamerounds', $gamerounds)
    const gameRoundId = await $gamerounds.addSelf()
    await this.root.add(this.getCollection(), {
      id: this.id(),
      name,
      professorId,
      gameRoundId,
      playerIds: [],
      createdOn: (new Date()).toString(),
      complete: false,
    })
  }
}
