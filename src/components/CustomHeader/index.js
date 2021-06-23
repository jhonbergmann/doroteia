import React from 'react'
import { useNavigation } from '@react-navigation/native'

import { Container, Button, ArrowBackIcon, Line } from './styles'

export default function CustomHeader() {
  const navigation = useNavigation()

  return (
    <Container>
      <Button onPress={() => navigation.goBack()}>
        <ArrowBackIcon />
      </Button>

      <Line />
    </Container>
  )
}
