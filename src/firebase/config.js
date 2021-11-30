import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBRU0MVT1bqRdpphSh35neY_5u7xB9tF1c',
  authDomain: 'music-playlist-752d1.firebaseapp.com',
  projectId: 'music-playlist-752d1',
  storageBucket: 'music-playlist-752d1.appspot.com',
  messagingSenderId: '712323727069',
  appId: '1:712323727069:web:76ade5b76e39b955fde534',
};

// init firebase
firebase.initializeApp(firebaseConfig);

// init services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const projectStorage = firebase.storage();

// timestamp
const timestamp = firebase.firestore.FieldValue.serverTimestamp();

export { projectFirestore, projectAuth, projectStorage, timestamp };
