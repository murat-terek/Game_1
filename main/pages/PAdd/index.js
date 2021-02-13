import React, { useState, useEffect } from 'react'
import { observer, emit, useDoc, useSession } from 'startupjs'
import { useParams } from '@startupjs/app'
import { Link, Div, TextInput, H2, Br, Button } from '@startupjs/ui'
import './index.styl'

export default observer(function PAdd () {
  const params = useParams()
  const [, $games] = useDoc('games');
  const [currentUserId] = useSession('currentUserId')

  const [name, setName] = useState('')

  const handleSave = () => {
    console.log('handleSave')
    console.log('name', name)
    console.log('currentUserId', currentUserId)
    $games.addSelf({
      name,
      professorId: currentUserId
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
