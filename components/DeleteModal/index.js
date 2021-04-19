import React from 'react'
import { Button, Modal } from '@startupjs/ui'

const {
  Header,
  Content,
  Actions,
} = Modal

const DeleteModal = ({
  visible,
  onDismiss,
  onConfirm,
}) => {
  return pug`
    Modal( visible=visible onDismiss=onDismiss )
      Header Delete Pockemon
      Content Are you sure you want to delete the pockemon?
      Actions
        Button(
          onPress=onDismiss
        ) Cancel
        Button(
          pushed
          onPress=onConfirm
          color='error'
          variant='flat'
        ) Delete
  `
}

export default DeleteModal
