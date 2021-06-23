import styled from 'styled-components/native'
import { fonts, colors } from '../../themes'

// Font Weight:
//
// Light 300
// Regular 400
// Semi-bold 600
// Bold 700
// Extra-bold 800

export const H1Headline = styled.Text`
  font-size: 28px;
  font-family: ${fonts.openSans.bold};
  color: ${(props) => props.theme.mediumTone};
`

export const H2Headline = styled.Text`
  font-size: 28px;
  font-family: ${fonts.openSans.regular};
  color: ${(props) => props.theme.mediumTone};
`

export const H3Headline = styled.Text`
  font-size: 25px;
  font-family: ${fonts.openSans.regular};
  color: ${(props) => props.theme.mediumTone};
`

export const H4Headline = styled.Text`
  font-size: 22px;
  font-family: ${fonts.openSans.regular};
  color: ${(props) => props.theme.mediumTone};
`

export const Subheading = styled.Text`
  font-size: 18px;
  font-family: ${fonts.openSans.bold};
  color: ${(props) => props.theme.mediumTone};
`

export const BodyLarge = styled.Text`
  font-size: 18px;
  font-family: ${fonts.openSans.regular};
  color: ${(props) => props.theme.mediumTone};
`

export const Body = styled.Text`
  font-size: 16px;
  font-family: ${fonts.openSans.regular};
  color: ${(props) => props.theme.mediumTone};
`

// Others Needed

export const StepTitle = styled.Text`
  font-size: 25px;
  font-family: ${fonts.openSans.bold};
  color: ${colors.primary};
`

export const StepText = styled.Text`
  font-size: 18px;
  font-family: ${fonts.openSans.regular};
  color: ${(props) => props.theme.mediumTone};
`

export const InputTitle = styled.Text`
  font-size: 13px;
  font-family: ${fonts.openSans.bold};
  color: ${(props) => props.theme.mediumTone};
  position: absolute;
  top: 0px;
  left: 0;
`

export const DropdownTitle = styled.Text`
  font-size: 13px;
  font-family: ${fonts.openSans.bold};
  color: ${(props) => props.theme.mediumTone};
  position: absolute;
  top: 0px;
  left: 0;
`
