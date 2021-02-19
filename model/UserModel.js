import { BaseModel } from 'startupjs/orm'

export const ROLE = {
  PLAYER: 1,
  PROFESSOR: 2,
}

export default class UserModel extends BaseModel {
  async addSelf({ name, role }) {
    const user = this.root.scope(`${this.getCollection()}.${name}`)
    if (user) {
      return name;
    }
    // const id = this.id()
    await this.root.add(this.getCollection(), {
      id: name,
      name,
      role,
    })

    return name
  }
}
