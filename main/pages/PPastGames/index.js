import React, { useEffect } from 'react'
import { Div, Span, Row, H3, Button } from '@startupjs/ui'
import { observer, emit, useQuery, useSession, useDoc } from 'startupjs'
import { GameCard } from 'components'
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

  const handleClickJoin = async (gameId) => {
    await $games.at(gameId).addPlayer(currentUserId)
    emit('url', `/game/${gameId}`)
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
              GameCard(
                id=game.id
                name=game.name
                createdOn=new Date(game.createdOn)
                participantCount=game.playerIds.length
                professorId=game.professorId
                onJoin=handleClickJoin
              )
  `
})

