import React from 'react'
import { Span } from '@startupjs/ui'

export const Info = ({
  label,
  children,
}) => {
  return pug`
    Span
      Span( bold=true size='xl' )= label+': '
      Span( size='xl' )= children
  `
}
