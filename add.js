import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import { getFirestore, collection, addDoc } from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore.js';
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js";

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
const db = getFirestore(app);
const auth = getAuth(app);

onAuthStateChanged(auth, user => {
    if (!user) {
        window.location.replace('index.html');
    }
});

document.getElementById('addItemForm').addEventListener('submit', async event => {
    event.preventDefault();
    let itemName = document.getElementById('itemName').value;
    let referenceNumber = document.getElementById('referenceNumber').value;
    let lotNumber = document.getElementById('lotNumber').value;
    let expirationDate = new Date(document.getElementById('expirationDate').value);
    let itemQuantity = document.getElementById('itemQuantity').value;

    document.getElementById("audio").play();
    await addDoc(collection(db, `master_inventory`), {
        Product: itemName,
        Reference: referenceNumber,
        Lot: lotNumber,
        Exp: Math.floor(expirationDate.getTime() + expirationDate.getTimezoneOffset() * 60 * 1000),
        Quantity: itemQuantity
    });

    document.getElementById('addItemForm').reset();
});
