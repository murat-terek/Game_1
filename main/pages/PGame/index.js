import React, { useState, useEffect } from 'react'
import { observer, emit, useDoc, useSession } from 'startupjs'
import { useParams } from '@startupjs/app'
import { Checkbox, TextInput, Button, Div, Span, Row, H3,H2, Link } from '@startupjs/ui'
import { ROUND_RESULT, roundToName } from '../../../model/GameRoundsModel'
import './index.styl'

export default observer(function PGame () {
  const { id } = useParams()
  const [currentUserId] = useSession('currentUserId')

  const [game, $game] = useDoc('games', id)
  const [round, $round] = useDoc('gamerounds', game.gameRoundId)

  const otherUserId = game.playerIds.length === 2
                        ? (game.playerIds[0] === currentUserId ? game.playerIds[1] : game.playerIds[0])
                        : undefined

  const { results } = round
  const handleClickStone = async () => {
    $round.addResult({
      playerId: currentUserId,
      result: ROUND_RESULT.STONE
    })
  }
  const handleClickScissors = async () => {
    $round.addResult({
      playerId: currentUserId,
      result: ROUND_RESULT.SCISSORS
    })
  }
  const handleClickPaper = async () => {
    $round.addResult({
      playerId: currentUserId,
      result: ROUND_RESULT.PAPER
    })
  }

  useEffect(() => {
    if (currentUserId === undefined) {
      emit('url', '/')
    }
  }, [])

  return pug`
    Div.login
      Link( to='/hall' ) Back
      H3.title #{game.name}
      Div.results
        each result, index in results
          if Object.keys(result).length === 2
            Row( key=index )
              Span.cell #{result[currentUserId] && roundToName.get(result[currentUserId].result)}
              Span.cell #{result[otherUserId] && roundToName.get(result[otherUserId].result)}
              Span.smallCell -
              Span.smallCell #{result[currentUserId] && result[currentUserId].points}
              Span.smallCell #{result[otherUserId] && result[otherUserId].points}
      if game.playerCount < 2
        Row(align='center')
          H2 Waiting for players
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
  `
})
