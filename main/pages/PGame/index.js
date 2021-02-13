import React, { useState } from 'react'
import { observer, emit, useDoc, useSession } from 'startupjs'
import { Checkbox, TextInput, Button, Div } from '@startupjs/ui'
import { ROLE } from '../../../model/UserModel'
import './index.styl'


// WIP
export default observer(function PGame () {
  const [name, setName] = useState('')
  const [type, setType] = useState(false)

  const [, $users] = useDoc('users');
  const [, $currentUserId] = useSession('currentUserId')
  const handleClickEnter = async () => {
    console.log()
  }

  return pug`
    Div.login
      Button.enter(
        color='primary'
        variant='flat'
        onPress=handleClickEnter
      ) Stone
      Button.enter(
        color='primary'
        variant='flat'
        onPress=handleClickEnter
      ) Scissors
      Button.enter(
        color='primary'
        variant='flat'
        onPress=handleClickEnter
      ) Paper
  `
})
