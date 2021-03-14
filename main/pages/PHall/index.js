import React, { useEffect } from 'react'
import { observer, emit, useDoc, useSession } from 'startupjs'
import { Div } from '@startupjs/ui'
import ProfessorView from './ProfessorView'
import PlayerView from './PlayerView'
import { ROLE } from '../../../model/UserModel'
import LeaderTable from './LeaderTable'
import './index.styl'

export default observer(function PHall () {
  const [currentUserId] = useSession('currentUserId')
  const [user] = useDoc('users', currentUserId)

  useEffect(() => {
    if (currentUserId === undefined) {
      emit('url', '/')
    }
  }, [])

  return pug`
    Div.login
      if user.role === ROLE.PROFESSOR
        ProfessorView
      else
        PlayerView
      LeaderTable
  `
})
