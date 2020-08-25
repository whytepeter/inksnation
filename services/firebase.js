import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const config = {
  apiKey: 'AIzaSyCiH8rYxn55z-ZrVfJska0MzRll2FJ9vOM',
  authDomain: 'inksnation-82530.firebaseapp.com',
  databaseURL: 'https://inksnation-82530.firebaseio.com',
  projectId: 'inksnation-82530',
  storageBucket: 'inksnation-82530.appspot.com',
  messagingSenderId: '870874627506',
  appId: '1:870874627506:web:2c8be66fdd19783c84f8ab',
  measurementId: 'G-SRXJEND6T7'
}

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}
export const auth = firebase.auth()
export const db = firebase.firestore()
