import React from 'react'
import { StatusBar } from 'react-native'
import { ThemeProvider } from 'styled-components'
import { useSelector } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack'

import {
  Home,
  Onboarding,
  SignIn,
  CreatePost,
  Post,
  FailureScreen,
} from './screens'
import { useUser } from './hooks'
import DrawerContent from './components/Drawer'
import CustomHeader from './components/CustomHeader'
import { dark as darkColors, colors as lightColors } from './themes'

import {
  RegisterName,
  RegisterEmail,
  RegisterPassword,
  RegisterVerification,
  RegisterStartup,
  RegisterArea,
  RegisterTechnologies,
  RegisterContact,
  RegistrationSuccess,
  // error screens ->
  RegistrationGenericFail,
  RegistrationEmailUseFail,
  RegistrationBackendSendFail,
  RegistrationHiddenLoginFail,
} from './screens/SignUp'

const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()

export default Navigator = () => {
  const stacks = useSelector((state) => state.stacks)
  const { dark } = stacks

  return (
    <NavigationContainer>
      <ThemeProvider theme={dark ? darkColors : lightColors}>
        <StatusBar
          animated={true}
          backgroundColor={dark ? darkColors.lightPattern : lightColors.lightPattern}
          barStyle={dark ? 'light-content' : 'dark-content'}
        />
        <DrawerMenu />
      </ThemeProvider>
    </NavigationContainer>
  )
}

function DrawerMenu() {
  const stacks = useSelector((state) => state.stacks)
  const { onboarding } = stacks

  const { user, userEmailVerified } = useUser()

  let route = Onboarding
  let gesture = false

  if (user && userEmailVerified()) {
    route = Home
  } else {
    route = SignIn
  }

  if (route === Home) {
    gesture = true
  } else {
    gesture = false
  }

  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      {onboarding ? null : (
        <Stack.Screen
          name="Onboarding"
          component={Onboarding}
          options={{ gestureEnabled: false }}
        />
      )}
      <Stack.Screen
        name="InitialRoute"
        component={route}
        options={{ gestureEnabled: gesture }}
      />
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ gestureEnabled: true }}
      />
      <Stack.Screen
        name="CreatePost"
        component={CreatePost}
        options={{
          gestureEnabled: false,
          headerShown: true,
          header: () => <CustomHeader />,
        }}
      />
      <Stack.Screen
        name="Post"
        component={Post}
        options={{
          gestureEnabled: false,
          headerShown: true,
          header: () => <CustomHeader />,
        }}
      />
      <Stack.Screen
        name="StackScreens"
        component={StackScreens}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen
        name="FailureScreen"
        component={FailureScreen}
        options={{ gestureEnabled: false }}
      />
    </Drawer.Navigator>
  )
}

function StackScreens() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      <Stack.Screen name="RegisterName" component={RegisterName} />
      <Stack.Screen name="RegisterEmail" component={RegisterEmail} />
      <Stack.Screen name="RegisterPassword" component={RegisterPassword} />
      <Stack.Screen name="RegisterVerification" component={RegisterVerification} />
      <Stack.Screen name="RegisterStartup" component={RegisterStartup} />
      <Stack.Screen name="RegisterArea" component={RegisterArea} />
      <Stack.Screen name="RegisterTechnologies" component={RegisterTechnologies} />
      <Stack.Screen name="RegisterContact" component={RegisterContact} />
      <Stack.Screen name="RegistrationSuccess" component={RegistrationSuccess} />
      {/* error screens -> */}
      <Stack.Screen name="RegistrationGenericFail" component={RegistrationGenericFail} />
      <Stack.Screen name="RegistrationEmailUseFail" component={RegistrationEmailUseFail} />
      <Stack.Screen name="RegistrationBackendSendFail" component={RegistrationBackendSendFail} />
      <Stack.Screen name="RegistrationHiddenLoginFail" component={RegistrationHiddenLoginFail} />
    </Stack.Navigator>
  )
}
