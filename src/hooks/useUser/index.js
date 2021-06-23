import { useState } from 'react'
import { firebase } from '@react-native-firebase/auth'

export default function useUser() {
  const [user, setUser] = useState(firebase.auth().currentUser)

  function auth() {
    return firebase.auth()
  }

  function userLogin(email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password)
  }

  function userRegister(email, password) {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
  }

  function userLogout() {
    return firebase.auth().signOut()
  }

  function userSendVerification() {
    return firebase.auth().currentUser?.sendEmailVerification()
  }

  function userId() {
    return firebase.auth().currentUser?.uid
  }

  function userEmailVerified() {
    return firebase.auth().currentUser?.emailVerified
  }

  function userReload() {
    return firebase.auth().currentUser?.reload()
  }

  return {
    user,
    setUser,
    auth,
    userLogin,
    userRegister,
    userLogout,
    userSendVerification,
    userId,
    userEmailVerified,
    userReload,
  }
}
