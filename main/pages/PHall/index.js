import React, { useState } from 'react'
import { Pokemon, DeleteModal } from 'components'
import { observer, emit, useQuery, useSession } from 'startupjs'
// import { Div, Row, H1, Button, Modal, TextInput, Collapse, Pagination, Select } from '@startupjs/ui'
import { Checkbox, TextInput, Button, Div, Span } from '@startupjs/ui'
// import { CheckboxSet } from 'components'
// import { TYPE_OPTIONS } from '../../../model/PockemonModel'
import './index.styl'

// const { Content } = Collapse

// const PAGE_COUNT_OPTIONS = [
//   { label: '5', value: 5 },
//   { label: '10', value: 10 },
//   { label: '20', value: 20 },
// ]

export default observer(function PHall () {
  // const [deleteId, setDeleteId] = useState(null)
  // const showModal = deleteId !== null

  const [name, setName] = useState('')
  const [type, setType] = useState(false)

  const [userId, $userId] = use

  // const [collapsed, setCollapsed] = useState(false)

  // const queryParams = { name: { $regex: nameFilter, $options: "$i" } }
  // if (typeFilter.length) {
  //   queryParams.type = { $in: typeFilter }
  // }
  // const [pockemons, $pockemons] = useQuery('pockemons', queryParams)

  // const [page, setPage] = useState(0)
  // const [itemsInPage, setItemsInPage] = useState(5)
  // const pageCount = Math.ceil(pockemons.length / itemsInPage)
  // const realPage = Math.min(page, pageCount)
  // let start = realPage * itemsInPage
  // const end = Math.min((realPage + 1) * itemsInPage, pockemons.length)

  const handleClickEnter = () => emit('url', '/hall')

  // const handleClickDelete = id => {
  //   $pockemons.del(id)
  //   setDeleteId(null)
  // }

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
