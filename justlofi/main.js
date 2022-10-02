// import * as firebase from '/firebase/app';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.9.4/firebase-app.js'
import { getAnalytics, logEvent } from 'https://www.gstatic.com/firebasejs/9.9.4/firebase-analytics.js'

const firebaseConfig = {
  apiKey: "AIzaSyAdRVv2aYh0FKeOdsu-RZz3ELJV68Ccv64",
  authDomain: "justlofi.firebaseapp.com",
  databaseURL: "https://justlofi-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "justlofi",
  storageBucket: "justlofi.appspot.com",
  messagingSenderId: "468764202116",
  appId: "1:468764202116:web:d2fb72ce590ed086199ed1",
  measurementId: "G-0MP3YEERX6"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export function play_log() {
  console.log('play-btn log');
  logEvent(analytics, 'play-btn pressed');
}

export function next_log() {
  console.log('next-btn log');
  logEvent(analytics, 'next-btn pressed');
}

export function music_ended_log() {
  console.log('music ended log');
  logEvent(analytics, 'music ended');
}
