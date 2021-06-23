import styled from 'styled-components/native'
import { ActivityIndicator as Activity } from 'react-native'

import { colors } from '../../../../themes'

export const Container = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
    paddingVertical: 35,
  },
})`
  flex: 1;
  height: 100%;
  background-color: ${(props) => props.theme.lightPattern};
  ${({ keyboardIsOpen }) => (keyboardIsOpen ? 'margin-bottom: -25px' : '')};
`

export const TopContainer = styled.View`
  justify-content: space-between;
  height: 120px;
  padding: 0px 16px 0px 16px;
`

export const CenteredContainer = styled.View`
  flex: 1;
  justify-content: space-between;
  align-items: center;
  padding: 0px 16px 0px 16px;
  width: 100%;
`

export const TechsContainer = styled.View.attrs({
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'row',
  flexWrap: 'wrap',
})``

export const TechsContent = styled.View.attrs({
  alignItems: 'center',
  justifyContent: 'center',
  width: '40%',
  height: 48,
  margin: 10,
})``

export const BottomContainer = styled.View`
  justify-content: space-between;
  align-items: center;
  height: 65px;
`

export const TopTextContainer = styled.View`
  height: 50px;
`

export const BottomTextContainer = styled.View`
  height: 80px;
`
export const ActivityIndicator = styled(Activity).attrs({
  color: colors.primary,
  size: 'large',
})`
  flex: 1;
  justify-content: center;
  background-color: ${(props) => props.theme.lightPattern};
`
