import React, { useEffect, useState } from 'react'
import { Div, Row, H3, Button, Pagination } from '@startupjs/ui'
import { observer, emit, useQuery, useSession, useDoc } from 'startupjs'
import { GameCard } from 'components'
import './index.styl'

const LIMIT = 10

export default observer(function ProfessorView () {
  const [currentUserId] = useSession('currentUserId')
  const [user] = useDoc('users', currentUserId)
  const [games] = useQuery('games', {
    $and: [
      { professorId: {$eq: currentUserId } },
      { complete: { $eq: false } },
    ]
  })
  const [skip, setSkip] = useState(0)

  const handleClickJoin = async (gameId) => {
    emit('url', `/historygame/${gameId}`)
  }
  const handleChangePage = (val) => setSkip(val * LIMIT)

  useEffect(() => {
    if (currentUserId === undefined) {
      emit('url', '/')
    }
  }, [])

  let start = skip
  const end = Math.min(skip + LIMIT, games.length)

  return pug`
    Div
      Row( align='between' vAlign='center' )
        H3 Professor - #{user.name}
        Button.addNew(
          color='primary'
          size='l'
          onPress=() => emit('url', '/add')
        ) Add new
        Button(
          color='primary'
          size='l'
          variant='flat'
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
