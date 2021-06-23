import { useState, useEffect } from 'react'
import { Keyboard } from 'react-native'

export default function useKeyboardStatus() {
  const [keyboardStatus, setKeyboardStatus] = useState(false)

  const _keyboardDidShow = () => setKeyboardStatus(true)
  const _keyboardDidHide = () => setKeyboardStatus(false)

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow)
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide)

    // cleanup function
    return () => {
      Keyboard.removeListener('keyboardDidShow', _keyboardDidShow)
      Keyboard.removeListener('keyboardDidHide', _keyboardDidHide)
    }
  }, [])

  return [keyboardStatus, setKeyboardStatus]
}
