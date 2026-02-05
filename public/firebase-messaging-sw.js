/* eslint-disable no-undef */

importScripts("https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js")
importScripts("https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js")

firebase.initializeApp({
  apiKey: "AIzaSyCQr6Q8-TPvqQ51BN6eUiOZh-ZkGA6PlY0",
  authDomain: "monsterpizza.firebaseapp.com",
  projectId: "monsterpizza",
  storageBucket: "monsterpizza.firebasestorage.app",
  messagingSenderId: "264674141304",
  appId: "1:264674141304:web:420f1866ef658cb31fb98d",
})

const messaging = firebase.messaging()

messaging.onBackgroundMessage((payload) => {
  const title = payload?.notification?.title || "Nová objednávka"
  const body = payload?.notification?.body || "Prišla nová objednávka"

  self.registration.showNotification(title, {
    body,
    icon: "/brand/logo-mark.png",
    badge: "/brand/logo-mark.png",
    data: payload?.data || {},
  })
})
