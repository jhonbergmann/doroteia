import React, { useState, useEffect } from 'react'
import Animated from 'react-native-reanimated'
import ProgressBar from 'react-native-progress/Bar'
import { Dimensions } from 'react-native'
import {
  DrawerContentScrollView as CenteredDrawerScrollView,
  DrawerItem,
} from '@react-navigation/drawer'
import { firebase } from '@react-native-firebase/storage'
import { useSelector, useDispatch } from 'react-redux'
import ImagePicker from 'react-native-image-crop-picker'

import {
  Container,
  TopDrawerContainer,
  ProfileContent,
  Avatar,
  AddAvatar,
  UserContainer,
  H4Headline,
  Subheading,
  LevelContainer,
  LevelIcon,
  HomeIcon,
  NewIcon,
  DoorOpenedIcon,
  DoorClosedIcon,
  CreatePostIcon,
  TitleCreatePostIcon,
  SwitchTheme,
  ShareIcon,
  InfoIcon,
  ProgressContainer,
  XPContainer,
  BottomContainer,
  Line,
  TitleMenu,
  ActivityIndicator,
} from './styles'

import { dark as darkColors, colors as lightColors } from '../../themes'
import { Button } from '../../components'
import { useUser } from '../../hooks'
import { Creators as StacksActions } from '../../store/ducks/stacks'

export default function Drawer({ progress, ...props }) {
  const [infoUser, setInfoUser] = useState(null)
  const [newAvatar, setNewAvatar] = useState(null)
  const [avatar, setAvatar] = useState('')

  const [darkModeIsSelected, setDarkModeIsSelected] = useState(false)
  const [loading, setLoading] = useState(false)
  const [logoutError, setLogoutError] = useState(false)

  const [allCardsIsSelected, setAllCardsIsSelected] = useState(false)
  const [openedCardsIsSelected, setOpenCardsIsSelected] = useState(false)
  const [closedCardsIsSelected, setClosedCardsIsSelected] = useState(false)

  const { user, userLogout, userReload, auth } = useUser()

  const translateX = Animated.interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [-100, 0],
  })

  const { width } = Dimensions.get('window')
  const size = width * 0.6

  const stacks = useSelector((state) => state.stacks)
  const { dark } = stacks

  const dispatch = useDispatch()
  const { darkStack } = StacksActions

  useEffect(() => {
    reloadUpdateUser()
  }, [user])

  useEffect(() => {
    if (dark) {
      setDarkModeIsSelected(true)
    }

    if (!dark) {
      setDarkModeIsSelected(false)
    }
  }, [dark])

  async function reloadUpdateUser() {
    await userReload()
    await user?.getIdToken(true)

    auth().onAuthStateChanged((user) => {
      setInfoUser(user)

      if (user?.photoURL == null) {
        let avatarUrl = firebase.storage().ref('avatar.png')

        avatarUrl.getDownloadURL().then((url) => {
          setAvatar(url)
        })
      }
    })
  }

  function handleChangeAvatar() {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then((image) => {
      setNewAvatar(image.path)
    })
  }

  function handleNavigateToHome() {
    props.navigation.navigate('Home')
  }

  function handleNavigateToCreatePost() {
    props.navigation.navigate('CreatePost')
  }

  function handleFilterByNew() {
    setAllCardsIsSelected((previousState) => !previousState)
    setOpenCardsIsSelected(false)
    setClosedCardsIsSelected(false)
  }

  function handleFilterByOpened() {
    setOpenCardsIsSelected((previousState) => !previousState)
    setAllCardsIsSelected(false)
    setClosedCardsIsSelected(false)
  }

  function handleFilterByClosed() {
    setClosedCardsIsSelected((previousState) => !previousState)
    setAllCardsIsSelected(false)
    setOpenCardsIsSelected(false)
  }

  function handleChangeSwitch() {
    setDarkModeIsSelected((previousState) => !previousState)

    if (darkModeIsSelected) {
      dispatch(darkStack(false))
    } else {
      dispatch(darkStack(true))
    }
  }

  async function resendLogout() {
    await userLogout()
      .then(() => {
        props.navigation.navigate('SignIn')
        setLogoutError(false)
        setLoading(false)
      })
      .catch(() => {
        setLogoutError(true)
        setLoading(false)
      })
  }

  async function handleLogout() {
    setLoading(true)
    await resendLogout()
  }

  if (infoUser) {
    return (
      <Container>
        <Animated.View style={{ flex: 1, transform: [{ translateX }] }}>
          <TopDrawerContainer>
            <ProfileContent>
              <AddAvatar onPress={() => handleChangeAvatar()}>
                {avatar ? (
                  <Avatar
                    source={{
                      uri: newAvatar === null ? avatar : newAvatar,
                    }}
                  />
                ) : (
                  <ActivityIndicator />
                )}
              </AddAvatar>

              <UserContainer>
                <H4Headline>
                  {infoUser?.displayName ? (
                    infoUser.displayName
                  ) : (
                    <ActivityIndicator />
                  )}
                </H4Headline>
                <Subheading>
                  {infoUser?.email ? infoUser.email : <ActivityIndicator />}
                </Subheading>
                <LevelContainer>
                  <LevelIcon />
                  <Subheading>Level 2</Subheading>
                </LevelContainer>
              </UserContainer>
            </ProfileContent>

            <ProgressContainer style={{ width: size }}>
              <ProgressBar
                animated={true}
                progress={0.4}
                color={lightColors.barColor}
                unfilledColor={lightColors.barBack}
                borderWidth={0}
                width={size}
                height={8}
              />
              <XPContainer>
                <Subheading>0 xp</Subheading>
                <Subheading>500 xp</Subheading>
              </XPContainer>
            </ProgressContainer>
          </TopDrawerContainer>

          <CenteredDrawerScrollView {...props}>
            <DrawerItem
              style={{
                backgroundColor: dark
                  ? darkColors.lightShade
                  : lightColors.lightShade,
              }}
              labelStyle={{ color: lightColors.primary }}
              label="Home"
              icon={() => <HomeIcon />}
              onPress={() => handleNavigateToHome()}
            />

            <DrawerItem
              label="Postar"
              labelStyle={{
                color: dark ? darkColors.lightShade : lightColors.mediumShade,
              }}
              icon={() => (
                <CreatePostIcon>
                  <TitleCreatePostIcon>+</TitleCreatePostIcon>
                </CreatePostIcon>
              )}
              onPress={() => handleNavigateToCreatePost()}
            />

            <Line />

            <TitleMenu>Cartão</TitleMenu>

            <DrawerItem
              style={
                allCardsIsSelected
                  ? {
                      backgroundColor: dark
                        ? darkColors.lightShade
                        : lightColors.lightShade,
                    }
                  : null
              }
              labelStyle={{
                color: allCardsIsSelected
                  ? lightColors.primary
                  : dark
                  ? darkColors.mediumShade
                  : lightColors.mediumShade,
              }}
              label="Todos"
              icon={() => (
                <NewIcon allCardsIsSelected={allCardsIsSelected} dark={dark} />
              )}
              onPress={() => handleFilterByNew()}
            />

            <DrawerItem
              style={
                openedCardsIsSelected
                  ? {
                      backgroundColor: dark
                        ? darkColors.lightShade
                        : lightColors.lightShade,
                    }
                  : null
              }
              labelStyle={{
                color: openedCardsIsSelected
                  ? lightColors.primary
                  : dark
                  ? darkColors.mediumShade
                  : lightColors.mediumShade,
              }}
              label="Abertos"
              icon={() => (
                <DoorOpenedIcon
                  openedCardsIsSelected={openedCardsIsSelected}
                  dark={dark}
                />
              )}
              onPress={() => handleFilterByOpened()}
            />

            <DrawerItem
              style={
                closedCardsIsSelected
                  ? {
                      backgroundColor: dark
                        ? darkColors.lightShade
                        : lightColors.lightShade,
                    }
                  : null
              }
              labelStyle={{
                color: closedCardsIsSelected
                  ? lightColors.primary
                  : dark
                  ? darkColors.mediumShade
                  : lightColors.mediumShade,
              }}
              label="Fechados"
              icon={() => (
                <DoorClosedIcon
                  closedCardsIsSelected={closedCardsIsSelected}
                  dark={dark}
                />
              )}
              onPress={() => handleFilterByClosed()}
            />

            <Line />

            <TitleMenu>Preferência </TitleMenu>

            <DrawerItem
              labelStyle={{
                color: dark ? darkColors.lightShade : lightColors.mediumShade,
              }}
              label={darkModeIsSelected ? 'Escuro' : 'Claro'}
              icon={() => (
                <SwitchTheme
                  onValueChange={handleChangeSwitch}
                  value={darkModeIsSelected}
                />
              )}
              onPress={() => handleChangeSwitch()}
            />

            <Line />

            <TitleMenu>Configuração</TitleMenu>

            <DrawerItem
              labelStyle={{
                color: dark ? darkColors.lightShade : lightColors.mediumShade,
              }}
              label="Compartilhar"
              icon={() => <ShareIcon />}
              onPress={() => {}}
            />

            <DrawerItem
              labelStyle={{
                color: dark ? darkColors.lightShade : lightColors.mediumShade,
              }}
              label="Sobre"
              icon={() => <InfoIcon />}
              onPress={() => {}}
            />
          </CenteredDrawerScrollView>

          <BottomContainer>
            <Button
              disabled={false}
              name={'Sair'}
              type={loading ? 'loading' : ''}
              onPress={() => handleLogout()}
            />
            {logoutError ? (
              <Subheading
                style={{
                  color: lightColors.negative,
                  textAlign: 'center',
                  marginTop: 5,
                }}
              >
                Ops, tente novamente!
              </Subheading>
            ) : null}
          </BottomContainer>
        </Animated.View>
      </Container>
    )
  } else {
    return <ActivityIndicator />
  }
}
