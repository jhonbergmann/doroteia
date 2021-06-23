import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'

import {
  Container,
  TopContainer,
  CenteredContainer,
  BottomContainer,
  TopTextContainer,
  BottomTextContainer,
  Image,
  Title,
  Text,
} from './styles'

import { Button } from '../../../../../components'
import { cuate } from '../../../../../../assets/imgs/register'
import { steps } from '../../../../../helpers/constants'

export default function RegistrationHiddenLoginFail() {
  const navigation = useNavigation()

  const route = useRoute()
  const params = route.params
  const errorMessage = params.errorMessage

  function handleNavigationToSignIn() {
    navigation.navigate('SignIn')
  }


  return (
    <Container>
      <TopContainer>
        <TopTextContainer>
          <Title>{steps.RegistrationFail.title}</Title>
        </TopTextContainer>
        <BottomTextContainer>
          <Text>
            {errorMessage !== '' ? errorMessage : steps.RegistrationFail.text}
          </Text>
        </BottomTextContainer>
      </TopContainer>

      <CenteredContainer>
        <Image source={cuate} />
      </CenteredContainer>

      <BottomContainer>
        <Button
          name={'Entrar'}
          type="secondary"
          onPress={() => handleNavigationToSignIn()}
        />
      </BottomContainer>
    </Container>
  )
}
