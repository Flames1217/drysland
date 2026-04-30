import { initializeApp } from 'firebase/app'

const config = {
  apiKey: 'AIzaSyASM8DYQAWU_RXANjJwR8ulOS9-Eo6g238',
  authDomain: 'platinum-honor-456309-u6.firebaseapp.com',
  projectId: 'platinum-honor-456309-u6',
  storageBucket: 'platinum-honor-456309-u6.firebasestorage.app',
  messagingSenderId: '78437695861',
  appId: '1:78437695861:web:11207365cdb37b5529933c',
}

export default class FirebasApp {
  static instance = initializeApp(config)
}
