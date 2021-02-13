import React from 'react'
import { observer, useDoc, useSession } from 'startupjs'
import { Div } from '@startupjs/ui'
import ProfessorView from './ProfessorView'
import PlayerView from './PlayerView'
import { ROLE } from '../../../model/UserModel'
import './index.styl'

export default observer(function PHall () {
  const [currentUserId] = useSession('currentUserId')
  const [user] = useDoc('users', currentUserId)
  console.log('user', user)

  return pug`
    Div.login
      if user.role === ROLE.PROFESSOR
        ProfessorView
      else
        PlayerView
  `
})
