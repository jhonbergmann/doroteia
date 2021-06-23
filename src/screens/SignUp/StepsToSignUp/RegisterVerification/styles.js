import styled from 'styled-components/native'

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
  height: 130px;
  padding: 0px 16px 0px 16px;
`

export const CenteredContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
`

export const BottomContainer = styled.View`
  align-items: center;
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
