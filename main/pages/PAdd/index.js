import React, { useState, useEffect } from 'react'
import { observer, emit, useDoc, useSession } from 'startupjs'
import { Link, Div, TextInput, H2, Button } from '@startupjs/ui'
import './index.styl'

export default observer(function PAdd () {
  const [, $games] = useDoc('games')
  const [userId] = useSession('userId')

  const [name, setName] = useState('')

  const handleSave = () => {
    $games.addSelf({
      name,
      professorId: userId
    })
  }

  return pug`
    Div
      Link( to='/hall' ) Back
      Div.form
        H2 Create new game
        TextInput(
          label='Name'
          value=name
          onChangeText=setName
        )
        Button.save(
          color='primary'
          variant='flat'
          onPress=handleSave
        ) Save
  `
})
