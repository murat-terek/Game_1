import React, { useState } from 'react'
import { observer, emit, useDoc, useSession } from 'startupjs'
import { Checkbox, TextInput, Button, Div } from '@startupjs/ui'
import { ROLE } from '../../../model/UserModel'
import './index.styl'

export default observer(function PHome () {
  const [name, setName] = useState('')
  const [type, setType] = useState(false)

  const [, $users] = useDoc('users')
  const [, $userId] = useSession('userId')

  const handleClickEnter = async () => {
    const userId = await $users.addSelf({
      name,
      role: type ? ROLE.PROFESSOR : ROLE.PLAYER,
    })
    $userId.set(userId)
    emit('url', '/hall')
  }

  return pug`
    Div.login
      TextInput(
        label='Name'
        value=name
        onChangeText=setName
      )
      Checkbox.checkbox(
        label='Log in as professor'
        value=type
        onChange=setType
      )
      Button.enter(
        color='primary'
        variant='flat'
        onPress=handleClickEnter
      ) Enter
  `
})
