// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging } from "firebase/messaging";
export const environment = {
  production: false,
  firebaseConfig : {
    apiKey: "AIzaSyDpsCVpnqYTz9GJz2OsB00YLTb629hF1sA",
    authDomain: "saimon-40d88.firebaseapp.com",
    databaseURL: "https://saimon-40d88-default-rtdb.firebaseio.com",
    projectId: "saimon-40d88",
    storageBucket: "saimon-40d88.firebasestorage.app",
    messagingSenderId: "831878044328",
    appId: "1:831878044328:web:370bf424462b4f68e0409d",
    measurementId: "G-6T4CY99VM0"
  }
};
const app = initializeApp(environment.firebaseConfig);
const analytics = getAnalytics(app);
const messaging = getMessaging(app);
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// Initialize Firebase
