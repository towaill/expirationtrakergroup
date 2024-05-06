import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import {
    getAuth,
    signOut
} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBG8_bICCsPD8RZCveG5uUxjDQW2LMu-rc",
    authDomain: "expirationtrackergroup.firebaseapp.com",
    projectId: "expirationtrackergroup",
    storageBucket: "expirationtrackergroup.appspot.com",
    messagingSenderId: "398051025602",
    appId: "1:398051025602:web:bb4a0ff98bf361a5a9115b",
    measurementId: "G-D7GZ2PEB4L"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function logout() {
    signOut(auth).then(() => {
        window.open('index.html',"_self")
    }).catch((error) => {
        window.alert('hmm? something went wrong')
    });
}

const signout = document.getElementById('signout');
signout.addEventListener('click', logout);