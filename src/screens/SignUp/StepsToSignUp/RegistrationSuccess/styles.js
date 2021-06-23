import styled from 'styled-components/native'

import { StepTitle, StepText } from '../../../../components/Typography'

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
`

export const CenteredContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

export const BottomContainer = styled.View`
  justify-content: space-between;
  align-items: center;
  height: 65px;
`

export const TopTextContainer = styled.View`
  height: 80px;
`

export const BottomTextContainer = styled.View`
  height: 80px;
`

export const Image = styled.Image.attrs({
  resizeMode: 'contain',
})`
  margin-left: 160px;
`

export const Title = styled(StepTitle)`
  text-align: center;
`

export const Text = styled(StepText)`
  text-align: center;
`
