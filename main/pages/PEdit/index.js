import React, { useState, useEffect } from 'react'
import { observer, emit, useDoc } from 'startupjs'
import { useParams } from '@startupjs/app'
import { ScrollView } from 'react-native'
import { Link, Div, TextInput, H1, Br, Select, Button } from '@startupjs/ui'
import { CheckboxSet } from 'components'
import { TYPE_OPTIONS, ABILITY_OPTIONS } from '../../../model/PockemonModel'

const emptyPockemon = {
  name: '',
  url: '',
  abilities: [],
  description: ''
}

export default observer(function PEdit () {
  const params = useParams()
  const [pockemon, $pockemon] = useDoc('pockemons', params.id)
  const title = (params.id === undefined ? 'Add' : 'Edit') + ' pokemon'

  const [name, setName] = useState('')
  const [url, setUrl] = useState('')
  const [type, setType] = useState()
  const [abilities, setAbilities] = useState([])
  const [description, setDescription] = useState('')

  useEffect(() => {
    if (pockemon) {
      setName(pockemon.name)
      setUrl(pockemon.url)
      setType(pockemon.type)
      setAbilities(pockemon.abilities)
      setDescription(pockemon.description)
    }
  }, [pockemon])

  const handleSave = () => {
    if (!pockemon) {
      $pockemon.addSelf({
        name,
        url,
        type,
        abilities,
        description,
      })
    } else {
      $pockemon.setEach({
        name,
        url,
        type,
        abilities,
        description,
      })
    }
  }

  return pug`
    Div
      Link( to='/' ) Back
      Div.form
        H1 #{title}
        TextInput(
          label='Name'
          value=name
          onChangeText=setName
        )
        Br
        TextInput(
          label='Url'
          value=url
          onChangeText=setUrl
        )
        Br
        Select(
          label='Type'
          options=TYPE_OPTIONS
          value=type
          onChange=setType
        )
        Br
        CheckboxSet(
          label='Abilities'
          options=ABILITY_OPTIONS
          value=abilities
          onChange=setAbilities
        )
        Br
        TextInput(
          label='Description'
          multiline
          numberOfLines=4
          value=description
          onChangeText=setDescription
        )
        Br
        Button(
          color='primary'
          variant='flat'
          onPress=handleSave
        ) Save
  `
})
