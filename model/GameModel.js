import { BaseModel } from 'startupjs/orm'

export default class GameModel extends BaseModel {
  async addSelf({ name, professorId }) {
    await this.root.add(this.getCollection(), {
      id: this.id(),
      name,
      gameRoundId,
      professorId,
      playerIds: [],
      createdOn: new Date(),
      complete: false,
    })
  }
}
