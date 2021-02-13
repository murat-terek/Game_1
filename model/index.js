import UserModel from './UserModel'
import GameModel from './GameModel'
import GameRoundsModel from './GameRoundsModel'

export default function (racer) {
  racer.orm('users.*', UserModel)
  racer.orm('games.*', GameModel)
  racer.orm('gamerounds.*', GameRoundsModel)
}
