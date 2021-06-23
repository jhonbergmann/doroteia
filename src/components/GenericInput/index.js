import React, { useEffect, useRef } from 'react'

import {
  Container,
  Input,
  IconContent,
  Button,
  Feedback,
  HighLightOffIcon,
  CheckCircleOutlineIcon,
  ElEyeCloseIcon,
  RemoveRedEyeIcon,
  ClearIcon,
} from './styles'

import { InputTitle } from '../../components/Typography'
import { colors } from '../../themes'

export default function GenericInput({
  // prop-typeInput | Recebe o tipo do input ('disable', 'field', 'error', 'check', 'password', 'password-error', 'password-check');
  // prop-title | Titulo do input, fica acima do input;
  // prop-onClickEye | Funcao onPress() do 'olho' dos inputs do tipo senha;
  // prop-showingPassword | Recebe (true ou false) estado que armazena o valor para o secureTextEntry;
  // prop-secureTextEntry | Se true a entrada de texto obscurece o texto inserido;
  // prop-editable | Se for false, o texto não é editável;
  // prop-onEndEditing | Acionado ao se tirar o foco do input;
  // prop-keyboardType | Tipo do teclado - 'default', 'email-address, 'numeric'...;
  // prop-feedback | Mensagem fica abaixo do input;

  typeInput,
  title,
  onClickEye,
  onClose,
  showingPassword,
  secureTextEntry,
  editable,
  placeholder,
  value,
  onChangeText,
  onEndEditing,
  keyboardType,
  feedback,
  autoCompleteType,
  autoCorrect,
  onSubmitEditing,
  maxLength,
  autoCapitalize,
}) {
  const inputElementRef = useRef(null)

  useEffect(() => {
    if (inputElementRef !== null) {
      inputElementRef.current.setNativeProps({
        style: { fontFamily: 'Roboto-Regular' },
      })
    }
  })

  function renderHighLightOffIcon() {
    return <HighLightOffIcon />
  }

  function renderCheckCircleOutlineIcon() {
    return <CheckCircleOutlineIcon />
  }

  function renderElEyeIcon() {
    return (
      <Button onPress={onClickEye}>
        {!showingPassword ? <ElEyeCloseIcon /> : <RemoveRedEyeIcon />}
      </Button>
    )
  }

  function renderClearIcon() {
    return (
      <Button onPress={onClose}>
        <ClearIcon />
      </Button>
    )
  }

  function renderTypes() {
    switch (typeInput) {
      case 'disable':
        return null

      case 'field':
        return null

      case 'search':
        return renderClearIcon()

      case 'error':
        return renderHighLightOffIcon()

      case 'check':
        return renderCheckCircleOutlineIcon()

      case 'password':
        return renderElEyeIcon()

      case 'password-check':
        return renderElEyeIcon()

      case 'password-error':
        return renderElEyeIcon()

      case 'password-confirm':
        return renderElEyeIcon()

      case 'password-confirm-check':
        return renderElEyeIcon()

      case 'password-confirm-error':
        return renderElEyeIcon()
    }
  }

  function setFeedbackColor() {
    if (
      typeInput === 'check' ||
      typeInput === 'password-check' ||
      typeInput === 'password-confirm-check'
    ) {
      return colors.positive
    } else {
      return colors.negative
    }
  }

  return (
    <Container>
      <InputTitle>{title}</InputTitle>
      <Input
        typeInput={typeInput}
        editable={editable}
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        value={value}
        onChangeText={(text) => onChangeText(text)}
        onEndEditing={onEndEditing}
        keyboardType={keyboardType}
        autoCompleteType={autoCompleteType}
        autoCorrect={autoCorrect}
        onSubmitEditing={onSubmitEditing}
        maxLength={maxLength}
        ref={inputElementRef}
        autoCapitalize={autoCapitalize}
      />
      <IconContent>{renderTypes()}</IconContent>
      <Feedback style={{ color: setFeedbackColor() }}>{feedback}</Feedback>
    </Container>
  )
}
