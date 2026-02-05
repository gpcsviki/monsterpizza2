# Monster Pizza - Firebase Setup & Deploy

## Prehľad

Tento projekt používa:
- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Firebase (Firestore, Authentication, Cloud Functions, Hosting)
- **Notifikácie**: Firebase Cloud Messaging (FCM) pre admin push notifikácie

---

## 1. Predpoklady

- Node.js 18+
- Firebase CLI: `npm install -g firebase-tools`
- Existujúci Firebase projekt (napr. `monsterpizza`)

---

## 2. Firebase Console Setup

### 2.1 Firestore
1. Choď na [Firebase Console](https://console.firebase.google.com/)
2. Vyber projekt `monsterpizza`
3. **Firestore Database** → Create database → Start in production mode
4. Vyber región (napr. `europe-west1`)

### 2.2 Authentication
1. **Authentication** → Sign-in method
2. Zapni **Email/Password**
3. Vytvor admin používateľa v **Users** tab

### 2.3 Cloud Messaging (FCM)
1. **Project Settings** → Cloud Messaging
2. Vygeneruj **Web Push certificate** (VAPID key)
3. Skopíruj VAPID key do `.env` ako `VITE_FIREBASE_VAPID_KEY`

### 2.4 Web App Config
1. **Project Settings** → General → Your apps
2. Pridaj Web app (ak ešte nemáš)
3. Skopíruj config hodnoty do `.env`

---

## 3. Lokálny Setup

### 3.1 Vytvor `.env` súbor

```bash
cp .env.example .env
```

Vyplň hodnoty z Firebase Console:

```env
VITE_FIREBASE_API_KEY=AIza...
VITE_FIREBASE_AUTH_DOMAIN=monsterpizza.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=monsterpizza
VITE_FIREBASE_STORAGE_BUCKET=monsterpizza.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
VITE_FIREBASE_VAPID_KEY=BL...
```

### 3.2 Aktualizuj Service Worker

Otvor `public/firebase-messaging-sw.js` a nahraď `REPLACE_ME` hodnoty tvojimi Firebase config hodnotami.

### 3.3 Nainštaluj závislosti

```bash
# Frontend
npm install

# Functions
cd functions
npm install
cd ..
```

### 3.4 Spusti lokálne

```bash
npm run dev
```

Otvor http://localhost:5173

---

## 4. Deploy Functions

### 4.1 Prihlás sa do Firebase

```bash
firebase login
```

### 4.2 Buildni a deployni functions

```bash
cd functions
npm run build
cd ..
firebase deploy --only functions
```

---

## 5. Deploy Firestore Rules

```bash
firebase deploy --only firestore:rules
```

---

## 6. Deploy Hosting (Frontend)

### 6.1 Buildni frontend

```bash
npm run build
```

### 6.2 Deployni na Firebase Hosting

```bash
firebase deploy --only hosting
```

Alebo všetko naraz:

```bash
npm run build && firebase deploy
```

---

## 7. Nastavenie Admin Používateľa

Admin používateľ potrebuje custom claim `{admin: true}`.

### Možnosť A: Cez Firebase Console + Cloud Shell

1. Otvor [Google Cloud Console](https://console.cloud.google.com/)
2. Vyber projekt `monsterpizza`
3. Otvor Cloud Shell
4. Spusti:

```bash
# Nahraď EMAIL skutočným emailom admin používateľa
firebase auth:export users.json --project monsterpizza
# Nájdi UID používateľa v users.json

# Potom v Node.js:
node -e "
const admin = require('firebase-admin');
admin.initializeApp();
admin.auth().setCustomUserClaims('USER_UID_HERE', {admin: true})
  .then(() => console.log('Done'))
  .catch(console.error);
"
```

### Možnosť B: Cez existujúceho admina (callable function)

Ak už máš admina, môžeš použiť `setAdminClaim` function:

```javascript
import { httpsCallable } from 'firebase/functions';
import { functions } from './lib/firebase';

const setAdmin = httpsCallable(functions, 'setAdminClaim');
await setAdmin({ email: 'new-admin@example.com' });
```

---

## 8. Seed Demo Produkty

```bash
# Nastav credentials
export GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account.json

# Spusti seed script
npx ts-node scripts/seed-products.ts
```

Alebo manuálne cez Firebase Console → Firestore → pridaj dokumenty do `products` kolekcie.

---

## 9. Testovanie

### Zákaznícky flow:
1. Otvor hlavnú stránku
2. Pridaj položky do košíka (tlačidlo "Kúpiť")
3. Choď do košíka → Checkout
4. Vyplň údaje a odošli objednávku
5. Skontroluj stránku s potvrdením objednávky

### Admin flow:
1. Choď na `/admin`
2. Prihlás sa admin účtom
3. Zapni notifikácie (ikona zvončeka)
4. Skontroluj zoznam objednávok
5. Zmeň stav objednávky

---

## 10. Štruktúra Projektu

```
monster-pizza-react/
├── src/
│   ├── components/      # UI komponenty
│   ├── contexts/        # React Context (CartContext)
│   ├── hooks/           # Custom hooks
│   ├── lib/             # Utilities, Firebase init
│   ├── pages/           # Route pages (Home, Cart, Checkout, Order, Admin)
│   └── App.tsx          # Router setup
├── functions/           # Firebase Cloud Functions
│   └── src/
│       ├── index.ts     # Function exports
│       └── lib/         # Shared utilities
├── public/
│   └── firebase-messaging-sw.js  # FCM Service Worker
├── firebase.json        # Firebase config
├── firestore.rules      # Firestore security rules
└── .env.example         # Environment variables template
```

---

## 11. Troubleshooting

### "Permission denied" pri čítaní objednávok
- Skontroluj, či má používateľ `admin: true` custom claim
- Po nastavení claim sa musí používateľ znovu prihlásiť

### FCM notifikácie nefungujú
- Skontroluj VAPID key v `.env` a service worker
- Skontroluj, či je token uložený v `adminTokens` kolekcii
- Skontroluj browser permissions pre notifikácie

### Functions 404
- Skontroluj, či sú functions deploynuté: `firebase functions:list`
- Skontroluj región v `firebase.json` a klientskom kóde

### CORS chyby
- Functions sú nastavené na `europe-west1`, skontroluj konzistenciu

---

## 12. Bezpečnosť

- **Nikdy necommituj `.env`** - je v `.gitignore`
- **Service account JSON** - nikdy do repa
- **Firestore rules** - objednávky môže vytvárať len server (functions)
- **Admin claim** - nastavuj len cez bezpečný kanál
