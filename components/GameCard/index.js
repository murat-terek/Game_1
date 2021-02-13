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

const GameCard = ({
  id,
  name,
  createdOn,
  participantCount,
  professorId,
  onJoin,
}) => {
  const [user] = useDoc('users', professorId)

  const handleClickJoin = () => {
    onJoin && onJoin(id)
  }

  return pug`
    Card.card
      H3 #{name}
      Br
      Info( label='Created on') #{createdOn.toDateString()}
      Info( label='Participants') #{participantCount}
      Info( label='Professor name') #{user.name}
      Br
      Row( align='right' )
        Button.join(
          onPress=handleClickJoin
          color='primary'
          variant='flat'
        ) Join
  `
}

export default GameCard
