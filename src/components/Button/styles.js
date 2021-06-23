import styled from 'styled-components/native'

import { colors, fonts } from '../../themes/'

export const TouchableOpacity = styled.TouchableOpacity`
  height: 48px;
  width: 90%;
  border-radius: 5px;
  border: 2px;
  justify-content: center;
  align-items: center;
  margin: 10px 0px 0px 0px;
  background-color: ${({ disabled }) =>
    disabled
      ? colors.disable
      : ({ link }) =>
          link
            ? colors.transparent
            : ({ type }) =>
                type === 'primary' ? colors.primary : colors.lightestShade};
  border-color: ${({ disabled }) =>
    disabled
      ? colors.lightestShade
      : ({ link }) =>
          link
            ? colors.transparent
            : ({ type }) =>
                type === 'primary' ? colors.lightestShade : colors.primary};
`

export const Text = styled.Text`
  font-size: 16px;
  font-family: ${fonts.openSans.bold};
  color: ${({ disabled }) =>
    disabled
      ? colors.lightestShade
      : ({ link }) =>
          link
            ? colors.mediumTone
            : ({ type }) =>
                type === 'primary' ? colors.lightestShade : colors.primary};
`

export const LoaderCenter = styled.ActivityIndicator.attrs({
  color: colors.primary,
  size: 30,
})``

export const LoaderAbsolute = styled.ActivityIndicator.attrs({
  color: colors.lightPattern,
  size: 30,
  position: 'absolute',
  right: 10,
  top: -25,
})`
  width: 100%;
`
