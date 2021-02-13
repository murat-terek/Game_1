import React from 'react'
import { Div, Span, Row, H3, Button } from '@startupjs/ui'
import { observer, emit, useQuery, useSession } from 'startupjs'
import { GameCard } from 'components'
import './index.styl'

const PlayerView = () => {
  const [currentUserId] = useSession('currentUserId')
  const [games] = useQuery('games', { playerIds: { $size: 0 } })

  return pug`
    Div
      Row( align='between' vAlign='center' )
        H3 Hall
        Button(
          color='primary'
          variant='flat'
          size='l'
          onPress=() => emit('url', '/add')
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
}

export default PlayerView

