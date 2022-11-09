import { initializeApp } from "firebase/app"
import { getMessaging } from "firebase/messaging";
import { onBackgroundMessage } from "firebase/messaging/sw";

const firebaseConfig = {
    apiKey: "AIzaSyBu9uCWiBNl1MVtt2AzNzoE3LgVNNLgBd4",
    authDomain: "cloud-push-msg.firebaseapp.com",
    projectId: "cloud-push-msg",
    storageBucket: "cloud-push-msg.appspot.com",
    messagingSenderId: "83332426187",
    appId: "1:83332426187:web:7c6f1d491c220f62986e4e",
    measurementId: "G-5PN2QBCWNZ"
};


const app = initializeApp(firebaseConfig);

const messaging = getMessaging(app)

// messaging.onBackgroundMessage(function (payload) {
//     console.log('payload-sw:', payload)
// })


export const MSG = () => {
    onBackgroundMessage(messaging, (payload) => {
        console.log('[firebase-messaging-sw.js] Received background message ', payload);
        localStorage.setItem('title', payload.notification.title)
        localStorage.setItem('body', payload.notification.body)

    });
}
