import React, { useState, useEffect } from 'react'
import { Keyboard } from 'react-native'

import {
  Container,
  TopContainer,
  CenteredContainer,
  TechsContainer,
  TechsContent,
  BottomContainer,
  TopTextContainer,
  BottomTextContainer,
  ActivityIndicator,
} from './styles'

import {
  Button,
  Checkbox,
  StepsProgressBar,
  GenericInput,
} from '../../../../components'

import { StepTitle, StepText } from '../../../../components/Typography'
import { TotalSteps, steps, strings } from '../../../../helpers/constants'
import { useKeyboardStatus, useInput } from '../../../../hooks'
import api from '../../../../services/api'

import { useDispatch } from 'react-redux'
import { Creators as StacksActions } from '../../../../store/ducks/stacks'

import { useNavigation, useRoute } from '@react-navigation/native'

export default function RegisterTechnologies() {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const { technologiesStack } = StacksActions

  const route = useRoute()
  const params = route.params
  const previousProgress = params.currentBarProgress

  const [currentBarProgress, setCurrentBarProgress] = useState(previousProgress)
  const [keyboardIsOpen] = useKeyboardStatus()
  const typeOfInput = 'word'
  const {
    typeInput,
    inputData,
    setInputData,
    editable,
    showingInputData,
    onChangeShowingInputData,
    onEndEditing,
    feedback,
    autoCompleteType,
    autoCorrect,
    maxLength,
    autoCapitalize,
  } = useInput({ typeOfInput })

  const [dataTechnologies, setDataTechnologies] = useState(null)
  const [technologies, setTechnologies] = useState(new Set())

  function insertOrDeleteTechnology(technology) {
    const newTechnologies = new Set(technologies)
    if (!newTechnologies.has(technology)) {
      setTechnologies(newTechnologies.add(technology))
    } else {
      newTechnologies.delete(technology)
      setTechnologies(newTechnologies)
    }
  }

  useEffect(() => {
    if (dataTechnologies) {
      const newDataTechnologies = JSON.parse(JSON.stringify(dataTechnologies))
      newDataTechnologies.map(function (tech) {
        if (technologies.has(tech.label)) {
          tech.typeCheckbox = 'small-check'
        } else {
          tech.typeCheckbox = 'small-null'
        }
      })
      setDataTechnologies(newDataTechnologies)
    }
  }, [technologies])

  useEffect(() => {
    setTimeout(() => {
      setCurrentBarProgress(7 / TotalSteps)
    }, 300)
  }, [dataTechnologies])

  useEffect(() => {
    fetchData()
  }, [])

  let isCancelled = false
  const errorMessage = 'Falha no carregamento de Tecnologias'

  async function fetchData() {
    try {
      if (!isCancelled) {
        const res = await api.get(`/skills.json?alt=media`)
        const newDataTechnologies = res.data
        newDataTechnologies.map(function (tech) {
          tech.typeCheckbox = 'small-null'
        })
        setDataTechnologies(newDataTechnologies)
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
    insertOrDeleteTechnology(inputData)
    dispatch(technologiesStack(Array.from(technologies)))
    navigation.navigate('RegisterContact', { currentBarProgress })
  }

  if (dataTechnologies) {
    return (
      <Container keyboardIsOpen={keyboardIsOpen}>
        <TopContainer>
          <TopTextContainer>
            <StepTitle>{steps.FifthStepRegisterTechnologies.title}</StepTitle>
          </TopTextContainer>
          <BottomTextContainer>
            <StepText>{steps.FifthStepRegisterTechnologies.text}</StepText>
          </BottomTextContainer>
        </TopContainer>

        <CenteredContainer>
          {keyboardIsOpen ? null : (
            <TechsContainer>
              {dataTechnologies.map((item, value) => {
                return (
                  <TechsContent key={item.id}>
                    <Checkbox
                      activeOpacity={1}
                      name={item.label}
                      typeCheckbox={item.typeCheckbox}
                      onPress={() => insertOrDeleteTechnology(item.label)}
                    />
                  </TechsContent>
                )
              })}
            </TechsContainer>
          )}

          <GenericInput
            typeInput={typeInput}
            title={strings.titleExtra}
            value={inputData}
            onChangeText={setInputData}
            placeholder={strings.placeholderTechnology}
            editable={editable}
            onEndEditing={onEndEditing}
            secureTextEntry={!showingInputData}
            feedback={feedback}
            onClickEye={onChangeShowingInputData}
            showingPassword={showingInputData}
            autoCompleteType={autoCompleteType}
            autoCorrect={autoCorrect}
            onSubmitEditing={() => Keyboard.dismiss}
            maxLength={maxLength}
            autoCapitalize={autoCapitalize}
          />
        </CenteredContainer>

        <BottomContainer>
          <StepsProgressBar progress={currentBarProgress} />
          <Button
            name={strings.nextButton}
            type="primary"
            onPress={() => handleNavigationNextStep()}
          />
        </BottomContainer>
      </Container>
    )
  } else {
    return <ActivityIndicator />
  }
}
