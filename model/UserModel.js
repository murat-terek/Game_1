import { BaseModel } from 'startupjs/orm'

export const ROLE = {
  PLAYER: 1,
  PROFESSOR: 2,
}

export default class UserModel extends BaseModel {
  async addSelf({ name, role }) {
    const id = this.id()
    await this.root.add(this.getCollection(), {
      id,
      name,
      role,
    })

    return id
  }
}
