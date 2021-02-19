import React, { useState, useEffect } from 'react'
import { observer, emit, useDoc, useSession } from 'startupjs'
import { useParams } from '@startupjs/app'
import { Checkbox, TextInput, Button, Div, Row, H3, Link } from '@startupjs/ui'
import { ROUND_RESULT } from '../../../model/GameRoundsModel'
import './index.styl'


// WIP
export default observer(function PGame () {
  const { id } = useParams()
  console.log('id', id)
  // const [name, setName] = useState('')
  // const [type, setType] = useState(false)
  const [currentUserId] = useSession('currentUserId')
  console.log('currentUserId', currentUserId)

  const [game, $game] = useDoc('games', id)
  const [round, $round] = useDoc('gamerounds', game.gameRoundId)
  console.log('game', game)
  console.log('round', round)
  const { results } = round;
  console.log('results', results)
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
      Row.buttons(align='between')
        Button.enter(
          color='primary'
          variant='flat'
          onPress=handleClickStone
        ) Stone
        Button.enter(
          color='primary'
          variant='flat'
          onPress=handleClickScissors
        ) Scissors
        Button.enter(
          color='primary'
          variant='flat'
          onPress=handleClickPaper
        ) Paper
  `
})
