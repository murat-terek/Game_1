import React from 'react'
import { Br, Card, H3, Span, Row, Button } from '@startupjs/ui'
import { useDoc } from 'startupjs'
import { Image } from 'react-native'
import './index.styl'

const Info = ({
  label,
  children,
}) => {
  return pug`
    Span
      Span( bold=true size='xl' ) #{label}: 
      Span( size='xl' ) #{children}
  `
}

const PastGameCard = ({
  id,
  name,
  professorId,
  playerIds,
  gameRoundId,
  onOpen,
}) => {
  const [professor] = useDoc('users', professorId)
  const [player1] = useDoc('users', playerIds[0])
  const [player2] = useDoc('users', playerIds[1])
  const [result] = useDoc('gamerounds', gameRoundId)
  const finalResult = result && result.results.length ? result.results[result.results.length - 1] : {}
  const player1Result = (finalResult[playerIds[0]] && finalResult[playerIds[0]].points) || 0
  const player2Result = (finalResult[playerIds[1]] && finalResult[playerIds[1]].points) || 0

  const handleClickOpen = () => {
    onOpen && onOpen(id)
  }

  return pug`
    Card.card
      H3 #{name}
      Br
      Info( label='Professor name') #{professor.name}
      Info( label='Player 1') #{player1.name} - #{player1Result}
      Info( label='Player 2') #{player2.name} - #{player2Result}
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
