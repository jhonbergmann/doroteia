import styled from 'styled-components/native'

import { StepTitle, StepText } from '../../../../../components/Typography'
import { colors } from '../../../../../themes'

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
  justify-content: flex-end;
  padding: 0px 16px 0px 16px;
`

export const CenteredContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

export const BottomContainer = styled.View`
  justify-content: space-between;
  align-items: center;
`

export const TopTextContainer = styled.View`
  height: 80px;
`

export const BottomTextContainer = styled.View`
  height: 80px;
`

export const Image = styled.Image.attrs({
  resizeMode: 'contain',
})``

export const Title = styled(StepTitle)`
  text-align: center;
  color: ${colors.negative};
`

export const Text = styled(StepText)`
  text-align: center;
`
