import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigation, useRoute } from '@react-navigation/native'

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

export default function RegisterArea() {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const { areaStack } = StacksActions

  const route = useRoute()
  const params = route.params
  const previousProgress = params.currentBarProgress

  const [currentBarProgress, setCurrentBarProgress] = useState(previousProgress)
  const [selectedArea, setSelectedSArea] = useState('')

  const [areas, setAreas] = useState(null)

  useEffect(() => {
    setTimeout(() => {
      setCurrentBarProgress(6 / TotalSteps)
    }, 300)
  }, [areas])

  useEffect(() => {
    fetchData()
  }, [])

  let isCancelled = false
  const errorMessage = 'Falha no carregamento de Áreas'

  async function fetchData() {
    try {
      if (!isCancelled) {
        const res = await api.get(`/work-areas.json?alt=media`)
        setAreas(res.data)
        isCancelled = true
      }
    } catch (e) {
      console.log(e)
      if (!isCancelled) {
        navigation.navigate('RegistrationGenericFail', { errorMessage, fetchData })
      }
    }
  }

  function handleNavigationNextStep() {
    dispatch(areaStack(selectedArea))
    navigation.navigate('RegisterTechnologies', { currentBarProgress })
  }

  if (areas) {
    return (
      <Container>
        <TopContainer>
          <TopTextContainer>
            <StepTitle>{steps.FourthStepRegisterArea.title}</StepTitle>
          </TopTextContainer>
          <BottomTextContainer>
            <StepText>{steps.FourthStepRegisterArea.text}</StepText>
          </BottomTextContainer>

          <Dropdown
            firstLabelDisable={strings.dropdownArea}
            title={strings.titleArea}
            data={areas}
            selectedValue={selectedArea}
            onValueChangeSelected={setSelectedSArea}
          />
        </TopContainer>

        <CenteredContainer>
          <Image source={rafiki} />
        </CenteredContainer>

        <BottomContainer>
          <StepsProgressBar progress={currentBarProgress} />
          <Button
            disabled={selectedArea ? false : true}
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
