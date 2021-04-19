import React, { useEffect } from 'react'
import { observer, emit, useDoc, useSession } from 'startupjs'
import { useParams } from '@startupjs/app'
import { Button, Div, Span, Row, H3, H2, Link } from '@startupjs/ui'
import { ROUND_RESULT, roundToName } from '../../../const'
import './index.styl'

export default observer(function PGame () {
  const { id } = useParams()
  const [userId] = useSession('userId')

  const [game, $game] = useDoc('games', id)
  const [round, $round] = useDoc('gamerounds', game.gameRoundId)

  const otherUserId = game.playerIds.length === 2
                        ? (game.playerIds[0] === userId ? game.playerIds[1] : game.playerIds[0])
                        : undefined

  const { results } = round
  const handleClickStone = async () => {
    $round.addResult({
      playerId: userId,
      result: ROUND_RESULT.STONE
    })
  }
  const handleClickScissors = async () => {
    $round.addResult({
      playerId: userId,
      result: ROUND_RESULT.SCISSORS
    })
  }
  const handleClickPaper = async () => {
    $round.addResult({
      playerId: userId,
      result: ROUND_RESULT.PAPER
    })
  }

  const handleClickSurrender = () => {
    $game.completeGame()
  }

  let showSurrenderButton = true  
  if (results.length && Object.keys(results[results.length - 1]).length === 2) {
    const result = results[results.length - 1]
    showSurrenderButton = result[userId].points < result[otherUserId].points
  } else if (results.length > 1) {
    const result = results[results.length - 2]
    showSurrenderButton = result[userId].points < result[otherUserId].points
  }
    

  return pug`
    Div.login
      Link( to='/hall' ) Back
      H3.title= game.name
      Div.results
        each result, index in results
          if Object.keys(result).length === 2
            Row( key=index )
              Span.cell= result[userId] && roundToName.get(result[userId].result)
              Span.cell= result[otherUserId] && roundToName.get(result[otherUserId].result)
              Span.smallCell -
              Span.smallCell= result[userId] && result[userId].points
              Span.smallCell= result[otherUserId] && result[otherUserId].points
      if game.playerCount < 2
        Row(align='center')
          H2 Waiting for players
      else if game.complete
        H2 Game complete
      else
        Row.buttons(align='between')
          Button.enter(
            color='primary'
            variant='flat'
            size='l'
            onPress=handleClickStone
          ) Stone
          Button.enter(
            color='primary'
            variant='flat'
            size='l'
            onPress=handleClickScissors
          ) Scissors
          Button.enter(
            color='primary'
            variant='flat'
            size='l'
            onPress=handleClickPaper
          ) Paper
        if showSurrenderButton
          Button.surrender(
            color='error'
            variant='flat'
            size='l'
            onPress=handleClickSurrender
          ) Surrender
  `
})
