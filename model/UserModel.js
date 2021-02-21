import { BaseModel } from 'startupjs/orm'

export const ROLE = {
  PLAYER: 1,
  PROFESSOR: 2,
}

export default class UserModel extends BaseModel {
  async addSelf({ name, role }) {
    const usersQuery = this.root.query(this.getCollection(), { _id: name })
    await this.subscribe(usersQuery)
    const userIds = usersQuery.getIds()
    if (userIds && userIds.length) {
      return name;
    }

    await this.root.add(this.getCollection(), {
      id: name,
      name,
      role,
    })

    return name
  }
}
