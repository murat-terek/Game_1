import React, { useEffect } from 'react'
import { observer, emit, useDoc, useSession } from 'startupjs'
import { useParams } from '@startupjs/app'
import { Button, Div, Span, Row, H3, H2, Link } from '@startupjs/ui'
import { roundToName } from '../../../const'
import './index.styl'

export default observer(function PHistoryGame () {
  const { id } = useParams()

  const [game, $game] = useDoc('games', id)
  const firlsPlayerId = game.playerIds[0]
  const secondPlayerId = game.playerIds[1]
  const [round, $round] = useDoc('gamerounds', game.gameRoundId)

  const { results } = round

  const handleClickCompleteGame = () => {
    $game.completeGame()
  }

  return pug`
    Div.login
      Link( to='/hall' ) Back
      H3.title= game.name
      Div.results
        each result, index in results
          if Object.keys(result).length === 2
            Row( key=index )
              Span.cell= result[firlsPlayerId] && roundToName.get(result[firlsPlayerId].result)
              Span.cell= result[secondPlayerId] && roundToName.get(result[secondPlayerId].result)
              Span.smallCell -
              Span.smallCell= result[firlsPlayerId] && result[firlsPlayerId].points
              Span.smallCell= result[secondPlayerId] && result[secondPlayerId].points
      if game.playerCount < 2
        Row(align='center')
          H2 Waiting for players
      else if game.complete
        H2 Game complete
      else
        Button.completeGame(
          color='error'
          variant='flat'
          size='l'
          onPress=handleClickCompleteGame
        ) Complete game
  `
})
