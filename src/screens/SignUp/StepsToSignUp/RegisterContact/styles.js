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
  flex: 1;
  justify-content: space-between;
  height: 450px;
  padding: 0px 16px 48px 16px;
`

export const CheckboxContainer = styled.View`
  flex: 1;
  align-items: center;
`

export const CheckboxItem = styled.View`
  width: 80%;
  height: 48px;
  margin: 10px;
`

export const BottomContainer = styled.View`
  justify-content: space-between;
  align-items: center;
  align-self: auto;
  height: 65px;
`

export const TopTextContainer = styled.View`
  height: 50px;
`

export const BottomTextContainer = styled.View`
  height: 80px;
`
