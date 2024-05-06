import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js";

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

document.getElementById("login_button").addEventListener("click", () => {
    const email = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    signInWithEmailAndPassword(auth, email, password)
        .then(() => window.location.href = 'tracker.html')
        .catch(error => window.alert("Login failed: " + error.message));
});

document.getElementById("reset_button").addEventListener("click", () => {
    const email = document.getElementById('username').value;
    sendPasswordResetEmail(auth, email)
        .then(() => window.alert("Password reset email sent."))
        .catch(error => window.alert("Reset failed: " + error.message));
});

window.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        document.getElementById("login_button").click();
    }
});