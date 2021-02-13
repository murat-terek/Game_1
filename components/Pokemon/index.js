import React, { useState } from 'react'
import { Br, Card, H3, Span, Row, Button, Collapse, Tag } from '@startupjs/ui'
import { Image } from 'react-native'
import { TYPE_OPTIONS, ABILITY_OPTIONS } from '../../model/PockemonModel'
import './index.styl'

const { Content } = Collapse

const typeValueToLabel = new Map(TYPE_OPTIONS.map(o => [o.value, o.label]))
const abilityValueToLabel = new Map(ABILITY_OPTIONS.map(o => [o.value, o.label]))

const tagColors = [
  "mainText",
  "primary",
  "success",
  "warning",
  "error",
  "additional0",
  "additional1",
  "additional2",
  "additional3",
  "additional4",
  "additional5"
]

const getTagColor = (value) => {
  return tagColors[value % tagColors.length]
}

const Pokemon = ({
  name,
  src,
  id,
  type,
  abilities,
  description,
  onEdit,
  onDelete,
}) => {
  const [collapsed, setCollapsed] = useState(false)

  const handleClickEdit = () => {
    onEdit && onEdit(id)
  }

  const handleClickDelete = () => {
    onDelete && onDelete(id)
  }

  const abilitiesText = abilities.map(a => abilityValueToLabel.get(a) || a).join(', ')

  return pug`
    Card.card
      Image.img( source={uri: src} )
      Tag.type(
        color=getTagColor(type)
      ) #{typeValueToLabel.get(type)}
      Br
      H3 #{name}
      Br
      Span( size='xl' ) #{abilitiesText}
      Br
      Collapse(
        title='Description'
        open=collapsed
        onChange=() => setCollapsed(!collapsed)
      )
        Content #{description}
      Br
      Row( align='right' )
        Button(
          onPress=handleClickDelete
          color='error'
          variant='flat'
        ) Delete
        Button.edit(
          onPress=handleClickEdit
          color='primary'
          variant='flat'
        ) Edit
  `
}

export default Pokemon
