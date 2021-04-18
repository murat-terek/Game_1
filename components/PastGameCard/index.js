import React from 'react'
import { Br, Card, H3, Row, Button } from '@startupjs/ui'
import { useDoc, useQuery } from 'startupjs'
import { Image } from 'react-native'
import { Info } from '../Info'
import './index.styl'

const PastGameCard = ({
  id,
  name,
  professorId,
  playerIds,
  gameRoundId,
  onOpen,
}) => {
  const [professor] = useDoc('users', professorId)
  const [players, $players] = useQuery('users', { _id: { $in: playerIds } })
  const [result] = useDoc('gamerounds', gameRoundId)
  const finalResult = result && result.results.length ? result.results[result.results.length - 1] : {}
  const player1Result = (finalResult[playerIds[0]] && finalResult[playerIds[0]].points) || 0
  const player2Result = (finalResult[playerIds[1]] && finalResult[playerIds[1]].points) || 0

  const handleClickOpen = () => {
    onOpen && onOpen(id)
  }

  return pug`
    Card.card
      H3= name
      Br
      Info( label='Professor name')= professor.name
      Info( label='Player 1')= players[0].name+' - '+player1Result
      Info( label='Player 2')= players[1].name+' - '+player2Result
      Br
      Row( align='right' )
        Button.join(
          onPress=handleClickOpen
          color='primary'
          variant='flat'
        ) Open
  `
}

export default PastGameCard
