import React, { useEffect } from 'react'
import { Div, Span, Row, H3, Button } from '@startupjs/ui'
import { observer, emit, useQuery, useSession, useDoc } from 'startupjs'
import { PastGameCard } from 'components'
import { ROLE } from '../../../model/UserModel'
import './index.styl'

export default observer(function PPastGames () {
  const [currentUserId] = useSession('currentUserId')
  const [user] = useDoc('users', currentUserId)
  const filter = {
    $and: [
      { complete: { $eq: true } },
    ],
  }
  if (user.role === ROLE.PROFESSOR) {
    filter.$and.push({ professorId: { $eq: currentUserId } })
  } else {
    filter.$and.push({ playerIds: { $elemMatch: { $eq: currentUserId } } })
  }
  const [games, $games] = useQuery('games', filter)

  const handleClickOpen = async (gameId) => {
    emit('url', `/pastgame/${gameId}`)
  }

  useEffect(() => {
    if (currentUserId === undefined) {
      emit('url', '/')
    }
  }, [])

  return pug`
    Div
      Row( align='between' vAlign='center' )
        H3 Past games - #{user.name}
        Button(
          color='primary'
          variant='flat'
          size='l'
          onPress=() => emit('url', '/hall')
        ) Back
      Div.grid
        Row.row( wrap )
          each game in games
            Div.item( key=game.id )
              PastGameCard(
                id=game.id
                name=game.name
                professorId=game.professorId
                playerIds=game.playerIds
                gameRoundId=game.gameRoundId
                onOpen=handleClickOpen
              )
  `
})

