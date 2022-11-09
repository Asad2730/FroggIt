import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import { getMessaging, getToken, onMessage } from "firebase/messaging";


const config = {
    apiKey: "AIzaSyBu9uCWiBNl1MVtt2AzNzoE3LgVNNLgBd4",
    authDomain: "cloud-push-msg.firebaseapp.com",
    projectId: "cloud-push-msg",
    storageBucket: "cloud-push-msg.appspot.com",
    messagingSenderId: "83332426187",
    appId: "1:83332426187:web:7c6f1d491c220f62986e4e",
    measurementId: "G-5PN2QBCWNZ"
}

const app = initializeApp(config)
getAnalytics(app);


const messaging = getMessaging(app);

export { messaging }


export const requestForToken = () => {
    return getToken(messaging, { vapidKey: 'BBPbyWdLuf6q_o4j0DoRL7voH1QI_XWhHkr43sMXjAk3mSaCvGAL0aPOXRh4WL8rphNWVSoxCrbZOpc4IoRcOUg' })
        .then((currentToken) => {
            if (currentToken) {
                console.log('current token for client: ', currentToken);
                // Perform any other neccessary action with the token
            } else {
                // Show permission request UI
                console.log('No registration token available. Request permission to generate one.');
            }
        })
        .catch((err) => {
            console.log('An error occurred while retrieving token. ', err.message);
        });
};


// export const onMessageListener = async () => {

//     onMessage(messaging, (payload) => {
//         console.log('payload', payload)
//     });
// }