import React from 'react'
import { ScrollView } from 'react-native'
import { Layout as StartupLayout, Content } from '@startupjs/ui'
import './index.styl'

const Layout = ({ children }) => {
  return pug`
    StartupLayout
      ScrollView.root
        Content.content( width='wide' )= children
  `
}

export default Layout
