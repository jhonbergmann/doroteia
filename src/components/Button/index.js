import React from 'react'

import {
  Text,
  TouchableOpacity,
  LoaderCenter,
  LoaderAbsolute
} from './styles'

export default Button = ({ disabled, link, name, onPress, type }) => {
  function renderLoading() {
    return <LoaderCenter />
  }

  function renderTimeCharger() {
    return <LoaderAbsolute />
  }

  function handleType() {
    switch (type) {
      case 'loading':
        return renderLoading()

      case 'time-charger':
        return renderTimeCharger()
    }
  }

  return (
    <TouchableOpacity
      disabled={disabled}
      link={link}
      type={type}
      onPress={() => onPress()}
    >
      {String(type) !== 'loading' && (
        <Text disabled={disabled} link={link} type={type}>
          {name}
        </Text>
      )}
      {handleType()}
    </TouchableOpacity>
  )
}
