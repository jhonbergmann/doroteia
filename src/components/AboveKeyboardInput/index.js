import React from 'react'

import {
  KeyboardAvoidingView,
  RowContent,
  AboveKeyboardInput as Input,
  Button,
  CheckCircleIcon,
} from './styles'

export default function AboveKeyboardInput({
  // prop-typeInput | Recebe o tipo do input, 'whatsapp', 'teams', 'telegram', 'discord';
  // feedback | Recebe o tipo de feedback, 'field', 'check', 'error';
  // prop-placeholderTextColor | Recebe a cor do texto placeholder;

  typeInput,
  autoFocus,
  inputRef,
  placeholder,
  placeholderTextColor,
  onClickCheck,
  value,
  onChangeText,
  onEndEditing,
  feedback,
}) {
  function renderInput() {
    return (
      <Input
        typeInput={typeInput}
        feedback={feedback}
        autoFocus={autoFocus}
        ref={inputRef}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        value={value}
        onChangeText={onChangeText}
        onEndEditing={onEndEditing}
      />
    )
  }

  return (
    <KeyboardAvoidingView feedback={feedback}>
      <RowContent>
        {renderInput()}
        <Button onPress={onClickCheck}>
          <CheckCircleIcon />
        </Button>
      </RowContent>
    </KeyboardAvoidingView>
  )
}
