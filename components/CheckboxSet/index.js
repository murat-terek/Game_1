import React from 'react'
import { Checkbox, Div, Span } from '@startupjs/ui'
import './index.styl'

const CheckboxSet = ({ label, value = [], options = [], onChange = () => {} }) => {
  const handleChange = (checkValue) => (checked) => {
    if (checked) {
      onChange([...value, checkValue])
    } else {
      const newValue = value.filter(v => v !== checkValue)
      onChange(newValue)
    }
  }

  return pug`
    Div
      Span.label #{label}
      each option in options
        Checkbox(
          key=option.value
          label=option.label
          value=value.includes(option.value)
          onChange=handleChange(option.value)
        )
  `
}

export default CheckboxSet
