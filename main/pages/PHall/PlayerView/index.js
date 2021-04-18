import React, { useEffect, useState } from 'react'
import { Div, Row, H3, Button, Pagination } from '@startupjs/ui'
import { observer, emit, useQuery, useSession, useDoc } from 'startupjs'
import { GameCard } from 'components'
import './index.styl'

const LIMIT = 10

export default observer(function PlayerView () {
  const [userId] = useSession('userId')
  const [user] = useDoc('users', userId)
  const [skip, setSkip] = useState(0)
  const [games, $games] = useQuery('games', {
    $and: [
      { $or: [
        { playerCount: { $lt: 2 } },
        { playerIds: { $elemMatch: { $eq: userId } } },
      ]},
      { complete: { $eq: false } },
    ],
  })

  const handleClickJoin = async (gameId) => {
    await $games.at(gameId).addPlayer(userId)
    emit('url', `/game/${gameId}`)
  }
  const handleChangePage = (val) => setSkip(val * LIMIT)

  let start = skip
  const end = Math.min(skip + LIMIT, games.length)

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
          while start < end
            Div.item( key=games[start].id )
              GameCard(
                id=games[start].id
                name=games[start].name
                createdOn=new Date(games[start].createdOn)
                participantCount=games[start].playerIds.length
                professorId=games[start++].professorId
                onJoin=handleClickJoin
              )
        Row.pagination( align='center' )
          Pagination(
            count=games.length
            limit=LIMIT
            skip=skip
            onChangePage=handleChangePage
          )
  `
})
