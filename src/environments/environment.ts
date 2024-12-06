// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging } from "firebase/messaging";
export const environment = {
  production: false,
  firebaseConfig : {
    apiKey: "AIzaSyAHHPXjkQAV07H-2yh30YJepxqA4_ltg-8",
    authDomain: "trabajo-del-apileo-221b4.firebaseapp.com",
    databaseURL: "https://trabajo-del-apileo-221b4-default-rtdb.firebaseio.com",
    projectId: "trabajo-del-apileo-221b4",
    storageBucket: "trabajo-del-apileo-221b4.firebasestorage.app",
    messagingSenderId: "893798233446",
    appId: "1:893798233446:web:7adce1ed3b4de9225604a7",
    measurementId: "G-MYVCGE9M4S"
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
