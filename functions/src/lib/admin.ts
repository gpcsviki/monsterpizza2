import * as admin from "firebase-admin"

let app: admin.app.App | null = null

export function getAdminApp() {
  if (!app) {
    app = admin.initializeApp()
  }
  return app
}

export function getFirestore() {
  return getAdminApp().firestore()
}

export function getAuth() {
  return getAdminApp().auth()
}

export function getMessaging() {
  return getAdminApp().messaging()
}
