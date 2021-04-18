import { BaseModel } from 'startupjs/orm'

export const ROLE = {
  PLAYER: 1,
  PROFESSOR: 2,
}

export default class UserModel extends BaseModel {
  async addSelf({ name, role }) {
    const usersQuery = this.root.query(this.getCollection(), { name })
    await usersQuery.subscribe()
    const userIds = usersQuery.getIds()
    if (userIds && userIds.length) {
      return userIds[0]
    }

    const id = this.id()
    await this.root.add(this.getCollection(), {
      id,
      name,
      role,
    })

    return id
  }
}
