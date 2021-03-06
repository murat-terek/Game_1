import React, { useEffect } from 'react'
import { Div, Span, Row, H3, Button } from '@startupjs/ui'
import { observer, emit, useQuery, useSession, useDoc } from 'startupjs'
import { GameCard } from 'components'
import './index.styl'

export default observer(function ProfessorView () {
  const [currentUserId] = useSession('currentUserId')
  const [user] = useDoc('users', currentUserId)
  const [games] = useQuery('games', { professorId: { $eq: currentUserId } })

  useEffect(() => {
    if (currentUserId === undefined) {
      emit('url', '/')
    }
  }, [])

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
          each game in games
            Div.item( key=game.id )
              GameCard(
                id=game.id
                name=game.name
                createdOn=new Date(game.createdOn)
                participantCount=game.playerIds.length
                professorId=game.professorId
                onJoin=(id) => console.log(id)
              )
  `
})
