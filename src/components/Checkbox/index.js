import React from 'react'
import LottieView from 'lottie-react-native'

import { TouchableOpacity, CheckCircleOutlineIcon, Body } from './styles'
import { typing } from '../../lottie'

// prop-name | Recebe o nome do checkbox/botao;
// prop-onPress | Recebe funcao onPress;
// prop-typeCheckbox | Recebe tipo do checkbox - 'large-selected', 'small-selected', 'large-null', 'large-check', 'small-null', 'small-check';

export default function Checkbox({
  name,
  onPress,
  typeCheckbox,
  activeOpacity,
}) {
  function renderCheckCircleOutlineIcon() {
    return <CheckCircleOutlineIcon />
  }

  function renderTyping() {
    return (
      <LottieView
        style={{
          position: 'absolute',
          right: 7,
          width: 25,
        }}
        resizeMode="contain"
        source={typing}
        autoSize
        autoPlay
        loop
      />
    )
  }

  function renderCheck() {
    switch (typeCheckbox) {
      case 'large-selected':
        return renderTyping()

      case 'small-selected':
        return null

      case 'large-null':
        return null

      case 'large-check':
        return renderCheckCircleOutlineIcon()

      case 'small-null':
        return null

      case 'small-check':
        return null
    }
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      typeCheckbox={typeCheckbox}
      activeOpacity={activeOpacity}
    >
      <Body>{name}</Body>
      {renderCheck()}
    </TouchableOpacity>
  )
}
