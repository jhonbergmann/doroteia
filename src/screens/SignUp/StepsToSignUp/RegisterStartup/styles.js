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
`

export const TopContainer = styled.View`
  justify-content: space-between;
  height: 220px;
  padding: 0px 16px 0px 16px;
`

export const CenteredContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
`

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

export const Image = styled.Image.attrs({
  resizeMode: 'contain',
})``

export const ActivityIndicator = styled(Activity).attrs({
  color: colors.primary,
  size: 'large',
})`
  flex: 1;
  justify-content: center;
  background-color: ${(props) => props.theme.lightPattern};
`
