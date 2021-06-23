import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigation, useRoute } from '@react-navigation/native'
import axios from 'axios'

import {
  Container,
  TopContainer,
  CenteredContainer,
  BottomContainer,
  TopTextContainer,
  BottomTextContainer,
  Image,
  ActivityIndicator,
} from './styles'

import { StepsProgressBar, Dropdown, Button } from '../../../../components'
import { StepTitle, StepText } from '../../../../components/Typography'
import { rafiki } from '../../../../../assets/imgs/register'
import { TotalSteps, steps, strings } from '../../../../helpers/constants'
import { Creators as StacksActions } from '../../../../store/ducks/stacks'
import api from '../../../../services/api'

export default function RegisterStartup() {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const { startupStack } = StacksActions

  const route = useRoute()
  const params = route.params
  const previousProgress = params.currentBarProgress

  const [currentBarProgress, setCurrentBarProgress] = useState(previousProgress)
  const [selectedStartup, setSelectedStartup] = useState('')

  const [startups4All, setStartups4All] = useState(null)

  useEffect(() => {
    setTimeout(() => {
      setCurrentBarProgress(5 / TotalSteps)
    }, 300)
  }, [startups4All])

  useEffect(() => {
    fetchData()
  }, [])

  let isCancelled = false
  const errorMessage = 'Falha no carregamento de Startups'

  async function fetchData() {
    try {
      if (!isCancelled) {
        const res = await api.get(`/companies.json?alt=media`)
        setStartups4All(res.data)
        isCancelled = true
      }
    } catch (e) {
      if (!isCancelled) {
        navigation.navigate('RegistrationGenericFail', { errorMessage, fetchData })
      }
    }
  }

  function handleNavigationNextStep() {
    dispatch(startupStack(selectedStartup))
    navigation.navigate('RegisterArea', { currentBarProgress })
  }

  if (startups4All) {
    return (
      <Container>
        <TopContainer>
          <TopTextContainer>
            <StepTitle>{steps.ThirdStepRegisterStartup.title}</StepTitle>
          </TopTextContainer>
          <BottomTextContainer>
            <StepText>{steps.ThirdStepRegisterStartup.text}</StepText>
          </BottomTextContainer>

          <Dropdown
            firstLabelDisable={strings.dropdownStartup}
            title={strings.titleStartup}
            data={startups4All}
            selectedValue={selectedStartup}
            onValueChangeSelected={setSelectedStartup}
          />
        </TopContainer>

        <CenteredContainer>
          <Image source={rafiki} />
        </CenteredContainer>

        <BottomContainer>
          <StepsProgressBar progress={currentBarProgress} />
          <Button
            disabled={selectedStartup ? false : true}
            name={strings.nextButton}
            type="primary"
            onPress={() => {
              handleNavigationNextStep()
            }}
          />
        </BottomContainer>
      </Container>
    )
  } else {
    return <ActivityIndicator />
  }
}
