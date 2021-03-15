import React, { useState, useEffect } from 'react'
import { observer, emit, useDoc, useSession } from 'startupjs'
import { useParams } from '@startupjs/app'
import { Div, Span, Row, H3, Link, Collapse, Pagination } from '@startupjs/ui'
import { roundToName } from '../../../model/GameRoundsModel'
import { ROLE } from '../../../model/UserModel'
import './index.styl'

const LIMIT = 10

export default observer(function PPastGame () {
  const { id } = useParams()
  let [currentUserId] = useSession('currentUserId')
  const [user] = useDoc('users', currentUserId)

  const [game, $game] = useDoc('games', id)
  const firlsPlayerId = user.role === ROLE.PROFESSOR ? game.playerIds[0] : currentUserId
  const secondPlayerId = user.role === ROLE.PLAYER
                          ? (game.playerIds[0] === currentUserId
                            ? game.playerIds[1] : game.playerIds[0])
                          : game.playerIds[1]
  const [firstPlayer] = useDoc('users', firlsPlayerId)
  const [secondPlayer] = useDoc('users', secondPlayerId)

  const [open, setOpen] = useState(false)
  const [round = {}, $round] = useDoc('gamerounds', open ? game.gameRoundId : null)
  const [skip, setSkip] = useState(0)

  const { results = [] } = round

  const handleOpen = () => setOpen(!open)
  const handleChangePage = (val) => setSkip(val * LIMIT)

  useEffect(() => {
    if (currentUserId === undefined) {
      emit('url', '/')
    }
  }, [])

  let start = skip
  const end = Math.min(skip + LIMIT, results.length)

  return pug`
    Div.login
      Link( to='/pastgames' ) Back
      H3.title #{game.name}
      Div.results
        Collapse( title="Results" open=open onChange=handleOpen)
          Row.title( key='title' )
            Span.cell #{firstPlayer.name}
            Span.cell #{secondPlayer.name}
          while start < end
            if Object.keys(results[start]).length === 2
              Row( key=start )
                Span.cell #{results[start][firlsPlayerId] && roundToName.get(results[start][firlsPlayerId].result)}
                Span.cell #{results[start][secondPlayerId] && roundToName.get(results[start][secondPlayerId].result)}
                Span.smallCell -
                Span.smallCell #{results[start][firlsPlayerId] && results[start][firlsPlayerId].points}
                Span.smallCell #{results[start][secondPlayerId] && results[start++][secondPlayerId].points}
          Pagination.pagination(
            count=results.length
            limit=LIMIT
            skip=skip
            onChangePage=handleChangePage
          )
  `
})
