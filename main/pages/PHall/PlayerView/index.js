import React, { useEffect } from 'react'
import { Div, Span, Row, H3, Button } from '@startupjs/ui'
import { observer, emit, useQuery, useSession, useDoc } from 'startupjs'
import { GameCard } from 'components'
import './index.styl'

export default observer(function PlayerView () {
  const [currentUserId] = useSession('currentUserId')
  const [user] = useDoc('users', currentUserId)
  const [games, $games] = useQuery('games', {
    $and: [
      { $or: [
        { playerCount: { $lt: 2 } },
        { playerIds: { $elemMatch: { $eq: currentUserId } } },
      ]},
      { complete: { $eq: false } },
    ],

  })

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
        H3 Player - #{user.name}
        Button(
          color='primary'
          variant='flat'
          size='l'
          onPress=() => emit('url', '/pastgames')
        ) Past games
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

