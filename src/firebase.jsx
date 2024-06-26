//firebase.js
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/storage'; // Firebase Storage 추가
import 'firebase/compat/auth'; // auth 모듈 추가

const firebaseConfig = {
  apiKey: 'AIzaSyBO8L3xUJFM1MbZ9Ut5msDpIfH-nWEv4Bk',
  authDomain: 'blog-e5492.firebaseapp.com',
  projectId: 'blog-e5492',
  storageBucket: 'blog-e5492.appspot.com',
  messagingSenderId: '795268979785',
  appId: '1:795268979785:web:53f89d614df5536fe67398',
  measurementId: 'G-3KFHLLWRED',
};

// firebaseConfig 정보로 firebase 시작
firebase.initializeApp(firebaseConfig);

// firebase의 firestore 인스턴스를 변수에 저장
const firestore = firebase.firestore();
const storage = firebase.storage(); // Firebase Storage 인스턴스 생성
const auth = firebase.auth(); // auth 객체 생성

// 필요한 곳에서 사용할 수 있도록 내보내기
export { firestore, storage, auth };
