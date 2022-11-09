
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');


const firebaseConfig = {
    apiKey: "AIzaSyBu9uCWiBNl1MVtt2AzNzoE3LgVNNLgBd4",
    authDomain: "cloud-push-msg.firebaseapp.com",
    projectId: "cloud-push-msg",
    storageBucket: "cloud-push-msg.appspot.com",
    messagingSenderId: "83332426187",
    appId: "1:83332426187:web:7c6f1d491c220f62986e4e",
    measurementId: "G-5PN2QBCWNZ"
};


firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// messaging.onBackgroundMessage(function (payload) {
//     console.log('payload-sw:', payload)
// })


messaging.onBackgroundMessage(function (payload) {
    console.log('Received background message ', payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
    };

    // localStorage.setItem('title', notificationTitle)
    // localStorage.setItem('body', notificationOptions.body)

    return self.registration.showNotification(notificationTitle,
        notificationOptions);
});
