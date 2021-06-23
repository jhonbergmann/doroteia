import React from 'react'
import { AppRegistry } from 'react-native'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import { store, persistor } from './src/store'
import Navigator from './src/Navigator'
import { name as appName } from './app.json'

const Redux = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Navigator />
    </PersistGate>
  </Provider>
)

AppRegistry.registerComponent(appName, () => Redux)
