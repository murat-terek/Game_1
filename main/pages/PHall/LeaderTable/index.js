import React, { useEffect } from 'react'
import { observer, emit, useDoc, useSession, useQuery } from 'startupjs'
import { Checkbox, TextInput, Button, Div, Span, Row, H3,H2, Link } from '@startupjs/ui'
import { ROLE } from '../../../../model/UserModel'
import './index.styl'

const getFinalResults = (results) => {
  if (results.length === 0) {
    return {}
  }

  if (results.length >= 1 && Object.keys(results[0]).length === 1 ) {
    return {}
  }

  const playerIds = Object.keys(results[0])

  if (results[0][playerIds[0]].points === undefined || results[0][playerIds[1]].points === undefined) {
    return {}
  }

  const lastInvalidResultIndex = results.findIndex(
    result => Object.keys(result).length === 1
    || result[playerIds[0]].points === undefined
    || result[playerIds[1]].points === undefined
  )
  const lastValidResult = lastInvalidResultIndex === -1 ? results[results.length - 1] : results[lastInvalidResultIndex - 1]
  return {
    [playerIds[0]]: lastValidResult[playerIds[0]].points,
    [playerIds[1]]: lastValidResult[playerIds[1]].points
  }
}

const getResultTable = (gameRounds) => {
  const resultTable = {}

  gameRounds.forEach(round => {
    const { results } = round
    const lastResult = getFinalResults(results)
    const playerIds = Object.keys(lastResult);
    playerIds.forEach(playerId => {
      resultTable[playerId] = resultTable[playerId] || 0
      resultTable[playerId] += lastResult[playerId]
    })
  })

  const resultTableIds = Object.keys(resultTable)
  const resultArray = resultTableIds.map(playerId => ({
    name: playerId,
    points: resultTable[playerId]
  })).sort((a, b) => b.points - a.points)

  return resultArray
}

export default observer(function LeaderTable () {
  const [users = []] = useQuery('users', { role: ROLE.PLAYER })
  const userIds = users.map(user => user.id)
  const [games] = useQuery('games', { playerIds: { $elemMatch: { $in: userIds } } })
  const gameRoundIds = games.map(game => game.gameRoundId)
  const [gameRounds] = useQuery('gamerounds', { _id: { $in: gameRoundIds } })
  const resultTable = getResultTable(gameRounds)

  return pug`
    Div.leaderTable
      H3.title Leader Table
      Row.tableTitle( key='title' )
        Span.titleCell Player name
        Span.titleCell Points
      each resultCell, index in resultTable
        Row( key=index )
          Span.cell #{resultCell.name}
          Span.cell #{resultCell.points}
  `
})
